import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const { height } = Dimensions.get("window");

export default function SignUpScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              paddingBottom: height * 0.05,
            }}
          >
            <Text style={styles.title}>Create Account</Text>

            <View style={styles.form}>
              {/* First Name Field */}
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholderTextColor="#888"
                style={styles.input}
              />

              {/* Middle Name Field */}
              <TextInput
                placeholder="Middle Name (Optional)"
                value={middleName}
                onChangeText={setMiddleName}
                placeholderTextColor="#888"
                style={styles.input}
              />

              {/* Phone Number Field */}
              <TextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="phone-pad"
              />

              {/* Email Field */}
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#888"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              {/* Password Field */}
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#888"
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  secureTextEntry={!showPassword}
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={styles.eyeIconWrapper}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                  />
                </Pressable>
              </View>

              {/* Confirm Password Field */}
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholderTextColor="#888"
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  secureTextEntry={!showConfirmPassword}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  style={styles.eyeIconWrapper}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    size={22}
                    color="#555"
                  />
                </Pressable>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>

              {/* Footer */}
              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-in")}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.footerText}>
                  Already have an account?{" "}
                  <Text style={styles.footerLink}>Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 60,
    marginBottom: 10,
    alignSelf: "flex-start",
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
    marginBottom: 40,
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  eyeIconWrapper: {
    position: "absolute",
    right: 12,
    padding: 4,
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
  footerText: {
    color: "#012D24",
    textAlign: "center",
  },
  footerLink: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
