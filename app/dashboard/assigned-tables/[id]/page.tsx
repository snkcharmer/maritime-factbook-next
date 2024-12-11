'use client';
import { DynamicTable, Toastify } from '@/components/reusable';
import { useFbTable, useFbTableAssignee } from '@/hooks';
import { IFbTable, IFbTableAssignee } from '@/types';
import { Stack, Text } from '@mantine/core';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const AssignedTableView = () => {
  const { id } = useParams();
  const {
    getFbTableAssigneeById,
    data: fbTableAssignee,
    updateFbTableAssignee,
  } = useFbTableAssignee<IFbTableAssignee>();
  const { getFbTableById, data: fbTable } = useFbTable<IFbTable>();

  const handleSave = async (data) => {
    try {
      await Promise.all([
        updateFbTableAssignee(id as string, data),
        getFbTableAssigneeById(id as string),
      ]);
      Toastify({ message: 'Form submitted successfully.', type: 'success' });
    } catch (error) {
      Toastify({ message: JSON.stringify(error), type: 'error' });
    }
  };

  useEffect(() => {
    if (id) getFbTableAssigneeById(id as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (fbTableAssignee) {
      getFbTableById(String(fbTableAssignee.fbTable?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableAssignee]);

  return (
    <Stack>
      <Stack gap={0}>
        <Text fw="bold">Resource Category:</Text>
        <Text>{fbTable?.fbCategory?.name}</Text>
      </Stack>
      <Stack gap={0}>
        <Text fw="bold">Table Name:</Text>
        <Text>{fbTable?.name}</Text>
      </Stack>
      <Stack gap={0}>
        <Text fw="bold">Source:</Text>
        <Text>{fbTable?.source}</Text>
      </Stack>
      {fbTableAssignee && (
        <DynamicTable
          tableData={fbTableAssignee.data[0]}
          isEdit={true}
          onSave={handleSave}
        />
      )}
    </Stack>
  );
};

export default AssignedTableView;
