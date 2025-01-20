import { ConversationResponseModel,CustomerResponseModel } from "@/abstract/models";

export interface ConversationInfoProp {
    conversation: ConversationResponseModel | null
    customer: CustomerResponseModel | null;
}