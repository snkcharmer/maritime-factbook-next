'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
      fugiat quisquam itaque nesciunt tempore consequuntur corporis nisi?
      Obcaecati expedita rerum nam ut enim odit, iure earum sed voluptatum,
      tenetur veniam?
    </>
  );
}
