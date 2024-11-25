'use client';

import { useState } from 'react';
import { Button, TextInput, Table, ActionIcon, Text } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { useFbTable } from '@/hooks';

export default function DynamicTableMaker() {
  const { createFbTable } = useFbTable();
  const [headers, setHeaders] = useState<
    { label: string; subHeaders: string[] }[]
  >([{ label: 'Main Header 1', subHeaders: ['Sub Header 1'] }]);
  const [tableData, setTableData] = useState<string[][]>([['']]);

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

  console.log('testtest', headers);

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

  const saveTable = async () => {
    const payload = { headers: headers, rows: tableData };

    try {
      const res = await createFbTable({
        userId: '67421e3179165160fe9dd7d1',
        name: 'Test',
        source: 'Isan Local',
        chartType: 'bar',
        data: payload,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // const response = await fetch("/api/save-table", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
    // if (response.ok) {
    //   alert("Table saved successfully!");
    // } else {
    //   alert("Failed to save table.");
    // }
  };

  return (
    // <Paper shadow="sm" radius="md" p="lg">
    <>
      <Text size="lg" fw={500} mb="md">
        Dynamic Table Maker
      </Text>

      {/* Table Editing Form */}
      <Table withTableBorder withColumnBorders>
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
            <td
              colSpan={
                headers.reduce(
                  (sum, header) => sum + header.subHeaders.length,
                  0
                ) + 1
              }
            >
              <Button variant="light" size="xs" fullWidth onClick={addRow}>
                <IconPlus size={14} /> Add Row
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Text size="lg" fw={500} mt="lg" mb="sm">
        Live Preview of Your Table
      </Text>

      {/* Table Preview */}
      <Table striped border={2} borderColor="black">
        <thead>
          {/* Main Headers */}
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} colSpan={header.subHeaders.length || 1}>
                {header.label || ''}
              </th>
            ))}
          </tr>
          {/* Sub-Headers */}
          <tr>
            {headers.map((header) =>
              header.subHeaders.map((subHeader, idx) => (
                <th key={idx}>{subHeader || ''}</th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} align={cellIdx > 0 ? 'center' : 'left'}>
                  {cell || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Button mt="lg" fullWidth variant="filled" onClick={saveTable}>
        Save Table
      </Button>
    </>
    // </Paper>
  );
}
