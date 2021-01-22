import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import FormDialog from "../DialogBox";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import { withRouter } from "react-router";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import queryString from "query-string";
import { postData } from "../../../axios/apiCalls.js";
import { urls } from "../../../config/urls.js";
import Notification from "../notifications";
import { useTimedState } from "../../../utils/utils.js";

const defaultNotification = {
  msg: "",
  show: false,
  type: "e",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    fontSize: '36px',
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#fff",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20vw",
      "&:focus": {
        width: "30vw",
      },
    },
  },
  drawerPaper: {
    background:'rgba( 255, 255, 255, 0.4 )',
            boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
            backdropFilter: 'blur( 3.3px )',
            padding: '10px',
            borderRadius: '10px',
            color: '#fff'
  }
}));

const GroupListNav = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const [openAddMember, setOpenAddMember] = useState(false);

  const [notification, setNotification] = useTimedState(
    defaultNotification,
    5000
  );

  const [groupname, setGroupname] = useState("");

  const [memberName, setMemberName] = useState("");

  const goVideoCall = () => {
    const query = queryString.parse(props.location.search);
    props.history.push(`/videocall?user=${query.id}`);
  };

  const setGroupNames = (e) => {
    setGroupname(e.target.value);
  };

  const setMembersName = (e) => {
    setMemberName(e.target.value);
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
      setOpenCreateGroup(false);
      setGroupname("");
      props.getRoomsList(query.id);
      setNotification({
        msg: "Group Created Successfully",
        show: true,
        type: "s",
      });
    }
  };

  const addMember = async (e) => {
    const query = queryString.parse(props.location.search);
    e.preventDefault();
    const data = {
      group: query.room,
      username: memberName,
    };
    const result = await postData(urls.rooms.addNewUser, data);
    if (result.status === 200) {
      setOpenAddMember(false);
      setMemberName("");
      setNotification({
        msg: "Member Added Successfully",
        show: true,
        type: "s",
      });
    }
  };

  const toggleClose = () => {
    setOpen(!open);
  };

  const createGroupData = {
    title: "Create New Group",
    msg: "Enter Group Name to create a group",
    label: "group name",
    proceedText: "Create",
  };

  const addMemberData = {
    title: "Add New Member",
    msg: "Enter user name to add it to the group",
    label: "user name",
    proceedText: "Add",
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" style={{background: 'transparent', boxShadow: 'none'}}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              style={{color: '#fff'}}
              aria-label="open drawer"
              onClick={toggleClose}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Chat Room Lobby
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          // className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div
          // className={classes.drawerHeader}
          >
            <IconButton onClick={toggleClose} style={{color: '#fff'}}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
          { props.location.pathname === "/chats"
           &&
            <ListItem button key={1} onClick={() => setOpenCreateGroup(true)}>
              <ListItemIcon style={{ color: '#fff'}}>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Create New Group"} />
            </ListItem>
          }

          { props.location.pathname !== "/videocall"
           &&
            <ListItem button key={2} onClick={goVideoCall}>
              <ListItemIcon style={{ color: '#fff'}}>
                <VideoCallIcon />
              </ListItemIcon>
              <ListItemText primary={"Video Call"} />
            </ListItem>
          }

            { props.location.pathname === "/chat" &&
            <ListItem button key={3} onClick={() => setOpenAddMember(true)}>
              <ListItemIcon style={{ color: '#fff'}}>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={"Add New Member"} />
            </ListItem>
            }


          </List>
          <Divider />
          <List>
            <ListItem button key={3}>
              <ListItemIcon style={{ color: '#fff'}}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>
        </Drawer>
      </div>
      <FormDialog
        open={openCreateGroup}
        setOpen={setOpenCreateGroup}
        dialogData={createGroupData}
        value={groupname}
        setValue={setGroupNames}
        clickFunc={createGroup}
      />
      <FormDialog
        open={openAddMember}
        setOpen={setOpenAddMember}
        dialogData={addMemberData}
        value={memberName}
        setValue={setMembersName}
        clickFunc={addMember}
      />
      <Notification
        type={notification.type}
        show={notification.show}
        msg={notification.msg}
        
      />
    </>
  );
};

export default withRouter(GroupListNav);
