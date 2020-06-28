import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { getData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";

const Chat = (props) => {
  const [rooms, setRooms] = useState([]);

  const getRoomsList = async (id) => {
    const roomslist = await getData(`${urls.rooms.getUserRooms}/${id}`,null);
    if (roomslist.status===200) {
      setRooms(roomslist.data);
    }
  };

  const openChats = (e, roomid) => {
    e.preventDefault();
    props.history.push(`/chat${props.location.search}&room=${roomid}`);
  };

  useEffect(() => {
    const query = queryString.parse(props.location.search);

    getRoomsList(query.id)

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
    </div>
  );
};

export default Chat;
