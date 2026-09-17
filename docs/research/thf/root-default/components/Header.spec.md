# Header Component Specification

## Overview
- **Target file:** `src/components/sites/thf/root-default/Header.tsx`
- **Screenshot:** `docs/design-references/thf/root-default/desktop-1440.png`
- **Interaction model:** Click-driven dropdowns & Mobile Drawer toggle + Sticky scroll state

## Styling Tokens
- `background`: `rgba(8, 12, 18, 0.80)`
- `backdrop-filter`: `blur(22px)`
- `border-bottom`: `1px solid rgba(244, 249, 255, 0.05)`
- `height`: `clamp(50px, 6vw, 68px)`
- `font-family`: `var(--font-inter)`
- `color`: `rgba(244, 249, 255, 0.78)` (hover: `rgba(244, 249, 255, 0.95)`)

## Navigation Items
1. **SHOP ALL** (Dropdown menu trigger)
2. **GIFTING** (Dropdown menu trigger with sub-items: Weddings, Corporate, Build Your Own Box)
3. **Our Story** (`/our-story`)
4. **Events** (`/events`)
5. **Stores** (`/store-locator`, styled pill button with MapPin icon)
6. **Icons:** Profile (User icon), THF Brew Club (Cup icon with wobble animation), Cart (Bag icon), Mobile Hamburger button

## Responsive Specs
- **Desktop (>=1317px):** Full horizontal navigation with logo height ~35px.
- **Mobile (<1317px):** Hamburger menu icon toggles slide-over menu drawer. Logo height ~18px-26px.
