'use client';

import { useUser } from '@/hooks';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isLoggedIn, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, loading, router]);

  if (loading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
};
