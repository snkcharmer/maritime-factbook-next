'use client';
import { FakeSkeleton } from '@/components/reusable';
import { useFbCategory, useFbTable } from '@/hooks';
import { IFbCategory, IFbTable } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Title } from '@mantine/core';
import ResourcesTable from '@/components/resource-category/ResourcesTable';

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
    <>
      {loading ? (
        <FakeSkeleton rows={1} height={30} />
      ) : (
        <Title size="h1">{fbCategory?.name}</Title>
      )}
      <ResourcesTable data={fbTables || []} />
    </>
  );
}
