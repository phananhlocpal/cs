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
import { RequestStatusEnum, RequestResponseModel, RequestUpdateRequestModel } from "@/abstract";

interface UpdateComponentProps {
    request: RequestResponseModel;
    onSubmit?: (data: RequestUpdateRequestModel) => void;
    onCancel?: () => void;
}

export const UpdateComponent: React.FC<UpdateComponentProps> = ({
    request,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState<RequestUpdateRequestModel>({
        id: request.id,
        description: request.description,
        status: request.status
    });

    const [errors, setErrors] = useState<Partial<RequestUpdateRequestModel>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<RequestUpdateRequestModel> = {};

        if (!formData.description) {
            newErrors.description = "Description is required";
        }
        if (!formData.status) {
            newErrors.status = undefined;
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
                    <FormLabel>Title</FormLabel>
                    <Input
                        name="title"
                        value={request.title}
                        disabled
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Issue Type</FormLabel>
                    <Input
                        name="issueType"
                        value={request.issueType}
                        disabled
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
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
                        <option value={0}>Created</option>
                        <option value={1}>On Processing</option>
                        <option value={2}>Pending</option>
                        <option value={3}>Done</option>
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