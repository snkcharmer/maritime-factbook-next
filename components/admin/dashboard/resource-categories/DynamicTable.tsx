import React from 'react';
import { Table } from '@mantine/core';

interface IHeader {
  label: string;
  subHeaders: string[];
}

export interface ITableData {
  headers: IHeader[];
  rows: string[][];
}

interface DynamicTableProps {
  tableData: ITableData;
}

const DynamicTable = ({ tableData }: DynamicTableProps) => {
  const { headers, rows } = tableData;

  return (
    <Table
      striped
      highlightOnHover
      withTableBorder
      withColumnBorders
      withRowBorders
    >
      <Table.Thead>
        {/* Render main headers */}
        <Table.Tr>
          {headers.map((header, index) => (
            <th key={index} colSpan={header.subHeaders.length || 1}>
              {header.label}
            </th>
          ))}
        </Table.Tr>

        {/* Render subheaders */}
        <Table.Tr>
          {headers.map((header, index) =>
            header.subHeaders.length > 0 ? (
              header.subHeaders.map((subHeader, subIndex) => (
                <th key={`${index}-${subIndex}`}>{subHeader}</th>
              ))
            ) : (
              <th key={index}></th> // Empty subheader
            )
          )}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {/* Render rows */}
        {rows.map((row, rowIndex) => (
          <Table.Tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
            ))}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default DynamicTable;
