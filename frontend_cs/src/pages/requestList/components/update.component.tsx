import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Textarea,
    VStack
} from "@chakra-ui/react";
import { RequestStatusEnum, RequestResponseModel } from "@/abstract";

interface UpdateRequestFormData {
    title: string;
    description: string;
    status: RequestStatusEnum;
}

interface UpdateComponentProps {
    request: RequestResponseModel;
    onSubmit?: (data: UpdateRequestFormData) => void;
    onCancel?: () => void;
}

export const UpdateComponent: React.FC<UpdateComponentProps> = ({ 
    request, 
    onSubmit,
    onCancel 
}) => {
    const [formData, setFormData] = useState<UpdateRequestFormData>({
        title: request.title,
        description: request.description,
        status: request.status
    });

    const [errors, setErrors] = useState<Partial<UpdateRequestFormData>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<UpdateRequestFormData> = {};
        
        if (!formData.title) {
            newErrors.title = "Title is required";
        }
        if (!formData.description) {
            newErrors.description = "Description is required";
        }
        if (!formData.status) {
            newErrors.status = "Status is required";
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
            console.error("Error updating request:", error);
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

                <FormControl isInvalid={!!errors.status}>
                    <FormLabel>Status</FormLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value={RequestStatusEnum.Created}>Created</option>
                        <option value={RequestStatusEnum.OnProcessing}>On Processing</option>
                        <option value={RequestStatusEnum.Pending}>Pending</option>
                        <option value={RequestStatusEnum.Done}>Done</option>
                    </Select>
                    <FormErrorMessage>{errors.status}</FormErrorMessage>
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
                    onClick={onCancel}
                    width="full"
                >
                    Cancel
                </Button>
            </VStack>
        </Box>
    );
};