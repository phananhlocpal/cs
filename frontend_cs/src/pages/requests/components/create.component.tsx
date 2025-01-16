import React, { useState } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea, VStack } from "@chakra-ui/react";
import { RequestCreateRequestModel, RequestStatusEnum, RequestUpdateRequestModel, CreateComponentProps } from "@/abstract";

export const CreateComponent: React.FC<CreateComponentProps> = ({ onSubmit, onCancel, customers }) => {
    const [formData, setFormData] = useState<RequestCreateRequestModel>({
        title: "",
        description: "",
        personInChargeId: '1',
        customerId: '1',
    });

    const [errors, setErrors] = useState<Partial<CreateRequestFormData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<CreateRequestFormData> = {};
        
        if (!formData.title) {
            newErrors.title = "Title is required";
        }
        if (!formData.description) {
            newErrors.description = "Description is required";
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
            [name]: value
        }));
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4}>
            <VStack spacing={4}>
                <FormControl isInvalid={!!errors.title}>
                    <FormLabel>Title</FormLabel>
                    <Input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>

                <FormControl>
                    <FormLabel>Person In Charge</FormLabel>
                    <Select
                        name="personInChargeId"
                        value={formData.personInChargeId}
                        onChange={handleChange}
                    >
                        {customers.map((customer: any) => (
                            <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                    </Select>
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