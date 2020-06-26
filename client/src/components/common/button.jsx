import React from 'react'

const Button=(props)=>{
    return (
    <button onClick={props.buttonHandler} key={props.text} name={props.text} disabled={props.disabled}>{props.text}</button>
    )
}

export default Button
