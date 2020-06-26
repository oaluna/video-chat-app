import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";

import{ENDPOINT} from "../../config/config.js"
import { getData } from "../../axios/apiCalls.js";
import { urls } from "../../config/urls.js";

let socket;

const ChatDetails = (props) => {
  const [userData, setUserData] = useState([]);
  const [room, setRoom] = useState(null);

  const getUserDetails = async (id) => {
    const userData = await getData(`${urls.users.getOneuser}/${id}`);
    if (userData.data) {
        console.log(userData)
      setUserData(userData.data);
    }
  };

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    socket = io(ENDPOINT);
    setRoom(query.room);

    getUserDetails(query.id);

    // socket.emit("joining", { name: name, room: room }),
    //   () => {
    //     console.log(name, room);
    //   };

    // return () => {
    //   socket.emit("disconnected");

    //   socket.off();
    // };

    // console.log(userData,room)
  }, [room,props.location.search]);

  return <div>tullu</div>;
};

export default ChatDetails;
