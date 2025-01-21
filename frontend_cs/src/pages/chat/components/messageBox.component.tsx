import { MessageBoxProp } from "@/abstract/props/chatProps/MessageBoxProp";
import { Box, VStack, Text, Flex, Input, Button, Avatar } from "@chakra-ui/react";

export const MessageBox = ({ employeesTagged, messages, message, setMessage, sendMessage, messagesEndRef, customer }: MessageBoxProp) => {
    const userProfile = localStorage.getItem("userProfile");
    const userId = userProfile ? JSON.parse(userProfile).id : null;

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
                    <Flex className="mb-5 rounded-lg" bg="blue.500" p={3} color="white"  alignItems="center">
                        <Avatar
                            size={'sm'}
                            className="mr-3"
                            src={
                                'https://th.bing.com/th/id/R.030e8808f8c61d4145840f4ad2bd8629?rik=xwfwJrfgeTxaBg&riu=http%3a%2f%2fimg1.wikia.nocookie.net%2f__cb20140505230441%2fdragonball%2fimages%2fc%2fc3%2fSplit-test-success-kid-meme-300x300.jpg&ehk=1rUnv63VnwJnyuXkhFRD4ifeJV1CVSEi58KRE5J2oTo%3d&risl=&pid=ImgRaw&r=0'
                            }
                        />
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
                    disabled={employeesTagged.length > 0 && !employeesTagged.some(employee => employee.employeeId === userId)}
                />
                <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
            </Flex>
            <Box ml={4}>
                {
                    employeesTagged.length > 0 && !employeesTagged.some(employee => employee.employeeId === userId) ?
                        (
                            <Text mt={3} color="red" fontStyle="italic">You don't have permission to send message to this customer!</Text>
                        ) : (null)
                }
            </Box>

        </Box>
    );
}