import React from "react";
import styles from "../Chats/ChatDetails.module.css";

const MessageBox = (props) => {
  if (props.messages && props.user) {
    return props.messages.map((message) => {
      return (
          <div key={message.date} className={styles.MsgBubble} style={props.user._id===message.sender?{background:"red"}:{background:"blue"}}>
              <div>{props.user._id}-------------{message.sender}</div>
            <div className={styles.MsgInfo}>
              <div className={styles.MsgInfoName}>{message.sendername}</div>
              <div className={styles.MsgInfoTime}>{message.date}</div>
            </div>

            <div>{message.message}</div>
          </div>
      );
    });
  } else {
    return null;
  }
};

export default MessageBox;
