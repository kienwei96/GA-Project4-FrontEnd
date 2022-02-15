import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  // console.log('authstate token:', authContext.authState.token);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  }); //use publicFetch

  // use HTTP interceptors that come with axios
  // then set up config callback which going to allow us to work with headers
  authAxios.interceptors.request.use(
    (config) => {
      //The JSON Web Token is on AuthContext in AuthState. Before we call for the token itself, we need to put in this scheme called bearer. This is because the tools that we are going to use on the API expect this scheme to be in place.
      config.headers.Authorization = `Bearer ${authContext.authState.token}`;
      // console.log('config token:', authContext.authState.token);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log('error code', code);
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
