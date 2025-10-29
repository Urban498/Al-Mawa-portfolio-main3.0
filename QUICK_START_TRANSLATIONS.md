# Quick Start Guide - Using Translations

## For Non-Technical Users

### How to Change Language on the Website

1. **On Desktop:**
   - Look at the top right corner of the page
   - Find the globe icon (🌐) next to "Contact Us" button
   - Click on it
   - Choose your preferred language from the list
   - The page will refresh in your selected language

2. **On Mobile:**
   - Tap the menu icon (☰) at the top
   - Scroll down to the bottom
   - Tap on the language selector
   - Choose your language
   - The page will refresh

### Available Languages:
- 🇬🇧 English
- 🇮🇳 हिन्दी (Hindi)
- 🇮🇳 मराठी (Marathi)
- 🇮🇳 ગુજરાતી (Gujarati)
- 🇮🇳 தமிழ் (Tamil)
- 🇮🇳 తెలుగు (Telugu)

---

## For Developers

### Step 1: Import the Hook

```tsx
import { useTranslations } from 'next-intl';
```

### Step 2: Use in Your Component

```tsx
function MyComponent() {
  const t = useTranslations('sectionName');
  
  return <h1>{t('keyName')}</h1>;
}
```

### Step 3: Common Examples

#### Navigation
```tsx
const t = useTranslations('nav');
<Link href="/">{t('home')}</Link>
<Link href="/about">{t('about')}</Link>
<Link href="/contact">{t('contact')}</Link>
```

#### Hero Section
```tsx
const t = useTranslations('hero');
<h1>{t('welcome')}</h1>
<p>{t('subtitle')}</p>
<button>{t('cta')}</button>
```

#### Services
```tsx
const t = useTranslations('services');
<span>{t('realEstate')}</span>
<span>{t('hr')}</span>
<span>{t('legal')}</span>
```

#### Common Buttons
```tsx
const t = useTranslations('common');
<button>{t('submit')}</button>
<button>{t('cancel')}</button>
<button>{t('learnMore')}</button>
```

### Step 4: Multiple Sections in One Component

```tsx
function HomePage() {
  const nav = useTranslations('nav');
  const hero = useTranslations('hero');
  const common = useTranslations('common');
  
  return (
    <div>
      <nav>
        <Link href="/">{nav('home')}</Link>
      </nav>
      <section>
        <h1>{hero('welcome')}</h1>
        <button>{common('learnMore')}</button>
      </section>
    </div>
  );
}
```

---

## Translation File Structure

### Location
All translation files are in the `/messages/` folder:
```
messages/
├── en.json  (English)
├── hi.json  (Hindi)
├── mr.json  (Marathi)
├── gu.json  (Gujarati)
├── ta.json  (Tamil)
└── te.json  (Telugu)
```

### Structure
```json
{
  "nav": {
    "home": "Home",
    "about": "About"
  },
  "hero": {
    "welcome": "Welcome"
  }
}
```

---

## Adding New Translations

### Step 1: Add to English File
Open `messages/en.json` and add your key:
```json
{
  "mySection": {
    "myNewKey": "My English Text"
  }
}
```

### Step 2: Add to All Language Files
Add the same structure to `hi.json`, `mr.json`, `gu.json`, `ta.json`, `te.json`:
```json
{
  "mySection": {
    "myNewKey": "मेरा हिंदी पाठ"
  }
}
```

### Step 3: Use in Component
```tsx
const t = useTranslations('mySection');
<div>{t('myNewKey')}</div>
```

---

## Common Patterns

### 1. Conditional Text
```tsx
const t = useTranslations('common');
<button>
  {isLoading ? t('loading') : t('submit')}
</button>
```

### 2. Dynamic Content
```tsx
const t = useTranslations('services');
const services = ['realEstate', 'hr', 'legal'];

return services.map(service => (
  <div key={service}>{t(service)}</div>
));
```

### 3. With Variables (Coming Soon)
```tsx
// Future feature
const t = useTranslations('messages');
<p>{t('welcome', { name: 'John' })}</p>
// "Welcome, John!"
```

---

## Troubleshooting

### Problem: Text not translating
**Solution:** Make sure you're using the correct section and key names

### Problem: Missing translation
**Solution:** Check that the key exists in all language JSON files

### Problem: Wrong language showing
**Solution:** Clear browser cookies and try again

### Problem: Build error
**Solution:** Verify all JSON files have valid syntax (use JSON validator)

---

## Best Practices

### ✅ Do:
- Use descriptive key names
- Keep translations organized by section
- Add new keys to ALL language files
- Test in all languages before deploying

### ❌ Don't:
- Mix hardcoded text with translations
- Use English text as keys
- Forget to update all language files
- Have inconsistent key names across files

---

## Quick Reference Card

| Task | Code |
|------|------|
| Import hook | `import { useTranslations } from 'next-intl'` |
| Use translation | `const t = useTranslations('section')` |
| Display text | `{t('key')}` |
| Multiple sections | Use multiple `useTranslations()` calls |
| Add new translation | Add to all JSON files in `/messages/` |

---

## Most Used Translation Keys

### Navigation (nav)
- `home`, `about`, `services`, `careers`, `contact`

### Hero (hero)
- `welcome`, `subtitle`, `title`, `description`, `cta`

### Services (services)
- `realEstate`, `hr`, `legal`, `accounting`, `business`
- `insurance`, `sales`, `architect`, `travel`, `import`
- `vehicle`, `event`, `visa`, `social`, `workshop`

### Common (common)
- `learnMore`, `readMore`, `viewAll`
- `submit`, `cancel`, `close`, `save`
- `loading`

### About (about)
- `title`, `subtitle`, `description`
- `ourStory`, `ourMission`, `ourValues`
- `meetTeam`, `readyToWork`

### Contact (contact)
- `title`, `sales`, `support`, `general`
- `getDirections`, `contactOffice`

---

## Testing Your Implementation

### 1. Visual Test
```bash
npm run dev
```
- Switch to each language
- Verify text appears correctly
- Check for missing translations

### 2. Build Test
```bash
npm run build
```
- Should complete without errors
- All translations should load

### 3. Browser Test
- Test in Chrome, Firefox, Safari
- Test on mobile devices
- Verify cookie persistence

---

## Getting Help

### Documentation Files
- `MULTI_LANGUAGE_SETUP.md` - Full technical details
- `HOW_TO_USE_LANGUAGE_SWITCHER.md` - Detailed usage guide
- `LANGUAGE_IMPLEMENTATION_SUMMARY.md` - Project overview
- `LANGUAGE_SWITCHER_UI_GUIDE.md` - UI/UX details
- `QUICK_START_TRANSLATIONS.md` - This file

### Need Support?
Contact the development team with:
1. What you're trying to do
2. What's not working
3. Error messages (if any)
4. Browser/device information

---

**Status:** Ready to Use ✅

**Version:** 1.0.0

**Updated:** January 2025
