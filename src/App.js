import React, { useEffect, useContext } from 'react';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
  Switch,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Button } from '@mui/material';
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@mui/material/styles';

import Home from './components/home/Home';
import NavBar from './components/layout/navbar/NavBar';
import Footer from './components/layout/Footer';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import CreateProfile from './components/createProfile/CreateProfile';
import EditProfile from './components/editProfile/EditProfile';
import OtherProfile from './components/otherProfile/OtherProfile';
import PrivacyPolicy from './components/others/PrivacyPolicy';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import TermsofService from './components/others/TermsofService';
import EventMain from './components/eventPage/EventMain';
import CreateEvent from './components/createEvent/CreateEvent';
import EventDetails from './components/EventDetails/EventDetails';
import MyEvent from './components/myEvent/MyEventPage';
import JoinedEvent from './components/joinEventPage/JoinEventPage';
import { ProfileProvider } from './context/ProfileContext';

let theme = createTheme({
  typography: {
    fontFamily: 'Mulish, Arial',
    body1: {
      color: '#084c61',
    },
    button: {
      textTransform: 'none',
      fontSize: '15px',
      padding: '5px',
      marginLeft: '5px',
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#084C61',
      light: '#a8acbd',
      dark: '#a8acbd',
    },
  },
});

theme = responsiveFontSizes(theme);

const UserRoute = () => {
  const authContext = useContext(AuthContext);
  return authContext.isAuthenticated() ? <Outlet /> : <Navigate to='/' />;
};

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <FetchProvider>
            <ProfileProvider>
              <NavBar />
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/eventmain' element={<EventMain />} />
                <Route exact path='/event/:id' element={<EventDetails />} />
                <Route
                  exact
                  path='/privacypolicy'
                  element={<PrivacyPolicy />}
                />
                <Route
                  exact
                  path='/termsofservice'
                  element={<TermsofService />}
                />
                <Route exact path='/' element={<UserRoute />}>
                  <Route exact path='/profile' element={<Profile />} />
                  <Route exact path='/profile/:id' element={<OtherProfile />} />
                  <Route exact path='/createEvent' element={<CreateEvent />} />
                  <Route exact path='/myEvent' element={<MyEvent />} />
                  <Route exact path='/joinedEvent' element={<JoinedEvent />} />

                  <Route
                    exact
                    path='/create-profile'
                    element={<CreateProfile />}
                  />
                  <Route exact path='/edit-profile' element={<EditProfile />} />
                </Route>
              </Routes>
              <Footer />
            </ProfileProvider>
          </FetchProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
