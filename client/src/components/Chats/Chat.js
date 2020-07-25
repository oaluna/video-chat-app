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

  useEffect(() => {
    const query = queryString.parse(props.location.search);

    getRoomsList(query.id);
  }, [props.location.search]);

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


  if(rooms.length!==0){
  return (
    <>
    <GroupListNav getRoomsList={(id)=>getRoomsList(id)}/>
    <Box>
      <List m={'auto'} >
        {rooms.map((room) => {
          return (
            <ListItem button divider alignItems="center" key={room._id} onClick={(e) => openChats(e, room._id)} style={{cursor:"pointer"}}>
              {room.name}
            </ListItem>
          );
        })}
        </List>
    </Box>
    </>
  );
}else{
  return (<Box>
    <GroupListNav getRoomsList={(id)=>getRoomsList(id)}/>
    <CircularProgress style={{margin:"0 auto"}}/>
  </Box>)
}
};

export default Chat;
