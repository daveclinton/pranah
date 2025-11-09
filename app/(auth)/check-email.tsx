import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { z } from "zod";

const { height } = Dimensions.get("window");

const verifySchema = z.object({
  code: z
    .string()
    .min(1, "Code is required")
    .min(6, "Code must be at least 6 digits"),
});

type VerifyData = z.infer<typeof verifySchema>;

export default function VerifyEmailScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [resending, setResending] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VerifyData>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" },
  });

  const handleVerify = async (data: VerifyData) => {
    if (!isLoaded) return;
    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(home)");
      } else {
        console.log("Unexpected result:", result);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Verification failed",
        error?.errors?.[0]?.message ||
          "Invalid or expired code. Please try again."
      );
      reset();
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      setResending(true);
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Alert.alert("Email sent", "A new verification code has been sent.");
    } catch (error: any) {
      console.error("Resend error:", error);
      Alert.alert(
        "Error",
        error?.errors?.[0]?.message ||
          "Failed to resend verification email. Try again later."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={styles.container}>
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
              alignItems: "center",
            }}
          >
            <Ionicons name="mail-unread-outline" size={84} color="#C5FC61" />
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.text}>
              We&apos;ve sent a code to your registered email. Enter it below to
              complete your sign-up.
            </Text>

            <Controller
              name="code"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter verification code"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholderTextColor="#888"
                  style={styles.input}
                  keyboardType="numeric"
                  autoCapitalize="none"
                  maxLength={8}
                />
              )}
            />

            {errors.code && (
              <Text style={styles.errorText}>{errors.code.message}</Text>
            )}

            <TouchableOpacity
              style={[styles.button, isSubmitting && { opacity: 0.7 }]}
              onPress={handleSubmit(handleVerify)}
              disabled={isSubmitting}
              activeOpacity={0.9}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#02271D" />
              ) : (
                <Text style={styles.buttonText}>Verify Email</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resendContainer, resending && { opacity: 0.7 }]}
              onPress={handleResend}
              disabled={resending}
            >
              {resending ? (
                <ActivityIndicator color="#C5FC61" size="small" />
              ) : (
                <Text style={styles.resendText}>
                  Didn’t receive the email?{" "}
                  <Text style={styles.underline}>Resend</Text>
                </Text>
              )}
            </TouchableOpacity>
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
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 20,
    textAlign: "center",
    marginBottom: 12,
  },
  text: {
    color: "#C3D6CF",
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "100%",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 2,
  },
  errorText: {
    color: "#E63946",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#C5FC61",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 14,
  },
  buttonText: {
    color: "#02271D",
    fontWeight: "700",
    fontSize: 16,
  },
  resendContainer: {
    marginTop: 26,
  },
  resendText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  underline: {
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
