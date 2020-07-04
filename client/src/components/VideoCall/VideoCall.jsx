import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import io from "socket.io-client";
import queryString from "query-string";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CallIcon from '@material-ui/icons/Call';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const VideoCall = (props) => {
  const changeCamera = (e) => {
    e.preventDefault();
    if (cameraFace !== "user") {
      setCameraFace("user");
    } else if (cameraFace !== "environment") {
      setCameraFace("environment");
    }
  };
  const noCameraFound = (e) => {
    e.preventDefault();
    setHasCamera(false);
  };

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const connectCall=(e)=>{
    e.preventDefault();
    console.log(11234)
  }

  const [cameraFace, setCameraFace] = useState("user");
  const [hasCamera, setHasCamera] = useState(true);
  const [open,setOpen]=useState(true)


  const videoConstraints = {
    // width: 1280,
    // height: 720,
    facingMode: cameraFace,
  };

  const dialogBox=(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">User Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the user name you  want to connect
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={connectCall} color="secondary">
            Call
          </Button>
        </DialogActions>
      </Dialog>
  )

  if (hasCamera) {
    return (
      <div>
        <Webcam
          audio={true}
          mirrored={true}
          onUserMediaError={noCameraFound}
          forceScreenshotSourceSize={true}
          videoConstraints={videoConstraints}
        />
        <IconButton
          color="primary"
          aria-label="switch camera"
          onClick={changeCamera}
        >
          <PhotoCamera />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="call"
          onClick={handleClickOpen}
        >
          <CallIcon/>
        </IconButton>
        {dialogBox}
      </div>

    );
  } else {
    return <div>No camera Found</div>;
  }
};

export default VideoCall;
