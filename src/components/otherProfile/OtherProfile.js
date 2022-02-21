import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
import { FetchContext } from '../../context/FetchContext';
import { ProfileContext } from '../../context/ProfileContext';
import ProfileContent from '../profileContent/ProfileContent';
import Spinner from '../others/Spinner';
import ErrorPage from '../others/Error';
import styles from './otherProfile.module.css';

export default function Profile() {
  const params = useParams();
  const authContext = useContext(AuthContext);
  const fetchContext = useContext(FetchContext);
  const profileContext = useContext(ProfileContext);
  const [userProfile, setUserProfile] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/profile/${params.id}`
        );
        console.log('data now', data);
        setUserProfile(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log('error now', error);
        const { data } = error.response;
        setError(true);
        setLoading(false);
      }
    };

    const getUser = async () => {
      try {
        setLoading(true);
        const { data } = await fetchContext.authAxios.get(
          `/profile/user/${params.id}`
        );
        console.log('user name', data);
        setUserName(data);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log('error now', error);
        const { data } = error.response;
        setLoading(false);
      }
    };

    getProfile();
    getUser();
  }, []);

  console.log('error at other Profile.js', error);

  console.log('data now', userProfile);

  let profilePage;

  if (error) {
    profilePage = <ErrorPage />;
  } else if (Object.keys(userProfile).length > 0) {
    profilePage = (
      <ProfileContent
        profileData={userProfile}
        profileCheck={false}
        otherProfile={true}
        user={userName.userAccount}
      />
    );
  } else {
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
