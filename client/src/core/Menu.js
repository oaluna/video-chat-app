import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: '#EC0868' }
  else return { color: '#80ffdb' }
}
const Menu = withRouter(({ history }) => (
  <AppBar position='static'>
    <Toolbar
      style={{
        background:
          'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 22%, rgba(236,8,104,1) 100%)',
        boxShadow: '2px 1px 4px 1px #80FFDB'
      }}>
      <Typography
        variant='h1'
        component='h2'
        color='inherit'
        style={{
          paddingRight: '20px',
          fontWeight: 'lighter',
          textShadow: '2px 2px 8px 3px #80FFDB'
        }}>
        AfterHours
      </Typography>
      <br />{' '}
      <Link to='/'>
        <IconButton
          aria-label='Home'
          style={isActive(history, '/')}
          size='large'>
          <HomeIcon style={{ fontSize: '40px' }} />
        </IconButton>
      </Link>
      <Link to='/users'>
        <Button style={isActive(history, '/users')} size='large'>
          <h2>Users</h2>
        </Button>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to='/signup'>
            <Button style={isActive(history, '/signup')} size='large'>
              <h2>Sign up</h2>
            </Button>
          </Link>
          <Link to='/signin'>
            <Button style={isActive(history, '/signin')} size='large'>
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
              size='large'>
              <h2>My Profile</h2>
            </Button>
          </Link>
          <Button
            color='inherit'
            onClick={() => {
              auth.clearJWT(() => history.push('/'))
            }}
            size='large'>
            <h2>Sign out</h2>
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
))

export default Menu
