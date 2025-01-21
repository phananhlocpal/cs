import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Select,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react";
import { RequestStatusEnum, RequestResponseModel, RequestUpdateRequestModel } from "@/abstract";
import { getRequestIssueTypeHelper } from "@/helpers";

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
    const [newDescription, setNewDescription] = useState(""); 

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
    
        let updatedFormData: RequestUpdateRequestModel;
    
        if (newDescription.trim()) { 
            const currentDate = new Date().toLocaleString();
            const userProfile = localStorage.getItem("userProfile");
            const userName = userProfile ? JSON.parse(userProfile).name : "Unknown User";
            const formattedUpdate = `\n[${currentDate}] - ${userName}: ${newDescription}`;
            
            const des = formData.description + formattedUpdate;
            updatedFormData = {
                ...formData,
                description: des,
            };
            formData.description = des;
            setNewDescription("");
        } else {
            updatedFormData = {
                ...formData,
                description: formData.description,
            };
            setNewDescription("");
        }
    
        setIsLoading(true);
        try {
            onSubmit?.(updatedFormData);
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
                    <Text>
                        {request.title}
                    </Text>
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel>Issue Type</FormLabel>
                    <Text>
                        {getRequestIssueTypeHelper(request.issueType)}
                    </Text>
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>

                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        value={formData.description}
                        isReadOnly
                        minHeight="200px"
                    />
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                    <FormLabel>New Update</FormLabel>
                    <Textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Enter your update here..."
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