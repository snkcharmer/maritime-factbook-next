'use client';
import { DynamicTable } from '@/components/reusable';
import { ITableData } from '@/components/reusable/lib/DynamicTable';
import { useFbTable, useFbTableAssignee } from '@/hooks';
import { IFbTable, IFbTableAssignee } from '@/types';
import { Center, Group, Loader, Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TableViewer = () => {
  const { fbTableSlug } = useParams();
  // const [chartType, setChartType] = useState<TChartType>('bar');
  const { data, getFbTableBySlug, updateFbTable } = useFbTable<IFbTable>();
  const [tableData, setTableData] = useState<ITableData | null>(null);
  const [tableSyncing, setTableSyncing] = useState<boolean>(true);

  const { fetchFbTableAssigneeByFbTableId } =
    useFbTableAssignee<IFbTableAssignee[]>();

  const handleSyncTables = async () => {
    try {
      const assignedTables = await fetchFbTableAssigneeByFbTableId(
        data?.id || ''
      );
      if (!Array.isArray(assignedTables)) {
        console.error('Invalid assignedTables:', assignedTables);
        return;
      }

      const mergedTable: any[] = [];

      assignedTables.forEach((table) => {
        if (!Array.isArray(table.data)) return;

        const tableData = table.data[0];
        if (!tableData || !Array.isArray(tableData.rows)) return;

        tableData.rows.forEach((row, rowIndex) => {
          if (!Array.isArray(row)) return;

          mergedTable[rowIndex] = mergedTable[rowIndex] || [];

          row.forEach((cell, colIndex) => {
            if (colIndex === 0) {
              mergedTable[rowIndex][colIndex] = cell; // Copy non-numeric cells directly
              return;
            }

            const cellValue = Number(cell) || 0;
            const isSynced = row[colIndex + 1]?.isSynced || false;
            const lastSyncedValue = row[colIndex + 2]?.lastSyncedValue || 0;

            if (!mergedTable[rowIndex][colIndex]) {
              mergedTable[rowIndex][colIndex] = 0;
            }

            if (!isSynced) {
              const delta = cellValue - lastSyncedValue;
              mergedTable[rowIndex][colIndex] += delta;
            }
          });
        });

        tableData.rows.forEach((row) => {
          row.forEach((cell, colIndex) => {
            if (colIndex === 0) return;
            const cellValue = Number(cell) || 0;

            row[colIndex + 1] = { isSynced: true }; // Mark as synced
            row[colIndex + 2] = { lastSyncedValue: cellValue }; // Update last synced value
          });
        });
      });

      if (!data?.data?.[0]) {
        console.error('Invalid `data` structure:', data);
        return;
      }

      await updateFbTable(String(data?.id), {
        data: {
          headers: data?.data[0].headers,
          rows: mergedTable,
        },
      });

      setTableData({
        headers: data.data[0].headers,
        rows: mergedTable,
      });
      setTableSyncing(false);
      // Toastify({ message: 'Table successfully synced.', type: 'success' });
    } catch (error) {
      setTableSyncing(false);
      // Toastify({ message: JSON.stringify(error), type: 'error' });
      console.error('Error during sync:', error);
    }
  };

  useEffect(() => {
    if (fbTableSlug) {
      getFbTableBySlug(fbTableSlug as string);
      // setChartType(data?.chartType || 'bar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableSlug]);

  useEffect(() => {
    if (data && !tableData) {
      setTableData(data.data[0]);
      handleSyncTables();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Stack>
      <Stack gap={0}>
        <Text fw="bold">Resource Category:</Text>
        <Text>{data?.fbCategory?.name}</Text>
      </Stack>
      <Stack gap={0}>
        <Text fw="bold">Table Name:</Text>
        <Text>{data?.name}</Text>
      </Stack>
      <Stack gap={0}>
        <Text fw="bold">Source:</Text>
        <Text>{data?.source}</Text>
      </Stack>
      {tableData && !tableSyncing ? (
        <Stack>
          <DynamicTable tableData={tableData} />
          {/* <Select
            label="Select Chart Type"
            value={chartType}
            onChange={(value) => setChartType(value as TChartType)}
            // data={enumToDropdownOptions(ChartTypesEnum)}
            data={[
              { label: 'Bar', value: 'bar' },
              { label: 'Line', value: 'line' },
              { label: 'Pie', value: 'pie' },
            ]}
            defaultValue="bar"
          />
          <DynamicChart chartType={chartType || 'bar'} tableData={tableData} /> */}
        </Stack>
      ) : (
        <Center mt={120}>
          <Group>
            <Loader color="blue" type="dots" />
            Table Syncing ...
          </Group>
        </Center>
      )}
    </Stack>
  );
};

export default TableViewer;