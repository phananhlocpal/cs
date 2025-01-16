export interface CreateComponentProps {
    onSubmit?: (data: RequestCreateRequestModel) => void;
    onCancel?: () => void;
    customers: any;
}