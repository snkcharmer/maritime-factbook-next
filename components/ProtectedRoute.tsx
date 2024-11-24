'use client';

import { useUser } from '@/app/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
};
