import { RequestStatusEnum } from '@/abstract';

export const getRequestStatusColorHelper = (status: RequestStatusEnum): string => {
    switch (status) {
        case RequestStatusEnum.Created:
            return 'blue';
        case RequestStatusEnum.OnProcessing:
            return 'orange';
        case RequestStatusEnum.Pending:
            return 'yellow';
        case RequestStatusEnum.Done:
            return 'green';
        default:
            return 'gray';
    }
};