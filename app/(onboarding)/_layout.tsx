import { useIsFirstTime } from "@/lib/use-is-first-time";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect } from "react";

export default function OnboardingLayout() {
  const [isFirstTime] = useIsFirstTime();
  const { isSignedIn, isLoaded } = useAuth();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  console.log(isFirstTime);

  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => hideSplash(), 1000);
      return () => clearTimeout(timer);
    }
  }, [hideSplash, isLoaded]);
  if (isSignedIn && !isFirstTime) {
    return <Redirect href="/(home)" />;
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
