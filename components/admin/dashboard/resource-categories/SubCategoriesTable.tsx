import { FakeSkeleton } from '@/components/reusable';
import { useFbTable } from '@/hooks';
import { IFbTable } from '@/types';
import { ActionIcon, Table } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const TableRows = ({
  rowData,
  loading,
  categoryId,
}: {
  rowData: IFbTable[];
  loading: boolean;
  categoryId: string;
}) => {
  const router = useRouter();
  if (loading)
    return (
      <>
        <Table.Tr>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
          <Table.Td>
            <FakeSkeleton />
          </Table.Td>
        </Table.Tr>
      </>
    );

  if (!rowData?.length)
    return (
      <Table.Tr>
        <Table.Td colSpan={4} align="center">
          No data...
        </Table.Td>
      </Table.Tr>
    );

  return rowData.map((row, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>{row.user?.name}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.source}</Table.Td>
      <Table.Td>
        <ActionIcon
          variant="filled"
          aria-label="Settings"
          size="sm"
          onClick={() =>
            router.push(
              `/dashboard/resource-categories/${categoryId}/${row.name}`
            )
          }
        >
          <IconEye style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));
};

const SubCategoriesTable = ({
  categoryName,
  categoryId,
}: {
  categoryName: string;
  categoryId: string;
}) => {
  const { data, fetchFbTables, loading } = useFbTable();

  const rowData =
    data?.data.filter(({ category }) => category === categoryName) || [];

  useEffect(() => {
    fetchFbTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Table Name</Table.Th>
          <Table.Th>Source</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <TableRows
          rowData={rowData}
          loading={loading}
          categoryId={categoryId}
        />
      </Table.Tbody>
    </Table>
  );
};

export default SubCategoriesTable;
