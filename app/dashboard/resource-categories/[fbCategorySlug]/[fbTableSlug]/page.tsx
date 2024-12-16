"use client";
import AssigneesDrawer from "@/components/admin/dashboard/resource-categories/AssigneesDrawer";
import AssignTableModal from "@/components/admin/dashboard/resource-categories/AssignTableModal";
import DynamicChart from "@/components/admin/dashboard/resource-categories/DynamicChart";
import { UpsertTableMaker } from "@/components/admin/table-maker";
import { DynamicTable, Toastify } from "@/components/reusable";
import { ITableData } from "@/components/reusable/lib/DynamicTable";
import { useFbTable, useFbTableAssignee, useUser } from "@/hooks";
import { IFbTable, IFbTableAssignee, TUserResponse } from "@/types";
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconRefresh,
  IconTableAlias,
  IconUserPlus,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TableViewer = () => {
  const { fetchAllUsers, data: users, user } = useUser<TUserResponse>();
  const { fbTableSlug } = useParams();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  //   const [chartType, setChartType] = useState<TChartType>("bar");
  const [openedAssignUser, setOpenedAssignUser] = useState<boolean>(false);
  const [openedAssignees, setOpenedAssignees] = useState<boolean>(false);
  const { data, getFbTableBySlug, updateFbTable, updateFbTableAndAssignees } =
    useFbTable<IFbTable>();

  const [tableData, setTableData] = useState<ITableData | null>(null);
  const [tableSyncing, setTableSyncing] = useState<boolean>(true);
  const [fbTableData, setFbTableData] = useState<IFbTable | null>(null);

  const filteredUser = users?.data.filter(({ id }) => id !== user?.id);

  const handleCloseAssignUser = () => setOpenedAssignUser(false);
  const handleCloseAssignees = () => setOpenedAssignees(false);

  const { fetchFbTableAssigneeByFbTableId } =
    useFbTableAssignee<IFbTableAssignee[]>();

  const handleSyncTables = async () => {
    try {
      const assignedTables = await fetchFbTableAssigneeByFbTableId(
        fbTableData?.id || ""
      );

      if (!assignedTables) return setTableSyncing(false);

      if (!Array.isArray(assignedTables)) {
        console.error("Invalid assignedTables:", assignedTables);
        return;
      }

      const mergedTable: any[] = [];

      assignedTables.forEach((table) => {
        if (!Array.isArray(table.data)) return;

        const tableData = table.data[0];
        if (!tableData || !Array.isArray(tableData.rows)) return;

        tableData.rows.forEach((row, rowIndex) => {
          if (!Array.isArray(row)) return;

          mergedTable[rowIndex] = mergedTable[rowIndex] || [];

          row.forEach((cell, colIndex) => {
            if (colIndex === 0) {
              mergedTable[rowIndex][colIndex] = cell; // Copy non-numeric cells directly
              return;
            }

            const cellValue = Number(cell) || 0;
            const isSynced = row[colIndex + 1]?.isSynced || false;
            const lastSyncedValue = row[colIndex + 2]?.lastSyncedValue || 0;

            if (!mergedTable[rowIndex][colIndex]) {
              mergedTable[rowIndex][colIndex] = 0;
            }

            if (!isSynced) {
              const delta = cellValue - lastSyncedValue;
              mergedTable[rowIndex][colIndex] += delta;
            }
          });
        });

        tableData.rows.forEach((row) => {
          row.forEach((cell, colIndex) => {
            if (colIndex === 0) return;
            const cellValue = Number(cell) || 0;

            row[colIndex + 1] = { isSynced: true }; // Mark as synced
            row[colIndex + 2] = { lastSyncedValue: cellValue }; // Update last synced value
          });
        });
      });

      if (!fbTableData?.data?.[0]) {
        console.error("Invalid `data` structure:", fbTableData);
        return;
      }
      await updateFbTable(String(fbTableData?.id), {
        data: {
          headers: fbTableData?.data[0].headers,
          rows: mergedTable,
        },
      });

      setTableData({
        headers: fbTableData.data[0].headers,
        rows: mergedTable,
      });
      setTableSyncing(false);
      Toastify({ message: "Table successfully synced.", type: "success" });
    } catch (error) {
      setTableSyncing(false);
      Toastify({ message: JSON.stringify(error), type: "error" });
      console.error("Error during sync:", error);
    }
  };

  const saveTable = async (data: any) => {
    try {
      const res = await updateFbTableAndAssignees(
        String(fbTableData?.id),
        data
      );
      if (!res) {
        Toastify({ message: res || "", type: "warning" });
        return;
      }
      setIsEdit(false);
      setTableData(data);
      Toastify({ message: "Table successfully updated.", type: "success" });
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    if (fbTableSlug) {
      getFbTableBySlug(fbTableSlug as string);
      // setChartType(data?.chartType || "bar");
      fetchAllUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbTableSlug]);

  useEffect(() => {
    if (data && !tableData) {
      handleSyncTables();
      setFbTableData(data);
      setTableData(data.data[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Stack>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} className="items-center">
        <div className="order-2 sm:order-1">
          <DynamicChart tableData={tableData} />
        </div>
        <Stack className="order-1 sm:order-2">
          <Stack gap={0}>
            <Text fw="bold">Resource Category:</Text>
            <Text>{fbTableData?.fbCategory?.name}</Text>
          </Stack>
          <Stack gap={0}>
            <Text fw="bold">Table Name:</Text>
            <Text>{fbTableData?.name}</Text>
          </Stack>
          <Stack gap={0}>
            <Text fw="bold">Source:</Text>
            <Text>{fbTableData?.source}</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Group justify="space-between">
        <Group>
          <Button
            onClick={() => setOpenedAssignUser(true)}
            size="xs"
            leftSection={<IconUserPlus size={18} />}
          >
            Assign Table
          </Button>
          {!isEdit ? (
            <Button
              onClick={() => setIsEdit(true)}
              variant="subtle"
              size="xs"
              leftSection={<IconTableAlias size={18} />}
            >
              Edit Table
            </Button>
          ) : (
            <Button
              onClick={() => setIsEdit(false)}
              variant="subtle"
              size="xs"
              color="red"
              leftSection={<IconTableAlias size={18} />}
            >
              Cancel Edit
            </Button>
          )}
        </Group>
        <Group>
          <Button
            onClick={() => setOpenedAssignees(true)}
            variant="outline"
            size="xs"
            leftSection={<IconUsersGroup size={18} />}
          >
            Assignees
          </Button>
          <ActionIcon
            color="green"
            variant="filled"
            aria-label="Sync Tables"
            onClick={handleSyncTables}
          >
            <IconRefresh style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
      {tableData && !tableSyncing ? (
        <Stack>
          {!isEdit ? (
            <DynamicTable tableData={tableData} />
          ) : (
            <UpsertTableMaker data={tableData} onSave={saveTable} />
          )}
          {/* <Select
            label="Select Chart Type"
            value={chartType}
            onChange={(value) => setChartType(value as TChartType)}
            data={enumToDropdownOptions(ChartTypesEnum)}
            data={[
              { label: "Bar", value: "bar" },
              { label: "Line", value: "line" },
              { label: "Pie", value: "pie" },
            ]}
            defaultValue="bar"
          /> */}
        </Stack>
      ) : (
        <Center mt={120}>
          <Group>
            <Loader color="blue" type="dots" />
            Table Syncing ...
          </Group>
        </Center>
      )}
      <Space h={300} />
      <AssignTableModal
        opened={openedAssignUser}
        onClose={handleCloseAssignUser}
        fbTableId={fbTableData?.id || ""}
        users={filteredUser || []}
      />
      <AssigneesDrawer
        opened={openedAssignees}
        onClose={handleCloseAssignees}
        fbTableId={fbTableData?.id || ""}
      />
    </Stack>
  );
};

export default TableViewer;
