import { useSocialAuth } from "@/lib/use-social-auth";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthWelcome() {
  const router = useRouter();
  const { handleSocialAuth, isLoading } = useSocialAuth();
  const { t } = useTranslation(); 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.shrimpContainer}>
          <Image
            source={require("@/assets/scan-icon.png")}
            style={styles.scanIcon}
            resizeMode="contain"
          />
          <Image
            source={require("@/assets/shrimp.png")}
            style={styles.shrimpImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.heading}>{t("tagline")}</Text>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/(auth)/sign-up")}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>{t("continueEmail")}</Text>
        </TouchableOpacity>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>{t("or")}</Text>
          <View style={styles.divider} />
        </View>
        <TouchableOpacity
          style={[styles.googleButton, isLoading && { opacity: 0.7 }]}
          onPress={() => handleSocialAuth("oauth_google")}
          activeOpacity={0.9}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#02271D" />
          ) : (
            <>
              <Image
                source={require("@/assets/google-icon.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>{t("continueGoogle")}</Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
          <Text style={styles.footerText}>
            {t("alreadyHaveAccount")}{" "}
            <Text style={styles.footerLink}>{t("login")}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shrimpContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  scanIcon: {
    position: "absolute",
    width: 200,
    height: 200,
    zIndex: 10,
  },
  shrimpImage: {
    width: 220,
    height: 220,
  },
  bottomSection: {
    flex: 0.8,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: "center",
  },
  heading: {
    color: "#012D24",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
  },
  primaryButton: {
    backgroundColor: "#C5FC61",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#02271D",
    fontWeight: "700",
    fontSize: 15,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  orText: {
    color: "#6B6B6B",
    fontWeight: "500",
    marginHorizontal: 8,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    justifyContent: "center",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontWeight: "600",
    color: "#2F2F2F",
  },
  footerText: {
    marginTop: 18,
    color: "#2F2F2F",
    fontSize: 14,
  },
  footerLink: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
