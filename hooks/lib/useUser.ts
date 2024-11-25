'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsedData = JSON.parse(userData);
      setUser({ ...parsedData, id: parsedData._id });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return { user, loading, isLoggedIn: !!user, logout };
};
