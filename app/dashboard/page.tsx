'use client';

import { useEffect, useState } from 'react';
import { Container, Text, Loader, Paper, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks';
import { nprogress } from '@mantine/nprogress';
import { IUser } from '@/app/types';

export default function Dashboard() {
  const { logout } = useUser();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (!storedUser || !storedToken) {
      router.push('/login');
      return;
    }

    setUserData(JSON.parse(storedUser));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <Container size="lg" py={40}>
        <Loader />
      </Container>
    );
  }

  if (!userData) {
    return <Text>User data not found</Text>;
  }

  return (
    <Container size="lg" py={40}>
      <Paper shadow="sm">
        <Text size="xl">Welcome, {userData.name}!</Text>
        {/* Render other user information here */}
        <Text>Email: {userData.email}</Text>
        <Text>Role: {userData.role}</Text>
        <Button onClick={() => logout()}>Logout</Button>
        <Button onClick={() => nprogress.start()}>Start</Button>
      </Paper>
    </Container>
  );
}
