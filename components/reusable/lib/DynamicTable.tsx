"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, TextInput } from "@mantine/core";

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
  isEdit?: boolean;
  onSave?: (updatedTableData: ITableData) => void;
}

const DynamicTable = ({
  tableData,
  isEdit = false,
  onSave,
}: DynamicTableProps) => {
  const [editableTableData, setEditableTableData] =
    useState<ITableData>(tableData);

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

  const handleSave = () => {
    if (onSave) {
      onSave(editableTableData);
    } else {
      console.log("Saved table data:", editableTableData);
    }
  };

  useEffect(() => {
    setEditableTableData(tableData);
  }, [tableData]);

  return (
    <div className="table-container">
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        withRowBorders
        className="responsive-table"
      >
        <Table.Thead>
          {/* Main Header */}
          <Table.Tr>
            {editableTableData?.headers.map(
              (header, index) =>
                header.subHeaders.length && (
                  <th key={index} colSpan={header.subHeaders.length || 1}>
                    {header.label}
                  </th>
                )
            )}
          </Table.Tr>
          {/* Render subheaders */}
          <Table.Tr>
            {editableTableData?.headers?.map((header, index) =>
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
          {editableTableData?.rows?.map((row, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={`${rowIndex}-${cellIndex}`}>
                  {isEdit && cellIndex > 0 ? (
                    <TextInput
                      type="number"
                      value={cell}
                      onChange={(e) =>
                        handleCellChange(rowIndex, cellIndex, e.target.value)
                      }
                      min={0}
                    />
                  ) : (
                    cell
                  )}
                </td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {isEdit && (
        <Button onClick={handleSave} style={{ marginTop: "10px" }}>
          Save Table
        </Button>
      )}
    </div>
  );
};

export default DynamicTable;
