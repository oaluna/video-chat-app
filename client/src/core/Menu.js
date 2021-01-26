import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import auth from './../auth/auth-helper';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: '#000' };
  else return { color: '#fff', textDecoration: 'none' };
};
const Menu = withRouter(({ history }) => (
  <AppBar position='static' style={{ backgroundColor: 'transparent', boxShadow: 'none'}}>
    <Toolbar>
      <Typography variant='h4' style={{ fontFamily: 'Ammonite', fontWeight: 700, lineHeight: 0.6 }}>
        luna web solutions
      </Typography>
      <br />{' '}
      <div style={{ position: 'absolute', right: '0vw' }}>
      <Link to='/'>
        <IconButton
          aria-label='Home'
          style={isActive(history, '/')}
          >
          <HomeIcon  />
        </IconButton>
      </Link>
      <Link to='/users'>
        <Button style={isActive(history, '/users')} >
          <h2>Users</h2>
        </Button>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to='/signup'>
            <Button style={isActive(history, '/signup')} >
              <h2>Sign up</h2>
            </Button>
          </Link>
          <Link to='/signin'>
            <Button style={isActive(history, '/signin')} >
              <h2>Sign In</h2>
            </Button>
          </Link>
        </span>
      )}
      {auth.isAuthenticated() && (
        <span>
          <Link to={'/user/' + auth.isAuthenticated().user._id}>
            <Button
              style={isActive(
                history,
                '/user/' + auth.isAuthenticated().user._id
              )}
              >
              <h2>My Profile</h2>
            </Button>
          </Link>
          <Button

            onClick={() => {
              auth.clearJWT(() => history.push('/'));
            }}
            >
            <h2>Sign out</h2>
          </Button>
        </span>
      )}
      </div>
    </Toolbar>
  </AppBar>
));

export default Menu;
