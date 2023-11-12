import '../css/Form.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { PasswordInput } from './PasswordInput';

const MINIMAL_PASSWORD_LENGTH = 8;

const getQuality = (pwd) => {
  if (!pwd) return '';
  if (pwd.length < MINIMAL_PASSWORD_LENGTH - 1) return '';
  const specials = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const digits = /[0-9]/;
  const caps = /[A-Z]/;
  const smalls = /[a-z]/;
  if (
    digits.test(pwd) &&
    caps.test(pwd) &&
    specials.test(pwd) &&
    smalls.test(pwd)
  )
    return 'strong';
  if (
    digits.test(pwd) &&
    (caps.test(pwd) || smalls.test(pwd) || specials.test(pwd))
  )
    return 'good';
  return 'weak';
};

export const Step2 = ({
  values,
  handleChange,
  error,
  handleErrorChange,
  onSubmit,
}) => {
  const [visible, setVisible] = useState(false);
  const [iconName, setIconName] = useState('visible.png');
  const [quality, setQuality] = useState('');

  const onChangePasswordCheck = (event) => {
    if (event.target.value !== values.password)
      handleErrorChange('pwdconfirm')(`Password should be the same`);
    else handleErrorChange('pwdconfirm')('');
    handleChange('pwdconfirm')(event);
  };

  const validatePasswordCheck = (event) => {
    if (event.target.value !== values.password)
      handleErrorChange('pwdconfirm')(`Password should be the same`);
  };

  const validatePassword = (event) => {
    if (values.password < MINIMAL_PASSWORD_LENGTH)
      handleErrorChange('password')(
        `At least ${MINIMAL_PASSWORD_LENGTH} characters required`
      );
  };

  const handleEyeClick = (event) => {
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
        <Link to="/login" className="left-header inactive" name="login">
          Login
        </Link>
        <Link to="/register/step0" className="right-header" name="register">
          Register
        </Link>
      </div>
      <div className="login-content">
        <div className="form-div">
          <PasswordInput
            value={values.password}
            onChange={(e) => {
              handleErrorChange('password')('');
              handleChange('password')(e);
              setQuality(getQuality(values.password));
            }}
            type={visible ? 'text' : 'password'}
            iconName={iconName}
            handleClick={handleEyeClick}
            quality={quality}
            error={error.password}
            onBlur={validatePassword}
          />

          <PasswordInput
            value={values.pwdconfirm}
            placeholder={'Repeat password...'}
            onChange={onChangePasswordCheck}
            type={visible ? 'text' : 'password'}
            iconName={iconName}
            handleClick={handleEyeClick}
            error={error.pwdconfirm}
            onBlur={validatePasswordCheck}
          />

          <button className="form-btn" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
