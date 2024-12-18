"use client";
import React, { ReactNode } from "react";
import { createTheme, MantineProvider } from "@mantine/core";
import { RootStyleRegistry } from "../app/EmotionRootStyleRegistry";
import { MantineEmotionProvider, emotionTransform } from "@mantine/emotion";
import { AuthProvider } from "@/providers/AuthContext";
// import { ProtectedRoute } from '@/components/ProtectedRoute';
import { NavigationProgress } from "@mantine/nprogress";
import { ToastContainer } from "react-toastify";

type AppProviderProps = {
  children: ReactNode;
};

const theme = createTheme({
  cursorType: "pointer",
});

export default function AppProvider({ children }: AppProviderProps) {
  return (
    // <ProtectedRoute>
    <AuthProvider>
      <RootStyleRegistry>
        <MantineEmotionProvider>
          <MantineProvider
            defaultColorScheme="light"
            stylesTransform={emotionTransform}
            theme={theme}
          >
            <ToastContainer />
            <NavigationProgress />
            {children}
          </MantineProvider>
        </MantineEmotionProvider>
      </RootStyleRegistry>
    </AuthProvider>
    // {/* </ProtectedRoute> */}
  );
}
