'use client';
import DynamicChart from '@/components/admin/dashboard/resource-categories/DynamicChart';
import DynamicTable from '@/components/admin/dashboard/resource-categories/DynamicTable';
import { useFbTable } from '@/hooks';
import { Select, Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type TChartType = 'bar' | 'line' | 'pie';

const SubCategoryView = () => {
  const { slug } = useParams();
  const readableSlug = decodeURIComponent(String(slug));
  const [chartType, setChartType] = useState<TChartType>('bar');

  const { data, fetchFbTables } = useFbTable();

  const subCategoryData = data?.data.filter(
    ({ name }) => name === readableSlug
  );

  useEffect(() => {
    if (slug) fetchFbTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (!subCategoryData) return <>No data...</>;

  return (
    <Stack>
      <Stack gap={0}>
        <Text fw="bold">Resource Category:</Text>
        <Text>{subCategoryData[0].category}</Text>
      </Stack>
      <Stack gap={0}>
        <Text fw="bold">Table Name:</Text>
        <Text>{subCategoryData[0].name}</Text>
      </Stack>
      <Stack gap={0}>
        <Text fw="bold">Source:</Text>
        <Text>{subCategoryData[0].source}</Text>
      </Stack>
      <DynamicTable tableData={subCategoryData[0].data[0]} />;
      <Select
        label="Select Chart Type"
        value={chartType}
        onChange={(value) => setChartType(String(value) as TChartType)}
        data={[
          { value: 'bar', label: 'Bar Chart' },
          { value: 'line', label: 'Line Chart' },
          { value: 'pie', label: 'Pie Chart' },
        ]}
      />
      <DynamicChart
        chartType={chartType}
        tableData={subCategoryData[0].data[0]}
      />
    </Stack>
  );
};

export default SubCategoryView;
