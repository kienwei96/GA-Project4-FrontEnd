import React, { useState, useContext, useEffect } from 'react';
import Moment from 'react-moment';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Chip,
  Button,
  Typography,
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Spinner from '../others/Spinner';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import styles from './EventsItem.module.css';
import Basketball from '../../img/basketball.jpg';
import Baseball from '../../img/baseball.jpg';
import Badminton from '../../img/badminton.jpg';
import Football from '../../img/football.jpg';
import PingPong from '../../img/pingpong.jpg';
import Running from '../../img/running.jpg';
import Soccer from '../../img/soccer.jpg';
import Tennis from '../../img/tennis.jpg';

export default function EventsItem(props) {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const eventData = props.event;
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  console.log('event item page my event props', props.myEvent);
  console.log('event item page joined event props', props.joinedEvent);

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

  const callDeleteApi = async () => {
    try {
      setLoading(true);
      const { data } = await fetchContext.authAxios.delete(
        `/event/myEvent/delete/${eventData._id}`
      );
      setResponse(data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  const callLeftApi = async () => {
    try {
      setLoading(true);
      const { data } = await fetchContext.authAxios.put(
        `/event/joinedEvent/delete/${eventData._id}/${authContext.authState.userInfo._id}`
      );
      setResponse(data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
    }
  };

  const handleDelete = () => {
    callDeleteApi();
    window.location.reload();
  };

  const handleLeft = () => {
    callLeftApi();
    window.location.reload();
  };

  const eventPageCheck = () => {
    if (props.myEvent) {
      return (
        <CardActions>
          <Button
            className='primary-color white-link'
            size='large'
            variant='contained'
            fullWidth
            onClick={handleDelete}
          >
            Cancel Event
          </Button>
        </CardActions>
      );
    } else if (props.joinedEvent) {
      return (
        <CardActions>
          <Button
            className='primary-color white-link'
            size='large'
            variant='contained'
            fullWidth
            onClick={handleLeft}
          >
            Cancel to join
          </Button>
        </CardActions>
      );
    } else {
      return (
        <CardActions>
          <Button
            className='primary-color white-link'
            size='large'
            variant='contained'
            fullWidth
            component={Link}
            to={`/event/${eventData._id}`}
          >
            More Info
          </Button>
        </CardActions>
      );
    }
  };

  return (
    <>
      <div className={styles.outerCard}>
        <Card className={styles.card}>
          <Link to={`/event/${eventData._id}`}>
            <img
              style={{ width: '100%', height: '220px' }}
              src={photo(eventData.sport)}
              alt='Sport'
            />
          </Link>
          <CardHeader className='padB-0' title={eventData.eventName} />
          <CardContent>
            <Chip icon={<SportsBasketballIcon />} label={eventData.sport} />
            <Chip icon={<GroupIcon />} label={eventData.player} />
            <Chip
              icon={<VaccinesIcon />}
              label={eventData.vaccination ? 'Required' : 'Not Required'}
            />
            <Chip icon={<SportsEsportsIcon />} label={eventData.level} />
            {eventData.slot ? (
              <Chip icon={<PersonAddDisabledIcon />} label={'Full'} />
            ) : (
              <Chip icon={<PersonAddAlt1Icon />} label={'Available'} />
            )}
            <Chip
              icon={<DateRangeIcon />}
              label={
                <Moment format='MMMM Do, YYYY'>{eventData.startDate}</Moment>
              }
            />
            <div className={styles.description}>
              <Typography variant='body2' color='textSecondary' component='p'>
                Invitation Slogan:
                <br />
                {eventData.description}
              </Typography>
            </div>
          </CardContent>
          {eventPageCheck()}
        </Card>
      </div>
    </>
  );
}
