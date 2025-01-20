import axiosInterceptorInstance from '@/interceptors/axiosInterceptorInstance';

class MessageService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/Messages`;
    }

    async getAllMessages() {
        try {
            const response = await axiosInterceptorInstance.get(this.baseUrl);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    }

    async getMessageById(id: string) {
        try {
            const response = await axiosInterceptorInstance.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching message by ID:', error);
            throw error;
        }
    }

    async getMessagesByConversationId(id: string) {
        try {
            console.log("Query is ", `${this.baseUrl}/conversationId/${id}`);
            const response = await axiosInterceptorInstance.get(`${this.baseUrl}/conversationId/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error)
        }
    }

    async createMessage(messageData: any) {
        try {
            const response = await axiosInterceptorInstance.post(this.baseUrl, messageData);
            return response.data;
        } catch (error) {
            console.error('Error creating message:', error);
            throw error;
        }
    }

    async updateMessage(id: string, messageData: any) {
        try {
            const response = await axiosInterceptorInstance.put(`${this.baseUrl}/${id}`, messageData);
            return response.data;
        } catch (error) {
            console.error('Error updating message:', error);
            throw error;
        }
    }
}

export const messageService = new MessageService();