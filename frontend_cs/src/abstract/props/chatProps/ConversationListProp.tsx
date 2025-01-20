import { ConversationResponseModel, CustomerResponseModel } from "@/abstract/models"

export interface ConversationListProp {
    conversations: ConversationResponseModel[]
    conversation: ConversationResponseModel | null
    setConversation: Function
    loadConversationMessages: Function
    getCustomerById: (customerId: string) => Promise<CustomerResponseModel>
}