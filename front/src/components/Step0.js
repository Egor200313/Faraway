import { Link } from 'react-router-dom';
import { FormInput } from './FormInput';

const normalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const normalizePhone = (phone) => {
  const onlyDigits = phone.replace(/\D/g, '');

  return onlyDigits.length === 11
    ? '+' +
        onlyDigits.slice(0, 1) +
        '-' +
        onlyDigits.slice(1, 4) +
        '-' +
        onlyDigits.slice(4, 7) +
        '-' +
        onlyDigits.slice(7)
    : onlyDigits;
};

export const Step0 = ({
  values,
  handleChange,
  error,
  handleErrorChange,
  handleClick,
}) => {
  const validateName = (event) => {
    if (event.target.name === 'firstname' && !event.target.value)
      handleErrorChange('firstname')('First name required');
    if (event.target.name === 'lastname' && !event.target.value)
      handleErrorChange('lastname')('Last Name required');
  };

  const validatePhone = (event) => {
    const phoneNumber = event.target.value;
    if (phoneNumber.length !== 15 && phoneNumber.length > 0)
      handleErrorChange('phone')('11 digits phone required');
  };

  return (
    <div className="login-box bigger">
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
          <FormInput
            legend={'First Name'}
            value={normalizeName(values.firstname)}
            onChange={(e) => {
              handleErrorChange('firstname')('');
              handleChange('firstname')(e);
            }}
            onBlur={validateName}
            error={error.firstname}
            name={'firstname'}
          />
          <FormInput
            legend={'Last Name'}
            value={normalizeName(values.lastname)}
            onChange={(e) => {
              handleErrorChange('lastname')('');
              handleChange('lastname')(e);
            }}
            onBlur={validateName}
            error={error.lastname}
            name={'lastname'}
          />
          <FormInput
            legend={'Phone'}
            value={normalizePhone(values.phone)}
            onChange={(e) => {
              handleErrorChange('phone')('');
              handleChange('phone')(e);
            }}
            onBlur={validatePhone}
            error={error.phone}
            name={'phone'}
          />
          <button onClick={handleClick} className="form-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
