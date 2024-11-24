'use client';
import React, { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { RootStyleRegistry } from '../EmotionRootStyleRegistry';
import { MantineEmotionProvider, emotionTransform } from '@mantine/emotion';
import { AuthProvider } from '@/app/context/AuthContext';
// import { ProtectedRoute } from '@/components/ProtectedRoute';
import { NavigationProgress } from '@mantine/nprogress';

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  return (
    // <ProtectedRoute>
    <AuthProvider>
      <RootStyleRegistry>
        <MantineEmotionProvider>
          <MantineProvider
            defaultColorScheme="light"
            stylesTransform={emotionTransform}
          >
            <NavigationProgress />
            {children}
          </MantineProvider>
        </MantineEmotionProvider>
      </RootStyleRegistry>
    </AuthProvider>
    // {/* </ProtectedRoute> */}
  );
}
