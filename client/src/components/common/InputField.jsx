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
          style={{ padding: '5px', width: '20vw' }}
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
            marginTop: '5px',
            width: '30vw',
            background: 'rgba( 255, 255, 255, 0.4 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 3.3px )',
            borderRadius: '10px'
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
