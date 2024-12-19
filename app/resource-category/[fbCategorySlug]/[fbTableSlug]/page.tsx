"use client";
import AssigneesDrawer from "@/components/admin/dashboard/resource-categories/AssigneesDrawer";
import AssignTableModal from "@/components/admin/dashboard/resource-categories/AssignTableModal";
import DynamicChart from "@/components/admin/dashboard/resource-categories/DynamicChart";
import { UpsertTableMaker } from "@/components/admin/table-maker";
import RelatedTables from "@/components/resource-category/RelatedTables";
import { DynamicTable, Toastify } from "@/components/reusable";
import { ITableData } from "@/components/reusable/lib/DynamicTable";
import { ROUTES } from "@/constants";
import { useFbTable, useFbTableAssignee, useUser } from "@/hooks";
import {
  IFbCategory,
  IFbTable,
  IFbTableAssignee,
  TUserResponse,
} from "@/types";
import { createPath } from "@/utils/route";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IconFileTypePdf } from "@tabler/icons-react";
import { ChartTypesEnum } from "@/context/enum";

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
        data?.id || ""
      );
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

      if (!data?.data?.[0]) {
        console.error("Invalid `data` structure:", data);
        return;
      }

      if (!mergedTable.length) {
        setTableSyncing(false);
        return;
      }

      await updateFbTable(String(data?.id), {
        data: {
          headers: data?.data[0].headers,
          rows: mergedTable,
        },
      });

      setTableData({
        headers: data.data[0].headers,
        rows: mergedTable,
      });
      setTableSyncing(false);
      // Toastify({ message: 'Table successfully synced.', type: 'success' });
    } catch (error) {
      setTableSyncing(false);
      // Toastify({ message: JSON.stringify(error), type: 'error' });
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

  const generatePDF = async () => {
    const element = document.getElementById("printArea");
    if (element) {
      // Apply CSS to make all text inside the table black
      const style = document.createElement("style");
      style.innerHTML = `
          #printArea table, #printArea table *, #printArea .source-text {
            color: black !important;
          }
          #printArea table td,
          #printArea .source-text {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          #printArea .tableName {
            margin-bottom: 2rem;
          }
        `;
      document.head.appendChild(style);

      const canvas = await html2canvas(element, { scale: 2 });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const padding = 10; // Define padding in mm
      const scaleFactor = Math.min(
        (pdfWidth - 2 * padding) / imgWidth,
        (pdfHeight - 2 * padding) / imgHeight
      );
      const scaledWidth = imgWidth * scaleFactor;
      const scaledHeight = imgHeight * scaleFactor;
      pdf.addImage(
        imgData,
        "PNG",
        padding,
        padding,
        scaledWidth,
        scaledHeight,
        "",
        "FAST"
      );
      pdf.save(fbTableData?.name);

      // Remove the style element after generating the PDF
      document.head.removeChild(style);
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
    <>
      <Breadcrumbs mb={20}>
        <Anchor href={ROUTES.home} size="sm">
          Home
        </Anchor>
        <Anchor
          href={createPath({
            path: ROUTES.resourceCategoriesHome,
            dynamicParams: {
              fbCategorySlug: fbTableData?.fbCategory?.slug as string,
            },
          })}
          size="sm"
        >
          {fbTableData?.fbCategory?.name}
        </Anchor>
        <Anchor
          className="truncate w-1/4"
          href={createPath({
            path: ROUTES.fbTableHome,
            dynamicParams: {
              fbCategorySlug: fbTableData?.fbCategory?.slug as string,
              fbTableSlug: fbTableSlug as string,
            },
          })}
          size="sm"
        >
          {fbTableData?.name}
        </Anchor>
      </Breadcrumbs>
      <Button
        onClick={generatePDF}
        leftSection={<IconFileTypePdf />}
        className="w-fit"
      >
        Download as PDF
      </Button>
      <Stack>
        <div id="printArea">
          <Title
            order={2}
            className="font-bold text-[1.8rem] text-blue-700 tableName"
          >
            {fbTableData?.name}
          </Title>
          {fbTableData?.chartType !== ChartTypesEnum.TABLE &&
          tableData?.rows.length ? (
            <DynamicChart tableData={tableData} />
          ) : (
            ""
          )}
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
          <Stack gap={0}>
            <Text fs="italic" className="source-text">
              Source: {fbTableData?.source}
            </Text>
          </Stack>
        </div>
        <Space h={50} />
        <RelatedTables category={fbTableData?.fbCategory as IFbCategory} />
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
    </>
  );
};

export default TableViewer;
