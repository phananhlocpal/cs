import { useQuery } from "@tanstack/react-query";
import { conversationService } from "@/services";

export const useConversations = (customerId?: string) => {

    const conversationsQuery = useQuery({
        queryKey: ['conversations'],
        queryFn: () => conversationService.getAllConversation()
    })

    const conversationsByCustomerQuery = useQuery({
        queryKey: ['conversations', customerId],
        queryFn: () => customerId ? conversationService.getConversationByCustomerId(customerId) : Promise.reject(new Error("customerId is undefined")),
        enabled: !!customerId 
    })

    return {
        conversations: conversationsQuery.data,
        customerConversations: conversationsByCustomerQuery.data,
        isConersationsLoading: conversationsQuery.isLoading,
        isCustomerConversationsLoading: conversationsByCustomerQuery.isLoading,
    }
}