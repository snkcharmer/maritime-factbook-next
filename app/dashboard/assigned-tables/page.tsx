'use client';
import Table from '@/components/data-provider/dashboard/assigned-tables/AssignedTables';
import { useFbTableAssignee, useUser } from '@/hooks';
import { IFbTableAssignee } from '@/types';
import React, { useEffect } from 'react';

const AssignedTables = () => {
  const { user } = useUser();
  const { fetchFbTableAssigneeByUserId, data = [] } =
    useFbTableAssignee<IFbTableAssignee[]>();

  useEffect(() => {
    if (user) fetchFbTableAssigneeByUserId(String(user.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <Table data={data as IFbTableAssignee[]} />;
};

export default AssignedTables;
