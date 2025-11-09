import React, { useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Haptics from "expo-haptics";

type StepProps = {
  step: number;
  totalSteps: number;
  question: string;
  options: string[];
  onContinue: (answer: string) => void;
  onSkip?: () => void;
};

export default function StepScreen({
  step,
  totalSteps,
  question,
  options,
  onContinue,
  onSkip,
}: StepProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const progress = step / totalSteps;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header progress section */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[styles.progressBarFill, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.stepText}>
            Step {step} of {totalSteps}
          </Text>
        </View>

        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Question */}
      <View style={styles.questionWrapper}>
        <Text style={styles.question}>{question}</Text>
      </View>

      {/* Options */}
      <FlatList
        data={options}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = selected === item;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => {
                Haptics.selectionAsync();
                setSelected(item);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.optionsContainer}
      />

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueButton, !selected && { opacity: 0.5 }]}
        disabled={!selected}
        activeOpacity={0.9}
        onPress={() => selected && onContinue(selected)}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#02271D",
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  progressContainer: {
    flex: 1,
    marginRight: 10,
  },
  progressBarBackground: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C5FC61",
  },
  stepText: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 6,
  },
  skipText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  questionWrapper: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 14,
  },
  option: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionSelected: {
    borderColor: "#C5FC61",
  },
  optionText: {
    color: "#02271D",
    fontWeight: "500",
    fontSize: 16,
  },
  optionTextSelected: {
    color: "#012B20",
    fontWeight: "700",
  },
  continueButton: {
    backgroundColor: "#C5FC61",
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 16,
    marginTop: 40,
    marginBottom: 24,
  },
  continueText: {
    color: "#02271D",
    fontWeight: "700",
    fontSize: 16,
  },
});
