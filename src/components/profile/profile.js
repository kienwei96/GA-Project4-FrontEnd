import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { ProfileContext } from '../../context/ProfileContext';
import ProfileContent from '../profileContent/profileContent';
import Spinner from '../others/Spinner';
import ErrorPage from '../others/Error';
import styles from './profile.module.css';

export default function Profile() {
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const profileContext = useContext(ProfileContext);
  const [userProfile, setUserProfile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/profile/${authContext.authState.userInfo._id}`
        );
        console.log('data', data);
        setUserProfile(data);
        profileContext.setProfileState(data);
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

    getProfile();
  }, []);

  console.log('userProfile at profile.js', error);
  console.log();

  let profilePage = <ErrorPage />;

  try {
    if (error === 'Not found') {
      profilePage = (
        <div className={styles.profile}>
          <Typography variant='h5' component='p' gutterBottom>
            Welcome, {authContext.authState.userInfo.name} !
          </Typography>
          <Typography variant='p' component='p' gutterBottom>
            You have not yet setup a profile, please click below to complete
            your profile.
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
    } else if (userProfile) {
      profilePage = <ProfileContent profileData={userProfile} />;
    }
  } catch {
    profilePage = <ErrorPage />;
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className={styles.content}>
          <div className={styles.innerContent}>
            <h1 className='primary-textColor text-center'>Profile</h1>
          </div>
          {profilePage}
        </div>
      )}
    </>
  );
}
