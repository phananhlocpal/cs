import React, { useState, useEffect } from "react";
import { Box, Button, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, useToast, Checkbox, Tag } from "@chakra-ui/react";
import { requestService, customerService } from "@/services";
import { RequestResponseModel, RequestCreateRequestModel, RequestUpdateRequestModel, CustomerResponseModel, RequestStatusEnum } from "@/abstract";
import { CreateComponent, UpdateComponent, DetailComponent } from "./components";
import { getRequestStatus, getRequestStatusColorHelper } from "@/helpers";
import { CiCalendar } from "react-icons/ci";

export const RequestListPage: React.FC = () => {
  // States
  const [requests, setRequests] = useState<RequestResponseModel[]>([]);
  const [customers, setCustomers] = useState<CustomerResponseModel[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestResponseModel | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'update' | 'detail'>('create');
  const [selection, setSelection] = useState<string[]>([]);
  const indeterminate = selection.length > 0 && selection.length < requests.length;


  // Chakra hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Load requests on mount
  useEffect(() => {
    loadRequests();
    loadCustomers();
  }, []);

  // Load all requests, customers
  const loadRequests = async () => {
    try {
      const data = await requestService.getAllRequests();
      console.log(`Requests list after fetch: ${data}`)
      setRequests(data);
    } catch (error) {
      showErrorToast('Failed to load requests');
    }
  };

  const loadCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      showErrorToast('Failed to load customers');
    }
  }

  // Create request
  const handleCreate = async (data: RequestCreateRequestModel) => {
    try {
      await requestService.createRequest(data);
      loadRequests();
      onClose();
      showSuccessToast('Request created successfully');
    } catch (error) {
      showErrorToast('Failed to create request');
    }
  };

  // Update request
  const handleUpdate = async (data: RequestUpdateRequestModel) => {
    try {
      await requestService.updateRequest(data);
      loadRequests();
      onClose();
      showSuccessToast('Request updated successfully');
    } catch (error) {
      showErrorToast('Failed to update request');
    }
  };

  // Delete request 
  const handleDelete = async (id: string) => {
    try {
      await requestService.deleteRequest(id);
      loadRequests();
      showSuccessToast('Request deleted successfully');
    } catch (error) {
      showErrorToast('Failed to delete request');
    }
  };

  // Open modal handlers
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedRequest(null);
    onOpen();
  };

  const openUpdateModal = (request: RequestResponseModel) => {
    setModalMode('update');
    setSelectedRequest(request);
    onOpen();
  };

  const openDetailModal = (request: RequestResponseModel) => {
    setModalMode('detail');
    setSelectedRequest(request);
    onOpen();
  };

  // Toast helpers
  const showSuccessToast = (message: string) => {
    toast({
      title: message,
      status: 'success',
      duration: 3000,
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      title: message,
      status: 'error',
      duration: 3000,
    });
  };

  function getStatusColor(arg0: RequestStatusEnum): (string & {}) | "whiteAlpha" | "blackAlpha" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink" | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <Box p={4}>
      <HStack mb={4} justifyContent="flex-end">
        <Button colorScheme="blue" onClick={openCreateModal}>
          Create New Request
        </Button>
      </HStack>

      <Table bg="white" boxShadow="md">
        <Thead bg="white">
          <Tr>
            <Th w="6">
              <Checkbox
                top="1"
                aria-label="Select all rows"
                isChecked={selection.length > 0}
                isIndeterminate={indeterminate}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelection(
                    checked ? requests.map((request) => request.title) : [],
                  );
                }}
              />
            </Th>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th>Created Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {requests?.map((request) => (
            <Tr key={request.id}>
              <Td>
                <Checkbox
                  top="1"
                  aria-label="Select row"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelection((prev) =>
                      checked
                        ? [...prev, request.title]
                        : selection.filter((name) => name !== request.title),
                    )
                  }}
                />
              </Td>
              <Td>{request.title}</Td>
              <Td>
                <Tag
                rounded="full"
                size="lg"
                colorScheme={getRequestStatusColorHelper(getRequestStatus(request.status))}
                >
                {getRequestStatus(request.status)}
                </Tag>
              </Td>
              <Td>
                <Tag
                  rounded="full"
                  size="lg"
                  >
                    <CiCalendar className="mr-2" />

                  {new Date(request.createdDate).toLocaleDateString('en-CA')}
                  </Tag>
                </Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => openDetailModal(request)}>
                    View
                  </Button>
                  <Button size="sm" colorScheme="blue" onClick={() => openUpdateModal(request)}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(request.id)}>
                    Delete
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {modalMode === 'create' && 'Create New Request'}
            {modalMode === 'update' && 'Update Request'}
            {modalMode === 'detail' && 'Request Details'}
          </ModalHeader>
          <ModalBody>
            {modalMode === 'create' && (
              <CreateComponent
                onSubmit={handleCreate}
                onCancel={onClose}
                customers={customers}
              />
            )}
            {modalMode === 'update' && selectedRequest && (
              <UpdateComponent
                request={selectedRequest}
                onSubmit={handleUpdate}
                onCancel={onClose}
              />
            )}
            {modalMode === 'detail' && selectedRequest && (
              <DetailComponent
                request={selectedRequest}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

