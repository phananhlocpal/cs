import axiosInterceptorInstance from '@/interceptors/axiosInterceptorInstance';
import { EmployeeTaggedResponseModel, EmployeeTaggedCreateRequestModel, EmployeeTaggedUpdateRequestModel } from "@/abstract";

export class EmployeeTaggedService {
    private baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/EmployeesTaggeds`;

    async getAll(): Promise<EmployeeTaggedResponseModel[]> {
        const response = await axiosInterceptorInstance.get(this.baseUrl);
        return response.data;
    }

    async getById(id: string): Promise<EmployeeTaggedResponseModel> {
        const response = await axiosInterceptorInstance.get(`${this.baseUrl}/${id}`);
        return response.data;
    }

    async getByConversationId(conversationId: string): Promise<EmployeeTaggedResponseModel[]> {
        const response = await axiosInterceptorInstance.get(`${this.baseUrl}/conversation/${conversationId}`);
        return response.data;
    }

    async create(data: EmployeeTaggedCreateRequestModel): Promise<EmployeeTaggedResponseModel> {
        const response = await axiosInterceptorInstance.post(this.baseUrl, data);
        return response.data;
    }

    async update(id: string, data: EmployeeTaggedUpdateRequestModel): Promise<EmployeeTaggedResponseModel> {
        const response = await axiosInterceptorInstance.put(`${this.baseUrl}/${id}`, data);
        return response.data;
    }

    async delete(id: string): Promise<void> {
        await axiosInterceptorInstance.delete(`${this.baseUrl}/${id}`);
    }
}

export const employeeTaggedService = new EmployeeTaggedService();