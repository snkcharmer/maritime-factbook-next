'use client';

import { useState } from 'react';
import {
  Button,
  TextInput,
  Table,
  ActionIcon,
  Text,
  Select,
  Stack,
  SimpleGrid,
} from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { useFbTable, useUser } from '@/hooks';
import { CategoryEnum, ChartTypeEnum } from '@/context/enum';

export default function DynamicTableMaker() {
  const { createFbTable } = useFbTable();
  const { user } = useUser();

  const [headers, setHeaders] = useState<
    { label: string; subHeaders: string[] }[]
  >([{ label: 'Main Header 1', subHeaders: ['Sub Header 1'] }]);

  const [tableData, setTableData] = useState<string[][]>([['']]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryEnum | null>(
    null
  );
  const [selectedChartType, setSelectedChartType] =
    useState<ChartTypeEnum | null>(null);
  const [tableName, setTableName] = useState<string>('');
  const [tableSource, setTableSource] = useState<string>('');

  // Add a new main header
  const addMainHeader = () => {
    setHeaders((prev) => [...prev, { label: '', subHeaders: [''] }]);
    setTableData(
      (prev) => prev.map((row) => [...row, '']) // Add a new column for the new sub-header
    );
  };

  // Add a new sub-header under a specific main header
  const addSubHeader = (mainHeaderIndex: number, insertIndex?: number) => {
    setHeaders((prev) => {
      const updated = [...prev];
      const subHeaders = updated[mainHeaderIndex].subHeaders;

      // Insert a new subheader at the specified position or append it
      if (typeof insertIndex === 'number') {
        subHeaders.splice(insertIndex, 0, '');
      } else {
        subHeaders.push('');
      }
      return updated;
    });

    // Update the tableData to include a new column for the subheader
    setTableData((prev) => {
      const newTableData = [...prev];
      const columnStartIndex = headers
        .slice(0, mainHeaderIndex)
        .reduce((sum, header) => sum + header.subHeaders.length, 0);

      const insertColumnIndex =
        columnStartIndex +
        (typeof insertIndex === 'number'
          ? insertIndex
          : headers[mainHeaderIndex].subHeaders.length);

      return newTableData.map((row) => [
        ...row.slice(0, insertColumnIndex),
        '', // Add the new column
        ...row.slice(insertColumnIndex),
      ]);
    });
  };

  // Add a new row
  const addRow = () => {
    const totalColumns = headers.reduce(
      (sum, header) => sum + header.subHeaders.length,
      0
    );
    setTableData((prev) => [...prev, Array(totalColumns).fill('')]);
  };

  // Update main header
  const updateMainHeader = (index: number, value: string) => {
    setHeaders((prev) => {
      const updated = [...prev];
      updated[index].label = value;
      return updated;
    });
  };

  // Update sub-header
  const updateSubHeader = (
    mainHeaderIndex: number,
    subHeaderIndex: number,
    value: string
  ) => {
    setHeaders((prev) => {
      const updated = [...prev];
      updated[mainHeaderIndex].subHeaders[subHeaderIndex] = value;
      return updated;
    });
  };

  // Update cell value
  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[rowIndex][colIndex] = value;
      return updated;
    });
  };

  // Delete a main header
  const deleteMainHeader = (index: number) => {
    const columnCountToRemove = headers[index].subHeaders.length;
    const columnStartIndex = headers
      .slice(0, index)
      .reduce((sum, header) => sum + header.subHeaders.length, 0);

    setHeaders((prev) => prev.filter((_, idx) => idx !== index));
    setTableData((prev) =>
      prev.map((row) => [
        ...row.slice(0, columnStartIndex),
        ...row.slice(columnStartIndex + columnCountToRemove),
      ])
    );
  };

  // Delete a sub-header
  const deleteSubHeader = (mainHeaderIndex: number, subHeaderIndex: number) => {
    const columnStartIndex = headers
      .slice(0, mainHeaderIndex)
      .reduce((sum, header) => sum + header.subHeaders.length, 0);

    setHeaders((prev) => {
      const updated = [...prev];
      updated[mainHeaderIndex].subHeaders = updated[
        mainHeaderIndex
      ].subHeaders.filter((_, idx) => idx !== subHeaderIndex);
      return updated;
    });

    setTableData((prev) =>
      prev.map((row) => [
        ...row.slice(0, columnStartIndex + subHeaderIndex),
        ...row.slice(columnStartIndex + subHeaderIndex + 1),
      ])
    );
  };

  // Delete a row
  const deleteRow = (rowIndex: number) => {
    setTableData((prev) => prev.filter((_, idx) => idx !== rowIndex));
  };

  // Save the table
  const saveTable = async () => {
    const payload = { headers, rows: tableData };

    try {
      const res = await createFbTable({
        category: selectedCategory,
        userId: user?.id,
        name: tableName,
        source: tableSource,
        chartType: selectedChartType,
        data: payload,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Text size="lg" fw={500} mb="md">
        Dynamic Table Maker
      </Text>
      <Stack gap={10}>
        <TextInput
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Enter Table Name"
          label="Table Name"
        />
        <TextInput
          value={tableSource}
          onChange={(e) => setTableSource(e.target.value)}
          placeholder="Enter Table Source"
          label="Table Source"
        />
        <SimpleGrid cols={2}>
          <Select
            value={selectedCategory || ''}
            onChange={(value) => setSelectedCategory(value as CategoryEnum)}
            data={Object.values(CategoryEnum)}
            placeholder="Select Category"
            label="Category"
          />
          <Select
            value={selectedChartType || ''}
            onChange={(value) => setSelectedChartType(value as ChartTypeEnum)}
            data={Object.values(ChartTypeEnum)}
            placeholder="Select Chart Type"
            label="Chart Type"
          />
        </SimpleGrid>
      </Stack>

      <Table withTableBorder withColumnBorders mt="md">
        <thead>
          {/* Main Headers Row */}
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} colSpan={header.subHeaders.length || 1}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <TextInput
                    value={header.label}
                    onChange={(e) => updateMainHeader(idx, e.target.value)}
                    placeholder="Main Header"
                  />
                  <ActionIcon color="red" onClick={() => deleteMainHeader(idx)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </div>
              </th>
            ))}
            <th>
              <Button variant="light" size="xs" onClick={addMainHeader}>
                <IconPlus size={14} /> Add Main Header
              </Button>
            </th>
          </tr>
          {/* Sub-Headers Row */}
          <tr>
            {headers.map((header, mainIdx) =>
              header.subHeaders.map((subHeader, subIdx) => (
                <th key={`${mainIdx}-${subIdx}`}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <TextInput
                      value={subHeader}
                      onChange={(e) =>
                        updateSubHeader(mainIdx, subIdx, e.target.value)
                      }
                      placeholder="Sub-Header"
                    />
                    <ActionIcon
                      color="red"
                      onClick={() => deleteSubHeader(mainIdx, subIdx)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </div>
                </th>
              ))
            )}
            <th>
              <Button
                variant="light"
                size="xs"
                onClick={() => addSubHeader(headers.length - 1)}
              >
                <IconPlus size={14} /> Add Sub-Header
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td key={colIdx}>
                  <TextInput
                    value={cell}
                    onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                    placeholder="Cell"
                  />
                </td>
              ))}
              <td>
                <ActionIcon color="red" onClick={() => deleteRow(rowIdx)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={headers.length}>
              <Button variant="light" size="xs" onClick={addRow}>
                <IconPlus size={14} /> Add Row
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Button fullWidth mt="xl" onClick={saveTable}>
        Save Table
      </Button>
    </>
  );
}
