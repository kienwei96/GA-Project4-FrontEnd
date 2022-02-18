import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { Navigate } from 'react-router-dom';
import Spinner from '../others/Spinner';

export default function EventList() {
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

  if (user.setProfile) {
    pageRedirect = <Navigate to='/profile' replace={true} />;
  }
  return <>{loading ? <Spinner /> : pageRedirect}</>;
}
