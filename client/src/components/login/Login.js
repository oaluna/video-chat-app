import React, { useState } from "react";

import InputField from "../common/InputField";
import ButtonUser from "../common/button";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router";
import { getData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";
import { Container } from "@material-ui/core";
import Notification from "../common/notifications.jsx";
import Loader from "../common/loader";

const defaultNotification = {
  msg: "",
  show: false,
  type: "e",
};

const Login = (props) => {
  const checkValidation = (value, rules) => {
    let checkValid = true;

    if (rules.required === true) {
      checkValid = value.trim() !== "" && checkValid;
    }

    if (rules.length === true) {
      checkValid = value.trim().length >= 8 && checkValid;
    }

    return checkValid;
  };

  const inputChangeHandler = (e, id) => {
    const updatedLoginForm = {
      ...loginForm,
    };

    const updatedFormElement = {
      ...updatedLoginForm[id],
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

    if (value === "register") {
      props.history.push("/register");
    } else if (value === "login") {
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
            msg: "Incorrect credentials",
            show: true,
            type: "e",
          });
        } else if (result.data === "User not found") {
          setNotification({
            msg: result.data,
            show: true,
            type: "i",
          });
        }
      }
    }
  };

  const initalLoginForm = {
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "your username",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "your password",
      },
      value: "",
      validation: {
        required: true,
        length: true,
      },
      valid: false,
    },
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
      config: loginForm[key],
    });
  }

  return (
    <Container>
      <div
        style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
      >
        <h2>Login</h2>
        <Box>
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
          style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
        >
          <ButtonUser
            text={"Login"}
            color="primary"
            buttonHandler={(e) => buttonHandler(e, "login")}
            disabled={!formValid}
          />
          <p>OR</p>
          <ButtonUser
            text={"Register"}
            buttonHandler={(e) => buttonHandler(e, "register")}
          />
        </Box>
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
