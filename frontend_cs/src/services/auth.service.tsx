import { LoginRequestModel, SignupRequestModel, LoginResponseModel } from '@/abstract';
import axiosInterceptorInstance from '@/interceptors/axiosInterceptorInstance';
import Cookies from 'js-cookie';

const API_URL = `${import.meta.env.VITE_REACT_APP_API_URL}/Auth`;

export const loginCustomer = async (loginRequest: LoginRequestModel) => {
    const response = await axiosInterceptorInstance.post<LoginResponseModel>(`${API_URL}/customer-login`, loginRequest);
    const token = response.data.token;
    const profile = response.data.user; 
    Cookies.set('token', token, { expires: 7 }); 
    localStorage.setItem('customerProfile', JSON.stringify(profile)); 
    return response.data;
};

export const loginUser = async (loginRequest: LoginRequestModel) => {
    const response = await axiosInterceptorInstance.post<LoginResponseModel>(`${API_URL}/user-login`, loginRequest);
    const token = response.data.token;
    const profile = response.data.user; 
    Cookies.set('token', token, { expires: 7 }); 
    localStorage.setItem('userProfile', JSON.stringify(profile)); 
    return response.data;
};

export const registerCustomer = async (createCustomerCommand: SignupRequestModel) => {
    const response = await axiosInterceptorInstance.post(`${API_URL}/customer-register`, createCustomerCommand);
    return response.data;
};