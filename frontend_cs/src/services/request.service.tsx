import axios from 'axios';
import { RequestResponseModel, RequestCreateRequestModel, RequestStatusEnum, RequestUpdateRequestModel } from '@/abstract';

export class RequestService {
  private baseUrl = 'http://localhost:5099/api/Requests';

  // Get all requests
  async getAllRequests(): Promise<RequestResponseModel[]> {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  // Get request by ID
  async getRequestById(id: string): Promise<RequestResponseModel> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  // Get requests by customer ID
  async getRequestsByCustomerId(customerId: string): Promise<RequestResponseModel[]> {
    const response = await axios.get(`${this.baseUrl}/customer/${customerId}`);
    return response.data;
  }

  // Get requests by status
  async getRequestsByStatus(status: RequestStatusEnum): Promise<RequestResponseModel[]> {
    const response = await axios.get(`${this.baseUrl}/status/${status}`);
    return response.data;
  }

  // Get requests by user ID
  async getRequestsByUserId(userId: string): Promise<RequestResponseModel[]> {
    const response = await axios.get(`${this.baseUrl}/user/${userId}`);
    return response.data;
  }

  // Create new request
  async createRequest(request: RequestCreateRequestModel): Promise<RequestResponseModel> {
    const response = await axios.post(this.baseUrl, request);
    return response.data;
  }

  // Update request
  async updateRequest(request: RequestUpdateRequestModel) {
    const response = await axios.put(this.baseUrl, request);
    return response.data;
  }

  // Delete request
  async deleteRequest(id: string): Promise<boolean> {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.status === 200;
  }

  // Error handler
  private handleError(error: any): never {
    console.error('API Error:', error);
    throw error;
  }
}

export const requestService = new RequestService();