import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import io from "socket.io-client";
import queryString from "query-string";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";

const VideoCall = (props) => {
  const changeCamera = (e) => {
    e.preventDefault();
    if (cameraFace !== "user") {
      setCameraFace("user");
    } else if (cameraFace !== "environment") {
      setCameraFace("environment");
    }
  };

  const [cameraFace, setCameraFace] = useState("user");

  const videoConstraints = {
    // width: 1280,
    // height: 720,
    facingMode: cameraFace,
  };

  return (
    <div>
      <Webcam audio={true} videoConstraints={videoConstraints} />
      <IconButton
        color="primary"
        aria-label="switch camera"
        onClick={changeCamera}
      >
        <PhotoCamera />
      </IconButton>
    </div>
  );
};

export default VideoCall;
