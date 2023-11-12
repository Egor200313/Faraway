import { useState } from 'react';

import { LoginContainer } from './LoginContainer';
import { Step0 } from './Step0';
import { Step2 } from './Step2';
import { Step1 } from './Step1';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setField } from '../features/user/userSlice';
import { useRegister } from './useRegister';
import { useLogin } from './useLogin';

export function Register(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    password: '',
    pwdconfirm: '',
    step: 0,
  });

  const [error, setError] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    city: '',
    country: '',
    password: '',
    pwdconfirm: '',
  });

  const REQUIRED_FIELDS = {
    0: ['firstname', 'lastname'],
    1: ['city', 'country', 'email'],
    2: ['password'],
  };

  const {
    firstname,
    lastname,
    phone,
    email,
    city,
    country,
    password,
    pwdconfirm,
    step,
  } = state;
  const values = {
    firstname,
    lastname,
    phone,
    email,
    city,
    country,
    password,
    pwdconfirm,
  };
  const from_registration = true;

  const { handleLogin } = useLogin({
    email,
    password,
    setError,
    from_registration,
  });
  const { handleRegister } = useRegister({
    email,
    password,
    firstname,
    lastname,
    phone,
    city,
    country,
    setError,
    handleLogin,
  });

  const handleChange = (input) => (e) => {
    setState((prevState) => ({ ...prevState, [input]: e.target.value }));
  };

  const handleErrorChange = (input) => (err) => {
    setError((prevError) => ({ ...prevError, [input]: err }));
  };

  const handleClick = () => {
    if (validateStep(state.step)) setState({ ...state, step: step + 1 });
  };

  const validateStep = (step) => {
    let noErrors = true;

    // Handle empty required fields
    for (let field of REQUIRED_FIELDS[step]) {
      if (!state[field]) {
        handleErrorChange(field)(`Field required`);
        noErrors = false;
      }
    }

    // Handle incorrect input
    Object.keys(error).map((field) => {
      if (error[field]) noErrors = false;
      return true;
    });

    return noErrors;
  };

  const submitForm = () => {
    if (!state.pwdconfirm)
      handleErrorChange('pwdconfirm')('Password should be the same');
    if (validateStep(2)) {
      handleRegister();
      //props.onUserChange(state);
      /*dispatch(setField({ field: 'firstname', value: state.firstname }));
      dispatch(setField({ field: 'lastname', value: state.lastname }));
      dispatch(setField({ field: 'city', value: state.city }));
      dispatch(setField({ field: 'country', value: state.country }));
      dispatch(setField({ field: 'email', value: state.email }));
      dispatch(setField({ field: 'password', value: state.password }));
      dispatch(setField({ field: 'phone', value: state.phone }));*/

      navigate(`/greeting/${state.firstname}`);
    }
  };

  return (
    <LoginContainer>
      {state.step === 0 && (
        <Step0
          handleChange={handleChange}
          values={values}
          handleClick={handleClick}
          handleErrorChange={handleErrorChange}
          error={error}
        />
      )}

      {state.step === 1 && (
        <Step1
          handleChange={handleChange}
          values={values}
          handleClick={handleClick}
          handleErrorChange={handleErrorChange}
          error={error}
        />
      )}

      {state.step === 2 && (
        <Step2
          handleChange={handleChange}
          values={values}
          onSubmit={submitForm}
          handleErrorChange={handleErrorChange}
          error={error}
        />
      )}
    </LoginContainer>
  );
}
