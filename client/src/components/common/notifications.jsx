import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

const Notifications = (props) => {
  let noticeType = "e";

  switch (props.type) {
    case "s":
      noticeType = "success";
      break;
    case "i":
      noticeType = "info";
      break;
    case "e":
      noticeType = "error";
      break;
    case "w":
      noticeType = "warning";
      break;
    default:
      noticeType = "error";
  }

  return (
    <div>
      <Snackbar open={props.show} autoHideDuration={6000}>
        <Alert severity={noticeType}>{props.msg}</Alert>
      </Snackbar>
    </div>
  );
};

export default Notifications;
