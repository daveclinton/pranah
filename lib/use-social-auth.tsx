import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { useSSO } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Alert } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export const useSocialAuth = () => {
  useWarmUpBrowser();
  const [isLoading, setIsLoading] = useState(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google") => {
    setIsLoading(true);
    try {
      const result = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri({ path: 'sso-callback' }),
      });

      if (result.createdSessionId && result.setActive) {
        await result.setActive({ session: result.createdSessionId });
        return { success: true };
      }

      Alert.alert("Error", "Failed to create session. Please try again.");
      return { success: false, error: "Failed to create session" };
    } catch (err: any) {
      console.error(`Error signing in with ${strategy}:`, err);
      Alert.alert("Sign-In Error", err.message || "Something went wrong.");
      return { success: false, err };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
};