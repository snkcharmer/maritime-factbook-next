'use client';
import AssigneesDrawer from '@/components/admin/dashboard/resource-categories/AssigneesDrawer';
import AssignTableModal from '@/components/admin/dashboard/resource-categories/AssignTableModal';
import DynamicChart, {
  TChartType,
} from '@/components/admin/dashboard/resource-categories/DynamicChart';
import { DynamicTable, Toastify } from '@/components/reusable';
import { ITableData } from '@/components/reusable/lib/DynamicTable';
import { useFbTable, useFbTableAssignee, useUser } from '@/hooks';
import { IFbTable, IFbTableAssignee, TUserResponse } from '@/types';
import { ActionIcon, Button, Group, Select, Stack, Text } from '@mantine/core';
import { IconRefresh, IconUserPlus, IconUsersGroup } from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TableViewer = () => {
  const { fetchAllUsers, data: users, user } = useUser<TUserResponse>();
  const { fbTableSlug } = useParams();
  const [chartType, setChartType] = useState<TChartType>('bar');
  const [openedAssignUser, setOpenedAssignUser] = useState<boolean>(false);
  const [openedAssignees, setOpenedAssignees] = useState<boolean>(false);
  const { data, getFbTableBySlug, updateFbTable } = useFbTable<IFbTable>();
  const [tableData, setTableData] = useState<ITableData | null>(null);

  const filteredUser = users?.data.filter(({ id }) => id !== user?.id);

  const handleCloseAssignUser = () => setOpenedAssignUser(false);
  const handleCloseAssignees = () => setOpenedAssignees(false);

  const { fetchFbTableAssigneeByFbTableId } =
    useFbTableAssignee<IFbTableAssignee[]>();

  const handleSyncTables = async () => {
    try {
      // Fetch tables assigned to the specific fbTableId
      const assignedTables = await fetchFbTableAssigneeByFbTableId(
        data?.id || ''
      );
      console.log('Assigned Tables:', assignedTables);

      if (!Array.isArray(assignedTables)) {
        console.error(
          'Invalid data structure for assigned tables:',
          assignedTables
        );
        return;
      }

      // Initialize an array to hold merged rows
      const mergedTable: any[] = [];

      // Iterate over each assigned table to merge data
      assignedTables.forEach((table) => {
        if (!Array.isArray(table.data)) {
          console.warn('Table data is not an array:', table.data);
          return;
        }

        // Extract the first element of the data array
        const tableData = table.data[0];
        if (!tableData || !Array.isArray(tableData.rows)) {
          console.warn('Table rows are missing or invalid:', tableData);
          return;
        }

        // Merge and sum numeric cells in rows
        tableData.rows.forEach((row, rowIndex) => {
          // Ensure the row is an array
          if (!Array.isArray(row)) {
            console.warn(`Row at index ${rowIndex} is not an array:`, row);
            return;
          }

          // Initialize or merge row data in the mergedTable
          mergedTable[rowIndex] = mergedTable[rowIndex] || [];
          row.forEach((cell, colIndex) => {
            // Skip the first column (colIndex 0) or non-numeric cells
            if (colIndex === 0 || isNaN(Number(cell))) {
              mergedTable[rowIndex][colIndex] = cell; // Keep non-numeric cell as-is
              return;
            }

            // Sum up numeric cells
            mergedTable[rowIndex][colIndex] =
              (mergedTable[rowIndex][colIndex] || 0) + Number(cell);
          });
        });
      });

      if (!data?.data?.[0]) {
        console.error('Invalid `data` structure:', data);
        return;
      }

      // Log the merged table result
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

      Toastify({ message: 'Table successfully merged.', type: 'success' });
    } catch (error) {
      Toastify({ message: JSON.stringify(error), type: 'error' });
      console.error('Error during sync:', error);
    }
  };

  useEffect(() => {
    if (fbTableSlug) {
      getFbTableBySlug(fbTableSlug as string);
      setChartType(data?.chartType || 'bar');
      fetchAllUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableSlug]);

  useEffect(() => {
    if (data && !tableData) setTableData(data.data[0]);
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
      <Group justify="space-between">
        <Group>
          <Button
            onClick={() => setOpenedAssignUser(true)}
            size="xs"
            leftSection={<IconUserPlus size={18} />}
          >
            Assign Table
          </Button>
          <Button
            onClick={() => setOpenedAssignees(true)}
            variant="outline"
            size="xs"
            leftSection={<IconUsersGroup size={18} />}
          >
            Assignees
          </Button>
        </Group>
        <ActionIcon
          color="green"
          variant="filled"
          aria-label="Sync Tables"
          onClick={handleSyncTables}
        >
          <IconRefresh style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>
      {tableData && <DynamicTable tableData={tableData} />}
      <Select
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
      {tableData && (
        <DynamicChart chartType={chartType || 'bar'} tableData={tableData} />
      )}
      <AssignTableModal
        opened={openedAssignUser}
        onClose={handleCloseAssignUser}
        fbTableId={data?.id || ''}
        users={filteredUser || []}
      />
      <AssigneesDrawer
        opened={openedAssignees}
        onClose={handleCloseAssignees}
        fbTableId={data?.id || ''}
      />
    </Stack>
  );
};

export default TableViewer;
