import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="New Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          style={[styles.input, { marginBottom: 18 }]}
        />
        <Pressable
          style={styles.eyeIconWrapper}
          onPress={() => setShowPassword((s) => !s)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </Pressable>

        <TextInput
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          placeholderTextColor="#888"
          secureTextEntry={!showConfirm}
          style={styles.input}
        />
        <Pressable
          style={[styles.eyeIconWrapper, { top: 110 }]}
          onPress={() => setShowConfirm((s) => !s)}
        >
          <Ionicons
            name={showConfirm ? "eye-off" : "eye"}
            size={22}
            color="#555"
          />
        </Pressable>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(auth)/success")}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 18,
    fontSize: 16,
    color: "#000",
  },
  eyeIconWrapper: {
    position: "absolute",
    right: 34,
    top: 48,
  },
  button: {
    backgroundColor: "#C5FC61",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#02271D",
    fontWeight: "700",
    fontSize: 16,
  },
});
