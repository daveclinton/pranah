import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const LANGUAGES = [
  {
    code: "en",
    name: "United States (English)",
    flag: require("@/assets/flags/us.png"),
  },
  {
    code: "bn",
    name: "Bengali",
    flag: require("@/assets/flags/bd.png"),
  },
  {
    code: "es",
    name: "Spanish",
    flag: require("@/assets/flags/es.png"),
  },
  {
    code: "ta",
    name: "Tamil",
    flag: require("@/assets/flags/sg.png"),
  },
  {
    code: "te",
    name: "Telugu",
    flag: require("@/assets/flags/in.png"),
  },
];

export default function LanguageSelectionScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("bn");

  const handleSelect = (code: string) => {
    setSelectedLanguage(code);
  };

  const handleGetStarted = () => {
    console.log("Language selected:", selectedLanguage);
    // You might navigate or save selection here
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Select Language</Text>

        {LANGUAGES.map((item) => (
          <TouchableOpacity
            key={item.code}
            onPress={() => handleSelect(item.code)}
            style={[
              styles.languageCard,
              selectedLanguage === item.code && styles.selectedCard,
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.languageRow}>
              <Image source={item.flag} style={styles.flag} />
              <Text
                style={[
                  styles.languageText,
                  selectedLanguage === item.code && styles.selectedText,
                ]}
              >
                {item.name}
              </Text>
            </View>

            <View
              style={[
                styles.radioOuter,
                selectedLanguage === item.code && styles.radioOuterSelected,
              ]}
            >
              {selectedLanguage === item.code && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 32 }} />

        <TouchableOpacity
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>By continuing, you agree to our</Text>

        <View style={styles.footerLinks}>
          <Text style={styles.link}>Terms and Conditions</Text>
          <Text style={styles.andText}>&</Text>
          <Text style={styles.link}>Privacy Policy</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
    paddingHorizontal: 24,
    paddingTop: 72,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 32,
  },
  languageCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#043829",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 24,
  },
  selectedCard: {
    backgroundColor: "#094F3A",
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flag: {
    width: 28,
    height: 20,
    resizeMode: "contain",
    marginRight: 14,
  },
  languageText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
  selectedText: {
    color: "#E4FFE1",
    fontWeight: "600",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#FFFFFF99",
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: "#C5FCA5",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C5FCA5",
  },
  button: {
    backgroundColor: "#C5FC61",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  buttonText: {
    color: "#02271D",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  footerText: {
    color: "#C3D6CF",
    fontSize: 13,
    textAlign: "center",
    marginTop: 28,
    lineHeight: 20,
  },
  footerLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 6,
  },
  andText: {
    color: "#C3D6CF",
    fontSize: 13,
    marginHorizontal: 4,
  },
  link: {
    color: "#FFFFFF",
    fontWeight: "600",
    textDecorationLine: "underline",
    fontSize: 13,
  },
});
