"use client";

import React, { useState, useEffect } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCurrentLocale } from "@/utils/locale-utils";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ja", name: "Japanese", nativeName: "日本語" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
];

interface LanguageSwitcherProps {
  variant?: "default" | "mobile";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = "default" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  // Initialize current language from cookie on mount
  useEffect(() => {
    const locale = getCurrentLocale();
    setCurrentLang(locale);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    // Set cookie for language preference
    document.cookie = `NEXT_LOCALE=${langCode}; path=/; max-age=31536000`;
    setIsOpen(false);
    // Reload page to apply new language
    window.location.reload();
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === currentLang) || languages[0];
  };

  // Mobile variant - full width accordion style
  if (variant === "mobile") {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          aria-label="Change Language"
        >
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-gray-700" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500 font-medium">Language</span>
              <span className="text-sm font-semibold text-gray-900">
                {getCurrentLanguage().nativeName}
              </span>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-500 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Mobile Language List */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-[400px] opacity-100 mt-2" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-y-auto max-h-[350px]">
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Select Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between",
                    currentLang === lang.code &&
                      "bg-blue-50 text-blue-600"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-gray-500">
                      {lang.nativeName}
                    </span>
                  </div>
                  {currentLang === lang.code && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop variant - dropdown style
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Change Language"
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">
          {getCurrentLanguage().nativeName}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden max-h-96 overflow-y-auto">
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                Select Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between",
                    currentLang === lang.code &&
                      "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  )}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lang.nativeName}
                    </span>
                  </div>
                  {currentLang === lang.code && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
