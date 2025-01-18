import React, { useEffect, useState } from "react";
import { Heading, Text, Box, Button, VStack, Spinner } from "@chakra-ui/react";
import { RequestResponseModel } from "@/abstract";
import { customerService, userService } from "@/services";

interface DetailComponentProps {
  request: RequestResponseModel;
  onClose?: () => void;
}

export const DetailComponent: React.FC<DetailComponentProps> = ({ 
  request,
  onClose 
}) => {

  const [customer, setCustomer] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [fetchedCustomer, fetchedUser] = await Promise.all([
          customerService.getCustomerById(request.customerId),
          userService.getUserById(request.personInChargeId),
        ]);
        setCustomer(fetchedCustomer);
        setUser(fetchedUser);
        setError(null); // Clear any previous errors
      } catch (err: any) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [request.customerId, request.personInChargeId]);

  // Render loading state
  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading details...</Text>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500" fontWeight="bold">{error}</Text>
        <Button onClick={onClose} mt={4}>
          Close
        </Button>
      </Box>
    );
  }


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
            <Text><strong>Name:</strong> {user.name}</Text>
            <Text><strong>Email:</strong> {user.email}</Text>
            <Text><strong>Phone:</strong> {user.phoneNumber}</Text>
            <Text><strong>Role:</strong> {user.role}</Text>
            <Text><strong>Status:</strong> {user.status}</Text>
          </Box>
        </Box>

        {/* Customer */}
        <Box>
          <Heading as="h5" size="sm">Customer</Heading>
          <Box mt={2}>
            <Text><strong>Name:</strong> {customer.name}</Text>
            <Text><strong>Email:</strong> {customer.email}</Text>
            <Text><strong>Address:</strong> {customer.address}</Text>
            <Text><strong>Phone:</strong> {customer.phone}</Text>
          </Box>
        </Box>

        <Button onClick={onClose} mt={4}>
          Close
        </Button>
      </VStack>
    </Box>
  );
};