'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageContainer } from '@/components/reusable';
import { AdminDashboardContent } from '@/components/admin/dashboard/AdminDashboardContent';
import { ROUTES } from '@/constants';
import { IUser } from '@/types';
import { UserRoleEnum } from '@/context/enum';
import { DataProviderDashboardContent } from '@/components/data-provider/dashboard/DataProviderDashboardContent';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');

    if (!storedUser || !storedToken) {
      router.push(ROUTES.login);
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  return (
    <PageContainer>
      {user?.role === UserRoleEnum.ADMIN && <AdminDashboardContent />}
      {user?.role === UserRoleEnum.DATA_PROVIDER && (
        <DataProviderDashboardContent />
      )}
    </PageContainer>
  );
}
