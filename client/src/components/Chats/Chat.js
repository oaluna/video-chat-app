import React, { useState, useEffect } from "react";
import queryString from "query-string";

import { getData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";

const Chat = (props) => {
  const [id, setUserid] = useState(null);
  const [rooms, setRooms] = useState([1, 2]);

  const getRoomsList = async (id) => {
    const roomslist = await getData(urls.rooms.getUserRooms, { id: id });
    if (roomslist) {
      setRooms(roomslist);
    }
  };

  const openChats = (e, roomid) => {
    e.preventDefault();
    props.history.push(`/chat${props.location.search}&room=${roomid}`);
  };

  useEffect(() => {
    const query = queryString.parse(props.location.search);

    setUserid(query.id);

    // getRoomsList()
  }, [id, props.location.search]);
  return (
    <div>
      {rooms.map((room) => {
        return (
          <div key={room} onClick={(e) => openChats(e, room)}>
            {room}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
