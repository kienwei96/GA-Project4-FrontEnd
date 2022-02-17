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
import Profile from './components/profile/profile';
import CreateProfile from './components/createProfile/createProfile';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

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

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <FetchProvider>
            <NavBar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/create-profile' element={<CreateProfile />} />
            </Routes>
            <Footer />
          </FetchProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
