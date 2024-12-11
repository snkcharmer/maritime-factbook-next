'use client';

import { useEffect, useState } from 'react';
import {
  Button,
  TextInput,
  Table,
  ActionIcon,
  Select,
  Stack,
  SimpleGrid,
  Space,
  Title,
  Group,
  Drawer,
} from '@mantine/core';
import { IconTrash, IconPlus, IconLink } from '@tabler/icons-react';
import { useFbCategory, useFbTable, useUser } from '@/hooks';
import { ChartTypesEnum } from '@/context/enum';
import { IFbSubCategoryByCategoryResponse, TFbTableResponse } from '@/types';
import { useDisclosure } from '@mantine/hooks';
import { FakeSkeleton, Toastify } from '@/components/reusable';
import { createPath } from '@/utils/route';
import { ADMIN_ROUTES } from '@/constants';
import { TChartType } from '../dashboard/resource-categories/DynamicChart';

export default function DynamicTableMaker() {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: categories,
    fetchFbCategories,
    loading: fetchingCategories,
  } = useFbCategory<IFbSubCategoryByCategoryResponse>();
  const {
    data: fbTables,
    fetchFbTables,
    loading: fetchingFbTables,
  } = useFbTable<TFbTableResponse>();
  const { createFbTable } = useFbTable();
  const { user } = useUser();

  const [headers, setHeaders] = useState<
    { label: string; subHeaders: string[] }[]
  >([{ label: 'Main Header 1', subHeaders: ['Sub Header 1'] }]);

  const [tableData, setTableData] = useState<string[][]>([['']]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  //   const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
  //     null
  //   );
  const [selectedChartType, setSelectedChartType] = useState<TChartType | null>(
    null
  );
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

  const resetForm = () => {
    setHeaders([{ label: 'Main Header 1', subHeaders: ['Sub Header 1'] }]);
    setTableData([['']]);
    setSelectedCategory(null);
    setTableName('');
    setSelectedChartType(null);
    setTableSource('');
  };

  // Save the table
  const saveTable = async () => {
    const payload = { headers, rows: tableData };
    try {
      const res = await createFbTable({
        fbCategoryId: selectedCategory || '',
        userId: user?.id,
        name: tableName,
        source: tableSource,
        chartType: selectedChartType,
        data: payload,
      });
      if (!res) {
        Toastify({ message: res || '', type: 'warning' });
        return;
      }
      resetForm();
      Toastify({ message: 'Table successfully saved.', type: 'success' });
      console.log(res);
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack gap={10}>
        <SimpleGrid cols={2}>
          <Select
            value={selectedCategory || ''}
            onChange={(val) => {
              setSelectedCategory(val);
            }}
            data={
              categories?.data.map(({ name, id }) => ({
                label: name,
                value: String(id),
              })) || []
            }
            placeholder="Select Category"
            label="Category"
            disabled={fetchingCategories}
          />

          <TextInput
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Enter Table Name"
            label="Table Name"
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <Select
            value={selectedChartType || ''}
            onChange={(value) => setSelectedChartType(value as TChartType)}
            data={Object.values(ChartTypesEnum)}
            placeholder="Select Chart Type"
            label="Chart Type"
          />
          <TextInput
            value={tableSource}
            onChange={(e) => setTableSource(e.target.value)}
            placeholder="Enter Table Source"
            label="Table Source"
          />
        </SimpleGrid>
      </Stack>
      <Space h={40} />
      <Group justify="space-between">
        <Title order={4}>Table Preview</Title>
        <Button
          size="xs"
          onClick={() => {
            open();
            fetchFbTables();
          }}
        >
          Recently Added
        </Button>
      </Group>
      <Drawer
        opened={opened}
        onClose={close}
        title="Added tables"
        position="right"
      >
        <Stack>
          {fetchingFbTables ? (
            <FakeSkeleton rows={5} />
          ) : (
            fbTables?.data.map((val, idx) => {
              return (
                <Button
                  component="a"
                  href={createPath({
                    path: ADMIN_ROUTES.resourceCategoriesTable,
                    dynamicParams: {
                      fbCategorySlug: String(val.fbCategory?.slug),
                      fbTableSlug: val.slug,
                    },
                  })}
                  variant="default"
                  leftSection={<IconLink size={16} />}
                  key={idx}
                  className="truncate max-w-auto text-xs"
                >
                  {val.name}
                </Button>
              );
            })
          )}
        </Stack>
      </Drawer>
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
