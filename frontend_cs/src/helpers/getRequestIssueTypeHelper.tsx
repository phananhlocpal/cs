import { RequestIssueTypeEnum } from '@/abstract';

export const getRequestIssueTypeHelper = (status: number): RequestIssueTypeEnum => {
    switch (status) {
        case 0:
            return RequestIssueTypeEnum.Issue1;
        case 1:
            return RequestIssueTypeEnum.Issue2;
        case 2:
            return RequestIssueTypeEnum.Issue3;
        default:
            throw new Error('Invalid status');
    }
};