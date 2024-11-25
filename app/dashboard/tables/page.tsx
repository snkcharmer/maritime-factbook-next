import DynamicTable from '@/components/admin/tables/DynamicTable';
import FactbookTables from '@/components/admin/tables/FactbookTables';
import React from 'react';

const Tables = () => {
  return (
    <>
      <FactbookTables />
      <DynamicTable />
    </>
  );
};

export default Tables;
