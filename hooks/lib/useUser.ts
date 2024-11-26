'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  return { user, loading, isLoggedIn: !!user, logout };
};
