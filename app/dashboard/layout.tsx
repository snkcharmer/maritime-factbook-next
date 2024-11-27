'use client';
import { AdminNavbar } from '@/components/admin/navbar/AdminNavbar';
import { AdminHeader } from '@/components/admin/header/AdminHeader';
import { AppShell, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

export default function Admin({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <AdminHeader />
      </AppShell.Header>

      <AppShell.Navbar>
        <AdminNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container mt={80} size="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
