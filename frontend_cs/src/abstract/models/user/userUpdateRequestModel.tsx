import { UserRoleEnum, UserStatusEnum } from "@/abstract/enum";

export interface UserUpdateRequestModel {
    id: string;
    name: string | null;
    phoneNumber: string | null;
    password: string | null;
    status: UserStatusEnum | null;
    role: UserRoleEnum | null;
}