import { Box, Input, Button, VStack, Text, Flex, IconButton, useDisclosure, SlideFade } from "@chakra-ui/react";
import { CloseIcon, ChatIcon } from "@chakra-ui/icons";
import { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { conversationService } from "@/services";
import { ConversationResponseModel, MessageResponseModel } from "@/abstract";

export const ChatComponent = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [conversation, setConversation] = useState<ConversationResponseModel | null>(null);
  const [messages, setMessages] = useState<MessageResponseModel[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (connection && conversation?.id) {
      connection
        .invoke("JoinConversation", conversation.id)
        .then(() => console.log(`Joined group for conversation ${conversation.id}`))
        .catch((err) => console.error("Error joining group:", err));
    }
  }, [connection, conversation?.id]);

  useEffect(() => {
    const customerProfile = localStorage.getItem("customerProfile");
    if (customerProfile) {
      const customerId = JSON.parse(customerProfile).id;

      conversationService.getConversationByCustomerId(customerId)
        .then((res) => {
          console.log("Response is", res)
          setConversation(res);

          if (res.id) {
            connection?.invoke("GetConversationMessages", res.id);
          }
        })
        .catch((err) => {
          console.error("Error loading conversation:", err);
        });
    }
  }, [connection]);

  useEffect(() => {
    // Tạo kết nối SignalR
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5099/chatHub")
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

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (connection?.state === "Connected") {
      const newMessage = {
        conversationId: conversation?.id ?? null,
        messageText: message,
        sender: null,
        customerId: localStorage.getItem("customerProfile")
          ? JSON.parse(localStorage.getItem("customerProfile") as string).id
          : null,
      };

      // Gửi tin nhắn tới SignalR Hub
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

  return (
    <>
      {/* Chat Toggle Button */}
      <IconButton
        icon={<ChatIcon />}
        position="fixed"
        bottom="4"
        right="4"
        colorScheme="blue"
        size="lg"
        borderRadius="full"
        onClick={onToggle}
        aria-label="Toggle chat"
      />

      {/* Chat Box */}
      <SlideFade in={isOpen} offsetY="20px">
        <Box position="fixed" bottom="20" right="4" w="350px" h="400px" bg="white" boxShadow="xl" borderRadius="lg" overflow="hidden">
          {/* Header */}
          <Flex bg="blue.500" p={3} color="white" justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold">Chat Support</Text>
            <IconButton icon={<CloseIcon />} size="sm" variant="ghost" color="white" onClick={onToggle} aria-label="Close chat" _hover={{ bg: "blue.600" }} />
          </Flex>

          {/* Messages Area */}
          <VStack h="280px" overflowY="auto" p={4} spacing={4} align="stretch">
            {Array.isArray(messages) && messages.length > 0 ? (
              messages.map((msg) => (
                <Box
                  key={msg.id}
                  alignSelf={msg.sender === "00000000-0000-0000-0000-000000000000" || null ? "flex-end" : "flex-start"}
                  bg={msg.sender === "00000000-0000-0000-0000-000000000000" || null ? "blue.500" : "gray.100"}
                  color={msg.sender === "00000000-0000-0000-0000-000000000000" || null ? "white" : "black"}
                  p={3}
                  borderRadius="lg"
                  maxW="70%"
                >
                  <Text>{msg.messageText}</Text>
                  <Text fontSize="xs" opacity={0.8} mt={1}>
                    {new Date(msg.timestamp).toLocaleString()}
                  </Text>
                </Box>
              ))
            ) : (
              <Text color="gray.500" textAlign="center">
                No messages yet.
              </Text>
            )}
            <div ref={messagesEndRef} />
          </VStack>


          {/* Input Area */}
          <Flex p={3} borderTop="1px" borderColor="gray.200">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              mr={2}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
          </Flex>
        </Box>
      </SlideFade>
    </>
  );
};
