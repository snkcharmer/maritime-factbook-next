'use client';
import React, { useEffect, useState } from 'react';
import { Table, Button } from '@mantine/core';

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
  isEdit?: boolean; // Prop to enable/disable edit mode
  onSave?: (updatedTableData: ITableData) => void; // Callback to save updated data
}

const DynamicTable = ({
  tableData,
  isEdit = false,
  onSave,
}: DynamicTableProps) => {
  const [editableTableData, setEditableTableData] =
    useState<ITableData>(tableData);

  // Handle cell change
  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    const updatedRows = [...editableTableData.rows];
    updatedRows[rowIndex][cellIndex] = value;

    setEditableTableData({
      ...editableTableData,
      rows: updatedRows,
    });
  };

  // Handle save
  const handleSave = () => {
    if (onSave) {
      onSave(editableTableData); // Trigger the save callback
    } else {
      console.log('Saved table data:', editableTableData); // Log the saved data
    }
  };

  useEffect(() => {
    setEditableTableData(tableData);
  }, [tableData]);

  return (
    <div>
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
            {editableTableData.headers.map((header, index) => (
              <th key={index} colSpan={header.subHeaders.length || 1}>
                {header.label}
              </th>
            ))}
          </Table.Tr>

          {/* Render subheaders */}
          <Table.Tr>
            {editableTableData.headers.map((header, index) =>
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
          {editableTableData.rows.map((row, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>
                  {isEdit ? (
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, cellIndex, e.target.value)
                      }
                      style={{
                        border: 'none',
                        width: '100%',
                        background: 'transparent',
                        outline: 'none',
                      }}
                    />
                  ) : (
                    cell // Display plain text when not in edit mode
                  )}
                </td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {/* Save Button */}
      {isEdit && (
        <Button onClick={handleSave} style={{ marginTop: '10px' }}>
          Save Table
        </Button>
      )}
    </div>
  );
};

export default DynamicTable;
