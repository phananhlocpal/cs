import axiosInterceptorInstance from '@/interceptors/axiosInterceptorInstance';
import { 
  UserResponseModel,
  UserCreateRequestModel,
  UserUpdateRequestModel
} from '@/abstract';

class UserService {
  private baseUrl = `${import.meta.env.VITE_REACT_APP_API_URL}/Users`;
  async getAllUsers(): Promise<UserResponseModel[]> {
    try {
      const response = await axiosInterceptorInstance.get(this.baseUrl);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getUserById(id: string): Promise<UserResponseModel> {
    try {
      const response = await axiosInterceptorInstance.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createUser(user: UserCreateRequestModel): Promise<UserResponseModel> {
    try {
      const response = await axiosInterceptorInstance.post(this.baseUrl, user);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateUser(id: string, user: UserUpdateRequestModel): Promise<UserResponseModel> {
    try {
      const response = await axiosInterceptorInstance.put(`${this.baseUrl}/${id}`, user);
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
export const userService = new UserService();