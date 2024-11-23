import { Header } from '@/components/landing/Header';
import { LandingContainer } from '@/components/landing/LandingContainer';
import { Footer } from '@/components/reusable';

export default function Home() {
  return (
    <LandingContainer>
      <Header />
      <Footer />
    </LandingContainer>
  );
}
