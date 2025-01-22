import { ConversationListProp } from "@/abstract";
import { getCustomerNameByIdHelper } from "@/helpers";
import { Box, VStack, Text, Tag, Spinner } from "@chakra-ui/react";

export const ConversationList = ({ conversations, seletedConversation, handleConversationClick, isConversationsLoading } : ConversationListProp) => {
    return (
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
                {conversations?.length > 0 ? (
                    conversations.map((conv: any) => (
                        <Box
                            key={conv.id}
                            p={3}
                            borderRadius="lg"
                            bg={seletedConversation?.id === conv.id ? "blue.100" : "gray.50"}
                            onClick={() => handleConversationClick(conv)}
                            cursor="pointer"
                        >
                            <Text fontWeight="bold" className="mb-2">
                                {getCustomerNameByIdHelper(conv.customerId) || "Loading..."}
                            </Text>
                            <Tag>
                                {conv.status}
                            </Tag>
                        </Box>
                    ))
                ) : (
                    <Text color="gray.500" textAlign="center">
                        No conversations yet.
                    </Text>
                )}
            </VStack>
            {isConversationsLoading && (
                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                    <Spinner size="xl" />
                </Box>
            )}
        </Box>
    );
};
