# Multi-Language Support Implementation

## Overview
This document describes the multi-language (internationalization/i18n) implementation for Al Mawa International website, supporting 6 Indian languages plus English.

## Supported Languages

1. **English (en)** - Default
2. **Hindi (hi)** - हिन्दी
3. **Marathi (mr)** - मराठी
4. **Gujarati (gu)** - ગુજરાતી
5. **Tamil (ta)** - தமிழ்
6. **Telugu (te)** - తెలుగు

## Implementation Details

### 1. Dependencies Installed
- `next-intl` - For Next.js internationalization

### 2. File Structure

```
project/
├── messages/
│   ├── en.json      # English translations
│   ├── hi.json      # Hindi translations
│   ├── mr.json      # Marathi translations
│   ├── gu.json      # Gujarati translations
│   ├── ta.json      # Tamil translations
│   └── te.json      # Telugu translations
├── src/
│   ├── components/
│   │   ├── language-switcher.tsx    # Language selector component
│   │   ├── providers/
│   │   │   └── intl-provider.tsx   # i18n provider
│   │   ├── header.tsx              # Updated with language switcher
│   │   └── mobile-sidebar.tsx      # Updated with language switcher
│   └── i18n/
│       └── request.ts              # i18n configuration
```

### 3. Components Created/Modified

#### Language Switcher Component
- **File**: `src/components/language-switcher.tsx`
- **Features**:
  - Dropdown menu with all available languages
  - Shows both English name and native script
  - Stores selection in cookie
  - Visual indicator for selected language
  - Responsive design

#### IntlProvider
- **File**: `src/components/providers/intl-provider.tsx`
- **Purpose**: Wraps the app with next-intl context
- **Features**:
  - Reads locale from cookie
  - Dynamically loads translation files
  - Fallback to English if translation missing

#### Updated Components
1. **Header** (`src/components/header.tsx`)
   - Added language switcher to desktop navigation
   
2. **Mobile Sidebar** (`src/components/mobile-sidebar.tsx`)
   - Added language switcher to mobile menu footer

3. **Root Layout** (`src/app/layout.tsx`)
   - Wrapped with IntlProvider

### 4. Translation Structure

Each language JSON file contains translations for:
- Navigation items
- Hero section
- Services names
- About page content
- Contact page content
- Footer content
- Common UI elements

Example structure:
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    ...
  },
  "hero": {
    "welcome": "Welcome to...",
    ...
  },
  "services": {
    "realEstate": "Real Estate Services",
    ...
  }
}
```

### 5. How to Use Translations in Components

To use translations in any component, you'll need to:

1. Import `useTranslations` hook:
```tsx
import { useTranslations } from 'next-intl';
```

2. Use in component:
```tsx
const t = useTranslations('nav');
return <div>{t('home')}</div>
```

### 6. Adding New Languages

To add a new language:

1. Create a new JSON file in `/messages/` folder (e.g., `bn.json` for Bengali)
2. Copy the structure from `en.json`
3. Translate all values
4. Add the language to `src/components/language-switcher.tsx`:
```tsx
const languages = [
  ...
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
];
```

### 7. How It Works

1. User clicks language switcher in navbar
2. Dropdown shows all available languages
3. User selects a language
4. Selection is saved in browser cookie (`NEXT_LOCALE`)
5. Page reloads with new language
6. IntlProvider reads cookie and loads appropriate translation file
7. All text throughout the website updates to selected language

### 8. Current Implementation Status

✅ **Completed:**
- Infrastructure setup
- 6 Indian languages + English translations
- Language switcher UI component
- Desktop navigation integration
- Mobile sidebar integration
- Cookie-based persistence
- Translation files for all main sections

⏳ **Next Steps:**
- Update individual page components to use `useTranslations` hook
- Add translations for service detail pages
- Add translations for forms and error messages
- Test all translations for accuracy
- Add language-specific meta tags for SEO

### 9. Important Notes

1. **Cookie Storage**: Language preference is stored in `NEXT_LOCALE` cookie with 1-year expiration
2. **Default Language**: English (en) is the default fallback
3. **Page Reload**: Currently requires page reload to apply language change (can be optimized later)
4. **Translation Keys**: Use consistent key naming across all language files
5. **RTL Support**: Current implementation is LTR. RTL support can be added if needed

### 10. Testing

To test the language switching:

1. Run the development server: `npm run dev`
2. Click the language switcher icon in the navbar
3. Select different languages
4. Verify that:
   - Language cookie is set
   - Page reloads
   - Content appears in selected language
   - Mobile menu also shows language switcher

### 11. Performance

- Translation files are loaded dynamically
- Only selected language file is loaded (not all)
- Files are cached by browser
- Minimal impact on bundle size

---

## Support

For issues or questions about the multi-language implementation, please contact the development team.
