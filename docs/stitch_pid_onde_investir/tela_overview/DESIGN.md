---
name: Decarbonization Intelligence System
colors:
  surface: '#faf9fd'
  surface-dim: '#dad9dd'
  surface-bright: '#faf9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f7'
  surface-container: '#eeedf1'
  surface-container-high: '#e9e7ec'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1a1b1f'
  on-surface-variant: '#43474e'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f1f0f4'
  outline: '#74777f'
  outline-variant: '#c4c6d0'
  surface-tint: '#455f8a'
  primary: '#001029'
  on-primary: '#ffffff'
  primary-container: '#03254d'
  on-primary-container: '#738dbb'
  inverse-primary: '#adc7f8'
  secondary: '#b22400'
  on-secondary: '#ffffff'
  secondary-container: '#de3002'
  on-secondary-container: '#fffbff'
  tertiary: '#071313'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b2828'
  on-tertiary-container: '#828f90'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f8'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#2c4771'
  secondary-fixed: '#ffdad2'
  secondary-fixed-dim: '#ffb4a3'
  on-secondary-fixed: '#3d0600'
  on-secondary-fixed-variant: '#8b1a00'
  tertiary-fixed: '#d7e5e5'
  tertiary-fixed-dim: '#bbc9c9'
  on-tertiary-fixed: '#111e1e'
  on-tertiary-fixed-variant: '#3c4949'
  background: '#faf9fd'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin: 32px
---

## Brand & Style

The visual identity is rooted in **Corporate Modernism**, prioritizing clarity, authority, and technical precision. As a platform for institutional data and intelligence, the design system bridges the gap between complex environmental science and actionable business insights. 

The aesthetic is characterized by high-density information presented within an airy, high-contrast framework. It avoids "tech-startup" playfulness in favor of a sophisticated, governmental-grade interface. The core personality is:
- **Authoritative:** Using Primary Navy to establish a foundation of stability and trust.
- **Urgent but Controlled:** Utilizing Primary Orange/Red for critical paths and calls to action, signaling the importance of decarbonization without creating visual fatigue.
- **Technical:** Emphasizing structured layouts, precise data visualization, and a "dashboard-first" mentality.

## Colors

This design system utilizes a structured palette to differentiate between institutional navigation, data interaction, and status signaling.

- **Primary Navy (#03254D):** Reserved for global navigation, structural headers, and primary body text. It provides the "institutional" weight of the platform.
- **Primary Orange/Red (#FA441A):** The singular action color. Used for primary buttons, active states, and critical progress indicators.
- **Light Greenish Gray (#BECCCC):** Serves as the primary surface color for secondary cards and background sections to reduce optical strain from pure white.
- **The "Risk" Tier:** Dark Wine (#550C18) and Dark Olive (#4D4E03) are used for high-level restriction and risk states, providing a sophisticated alternative to standard red/green alerts.
- **Neon Yellow (#F5F749):** Strictly for high-visibility alerts or specific data highlights. It must never be used for text or large background areas.

## Typography

The system relies exclusively on **Inter** to ensure maximum legibility across dense data tables and complex dashboards. 

The typographic hierarchy is strictly enforced to maintain a professional tone. Headers use tighter letter-spacing and heavier weights to command attention, while body text uses a generous line height (1.5x+) to facilitate long-form reading of technical reports. Labels and "Metadata" should utilize the `label-sm` style with increased tracking to differentiate technical specs from narrative content.

## Layout & Spacing

The design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. 

A strict 4px soft-grid scale is used for all internal component spacing, ensuring visual mathematical harmony. Whitespace is used as a functional tool to group related data points; "High Whitespace" does not mean empty space, but rather a deliberate avoidance of clutter. 

- **Desktop (1200px+):** 32px outer margins, 24px gutters.
- **Tablet (768px - 1199px):** 24px outer margins, 16px gutters.
- **Mobile (Up to 767px):** 16px outer margins, 12px gutters.

## Elevation & Depth

To maintain a clean and sophisticated feel, the system avoids heavy drop shadows. Depth is communicated through **Tonal Layering** and subtle, low-opacity ambient shadows.

- **Level 0 (Base):** Pure white (#FFFFFF) or Light Greenish Gray (#BECCCC) for section backgrounds.
- **Level 1 (Cards):** White surfaces with a 1px border (#BECCCC) and a very soft 4% opacity shadow (Primary Navy tint).
- **Level 2 (Modals/Pop-overs):** White surfaces with a more distinct 8% opacity shadow to imply a clear physical separation from the dashboard layer.
- **Interactive Depth:** Buttons do not use "pressed" shadows; instead, they use flat color shifts to Primary Navy or Darker Orange to signal state changes.

## Shapes

The shape language balances the "Technical" with the "Accessible." 

- **Cards and Containers:** Use a standardized `rounded-lg` (1rem/16px) radius to soften the technical nature of the data.
- **Interactive Elements:** Buttons utilize a full **Pill-shape** (32px+) to make them distinct from data containers and clearly identify them as actionable.
- **Form Inputs:** Utilize a tighter `rounded` (0.5rem/8px) radius to maintain a structured, organized appearance in data-entry heavy views.

## Components

### Buttons
- **Primary:** Pill-shaped, Primary Orange (#FA441A) background, White text. No border.
- **Secondary:** Pill-shaped, transparent background, 2px Primary Navy border, Primary Navy text.
- **Tertiary:** Text only, Primary Navy, with a subtle underline on hover.

### Cards
- Standard containers use the Light Greenish Gray (#BECCCC) background with a 1rem radius. 
- Technical cards (for data metrics) use a White background with a 1px #BECCCC border and Primary Navy headers.

### Input Fields
- High-contrast outlines using #BECCCC. 
- Focused state: 2px Primary Navy border. 
- Error state: 2px Dark Wine (#550C18) border with a Light Coral (#F89069) background tint.

### Chips & Tags
- Used for status filtering. Small, 0.25rem radius (soft).
- Decarbonization statuses: Use Wine/Magenta (#B5446E) for "In Progress" and Dark Olive Green (#4D4E03) for "Verified/Target Met."

### Data Tables
- Header row: Primary Navy background with White labels.
- Alternate rows: Subtle Light Greenish Gray (#F4F7F7) tint for legibility.
- Zero-line horizontal borders only; no vertical borders between columns.