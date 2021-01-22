import React, { useState } from 'react';

import InputField from '../common/InputField';
import ButtonUser from '../common/button';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router';
import { postData } from '../../axios/apiCalls.js';
import { urls } from '../../config/urls.js';
import Notification from '../common/notifications.jsx';
import Loader from '../common/loader';

const defaultNotification = {
  msg: '',
  show: false,
  type: 'e'
};

const Register = (props) => {
  const checkValidation = (value, rules) => {
    let checkValid = true;

    if (rules.required === true) {
      checkValid = value.trim() !== '' && checkValid;
    }

    if (rules.length === true) {
      checkValid = value.trim().length >= 8 && checkValid;
    }

    if (rules.match === true) {
      checkValid = value.trim() === registerForm.password.value && checkValid;
    }

    return checkValid;
  };

  const inputChangeHandler = (e, id) => {
    const updatedRegisterForm = {
      ...registerForm
    };

    const updatedFormElement = {
      ...updatedRegisterForm[id]
    };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedRegisterForm[id] = updatedFormElement;

    let formValid = true;
    for (let elements in updatedRegisterForm) {
      formValid = updatedRegisterForm[elements].valid && formValid;
    }

    setRegisterForm(updatedRegisterForm);
    setFormValid(formValid);
  };

  const buttonHandler = async (e, value) => {
    e.preventDefault();

    if (value === 'login') {
      props.history.push('/');
    } else if (value === 'submit') {
      setLoading(true);
      const formData = {};
      for (let formelements in registerForm) {
        formData[formelements] = registerForm[formelements].value;
      }
      const sendingData = {
        name: {
          firstname: formData.firstname
        },
        email: formData.email,
        username: formData.username,
        password: formData.password
      };

      if (formData.lastname !== '') {
        sendingData.name.lastname = formData.lastname;
      }
      const result = await postData(urls.register.addNewUser, sendingData);
      if (result.status === 200) {
        setLoading(false);
        setRegisterForm(initalRegisterForm);
        setNotification({
          msg: 'User created successfully',
          show: true,
          type: 's'
        });
        // props.history.push(`/`);
      } else {
        setLoading(false);
        setNotification({
          msg: 'Something went wrong',
          show: true,
          type: 'e'
        });
      }
    }
  };

  const initalRegisterForm = {
    firstname: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'your firstname',
        name: 'First Name*'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false
    },
    lastname: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'your lastname',
        name: 'Last Name'
      },
      value: '',
      validation: {
        required: false
      },
      valid: true
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'your email',
        name: 'Email*'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false
    },
    username: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'pick your username',
        name: 'UserName*'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'your password',
        name: 'Password*'
      },
      value: '',
      validation: {
        required: true,
        length: true
      },
      valid: false
    },
    confirmpassword: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'confirm your password',
        name: 'Confirm Password*'
      },
      value: '',
      validation: {
        required: true,
        length: true,
        match: true
      },
      valid: false
    }
  };

  //States
  const [registerForm, setRegisterForm] = useState(initalRegisterForm);
  const [formValid, setFormValid] = useState(false);
  const [notfication, setNotification] = useState(defaultNotification);
  const [loading, setLoading] = useState(false);

  const registerFormArray = [];
  for (let key in registerForm) {
    registerFormArray.push({
      id: key,
      config: registerForm[key]
    });
  }

  return (
    <div>
      <div
        style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
        <h2>Register</h2>
        <div
          style={{
            textAlign: 'center',
            width: '40vw',
            background:'rgba( 255, 255, 255, 0.4 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 3.3px )',
            padding: '10px',
            borderRadius: '10px'
          }}>
          <Box>
            <form autoComplete='off'>
              {registerFormArray.map((element) => {
                return (
                  <InputField
                    key={element.id}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldBeChecked={element.config.validation}
                    valueChange={(e) => inputChangeHandler(e, element.id)}
                  />
                );
              })}
            </form>
            <Box
              p={2}
              style={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center'
              }}>
              <ButtonUser
                text={'Submit'}
                color='primary'
                buttonHandler={(e) => buttonHandler(e, 'submit')}
                disabled={!formValid}
              />
              <p>OR</p>
              <ButtonUser
                text={'Login Page'}
                buttonHandler={(e) => buttonHandler(e, 'login')}
              />
            </Box>
          </Box>
        </div>
      </div>
      <Notification
        type={notfication.type}
        show={notfication.show}
        msg={notfication.msg}
      />
      {loading ? <Loader style={{ zIndex: 2 }} /> : null}
    </div>
  );
};

export default withRouter(Register);
