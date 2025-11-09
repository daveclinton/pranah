import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { storage } from "./storage";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Aqua Pranah",
      selectLanguage: "Select Language",
      getStarted: "Get Started",
      underDevelopment: "This feature is under development.",
      english: "United States (English)",
      bengali: "Bengali",
      spanish: "Spanish",
      tamil: "Tamil",
      telugu: "Telugu",
      agreeNotice: "By continuing, you agree to our",
      terms: "Terms and Conditions",
      privacy: "Privacy Policy",
    },
  },
  bn: {
    translation: {
      welcome: "অ্যাকোয়া প্রানায় আপনাকে স্বাগতম",
      selectLanguage: "ভাষা নির্বাচন করুন",
      getStarted: "শুরু করুন",
      underDevelopment: "এই ফিচারটি এখনও উন্নয়নাধীন।",
      english: "ইংরেজি (যুক্তরাষ্ট্র)",
      bengali: "বাংলা",
      spanish: "স্প্যানিশ",
      tamil: "তামিল",
      telugu: "তেলেগু",
      agreeNotice: "চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের সাথে সম্মত হচ্ছেন",
      terms: "শর্তাবলী",
      privacy: "গোপনীয়তা নীতি",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a Aqua Pranah",
      selectLanguage: "Seleccionar idioma",
      getStarted: "Comenzar",
      underDevelopment: "Esta función está en desarrollo.",
      english: "Inglés (Estados Unidos)",
      bengali: "Bengalí",
      spanish: "Español",
      tamil: "Tamil",
      telugu: "Telugu",
      agreeNotice: "Al continuar, aceptas nuestros",
      terms: "Términos y Condiciones",
      privacy: "Política de Privacidad",
    },
  },
  ta: {
    translation: {
      welcome: "Aqua Pranah க்கு வரவேற்கிறோம்",
      selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
      getStarted: "தொடங்கு",
      underDevelopment: "இப்பணி வளர்ச்சியில் உள்ளது.",
      english: "ஆங்கிலம் (அமெரிக்கா)",
      bengali: "பெங்காலி",
      spanish: "ஸ்பானிஷ்",
      tamil: "தமிழ்",
      telugu: "தெலுங்கு",
      agreeNotice: "தொடர்வதன் மூலம், நீங்கள் எங்கள்",
      terms: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
      privacy: "தனியுரிமை கொள்கை",
    },
  },
  te: {
    translation: {
      welcome: "Aqua Pranah కు స్వాగతం",
      selectLanguage: "భాషను ఎంచుకోండి",
      getStarted: "ప్రారంభించండి",
      underDevelopment: "ఈ ఫీచర్ అభివృద్ధిలో ఉంది.",
      english: "ఇంగ్లీష్ (అమెరికా)",
      bengali: "బెంగాలీ",
      spanish: "స్పానిష్",
      tamil: "తమిళం",
      telugu: "తెలుగు",
      agreeNotice: "కొనసాగించడం ద్వారా మీరు మా",
      terms: "నియమాలు మరియు షరతులు",
      privacy: "గోప్యతా విధానం",
    },
  },
};

const savedLang = storage.getString("APP_LANGUAGE") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
