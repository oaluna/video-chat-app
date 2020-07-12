import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { getData, postData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";
import ButtonUser from "../common/button.jsx";
import Modal from "../common/modal.jsx";
import GroupListNav from "../common/NavBar/GroupListNav"
import { CircularProgress,Box } from '@material-ui/core';

import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';

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
      <Modal
        modalToggle={modalToggle}
        modalInputHandler={modalInputHandler}
        value={groupname}
        text="Create Group"
        create={createGroup}
      />
    );
  } else {
    newGroupModal = null;
  }

  useEffect(() => {
    const query = queryString.parse(props.location.search);

    getRoomsList(query.id);
  }, [props.location.search]);

  if(rooms.length!==0){
  return (
    <>
    <GroupListNav/>
    <Box>
      <List m={'auto'} >
        {rooms.map((room) => {
          return (
            <ListItem button divider alignItems="center" key={room._id} onClick={(e) => openChats(e, room._id)} style={{cursor:"pointer"}}>
              {room.name}
            </ListItem>
          );
        })}
      <ButtonUser
        buttonHandler={(e) => modalToggle(e, true)}
        text="Add new Group"
        />
        </List>
      {newGroupModal}
    </Box>
    </>
  );
}else{
  return (<Box>
    <GroupListNav/>
    <CircularProgress style={{margin:"0 auto"}}/>
  </Box>)
}
};

export default Chat;
