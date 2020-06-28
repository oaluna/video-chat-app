import React, { useState } from "react";

import InputField from "../common/InputField";
import Button from "../common/button";
import { withRouter } from "react-router";
import { postData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";

const Register = (props) => {
  const checkValidation = (value, rules) => {
    let checkValid = true;

    if (rules.required === true) {
      checkValid = value.trim() !== "" && checkValid;
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
      ...registerForm,
    };

    const updatedFormElement = {
      ...updatedRegisterForm[id],
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

    if (value === "login") {
      props.history.push("/");
    } else if (value === "submit") {
      const formData = {};
      for (let formelements in registerForm) {
        formData[formelements] = registerForm[formelements].value;
      }
      const sendingData = {
        name: {
          firstname: formData.firstname,
        },
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };

      if(formData.lastname!==''){
          sendingData.name.lastname=formData.lastname
      }
        const result=await postData(urls.register.addNewUser,sendingData);
        console.log(result)
        if(result.status===200){
          alert("User created Successfully")
          props.history.push(`/`)
        }
    }
  };

  const initalRegisterForm = {
    firstname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "your firstname",
        name: "First Name*",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
    },
    lastname: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "your lastname",
        name: "Last Name",
      },
      value: "",
      validation: {
        required: false,
      },
      valid: true,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "your email",
        name: "Email*",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
    },
    username: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "pick your username",
        name: "UserName*",
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
        name: "Password'",
      },
      value: "",
      validation: {
        required: true,
        length: true,
      },
      valid: false,
    },
    confirmpassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "confirm your password",
        name: "Confirm Password'",
      },
      value: "",
      validation: {
        required: true,
        length: true,
        match: true,
      },
      valid: false,
    },
  };

  //States
  const [registerForm, setRegisterForm] = useState(initalRegisterForm);
  const [formValid, setFormValid] = useState(false);

  const registerFormArray = [];
  for (let key in registerForm) {
    registerFormArray.push({
      id: key,
      config: registerForm[key],
    });
  }

  return (
    <div>
      <div>
        <h5>Register</h5>
        <div>
          <div>
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
          </div>
          <div>
            <Button
              text={"Submit"}
              buttonHandler={(e) => buttonHandler(e, "submit")}
              disabled={!formValid}
            />
            <p>OR</p>
            <Button
              text={"Login Page"}
              buttonHandler={(e) => buttonHandler(e, "login")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Register);
