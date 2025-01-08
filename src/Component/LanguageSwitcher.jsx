import React from "react";
import { useLanguage } from "../Contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setLanguage("en")}
        className={`p-2 rounded ${language === "en" ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"}`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage("ar")}
        className={`p-2 rounded ${language === "ar" ? "bg-indigo-600 text-white" : "bg-gray-200 text-black"}`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;