import { ConversationResponseModel, CustomerResponseModel, EmployeeTaggedResponseModel, RequestCreateRequestModel, RequestResponseModel, UserResponseModel } from "@/abstract/models";

export interface ConversationInfoProp {
    conversation: ConversationResponseModel | null
    customer: CustomerResponseModel | null;
    employeesTagged: EmployeeTaggedResponseModel[] | null;
    requests: RequestResponseModel[] | null;
    onSubmit?: (data: RequestCreateRequestModel) => void;
    onCancel?: () => void;
    customers: any;
    users: UserResponseModel[];
    handleUserSelect: (conversationId: string, employeeId: string, taggedBy: string) => void;
    handlerUserRemove: (taggedId: string) => void;
}