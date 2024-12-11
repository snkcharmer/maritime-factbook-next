import CategoryList from '@/components/landing/CategoryList';
import { Header } from '@/components/landing/Header';
import { LandingContainer } from '@/components/landing/LandingContainer';
import ResourceCategoryHero from '@/components/resource-category/ResourceCategoryHero';
import { Footer } from '@/components/reusable';
import { Space } from '@mantine/core';
import React from 'react';

export default function ResourceCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Header />
      <ResourceCategoryHero />
      <LandingContainer>
        <Space h={20} />
        <CategoryList />
        <Space h={10} />
        {children}
      </LandingContainer>
      <Footer />
    </React.Fragment>
  );
}
