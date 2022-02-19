import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import {
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Button,
} from '@material-ui/core';
import { GoogleLoginButton } from 'react-social-login-buttons';

import styles from './Login.module.css';
import { publicFetch } from '../../util/publicFetch';
import { AuthContext } from '../../context/AuthContext';

const LoginSchema = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const authContext = useContext(AuthContext);
  const { login, login__card, login__info, btn__progress, form } = styles;
  const [loginSuccess, setLoginSuccess] = useState();
  const [loginError, setLoginError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const submitCredentials = async (credentials) => {
    try {
      setLoginLoading(true);
      const { data } = await publicFetch.post(`login`, credentials);

      authContext.setAuthState(data);
      setLoginSuccess(data.message);
      setLoginError('');
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 1000);
    } catch (error) {
      setLoginLoading(false);
      console.log(error);
      const { data } = error.response;
      setLoginError(data.message);
      setLoginSuccess(null);
    }
  };

  const onGoogleLogin = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/googleLogin/auth/google`,
      '_self'
    );
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      submitCredentials(values);
    },
  });

  let pageRedirect;

  if (redirectOnLogin && authContext.isUser()) {
    if (authContext.authState.userInfo.setProfile) {
      pageRedirect = <Navigate to='/profile' replace={true} />;
    } else {
      pageRedirect = <Navigate to='/' replace={true} />;
    }
  }

  return (
    <>
      {pageRedirect}

      <Grid className={login} container justify='center'>
        <Grid item xs={12} sm={8} md={6} container spacing={5}>
          <Card className={login__card}>
            <CardContent>
              <Typography className='primary-textColor' variant='h5' paragraph>
                Log In
              </Typography>
              <Typography variant='body2' color='secondary'></Typography>
              <form onSubmit={formik.handleSubmit} className={form}>
                <TextField
                  label='Email'
                  placeholder='Email'
                  name='email'
                  type='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  label='Password'
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  helperText={formik.touched.password && formik.errors.password}
                />
                {loginError}
                <Button
                  className={
                    loginLoading
                      ? 'relative'
                      : 'relative primary-color marginT-1'
                  }
                  type='submit'
                  variant='contained'
                  disabled={loginLoading}
                >
                  Submit
                  {loginLoading && (
                    <CircularProgress size={24} className={btn__progress} />
                  )}
                </Button>
              </form>
              <Typography variant='subtitle2' className={login__info}>
                Dont have an account? <Link to='/register'>Sign Up</Link>
              </Typography>
            </CardContent>
            <GoogleLoginButton onClick={onGoogleLogin} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
