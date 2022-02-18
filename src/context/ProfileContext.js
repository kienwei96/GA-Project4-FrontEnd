import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileContext = createContext();
const { Provider } = ProfileContext;

const ProfileProvider = ({ children }) => {
  const [profileState, setProfileState] = useState('');

  console.log('this is profilecontext', profileState);

  const setProfileInfo = (data) => {
    setProfileState(data);
  };

  return (
    <Provider
      value={{
        profileState,
        setProfileState: (data) => setProfileInfo(data),
      }}
    >
      {children}
    </Provider>
  );
};

export { ProfileContext, ProfileProvider };
