'use client';
import AssigneesDrawer from '@/components/admin/dashboard/resource-categories/AssigneesDrawer';
import AssignTableModal from '@/components/admin/dashboard/resource-categories/AssignTableModal';
// import DynamicChart from '@/components/admin/dashboard/resource-categories/DynamicChart';
import DynamicTable from '@/components/admin/dashboard/resource-categories/DynamicTable';
import { ChartTypesEnum } from '@/context/enum';
import { useFbTable, useUser } from '@/hooks';
import { IFbTable, TUserResponse } from '@/types';
import { enumToDropdownOptions } from '@/utils/transform';
import { ActionIcon, Button, Group, Select, Stack, Text } from '@mantine/core';
import {
  IconDownload,
  IconUserPlus,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SubCategoryView = () => {
  const { fetchAllUsers, data: users, user } = useUser<TUserResponse>();
  const { fbTableSlug } = useParams();
  const [chartType, setChartType] = useState<ChartTypesEnum | null>(null);
  const [openedAssignUser, setOpenedAssignUser] = useState<boolean>(false);
  const [openedAssignees, setOpenedAssignees] = useState<boolean>(false);

  const filteredUser = users?.data.filter(({ id }) => id !== user?.id);

  const handleCloseAssignUser = () => setOpenedAssignUser(false);
  const handleCloseAssignees = () => setOpenedAssignees(false);

  const { data, getFbTableBySlug } = useFbTable<IFbTable>();

  useEffect(() => {
    if (fbTableSlug) {
      getFbTableBySlug(fbTableSlug as string);
      setChartType(data?.chartType || null);
      fetchAllUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableSlug]);

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
        <ActionIcon color="green" variant="filled" aria-label="Settings">
          <IconDownload style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>
      {data && <DynamicTable tableData={data.data[0]} />}
      <Select
        label="Select Chart Type"
        value={chartType}
        onChange={(value) => setChartType(value as ChartTypesEnum)}
        data={enumToDropdownOptions(ChartTypesEnum)}
      />
      {/* <DynamicChart
        chartType={chartType}
        tableData={subCategoryData[0].data[0]}
      /> */}
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

export default SubCategoryView;
