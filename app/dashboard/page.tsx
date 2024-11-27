'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/reusable';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (!storedUser || !storedToken) {
      router.push('/login');
      return;
    }

    // setUserData(JSON.parse(storedUser));
    // setLoading(false);
  }, [router]);

  // if (loading) {
  //   return (
  //     <Container size="lg" py={40}>
  //       <Loader />
  //     </Container>
  //   );
  // }

  // if (!userData) {
  //   return <Text>User data not found</Text>;
  // }

  return <PageContainer title="Dashboard">test</PageContainer>;
}
