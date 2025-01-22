import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "@/services";

export const useMessages = (conversationId?: string) => {
    const queryClient = useQueryClient();

    const messagesQuery = useQuery({
        queryKey: ['messages'],
        queryFn: () => messageService.getAllMessages()
    });

    const messagesByConversationQuery = useQuery({
        queryKey: ['messages', conversationId],
        queryFn: () => messageService.getMessagesByConversationId(conversationId!),
        enabled: !!conversationId
    });

    const createMessageMutation = useMutation({
        mutationFn: (messageData: any) => messageService.createMessage(messageData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            if (conversationId) {
                queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            }
        }
    });

    const updateMessageMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => 
            messageService.updateMessage(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            if (conversationId) {
                queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
            }
        }
    });

    return {
        messages: messagesQuery.data,
        conversationMessages: messagesByConversationQuery.data,
        isLoading: messagesQuery.isLoading,
        isLoadingConversation: messagesByConversationQuery.isLoading,
        createMessage: createMessageMutation.mutate,
        updateMessage: updateMessageMutation.mutate,
        isCreating: createMessageMutation.status === 'pending',
        isUpdating: updateMessageMutation.status === 'pending',
    };
};