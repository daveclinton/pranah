import "@/lib/i18n";
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


function RouterDecider() {
  const { isLoaded, isSignedIn } = useAuth();
  const [isFirstTime] = useIsFirstTime();
  console.log({ isLoaded, isSignedIn, isFirstTime });

  if (!isLoaded) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#C5FC61" />
      </View>
    );
  }

  if (isFirstTime) {
    return <Redirect href="/(onboarding)" />;
  }

 
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }


  return <Redirect href="/(home)" />;
}


export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>

      <ClerkLoading>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#C5FC61" />
        </View>
      </ClerkLoading>

      <ClerkLoaded>
        <AppProviders>
          <RouterDecider />
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
