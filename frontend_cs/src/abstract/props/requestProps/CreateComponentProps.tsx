import { RequestCreateRequestModel } from '@/abstract';

export interface CreateComponentProps {
    onSubmit?: (data: RequestCreateRequestModel) => void;
    onCancel?: () => void;
    customers: any;
}