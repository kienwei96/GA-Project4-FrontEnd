import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Container, Grid, Link, Typography } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';

export default () => {
  const authContext = useContext(AuthContext);
  let eventLink;

  const createEventLink = () => {
    if (authContext.isUser()) {
      console.log('is user');
      eventLink = (
        <>
          <span>/</span>
          <Link className='white-link' component={RouterLink} to='/createEvent'>
            Create Event
          </Link>
        </>
      );
    } else eventLink = '';
  };

  createEventLink();
  return (
    <footer>
      <AppBar className='primary-color marginT-3 pad-2' position='static'>
        <Grid component={Container} container>
          <Grid item xs={12} sm={3}>
            ConnectSport
          </Grid>
          <Grid item xs={12} sm={9} className='footer-links'>
            <Link className='white-link' component={RouterLink} to='/'>
              Home
            </Link>
            <span>/</span>
            <Link className='white-link' component={RouterLink} to='/eventlist'>
              Events List
            </Link>
            {eventLink}
            <span>/</span>
            <Link className='white-link' component={RouterLink} to='/register'>
              Get Started
            </Link>
            <span>/</span>
            <Link
              className='white-link'
              component={RouterLink}
              to='/termsofservice'
            >
              Terms
            </Link>
            <span>/</span>
            <Link
              className='white-link'
              component={RouterLink}
              to='/privacypolicy'
            >
              Privacy
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}></Grid>
          <Grid item xs={12} sm={9}>
            <Typography className='marginL-d7'>
              Copyright &copy;{new Date().getFullYear()} ConnectSport
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
    </footer>
  );
};
