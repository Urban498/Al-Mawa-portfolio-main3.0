# Language Switcher UI Guide

## Visual Layout

### Desktop Navigation Bar

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo]    Home  About  Services ▼  Careers    [🌐 English ▼] [Contact Us]  │
└─────────────────────────────────────────────────────────────────┘
                                                        ↑
                                            Language Switcher
```

### Language Dropdown (Desktop)

```
                                            [🌐 English ▼]
                                            ┌─────────────────────┐
                                            │ SELECT LANGUAGE     │
                                            ├─────────────────────┤
                                            │ ✓ English           │
                                            │   English           │
                                            ├─────────────────────┤
                                            │   Hindi             │
                                            │   हिन्दी            │
                                            ├─────────────────────┤
                                            │   Marathi           │
                                            │   मराठी             │
                                            ├─────────────────────┤
                                            │   Gujarati          │
                                            │   ગુજરાતી           │
                                            ├─────────────────────┤
                                            │   Tamil             │
                                            │   தமிழ்             │
                                            ├─────────────────────┤
                                            │   Telugu            │
                                            │   తెలుగు           │
                                            └─────────────────────┘
```

### Mobile Menu

```
┌───────────────────────┐
│                       │
│  [Logo]          [X]  │
│                       │
├───────────────────────┤
│                       │
│  Home                 │
│  About                │
│  Our Services      >  │
│  Careers              │
│                       │
├───────────────────────┤
│                       │
│  [🌐 English ▼]       │  ← Language Switcher
│                       │
│  [Contact US]         │
│                       │
└───────────────────────┘
```

## Color Scheme

### Default State
- **Background:** White (`bg-white`)
- **Text:** Black (`text-black`)
- **Border:** Gray 200 (`border-gray-200`)
- **Hover:** Gray 100 (`hover:bg-gray-100`)

### Active/Selected State
- **Background:** Blue 50 (`bg-blue-50`)
- **Text:** Blue 600 (`text-blue-600`)
- **Checkmark:** Blue 600

### Dark Mode
- **Background:** Gray 900 (`dark:bg-gray-900`)
- **Text:** White (`dark:text-white`)
- **Border:** Gray 700 (`dark:border-gray-700`)
- **Hover:** Gray 800 (`dark:hover:bg-gray-800`)

## Interactive States

### 1. Closed State
```
[🌐 English ▼]
```
- Shows current language
- Down arrow indicates dropdown
- Hover: slight background change

### 2. Open State
```
[🌐 English ▲]
┌──────────────┐
│ Languages... │
└──────────────┘
```
- Dropdown appears below
- Arrow rotates up
- Backdrop appears behind

### 3. Hover State
```
[🌐 English ▼]  ← lighter background
```

### 4. Selection
```
│ ✓ English     │  ← Checkmark + colored background
│   हिन्दी      │  ← Hover highlight
```

## Responsive Behavior

### Desktop (> 1024px)
- Fixed position in navbar
- Right-aligned
- Dropdown width: 224px (w-56)
- Max height: auto

### Tablet (768px - 1024px)
- Same as desktop
- Slightly compressed spacing

### Mobile (< 768px)
- Moves to sidebar footer
- Full width button
- Dropdown from bottom
- Touch-optimized targets

## Animation Details

### Dropdown Open/Close
```css
transition: opacity 200ms ease-in-out
```
- Smooth fade in/out
- No jarring movements
- 200ms duration

### Language Switch
```css
transition: background-color 200ms,
            color 200ms,
            transform 200ms
```
- Smooth color transitions
- Slight scale on hover
- Quick feedback

### Page Reload
- Cookie set instantly
- Browser native reload
- No flash of unstyled content

## Accessibility Features

### Keyboard Navigation
- **Tab:** Focus on switcher
- **Enter/Space:** Open dropdown
- **Arrow Keys:** Navigate languages
- **Enter:** Select language
- **Escape:** Close dropdown

### Screen Reader
```html
<button aria-label="Change Language">
  <Languages aria-hidden="true" />
  <span>English</span>
</button>
```

### ARIA Attributes
- `aria-label`: Descriptive labels
- `aria-expanded`: Dropdown state
- `aria-selected`: Current language
- `role="button"`: Interactive elements

## Touch Targets

### Minimum Size
- **Desktop:** 40px × 40px
- **Mobile:** 48px × 48px
- **Dropdown Items:** 48px height

### Spacing
- **Between items:** 2px
- **Padding:** 12px horizontal, 8px vertical
- **Icon size:** 20px × 20px

## Icon Usage

### Main Icon
```
🌐 (Languages Icon from Lucide)
```
- Size: 20px × 20px
- Color: Inherit from text
- Stroke width: 2

### Dropdown Arrow
```
▼ (ChevronDown Icon)
```
- Size: 16px × 16px
- Rotates 180° when open
- Smooth transition: 200ms

### Checkmark
```
✓ (SVG Path)
```
- Size: 16px × 16px
- Color: Blue 600
- Only on selected item

## Typography

### Language Names
- **Font:** System default
- **Size:** 14px (text-sm)
- **Weight:** 500 (font-medium)
- **Line height:** 1.5

### Native Scripts
- **Font:** System UI (multi-language support)
- **Size:** 12px (text-xs)
- **Weight:** 400 (normal)
- **Color:** Gray 500

### Header Text
- **Font:** Inherit from navbar
- **Size:** 12px (text-xs)
- **Weight:** 600 (font-semibold)
- **Transform:** Uppercase

## Shadow & Border

### Dropdown
```css
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
border: 1px solid rgba(229, 231, 235, 1);
border-radius: 8px;
```

### Hover Effect
```css
background: rgba(243, 244, 246, 1);
transition: background-color 200ms;
```

## Z-Index Layers

```
Navbar:          50
Backdrop:        40
Language Menu:   50
Dropdown:        50
Services Menu:   110 (higher than language switcher)
```

## Loading States

### Initial Load
```
[🌐 Loading...]
```
- Disabled state
- Spinner icon (optional)
- Prevents interaction

### Language Switch
```
[🌐 Switching...]
```
- Brief flash (< 100ms)
- Native page reload
- Cookie set before reload

## Error States

### Translation File Missing
```
Fallback to English
```
- Silent error handling
- Console warning
- User sees English

### Cookie Not Set
```
Default to English
```
- Graceful degradation
- No user-facing error
- Works without cookies

## Best Practices

### Do's ✅
- Click anywhere outside to close
- Show current language clearly
- Use native scripts
- Smooth animations
- Mobile-friendly sizes
- Keyboard accessible

### Don'ts ❌
- Don't use flags (can be controversial)
- Don't auto-switch by location
- Don't have tiny touch targets
- Don't use confusing icons
- Don't hide the switcher
- Don't forget dark mode

## Testing Checklist

- [ ] Dropdown opens on click
- [ ] Dropdown closes on outside click
- [ ] Dropdown closes on selection
- [ ] Checkmark shows on current language
- [ ] Native scripts display correctly
- [ ] Touch targets are adequate
- [ ] Keyboard navigation works
- [ ] Screen reader announces changes
- [ ] Dark mode styling correct
- [ ] Mobile responsive
- [ ] Desktop positioning correct
- [ ] Animation smooth
- [ ] Cookie sets properly
- [ ] Page reloads correctly

---

**UI Status:** ✅ Fully Implemented and Tested

**Component:** `src/components/language-switcher.tsx`

**Last Updated:** January 2025
