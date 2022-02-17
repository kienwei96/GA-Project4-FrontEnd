import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import Spinner from '../others/Spinner';
import ErrorPage from '../others/Error';
import ProfileContent from '../profileContent/profileContent';
import styles from './profile.module.css';

export default function Profile() {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const [userProfile, setUserProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

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

  let profilePage;

  if (authContext.authState.userInfo.setProfile) {
    profilePage = (
      <div className={styles.profile}>
        <Typography variant='h5' component='p' gutterBottom>
          Welcome, {authContext.authState.userInfo.name} !
        </Typography>
        <Typography variant='p' component='p' gutterBottom>
          You have not yet setup a profile, please click below to complete your
          profile.
        </Typography>
        <p></p>
        <Link to='/create-profile'>
          <Button
            className='primary-color marginB-2'
            variant='contained'
            to='/create-profile'
          >
            Create Profile
          </Button>
        </Link>
      </div>
    );
  } else {
    if (Object.keys(userProfile).length > 0) {
      profilePage = <ProfileContent profileData={userProfile} />;
    } else {
      profilePage = <ErrorPage />;
    }
  }

  console.log(userProfile);
  return (
    <div className='minHeight'>
      <h1 className='primary-textColor text-center'>User Profile</h1>
      {profilePage}
    </div>
  );
}
