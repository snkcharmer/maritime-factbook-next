import CategoriesSection from '@/components/landing/CategoriesSection';
import CategoryList from '@/components/landing/CategoryList';
import { Header } from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import { LandingContainer } from '@/components/landing/LandingContainer';
import { Footer } from '@/components/reusable';
import React from 'react';

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <LandingContainer>
        <Hero />
        <CategoryList />
        <CategoriesSection />
      </LandingContainer>
      <Footer />
    </React.Fragment>
  );
}
