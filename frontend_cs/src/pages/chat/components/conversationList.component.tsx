import { useEffect, useState } from "react";
import { Box, VStack, Text, Tag, Spinner } from "@chakra-ui/react";
import { ConversationListProp } from "@/abstract";
import { getConversationStatusHelper } from "@/helpers";

export const ConversationList = ({ conversations, conversation, setConversation, loadConversationMessages, getCustomerById }: ConversationListProp) => {
    const [customerNames, setCustomerNames] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCustomerNames = async () => {
            const names: { [key: string]: string } = {};
            for (const conv of conversations) {
                const customer = await getCustomerById(conv.customerId);
                names[conv.id] = customer.name;
            }
            setCustomerNames(names);
        };

        fetchCustomerNames();
    }, [conversations]);

    const handleConversationClick =  (conv: any) => {
        setLoading(true);
        loadConversationMessages(conv);
        setConversation(conv);
        setLoading(false);
    };

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
                {conversations.length > 0 ? (
                    conversations.map((conv) => (
                        <Box
                            key={conv.id}
                            p={3}
                            borderRadius="lg"
                            bg={conversation?.id === conv.id ? "blue.100" : "gray.50"}
                            onClick={() => handleConversationClick(conv)}
                            cursor="pointer"
                        >
                            <Text fontWeight="bold" className="mb-2">
                                {customerNames[conv.id] || "Loading..."}
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
            {loading && (
                <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                    <Spinner size="xl" />
                </Box>
            )}
        </Box>
    );
};
