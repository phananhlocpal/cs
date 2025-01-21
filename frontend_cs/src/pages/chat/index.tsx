import { useState, useEffect, useRef } from 'react';
import { Box, Container, Flex, useDisclosure, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import * as signalR from '@microsoft/signalr';
import { conversationService, customerService, requestService, userService } from '@/services';
import { ConversationInfo, ConversationList, MessageBox } from './components';
import { ConversationResponseModel, CustomerResponseModel, MessageResponseModel, RequestCreateRequestModel, RequestResponseModel, RequestUpdateRequestModel } from '@/abstract'
import { employeeTaggedService } from '@/services/employeeTagged.service';
import { useErrorToast, useSucessToast } from '@/utils';
import { UpdateComponent } from '../requests/components';

export const ChatPage = () => {
  const [conversations, setConversations] = useState<ConversationResponseModel[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<ConversationResponseModel | null>(null);
  const [message, setMessage] = useState('');
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [customer, setCustomer] = useState<CustomerResponseModel | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [employeesTagged, setEmployeesTagged] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RequestResponseModel>();

  const showErrorToast = useErrorToast();
  const showSuccessToast = useSucessToast();

  useEffect(() => {
    loadUsers();
    if (conversation) {
      loadEmployeesTagged(conversation.id);
    }
    if (customer) {
      loadRequestByCustomerId(customer.id);
    }
    loadCustomers();
  });

  useEffect(() => {
    if (connection && conversation?.id) {
      connection
        .invoke("JoinConversation", conversation.id)
        .then(() => console.log(`Joined group for conversation ${conversation.id}`))
        .catch((err) => console.error("Error joining group:", err));
    }
  }, [connection, conversation?.id]);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Set up SignalR connection
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

  // Load all conversations
  useEffect(() => {
    conversationService.getAllConversation()
      .then((res) => {
        setConversations(res);
      })
      .catch((err) => {
        console.error("Error loading conversation:", err);
      });
  }, [connection]);

  // Load messages for the selected conversation
  const loadConversationMessages = async (conversation: any) => {
    if (conversation?.customerId) {
      var customer = await customerService.getCustomerById(conversation.customerId);
      setCustomer(customer);
    }
    await connection?.invoke("GetConversationMessages", conversation.id);
  };

  const loadUsers = async () => {
    const users = await userService.getAllUsers();
    setUsers(users);
  }

  const loadEmployeesTagged = async (conversationId: string) => {
    const employeesTagged = await employeeTaggedService.getByConversationId(conversationId);
    setEmployeesTagged(employeesTagged);
  }

  const loadRequestByCustomerId = async (customerId: string) => {
    const requests = await requestService.getRequestsByCustomerId(customerId);
    setRequests(requests);
  }

  const loadCustomers = async () => {
    const customers = await customerService.getAllCustomers();
    setCustomers(customers);
  }

  const handleCreate = async (data: RequestCreateRequestModel) => {
    try {
      console.log(data);
      await requestService.createRequest(data);
      showSuccessToast('Request created successfully');
    } catch (error) {
      showErrorToast('Failed to create request');
    }
  };

  // Send a message
  const sendMessage = async () => {
    if (!message.trim()) return;

    if (connection?.state.trim() === "Connected") {
      const newMessage = {
        conversationId: conversation?.id ?? null,
        messageText: message,
        sender: localStorage.getItem("userProfile") ? JSON.parse(localStorage.getItem("userProfile") as string).id : null,
        customerId: conversation?.customerId ?? null,
      };

      connection.invoke(
        "SendMessage",
        newMessage.conversationId,
        newMessage.messageText,
        newMessage.sender,
        newMessage.customerId
      ).catch((err) => console.error("Error while sending message: ", err));

      setMessage("");
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
      await employeeTaggedService.create(data);
      showSuccessToast('Employee tagged successfully');
    } catch (error) {
      showErrorToast('Failed to tag employee');
    }
  }

  const handlerUserRemove = async (taggedId: string) => {
    try {
      await employeeTaggedService.delete(taggedId);
      showSuccessToast('Employee removed successfully');
    } catch (error) {
      showErrorToast('Failed to remove employee');
    }
  }

  const getCustomerById = (customerId: string): Promise<CustomerResponseModel> => {
    return customerService.getCustomerById(customerId);
  }

  const handleUpdateRequest = async (data: RequestUpdateRequestModel) => {
    try {
      await requestService.updateRequest(data);
      if (customer) {
        loadRequestByCustomerId(customer.id);
      }
      showSuccessToast('Request support ticket updated successfully');
    } catch (error) {
      showErrorToast('Failed to update request');
    }
  };

  return (
    <Box h="calc(100vh - 95px)" p={4} className='box'>
      <Flex direction="row" h="full" style={{ width: "100%" }}>
        <ConversationList conversations={conversations} conversation={conversation} setConversation={setConversation} loadConversationMessages={loadConversationMessages} getCustomerById={getCustomerById} />
        <MessageBox employeesTagged={employeesTagged} messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage} messagesEndRef={messagesEndRef} customer={customer} />
        <ConversationInfo
          conversation={conversation}
          customer={customer}
          employeesTagged={employeesTagged}
          requests={requests}
          onSubmit={handleCreate}
          onCancel={onClose}
          customers={customers}
          users={users}
          handleUserSelect={handleUserSelect}
          handlerUserRemove={handlerUserRemove}
          setSelectedRequest={setSelectedRequest}
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