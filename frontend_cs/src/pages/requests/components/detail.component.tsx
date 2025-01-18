import React, { useEffect, useState } from "react";
import { Heading, Text, Box, Button, VStack, Spinner, Textarea, Tag, Tooltip } from "@chakra-ui/react";
import { CiCalendar } from "react-icons/ci";
import { RequestResponseModel } from "@/abstract";
import { customerService, userService } from "@/services";
import { getRequestStatus, getRequestStatusColorHelper } from "@/helpers";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(null);
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
          <Textarea
            value={request.description}
            isReadOnly
            minHeight="200px"
          />
        </Box>

        {/* Created Date */}
        <Box>
          <Heading as="h5" size="sm">Created Date</Heading>
          <Tag
            mt={2}
            rounded="full"
            size="lg"
          >
            <CiCalendar className="mr-2" />

            {new Date(request.createdDate).toLocaleDateString('en-CA')}
          </Tag>
        </Box>

        {/* Status */}
        <Box>
          <Heading as="h5" size="sm">Status</Heading>
          <Tag
            className="mt-2"
            rounded="full"
            size="lg"
            colorScheme={getRequestStatusColorHelper(getRequestStatus(request.status))}
          >
            {getRequestStatus(request.status)}
          </Tag>
        </Box>

        {/* Person in Charge */}
        <Box>
          <Heading as="h5" size="sm">Person in Charge</Heading>
          <Tooltip
            label={
              <Box p={2}>
                <Text><strong>Name:</strong> {user.name}</Text>
                <Text><strong>Email:</strong> {user.email}</Text>
                <Text><strong>Phone:</strong> {user.phoneNumber}</Text>
                <Text><strong>Role:</strong> {user.role}</Text>
                <Text><strong>Status:</strong> {user.status}</Text>
              </Box>
            }
            hasArrow
            placement="right"
          >
            <Box
              mt={2}
              p={3}
              borderWidth="1px"
              borderRadius="md"
              _hover={{ bg: "gray.50", cursor: "pointer" }}
            >
              <Text>{user.name}</Text>
            </Box>
          </Tooltip>
        </Box>
        {/* Customer */}
        <Box>
          <Heading as="h5" size="sm">Customer</Heading>
          <Tooltip
            label={
              <Box p={2}>
                <Text><strong>Name:</strong> {customer.name}</Text>
                <Text><strong>Email:</strong> {customer.email}</Text>
                <Text><strong>Address:</strong> {customer.address}</Text>
                <Text><strong>Phone:</strong> {customer.phone}</Text>
              </Box>
            }
            hasArrow
            placement="right">
            <Box
              mt={2}
              p={3}
              borderWidth="1px"
              borderRadius="md"
              _hover={{ bg: "gray.50", cursor: "pointer" }}
            >
              {customer.name}
            </Box>
          </Tooltip>
        </Box>
        <Button onClick={onClose} mt={4}>
          Close
        </Button>
      </VStack>
    </Box>
  );
};