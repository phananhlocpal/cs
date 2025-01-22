import { ConversationResponseModel, CustomerResponseModel } from "@/abstract/models"

export interface ConversationListProp {
    conversations: ConversationResponseModel[]
    seletedConversation: ConversationResponseModel | null
    handleConversationClick: (conv: any) => void
    isConversationsLoading: boolean
}