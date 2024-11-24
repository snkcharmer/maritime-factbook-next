'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  clearTokens,
  getAccessToken,
  setTokens,
} from '../auth/utils/localStorage';
import { IUser } from '@/app/types';

interface AuthContextProps {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: IUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
      // Optionally fetch user info or validate token here
    }
  }, []);

  const login = (user: IUser, accessToken: string, refreshToken: string) => {
    setUser(user);
    setAccessToken(accessToken);
    setTokens(accessToken, refreshToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    clearTokens();
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
