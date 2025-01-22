import { CustomerResponseModel, EmployeeTaggedResponseModel, MessageResponseModel, UserResponseModel } from "@/abstract";

export interface MessageBoxProp {
    loginUser: UserResponseModel;
    messages: Array<MessageResponseModel>;
    message: string;
    setMessage: (message: string) => void;
    sendMessage: () => void;
    messagesEndRef: React.RefObject<HTMLDivElement>;
    customer: CustomerResponseModel | null;
    employeesTagged: EmployeeTaggedResponseModel[];
}