import Onboarding from "@blazejkustra/react-native-onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const ONBOARDING_COMPLETED_KEY = "onboarding_completed";

export default function MyOnboarding() {
  return (
    <Onboarding
      introPanel={{
        title: "Welcome to My App",
        subtitle: "Let's get you started",
        button: "Get Started",
        image: require("@/assets/images/icon.png"),
      }}
      steps={[
        {
          title: "Step 1",
          description: "This is the first step of your journey",
          buttonLabel: "Next",
          image: require("@/assets/images/icon.png"),
          position: "top",
        },
        {
          title: "Step 2",
          description: "Learn about our amazing features",
          buttonLabel: "Continue",
          image: require("@/assets/images/icon.png"),
          position: "bottom",
        },
      ]}
      onComplete={async () => {
        await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");
        console.log("Onboarding completed!");
      }}
      onSkip={() => console.log("Onboarding skipped")}
      onStepChange={(step) => console.log("Current step:", step)}
    />
  );
}
