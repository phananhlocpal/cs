import { UserCreateRequestModel } from "@/abstract";

export interface CreateUserComponentProp {
        onSubmit?: (data: UserCreateRequestModel) => void;
        onCancel?: () => void;
}