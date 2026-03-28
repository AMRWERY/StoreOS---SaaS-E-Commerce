# StoreOS — Design System
> This file is the single source of truth for all design decisions.
> Every Stitch prompt references this file. Do not deviate from these specs.

---

## 1. CONCEPT & AESTHETIC

StoreOS has **two distinct apps** sharing the same brand:

| App | Audience | Aesthetic |
|-----|----------|-----------|
| **Merchant Dashboard** | Store owners & staff | Dark, dense, data-rich — Bloomberg Terminal meets Linear |
| **Storefront** | Customers / shoppers | Light, clean, spacious — modern e-commerce, Shopify-like |

The design must feel **operational and professional** for merchants,
and **trustworthy and inviting** for customers.

---

## 2. COLOR SYSTEM

### 2A — Merchant Dashboard (Dark)

```
BACKGROUNDS (layered, darkest → lightest):
  --bg-base:      #08080E   ← page background
  --bg-primary:   #0D0D18   ← sidebar, cards
  --bg-elevated:  #141422   ← hover states, inputs
  --bg-overlay:   #1A1A2E   ← modals, dropdowns, tooltips

BORDERS:
  --border-subtle:  #1C1C30   ← subtle dividers
  --border-default: #262640   ← visible borders

TEXT:
  --text-primary:   #F0F0FF   ← headlines, important values
  --text-secondary: #8888AA   ← labels, descriptions
  --text-muted:     #50506A   ← placeholders, timestamps, captions

BRAND:
  --brand:          #6366F1   ← primary actions, active states, links
  --brand-hover:    #818CF8   ← hover on brand elements
  --brand-dim:      rgba(99,102,241,0.12)   ← brand backgrounds

ACCENT (merchant-specific):
  --orange:         #F97316   ← new orders, alerts, CTAs
  --orange-hover:   #FB923C
  --orange-dim:     rgba(249,115,22,0.12)

STATUS COLORS:
  --success:        #10B981   ← paid, delivered, in stock
  --success-dim:    rgba(16,185,129,0.12)
  --warning:        #F59E0B   ← pending, low stock, due soon
  --warning-dim:    rgba(245,158,11,0.12)
  --danger:         #EF4444   ← overdue, out of stock, cancelled
  --danger-dim:     rgba(239,68,68,0.12)
  --info:           #3B82F6   ← confirmed, informational
  --info-dim:       rgba(59,130,246,0.12)
  --purple:         #A78BFA   ← shipped status
  --purple-dim:     rgba(167,139,250,0.12)
  --yellow:         #EAB308   ← processing status
  --yellow-dim:     rgba(234,179,8,0.12)
```

### 2B — Storefront (Light)

```
BACKGROUNDS:
  --sf-bg:          #FFFFFF
  --sf-bg-subtle:   #F8F8FC
  --sf-bg-elevated: #F0F0F8

BORDERS:
  --sf-border:      #E4E4EF
  --sf-border-dark: #D0D0E0

TEXT:
  --sf-text-primary:   #0F0F1A
  --sf-text-secondary: #5A5A78
  --sf-text-muted:     #9090A8

BRAND (same as merchant, adapts to light bg):
  --sf-brand:       #6366F1
  --sf-brand-hover: #4F46E5

STATUS:
  --sf-success:     #059669
  --sf-warning:     #D97706
  --sf-danger:      #DC2626
```

---

## 3. TYPOGRAPHY

```
PRIMARY FONT:    IBM Plex Sans
  — Used for: all UI text, labels, buttons, body copy
  — Weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
  — Import: https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700

MONOSPACE FONT:  IBM Plex Mono
  — Used for: ALL numbers, prices, order numbers, invoice numbers,
              stock counts, codes, percentages, dates in tables
  — Weights: 400 (regular), 500 (medium), 600 (semibold)
  — Import: https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600

RULE: Any number shown in a UI must use IBM Plex Mono.
      This includes: EGP 450, #ORD-089, 24 units, 92%, 03/14/2025
```

### Type Scale

```
MERCHANT DASHBOARD:
  xs:   10px / 400  — captions, timestamps, badge text
  sm:   11px / 400  — table cells, secondary labels
  base: 12px / 500  — nav items, card body text
  md:   13px / 500  — primary table text, descriptions
  lg:   15px / 600  — page titles
  xl:   20px / 700  — dashboard headlines
  2xl:  22px / 600  — stat card values (IBM Plex Mono)
  3xl:  28px / 700  — hero numbers

STOREFRONT:
  xs:   11px         — fine print
  sm:   13px         — product meta, reviews
  base: 15px / 400  — body text
  md:   17px / 500  — product titles in lists
  lg:   22px / 600  — section headings
  xl:   28px / 700  — product detail title
  2xl:  36px / 700  — hero heading
  price: IBM Plex Mono, 20px, 700
```

---

## 4. SPACING & LAYOUT

