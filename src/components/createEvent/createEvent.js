import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { ProfileContext } from '../../context/ProfileContext';
import { Navigate } from 'react-router-dom';
import Spinner from '../others/Spinner';

export default function CreateEvent() {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const profileContext = useContext(ProfileContext);
  const [userProfile, setUserProfile] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  let pageRedirect;

  if (userProfile.setProfile) {
    pageRedirect = <Navigate to='/profile' replace={true} />;
  }

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
  return <>{loading ? <Spinner /> : pageRedirect}</>;
}
