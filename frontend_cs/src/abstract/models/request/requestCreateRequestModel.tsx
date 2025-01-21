import { RequestIssueTypeEnum } from "@/abstract/enum"

export interface RequestCreateRequestModel {
    title: string
    description: string
    issueType: number | undefined
    personInChargeId: string
    customerId: string | undefined
}