import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Paper,
  List,
  setRef,
  Box,
  grid,
} from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import EventList from '../findEvent/EventList';

import Spinner from '../others/Spinner';
import ErrorPage from '../others/Error';

export default function EventMain() {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const [eventData, setEventData] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/event/events/joinedEvent/${authContext.authState.userInfo._id}`
        );

        setEventData(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        setLoading(false);
        console.log(error);
        const { data } = error.response.data;
        setError(data.message);
      }
    };

    getData();
  }, []);

  let eventList;

  if (!eventData.length) {
    eventList = (
      <Typography
        className='marginT-5'
        variant='h3'
        color='secondary'
        component='p'
        align='center'
      >
        No Events Yet
      </Typography>
    );
  } else {
    eventList = (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <EventList events={eventData} joinedEvent={true} />
      </Grid>
    );
  }

  console.log('joined page', eventData);

  return <>{loading ? <Spinner /> : eventList}</>;
}
