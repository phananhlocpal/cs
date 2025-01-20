import React from "react";
import { Heading, Text, Box, Button, VStack } from "@chakra-ui/react";
import { CustomerResponseModel } from "@/abstract";

interface CustomerDetailComponentProps {
  customer: CustomerResponseModel;
  onClose?: () => void;
}

export const DetailComponent: React.FC<CustomerDetailComponentProps> = ({ 
  customer,
  onClose 
}) => {

  return (
    <Box p={4}>
      <VStack align="stretch" spacing={4}>
        <Box>
          <Heading as="h5" size="sm">Customer ID</Heading>
          <Text mt={2}>{customer?.id}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">Customer name</Heading>
          <Text mt={2}>{customer?.name}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">Email</Heading>
          <Text mt={2}>{customer?.email}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">Address</Heading>
          <Text mt={2}>{customer?.address}</Text>
        </Box>

        <Box>
          <Heading as="h5" size="sm">Phone</Heading>
          <Text mt={2}>{customer?.phone}</Text>
        </Box>

        <Button onClick={onClose} mt={4}>
          Close
        </Button>
      </VStack>
    </Box>
  );
};