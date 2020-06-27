import React from "react";

const MessageBox = (props) => {
    if(props.messages.length>0){
        return props.messages.map((message) => {
    return (
      <div key={message.date}>
        <h5>{message.username}</h5>
        <p>{message.message}</p>
      </div>
    );
  });
}else{
    return null
}
};

export default MessageBox;
