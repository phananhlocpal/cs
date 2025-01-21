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
import { UserUpdateRequestModel, UserResponseModel } from "@/abstract";
import { userService } from "@/services";

interface UpdateComponentProps {
    user: UserResponseModel;
    onSubmit?: (data: UserUpdateRequestModel) => void;
    onCancel?: () => void;
}

export const UpdateComponent: React.FC<UpdateComponentProps> = ({
    user,
    onSubmit,
    onCancel
}) => {
    const [formData, setFormData] = useState<UserUpdateRequestModel>({
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: user.role,
        password: "**********",
        status: user.status,
    });

    const [errors, setErrors] = useState<Partial<UserUpdateRequestModel>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<UserUpdateRequestModel> = {};

        if (!formData.name) {
            newErrors.name = "Description is required";
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = undefined;
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
                    <FormLabel>User Id</FormLabel>
                    <Input
                        name="id"
                        value={user.id}
                        disabled
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>User Name</FormLabel>
                    <Input
                        name="title"
                        value={user.name}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phoneNumber}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                        name="phone"
                        value={formData.phoneNumber ?? ""}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
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
                    onClick={() => { userService.resetPassword(user.id) }}
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