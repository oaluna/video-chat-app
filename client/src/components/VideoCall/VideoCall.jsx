const callPeer=(id)=>{
  if(id!=='' && users[id] && id!==yourID){
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      setCallingFriend(true)
      setCaller(id)
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
      const peer = new Peer({
        initiator: true,
        trickle: false,
        config: {
  
          iceServers: [
              {
                  urls: "stun:numb.viagenie.ca",
                  username: "sultan1640@gmail.com",
                  credential: "98376683"
              },
              {
                  urls: "turn:numb.viagenie.ca",
                  username: "sultan1640@gmail.com",
                  credential: "98376683"
              }
          ]
      },
        stream: stream,
      });

      myPeer.current=peer;
  
      peer.on("signal", data => {
        socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
      })
  
      peer.on("stream", stream => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream;
        }
      });

      peer.on('error', (err)=>{
        endCall()
      })
  
      socket.current.on("callAccepted", signal => {
        setCallAccepted(true);
        peer.signal(signal);
      })

      socket.current.on('close', ()=>{
        window.location.reload()
      })

      socket.current.on('rejected', ()=>{
        window.location.reload()
      })
    })
    .catch(()=>{
      setModalMessage('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use Cuckoo.')
      setModalVisible(true)
    })
  } else {
    setModalMessage('We think the username entered is wrong. Please check again and retry!')
    setModalVisible(true)
    return
  }
}

const acceptCall=()=>{
  // ringtoneSound.unload();
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    setStream(stream);
    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    myPeer.current=peer

    peer.on("signal", data => {
      socket.current.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.on('error', (err)=>{
      endCall()
    })

    peer.signal(callerSignal);

    socket.current.on('close', ()=>{
      window.location.reload()
    })
  })
  .catch(()=>{
  })
}