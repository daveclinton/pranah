import i18n from "@/lib/i18n";
import { storage } from "@/lib/storage";
import { useMMKVString } from "react-native-mmkv";

const APP_LANGUAGE_KEY = "APP_LANGUAGE";

export const useLanguage = () => {
  const [lang, setLang] = useMMKVString(APP_LANGUAGE_KEY, storage);

  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return [lang || "en", changeLanguage] as const;
};
