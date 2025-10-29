# How to Test Translations

## What's Already Working

The language switcher is now fully functional with translations for:

✅ **Navigation Menu** (Header & Mobile Sidebar)
- Home / होम / முகப்பு / హోమ్ / ગૃહ / मुख्यपृष्ठ
- About / हमारे बारे में / எங்களைப் பற்றி / మా గురించి / અમારા વિશે / आमच्याबद्दल
- Services / हमारी सेवाएं / எங்கள் சேவைகள் / మా సేవలు / અમારી સેવાઓ / आमच्या सेवा
- Careers / करियर / வாழ்க்கை / కెరీర్స్ / કારકિર્દી / करिअर
- Contact Us / संपर्क करें / தொடர்பு கொள்ளுங்கள் / సంప్రదించండి / સંપર્ક કરો / संपर्क करा

✅ **Contact Page**
- Title: "Reach Out To Us" changes to:
  - Hindi: हम तक पहुंचें
  - Marathi: आमच्याशी संपर्क साधा
  - Gujarati: અમારો સંપર્ક કરો
  - Tamil: எங்களை தொடர்பு கொள்ளுங்கள்
  - Telugu: మమ్మల్ని సంప్రదించండి

## How to See It Working

### Step 1: Start the development server
```bash
npm run dev
```

### Step 2: Open your browser
Navigate to: `http://localhost:3000`

### Step 3: Test the Language Switcher

#### On Desktop:
1. Look at the **top right corner** of the navigation bar
2. You'll see a **globe icon (🌐)** next to "Contact Us"
3. Click on it
4. A dropdown will appear showing all languages
5. Click on any language (e.g., हिन्दी)
6. The page will reload
7. **Navigation menu items will now show in Hindi**

#### On Mobile:
1. Click the **hamburger menu (☰)** at the top
2. Scroll to the bottom of the sidebar
3. You'll see the language switcher
4. Tap it to see all languages
5. Select any language
6. The page reloads
7. **All navigation text changes to that language**

### Step 4: Verify the Changes

After selecting a language, check:
- ✅ Top navigation items changed language
- ✅ Mobile menu items changed language  
- ✅ Contact page title changed language
- ✅ Selected language has a checkmark in the dropdown
- ✅ Cookie is set (check browser dev tools → Application → Cookies → NEXT_LOCALE)

## What Text Changes

### Currently Translated:
1. **Header/Navigation**
   - Home
   - About
   - Our Services
   - Careers
   - Contact Us

2. **Mobile Sidebar**
   - All menu items
   - Contact button

3. **Contact Page**
   - Page title

## Adding More Translations

To add translations to other pages (e.g., Hero section, About page), update the component like this:

```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function YourPage() {
  const t = useTranslations('hero'); // or 'about', 'services', etc.
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

## Translation Keys Available

All translation keys are in `/messages/*.json` files:

- `nav.*` - Navigation items
- `hero.*` - Hero section
- `services.*` - All service names  
- `about.*` - About page content
- `contact.*` - Contact page
- `common.*` - Buttons and common UI elements

## Demo Video Script

Here's what you should see when testing:

1. **Initial State** - Everything in English
2. **Click Language Switcher** - Dropdown opens
3. **Select Hindi** - Page reloads
4. **Result**: 
   - "Home" → "होम"
   - "About" → "हमारे बारे में"  
   - "Services" → "हमारी सेवाएं"
   - "Careers" → "करियर"
   - "Contact Us" → "संपर्क करें"

## Troubleshooting

### Problem: Text not changing
**Solution**: Make sure you're looking at the navigation menu - that's what's currently translated.

### Problem: Page shows error
**Solution**: Run `npm install` and then `npm run dev` again

### Problem: Language switcher not visible
**Solution**: 
- Desktop: Look top right, next to "Contact Us" button
- Mobile: Open menu, scroll to bottom

### Problem: Selected language doesn't stay selected
**Solution**: Check if cookies are enabled in your browser

## Next Steps

To fully translate the entire website:
1. Add `useTranslations` hook to each page component
2. Replace hardcoded text with `t('key')` calls
3. Test each language for each page
4. Update translation JSON files if needed

---

**Status**: Navigation and Contact page translations are working ✅

**Test this now**: Run `npm run dev` and change languages in the switcher!
