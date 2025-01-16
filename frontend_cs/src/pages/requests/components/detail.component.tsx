import React from "react";
import { Heading, Text, Box, Button, VStack } from "@chakra-ui/react";
import { RequestResponseModel } from "@/abstract";

interface DetailComponentProps {
  request: RequestResponseModel;
  onClose?: () => void;
}

export const DetailComponent: React.FC<DetailComponentProps> = ({ 
  request,
  onClose 
}) => {
  return (
    <Box p={4}>
      <VStack align="stretch" spacing={4}>
        {/* Request ID */}
        <Box>
          <Heading as="h5" size="sm">Request ID</Heading>
          <Text mt={2}>{request?.id}</Text>
        </Box>

        {/* Title */}
        <Box>
          <Heading as="h5" size="sm">Title</Heading>
          <Text mt={2}>{request?.title}</Text>
        </Box>

        {/* Description */}
        <Box>
          <Heading as="h5" size="sm">Description</Heading>
          <Text mt={2}>{request?.description}</Text>
        </Box>

        {/* Created Date */}
        <Box>
          <Heading as="h5" size="sm">Created Date</Heading>
          <Text mt={2}>
            {request?.createdDate ? new Date(request.createdDate).toLocaleString() : ""}
          </Text>
        </Box>

        {/* Status */}
        <Box>
          <Heading as="h5" size="sm">Status</Heading>
          <Text mt={2}>{request?.status}</Text>
        </Box>

        {/* Person in Charge */}
        <Box>
          <Heading as="h5" size="sm">Person in Charge</Heading>
          <Box mt={2}>
            <Text><strong>Name:</strong> {request?.personInCharge.name}</Text>
            <Text><strong>Email:</strong> {request?.personInCharge.email}</Text>
            <Text><strong>Phone:</strong> {request?.personInCharge.phoneNumber}</Text>
            <Text><strong>Role:</strong> {request?.personInCharge.role}</Text>
            <Text><strong>Status:</strong> {request?.personInCharge.status}</Text>
          </Box>
        </Box>

        {/* Customer */}
        <Box>
          <Heading as="h5" size="sm">Customer</Heading>
          <Box mt={2}>
            <Text><strong>Name:</strong> {request?.customer.name}</Text>
            <Text><strong>Email:</strong> {request?.customer.email}</Text>
            <Text><strong>Address:</strong> {request?.customer.address}</Text>
            <Text><strong>Phone:</strong> {request?.customer.phone}</Text>
          </Box>
        </Box>

        <Button onClick={onClose} mt={4}>
          Close
        </Button>
      </VStack>
    </Box>
  );
};