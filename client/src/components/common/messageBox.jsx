import React from 'react'

const MessageBox=(props)=>{
    return (
        <div key={props.id}>
            <h5>{props.user}</h5>
            <p>{props.message}</p>
        </div>
    )
}

export default MessageBox
