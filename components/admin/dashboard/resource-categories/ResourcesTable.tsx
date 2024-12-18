import React, { useEffect, useState } from "react";
import { Switch, Table, ActionIcon, Group, rem, Menu } from "@mantine/core";
import {
  IconCheck,
  IconDots,
  IconEdit,
  IconInfoCircle,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import Swal from "sweetalert2";
import { StatusEnum } from "@/context/enum";
import { IFbTable } from "@/types";
import { FakeSkeleton } from "@/components/reusable";
import { createPath } from "@/utils/route";
import { ADMIN_ROUTES } from "@/constants";
import { useFbTable } from "@/hooks";

const TableRows = ({
  rowData,
  loading,
  refetch,
}: {
  rowData: IFbTable[];
  loading: boolean;
  refetch: () => void;
}) => {
  const theme = useMantineTheme();
  const { deleteFbTable, updateFbTable } = useFbTable();

  // State to manage row-specific switch states
  const [statusState, setStatusState] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteFbTable(id);
        refetch();
        Swal.fire("Deleted!", "Your table has been deleted.", "success");
      }
    });
  };

  const handleToggle = async (id: string, checked: boolean) => {
    setStatusState((prev) => ({ ...prev, [id]: checked }));
    // Optionally send update to backend
    await updateFbTable(id, {
      status: checked ? StatusEnum.ACTIVE : StatusEnum.INACTIVE,
    });
    refetch();
  };

  useEffect(() => {
    if (rowData) {
      setStatusState(
        rowData?.reduce((acc, row) => {
          acc[row.id as string] = row.status === StatusEnum.ACTIVE;
          return acc;
        }, {} as { [key: string]: boolean })
      );
    }
  }, [rowData]);

  console.log("statusState", statusState);

  if (loading)
    return (
      <>
        <FakeSkeleton />
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

  return rowData.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.source}</Table.Td>
      <Table.Td align="center" width={120}>
        <Group justify="center">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon>
                <IconDots
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item
                component="a"
                href={createPath({
                  path: ADMIN_ROUTES.resourceCategoriesTable,
                  dynamicParams: {
                    fbCategorySlug: String(row.fbCategory?.slug),
                    fbTableSlug: row.slug,
                  },
                })}
                leftSection={
                  <IconInfoCircle style={{ width: rem(14), height: rem(14) }} />
                }
              >
                View
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleDelete(row.id as string)}
              >
                Delete
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconEdit style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Switch
            checked={statusState[row.id as string]}
            onChange={(event) =>
              handleToggle(row.id as string, event.currentTarget.checked)
            }
            color="teal"
            size="md"
            thumbIcon={
              statusState[row.id as string] ? (
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  color={theme.colors.teal[6]}
                  stroke={3}
                />
              ) : (
                <IconX
                  style={{ width: rem(12), height: rem(12) }}
                  color={theme.colors.red[6]}
                  stroke={3}
                />
              )
            }
          />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
};

const ResourcesTable = ({
  data,
  refetch,
}: {
  data: IFbTable[];
  refetch: () => {};
}) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Table Name</Table.Th>
          <Table.Th>Source</Table.Th>
          <Table.Th className="text-center">Action</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <TableRows rowData={data} loading={false} refetch={refetch} />
      </Table.Tbody>
    </Table>
  );
};

export default ResourcesTable;
