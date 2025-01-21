import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack
} from "@chakra-ui/react";
import { CustomerUpdateRequestModel, CustomerResponseModel } from "@/abstract";
import { customerService } from "@/services";

interface UpdateComponentProps {
    customer: CustomerResponseModel;
    onSubmit?: (data: CustomerUpdateRequestModel) => void;
    onCancel?: () => void;
}

export const UpdateComponent: React.FC<UpdateComponentProps> = ({
    customer,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState<CustomerUpdateRequestModel>({
        id: customer.id,
        name: customer.name,
        address: customer.address,
        phone: customer.phone,
        password: "**********",
    });

    const [errors, setErrors] = useState<Partial<CustomerUpdateRequestModel>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<CustomerUpdateRequestModel> = {};

        if (!formData.name) {
            newErrors.name = "Description is required";
        }
        if (!formData.phone) {
            newErrors.phone = undefined;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log(formData);
        setIsLoading(true);
        try {
            onSubmit?.(formData);
        } catch (error) {
            console.error("Error updating request:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "status" ? parseInt(value) : value
        }));
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4}>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Customer Id</FormLabel>
                    <Input
                        name="id"
                        value={customer.id}
                        disabled
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Customer Name</FormLabel>
                    <Input
                        name="title"
                        value={customer.name}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                        name="address"
                        value={customer.address}
                    />
                    <FormErrorMessage>{errors.address}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                    width="full"
                >
                    Update
                </Button>
                <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                    width="full"
                    onClick={() => {customerService.resetPassword(customer.id)}}
                >
                    Reset password
                </Button>
                <Button
                    onClick={onCancel}
                    width="full"
                >
                    Cancel
                </Button>
            </VStack>
        </Box>
    );
};