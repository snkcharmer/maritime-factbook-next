"use client";
import { DynamicTable, FakeSkeleton } from "@/components/reusable";
import { useFbCategory, useFbTable } from "@/hooks";
import { IFbCategory, IFbTable } from "@/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  Accordion,
  Stack,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
  SimpleGrid,
  Button,
} from "@mantine/core";
import DynamicChart from "@/components/admin/dashboard/resource-categories/DynamicChart";
import { IconChevronsRight, IconPlus } from "@tabler/icons-react";
import { ROUTES } from "@/constants";
import { createPath } from "@/utils/route";
import { StatusEnum } from "@/context/enum";

export default function CategoryPage() {
  const { fbCategorySlug } = useParams();
  const {
    data: fbCategory,
    loading,
    getFbCategoryBySlug,
  } = useFbCategory<IFbCategory>();
  const { data: fbTables, getFbTableByFbCategoryId } = useFbTable<IFbTable[]>();

  useEffect(() => {
    if (fbCategorySlug) {
      getFbCategoryBySlug(fbCategorySlug as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbCategorySlug]);

  useEffect(() => {
    if (fbCategory) {
      getFbTableByFbCategoryId(String(fbCategory.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbCategory]);

  return (
    <>
      <Breadcrumbs mb={20}>
        <Anchor href={ROUTES.home} size="sm">
          Home
        </Anchor>
        <Anchor
          href={createPath({
            path: ROUTES.resourceCategoriesHome,
            dynamicParams: { fbCategorySlug: fbCategorySlug as string },
          })}
          size="sm"
        >
          {fbCategory?.name}
        </Anchor>
      </Breadcrumbs>
      {loading ? (
        <FakeSkeleton rows={1} height={30} />
      ) : (
        <Title size="h1">{fbCategory?.name}</Title>
      )}
      <Stack gap={0}>
        {fbTables
          ?.filter(({ status }) => status === StatusEnum.ACTIVE)
          .map((row, i) => {
            return (
              <Accordion
                key={i}
                m={0}
                variant="contained"
                chevronPosition="left"
                chevron={<IconPlus />}
                bg="white"
              >
                <Accordion.Item value={`${i}`}>
                  <Accordion.Control>
                    <Text size="xl">{row.name}</Text>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap="xl">
                      {row.note && (
                        <Text size="md">
                          <Text fw="bold">Note:</Text> {row.note}
                        </Text>
                      )}
                      {row.data[0].rows.length ? (
                        <DynamicChart tableData={row.data[0]} />
                      ) : (
                        ""
                      )}
                      {row.data.length && (
                        <DynamicTable tableData={row.data[0]} />
                      )}
                      <SimpleGrid cols={2}>
                        <Text fs="italic" size="md">
                          Source:
                          {row.source}
                        </Text>
                        <>
                          <Button
                            component="a"
                            href={createPath({
                              path: ROUTES.fbTableHome,
                              dynamicParams: {
                                fbCategorySlug: row?.fbCategory?.slug as string,
                                fbTableSlug: row.slug as string,
                              },
                            })}
                            className="ml-auto w-[130px] flex flex-wrap justify-end"
                            variant="subtle"
                            leftSection={<IconChevronsRight />}
                          >
                            See more
                          </Button>
                        </>
                      </SimpleGrid>
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            );
          })}
      </Stack>
      {/* <ResourcesTable data={fbTables || []} /> */}
    </>
  );
}
