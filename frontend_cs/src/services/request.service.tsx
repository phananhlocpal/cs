import { RequestResponseModel, RequestCreateRequestModel, RequestStatusEnum, RequestUpdateRequestModel } from '@/abstract';
import axiosInterceptorInstance from '@/interceptors/axiosInterceptorInstance';

export class RequestService {
  private baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/Requests`;
  constructor() {
    console.log(`Base url: ${this.baseUrl}`);
  }

  // Get all requests
  async getAllRequests(): Promise<RequestResponseModel[]> {
    const response = await axiosInterceptorInstance.get(this.baseUrl);
    return response.data;
  }

  // Get request by ID
  async getRequestById(id: string): Promise<RequestResponseModel> {
    const response = await axiosInterceptorInstance.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // Get requests by customer ID
  async getRequestsByCustomerId(customerId: string): Promise<RequestResponseModel[]> {
    const response = await axiosInterceptorInstance.get(`${this.baseUrl}/customer/${customerId}`);
    return response.data;
  }

  // Get requests by status
  async getRequestsByStatus(status: RequestStatusEnum): Promise<RequestResponseModel[]> {
    const response = await axiosInterceptorInstance.get(`${this.baseUrl}/status/${status}`);
    return response.data;
  }

  // Get requests by user ID
  async getRequestsByUserId(userId: string): Promise<RequestResponseModel[]> {
    const response = await axiosInterceptorInstance.get(`${this.baseUrl}/user/${userId}`);
    return response.data;
  }

  // Create new request
  async createRequest(request: RequestCreateRequestModel): Promise<RequestResponseModel> {
    const response = await axiosInterceptorInstance.post(this.baseUrl, request);
    return response.data;
  }

  // Update request
  async updateRequest(request: RequestUpdateRequestModel) {
    const response = await axiosInterceptorInstance.put(this.baseUrl, request);
    return response.data;
  }

  // Delete request
  async deleteRequest(id: string): Promise<boolean> {
    const response = await axiosInterceptorInstance.delete(`${this.baseUrl}/${id}`);
    return response.status === 200;
  }

  // Error handler
  private handleError(error: any): never {
    console.error('API Error:', error);
    throw error;
  }
}

export const requestService = new RequestService();