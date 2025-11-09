import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={96} color="#C5FC61" />

      <Text style={styles.title}>Password Reset Successful!</Text>

      <Text style={styles.text}>
        You can now log in using your new password and continue managing your
        Aqua Farming experience.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
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
    paddingHorizontal: 32,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
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
});
