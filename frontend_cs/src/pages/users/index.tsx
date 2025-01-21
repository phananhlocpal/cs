import React, { useState, useEffect } from "react";
import { Box, Button, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, useToast, Checkbox, Tag } from "@chakra-ui/react";
import { userService } from "@/services";
import { UserCreateRequestModel, UserUpdateRequestModel, UserResponseModel } from "@/abstract";
import { CreateComponent, UpdateComponent, DetailComponent } from "./components";

export const UserPage: React.FC = () => {
  // States
  const [users, setUsers] = useState<UserResponseModel[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserResponseModel | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'update' | 'detail'>('create');
  const [selection, setSelection] = useState<string[]>([]);
  const indeterminate = selection.length > 0 && selection.length < users.length;

  // Chakra hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Load requests on mount
  useEffect(() => {
    loadUsers();
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      showErrorToast('Failed to load users');
    }
  }

  // Create user
  const handleCreate = async (data: UserCreateRequestModel) => {
    try {
      await userService.createUser(data);
      loadUsers();
      onClose();
      showSuccessToast('User created successfully');
    } catch (error) {
      showErrorToast('Failed to create user');
    }
  };

  // Update user
  const handleUpdate = async (data: UserUpdateRequestModel) => {
    try {
      await userService.updateUser(data);
      loadUsers();
      onClose();
      showSuccessToast('User updated successfully');
    } catch (error) {
      showErrorToast('Failed to update user');
    }
  };

  // Open modal handlers
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedUser(null);
    onOpen();
  };

  const openUpdateModal = (user: UserResponseModel) => {
    setModalMode('update');
    setSelectedUser(user);
    onOpen();
  };

  const openDetailModal = (user: UserResponseModel) => {
    setModalMode('detail');
    setSelectedUser(user);
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

  return (
    <Box p={4}>
      <HStack mb={4} justifyContent="flex-end">
        <Button colorScheme="blue" onClick={openCreateModal}>
          Create New User
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
                    checked ? users.map((user) => user.name) : [],
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
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td>
                <Checkbox
                  top="1"
                  aria-label="Select row"
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelection((prev) =>
                      checked
                        ? [...prev, user.name]
                        : selection.filter((name) => name !== user.name),
                    )
                  }}
                />
              </Td>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phoneNumber}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" onClick={() => openDetailModal(user)}>
                    View
                  </Button>
                  <Button size="sm" colorScheme="blue" onClick={() => openUpdateModal(user)}>
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
            {modalMode === 'create' && 'Create New User'}
            {modalMode === 'update' && 'Update User'}
            {modalMode === 'detail' && 'User Details'}
          </ModalHeader>
          <ModalBody>
            {modalMode === 'create' && (
              <CreateComponent
                onSubmit={handleCreate}
                onCancel={onClose}
              />
            )}
            {modalMode === 'update' && selectedUser && (
              <UpdateComponent
                user={selectedUser}
                onSubmit={handleUpdate}
                onCancel={onClose}
              />
            )}
            {modalMode === 'detail' && selectedUser && (
              <DetailComponent
                user={selectedUser}
                onClose={onClose}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

