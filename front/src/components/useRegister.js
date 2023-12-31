import { ajaxAuthService, ajaxUserService } from '../service/ajaxService';

export function useRegister({
  email,
  password,
  firstname,
  lastname,
  phone,
  city,
  country,
  setError,
  handleLogin,
}) {
  const handleRegister = () => {
    ajaxAuthService('/register', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstname,
        lastName: lastname,
        phone: phone,
        city: city,
        country: country,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTimeout(() => {
      handleLogin();
    }, 1000);
  };
  return { handleRegister };
}
