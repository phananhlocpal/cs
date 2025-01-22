import {
  Box, VStack, Text, Heading, Divider, Badge, Tag, TagLabel, Button, FormControl, FormLabel,
  Textarea, Select, Input, Popover, PopoverTrigger, InputGroup, PopoverBody, PopoverContent, Stack, IconButton, Tooltip,
  Flex, Collapse
} from "@chakra-ui/react";
import { AddIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { RequestIssueTypeEnum, ConversationInfoProp, UserResponseModel, UserRoleEnum } from "@/abstract";
import { getRequestStatus } from "@/helpers";
import { getUserNameByIdHelper } from "@/helpers/getUserNameByIdHelper";

export const ConversationInfo = ({
  userLogin,
  selectedConversation,
  selectedCustomer,
  employeesTaggeds,
  requests,
  onSubmitCreateRequest,
  handleEmployeeTaggedSelect,
  handlerEmployeeTaggedRemove,
  isEditConversationStatus,
  setIsEditConversationStatus,
  isOpenCreateTicket,
  setIsOpenCreateTicket,
  setSelectedRequest,
  userNameInput,
  setUserNameInput,
  formData,
  handleFormDataChange,
  onOpen } : ConversationInfoProp) => {

  return (
    <Box flex="1" borderWidth={1} borderRadius="lg" p={4} bg="white" boxShadow="lg" overflowY="auto">
      {selectedConversation ? (
        <VStack spacing={4} align="stretch">
          <Box>
            <Heading size="sm" mb={3}>Conservation Information</Heading>
            <VStack align="start" spacing={2}>
              <Text>  <strong>Created Time:</strong> {new Date(selectedConversation.createdAt).toLocaleString()}</Text>
              <Text>
                <strong>Status:</strong>
                <Tag><TagLabel>{selectedConversation.status}</TagLabel></Tag>
                <IconButton
                  icon={<EditIcon />}
                  size="xs"
                  variant="ghost"
                  onClick={() => setIsEditConversationStatus(true)}
                  aria-label="Remove user"
                  _hover={{ bg: "transparent" }}
                />
              </Text>
              <Box mt={2} w={"100%"}>
                <Collapse in={isEditConversationStatus} animateOpacity>
                  <Flex direction="column" align="flex-start" p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                    <Select placeholder="Select status" mb={3}>
                      <option value={0}>Opened</option>
                      <option value={1}>In Progress</option>
                      <option value={2}>Closed</option>
                      <option value={3}>Resolved</option>
                    </Select>
                    <Flex>
                      <Button colorScheme="blue" mr={2}>Save</Button>
                      <Button onClick={() => setIsEditConversationStatus(false)}>Close</Button>
                    </Flex>
                  </Flex>
                </Collapse>
              </Box>
            </VStack>
          </Box>
          <Divider />
          {/* Thông tin khách hàng */}
          <Box>
            <Heading size="sm" mb={3}>Customer Information</Heading>
            {selectedCustomer && (
              <VStack align="start" spacing={2}>
                <Text><strong>Name:</strong> {selectedCustomer.name}</Text>
                <Text><strong>Email:</strong> {selectedCustomer.email}</Text>
                <Text><strong>Phone:</strong> {selectedCustomer.phone}</Text>
                <Text><strong>Address:</strong> {selectedCustomer.address}</Text>
              </VStack>
            )}
          </Box>
          <Divider />

          {/* Danh sách yêu cầu */}
          <Box>
            <Heading size="sm" mb={3}>Recent Requests</Heading>
            <VStack align="stretch" spacing={2}>
              {requests ? requests?.map((request: any) => (
                <Box key={request.id} p={2} borderWidth="1px" borderRadius="md" cursor="pointer" onClick={() => {
                  setSelectedRequest(request);
                  onOpen();
                }}>
                  <Text fontSize="sm" fontWeight="medium">{request.title}</Text>
                  <Badge colorScheme={request.status == 0 ? "blue" : request.status == 1 ? "orange" : request.status == 2 ? "yellow" : request.status == 2 ? "green" : "gray"}>
                    {getRequestStatus(request.status)}
                  </Badge>
                </Box>
              )) : (
                <Text color="gray.500">No requests found</Text>
              )}
            </VStack>
          </Box>
          <Divider />

          {/* Assign staff to chat*/}
          <Box>
            <Heading size="sm" mb={3}>Assign Staff</Heading>
            <FormControl>
              <Popover
                isOpen={!!userNameInput}
                autoFocus={false}
              >
                <PopoverTrigger>
                  <InputGroup>
                    <Tooltip label="Only administrators can add staff" isDisabled={userLogin.role !== UserRoleEnum.Admin}>
                      <Input
                        placeholder="Enter staff name"
                        value={userNameInput}
                        onChange={(e) => setUserNameInput(e.target.value)}
                        disabled={userLogin.role === UserRoleEnum.Admin ? false : true}
                      />
                    </Tooltip>
                  </InputGroup>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverBody p={0}>
                    <Stack>
                      {employeesTaggeds?.map((user: any) => (
                        <Box
                          key={user.id}
                          p={2}
                          cursor="pointer"
                          _hover={{ bg: "gray.100" }}
                          onClick={() => { handleEmployeeTaggedSelect(user.id) }}>
                          {getUserNameByIdHelper(user.name)}
                        </Box>
                      ))}
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </FormControl>
            <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
              {employeesTaggeds?.map((user: any) => {
                return (
                  <Tag
                    key={user.id}
                    size="md"
                    colorScheme="blue"
                    borderRadius="full"
                  >
                    <TagLabel>{user.name}</TagLabel>
                    <IconButton
                      disabled={userLogin.role !== UserRoleEnum.Admin ? false : true}
                      icon={<CloseIcon />}
                      size="xs"
                      variant="ghost"
                      onClick={() => handlerEmployeeTaggedRemove(user.id)}
                      aria-label="Remove user"
                      _hover={{ bg: "transparent" }}
                    />
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
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleFormDataChange}
                  />
                </FormControl>

                <FormControl >
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormDataChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Issue Type</FormLabel>
                  <Select
                    name="issueType"
                    value={formData.issueType}
                    onChange={handleFormDataChange}
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
                  width="full"
                  onClick={() => {
                    const currentDate = new Date().toLocaleString();
                    const userProfile = localStorage.getItem("userProfile");
                    const userName = userProfile ? JSON.parse(userProfile).name : "Unknown User";
                    const formattedDescription = `[${currentDate}] - ${userName}: ${formData.description}`;
                    onSubmitCreateRequest({
                      ...formData,
                      description: formattedDescription
                    });
                    setIsOpenCreateTicket(false);
                  }}
                >
                  Create
                </Button>
                <Button
                  onClick={() => {
                    setIsOpenCreateTicket(false);
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
