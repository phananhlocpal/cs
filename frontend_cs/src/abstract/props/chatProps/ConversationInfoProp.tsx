import { ConversationResponseModel, CustomerResponseModel, EmployeeTaggedResponseModel, RequestCreateRequestModel, RequestResponseModel, UserResponseModel } from "@/abstract/models";

export interface ConversationInfoProp {
    userLogin: UserResponseModel;
    selectedConversation: ConversationResponseModel | null;
    selectedCustomer: CustomerResponseModel | null;
    employeesTaggeds: EmployeeTaggedResponseModel[] | null;
    requests: RequestResponseModel[] | null;
    onSubmitCreateRequest: (data: RequestCreateRequestModel) => void;
    handleEmployeeTaggedSelect: (employee: UserResponseModel) => void;
    handlerEmployeeTaggedRemove: (taggedId: string) => void;
    isEditConversationStatus: boolean;
    setIsEditConversationStatus: (status: boolean) => void;
    isOpenCreateTicket: boolean;
    setIsOpenCreateTicket: (status: boolean) => void;
    setSelectedRequest: (request: RequestResponseModel) => void;
    userNameInput: string;
    setUserNameInput: (value: string) => void;
    formData: RequestCreateRequestModel;
    handleFormDataChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onOpen: () => void;
}