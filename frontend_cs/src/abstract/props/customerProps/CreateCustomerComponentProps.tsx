import { CustomerCreateRequestModel } from "@/abstract";

export interface CreateCustomerComponentProps {
    onSubmit?: (data: CustomerCreateRequestModel) => void;
    onCancel?: () => void;
}