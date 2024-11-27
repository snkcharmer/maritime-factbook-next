'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/reusable';
import { DashboardContent } from '@/components/admin/dashboard/DashboardContent';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (!storedUser || !storedToken) {
      router.push('/login');
      return;
    }
  }, [router]);

  return (
    <PageContainer>
      <DashboardContent />
    </PageContainer>
  );
}
