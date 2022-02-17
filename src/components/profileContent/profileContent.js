import React, { useContext } from 'react';
import { Grid, Card, CardContent, Chip } from '@material-ui/core';

import Moment from 'react-moment';
import { AuthContext } from '../../context/AuthContext';

export default function ProfileContent(props) {
  const authContext = useContext(AuthContext);
  const profileData = props.profileData.userProfile;
  const favoriteSport = profileData.favourite.map((sport, index) => (
    <Chip key={index} label={sport} />
  ));
  console.log('profile content props', props);
  console.log('profileData props', profileData);

  return (
    <Grid className='marginB-2' container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <p>
              <strong>Name:</strong> {authContext.authState.userInfo.name}
            </p>
            <p>
              <strong>Contact No. :</strong>{' '}
              {authContext.authState.userInfo.contact}
            </p>
            <p>
              <strong>Age :</strong> {profileData.age}
            </p>
            <p>
              <strong>From: </strong> {profileData.location}, Singapore
            </p>
            <p>
              <strong>COVID-19 Vaccination:</strong> {profileData.vaccination}
            </p>
            <p>
              <strong>COVID-19 Recovered:</strong> {profileData.recovered}
            </p>
            <p>
              <strong>Join on: </strong>
              <Moment format='MM/DD/YYYY'>{profileData.date}</Moment>
            </p>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardContent>
            <h3>Favorite Sports</h3>
            {favoriteSport}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} xl={3}>
        <Card>
          <CardContent>
            <h3>Bio</h3>
            <p>
              {profileData.bio.length < 1 ? (
                <span>No bio</span>
              ) : (
                <span>{profileData.bio}</span>
              )}
            </p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
