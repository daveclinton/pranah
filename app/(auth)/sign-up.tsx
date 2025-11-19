import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
import { z } from "zod";

const { height } = Dimensions.get("window");

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, isLoaded } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { t } = useTranslation();

  const signUpSchema = z
    .object({
      firstName: z.string().min(1, t("firstNameRequired")),
      middleName: z.string().optional(),
      phoneNumber: z.string().min(1, t("phoneRequired")),
      email: z.string().min(1, t("emailRequired")).email(t("invalidEmail")),
      password: z.string().min(8, t("passwordShort")).max(50, t("passwordLong")),
      confirmPassword: z.string().min(1, t("confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsDoNotMatch"),
      path: ["confirmPassword"],
    });

  type SignUpData = z.infer<typeof signUpSchema>;


  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpData) => {
    if (!isLoaded) return;
    setAuthError(null);

    try {
      await signUp.create({
        firstName: data.firstName,
        lastName: data.middleName || undefined,
        emailAddress: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/(auth)/check-email");
    } catch (err: any) {
      console.error("SignUp error:", err);
      const message =
        err?.errors?.[0]?.message ||
        "An unexpected error occurred during sign up.";
      setAuthError(message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back */}
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
            <Text style={styles.title}>{t("createAccount")}</Text>

            <View style={styles.form}>
              {/* First Name */}
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder={t("firstName")}
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="#888"
                      style={styles.input}
                    />
                    {errors.firstName && (
                      <Text style={styles.errorText}>
                        {errors.firstName.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* Middle Name */}
              <Controller
                control={control}
                name="middleName"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder={t("middleNameOptional")}
                    value={value}
                    onChangeText={onChange}
                    placeholderTextColor="#888"
                    style={styles.input}
                  />
                )}
              />

              {/* Phone Number */}
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder={t("phoneNumber")}
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="#888"
                      style={styles.input}
                      keyboardType="phone-pad"
                    />
                    {errors.phoneNumber && (
                      <Text style={styles.errorText}>
                        {errors.phoneNumber.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* Email */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      placeholder={t("enterEmail")}
                      value={value}
                      onChangeText={onChange}
                      placeholderTextColor="#888"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {errors.email && (
                      <Text style={styles.errorText}>
                        {errors.email.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* Password */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        placeholder={t("password")}
                        value={value}
                        onChangeText={onChange}
                        placeholderTextColor="#888"
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        secureTextEntry={!showPassword}
                      />
                      <Pressable
                        onPress={() => setShowPassword((p) => !p)}
                        style={styles.eyeIconWrapper}
                      >
                        <Ionicons
                          name={showPassword ? "eye-off" : "eye"}
                          size={22}
                          color="#555"
                        />
                      </Pressable>
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* Confirm Password */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        placeholder={t("confirmPassword")}
                        value={value}
                        onChangeText={onChange}
                        placeholderTextColor="#888"
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        secureTextEntry={!showConfirmPassword}
                      />
                      <Pressable
                        onPress={() => setShowConfirmPassword((p) => !p)}
                        style={styles.eyeIconWrapper}
                      >
                        <Ionicons
                          name={showConfirmPassword ? "eye-off" : "eye"}
                          size={22}
                          color="#555"
                        />
                      </Pressable>
                    </View>
                    {errors.confirmPassword && (
                      <Text style={styles.errorText}>
                        {errors.confirmPassword.message}
                      </Text>
                    )}
                  </>
                )}
              />

              {/* Server/Auth error */}
              {authError && <Text style={styles.errorText}>{authError}</Text>}

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[styles.button, isSubmitting && { opacity: 0.7 }]}
                activeOpacity={0.9}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? t("creatingAccount") : t("signUp")}
                </Text>

              </TouchableOpacity>

              {/* Footer */}
              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-in")}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.footerText}>
                  {t("alreadyHaveAccount")}{" "}
                  <Text style={styles.footerLink}>{t("login")}</Text>
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
  errorText: {
    color: "#E63946",
    fontSize: 13,
    marginBottom: 10,
    marginTop: -8,
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
