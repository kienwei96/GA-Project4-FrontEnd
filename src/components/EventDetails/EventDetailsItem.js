import React, { useState, useContext, useEffect } from 'react';
import Moment from 'react-moment';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import {
  Paper,
  Grid,
  Box,
  Chip,
  Avatar,
  Snackbar,
  IconButton,
  ButtonGroup,
  Button,
  Typography,
} from '@material-ui/core';

import styles from './EventDetailsItem.module.css';
import Basketball from '../../img/basketball.jpg';
import Baseball from '../../img/baseball.jpg';
import Badminton from '../../img/badminton.jpg';
import Football from '../../img/football.jpg';
import PingPong from '../../img/pingpong.jpg';
import Running from '../../img/running.jpg';
import Soccer from '../../img/soccer.jpg';
import Tennis from '../../img/tennis.jpg';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';

export default function EventDetailsItem(props) {
  const photo = (sport) => {
    switch (sport) {
      case 'Basketball':
        return Basketball;
      case 'Baseball':
        return Baseball;
      case 'Badminton':
        return Badminton;
      case 'Football':
        return Football;
      case 'Ping Pong':
        return PingPong;
      case 'Running':
        return Running;
      case 'Soccer':
        return Soccer;
      case 'Tennis':
        return Tennis;
      case 'Futsal':
        return Soccer;
    }
  };
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const eventData = props.eventData;
  const isAuthenticated = props.auth;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [badRequest, setBadRequest] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [noProfile, setNoProfile] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  const callApi = async () => {
    try {
      setLoading(true);
      const { data } = await fetchContext.authAxios.post(
        `/event/events/join/${eventData._id}/${authContext.authState.userInfo._id}`
      );
      setResponse(data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      setBadRequest(true);
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };
  const handleBackButton = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    if (refresh) {
      setRefresh(false);
    } else setRefresh(false);
  };

  const handleJoinSubmit = () => {
    if (noProfile) {
      setRedirectToProfile(true);
    } else {
      callApi();
      handleRefresh();
      console.log(`joined the ${eventData._id} event!`);
      window.location.reload();
    }
  };

  console.log('error message is', errorMessage);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/profile/${authContext.authState.userInfo._id}`,
          {}
        );
        console.log('get profile success!');
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log('get profile failed!');
        console.log(error);
        setNoProfile(true);
      }
    };

    getProfile();
  }, [refresh]);

  return (
    <>
      {redirectToProfile && <Navigate to='/profile' replace={true} />}
      <Paper className='pad-2'>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <span className={styles.labelInfo}>Type of Sport</span>
                <Typography variant='h6' paragraph>
                  {eventData.sport}
                </Typography>
                <span className={styles.labelInfo}>Location</span>
                <Typography variant='h6' paragraph>
                  {eventData.location}
                </Typography>

                <span className={styles.labelInfo}>Start Date</span>
                <Typography variant='h6' paragraph>
                  {
                    <Moment format='MMMM Do, YYYY'>
                      {eventData.startDate}
                    </Moment>
                  }
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <span className={styles.labelInfo}>Number of Player</span>
                <Box display='flex'>
                  <GroupIcon className={styles.icon} />
                  <Typography variant='h6' paragraph>
                    {eventData.player}
                  </Typography>
                </Box>
                <span className={styles.labelInfo}>Game Level</span>
                <Box display='flex'>
                  <SportsEsportsIcon className={styles.icon} />
                  <Typography variant='h6' paragraph>
                    {eventData.level}
                  </Typography>
                </Box>
                <span className={styles.labelInfo}>COVID-19 Vaccination</span>
                <Box display='flex'>
                  <VaccinesIcon className={styles.icon} />
                  <Typography variant='h6' paragraph>
                    {eventData.vaccination}
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <span className={styles.labelInfo}>Description</span>
            <Typography variant='h6' paragraph>
              {eventData.description ? eventData.description : 'None'}
            </Typography>

            <Typography paragraph>
              Host By{' '}
              <Link to={`/profile/${eventData.user._id}`}>
                {eventData.user.name}
              </Link>
            </Typography>
            {isAuthenticated ? (
              <>
                <div className={styles.playerDiv}>
                  <span className={styles.labelInfo}>Players</span>
                  <div className='marginT-1'>
                    {eventData.listofplayer.map((player, index) => {
                      return (
                        <Link to={`/profile/${player._id}`}>
                          <Chip
                            key={player._id}
                            className='marginR-1 marginX-1'
                            avatar={<Avatar>{index + 1}</Avatar>}
                            label={player.name}
                            variant='outlined'
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </Grid>
          <Grid container item xs={12} md={6}>
            <img
              style={{ width: '100%' }}
              src={photo(eventData.sport)}
              alt='Sport'
            />
          </Grid>
        </Grid>
        <hr />

        {isAuthenticated ? (
          <Box display='flex'>
            <Button
              className='primary-color'
              onClick={handleJoinSubmit}
              variant='contained'
              color='primary'
            >
              Join This Event
            </Button>
            <p className='marginL-1'>
              {eventData.player - eventData.listofplayer.length} spots left
            </p>
          </Box>
        ) : (
          ''
        )}

        <div className={styles.errorMessage}>
          {badRequest ? <strong> {errorMessage} !</strong> : ''}
        </div>
        <Button
          className='primary-color white-link'
          size='large'
          variant='contained'
          onClick={handleBackButton}
        >
          Back
        </Button>
      </Paper>
    </>
  );
}
