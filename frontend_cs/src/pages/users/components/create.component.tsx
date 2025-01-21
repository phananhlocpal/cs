import React, { useState } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, Textarea, VStack } from "@chakra-ui/react";
import { CreateUserComponentProp, UserCreateRequestModel } from "@/abstract";

export const CreateComponent: React.FC<CreateUserComponentProp> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<UserCreateRequestModel>({
        name: "",
        email: "",
        phoneNumber: "",
        password: "12345678@",
        role: 0
    });

    const [errors, setErrors] = useState<Partial<UserCreateRequestModel>>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: Partial<UserCreateRequestModel> = {};

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
            [name]: name === "role" ? parseInt(value) : value 
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
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.role}>
                    <FormLabel>Role</FormLabel>
                    <Select 
                        name="role"
                        value={formData.role}
                        onChange={handleChange}>
                        <option value={0}>User</option>
                        <option value={1}> Admin</option>
                    </Select>
                    <FormErrorMessage>{errors.role}</FormErrorMessage>
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