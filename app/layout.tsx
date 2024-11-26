import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './layout.css';

import React from 'react';
import './globals.css';
import AppProvider from '@/providers/AppProvider';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/reusable';
import { LandingContainer } from '@/components/landing/LandingContainer';

export const metadata = {
  metadataBase: new URL('https://mantine-admin.vercel.app/'),
  title: {
    default: 'Maritime Manpower Factbook',
    template: '%s | Maritime Manpower Factbook',
  },
  description:
    'The Philippine Maritime Manpower Factbook is a portal containing consolidated relevant and updated maritime industry-related data and statistics that seeks to provide a picture of the global and Philippine maritime manpower sector, presented in facts and figures that are derived from the data of various relevant data producer agencies, researches, and published reports. This interactive platform provides data that is readily accessible to industry stakeholders in aid of policy formulation and program development.',
  keywords: ['Maritime Manpower Factbook', 'National Maritime Polytechnic'],
  authors: [
    {
      name: 'ilagunzad',
      url: 'https://ilagunzad.vercel.app',
    },
  ],
  creator: 'ilagunzad',
  manifest: 'https://mantine-admin.vercel.app/site.webmanifest',
};

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
          <LandingContainer>{children}</LandingContainer>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
