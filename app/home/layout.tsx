import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/reusable';
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>
        <Header />
          {children}
        <Footer />
      </>
    );
}