'use client';
import { DynamicTable, FakeSkeleton } from '@/components/reusable';
import { useFbCategory, useFbTable } from '@/hooks';
import { IFbCategory, IFbTable } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Accordion, Stack, Title, Text } from '@mantine/core';
import DynamicChart from '@/components/admin/dashboard/resource-categories/DynamicChart';

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
      <Stack>
        {fbTables?.map((row, i) => {
          return (
            <Accordion key={i} m={0}>
              <Accordion.Item value={`${i}`}>
                <Accordion.Control>{row.name}</Accordion.Control>
                <Accordion.Panel>
                  <Stack gap={0}>
                    <Text fw="bold">Source:</Text>
                    <Text>{row.source}</Text>
                    {row.data[0].rows.length ? (
                      <DynamicChart tableData={row.data[0]} />
                    ) : (
                      ''
                    )}
                    {row.data.length && (
                      <DynamicTable tableData={row.data[0]} />
                    )}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </Stack>
      {/* <ResourcesTable data={fbTables || []} /> */}
    </>
  );
}
