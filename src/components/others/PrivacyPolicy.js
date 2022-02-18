import React, { useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container maxWidth='lg' className='minHeight'>
      <h1 className='primary-textColor'>Privacy Policy</h1>

      <Typography variant='h6'>
        This web app may collects data such as:
      </Typography>
      <ul>
        <li>
          <Typography variant='body1'>Name</Typography>
        </li>
        <li>
          <Typography variant='body1'>Contact Number</Typography>
        </li>
        <li>
          <Typography variant='body1'>Email</Typography>
        </li>
        <li>
          <Typography variant='body1'>Age</Typography>
        </li>
        <li>
          <Typography variant='body1'>Gender</Typography>
        </li>
        <li>
          <Typography variant='body1'>Location</Typography>
        </li>
        <li>
          <Typography variant='body1'>Favorite Sports</Typography>
        </li>
        <li>
          <Typography variant='body1'>Bio</Typography>
        </li>
        <li>
          <Typography variant='body1'>COVID-19 Vaccination status</Typography>
        </li>
        <li>
          <Typography variant='body1'>COVID-19 Recovered status</Typography>
        </li>
      </ul>

      <Typography variant='h6' paragraph>
        We only use your data for this web app.
      </Typography>

      <Typography variant='h6' paragraph>
        You can contact us at{' '}
        <a href='mailto:pengwei1106@gmail.com'>pengwei1106@gmail.com </a> to
        remove your data and account.
      </Typography>

      <Typography variant='h6'>
        If you do not want your data to be collected, please do not use this web
        app.
      </Typography>
    </Container>
  );
}
