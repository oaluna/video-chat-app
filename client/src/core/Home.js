import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import queryString from 'query-string';
import Loader from '../components/common/loader';
import { getData, postData } from '../axios/apiCalls.js';
import { urls } from '../config/urls.js';
import GroupListNav from '../components/common/NavBar/GroupListNav';
import { CircularProgress, Box } from '@material-ui/core';
import theme from '../theme';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'absolute',
    left: '5vw',
    top: '20vh',
    width: '45vw',
    height: '70vh',
    background: 'rgba( 255, 255, 255, 0.31 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 3.3px )',
    borderRadius: '10px',
    cursor: 'pointer',
    alignItems: 'center'
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,

  },
  listItem: {
    background: 'rgba( 255, 255, 255, 0.31 )',
    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 3.3px )',
    borderRadius: '10px',
    margin: theme.spacing(1)
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
        <Card className={classes.card}>
          <Typography
            variant='h4'
            component='p'
            className={classes.title}
            style={{
              textAlign: 'center',


            }}>
            Select a chat room from the list below, or create a new one in the
            Menu
          </Typography>
          <Box>
            <List
              m={5}
              style={{
                justifyContent: 'left',
                width: 'auto',
                margin: theme.spacing(2)
              }}>
              {rooms.map((room) => {
                return (
                  <ListItem
                    m={5}
                    className={classes.listItem}
                    button
                    divider
                    alignItems='center'
                    key={room._id}
                    onClick={(e) => openChats(e, room._id)}>
                    {room.name}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Card>
        <img
          src='images/vector-creator-3.png'
          alt='users chatting all over the world'
          style={{
            position: 'absolute',
            top: '10vh',
            left: '40vw',
            zIndex: -1,
          }}
        />
      </>
    );
  } else {
    return (
      <Box>
        <GroupListNav getRoomsList={(id) => getRoomsList(id)} />
        <CircularProgress
          style={{
            position: 'relative',
            marginLeft: '50vw',
            opacity: 0,
            marginTop: '60vh'
          }}></CircularProgress>
        <Loader style={{ position: 'relative', marginTop: '50vh' }} />
      </Box>
    );
  }
}
