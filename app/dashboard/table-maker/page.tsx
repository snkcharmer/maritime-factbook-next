import { DynamicTableMaker } from '@/components/admin/table-maker';
import { PageContainer } from '@/components/reusable';
import React from 'react';

const TableMaker = () => {
  return (
    <PageContainer title="Table Maker">
      <DynamicTableMaker />
    </PageContainer>
  );
};

export default TableMaker;