```
BASE UNIT: 4px

SPACING SCALE:
  2px, 4px, 6px, 8px, 10px, 12px, 14px, 16px, 20px,
  24px, 28px, 32px, 40px, 48px, 56px, 64px

MERCHANT LAYOUT:
  Sidebar width:    220px (fixed)
  Topbar height:    52px
  Content padding:  20px (all sides)
  Card padding:     14px 16px
  Card gap:         12px
  Section gap:      20px

STOREFRONT LAYOUT:
  Max content width: 1280px (centered)
  Page padding:      0 24px (mobile: 0 16px)
  Section gap:       64px
  Product grid gap:  20px
```

---

## 5. BORDER RADIUS

```
MERCHANT (tight, professional):
  xs:  4px   ← badges, tags
  sm:  6px   ← buttons, inputs, small cards
  md:  8px   ← nav items, table rows
  lg:  10px  ← modals, dropdowns
  xl:  12px  ← main cards
  2xl: 14px  ← large cards, panels

STOREFRONT (softer):
  sm:  6px
  md:  10px
  lg:  14px
  xl:  20px
  full: 999px ← pill buttons, badges
```

---

## 6. COMPONENT SPECS

### Buttons

```
MERCHANT:
  Primary (Brand):
    bg: --brand | hover: --brand-hover
    text: #fff | font: 12px/600
    padding: 7px 14px | radius: 8px

  Primary (Orange — new order actions):
    bg: --orange | hover: --orange-hover
    text: #fff | same sizing

  Secondary:
    bg: --bg-elevated | border: --border-default
    text: --text-secondary | hover text: --text-primary
    same sizing

  Ghost:
    bg: transparent | text: --text-secondary
    hover: --bg-elevated

  Danger:
    bg: --danger-dim | text: --danger
    hover: bg slightly lighter

STOREFRONT:
  Primary:
    bg: --sf-brand | hover: --sf-brand-hover
    text: #fff | font: 14px/600
    padding: 12px 24px | radius: 10px | full-width option

  Secondary (outlined):
    border: --sf-brand | text: --sf-brand
    bg: transparent | radius: 10px
```

### Status Badges (Merchant)

```
ORDER STATUS:
  NEW (pending):    bg: --orange-dim  | text: --orange  | + pulse dot
  CONFIRMED:        bg: --info-dim    | text: --info
  PROCESSING:       bg: --yellow-dim  | text: --yellow
  SHIPPED:          bg: --purple-dim  | text: --purple
  DELIVERED:        bg: --success-dim | text: --success
  CANCELLED:        bg: --bg-overlay  | text: --text-muted
  REFUNDED:         bg: --danger-dim  | text: --danger

PAYMENT STATUS:
  PAID:      bg: --success-dim | text: --success
  UNPAID:    bg: --warning-dim | text: --warning
  COD:       bg: --bg-overlay  | text: --text-secondary
  REFUNDED:  bg: --danger-dim  | text: --danger

STOCK STATUS:
  IN STOCK:      text: --success | "✓ In Stock X"
  LOW STOCK:     text: --warning | "⚠ Low: X"  (threshold ≤ 5)
  OUT OF STOCK:  text: --danger  | "✗ Out of Stock"

All badges: font-size 9-10px, font-weight 600,
            padding 2px 7px, border-radius 999px
```

### Inputs (Merchant)

```
bg: --bg-elevated
border: 1px solid --border-subtle
border-radius: 8px
padding: 8px 12px
font: 12px IBM Plex Sans
color: --text-primary
placeholder: --text-muted

focus:
  border-color: --brand
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12)
  outline: none

error:
  border-color: --danger
  box-shadow: 0 0 0 3px rgba(239,68,68,0.12)
```

### Cards (Merchant)

```
Background:    --bg-primary
Border:        1px solid --border-subtle
Border-radius: 12px
Overflow:      hidden

Card Header:
  padding:        13px 16px
  border-bottom:  1px solid --border-subtle
  title font:     12px / 600 / --text-primary
  link font:      11px / --brand / cursor pointer

Card Body row:
  padding:        10px 16px
  border-bottom:  1px solid --border-subtle (except last)
  hover:          background --bg-elevated

Stat Card:
  padding: 14px 16px
  label:   10px/600/--text-muted/uppercase/tracking 0.6px
  value:   22px/600/IBM Plex Mono/letter-spacing -0.5px
  icon:    28x28px / border-radius 7px / colored bg
```

### Navigation (Merchant Sidebar)

```
Width: 220px
Background: --bg-primary
Border-right: 1px solid --border-subtle

Nav item:
  padding:       7px 12px
  border-radius: 8px
  font:          12px/500
  color default: --text-secondary
  color hover:   --text-primary / bg --bg-elevated
  color active:  --brand / bg --brand-dim

Nav badge (new orders):
  bg: --orange | color: #fff
  font: 9px/700
  padding: 1px 6px
  border-radius: 999px
  margin-left: auto

Icon size: 15x15px
```

---

## 7. ELEVATION & SHADOWS

