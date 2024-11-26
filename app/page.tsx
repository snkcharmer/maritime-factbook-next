import CategoriesSection from '@/components/landing/CategoriesSection';
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
        <CategoriesSection />
      </LandingContainer>
      <Footer />
    </React.Fragment>
  );
}
