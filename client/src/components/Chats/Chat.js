import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { getData, postData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";
import Button from "../common/button.jsx";
import Modal from "../common/modal.jsx";

const Chat = (props) => {
  const [rooms, setRooms] = useState([]);
  const [modal, setmodal] = useState(false);
  const [groupname, setGroupname] = useState("");

  const getRoomsList = async (id) => {
    const roomslist = await getData(`${urls.rooms.getUserRooms}/${id}`, null);
    if (roomslist.status === 200) {
      setRooms(roomslist.data);
    }
  };

  const openChats = (e, roomid) => {
    e.preventDefault();
    props.history.push(`/chat${props.location.search}&room=${roomid}`);
  };

  const modalToggle = (e, value) => {
    if (modal !== value) {
      setmodal(value);
    }
  };

  const createGroup = async (e) => {
    const query = queryString.parse(props.location.search);
    e.preventDefault();
    const data = {
      id: query.id,
      name: groupname,
    };
    const result = await postData(urls.rooms.addNewRoom, data);
    if (result.status === 200) {
      modalToggle(false);
      setGroupname("");
      getRoomsList(query.id);
      alert("Group created successfully");
    }
  };

  const modalInputHandler = (e) => {
    setGroupname(e.target.value.trim());
  };

  let newGroupModal = "";
  if (modal === true) {
    newGroupModal = (
      <Modal modalToggle={modalToggle} modalInputHandler={modalInputHandler} value={groupname} text="Create Group" create={createGroup}/>
    );
  } else {
    newGroupModal = null;
  }

  useEffect(() => {
    const query = queryString.parse(props.location.search);

    getRoomsList(query.id);
  }, [props.location.search]);
  return (
    <div>
      {rooms.map((room) => {
        return (
          <div key={room._id} onClick={(e) => openChats(e, room._id)}>
            {room.name}
          </div>
        );
      })}
      <Button
        buttonHandler={(e) => modalToggle(e, true)}
        text="Add new Group"
      />
      {newGroupModal}
    </div>
  );
};

export default Chat;
