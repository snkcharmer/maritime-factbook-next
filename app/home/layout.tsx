import AppProvider from '@/providers/AppProvider';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/reusable';
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <head>
          {/* <ColorSchemeScript /> */}
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </head>
        <body>
          <AppProvider>
            <Header />
              {children}
            <Footer />
          </AppProvider>
        </body>
      </html>
    );
  }