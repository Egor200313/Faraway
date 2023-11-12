import { Link } from 'react-router-dom';
import { FormInput } from './FormInput';
const normalizeCity = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

export const Step1 = ({
  values,
  handleChange,
  error,
  handleErrorChange,
  handleClick,
}) => {
  const validateEmail = (e) => {
    let regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!e.target.value.match(regexp)) {
      handleErrorChange('email')('Incorrect format');
    }
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
            legend={'City'}
            value={normalizeCity(values.city)}
            onChange={(e) => {
              handleErrorChange('city')('');
              handleChange('city')(e);
            }}
            error={error.city}
            name={'city'}
          />
          <FormInput
            legend={'Country'}
            value={normalizeCity(values.country)}
            onChange={(e) => {
              handleErrorChange('country')('');
              handleChange('country')(e);
            }}
            error={error.country}
            name={'country'}
          />
          <FormInput
            legend={'Email'}
            value={values.email}
            onChange={(e) => {
              handleErrorChange('email')('');
              handleChange('email')(e);
            }}
            name={'email'}
            error={error.email}
            onBlur={validateEmail}
          />
          <button onClick={handleClick} className="form-btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
