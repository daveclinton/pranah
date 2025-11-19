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
      tagline: "Your Digital Aqua Farming Assistant.",
      continueEmail: "Continue with Email",
      continueGoogle: "Continue with Google",
      alreadyHaveAccount: "Already have an account",
      login: "Login",
      or: "or",

      welcomeBack: "Welcome Back",
      enterEmail: "Enter your email",
      password: "Password",
      rememberMe: "Remember Me",
      forgotPassword: "Forgot Password?",
      signingIn: "Signing In...",
      signIn: "Sign In",
      dontHaveAccount: "Don’t have an account?",
      signUp: "Sign Up",

      emailRequired: "Email is required",
      invalidEmail: "Invalid email address",
      passwordRequired: "Password is required",
      passwordMin: "Password must be at least 8 characters",
      unexpectedError: "An unexpected error occurred. Please try again.",

      createAccount: "Create Account",
      firstName: "First Name",
      middleNameOptional: "Middle Name (Optional)",
      phoneNumber: "Phone Number",
      confirmPassword: "Confirm Password",
      creatingAccount: "Creating Account...",
      passwordLong: "Password too long",
      confirmPasswordRequired: "Confirm your password",
      passwordsDoNotMatch: "Passwords do not match"

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
      tagline: "আপনার ডিজিটাল একোয়া ফার্মিং সহকারী.",
      continueEmail: "ইমেইল দিয়ে চালিয়ে যান",
      continueGoogle: "গুগল দিয়ে চালিয়ে যান",
      alreadyHaveAccount: "ইতিমধ্যে একটি অ্যাকাউন্ট আছে",
      login: "লগইন",
      or: "অথবা",

      welcomeBack: "ফিরে আসার জন্য স্বাগতম",
      enterEmail: "আপনার ইমেইল লিখুন",
      password: "পাসওয়ার্ড",
      rememberMe: "মনে রাখুন",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      signingIn: "সাইন ইন হচ্ছে...",
      signIn: "সাইন ইন",
      dontHaveAccount: "অ্যাকাউন্ট নেই?",
      signUp: "সাইন আপ",

      emailRequired: "ইমেইল প্রয়োজন",
      invalidEmail: "অবৈধ ইমেইল",
      passwordRequired: "পাসওয়ার্ড প্রয়োজন",
      passwordMin: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর হতে হবে",
      unexpectedError: "একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।",

      createAccount: "অ্যাকাউন্ট তৈরি করুন",
      firstName: "নামের প্রথম অংশ",
      middleNameOptional: "মধ্য নাম (ঐচ্ছিক)",
      phoneNumber: "ফোন নম্বর",
      confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
      creatingAccount: "অ্যাকাউন্ট তৈরি হচ্ছে...",
      passwordLong: "পাসওয়ার্ড খুব লম্বা",
      confirmPasswordRequired: "আপনার পাসওয়ার্ড নিশ্চিত করুন",
      passwordsDoNotMatch: "পাসওয়ার্ড মেলেনি"

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
      tagline: "Tu asistente digital de acuicultura.",
      continueEmail: "Continuar con correo electrónico",
      continueGoogle: "Continuar con Google",
      alreadyHaveAccount: "Ya tienes una cuenta",
      login: "Iniciar sesión",
      or: "o",

      welcomeBack: "Bienvenido de nuevo",
      enterEmail: "Ingresa tu correo",
      password: "Contraseña",
      rememberMe: "Recuérdame",
      forgotPassword: "¿Olvidaste tu contraseña?",
      signingIn: "Iniciando...",
      signIn: "Iniciar sesión",
      dontHaveAccount: "¿No tienes una cuenta?",
      signUp: "Regístrate",

      emailRequired: "El correo es obligatorio",
      invalidEmail: "Correo inválido",
      passwordRequired: "La contraseña es obligatoria",
      passwordMin: "La contraseña debe tener al menos 8 caracteres",
      unexpectedError: "Ocurrió un error. Inténtalo de nuevo.",

      createAccount: "Crear cuenta",
      firstName: "Nombre",
      middleNameOptional: "Segundo nombre (Opcional)",
      phoneNumber: "Número de teléfono",
      confirmPassword: "Confirmar contraseña",
      creatingAccount: "Creando cuenta...",
      passwordLong: "Contraseña demasiado larga",
      confirmPasswordRequired: "Confirma tu contraseña",
      passwordsDoNotMatch: "Las contraseñas no coinciden"


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
      tagline: "உங்கள் டிஜிட்டல் நீர்வள விவசாய உதவியாளர்.",
      continueEmail: "மின்னஞ்சலுடன் தொடரவும்",
      continueGoogle: "கூகுளுடன் தொடரவும்",
      alreadyHaveAccount: "உங்களிடம் கணக்கு உள்ளது",
      login: "உள்நுழைக",
      or: "அல்லது",

      welcomeBack: "திரும்ப வந்ததற்கு வரவேற்கிறோம்",
      enterEmail: "உங்கள் மின்னஞ்சல் எழுதவும்",
      password: "கடவுச்சொல்",
      rememberMe: "என்னை நினைவில் கொள்",
      forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
      signingIn: "உள்நுழைகிறது...",
      signIn: "உள்நுழை",
      dontHaveAccount: "உங்களுக்கு கணக்கு இல்லையா?",
      signUp: "பதிவு செய்க",

      emailRequired: "மின்னஞ்சல் தேவை",
      invalidEmail: "தவறான மின்னஞ்சல்",
      passwordRequired: "கடவுச்சொல் தேவை",
      passwordMin: "கடவுச்சொல் குறைந்தது 8 எழுத்துகள் இருக்க வேண்டும்",
      unexpectedError: "பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.",

      createAccount: "கணக்கை உருவாக்கவும்",
      firstName: "முதல் பெயர்",
      middleNameOptional: "நடுத்தர பெயர் (விருப்பம்)",
      phoneNumber: "தொலைபேசி எண்",
      confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      creatingAccount: "கணக்கு உருவாக்கப்படுகிறது...",
      passwordLong: "கடவுச்சொல் மிகவும் நீளமாக உள்ளது",
      confirmPasswordRequired: "உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்",
      passwordsDoNotMatch: "கடவுச்சொல் பொருந்தவில்லை"

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
      tagline: "మీ డిజిటల్ ఆక్వా ఫార్మింగ్ సహాయకుడు.",
      continueEmail: "ఈమెయిల్ తో కొనసాగండి",
      continueGoogle: "గూగుల్ తో కొనసాగండి",
      alreadyHaveAccount: "మీకు ఇప్పటికే ఖాతా ఉంది",
      login: "లాగిన్",
      or: "లేదా",

      welcomeBack: "తిరిగి స్వాగతం",
      enterEmail: "మీ ఇమెయిల్ నమోదు చేయండి",
      password: "పాస్‌వర్డ్",
      rememberMe: "నన్ను గుర్తుంచుకోండి",
      forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
      signingIn: "లాగిన్ అవుతోంది...",
      signIn: "లాగిన్ చేయండి",
      dontHaveAccount: "ఖాతా లేదా?",
      signUp: "సైన్ అప్",

      emailRequired: "ఇమెయిల్ అవసరం",
      invalidEmail: "చెల్లని ఇమెయిల్",
      passwordRequired: "పాస్‌వర్డ్ అవసరం",
      passwordMin: "పాస్‌వర్డ్ కనీసం 8 అక్షరాలు ఉండాలి",
      unexpectedError: "లోపం జరిగింది. మళ్లీ ప్రయత్నించండి.",

      createAccount: "ఖాతాను సృష్టించండి",
      firstName: "మొదటి పేరు",
      middleNameOptional: "మధ్య పేరు (ఐచ్చికం)",
      phoneNumber: "ఫోన్ నంబర్",
      confirmPassword: "పాస్‌వర్డ్‌ను నిర్ధారించండి",
      creatingAccount: "ఖాతా సృష్టిస్తోంది...",
      passwordLong: "పాస్‌వర్డ్ చాలా పొడవుగా ఉంది",
      confirmPasswordRequired: "మీ పాస్‌వర్డ్‌ను నిర్ధారించండి",
      passwordsDoNotMatch: "పాస్‌వర్డ్‌లు సరిపోలడం లేదు"
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
