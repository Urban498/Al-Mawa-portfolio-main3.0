/**
 * Utility functions for managing locale settings
 */

export const DEFAULT_LOCALE = 'en';

export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'ja', 'ru', 'ar', 'bn', 'as', 'ur', 'hi', 'mr', 'gu', 'ta', 'te', 'kn', 'or', 'ml', 'pa'] as const;

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

/**
 * Set the default locale to English
 */
export function setDefaultLocale(): void {
  if (typeof document !== 'undefined') {
    document.cookie = `NEXT_LOCALE=${DEFAULT_LOCALE}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

/**
 * Get the current locale from cookie, defaulting to English
 */
export function getCurrentLocale(): SupportedLocale {
  if (typeof document === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const cookies = document.cookie.split(';');
  const localeCookie = cookies.find(c => c.trim().startsWith('NEXT_LOCALE='));
  const cookieLocale = localeCookie?.split('=')[1] || DEFAULT_LOCALE;
  
  // Ensure the locale is supported, otherwise default to English
  return SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale) 
    ? cookieLocale as SupportedLocale 
    : DEFAULT_LOCALE;
}

/**
 * Set a specific locale
 */
export function setLocale(locale: SupportedLocale): void {
  if (typeof document !== 'undefined') {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    // Reload the page to apply the new locale
    window.location.reload();
  }
}

/**
 * Reset locale to default (English)
 */
export function resetToDefaultLocale(): void {
  setLocale(DEFAULT_LOCALE);
}
