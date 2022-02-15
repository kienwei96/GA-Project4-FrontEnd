import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '@material-ui/core';

import styles from './Home.module.css';
import LandingImg from '../../img/landingpage_1.png';
import Picture1 from '../../img/picture_1.jpg';
import Picture2 from '../../img/picture_2.jpg';
import StepsImg from '../../img/steps.jpg';
import { AuthContext } from '../../context/AuthContext';

export default function Home() {
  const authContext = useContext(AuthContext);

  const {
    header,
    header__text,
    header__buttons,
    header__img,
    landingImage,
    landingImage__container,
    landingImage__text,
    landingImage__imgReverse,
    steps__text,
    steps__list,
  } = styles;

  const guestLinks = (
    <div className={header__buttons}>
      <Button
        className='primary-color marginR-1'
        component={Link}
        to='/register'
        variant='contained'
        size='large'
      >
        Get Started
      </Button>
      <Button
        className='secondary-color'
        component={Link}
        to='/events'
        variant='contained'
        size='large'
      >
        See Events
      </Button>
    </div>
  );

  const userLinks = (
    <div className={header__buttons}>
      <Button
        className='primary-color marginR-1'
        component={Link}
        to='/profile'
        variant='contained'
        size='large'
      >
        Your Profile
      </Button>
      <Button
        className='secondary-color'
        component={Link}
        to='/events'
        variant='contained'
        size='large'
      >
        See Events
      </Button>
    </div>
  );

  return (
    <Container maxWidth='lg'>
      <header className={header}>
        <div className={header__text}>
          <h1>Host a sport event with everyone </h1>
          <p>
            Pick a day, time, and place to play any sports with someone or group
            of people with preferences
          </p>
          {authContext.isAuthenticated() ? userLinks : guestLinks}
        </div>
        <img src={LandingImg} alt='Landing' className={header__img} />
      </header>

      <main>
        <div className={landingImage}>
          <div className={landingImage__container}>
            <img src={StepsImg} alt='HowitworkImg2' />
            <div className={steps__text}>
              <h2>Simple,</h2>
              <ol className={steps__list}>
                <li>Set up your account</li>
                <li>Post an event and set any preferences you like</li>
                <li>Wait for players to join</li>
                <li>Or join others event</li>
                <li>Meet and have fun!</li>
              </ol>
            </div>
          </div>
        </div>

        <div className={landingImage}>
          <div className={landingImage__container}>
            <img
              src={Picture1}
              className={landingImage__imgReverse}
              alt='HowitworkImg1'
            />
            <div className={landingImage__text}>
              <h2>Join others and make friend</h2>
              <p>
                You can join any any sport event that was post by other user
              </p>
              <Button
                className='primary-color marginB-2'
                component={Link}
                to='/events'
                variant='contained'
                size='large'
              >
                See Events
              </Button>
            </div>
          </div>

          <div className='mb-5'></div>

          <div className={landingImage__container}>
            <img src={Picture2} alt='HowitworkImg2' />
            <div className={landingImage__text}>
              <h2>Host an Event</h2>
              <p>
                You can also create event and set preference for other user to
                join you to play together
              </p>
              <Button
                className='primary-color'
                component={Link}
                to='/create-event'
                variant='contained'
                size='large'
              >
                Post Event
              </Button>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}
