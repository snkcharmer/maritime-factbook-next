'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TextInput,
  Button,
  ActionIcon,
  Stack,
  Title,
  Group,
} from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';

interface Header {
  label: string;
  subHeaders: string[];
}

interface IUpsertTableMakerProps {
  data?: any;
  onSave: any;
}

const UpsertTableMaker = ({ data, onSave }: IUpsertTableMakerProps) => {
  const [headers, setHeaders] = useState<Header[]>([
    { label: 'Main Header 1', subHeaders: ['Sub Header 1'] },
  ]);
  const [tableData, setTableData] = useState<string[][]>([]);
  const [submittingTable, setSubmittingTable] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setHeaders(data.headers);
      setTableData(data.rows);
    }
  }, [data]);

  const addMainHeader = () => {
    setHeaders((prev) => [...prev, { label: '', subHeaders: [''] }]);
    setTableData((prev) => prev.map((row) => [...row, '']));
  };

  const addSubHeader = (mainHeaderIndex: number) => {
    setHeaders((prev) => {
      const updated = [...prev];
      updated[mainHeaderIndex].subHeaders.push(''); // Add a new sub-header
      return updated;
    });

    setTableData((prev) => {
      const columnStartIndex = headers
        .slice(0, mainHeaderIndex + 1)
        .reduce((sum, header, idx) => {
          return idx < mainHeaderIndex
            ? sum + header.subHeaders.length
            : sum + header.subHeaders.length - 1;
        }, 0);

      return prev.map((row) => [
        ...row.slice(0, columnStartIndex),
        '',
        ...row.slice(columnStartIndex),
      ]);
    });
  };

  const addCell = (targetRow: number) => {
    setTableData((prev) =>
      prev.map((row, rowIndex) => (rowIndex === targetRow ? [...row, ''] : row))
    );
  };

  const addRow = () => {
    const totalColumns = headers.reduce(
      (sum, header) => sum + header.subHeaders.length,
      0
    );
    setTableData((prev) => [...prev, Array(totalColumns).fill('')]);
  };

  const updateMainHeader = (index: number, value: string) => {
    setHeaders((prev) => {
      const updated = [...prev];
      updated[index].label = value;
      return updated;
    });
  };

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

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    setTableData((prev) => {
      const updated = [...prev];
      updated[rowIndex][colIndex] = value;
      return updated;
    });
  };

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

  const deleteRow = (rowIndex: number) => {
    setTableData((prev) => prev.filter((_, idx) => idx !== rowIndex));
  };

  const handleSave = async () => {
    setSubmittingTable(true);
    await onSave({ headers, rows: tableData });
    //     setHeaders([{ label: "Main Header 1", subHeaders: ["Sub Header 1"] }]);
    //     setTableData([]);
    setSubmittingTable(false);
  };

  return (
    <Stack>
      <Title order={4}>Dynamic Table</Title>
      <Table withTableBorder withColumnBorders>
        <thead>
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
                <Group align="center">
                  <ActionIcon color="red" onClick={() => deleteRow(rowIdx)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                  <Button
                    variant="light"
                    size="xs"
                    onClick={() => addCell(rowIdx)}
                  >
                    <IconPlus size={14} /> Add Cell
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={addRow} variant="outline">
        Add Row
      </Button>
      <Button
        onClick={handleSave}
        disabled={submittingTable}
        loading={submittingTable}
      >
        {submittingTable ? 'Submitting' : 'Save Table'}
      </Button>
    </Stack>
  );
};

export default UpsertTableMaker;
