import { useNavigate } from 'react-router-dom';

let navigateFunction: ReturnType<typeof useNavigate>;

export const setNavigateFunction = (navigate: ReturnType<typeof useNavigate>) => {
  navigateFunction = navigate;
};

export const navigateToLogin = () => {
  if (navigateFunction) {
    navigateFunction('/login');
  }
};