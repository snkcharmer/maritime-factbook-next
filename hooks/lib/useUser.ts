'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';
import { handleRequest } from '@/utils/handleRequest';

export const useUser = <T>() => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const fetchAllUsers = async () => {
    return handleRequest<IUser[]>(`/api/user`, setLoading, setError, setData);
  };

  const createUser = async (userData: Partial<IUser>) => {
    return handleRequest<IUser>(`/api/user`, setLoading, setError, setData, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  return {
    user,
    loading,
    error,
    data,
    isLoggedIn: !!user,
    logout,
    fetchAllUsers,
    createUser,
  };
};
