import React, { useState } from "react";
import { Box, Button, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Spinner } from "@chakra-ui/react";
import { CustomerCreateRequestModel, CustomerUpdateRequestModel, CustomerResponseModel } from "@/abstract";
import { CreateComponent, UpdateComponent, DetailComponent } from "./components";
import { useCustomers } from '@/hooks/useCustomers'
import { useNotification } from "@/hooks";

export const CustomerPage: React.FC = () => {
  // States
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseModel | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'update' | 'detail'>('create');
  const [selection, setSelection] = useState<string[]>([]);

  // Hooks
  const { customers = [], isLoading, createCustomer, updateCustomer } = useCustomers()
  const indeterminate = selection.length > 0 && selection.length < customers.length;

  // Chakra hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showNotification = useNotification();

  // Create customer
  const handleCreate = async (data: CustomerCreateRequestModel) => {
    try {
      await createCustomer(data);
      onClose();
      showNotification('Customer created successfully', 'success');
    } catch (error) {
      showNotification('Failed to create customer', 'error');
    }
  };

  // Update customer
  const handleUpdate = async (data: CustomerUpdateRequestModel) => {
    try {
      await updateCustomer(data);
      onClose();
      showNotification('Customer updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update customer', 'error');
    }
  };

  // Open modal handlers
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedCustomer(null);
    onOpen();
  };

  const openUpdateModal = (customer: CustomerResponseModel) => {
    setModalMode('update');
    setSelectedCustomer(customer);
    onOpen();
  };

  const openDetailModal = (customer: CustomerResponseModel) => {
    setModalMode('detail');
    setSelectedCustomer(customer);
    onOpen();
  };

  if (isLoading) return <Spinner />

  return (
    <Box p={4}>
      <HStack mb={4} justifyContent="flex-end">
        <Button colorScheme="blue" onClick={openCreateModal}>
          Create New Customer
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
                    checked ? (customers || []).map((customer) => customer.name) : [],
                  );
                }}
              />
            </Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers?.map((customer) => (
            <Tr key={customer.id}>
              <Td>
                <Checkbox
                  top="1"
                  aria-label="Select row"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelection((prev) =>
                      checked
                        ? [...prev, customer.name]
                        : selection.filter((name) => name !== customer.name),
                    )
                  }}
                />
              </Td>
              <Td>{customer.name}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.phone}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => openDetailModal(customer)}>
                    View
                  </Button>
                  <Button size="sm" colorScheme="blue" onClick={() => openUpdateModal(customer)}>
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red">
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
            {modalMode === 'create' && 'Create New Customer'}
            {modalMode === 'update' && 'Update Customer'}
            {modalMode === 'detail' && 'Customer Details'}
          </ModalHeader>
          <ModalBody>
            {modalMode === 'create' && (
              <CreateComponent
                onSubmit={handleCreate}
                onCancel={onClose}
              />
            )}
            {modalMode === 'update' && selectedCustomer && (
              <UpdateComponent
                customer={selectedCustomer}
                onSubmit={handleUpdate}
                onCancel={onClose}
              />
            )}
            {modalMode === 'detail' && selectedCustomer && (
              <DetailComponent
                customer={selectedCustomer}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

