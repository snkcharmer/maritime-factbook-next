"use client";
import { useFbTable } from "@/hooks";
import { IFbCategory, IFbTable } from "@/types";
import { Button, Card, SimpleGrid, Space, Text, Title } from "@mantine/core";
import React, { useEffect } from "react";
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
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {data
          ?.filter(({ data }) => data[0].rows.length > 0)
          .map((row, idx) => (
            <Card
              shadow="md"
              withBorder
              key={idx}
              radius={20}
              className="relative"
            >
              {/* <div className="p-2">
                {row.chartType !== ChartTypesEnum.TABLE ? (
                  <Image
                    src="/bar-chart.png"
                    alt=""
                    width={150}
                    height={150}
                    className="mx-auto"
                  />
                ) : (
                  <Image
                    src="/table.png"
                    alt=""
                    width={150}
                    height={150}
                    className="mx-auto"
                  />
                )}
              </div> */}
              <Text size="sm" className="">
                {row.name}
              </Text>
              <Space h={30} />
              <Button
                component="a"
                href={createPath({
                  path: ROUTES.fbTableHome,
                  dynamicParams: {
                    fbCategorySlug: row?.fbCategory?.slug as string,
                    fbTableSlug: row.slug as string,
                  },
                })}
                className="ml-auto w-[130px] mt-6 flex flex-wrap justify-end absolute bottom-2 right-2"
                variant="subtle"
                size="xs"
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
