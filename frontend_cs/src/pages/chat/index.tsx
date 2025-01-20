import { useState, useEffect, useRef } from 'react';
import { Box, Container, Flex } from '@chakra-ui/react';
import * as signalR from '@microsoft/signalr';
import { conversationService, customerService } from '@/services';
import { ConversationInfo, ConversationList, MessageBox } from './components';
import { ConversationResponseModel, CustomerResponseModel, MessageResponseModel } from '@/abstract'

export const ChatPage = () => {
  const [conversations, setConversations] = useState<ConversationResponseModel[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversation, setConversation] = useState<ConversationResponseModel | null>(null);
  const [message, setMessage] = useState('');
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [customer, setCustomer] = useState<CustomerResponseModel | null>(null);

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
  const loadConversationMessages = async (conversationId: string) => {
    if (conversation?.customerId) {
      var customer = await customerService.getCustomerById(conversation.customerId);
      console.log(customer);
      setCustomer(customer);
    }
    connection?.invoke("GetConversationMessages", conversationId);
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

  const getCustomerById = (customerId: string): Promise<CustomerResponseModel> => {
    return customerService.getCustomerById(customerId);
  }

  return (
    <Box h="calc(100vh - 95px)" p={4}  className='box'>
      <Flex direction="row" h="full" style={{width:"100%"}}>
        <ConversationList conversations={conversations} conversation={conversation} setConversation={setConversation} loadConversationMessages={loadConversationMessages} getCustomerById={getCustomerById}/>
        <MessageBox messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage} messagesEndRef={messagesEndRef} customer={customer}/>
        <ConversationInfo conversation={conversation} customer={customer}/>
      </Flex>
    </Box>
  );
};