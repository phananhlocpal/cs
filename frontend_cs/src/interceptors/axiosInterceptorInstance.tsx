import axios from 'axios';
import Cookies from 'js-cookie';
import { navigateToLogin } from '@/utils';

const axiosInterceptorInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

const checkAuth = async () => {
  const token = Cookies.get('token');
  if (token) {
    return localStorage.getItem("customerProfile");
  }
  navigateToLogin();
  return null;
};

axiosInterceptorInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    console.log("Vào đây");
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInterceptorInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('token');
      localStorage.removeItem('customerProfile');
      navigateToLogin();
    }
    return Promise.reject(error);
  }
);

export { checkAuth };
export default axiosInterceptorInstance;