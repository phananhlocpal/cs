import { LoginRequestModel, SignupRequestModel, LoginResponseModel } from '@/abstract';
import axios from 'axios';

const API_URL = 'http://localhost:5099/api/Auth';

export const loginCustomer = async (loginRequest: LoginRequestModel) => {
    const response = await axios.post<LoginResponseModel>(`${API_URL}/customer-login`, loginRequest);
    return response.data;
};

export const loginUser = async (loginRequest: LoginRequestModel) => {
    const response = await axios.post<LoginResponseModel>(`${API_URL}/user-login`, loginRequest);
    return response.data;
};

export const registerCustomer = async (createCustomerCommand: SignupRequestModel) => {
    const response = await axios.post(`${API_URL}/customer-register`, createCustomerCommand);
    return response.data;
};