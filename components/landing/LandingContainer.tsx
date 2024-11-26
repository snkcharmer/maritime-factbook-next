'use client';

import { Container } from '@mantine/core';
import type { ReactNode } from 'react';

interface LandingContainerProps {
  children: ReactNode;
}

export function LandingContainer({ children }: LandingContainerProps) {
  return (
    <Container size="lg" className="flex flex-col gap-10">
      {children}
    </Container>
  );
}
