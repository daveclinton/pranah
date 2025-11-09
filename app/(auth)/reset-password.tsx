import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const resetSchema = z
  .object({
    code: z.string().min(1, "Code is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type ResetForm = z.infer<typeof resetSchema>;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: { code: "", password: "", confirm: "" },
  });

  const onSubmit = async (data: ResetForm) => {
    if (!isLoaded) return;
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code,
        password: data.password,
      });
      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            router.replace("/(home)");
          },
        });
      } else if (result.status === "needs_second_factor") {
        console.log("2FA required");
      } else {
        console.log("Unexpected status:", result.status);
      }
    } catch (err: any) {
      console.error("Reset error:", err);
      Alert.alert(
        "Error",
        err?.errors?.[0]?.message || "Failed to reset password."
      );
      reset({ code: "", password: "", confirm: "" });
    }
  };

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
        <Controller
          control={control}
          name="code"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Verification Code"
              value={value}
              onChangeText={onChange}
              placeholderTextColor="#888"
              style={[styles.input]}
              keyboardType="numeric"
            />
          )}
        />
        {errors.code && (
          <Text style={styles.errorText}>{errors.code.message}</Text>
        )}

        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="New Password"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
              />
            )}
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
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <View style={styles.passwordField}>
          <Controller
            control={control}
            name="confirm"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
                secureTextEntry={!showConfirm}
                style={[styles.input, { flex: 1, marginBottom: 0 }]}
              />
            )}
          />
          <Pressable
            style={styles.eyeIconWrapper}
            onPress={() => setShowConfirm((s) => !s)}
          >
            <Ionicons
              name={showConfirm ? "eye-off" : "eye"}
              size={22}
              color="#555"
            />
          </Pressable>
        </View>
        {errors.confirm && (
          <Text style={styles.errorText}>{errors.confirm.message}</Text>
        )}

        <TouchableOpacity
          style={[styles.button, isSubmitting && { opacity: 0.7 }]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Text>
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
  errorText: {
    color: "#E63946",
    fontSize: 13,
    marginBottom: 10,
    marginTop: -6,
  },
  passwordField: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
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
});
