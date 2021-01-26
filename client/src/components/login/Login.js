import React, { useState } from 'react';
import theme from '../../theme'
import InputField from '../common/InputField';
import ButtonUser from '../common/button';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router';
import { getData } from '../../axios/apiCalls.js';
import { urls } from '../../config/urls.js';
import { Container } from '@material-ui/core';
import Notification from '../common/notifications.jsx';
import Loader from '../common/loader';
import auth from '../../auth/auth-helper'
import { Redirect } from 'react-router-dom'
import { signin } from '../../auth/api-auth.js'
const defaultNotification = {
  msg: '',
  show: false,
  type: 'e'
};

const Login = (props) => {
  const checkValidation = (value, rules) => {
    let checkValid = true;

    if (rules.required === true) {
      checkValid = value.trim() !== '' && checkValid;
    }

    if (rules.length === true) {
      checkValid = value.trim().length >= 8 && checkValid;
    }

    return checkValid;
  };

  const inputChangeHandler = (e, id) => {
    const updatedLoginForm = {
      ...loginForm
    };

    const updatedFormElement = {
      ...updatedLoginForm[id]
    };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidation(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedLoginForm[id] = updatedFormElement;

    let formValid = true;
    for (let elements in updatedLoginForm) {
      formValid = updatedLoginForm[elements].valid && formValid;
    }

    setLoginForm(updatedLoginForm);
    setFormValid(formValid);
  };

  const buttonHandler = async (e, value) => {
    e.preventDefault();

    if (value === 'register') {
      props.history.push('/register');
    } else if (value === 'login') {
      setLoading(true);
      const formData = {};
      for (let formelements in loginForm) {
        formData[formelements] = loginForm[formelements].value;
      }
      const result = await getData(urls.login.getAllUsers, formData);
      if (result) {
        setLoading(false);
        if (result.data.auth) {
          props.history.push(`/chats?id=${result.data.userid}`);
        } else if (result.data.auth === false) {
          setNotification({
            msg: 'Incorrect credentials',
            show: true,
            type: 'e'
          });
        } else if (result.data === 'User not found') {
          setNotification({
            msg: result.data,
            show: true,
            type: 'i'
          });
        }
      }
    }
  };

  const initalLoginForm = {
    username: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Enter your username'
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
        placeholder: 'Enter your password'
      },
      value: '',
      validation: {
        required: true,
        length: true
      },
      valid: false
    }
  };

  //States
  const [loginForm, setLoginForm] = useState(initalLoginForm);
  const [formValid, setFormValid] = useState(false);
  const [notfication, setNotification] = useState(defaultNotification);
  const [loading, setLoading] = useState(false);

  const loginFormArray = [];
  for (let key in loginForm) {
    loginFormArray.push({
      id: key,
      config: loginForm[key]
    });
  }

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '5vh'
        }}>
        <h1
          style={{
            zIndex: 1,
            marginTop: '-5vh',
            fontSize: '48px',

          }}>
          Social Media Demo + Video Chat
        </h1>
        <label htmlFor="img" style={{
          position: 'absolute',
          fontSize: '24px',
          fontWeight: 500,
          width: '35vw',
          marginTop: '10vh',
          marginLeft: '45vw',
          textAlign: 'center',

        }}>Share a chatroom or a conference call just by hitting 'Share'.</label>
        <img src="images/vector-creator-4.png" alt="User checking her messages" style={{
          position: 'absolute',
          zIndex: -1,
          top: '-14vh',
          left: '0vw',
          transform: 'scale(0.75, 0.75)'}}/>
        <div
          style={{
            marginLeft: '45vw',
            textAlign: 'center',
            width: '33vw',
            marginTop: '15vh',
            background: 'rgba( 255, 255, 255, 0.4 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 3.3px )',
            borderRadius: '10px'
          }}>
          <h2 style={{ fontWeight: 400}}>Members Login</h2>
          <Box m={2}>
            {loginFormArray.map((element) => {
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
          </Box>
          <Box
            p={2}
            style={{
              display: 'flex',
              flexFlow: 'column',
              alignItems: 'center'
            }}>
            <ButtonUser
              text={'Login'}

              buttonHandler={(e) => buttonHandler(e, 'login')}
              disabled={!formValid}
            />
            <p>OR</p>
            <ButtonUser
              text={'Register'}
              buttonHandler={(e) => buttonHandler(e, 'register')}
            />
          </Box>
        </div>
      </div>
      <Notification
        type={notfication.type}
        show={notfication.show}
        msg={notfication.msg}
      />
      {loading ? <Loader /> : null}
    </Container>
  );
};

export default withRouter(Login);
