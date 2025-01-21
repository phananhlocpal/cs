import {
  Box, VStack, Text, Heading, Divider, Badge, Tag, TagLabel, Button, FormControl, FormLabel, FormErrorMessage,
  Textarea, Select, Input, Popover, PopoverTrigger, InputGroup, PopoverBody, PopoverContent, Stack
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { RequestIssueTypeEnum, ConversationInfoProp, CustomerResponseModel, UserResponseModel } from "@/abstract";

export const ConversationInfo = ({ conversation, customer, employeesTagged, requests, onSubmit, users, handleUserSelect, handlerUserRemove }: ConversationInfoProp) => {
  const [isOpenCreateTicket, setIsOpenCreateTicket] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [issueType, setIssueType] = useState<number | undefined>();
  const [customerId, setCustomerId] = useState(customer?.id || '');
  const [userNameInput, setUserNameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });
  const [personInChargeId, setPersonInChargeId] = useState(localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile') as string).id : '');

  // Lọc khách hàng dựa trên số điện thoại nhập vào
  const filteredUsers = users.filter((user: UserResponseModel) =>
    user.name.includes(userNameInput)
  );

  const getEmployeeName = (employeeId: string) => {
    const employee = users.find(user => user.id === employeeId);
    return employee?.name || 'Unknown';
  };

  return (
    <Box flex="1" borderWidth={1} borderRadius="lg" p={4} bg="white" boxShadow="lg" overflowY="auto">
      {conversation ? (
        <VStack spacing={4} align="stretch">
          {/* Thông tin khách hàng */}
          <Box>
            <Heading size="sm" mb={3}>Customer Information</Heading>
            {customer && (
              <VStack align="start" spacing={2}>
                <Text><strong>Name:</strong> {customer.name}</Text>
                <Text><strong>Email:</strong> {customer.email}</Text>
                <Text><strong>Phone:</strong> {customer.phone}</Text>
                <Text><strong>Address:</strong> {customer.address}</Text>
              </VStack>
            )}
          </Box>
          <Divider />

          {/* Danh sách yêu cầu */}
          <Box>
            <Heading size="sm" mb={3}>Recent Requests</Heading>
            <VStack align="stretch" spacing={2}>
              {requests ? requests?.map((request) => (
                <Box key={request.id} p={2} borderWidth="1px" borderRadius="md">
                  <Text fontSize="sm" fontWeight="medium">{request.title}</Text>
                  <Badge colorScheme={request.status === 1 ? "green" : "orange"}>
                    {request.status === 1 ? "Completed" : "Pending"}
                  </Badge>
                </Box>
              )) : (
                <Text color="gray.500">No requests found</Text>
              )}
            </VStack>
          </Box>
          <Divider />

          {/* Gợi ý khách hàng */}
          <Box>
            <Heading size="sm" mb={3}>Assign Staff</Heading>
            <FormControl>
              <Popover
                isOpen={!!userNameInput && filteredUsers.length > 0}
                autoFocus={false}
              >
                <PopoverTrigger>
                  <InputGroup>
                    <Input
                      placeholder="Enter staff name"
                      value={userNameInput}
                      onChange={(e) => setUserNameInput(e.target.value)}
                    />
                  </InputGroup>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody p={0}>
                    <Stack>
                      {filteredUsers.map((user: UserResponseModel) => (
                        <Box
                          key={user.id}
                          p={2}
                          cursor="pointer"
                          _hover={{ bg: "gray.100" }}
                          onClick={() => {
                            setUserNameInput("");
                            handleUserSelect(conversation.id, user.id, personInChargeId)}}
                        >
                          {user.name}
                        </Box>
                      ))}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormControl>
            <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
              {employeesTagged?.map((tagged) => {
                const employeeName = getEmployeeName(tagged.employeeId);
                return (
                  <Tag
                    key={tagged.id}
                    size="md"
                    colorScheme="blue"
                    borderRadius="full"
                  >
                    <TagLabel>{employeeName}</TagLabel>
                    <Button onClick={() => handlerUserRemove(tagged.id)}></Button>
                  </Tag>
                );
              })}
            </Box>
          </Box>
          <Divider />

          {isOpenCreateTicket ? (
            <Heading size="sm" mb={3}>Create Support Ticket</Heading>
          ) : (
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={() => setIsOpenCreateTicket(true)}
            >
              Create Support Ticket
            </Button>
          )}

          {/* Tạo ticket */}
          {isOpenCreateTicket && (
            <Box px={4} pb={4}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>

                <FormControl isInvalid={!!errors.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>
                <FormControl>
                  <FormLabel>Issue Type</FormLabel>
                  <Select
                    name="issueType"
                    value={issueType}
                    onChange={(e) => setIssueType(Number(e.target.value))}
                    placeholder="Choose an issue type"
                    required
                  >
                    {Object.entries(RequestIssueTypeEnum).map(([keyEnum, value], key) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={isLoading}
                  width="full"
                  onClick={() => onSubmit && onSubmit({ title, description, issueType, customerId, personInChargeId })}
                >
                  Create
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenCreateTicket(false)
                    setTitle('')
                    setDescription('')
                    setIssueType(undefined)
                  }}
                  width="full"
                >
                  Cancel
                </Button>
              </VStack>
            </Box>
          )}
        </VStack>
      ) : (
        <Text color="gray.500" textAlign="center">
          Select a conversation to see details.
        </Text>
      )}
    </Box>
  );
};
