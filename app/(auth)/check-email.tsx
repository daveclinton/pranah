import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CheckMailScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="mail-unread-outline" size={84} color="#C5FC61" />

      <Text style={styles.title}>Check your email</Text>

      <Text style={styles.text}>
        We’ve sent a link to your email address. Follow the instructions to
        reset your password.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/reset-password")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/(auth)/sign-in")}
        style={styles.backLink}
      >
        <Text style={styles.backText}>
          Didn’t receive the email? <Text style={styles.underline}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 16,
  },
  text: {
    color: "#C3D6CF",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#C5FC61",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#02271D",
    fontWeight: "700",
    fontSize: 16,
  },
  backLink: {
    marginTop: 24,
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  underline: {
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
