"use client";
import { useFbTable } from "@/hooks";
import { IFbCategory, IFbTable } from "@/types";
import { Button, Card, SimpleGrid, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
import DynamicChart from "../admin/dashboard/resource-categories/DynamicChart";
import { IconChevronsRight } from "@tabler/icons-react";
import { createPath, ROUTES } from "@/utils/route";

const RelatedTables = ({ category }: { category: IFbCategory }) => {
  const { data = [], getFbTableByFbCategoryId } = useFbTable<IFbTable[]>();

  useEffect(() => {
    if (category) getFbTableByFbCategoryId(category.id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div>
      <Title order={3} className="font-bold text-blue-700 mb-4">
        Related tables
      </Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {data
          ?.filter(({ data }) => data[0].rows.length > 0)
          .map((row, idx) => (
            <Card shadow="md" withBorder key={idx}>
              <DynamicChart tableData={row.data[0]} />
              <Text size="sm" mt={10}>
                {row.name}
              </Text>
              <Button
                component="a"
                href={createPath({
                  path: ROUTES.fbTableHome,
                  dynamicParams: {
                    fbCategorySlug: row?.fbCategory?.slug as string,
                    fbTableSlug: row.slug as string,
                  },
                })}
                className="ml-auto w-[130px] mt-6 flex flex-wrap justify-end"
                variant="subtle"
                leftSection={<IconChevronsRight />}
              >
                See more
              </Button>
            </Card>
          ))}
      </SimpleGrid>
    </div>
  );
};

export default RelatedTables;
