import { CustomerResponseModel, UserResponseModel, RequestStatusEnum, RequestIssueTypeEnum  } from "@/abstract";

export interface RequestResponseModel {
    id: string
    title: string
    description: string
    issueType: number
    createdDate: Date
    status: number
    personInChargeId: string
    customerId: string
}

