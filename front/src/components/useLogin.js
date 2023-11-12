import { ajaxAuthService, ajaxUserService } from '../service/ajaxService';
import { useNavigate } from 'react-router-dom';

export function useLogin({ email, password, setError, from_registration }) {
  const navigate = useNavigate();
  const handleLogin = () => {
    if (!email) {
      setError('Email required');
      return;
    }

    if (!password) {
      setError('Password required');
      return;
    }

    ajaxAuthService('/token/', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        window.localStorage.setItem('ACCESS', data.access);
        window.localStorage.setItem('REFRESH', data.refresh);
        if (!from_registration) {
          navigate('/');
          window.location.reload();
        }
      })
      .catch(() => {
        setError('Invalid email or password');
      });
  };

  return { handleLogin };
}
