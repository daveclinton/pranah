import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UnderDevelopmentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#02271D" />
        </TouchableOpacity>
      </View>

      {/* Center content */}
      <View style={styles.center}>
        <Text style={styles.title}>This feature is under development.</Text>
        <Text style={styles.brand}>Aqua Pranah</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
  },
  /** Header row */
  topRow: {
    width: "100%",
    paddingHorizontal: 24,
    paddingTop: 16,
    justifyContent: "flex-start",
  },
  backButton: {
    backgroundColor: "#C5FC61",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  /** Center message */
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
  },
  brand: {
    color: "#C5FC61",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
