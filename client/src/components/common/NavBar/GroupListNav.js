import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import FormDialog from '../DialogBox'
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import queryString from "query-string";
import { getData, postData } from "../../../axios/apiCalls.js";
import { urls } from "../../../config/urls.js";

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
    [theme.breakpoints.up("sm")]: {
      display: "block",
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
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const GroupListNav = (props) => {

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const [groupname, setGroupname] = useState("");

  const goVideoCall = () => {
    const query = queryString.parse(props.location.search);
    props.history.push(`/videocall?user=${query.id}`);
  };

  const setGroupNames=(e)=>{
setGroupname(e.target.value)
  }

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
      alert("Group created successfully");
    }
  };

  const toggleClose = () => {
    setOpen(!open);
  };

  const dialogData={
    title:'Create New Group',
    msg:'Enter Group Name to create a group',
    label:'group name',
    proceedText:'Create'
  }

  return (
    <>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleClose}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Welcome Prerit
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
        // classes={{
        //   paper: classes.drawerPaper,
        // }}
      >
        <div
        // className={classes.drawerHeader}
        >
          <IconButton onClick={toggleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={1} onClick={()=>setOpenCreateGroup(true)}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary={"Create New Group"} />
          </ListItem>

          <ListItem button key={2} onClick={goVideoCall}>
            <ListItemIcon>
              <VideoCallIcon />
            </ListItemIcon>
            <ListItemText primary={"Video Call"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={3}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </Drawer>
    </div>
    <FormDialog open={openCreateGroup} setOpen={setOpenCreateGroup} dialogData={dialogData} value={groupname} setValue={setGroupNames} clickFunc={createGroup}/>
    </>
  );
};

export default withRouter(GroupListNav);
