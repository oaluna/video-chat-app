import React from "react";
import styles from "../Chats/ChatDetails.module.css";
import Paper from "@material-ui/core/Paper";

const MessageBox = (props) => {
  if (props.messages && props.user) {
    return props.messages.map((message) => {
      if (message.sender === props.user._id) {
        return (
          <Paper
            elevation={3}
            key={message.date}
            className={styles.SenderMessage}
            style={{
              width: "50%",
              padding: "2%",
              margin: "1% 0",
              alignSelf: "flex-end",
            }}
            autoFocus
          >
            <div className={styles.MsgInfo}>
              <div className={styles.MsgInfoName}>{message.sendername}</div>
              <div className={styles.MsgInfoTime}>{message.date}</div>
            </div>

            <div>{message.message}</div>
          </Paper>
        );
      } else if (message.sender === 0) {
        return (
          <Paper
            elevation={3}
            key={message.date}
            className={styles.SystemMessage}
            style={{
              width: "50%",
              padding: "1%",
              margin: "2% 0",
              alignSelf: "center",
            }}
            autoFocus
          >
            <div className={styles.MsgInfo}>
              <div className={styles.MsgInfoName}>{message.sendername}</div>
              <div className={styles.MsgInfoTime}>{message.date}</div>
            </div>

            <div>{message.message}</div>
          </Paper>
        );
      } else {
        return (
          <Paper
            elevation={3}
            key={message.date}
            className={styles.ReceiverMessage}
            style={{
              width: "50%",
              padding: "1%",
              margin: "2% 0",
              alignSelf: "flex-start",
            }}
            autoFocus
          >
            <div className={styles.MsgInfo}>
              <div className={styles.MsgInfoName}>{message.sendername}</div>
              <div className={styles.MsgInfoTime}>{message.date}</div>
            </div>
            <div>{message.message}</div>
          </Paper>
        );
      }
    });
  } else {
    return null;
  }
};

export default MessageBox;
