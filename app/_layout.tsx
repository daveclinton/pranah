import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
  useAuth,
} from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { tokenCache } from "@/lib/auth";
import { useIsFirstTime } from "@/lib/use-is-first-time";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// App-level providers
function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          {children}
          <FlashMessage position="top" />
        </BottomSheetModalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

// A small internal routing-decider component
function RouterDecider() {
  const { isLoaded, isSignedIn } = useAuth();
  const [isFirstTime] = useIsFirstTime();

  if (!isLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#C5FC61" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }

  if (isFirstTime) {
    return <Redirect href="/(onboarding)" />;
  }

  // signed in + completed onboarding → go to home group
  return <Redirect href="/(home)" />;
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {/* cool loading state before Clerk finishes booting */}
      <ClerkLoading>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#C5FC61" />
        </View>
      </ClerkLoading>

      <ClerkLoaded>
        <AppProviders>
          <RouterDecider />

          {/* Keep stack definition for expo-router screen transitions */}
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(onboarding)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
            <Stack.Screen
              name="sso-callback"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>

          <StatusBar style="light" />
        </AppProviders>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#02271D",
    justifyContent: "center",
    alignItems: "center",
  },
});
