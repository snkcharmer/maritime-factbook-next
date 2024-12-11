import CategoriesSection from '@/components/landing/CategoriesSection';
import CategoryList from '@/components/landing/CategoryList';
import { Header } from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import { LandingContainer } from '@/components/landing/LandingContainer';
import { Footer } from '@/components/reusable';
import { Space } from '@mantine/core';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <Hero />
      <LandingContainer>
        <Space h={20} />
        <CategoryList />
        <CategoriesSection />
      </LandingContainer>
      <Footer />
    </React.Fragment>
  );
}
