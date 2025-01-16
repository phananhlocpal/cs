import { RequestStatusEnum } from "@/abstract";

export interface RequestUpdateRequestModel {
    id: string;
    description: string | undefined;
    status: RequestStatusEnum | undefined;
}