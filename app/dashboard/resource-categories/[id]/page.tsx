'use client';
import { FakeSkeleton, PageContainer } from '@/components/reusable';
import { useFbCategory } from '@/hooks';
import { IFbCategory } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Text } from '@mantine/core';
import SubCategoriesTable from '@/components/admin/dashboard/resource-categories/SubCategoriesTable';

export default function CategoryPage() {
  const { id } = useParams();
  const { data, getFbCategoryById, loading } = useFbCategory<IFbCategory>();

  useEffect(() => {
    if (id) {
      getFbCategoryById(String(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <PageContainer title="Resource Category">
      {loading ? (
        <FakeSkeleton rows={1} height={30} />
      ) : (
        <Text>{data?.name}</Text>
      )}
      <SubCategoriesTable
        categoryName={data?.name || ''}
        categoryId={String(id)}
      />
    </PageContainer>
  );
}
