import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

import { ENDPOINT } from "../../config/config.js";
import { getData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";

import SendIcon from "../../assests/send.svg";
import InputField from "../common/InputField.jsx";
import MessageBox from "../common/messageBox.jsx";

let socket;

const ChatDetails = (props) => {
  const initalMessageInput = {
    message: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "your message",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
    },
  };

  //State
  const [userData, setUserData] = useState(null);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(initalMessageInput);

  const getUserDetails = async (id) => {
    const userData = await getData(`${urls.users.getOneuser}/${id}`);
    if (userData.status === 200) {
      return await userData.data;
    }
  };

  const getOldMessages = async (id) => {
    const oldMessages = await getData(`${urls.messages.messagesByGroup}/${id}`);
    let oldMessagesArray = [];
    if (oldMessages.status === 200) {
      if(oldMessages.data.length!==0){
      for (let message of oldMessages.data) {
        let data = {
          date: message.createdAt,
          group: message.group,
          message: message.message,
          sender: message.sender,
          sendername: message.sendername,
        };
        oldMessagesArray.push(data);
      }
    }
      return await oldMessagesArray;
    }else{
      return await oldMessagesArray
    }
  };

  const messageSent = (e) => {
    e.preventDefault();
    let username = "";
    if (userData.name.lastname) {
      username = `${userData.name.firstname} ${userData.name.lastname}`;
    } else {
      username = `${userData.name.firstname}`;
    }

    let data = {
      sender: userData._id,
      group: room,
      message: messageInput.message.value,
      sendername: username,
      date: new Date(),
    };
    socket.emit("sendMessage", data, () => {
      setMessageInput(initalMessageInput);
    });
  };

  const checkValidation = (value, rules) => {
    let checkValid = true;

    if (rules.required === true) {
      checkValid = value.trim() !== "" && checkValid;
    }

    return checkValid;
  };

  const inputChangeHandler = (e, id) => {
    e.preventDefault();

    const updatedMessageInput = {
      ...messageInput,
    };

    updatedMessageInput[id].value = e.target.value;
    updatedMessageInput[id].valid = checkValidation(
      updatedMessageInput[id].value,
      updatedMessageInput[id].validation
    );
    setMessageInput(updatedMessageInput);
  };

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    socket = io(ENDPOINT);
    setRoom(query.room);

    if (userData === null || messages.length === 0) {

      getOldMessages(query.room).then((data)=>{ setMessages(data)});
      getUserDetails(query.id).then((data) => {setUserData(data)});
    };

  },[]);

  useEffect(()=>{
    if(userData && room){
    socket.emit("join", { name: userData, room: room }, (err) => {
      if (err) {
        alert(err);
      }
    });
  }
  },[userData,room])

  useEffect(() => {
    socket.on("message", (data) => {
      setMessages((messages) => [...messages, data]);
    });
  },[]);

  return (
    <div>
      <div>
        <MessageBox messages={messages} />
      </div>
      <div>
        <form onSubmit={(e) => messageSent(e)}>
          <InputField
            key={Object.keys(messageInput)[0]}
            elementConfig={messageInput.message.elementConfig}
            value={messageInput.message.value}
            shouldBeChecked={messageInput.message.validation}
            valueChange={(e) => inputChangeHandler(e, "message")}
          />
          <button type="submit" disabled={!messageInput.message.valid}>
            <img src={SendIcon} alt="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetails;
