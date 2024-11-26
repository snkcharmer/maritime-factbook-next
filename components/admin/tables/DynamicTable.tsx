'use client';
import { useFbTable } from '@/hooks';
import { Table } from '@mantine/core';
import { useEffect } from 'react';

const DynamicTable = () => {
  const { loading, data, fetchFbTables } = useFbTable();

  const handleFetch = async () => {
    const result = await fetchFbTables();
    if (result.success) {
      console.log('Fetched fbTables:', result.data);
    } else {
      console.error('Error fetching fbTables:', result.error);
    }
  };

  // const tableData = {
  //   headers: [
  //     {
  //       label: 'Main Header 1',
  //       subHeaders: ['Sub Header 1'],
  //     },
  //     {
  //       label: 'Header 2',
  //       subHeaders: ['Sub Header 2', 'Sub Header 3', 'Sub Header 4'],
  //     },
  //   ],
  //   rows: [
  //     ['Leyte', '1', '2', '3'],
  //     ['Samar', '4', '5', '6'],
  //   ],
  // };

  // const generateHeaders = () => {
  //   const mainHeaders = tableData.headers.map((header) => (
  //     <th key={header.label} colSpan={header.subHeaders.length}>
  //       {header.label}
  //     </th>
  //   ));

  //   const subHeaders = tableData.headers.flatMap((header) =>
  //     header.subHeaders.map((sub, index) => (
  //       <th key={`${header.label}-sub-${index}`}>{sub}</th>
  //     ))
  //   );

  //   return { mainHeaders, subHeaders };
  // };

  const generateRows = () => {
    return data?.data.tables.map((row, rowIndex) => (
      <tr key={`row-${rowIndex}`}>
        <td>{row.user?.name}</td>
        <td>{row.name}</td>
      </tr>
    ));
  };

  // const { mainHeaders, subHeaders } = generateHeaders();

  useEffect(() => {
    if (!loading) {
      handleFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('testtestData', data?.data.tables);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dynamic Table</h1>
      <Table>
        <thead>
          <tr>User</tr>
          <tr>Table Name</tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </Table>
    </div>
  );
};

export default DynamicTable;
