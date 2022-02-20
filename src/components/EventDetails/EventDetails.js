import React, { useState, useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { Link } from 'react-router-dom';
import { Navigate, useParams } from 'react-router-dom';
import { Paper, List } from '@material-ui/core';
import ErrorPage from '../others/Error';
import Spinner from '../others/Spinner';
import EventDetailsItem from './EventDetailsItem';
import styles from './EventDetailsItem.module.css';

export default function EventDetails(props) {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const params = useParams();
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isAuthenticated = authContext.isUser();
  console.log('response in event details page', response);

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/event/eventDetails/${params.id}`
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

    callApi();
  }, []);

  let eventDetail;

  if (response === null || loading || Object.keys(response).length === 0) {
    eventDetail = <Spinner />;
  } else {
    eventDetail = (
      <div>
        <Paper elevation={3}>
          <EventDetailsItem eventData={response} auth={isAuthenticated} />
        </Paper>
        {isAuthenticated ? (
          <div></div>
        ) : (
          <h2>
            You need to login to join. <Link to='/login'>Click Here</Link>
          </h2>
        )}
      </div>
    );
  }

  return (
    <div className='post'>
      <div className='container'>
        <h1 className={styles.eventword}>Event : {response.eventName}</h1>
        <List>{eventDetail}</List>
      </div>
    </div>
  );
}
