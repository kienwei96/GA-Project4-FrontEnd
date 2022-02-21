import React, { useState, useContext, useEffect } from 'react';
import { sizing } from '@mui/system';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './GlobalCSs.css';
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
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Spinner from '../others/Spinner';
import EventList from './EventList';
import styles from './EventsItem.module.css';

export default function Event(props) {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sport, setSport] = useState('');
  const [vaccination, setVaccination] = useState('');
  const [apiCall, setApiCall] = useState('all');
  const [refresh, setRefresh] = useState(false);

  const baseURL = '/event/events/';
  const sportQuery = 'sportType?sport=';
  const vaccinationQuery = 'vaccinationStatus?vaccination=';

  const callApi = async () => {
    try {
      setLoading(true);
      const { data } = await fetchContext.authAxios.get(`${baseURL}all`);
      console.log('data', data);
      setResponse(data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log(error);
      const { data } = error.response;
      setError(data.message);
    }
  };

  const callApiByQuery = async (queryURL, params) => {
    try {
      setLoading(true);
      const { data } = await fetchContext.authAxios.get(
        `${baseURL}${queryURL}${params}`
      );
      console.log('data', data);
      setResponse(data);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log(error);
      const { data } = error.response;
      setError(data.message);
    }
  };

  useEffect(() => {
    if (apiCall === 'vaccination' && vaccination !== 'all') {
      console.log('statement 1');
      callApiByQuery(vaccinationQuery, vaccination);
    } else if (apiCall === 'sport' && sport !== 'all') {
      console.log('statement 2');

      callApiByQuery(sportQuery, sport);
    } else if (apiCall === 'all' || vaccination === 'all' || sport === 'all') {
      console.log('statement 3');
      callApi();
    }
  }, [apiCall, refresh]);

  const handleRefreshChange = (e) => {
    if (refresh) {
      setRefresh(false);
    } else setRefresh(true);
  };
  const handleSportChange = (e) => {
    setSport(e.target.value);
    handleRefreshChange();
    setApiCall('sport');
  };
  const handleVaccineChange = (e) => {
    setVaccination(e.target.value);
    handleRefreshChange();
    setApiCall('vaccination');
  };

  let eventList;

  if (!response.length) {
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
        <EventList events={response} />
      </Grid>
    );
  }

  return (
    <div className='minHeight'>
      <Grid container className='marginX-1'>
        <Grid item xs={12} sm={6} md={6}>
          <div className={styles.header}>
            <Typography
              className={styles.eventword}
              variant='h3'
              component='h1'
            >
              List of Events
            </Typography>
          </div>
        </Grid>
        <Grid>
          <FormControl width={'100%'} variant='outlined' margin='normal'>
            <InputLabel shrink={true} id='Search sport by categories'>
              Search sport by categories *
            </InputLabel>
            <Select
              sx={{ width: 200, margin: '8px' }}
              labelId='Search sport by categories'
              id='Search sport by categories'
              name='typeofsport'
              type='name'
              value={sport}
              onChange={handleSportChange}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'Badminton'}>Badminton</MenuItem>
              <MenuItem value={'Basketball'}>Basketball</MenuItem>
              <MenuItem value={'Baseball'}>Baseball</MenuItem>
              <MenuItem value={'Football'}>Football</MenuItem>
              <MenuItem value={'Futsal'}>Futsal</MenuItem>
              <MenuItem value={'Soccer'}>Soccer</MenuItem>
              <MenuItem value={'Ping Pong'}>Ping Pong</MenuItem>
              <MenuItem value={'Tennis'}>Tennis</MenuItem>
              <MenuItem value={'Running'}>Running</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl width={'50%'} variant='outlined' margin='normal'>
            <InputLabel shrink={true} id='Search sport by categories'>
              Search sport by vaccination *
            </InputLabel>
            <Select
              sx={{ width: 200, margin: '8px' }}
              labelId='Vaccination requirement'
              id='Vaccination requirement'
              name='vaccination requirement'
              type='name'
              value={vaccination}
              onChange={handleVaccineChange}
            >
              <MenuItem display={'flex'} value={'all'}>
                All
              </MenuItem>
              <MenuItem value={'Yes'}>Yes</MenuItem>
              <MenuItem value={'No'}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? <Spinner /> : eventList}
    </div>
  );
}
