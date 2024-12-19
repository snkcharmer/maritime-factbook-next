"use client";

import BriefDescription from "@/components/landing/BriefDescription";
import CategoryList from "@/components/landing/CategoryList";
import { Header } from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import { LandingContainer } from "@/components/landing/LandingContainer";
import { Footer, SearchableAccordion } from "@/components/reusable";
import { IAccordionData } from "@/components/reusable/lib/SearchableAccordion";
import { StatusEnum } from "@/context/enum";
import { useFbCategory, useFbTable } from "@/hooks";
import { TFbCategoryResponse } from "@/types";
import { formatDate } from "@/utils/date";
import { createPath, ROUTES } from "@/utils/route";
import { Space } from "@mantine/core";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { data: fbCategoryData, fetchFbCategories } =
    useFbCategory<TFbCategoryResponse>();
  const { getFbTableByFbCategoryId } = useFbTable();
  const [accordionData, setAccordionData] = useState<IAccordionData[]>([]);

  useEffect(() => {
    fetchFbCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (fbCategoryData) {
        // Sort the data
        const sortedData = fbCategoryData.data.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateA - dateB;
        });

        const newAccordionData: IAccordionData[] = [];

        for (const row of sortedData) {
          const fbTableResponse = await getFbTableByFbCategoryId(
            row.id as string
          );

          const fbTableFiltered = fbTableResponse
            ? fbTableResponse.filter(
                ({ status }) => status === StatusEnum.ACTIVE
              )
            : [];

          if (fbTableFiltered && fbTableFiltered.length) {
            const accordionEntry: IAccordionData = {
              category: row.name,
              items: fbTableFiltered.map((tblRow) => ({
                title: tblRow.name || "",
                date: formatDate(tblRow.createdAt || ""),
                href: createPath({
                  path: ROUTES.fbTableHome,
                  dynamicParams: {
                    fbCategorySlug: tblRow.fbCategory?.slug as string,
                    fbTableSlug: tblRow.slug,
                  },
                }),
              })),
            };

            newAccordionData.push(accordionEntry);
          }
        }
        setAccordionData(newAccordionData);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbCategoryData]);

  return (
    <React.Fragment>
      <Header />
      <Space h={70} />
      <Hero />
      <LandingContainer>
        <Space h={20} />
        <BriefDescription />
        <SearchableAccordion data={accordionData} />
        <CategoryList />
      </LandingContainer>
      <Footer />
    </React.Fragment>
  );
}
