'use client';
import AuthWrapper from '@/components/AuthWrapper';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AuthWrapper>
      <div>
        <h1>Welcome to your dashboard, {user?.email}</h1>
        <p>Your user ID is: {user?.id}</p>
      </div>
    </AuthWrapper>
  );
}
