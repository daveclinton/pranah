import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatScreen() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* 🔙 Top Row - Back + Share */}
          <View style={styles.topRow}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#02271D" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Logo + Intro text */}
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
            contentFit="contain"
          />

          <Text style={styles.title}>Welcome to Aqua GPT</Text>
          <Text style={styles.subtitle}>
            Your intelligent farm assistant – ask questions, get insights, and
            manage your shrimp farming smarter
          </Text>

          {/* Suggested prompts */}
          <View style={styles.promptContainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.prompt, { backgroundColor: "#FFD54F" }]}
            >
              <Text style={styles.promptText}>
                How often should I feed my shrimp this week?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.prompt, { backgroundColor: "#C5FC61" }]}
            >
              <Text style={styles.promptText}>
                Can I get my income projection for next month?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.prompt, { backgroundColor: "#EAEAEA" }]}
            >
              <Text style={[styles.promptText, { color: "#02271D" }]}>
                How can I reduce feed expenses?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Message input area */}
        <View style={styles.inputBar}>
          <TextInput
            placeholder="Say something"
            placeholderTextColor="#A3A3A3"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
          />

          <View style={styles.actions}>
            <TouchableOpacity>
              <Ionicons name="attach-outline" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="send-outline" size={22} color="#C5FC61" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
  },
  scroll: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  /** Back button icon */
  backButton: {
    backgroundColor: "#C5FC61",
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  shareText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  logo: {
    width: 70,
    height: 70,
    marginTop: 28,
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#D7E2DC",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
    fontSize: 14,
    width: "90%",
  },
  promptContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  prompt: {
    paddingVertical: 14,
    borderRadius: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  promptText: {
    color: "#02271D",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4A675A",
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 12,
    backgroundColor: "#02271D",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingVertical: 12,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