```
MERCHANT (subtle, depth through color not shadow):
  Level 1 (cards):   background --bg-primary
  Level 2 (elevated): background --bg-elevated
  Level 3 (overlay): background --bg-overlay + backdrop-blur: 12px
  Level 4 (modal):   background --bg-overlay + shadow:
                     0 25px 50px rgba(0,0,0,0.5)

Glow effects (sparingly):
  Brand glow:  box-shadow: 0 0 12px rgba(99,102,241,0.3)
  Orange glow: box-shadow: 0 0 12px rgba(249,115,22,0.3)
  Success glow: box-shadow: 0 0 8px rgba(16,185,129,0.3)

STOREFRONT:
  Cards: box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)
  Hover: box-shadow: 0 4px 16px rgba(0,0,0,0.12)
  Navbar: box-shadow: 0 1px 0 --sf-border
```

---

## 8. MOTION & ANIMATION

```
TRANSITIONS:
  Default:   all 0.15s ease
  Slow:      all 0.25s ease
  Spring:    cubic-bezier(0.34, 1.56, 0.64, 1)

PAGE LOAD (staggered fade-up):
  @keyframes fadeUp {
    from: opacity 0, translateY(8px)
    to:   opacity 1, translateY(0)
  }
  Duration: 0.3s
  Stagger: 0.05s per element

PULSE (new order indicator):
  @keyframes pulse {
    0%,100%: opacity 1, scale 1
    50%:     opacity 0.5, scale 0.85
  }
  Duration: 1.5s infinite

HOVER STATES:
  Nav items:    background transition 0.15s
  Cards:        border-color transition 0.15s
  Buttons:      background transition 0.15s
  Table rows:   background transition 0.1s
  Product cards (storefront): transform translateY(-2px) + shadow 0.2s

RULE: No animation should exceed 0.3s.
      No more than 1 pulsing element per screen section.
```

---

## 9. ICONOGRAPHY

```
LIBRARY: Heroicons (outline style, 24px viewBox)
SIZE in merchant: 14-16px (nav), 16-18px (actions), 20px (empty states)
SIZE in storefront: 18-22px

MERCHANT icon colors:
  Nav default:  --text-secondary (opacity 0.8)
  Nav active:   --brand
  Action icons: --text-muted (hover: --brand)
  Status icons: match status color

EMOJI usage: Only in empty states and celebratory moments.
             Never in nav or data tables.
```

---

## 10. GRID SYSTEM

```
MERCHANT:
  Layout:     Sidebar (220px fixed) + Main (flex-1)
  Content:    CSS Grid for cards
  4-col grid: repeat(4, 1fr) — stat cards, quick actions
  2-col grid: 1fr 300px — main content + right panel
  3-col grid: repeat(3, 1fr) — product grid

STOREFRONT:
  Container:  max-width 1280px, margin auto, padding 0 24px
  Products:   4 columns desktop, 2 tablet, 1 mobile
  Gap:        20px desktop, 14px mobile
  Hero:       Full width
```

---

## 11. SCROLLBAR STYLE

```
MERCHANT (custom, thin):
  width: 4px
  track: transparent
  thumb: --border-default, border-radius 4px

STOREFRONT: browser default (light mode)
```

---

## 12. EMPTY STATES

```
STRUCTURE (centered, vertically in container):
  1. Icon or illustration area (40-48px icon, --text-muted color)
  2. Headline: 13px/500/--text-secondary
  3. Subtext:  11px/400/--text-muted (1-2 lines max)
  4. CTA button (primary)

Examples:
  No orders    → "No orders yet" → "Share your store to start selling"
  No products  → "No products yet" → "Add your first product"
  No customers → "No customers yet" → "Customers appear after first order"
```

---

## 13. RESPONSIVE BEHAVIOR

```
MERCHANT DASHBOARD:
  ≥1280px: Full sidebar + content
  <1024px: Sidebar collapses to icon-only (40px)
  <768px:  Bottom tab bar replaces sidebar (mobile app via Capacitor)
    Tabs: Home | Orders | + (FAB) | Products | More

STOREFRONT:
  ≥1024px: Full desktop layout
  768-1023px: 2-col product grid, condensed nav
  <768px: 2-col product grid, hamburger nav, bottom checkout bar
```

---

## 14. PLATFORM NOTES FOR STITCH

```
TECH STACK:
  Framework:  Nuxt 3 (Vue 3 Composition API)
  Styling:    Tailwind CSS + custom CSS variables
  Mobile:     Capacitor (same codebase → iOS/Android)
  Database:   Supabase (PostgreSQL)
  Auth:       Supabase Auth

STITCH GENERATION RULES:
  1. Always use IBM Plex Sans + IBM Plex Mono (preloaded via Google Fonts)
  2. Never use Inter, Roboto, or system-ui as primary fonts
  3. Merchant screens: always dark bg (#08080E base)
  4. Storefront screens: always light bg (#FFFFFF base)
  5. All prices/numbers: IBM Plex Mono, font-weight 600
  6. Status badges: always pill shape (border-radius 999px)
  7. Cards never have box-shadows in merchant — use border + bg layering
  8. Sidebar is always 220px and never collapses on desktop
  9. Every data table has a proper empty state
  10. Animations: fadeUp on page load, pulse only on "new order" indicators
```
