import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';

import { getData, postData } from '../axios/apiCalls.js';
import { urls } from '../config/urls.js';
import ButtonUser from '../components/common/button.jsx';
import Modal from '../components/common/modal.jsx';
import GroupListNav from '../components/common/NavBar/GroupListNav';
import { CircularProgress, Box } from '@material-ui/core';
import theme from '../theme';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    margin: theme.spacing(1),

    background: 'rgba( 255, 255, 255, 0.4 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 3.3px )',
    borderRadius: '10px',
    cursor: 'pointer',
    alignItems: 'center',
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.primary
  }
}));

export default function Home(props) {
  const classes = useStyles();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const query = queryString.parse(props.location.search);

    getRoomsList(query.id);
  }, [props.location.search]);

  const getRoomsList = async (id) => {
    const roomslist = await getData(`${urls.rooms.getUserRooms}/${id}`, null);
    if (roomslist.status === 200) {
      setRooms(roomslist.data);
    }
  };

  const openChats = (e, roomid) => {
    e.preventDefault();
    props.history.push(`/chat${props.location.search}&room=${roomid}`);
  };
  if (rooms.length !== 0) {
    return (
      <>
        <GroupListNav getRoomsList={(id) => getRoomsList(id)} />

        <Typography
          variant='h4'
          component='p'
          className={classes.title}
          style={{
            position: 'relative',
            textAlign: 'center',
            top: '0vh',
            width: '100vw',
            color: theme.palette.openTitle
          }}>
          Select a chat room from the list below, or create a new one in the
          Menu
        </Typography>


          <Box>
            <List m={'auto'}>
              {rooms.map((room) => {
                return (
                  <Card className={classes.card}>
                    <ListItem
                      className={classes.MuiListItem}
                      button
                      divider
                      alignItems='center'
                      key={room._id}
                      onClick={(e) => openChats(e, room._id)}>
                      {room.name}
                    </ListItem>
                  </Card>
                );
              })}
            </List>
          </Box>

      </>
    );
  } else {
    return (
      <Box>
        <GroupListNav getRoomsList={(id) => getRoomsList(id)} />
        <CircularProgress style={{ margin: '0 auto' }} />
      </Box>
    );
  }
  return <></>;
}
