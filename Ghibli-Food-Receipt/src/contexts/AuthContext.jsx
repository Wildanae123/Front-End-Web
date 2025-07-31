// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../utils/api-service';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api
      .getMe()
      .then((userData) => {
        setUser(userData.data);
      })
      .catch((error) => {
        setUser(null);
        if (error.status === 401 || error.status === 403) {
        } else {
          console.error(
            'AuthContext: Error fetching user on initial load:',
            error.message,
            'Status:',
            error.status,
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      await api.loginUser(credentials);
      const userData = await api.getMe();
      setUser(userData.data);
      setIsLoading(false);
      return true;
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      throw error;
    }
  };

  const guestLogin = async () => {
    setIsLoading(true);
    try {
      await api.guestLoginUser();
      const userData = await api.getMe();
      setUser(userData.data);
      setIsLoading(false);
      return true;
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (userDataInput) => {
    setIsLoading(true);
    try {
      await api.registerUser(userDataInput);
      const userData = await api.getMe();
      setUser(userData.data);
      setIsLoading(false);
      return true;
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logoutUser();
    } catch (error) {
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    guestLogin,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
