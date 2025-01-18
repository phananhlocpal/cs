import React, { useState } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea, VStack } from "@chakra-ui/react";
import { RequestCreateRequestModel, RequestIssueTypeEnum, CreateComponentProps } from "@/abstract";

export const CreateComponent: React.FC<CreateComponentProps> = ({ onSubmit, onCancel, customers }) => {
    const [formData, setFormData] = useState<RequestCreateRequestModel>({
        title: "",
        description: "",
        issueType: undefined,
        personInChargeId: JSON.parse(localStorage.getItem("userProfile") || '{}').id || '',
        customerId: '',
    });

    const [errors, setErrors] = useState<Partial<RequestCreateRequestModel>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<RequestCreateRequestModel> = {};

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
            const currentDate = new Date().toLocaleString();
            const userProfile = localStorage.getItem("userProfile");
            const userName = userProfile ? JSON.parse(userProfile).name : "Unknown User";
            
            const formattedDescription = `[${currentDate}] - ${userName}: ${formData.description}`;
            
            const updatedFormData = {
                ...formData,
                description: formattedDescription
            };
    
            onSubmit?.(updatedFormData);
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
                    <FormLabel>Issue Type</FormLabel>
                    <Select
                        name="issueType"
                        value={formData.issueType}
                        onChange={handleChange}
                        placeholder="Choose an issue type"
                        required
                    >
                        {Object.entries(RequestIssueTypeEnum).map(([keyEnum, value], key) => (
                            <option key={key} value={key}>
                                {value}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Customer</FormLabel>
                    <Select
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        placeholder="Choose a customer"
                        required
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