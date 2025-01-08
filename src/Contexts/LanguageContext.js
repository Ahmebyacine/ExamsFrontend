import React, { useEffect,createContext, useState, useContext } from "react";
import en from "../Assets/Locales/en";
import ar from "../Assets/Locales/ar";

const LanguageContext = createContext();

const translations = { en, ar };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const t = (key) => translations[language][key] || key;
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);