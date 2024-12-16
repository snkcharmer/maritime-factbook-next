"use client";

import { Grid, GridCol, Select, SimpleGrid, Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
// import { categoryData } from "./ContextData";
import { useFbCategory, useFbTable } from "@/hooks";
import { IFbTable, ISelectOption, TFbCategoryResponse } from "@/types";
import { DynamicTable, NoData } from "@/components/reusable";
import DynamicChart from "./resource-categories/DynamicChart";

// type CategoryKey = keyof typeof categoryData;

export function AdminDashboardContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [fbCategories, setFbCategories] = useState<ISelectOption[]>([]);

  const { data, fetchFbCategories } = useFbCategory<TFbCategoryResponse>();
  const { data: fbTableData, getFbTableByFbCategoryId } =
    useFbTable<IFbTable[]>();

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data)
      setFbCategories(
        data.data.map(({ name, id }) => ({ label: name, value: String(id) }))
      );
    setSelectedCategory(String(data?.data[0].id));
    getFbTableByFbCategoryId(String(data?.data[0].id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (selectedCategory) getFbTableByFbCategoryId(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  console.log("selectedCategory", selectedCategory);

  return (
    <Grid>
      {/* <GridCol span={{ sm: 12, md: 12, lg: 4 }}>
        <ProfileCard />
      </GridCol> */}
      {/* <GridCol span={{ sm: 12, md: 12, lg: 8 }}>
        <Flex direction="column" h="100%" justify="space-between" gap="md">
          <WelcomeCard />
        </Flex>
      </GridCol> */}
      <GridCol span={12}>
        <Select
          label="Select Category"
          placeholder="Choose a category"
          data={fbCategories}
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(String(value))}
          style={{ marginBottom: "2rem" }}
        />
        {fbTableData && fbTableData.length ? (
          <Grid gutter={50}>
            {fbTableData?.map((row, idx) => (
              <GridCol span={{ sm: 12, md: 12, lg: 6 }} key={idx}>
                <Stack gap={30}>
                  <Title order={3}>{row.name}</Title>
                  <DynamicChart tableData={row.data[0]} />
                  <DynamicTable tableData={row.data[0]} />
                </Stack>
              </GridCol>
            ))}
          </Grid>
        ) : (
          <NoData />
        )}
      </GridCol>
    </Grid>
  );
}
