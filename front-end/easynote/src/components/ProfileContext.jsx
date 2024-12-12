import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData, 
    }));
  };

  return (
    <ProfileContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
