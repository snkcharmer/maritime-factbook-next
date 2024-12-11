import { FakeSkeleton } from '@/components/reusable';
import { ROUTES } from '@/constants';
import { IFbTable } from '@/types';
import { createPath } from '@/utils/route';
import { Button, Table } from '@mantine/core';
import React from 'react';

const TableRows = ({
  rowData,
  loading,
}: {
  rowData: IFbTable[];
  loading: boolean;
}) => {
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
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.source}</Table.Td>
      <Table.Td>
        <Button
          component="a"
          href={createPath({
            path: ROUTES.fbTableHome,
            dynamicParams: {
              fbCategorySlug: String(row.fbCategory?.slug),
              fbTableSlug: row.slug,
            },
          })}
          variant="filled"
          key={idx}
          className="truncate max-w-auto text-xs"
          size="xs"
        >
          View
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
};

const ResourcesTable = ({ data }: { data: IFbTable[] }) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          {/* <Table.Th>User</Table.Th> */}
          <Table.Th>Table Name</Table.Th>
          <Table.Th>Source</Table.Th>
          <Table.Th>Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <TableRows rowData={data} loading={false} />
      </Table.Tbody>
    </Table>
  );
};

export default ResourcesTable;
