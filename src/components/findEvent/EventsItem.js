import React, { useState, useContext, useEffect } from 'react';
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
import sportImage from '../../img/picture_2.jpg';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import styles from './EventsItem.module.css';

export default function EventsItem(props) {
  const eventData = props.event;
  console.log('event item page props', eventData);
  return (
    <>
      <div className={styles.outerCard}>
        <Card className={styles.card}>
          <Link to={`/event/${eventData._id}`}>
            <img
              style={{ width: '100%', height: '220px' }}
              src={sportImage}
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
            {eventData.slot ? (
              <Chip icon={<PersonAddDisabledIcon />} />
            ) : (
              <Chip icon={<PersonAddAlt1Icon />} />
            )}

            <Typography
              className={styles.description}
              variant='body2'
              color='textSecondary'
              component='p'
            >
              Invitation Slogan:
              <br />
              {eventData.description}
            </Typography>
          </CardContent>
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
        </Card>
      </div>
      ;
    </>
  );
}
