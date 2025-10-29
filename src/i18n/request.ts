import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type SupportedLocale } from '../utils/locale-utils';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value || DEFAULT_LOCALE;
  
  // Ensure the locale is supported, otherwise default to English
  const locale: SupportedLocale = SUPPORTED_LOCALES.includes(cookieLocale as SupportedLocale) 
    ? cookieLocale as SupportedLocale 
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
