import { useSignIn } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { z } from "zod";

const { height } = Dimensions.get("window");



export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { t } = useTranslation();


  const signinSchema = z.object({
    emailAddress: z
      .string()
      .min(1, t("emailRequired"))
      .email(t("invalidEmail")),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(8, t("passwordMin")),
    remember: z.boolean(),
  });

  type SigninFormData = z.infer<typeof signinSchema>;


  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    if (!isLoaded) return;
    setAuthError(null);

    try {
      const result = await signIn.create({
        identifier: data.emailAddress,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/(home)");
      } else {
        console.log("Unhandled sign‑in status:", result);
      }
    } catch (err: any) {
      console.error("Sign‑in error:", err);
      const message =
        err?.errors?.[0]?.message ||
        "An unexpected error occurred. Please try again.";
      setAuthError(message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back-outline" size={24} color="white" />
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
            <Text style={styles.title}>{t("welcomeBack")}</Text>


            <View style={styles.form}>

              <Controller
                control={control}
                name="emailAddress"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <TextInput
                      placeholder={t("enterEmail")}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholderTextColor="#888"
                      style={styles.input}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {errors.emailAddress && (
                      <Text style={styles.errorText}>
                        {errors.emailAddress.message}
                      </Text>
                    )}
                  </>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        placeholder={t("password")}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholderTextColor="#888"
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword((p) => !p)}
                        style={styles.eyeIconWrapper}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={
                            showPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={22}
                          color="#555"
                        />
                      </TouchableOpacity>
                    </View>
                    {errors.password && (
                      <Text style={styles.errorText}>
                        {errors.password.message}
                      </Text>
                    )}
                  </>
                )}
              />


              <View style={styles.rowBetween}>
                <Controller
                  control={control}
                  name="remember"
                  render={({ field: { value, onChange } }) => (
                    <TouchableOpacity
                      onPress={() => onChange(!value)}
                      style={styles.rememberContainer}
                      activeOpacity={0.7}
                    >
                      {value ? (
                        <Ionicons
                          name="checkbox-outline"
                          size={20}
                          color="#C5FC61"
                        />
                      ) : (
                        <Ionicons
                          name="square-outline"
                          size={20}
                          color="#7BA78A"
                        />
                      )}
                      <Text style={styles.rememberText}>{t("rememberMe")}</Text>
                    </TouchableOpacity>
                  )}
                />

                <TouchableOpacity
                  onPress={() => router.push("/(auth)/forgot-password")}
                >
                  <Text style={styles.forgotText}>{t("forgotPassword")}</Text>

                </TouchableOpacity>
              </View>


              {authError && <Text style={styles.errorText}>{authError}</Text>}


              <TouchableOpacity
                style={[styles.button, isSubmitting && { opacity: 0.7 }]}
                activeOpacity={0.9}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? t("signingIn") : t("signIn")}
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => router.push("/(auth)/sign-up")}
                style={{ marginTop: 20 }}
              >
                <Text style={styles.footerText}>
                  {t("dontHaveAccount")}
                  <Text style={styles.footerLink}> {t("signUp")}</Text>
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: "#000",
    marginBottom: 18,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  eyeIconWrapper: {
    position: "absolute",
    right: 12,
  },
  errorText: {
    color: "#E63946",
    fontSize: 13,
    marginBottom: 10,
    marginTop: -8,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rememberText: {
    fontSize: 14,
    color: "#012D24",
  },
  forgotText: {
    color: "#012D24",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#C5FC61",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
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
