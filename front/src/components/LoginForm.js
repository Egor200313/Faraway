import '../css/Form.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormInput } from './FormInput';
import { PasswordInput } from './PasswordInput';
import { useLogin } from './useLogin';

export function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [iconName, setIconName] = useState('visible.png');
  const [error, setError] = useState('');

  const { handleLogin } = useLogin({ email, password, setError });

  const onChangeEmail = (event) => {
    setError('');
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setError('');
    setPassword(event.target.value);
  };

  const handleEyeClick = () => {
    setVisible(!visible);
    if (visible) {
      setIconName('visible.png');
    } else {
      setIconName('hidden.png');
    }
  };

  return (
    <div className="login-box">
      <div className="header">
        <Link to="/login" className="left-header" name="login">
          Login
        </Link>
        <Link to="/register" className="right-header inactive" name="register">
          Register
        </Link>
      </div>
      <div className="login-content">
        <div className="form-div">
          <FormInput
            legend={'Email'}
            value={email}
            onChange={onChangeEmail}
            name={'email'}
            error={error}
          />

          <PasswordInput
            value={password}
            onChange={onChangePassword}
            type={visible ? 'text' : 'password'}
            iconName={iconName}
            handleClick={handleEyeClick}
          />

          <button to="/" className="form-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
