import React, { useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';

export default function TermsofService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Container maxWidth='lg' className='minHeight'>
      <h1 className='primary-textColor'>Terms of Service</h1>

      <Typography variant='h6'>User Content</Typography>
      <Typography variant='body1'>
        You are responsible for your user content.
      </Typography>
      <ul>
        <li>
          <Typography variant='body1'>
            The content is not copyright and other intellectual property rights
          </Typography>
        </li>
        <li>
          <Typography variant='body1'>
            The content does not contain defamatory, pornographic, harassing,
            threatening, hateful, or otherwise inappropriate
          </Typography>
        </li>
      </ul>

      <Typography variant='h6'>Prohibited Conduct</Typography>
      <Typography variant='body1'>
        By using this service, you agree not to:
      </Typography>
      <ul>
        <li>
          <Typography variant='body1'>
            Use the Service for any illegal purpose or in violation of any laws
            or regulations;
          </Typography>
        </li>
        <li>
          <Typography variant='body1'>
            Post any user content that is defamatory, pornographic, harassing,
            threatening, hateful, or otherwise inappropriate
          </Typography>
        </li>
      </ul>

      <Typography variant='h6'>Termination of Your Account</Typography>
      <Typography variant='body1' paragraph>
        If you breach any of these Terms, your account and post will be delete.
      </Typography>

      <Typography variant='h6'>Disclaimer</Typography>
      <Typography variant='body1'>
        Limitation of liability clauses are common in end-user license
        agreements so that users are aware that they will not be able to hold
        the company liable for any damages arising out of the use of the
        application.
      </Typography>
    </Container>
  );
}
