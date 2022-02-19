import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Paper, List } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import EventList from '../findEvent/Event';

import Spinner from '../others/Spinner';
import ErrorPage from '../others/Error';

export default function EventMain() {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/profile/user/${authContext.authState.userInfo._id}`
        );
        setUser(data);
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

    getUser();
  }, []);

  let pageRedirect;
  try {
    if (user.setProfile) {
      pageRedirect = <Navigate to='/profile' replace={true} />;
    } else {
      pageRedirect = <EventList />;
    }
  } catch (err) {
    pageRedirect = <ErrorPage />;
  }

  return <>{loading ? <Spinner /> : pageRedirect}</>;
}
