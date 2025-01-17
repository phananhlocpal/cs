import { RequestStatusEnum } from '@/abstract';

export const getRequestStatus = (status: number): RequestStatusEnum => {
    switch (status) {
        case 0:
            return RequestStatusEnum.Created;
        case 1:
            return RequestStatusEnum.OnProcessing;
        case 2:
            return RequestStatusEnum.Pending;
        case 3:
            return RequestStatusEnum.Done;
        default:
            throw new Error('Invalid status');
    }
};