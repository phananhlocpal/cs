import axiosInterceptorInstance from '@/interceptors/axiosInterceptorInstance';
import { 
  CustomerResponseModel,
  CustomerCreateRequestModel,
  CustomerUpdateRequestModel
} from '@/abstract';

class CustomerService {
  private baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/Customers`;
  // Get all customers
  async getAllCustomers(): Promise<CustomerResponseModel[]> {
    try {
      const response = await axiosInterceptorInstance.get(this.baseUrl);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Get customer by ID
  async getCustomerById(id: string): Promise<CustomerResponseModel> {
    try {
      const response = await axiosInterceptorInstance.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Create new customer
  async createCustomer(customer: CustomerCreateRequestModel): Promise<CustomerResponseModel> {
    try {
      const response = await axiosInterceptorInstance.post(this.baseUrl, customer);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Update customer
  async updateCustomer(customer: CustomerUpdateRequestModel): Promise<CustomerResponseModel> {
    try {
      const response = await axiosInterceptorInstance.put(`${this.baseUrl}`, customer);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async resetPassword(customerId: string) {
    try {
      await axiosInterceptorInstance.post(`${this.baseUrl}/resetedPassword`, customerId)
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: unknown): never {
    console.error('API Error:', error);
    throw error;
  }
}

// Export singleton instance
export const customerService = new CustomerService();