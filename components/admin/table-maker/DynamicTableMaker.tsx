"use client";

import { useEffect, useState } from "react";
import {
  Button,
  TextInput,
  Select,
  Stack,
  SimpleGrid,
  Space,
  Title,
  Group,
  Drawer,
} from "@mantine/core";
import { IconLink } from "@tabler/icons-react";
import { useFbCategory, useFbTable, useUser } from "@/hooks";
import { ChartTypesEnum } from "@/context/enum";
import { IFbSubCategoryByCategoryResponse, TFbTableResponse } from "@/types";
import { useDisclosure } from "@mantine/hooks";
import { FakeSkeleton, Toastify } from "@/components/reusable";
import { createPath } from "@/utils/route";
import { ADMIN_ROUTES } from "@/constants";
import { TChartType } from "../dashboard/resource-categories/DynamicChart";
import UpsertTableMaker from "./UpsertTableMaker";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedChartType, setSelectedChartType] = useState<TChartType | null>(
    "bar"
  );
  const [tableName, setTableName] = useState<string>("");
  const [tableSource, setTableSource] = useState<string>("");

  const resetForm = () => {
    setTableName("");
    setTableSource("");
  };

  const saveTable = async (data: any) => {
    try {
      const res = await createFbTable({
        fbCategoryId: selectedCategory || "",
        userId: user?.id,
        name: tableName,
        source: tableSource,
        chartType: selectedChartType,
        data,
      });
      if (!res) {
        Toastify({ message: res || "", type: "warning" });
        return;
      }
      resetForm();
      Toastify({ message: "Table successfully saved.", type: "success" });
    } catch (err) {
      console.log("error", err);
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
            value={selectedCategory || ""}
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
            value={selectedChartType || ""}
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
      <UpsertTableMaker onSave={(data) => saveTable(data)} />
      <Space h={300} />
    </>
  );
}