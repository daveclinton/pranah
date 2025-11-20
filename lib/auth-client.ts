// lib/auth-client.ts
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8081", // or your production API base URL
  plugins: [
    expoClient({
      scheme: "aqua-pranna", // ← match the app.json scheme
      storagePrefix: "aqua-pranna",
      storage: SecureStore,
    }),
  ],
});