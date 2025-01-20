import React, { useState } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea, VStack } from "@chakra-ui/react";
import { CreateCustomerComponentProps, CustomerCreateRequestModel } from "@/abstract";

export const CreateComponent: React.FC<CreateCustomerComponentProps> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<CustomerCreateRequestModel>({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: ''
    });

    const [errors, setErrors] = useState<Partial<CustomerCreateRequestModel>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<CustomerCreateRequestModel> = {};

        if (!formData.name) {
            newErrors.name = "Name is required";
        }
        if (!formData.email) {
            newErrors.email = "Email is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            onSubmit?.(formData);
        } catch (error) {
            console.error("Error creating request:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "issueType"? parseInt(value) : value
        }));
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.name}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.phone}</FormErrorMessage>
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
                    Create
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