import axiosInterceptorInstance from '@/interceptors/axiosInterceptorInstance';
import { ConversationResponseModel } from '@/abstract';

class ConversationService {
    private baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/Conversations`;

    // Get all customers
    async getAllConversation(): Promise<ConversationResponseModel[]> {
        try {
            const response = await axiosInterceptorInstance.get(this.baseUrl);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Get customer by ID
    async getConversationById(id: string): Promise<ConversationResponseModel> {
        try {
            const response = await axiosInterceptorInstance.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Get conversation by customer ID
    async getConversationByCustomerId(customerId: string): Promise<ConversationResponseModel> {
        try {
            const response = await axiosInterceptorInstance.get(`${this.baseUrl}/customer/${customerId}`);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: unknown): never {
        console.error('API Error:', error);
        throw error;
    }
}

export const conversationService = new ConversationService();