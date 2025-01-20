import { Box, Container, Input, Button, VStack, HStack, Text, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { conversationService } from "@/services";
import { ConversationResponseModel, MessageResponseModel } from "@/abstract";

export const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [conversation, setConversation] = useState<ConversationResponseModel | null>(null);
  const [conversations, setConversations] = useState<ConversationResponseModel[]>([]);
  const [messages, setMessages] = useState<MessageResponseModel[]>([]);

  useEffect(() => {
    conversationService.getAllConversation()
      .then((res) => {
        setConversations(res);
      })
      .catch((err) => {
        console.error("Error loading conversation:", err);
      });
  }, [connection]);

  useEffect(() => {
    // Tạo kết nối SignalR
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5099/chatHub")
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
      newConnection.stop();
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (connection?.state === "Connected") {
      const newMessage = {
        conversationId: conversation?.id ?? null,
        messageText: message,
        sender: localStorage.getItem("userProfile") ? JSON.parse(localStorage.getItem("userProfile") as string).id : null,
        customerId: null,
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
    <Container maxW="container.lg" h="calc(100vh - 95px)" p={4}>
      <Flex direction="row" h="full">
        <Box
          flex="1"
          borderWidth={1}
          borderRadius="lg"
          p={4}
          bg="white"
          boxShadow="lg"
          overflowY="auto"
        >
          <VStack spacing={4} align="stretch">
            {conversations.length > 0 ? (
              conversations.map((conv) => (
                <Box
                  key={conv.id}
                  p={3}
                  borderRadius="lg"
                  bg={conversation?.id === conv.id ? "blue.100" : "gray.50"}
                  onClick={() => setConversation(conv)}
                  cursor="pointer"
                >
                  <Text fontWeight="bold">{conv.sender}</Text>
                  <Text fontSize="sm" noOfLines={1}>{conv.conversationId}</Text>
                </Box>
              ))
            ) : (
              <Text color="gray.500" textAlign="center">
                No conversations yet.
              </Text>
            )}
          </VStack>
        </Box>

        {/* Cột 2: Ô chat */}
        <Box
          flex="2"
          borderWidth={1}
          borderRadius="lg"
          p={4}
          bg="white"
          boxShadow="lg"
          display="flex"
          flexDirection="column"
        >
          {/* Chat History */}
          <Box flex={1} overflowY="auto" mb={4}>
            <VStack spacing={4} align="stretch">
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg) => (
                  <Box
                    key={msg.id}
                    alignSelf={msg.sender === "00000000-0000-0000-0000-000000000000" ? "flex-start" : "flex-end"}
                    bg={msg.sender === "00000000-0000-0000-0000-000000000000" ? "gray.100" : "blue.500"}
                    color={msg.sender === "00000000-0000-0000-0000-000000000000" ? "black" : "white" }
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
            </VStack>
          </Box>

          {/* Message Input */}
          <HStack spacing={2}>
            <Input
              bg="white"
              borderRadius="xl"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button colorScheme="blue" onClick={sendMessage}>
              Send
            </Button>
          </HStack>
        </Box>

        {/* Cột 3: Chi tiết cuộc đối thoại */}
        <Box
          flex="1"
          borderWidth={1}
          borderRadius="lg"
          p={4}
          bg="white"
          boxShadow="lg"
        >
          {conversation ? (
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" fontSize="lg">{conversation.id}</Text>
              <Text fontSize="sm">Created at: {new Date(conversation.timestamp).toLocaleString()}</Text>
              {/* Các thông tin chi tiết khác */}
            </VStack>
          ) : (
            <Text color="gray.500" textAlign="center">
              Select a conversation to see details.
            </Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
};
