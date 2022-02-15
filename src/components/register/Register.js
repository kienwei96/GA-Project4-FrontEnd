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

import styles from './Register.module.css';
import { publicFetch } from '../../util/publicFetch';
import { AuthContext } from '../../context/AuthContext';

const RegisterSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  password2: yup.string().required('Password must match'),
});

export default function Login() {
  const authContext = useContext(AuthContext);
  const { register, register__card, register__info, btn__progress, form } =
    styles;
  const [registerSuccess, setRegisterSuccess] = useState();
  const [registerError, setRegisterError] = useState();
  const [redirectOnLogin, setRedirectOnLogin] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  const submitCredentials = async (credentials) => {
    try {
      setRegisterLoading(true);
      const { data } = await publicFetch.post(`register`, credentials);

      authContext.setAuthState(data);
      setRegisterSuccess(data.message);
      setRegisterError('');
      setTimeout(() => {
        setRedirectOnLogin(true);
      }, 1000);
    } catch (error) {
      setRegisterLoading(false);
      console.log(error);
      const { data } = error.response;
      setRegisterError(data.message);
      setRegisterSuccess(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      submitCredentials(values);
    },
  });

  return (
    <>
      {redirectOnLogin && authContext.isUser() && (
        <Navigate to='/' replace={true} />
      )}

      <Grid className={register} container justify='center'>
        <Grid item xs={12} sm={8} md={6}>
          <Card className={register__card}>
            <CardContent>
              <Typography className='primary-textColor' variant='h5' paragraph>
                Sign Up
              </Typography>
              <Typography variant='body2' color='secondary'>
                {registerError}
              </Typography>
              <form onSubmit={formik.handleSubmit} className={form}>
                <TextField
                  label='Name'
                  placeholder='Name'
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
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
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                  label='Confirm Password'
                  placeholder='Confirm Password'
                  name='password2'
                  type='password'
                  value={formik.values.password2}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password2 && Boolean(formik.errors.password2)
                  }
                  helperText={
                    formik.touched.password2 && formik.errors.password2
                  }
                />
                <Typography variant='subtitle2'>
                  By creating an account, you accept ConnectSport{' '}
                  <Link to='/termsofservice'>Terms of Service</Link> and{' '}
                  <Link to='/privacypolicy'>Privacy Policy</Link>
                </Typography>
                <Button
                  className={
                    registerLoading
                      ? 'relative'
                      : 'relative primary-color marginT-1'
                  }
                  type='submit'
                  variant='contained'
                  disabled={registerLoading}
                >
                  Create Account
                  {registerLoading && (
                    <CircularProgress size={24} className={btn__progress} />
                  )}
                </Button>
              </form>
              <Typography variant='subtitle2' className={register__info}>
                Already have an account? <Link to='/login'>Sign In</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
