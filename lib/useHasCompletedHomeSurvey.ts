import { storage } from "@/lib/storage";
import { useMMKVBoolean } from "react-native-mmkv";

const HAS_COMPLETED_HOME_SURVEY = "HAS_COMPLETED_HOME_SURVEY";

export const useHasCompletedHomeSurvey = () => {
  const [hasCompleted, setHasCompleted] = useMMKVBoolean(
    HAS_COMPLETED_HOME_SURVEY,
    storage
  );

  if (hasCompleted === undefined) {
    return [false, setHasCompleted] as const;
  }
  return [hasCompleted, setHasCompleted] as const;
};
