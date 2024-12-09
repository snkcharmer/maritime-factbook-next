import { IFbTableAssignee } from '@/types';
import { Table } from '@mantine/core';

interface IAssignedTablesProps {
  data: IFbTableAssignee[];
}

const Rows = ({ data }: { data: IFbTableAssignee[] }) => {
  return (data || []).map((row, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>{row.fbTable?.fbCategory?.name}</Table.Td>
      <Table.Td>{row.fbTable?.name}</Table.Td>
    </Table.Tr>
  ));
};

const AssignedTables = (props: IAssignedTablesProps) => {
  const { data } = props;

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Table Name</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Rows data={data} />
      </Table.Tbody>
    </Table>
  );
};
export default AssignedTables;
