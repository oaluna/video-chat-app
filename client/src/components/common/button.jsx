import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '10vw',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 3.3px )',
    borderRadius: '45px'
  }
}));

const ButtonUser = (props) => {
    const classes = useStyles()
  return (
    <Button className={classes.root}
      variant='contained'
      color={props.color ? props.color : 'secondary'}
      onClick={props.buttonHandler}
      key={props.text}
      name={props.text}
      disabled={props.disabled}>
      {props.text}
    </Button>
  );
};

export default ButtonUser;
