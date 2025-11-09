import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isSignedIn && isLoaded) {
    return <Redirect href="/(onboarding)" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
  );
}
