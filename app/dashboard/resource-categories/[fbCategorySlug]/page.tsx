'use client';
import { FakeSkeleton, PageContainer } from '@/components/reusable';
import { useFbCategory, useFbTable } from '@/hooks';
import { IFbCategory, IFbTable } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Text } from '@mantine/core';
import ResourcesTable from '@/components/admin/dashboard/resource-categories/ResourcesTable';

export default function CategoryPage() {
  const { fbCategorySlug } = useParams();
  const {
    data: fbCategory,
    loading,
    getFbCategoryBySlug,
  } = useFbCategory<IFbCategory>();
  const { data: fbTables, getFbTableByFbCategoryId } = useFbTable<IFbTable[]>();

  useEffect(() => {
    if (fbCategorySlug) {
      getFbCategoryBySlug(fbCategorySlug as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbCategorySlug]);

  useEffect(() => {
    if (fbCategory) {
      getFbTableByFbCategoryId(String(fbCategory.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbCategory]);

  return (
    <PageContainer title="Resource Category">
      {loading ? (
        <FakeSkeleton rows={1} height={30} />
      ) : (
        <Text>{fbCategory?.name}</Text>
      )}
      <ResourcesTable data={fbTables || []} />
    </PageContainer>
  );
}
