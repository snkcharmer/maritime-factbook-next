'use client';
import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { RootStyleRegistry } from '../EmotionRootStyleRegistry';
import { MantineEmotionProvider, emotionTransform } from '@mantine/emotion';
import { store } from '@/redux/store';

type AppProviderProps = {
  children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ReduxProvider store={store}>
      <RootStyleRegistry>
        <MantineEmotionProvider>
          <MantineProvider
            defaultColorScheme="light"
            stylesTransform={emotionTransform}
          >
            {children}
          </MantineProvider>
        </MantineEmotionProvider>
      </RootStyleRegistry>
    </ReduxProvider>
  );
}
