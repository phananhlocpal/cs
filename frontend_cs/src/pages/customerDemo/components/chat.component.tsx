import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    Flex,
    IconButton,
    useDisclosure,
    SlideFade
  } from "@chakra-ui/react";
  import { CloseIcon, ChatIcon } from "@chakra-ui/icons";
  import { useState } from "react";
  
  export const ChatComponent = () => {
    const { isOpen, onToggle } = useDisclosure();
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
          <Box
            position="fixed"
            bottom="20"
            right="4"
            w="350px"
            h="400px"
            bg="white"
            boxShadow="xl"
            borderRadius="lg"
            overflow="hidden"
          >
            {/* Header */}
            <Flex
              bg="blue.500"
              p={3}
              color="white"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text fontWeight="bold">Chat Support</Text>
              <IconButton
                icon={<CloseIcon />}
                size="sm"
                variant="ghost"
                color="white"
                onClick={onToggle}
                aria-label="Close chat"
                _hover={{ bg: "blue.600" }}
              />
            </Flex>
  
            {/* Messages Area */}
            <VStack
              h="280px"
              overflowY="auto"
              p={4}
              spacing={4}
              align="stretch"
            >
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
  
            {/* Input Area */}
            <Flex p={3} borderTop="1px" borderColor="gray.200">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                mr={2}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button
                colorScheme="blue"
                onClick={sendMessage}
              >
                Send
              </Button>
            </Flex>
          </Box>
        </SlideFade>
      </>
    );
  };