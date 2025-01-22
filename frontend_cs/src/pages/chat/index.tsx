import { useState, useEffect, useRef } from 'react';
import { Box, Flex, useDisclosure, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import * as signalR from '@microsoft/signalr';
import { ConversationInfo, ConversationList, MessageBox } from './components';
import { ConversationResponseModel, CustomerResponseModel, MessageResponseModel, RequestCreateRequestModel, RequestResponseModel, RequestUpdateRequestModel } from '@/abstract'
import { UpdateComponent } from '../requests/components';
import { useNotification, useCustomers, useConversations, useRequests, useEmployeesTagged, useUsers } from '@/hooks';

export const ChatPage = () => {
  // States
  const [selectedMessage, setSelectedMessage] = useState('');
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<RequestResponseModel>();
  const [selectedConversation, setSelectedConversation] = useState<ConversationResponseModel | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerResponseModel | null>(null);
  const [employeesTagged, setEmployeesTagged] = useState<any[]>([]);
  const [userNameInput, setUserNameInput] = useState<string>('');
  const [isEditConversationStatus, setIsEditConversationStatus] = useState<boolean>(false);
  const [isOpenCreateTicket, setIsOpenCreateTicket] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageResponseModel[]>([]);
  const [formData, setFormData] = useState<RequestCreateRequestModel>({
    title: "",
    description: "",
    issueType: undefined,
    personInChargeId: JSON.parse(localStorage.getItem("userProfile") || '{}').id || '',
    customerId: selectedCustomer?.id,
  });
  const [customerAllRequests, setCustomerAllRequests] = useState<RequestResponseModel[] | null>(null);

  // Hooks
  const { conversations = [], isConersationsLoading } = useConversations();
  const { updateRequest, createRequest } = useRequests();
  const { createEmployeeTagged, deleteEmployeeTagged } = useEmployeesTagged();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showNotification = useNotification();

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Move hooks to component level with null checks
  const { customer } = useCustomers(selectedConversation?.customerId || undefined);
  const { customerRequests } = useRequests(selectedConversation?.customerId || undefined);

  // Split into separate effects for better control
  useEffect(() => {
    if (selectedConversation?.customerId && customer) {
      setSelectedCustomer(customer);
    }
  }, [selectedConversation?.customerId, customer]);

  useEffect(() => {
    if (selectedConversation?.customerId && customerRequests) {
      setCustomerAllRequests(customerRequests);
    }
  }, [selectedConversation?.customerId, customerRequests]);

  useEffect(() => {
    if (selectedConversation) {
      loadEmployeesData(selectedConversation.id);
    }
  })

  useEffect(() => {
    if (connection && selectedConversation?.id) {
      connection
        .invoke("JoinConversation", selectedConversation.id)
        .then(() => console.log(`Joined group for conversation ${selectedConversation.id}`))
        .catch((err) => console.error("Error joining group:", err));
    }
  }, [connection, selectedConversation?.id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`http://localhost:5099/chatHub`)
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR");
        setConnection(newConnection);
      })
      .catch((err) => {
        console.error("Error while starting connection: ", err);
      });

    // Lắng nghe sự kiện nhận tin nhắn
    newConnection.on("ReceiveMessage", (message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        // Sắp xếp các tin nhắn theo thời gian
        updatedMessages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        return updatedMessages;
      });
      console.log("Received message: ", message);
    });

    // Lắng nghe sự kiện tải tin nhắn
    newConnection.on("LoadMessages", (loadedMessages) => {
      const sortedMessages: MessageResponseModel[] = loadedMessages.sort((a: MessageResponseModel, b: MessageResponseModel) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setMessages(sortedMessages);
    });

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);

  // Handle events
  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "issueType" ? parseInt(value) : value
    }));
  };

  const handleConversationClick = async (conversation: ConversationResponseModel) => {
    setSelectedConversation(conversation);
    await connection?.invoke("GetConversationMessages", conversation.id);
  };

  const loadEmployeesData = async (conversationId: string) => {
    const { employeesTagged } = useEmployeesTagged(conversationId);
    if (employeesTagged) {
      const employees: any[] = [];
      for (const element of employeesTagged) {
        const { user } = useUsers(element.employeeId);
        if (user) {
          employees.push(user);
        }
      }
      setEmployeesTagged(employees);
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!selectedMessage.trim()) return;

    if (connection?.state.trim() === "Connected") {
      const newMessage = {
        conversationId: selectedConversation?.id ?? null,
        messageText: selectedMessage,
        sender: localStorage.getItem("userProfile") ? JSON.parse(localStorage.getItem("userProfile") as string).id : null,
        customerId: selectedConversation?.customerId ?? null,
      };

      connection.invoke(
        "SendMessage",
        newMessage.conversationId,
        newMessage.messageText,
        newMessage.sender,
        newMessage.customerId
      ).catch((err) => console.error("Error while sending message: ", err));

      setSelectedMessage("");
    } else {
      console.error("Unable to send message: SignalR connection is not in 'Connected' state.");
    }
  };

  const handleUserSelect = async (conversationId: string, employeeId: string, taggedBy: string) => {
    const data = {
      conversationId,
      employeeId,
      taggedBy,
    };
    console.log("Tagged employee need to be saved: ", data);
    try {
      await createEmployeeTagged(data);
      showNotification('Employee tagged successfully', 'success');
    } catch (error) {
      showNotification('Failed to tag employee', 'error');
    }
  }

  const handleUpdateRequest = async (data: RequestUpdateRequestModel) => {
    try {
      await updateRequest(data);
      showNotification('Request support ticket updated successfully', 'success');
    } catch (error) {
      showNotification('Failed to update request', 'error');
    }
  };

  const handleEmployeeTaggedSelect = async (user: any) => {
    setUserNameInput("");
    if (employeesTagged && employeesTagged.some(tagged => tagged.employeeId === user.id)) {
      showNotification("This staff have already exist!", 'error');
    } else {
      if (selectedConversation?.id) {
        handleUserSelect(selectedConversation.id, user.id, JSON.parse(localStorage.getItem("userProfile") as string).id);
      }
    }
  }

  const handlerEmployeeTaggedRemove = async (userId: string) => {
    try {
      const taggedId = employeesTagged.find(tagged => tagged.employeeId === userId)?.id;
      await deleteEmployeeTagged(taggedId);
      showNotification('Employee removed successfully', 'success');
    } catch (error) {
      showNotification('Failed to remove employee', 'error');
    }
  }

  const onSubmitCreateRequest = async (data: RequestCreateRequestModel) => {
    try {
      await createRequest(data);
      showNotification('Request created successfully', 'success');
    } catch (error) {
      showNotification('Failed to create request', 'error');
    }
  }

  return (
    <Box h="calc(100vh - 95px)" p={4} className='box'>
      <Flex direction="row" h="full" style={{ width: "100%" }}>
        <ConversationList
          conversations={conversations}
          seletedConversation={selectedConversation}
          handleConversationClick={handleConversationClick}
          isConversationsLoading={isConersationsLoading}
        />
        <MessageBox
          loginUser={JSON.parse(localStorage.getItem("userProfile") as string)}
          employeesTagged={employeesTagged}
          messages={messages}
          message={selectedMessage}
          setMessage={setSelectedMessage}
          sendMessage={sendMessage}
          messagesEndRef={messagesEndRef}
          customer={selectedCustomer} />
        <ConversationInfo
          userLogin={JSON.parse(localStorage.getItem("userProfile") as string)}
          selectedConversation={selectedConversation}
          selectedCustomer={selectedCustomer}
          employeesTaggeds={employeesTagged}
          requests={customerAllRequests ?? null}
          onSubmitCreateRequest={onSubmitCreateRequest}
          handleEmployeeTaggedSelect={handleEmployeeTaggedSelect}
          handlerEmployeeTaggedRemove={handlerEmployeeTaggedRemove}
          isEditConversationStatus={isEditConversationStatus}
          setIsEditConversationStatus={setIsEditConversationStatus}
          isOpenCreateTicket={isOpenCreateTicket}
          setIsOpenCreateTicket={setIsOpenCreateTicket}
          setSelectedRequest={setSelectedRequest}
          userNameInput={userNameInput}
          setUserNameInput={setUserNameInput}
          formData={formData}
          handleFormDataChange={handleFormDataChange}
          onOpen={onOpen}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent maxW="800px">
          <ModalHeader>
            Request Support Ticket Details
          </ModalHeader>
          <ModalBody>
            <UpdateComponent
              onSubmit={handleUpdateRequest}
              request={selectedRequest ?? {} as RequestResponseModel}
              onCancel={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};