import React from "react";

const InputField = (props) => {
  let inputs = null;

  switch (props.elementType) {
    case "input":
      inputs = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChange}
        />
      );
      break;

    case "select":
      inputs = (
        <select
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChange}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputs = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChange}
        />
      );
  }

  return (<div>
      {/* <label></label> */}
      {inputs}
      {/* {validationError} */}
  </div>);
};

export default InputField;
