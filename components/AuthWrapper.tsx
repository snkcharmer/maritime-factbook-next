'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
    }
  }, [token, router]);

  return <>{token ? children : null}</>;
};

export default AuthWrapper;
