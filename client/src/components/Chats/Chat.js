import React,{useState,useEffect} from 'react'
import io from "socket.io-client"
import queryString from "query-string"

import {ENDPOINT} from "../../config/config.js"

let socket;

const Chat=({location})=>{
    const [username,setUsername]=useState('')
    const [roomid,setRoomId]=useState(null)

    useEffect(() => {
        const query=queryString.parse(location.search)

        socket=io(ENDPOINT)

        const {name,room}=query
        setUsername(name);
        setRoomId(room);

        socket.emit('joining',{name:username,room:roomid},({error})=>{
            alert(error)
        })

    },[ENDPOINT,location.search,username,roomid])
    return (
        <div>
            hELLO
        </div>
    )
}

export default Chat
