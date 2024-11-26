import { Header } from '@/components/landing/Header';
import { Categories } from '@/components/landing/Categories';

import { LandingContainer } from '@/components/landing/LandingContainer';
import { Footer } from '@/components/reusable';

export default function Home() {
  return (
    <LandingContainer>
      <Header />
      <Categories />
      <Footer />
    </LandingContainer>
  );
}
