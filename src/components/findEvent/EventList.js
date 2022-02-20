import React, { useState, useContext, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Paper, List } from '@material-ui/core';
import ErrorPage from '../others/Error';
import Spinner from '../others/Spinner';
import EventsItem from './EventsItem';

export default function EventList(props) {
  const eventData = props.events;
  console.log('my event props', props.myEvent);
  const render = eventData.map((event) => (
    <EventsItem
      key={eventData._id}
      event={event}
      myEvent={props.myEvent}
      joinedEvent={props.joinedEvent}
    />
  ));
  return <div>{render ? render : ''}</div>;
}
