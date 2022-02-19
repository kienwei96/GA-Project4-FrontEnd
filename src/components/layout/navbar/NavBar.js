import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

export default function NavBar() {
  const authContext = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(authContext);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    authContext.logout();
  };

  const guestLink = (
    <Box sx={{ flexGrow: 1, minWidth: '100%' }}>
      <AppBar position='static'>
        <Toolbar
          sx={{
            width: '80%',
            maxWidth: '1800px',
            margin: '0 auto',
            height: '80px',
          }}
        >
          <Typography
            variant='h6'
            component='span'
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            <Link
              to='/'
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <Button color='inherit'>ConnectSport</Button>
            </Link>
          </Typography>
          <Link
            to='/login'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button color='inherit'>Login</Button>
          </Link>
          <Link
            to='/register'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Button color='inherit'>Get Started</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );

  const userLink = (
    <Box sx={{ flexGrow: 1, minWidth: '100%' }}>
      <AppBar position='static'>
        <Toolbar
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography
            variant='h6'
            component='span'
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            <Link
              to='/'
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <Button color='inherit'>ConnectSport</Button>
            </Link>
          </Typography>
          <Typography
            variant='h6'
            component='span'
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            <Link
              to='/eventmain'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button color='inherit'>Find Event</Button>
            </Link>
          </Typography>
          <Typography
            variant='h6'
            component='span'
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            <Link
              to='/createEvent'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button color='inherit'>Create Event</Button>
            </Link>
          </Typography>
          <Typography
            variant='subtitle1'
            sx={{ m: 0, p: 0, marginBlockEnd: -0.5, color: '#353839' }}
          >
            Hi, {authContext.authState.userInfo.name}
          </Typography>
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                to='/profile'
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );

  return <div>{authContext.isAuthenticated() ? userLink : guestLink}</div>;
}
