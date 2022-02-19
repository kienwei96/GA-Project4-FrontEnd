import React, { useState, useContext, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { ProfileContext } from '../../context/ProfileContext';
import { Navigate } from 'react-router-dom';
import Spinner from '../others/Spinner';
import { StylesContext } from '@material-ui/styles';
import styles from './createEvent.module.css';

export default function CreateEvent() {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const profileContext = useContext(ProfileContext);
  const [userProfile, setUserProfile] = useState('');
  const [loading, setLoading] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [badRequest, setBadRequest] = useState('');
  const [redirectPage, setRedirectPage] = useState(false);
  const [eventName, setEventName] = useState('');
  const [sport, setSport] = useState('');
  const [location, setLocation] = useState('');
  const [player, setPlayer] = useState('');
  const [vaccination, setVaccination] = useState('');
  const [level, setLevel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/profile/${authContext.authState.userInfo._id}`,
          {}
        );
        setUserProfile(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log(error);
        const { data } = error.response;
        setError(data.message);
      }
    };

    getProfile();
  }, []);

  const createEvent = async () => {
    try {
      setLoading(true);
      const response = await fetchContext.authAxios.post('/event/new', {
        _id: authContext.authState.userInfo._id,
        eventName: eventName,
        sport: sport,
        location: location,
        player: player,
        vaccination: vaccination,
        level: level,
        startDate: startDate,
        description: description,
      });
      console.log('response', response.data.message);
      setResponse(response.data.message);
      setTimeout(() => {
        setLoading(false);
        setRedirectPage(true);
      }, 1500);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      setResponse(error.response.data);
      setBadRequest(error.response.data);
      setLoading(false);
    }
  };

  const handleSportChange = (e) => {
    setSport(e.target.value);
  };

  const handleVaccinationChange = (e) => {
    setVaccination(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  const handleSubmit = () => {
    createEvent();
  };

  let pageRedirect;

  if (userProfile.setProfile) {
    pageRedirect = <Navigate to='/profile' replace={true} />;
  } else {
    pageRedirect = (
      <>
        <Grid container justify='center' className='marginX-1'>
          <Grid item xs={12} sm={8} md={6}>
            <Card className='card'>
              <CardContent>
                <Typography
                  variant='h3'
                  component='h1'
                  align='center'
                  gutterBottom
                >
                  Host Your Event
                </Typography>
                <form className={styles.formContent}>
                  <TextField
                    margin='normal'
                    label='Event Name *'
                    placeholder=''
                    name='eventname'
                    type='name'
                    value={eventName}
                    onChange={(e) => {
                      setEventName(e.target.value);
                    }}
                  />
                  {response ? response.eventName : ''}
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth={true}
                        variant='standard'
                        margin='normal'
                      >
                        <InputLabel shrink={true} id='sportType'>
                          Type of Sport *
                        </InputLabel>
                        <Select
                          labelId='sportType'
                          id='sportType'
                          label='Type of Sport'
                          value={sport}
                          onChange={handleSportChange}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>
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
                        {response ? response.sport : ''}
                      </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        fullWidth={true}
                        margin='normal'
                        label='Number of Player *'
                        placeholder='2-20 Players'
                        name='numberofplayer'
                        type='number'
                        onChange={(e) => {
                          setPlayer(e.target.value);
                        }}
                      />
                      {response ? response.player : ''}
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth={true}
                        variant='outlined'
                        margin='normal'
                      >
                        <InputLabel
                          shrink={true}
                          id='demo-simple-select-filled-label'
                        >
                          COVID-19 Vaccination Required *
                        </InputLabel>
                        <Select
                          label='Vaccination Required *'
                          name='vaccination'
                          type='name'
                          value={vaccination}
                          onChange={handleVaccinationChange}
                        >
                          <MenuItem value={'Yes'}>Yes</MenuItem>
                          <MenuItem value={'No'}>No</MenuItem>
                        </Select>
                        {response ? response.vaccination : ''}
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <FormControl
                        fullWidth={true}
                        variant='outlined'
                        margin='normal'
                      >
                        <InputLabel
                          shrink={true}
                          id='demo-simple-select-filled-label'
                        >
                          Game Level *
                        </InputLabel>
                        <Select
                          label='Game Level *'
                          name='level'
                          type='name'
                          value={level}
                          onChange={handleLevelChange}
                        >
                          <MenuItem value={'Easy'}>Easy</MenuItem>
                          <MenuItem value={'Medium'}>Medium</MenuItem>
                          <MenuItem value={'Hard'}>Hard</MenuItem>
                        </Select>
                        {response ? response.level : ''}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <TextField
                    label='Location'
                    placeholder='Details about this event'
                    name='location'
                    type='name'
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                  {response ? response.location : ''}
                  <FormControl margin='normal'>
                    <TextField
                      type='date'
                      name='start'
                      label='Start Date'
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {response ? response.startDate : ''}
                  </FormControl>
                  <TextField
                    label='Description'
                    placeholder='Details about this event'
                    name='description'
                    type='name'
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    multiline
                    rows={5}
                  />
                  <Button
                    className='primary-color marginB-2'
                    type='submit'
                    variant='contained'
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      {redirectPage && <Navigate to='/eventlist' replace={true} />}
      {loading ? <Spinner /> : pageRedirect}
    </>
  );
}
