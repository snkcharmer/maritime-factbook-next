'use client';

import CategoryList from '@/components/landing/CategoryList';
import { Header } from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import { LandingContainer } from '@/components/landing/LandingContainer';
import { Footer, SearchableAccordion } from '@/components/reusable';
import { IAccordionData } from '@/components/reusable/lib/SearchableAccordion';
import { useFbCategory, useFbTable } from '@/hooks';
import { TFbCategoryResponse } from '@/types';
import { formatDate } from '@/utils/date';
import { createPath, ROUTES } from '@/utils/route';
import { Space } from '@mantine/core';
import React, { useEffect, useState } from 'react';

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
    if (fbCategoryData) {
      fbCategoryData.data.forEach(async (row) => {
        const fbTableResponse = await getFbTableByFbCategoryId(
          row.id as string
        );
        if (fbTableResponse && fbTableResponse.length) {
          const newAccordionEntry: IAccordionData = {
            category: row.name,
            items: fbTableResponse.map((tblRow) => ({
              title: tblRow.name || '',
              date: formatDate(tblRow.createdAt || ''),
              href: createPath({
                path: ROUTES.fbTableHome,
                dynamicParams: {
                  fbCategorySlug: tblRow.fbCategory?.slug as string,
                  fbTableSlug: tblRow.slug,
                },
              }),
            })),
          };
          setAccordionData((prevData) => [...prevData, newAccordionEntry]);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fbCategoryData]);

  return (
    <React.Fragment>
      <Header />
      <Hero />
      <LandingContainer>
        <Space h={20} />
        <SearchableAccordion data={accordionData} />
        <CategoryList />
      </LandingContainer>
      <Footer />
    </React.Fragment>
  );
}
