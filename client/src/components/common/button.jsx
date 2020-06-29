import React from 'react'
import Button from '@material-ui/core/Button';

const ButtonUser=(props)=>{
    return (
    <Button variant="contained" color={props.color?props.color:"secondary"} onClick={props.buttonHandler} key={props.text} name={props.text} disabled={props.disabled}>{props.text}</Button>
    )
}

export default ButtonUser
