"use client";
import { AdminNavbar } from "@/components/admin/navbar/AdminNavbar";
import { AdminHeader } from "@/components/admin/header/AdminHeader";
import { AppShell, Container } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { useUser } from "@/hooks";
import { UserRoleEnum } from "@/context/enum";
import { DataProviderNavbar } from "@/components/data-provider/navbar/DataProviderNavbar";

export default function Admin({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <AdminHeader opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar className="w-auto">
        {user?.role === UserRoleEnum.ADMIN && <AdminNavbar />}
        {user?.role === UserRoleEnum.DATA_PROVIDER && <DataProviderNavbar />}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container mt={80} size="xl">
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
