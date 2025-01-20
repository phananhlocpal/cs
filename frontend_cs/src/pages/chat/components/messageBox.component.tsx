import { MessageBoxProp } from "@/abstract/props/chatProps/MessageBoxProp";
import { Box, VStack, Text, Flex, Input, Button } from "@chakra-ui/react";

export const MessageBox = ({ messages, message, setMessage, sendMessage, messagesEndRef, customer }: MessageBoxProp) => {
    return (
        <Box
            className="mx-3"
            flex="2"
            borderWidth={1}
            borderRadius="lg"
            p={4}
            bg="white"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
        >
            {customer && (
                <Box>
                    <Flex className="mb-5 rounded-lg" bg="blue.500" p={3} color="white" justifyContent="space-between" alignItems="center">
                        <Text fontWeight="bold">{customer?.name}</Text>
                    </Flex>
                </Box>
            )}

            {/* Chat History */}
            <Box flex={1} overflowY="auto" mb={4}>
                <VStack spacing={4} align="stretch">
                    {Array.isArray(messages) && messages.length > 0 ? (
                        messages.map((msg) => (
                            <Box
                                key={msg.id}
                                alignSelf={msg.sender == "00000000-0000-0000-0000-000000000000" || null ? "flex-start" : "flex-end"}
                                bg={msg.sender == "00000000-0000-0000-0000-000000000000" || null ? "gray.100" : "blue.500"}
                                color={msg.sender == "00000000-0000-0000-0000-000000000000" || null ? "black" : "white"}
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
                <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Flex p={3} borderTop="1px" borderColor="gray.200">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    mr={2}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
            </Flex>
        </Box>
    );
}