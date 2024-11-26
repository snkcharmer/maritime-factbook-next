'use client';

import { useEffect, useState } from 'react';
import { Container, Text, Loader } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';

export default function Dashboard() {
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
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
      fugiat quisquam itaque nesciunt tempore consequuntur corporis nisi?
      Obcaecati expedita rerum nam ut enim odit, iure earum sed voluptatum,
      tenetur veniam?
    </>
  );
}
