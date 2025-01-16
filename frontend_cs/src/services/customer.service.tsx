import axios from 'axios';
import { 
  CustomerResponseModel, 
  CustomerCreateRequestModel, 
  CustomerUpdateRequestModel 
} from '@/abstract';

class CustomerService {
  private baseUrl = 'http://localhost:5099/api/Customers';

  // Get all customers
  async getAllCustomers(): Promise<CustomerResponseModel[]> {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Get customer by ID
  async getCustomerById(id: string): Promise<CustomerResponseModel> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Create new customer
  async createCustomer(customer: CustomerCreateRequestModel): Promise<CustomerResponseModel> {
    try {
      const response = await axios.post(this.baseUrl, customer);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Update customer
  async updateCustomer(id: string, customer: CustomerUpdateRequestModel): Promise<CustomerResponseModel> {
    try {
      const response = await axios.put(`${this.baseUrl}/${id}`, customer);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Error handler
  private handleError(error: any): never {
    console.error('API Error:', error);
    throw error;
  }
}

// Export singleton instance
export const customerService = new CustomerService();