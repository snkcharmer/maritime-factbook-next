'use client';

import { IAuthResponse } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorResponse = await res.json().catch(() => ({
          error: 'Something went wrong',
        }));
        const errorMessage = errorResponse.error || 'Login failed';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const data: IAuthResponse = await res.json();

      localStorage.setItem('authToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      router.push('/dashboard');
      return { success: true, data };
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
    error,
  };
};
