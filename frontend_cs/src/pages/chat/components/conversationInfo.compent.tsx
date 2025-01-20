import { ConversationInfoProp } from "@/abstract";
import { Box, VStack, Text } from "@chakra-ui/react";

export const ConversationInfo = ({conversation, customer} : ConversationInfoProp) => {
    return (
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
              <Text fontSize="sm">Created at: {new Date(conversation.createdAt).toLocaleString()}</Text>
              {/* Các thông tin chi tiết khác */}
            </VStack>
          ) : (
            <Text color="gray.500" textAlign="center">
              Select a conversation to see details.
            </Text>
          )}
        </Box>
    );
}