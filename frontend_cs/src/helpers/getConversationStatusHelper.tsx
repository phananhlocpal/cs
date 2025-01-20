import { ConversationStatusEnum } from '@/abstract';

export const getConversationStatusHelper = (status: number): ConversationStatusEnum => {
    switch (status) {
        case 0:
            return ConversationStatusEnum.opened;
        case 1:
            return ConversationStatusEnum.onProcessing;
        case 2:
            return ConversationStatusEnum.closed;
        default:
            throw new Error('Invalid status');
    }
};