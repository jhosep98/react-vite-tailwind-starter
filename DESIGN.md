---
name: DevFocus Dark
colors:
  primary: "#2665fd"
  secondary: "#475569"
  surface: "#0b1326"
  on-surface: "#dae2fd"
  error: "#ffb4ab"
  success: "#4ade80"
  warning: "#fbbf24"
  muted: "#1e293b"
  muted-foreground: "#94a3b8"
typography:
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
  headlines:
    fontFamily: Inter
    fontWeight: 600
  labels:
    fontFamily: Inter
    fontWeight: 500
    fontSize: 12px
    textTransform: uppercase
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
---

# Design System

## Overview

A focused, minimal dark interface for developer productivity. Clean lines, low visual noise, high information density. Inspired by shadcn/ui with a custom dark-first approach.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2665fd` | CTAs, active states, key interactive elements |
| `primary-foreground` | `#ffffff` | Text on primary |
| `secondary` | `#475569` | Supporting UI, chips, secondary actions |
| `surface` | `#0b1326` | Page backgrounds |
| `on-surface` | `#dae2fd` | Primary text on dark backgrounds |
| `muted` | `#1e293b` | Subtle backgrounds, hover states |
| `muted-foreground` | `#94a3b8` | Secondary text, placeholders |
| `error` | `#ffb4ab` | Validation errors, destructive actions |
| `success` | `#4ade80` | Success states, confirmations |
| `warning` | `#fbbf24` | Warning states |
| `border` | `#1e293b` | Borders, dividers |
| `ring` | `#2665fd` | Focus rings |

## Typography

### Font Stack
```
Inter, ui-sans-serif, system-ui, sans-serif
```

### Scale

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| `text-xs` | 12px | 400 | Labels, captions |
| `text-sm` | 14px | 400 | Secondary text, table cells |
| `text-base` | 16px | 400 | Body text |
| `text-lg` | 18px | 500 | Subheadings |
| `text-xl` | 20px | 600 | Section titles |
| `text-2xl` | 24px | 600 | Page titles |
| `text-3xl` | 30px | 700 | Hero headlines |

### Labels
Uppercase, 12px, medium weight for section headers.

## Spacing

- Base unit: 4px
- Common: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)
- Section padding: `p-4` to `p-8`
- Container: `max-w-screen-xl` or custom

## Border Radius

| Token | Value |
|-------|-------|
| `rounded-sm` | 4px |
| `rounded-md` | 8px |
| `rounded-lg` | 12px |
| `rounded-full` | 9999px |

## Components

### Buttons

**Variants:**
- `default` - Primary fill, white text
- `destructive` - Error color fill
- `outline` - Border, transparent bg
- `secondary` - Secondary fill, muted text
- `ghost` - No bg, hover shows muted
- `link` - Text only, primary color

**Sizes:**
- `default` - `h-10 px-4 py-2`
- `sm` - `h-8 px-3 text-sm`
- `lg` - `h-12 px-6 text-lg`
- `icon` - `h-10 w-10`

### Inputs

```
h-10 w-full px-3 py-2 bg-transparent border border-[#1e293b] rounded-md
focus:outline-none focus:ring-2 focus:ring-[#2665fd] focus:border-transparent
```

### Cards

```
bg-[#0b1326] rounded-lg border border-[#1e293b] p-6
```

### Badges

```
px-2.5 py-0.5 rounded-full text-xs font-medium
```

**Variants:**
- `default` - Muted background
- `success` - Success background
- `warning` - Warning background
- `destructive` - Error background

## Motion

| Token | Value |
|-------|-------|
| duration-fast | 150ms |
| duration-normal | 200ms |
| duration-slow | 300ms |
| easing-default | ease-out |
| easing-enter | ease-in-out |

- Hover: subtle scale or background shift
- Focus: ring-2 with primary color
- No excessive animations - keep it functional

## Shadows

| Token | Value |
|-------|-------|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.3)` |
| `shadow` | `0 1px 3px 0 rgb(0 0 0 / 0.4)` |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.5)` |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.6)` |

## Dark / Light Mode

Uses a custom `ThemeProvider` backed by a Zustand slice (`theme.slice.ts`) with `persist` middleware (localStorage). The provider syncs the `dark` or `light` class on `<html>` reactively. No third-party theme library needed.

**Light mode tokens:**
- Background: `#ffffff`
- Foreground: `#09090b`
- Borders: `#e4e4e7`

## Do's and Don'ts

- Do use primary color sparingly - only for key actions
- Don't mix rounded corners inconsistently in same view
- Do maintain 4:1 contrast ratio minimum for text
- Do use muted colors for secondary content
- Don't use shadows for elevation - rely on background contrast
