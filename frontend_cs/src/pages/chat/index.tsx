import { 
    Box, 
    Container, 
    Input, 
    Button, 
    VStack, 
    HStack, 
    Text,
    Flex 
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  export const ChatPage = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
  
    const sendMessage = () => {
      if (!message.trim()) return;
      setMessages([...messages, {
        id: Date.now(),
        text: message,
        sender: "me",
        timestamp: new Date().toLocaleTimeString()
      }]);
      setMessage("");
    };
  
    return (
      <Container maxW="container.md" h="calc(100vh - 95px)" p={4}>
        <Flex direction="column" h="full">
          {/* Chat History */}
          <Box 
            flex={1} 
            overflowY="auto" 
            borderWidth={1} 
            borderRadius="xl" 
            p={4} 
            mb={4}
            bg="white"
            boxShadow="lg"
          >
            <VStack spacing={4} align="stretch">
              {messages.map((msg) => (
                <Box 
                  key={msg.id}
                  alignSelf={msg.sender === "me" ? "flex-end" : "flex-start"}
                  bg={msg.sender === "me" ? "blue.500" : "gray.100"}
                  color={msg.sender === "me" ? "white" : "black"}
                  p={3}
                  borderRadius="lg"
                  maxW="70%"
                >
                  <Text>{msg.text}</Text>
                  <Text fontSize="xs" opacity={0.8} mt={1}>
                    {msg.timestamp}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
  
          {/* Message Input */}
          <HStack spacing={2} >
            <Input
                bg="white"
                borderRadius="xl"
                className="py-6"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button 
              colorScheme="blue"
              onClick={sendMessage}
              px={8}
            >
              Send
            </Button>
          </HStack>
        </Flex>
      </Container>
    );
  };