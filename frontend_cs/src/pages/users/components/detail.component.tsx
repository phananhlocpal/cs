import React from "react";
import { Heading, Text, Box, Button, VStack } from "@chakra-ui/react";
import { UserResponseModel } from "@/abstract";

interface UserDetailComponentProps {
  user: UserResponseModel;
  onClose?: () => void;
}

export const DetailComponent: React.FC<UserDetailComponentProps> = ({ 
  user,
  onClose 
}) => {

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Heading as="h5" size="sm">User ID</Heading>
          <Text mt={2}>{user?.id}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">User name</Heading>
          <Text mt={2}>{user?.name}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">Email</Heading>
          <Text mt={2}>{user?.email}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">Role</Heading>
          <Text mt={2}>{user?.role}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">Phone Number</Heading>
          <Text mt={2}>{user?.phoneNumber}</Text>
        </Box>

        <Button onClick={onClose} mt={4}>
          Close
        </Button>
      </VStack>
    </Box>
  );
};