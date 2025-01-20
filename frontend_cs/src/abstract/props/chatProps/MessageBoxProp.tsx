import { CustomerResponseModel, MessageResponseModel } from "@/abstract/models"

export interface MessageBoxProp {
    messages: Array<MessageResponseModel>;
    message: string;
    setMessage: (message: string) => void;
    sendMessage: () => void;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    customer: CustomerResponseModel | null;
}