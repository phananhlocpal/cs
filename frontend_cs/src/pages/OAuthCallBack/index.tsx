import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const token = Cookies.get('token');
      if (token) {
        navigate('/home');
      } else {
        navigate('/login');
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return <div>Loading...</div>;
};