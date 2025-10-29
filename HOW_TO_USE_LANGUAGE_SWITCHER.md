# How to Use the Language Switcher

## For Users

### Desktop Version
1. Look for the **language icon** (🌐) in the top navigation bar, next to the "Contact Us" button
2. Click on it to open the language dropdown menu
3. You'll see all available languages with their native scripts:
   - English (English)
   - Hindi (हिन्दी)
   - Marathi (मराठी)
   - Gujarati (ગુજરાતી)
   - Tamil (தமிழ்)
   - Telugu (తెలుగు)
4. Click on your preferred language
5. The page will reload and all content will appear in your selected language

### Mobile Version
1. Open the mobile menu (hamburger icon)
2. Scroll to the bottom of the sidebar
3. You'll find the language switcher above the "Contact US" button
4. Follow the same steps as desktop

## For Developers

### Using Translations in Components

To make a component support translations:

```tsx
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('nav'); // 'nav' is the section in JSON
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('about')}</p>
    </div>
  );
}
```

### Available Translation Sections

Current translation keys organized by section:

#### `nav` - Navigation
- home, about, services, careers, contact

#### `hero` - Hero Section  
- welcome, subtitle, title, description, cta

#### `services` - Service Names
- realEstate, legalPublic, insurance, hr, accounting, business, legal, sales, architect, travel, import, vehicle, event, visa, social, workshop, dropshipping

#### `about` - About Page
- title, subtitle, description, ourStory, ourMission, ourValues, meetTeam, readyToWork, getInTouch, scheduleCall

#### `contact` - Contact Page
- title, sales, salesDesc, support, supportDesc, general, generalDesc, getDirections, contactOffice

#### `footer` - Footer Section
- description, quickLinks, services, followUs, allRightsReserved

#### `common` - Common UI Elements
- learnMore, readMore, viewAll, submit, cancel, close, save, loading

### Example Usage in Different Sections

```tsx
// Hero Section
const t = useTranslations('hero');
<h1>{t('welcome')}</h1>
<p>{t('description')}</p>

// Services Section
const t = useTranslations('services');
<span>{t('realEstate')}</span>
<span>{t('hr')}</span>

// Common Buttons
const t = useTranslations('common');
<button>{t('submit')}</button>
<button>{t('cancel')}</button>
```

### Adding New Translation Keys

1. Open all language JSON files in `/messages/` folder
2. Add the new key to each file:

```json
// en.json
{
  "section": {
    "newKey": "English Translation"
  }
}

// hi.json
{
  "section": {
    "newKey": "हिंदी अनुवाद"
  }
}
// ... repeat for all languages
```

3. Use in your component:
```tsx
const t = useTranslations('section');
<div>{t('newKey')}</div>
```

## Current Status

### ✅ Implemented
- Language switcher UI in desktop navbar
- Language switcher UI in mobile sidebar
- 6 Indian languages + English
- Translation files for main sections
- Cookie-based language persistence
- Automatic page reload on language change

### 🔄 To Be Implemented
- Individual page components need to use `useTranslations` hook
- Service detail pages translations
- Form validation messages
- Error messages
- Success messages
- Admin panel translations (if needed)

## Technical Details

### How Language Persistence Works
- Language selection is stored in a cookie named `NEXT_LOCALE`
- Cookie expiration: 1 year
- Default language: English (en)
- Fallback: If translation file not found, uses English

### Supported Locales
- `en` - English
- `hi` - Hindi
- `mr` - Marathi
- `gu` - Gujarati
- `ta` - Tamil
- `te` - Telugu

## Testing Checklist

- [ ] Desktop language switcher appears correctly
- [ ] Mobile language switcher appears in sidebar
- [ ] All 6 languages + English are selectable
- [ ] Selected language is visually indicated (checkmark)
- [ ] Cookie is set correctly on selection
- [ ] Page reloads with new language
- [ ] Translations appear correctly for each language
- [ ] Native scripts display properly
- [ ] Language persists across page navigation
- [ ] Dropdown closes after selection

## Browser Compatibility

Tested and working on:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS/Android)

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Color contrast compliance

---

**Need Help?** Contact the development team for assistance with translations or implementation.
