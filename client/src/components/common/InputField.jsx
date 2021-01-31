import React from 'react';
import { TextField, Select } from '@material-ui/core';

const InputField = (props) => {
  let inputs = null;

  switch (props.elementType) {
    case 'input':
      inputs = (
        <TextField
          label={props.elementConfig.name}
          variant='outlined'
          autoFocus={true}
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChange}
          style={{  width: '20vw',
          border: 0 }}
        />
      );
      break;

    case 'select':
      inputs = (
        <Select
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChange}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </Select>
      );
      break;

    default:
      inputs = (
        <TextField
          label={props.elementConfig.name}
          variant='outlined'
          {...props.elementConfig}
          value={props.value}
          onChange={props.valueChange}
          style={{
            marginTop: '15px',
            padding: 0,
            width: '30vw',
            border: '0px'
                   }}
        />
      );
  }

  return (
    <div>
      {/* <InputLabel>{props.elementConfig.name}</InputLabel> */}
      {inputs}
      {/* {validationError} */}
    </div>
  );
};

export default InputField;
