import { UserStatusEnum, UserRoleEnum } from "@/abstract";

export interface UserResponseModel {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: UserStatusEnum;
    role: UserRoleEnum;
}