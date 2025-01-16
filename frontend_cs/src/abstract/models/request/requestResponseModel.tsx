import { CustomerResponseModel, UserResponseModel, RequestStatusEnum  } from "@/abstract";

export interface RequestResponseModel {
    id: string;
    title: string;
    description: string;
    createdDate: Date;
    status: RequestStatusEnum;
    personInCharge: UserResponseModel;
    customer: CustomerResponseModel;
}

