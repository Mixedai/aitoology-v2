# Tailwind CSS Class Mapping for AI Toologist

## Design Tokens → Tailwind Classes

### Colors

| Design Token | Tailwind Class | CSS Value | Usage |
|--------------|----------------|-----------|--------|
| Primary | `bg-primary` `text-primary` | `#FF6B35` | Primary buttons, links, accents |
| Secondary | `bg-secondary` `text-secondary` | `#4A5C7A` | Secondary buttons, icons |
| Muted | `bg-muted` | `#E5E1DB` | Subtle backgrounds, disabled states |
| Background | `bg-background` | `#ffffff` / `#0F172A` | Page background (light/dark) |
| Foreground | `text-foreground` | `#1A1A1A` / `#F1F5F9` | Primary text (light/dark) |
| Muted Foreground | `text-muted-foreground` | `#4A5C7A` / `#94A3B8` | Helper text, labels |
| Border | `border-border` | `rgba(74, 92, 122, 0.2)` / `#334155` | Card borders, dividers |
| Success | `bg-success` `text-success` | `#10B981` | Success states, positive indicators |
| Destructive | `bg-destructive` `text-destructive` | `#EF4444` | Error states, delete actions |
| Warning | `bg-warning` `text-warning` | `#EAB308` | Warning states, caution indicators |

### Dark Mode Classes

All color classes automatically adapt to dark mode when wrapped in `.dark` class:

```tsx
<div className="bg-background text-foreground">
  <!-- Light: white bg, dark text -->
  <!-- Dark: slate-900 bg, light text -->
</div>
```

### Spacing (8-Point Grid System)

| Tailwind Class | CSS Value | Design Usage | Component Examples |
|----------------|-----------|--------------|-------------------|
| `p-1` | `0.25rem` (4px) | Icon padding | Small icon buttons |
| `p-2` | `0.5rem` (8px) | Tight padding | Badge, small buttons |
| `p-3` | `0.75rem` (12px) | Compact padding | List items, form elements |
| `p-4` | `1rem` (16px) | Standard padding | Cards, buttons, inputs |
| `p-6` | `1.5rem` (24px) | Comfortable padding | Card content, modals |
| `p-8` | `2rem` (32px) | Spacious padding | Page containers, sections |
| `p-12` | `3rem` (48px) | Large padding | Hero sections, landing areas |

### Gaps and Margins

| Tailwind Class | CSS Value | Usage |
|----------------|-----------|-------|
| `gap-2` | `0.5rem` | Tight element spacing |
| `gap-4` | `1rem` | Standard grid/flex spacing |
| `gap-6` | `1.5rem` | Section spacing |
| `gap-8` | `2rem` | Layout column spacing |
| `space-y-4` | `margin-top: 1rem` | Vertical stack spacing |
| `space-y-6` | `margin-top: 1.5rem` | Form field spacing |
| `mb-4` | `margin-bottom: 1rem` | Section separation |
| `mb-6` | `margin-bottom: 1.5rem` | Header spacing |
| `mb-8` | `margin-bottom: 2rem` | Major section spacing |

## Component-Specific Classes

### Buttons
```tsx
// Primary Button
<Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg">

// Secondary Button  
<Button className="border border-border bg-background hover:bg-muted px-4 py-2 rounded-lg">

// Ghost Button
<Button className="hover:bg-muted px-4 py-2 rounded-lg">
```

### Cards
```tsx
// Standard Card
<Card className="bg-card border border-border rounded-lg p-6 shadow-sm">

// Hover Card (Tool Card)
<Card className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer">

// Stat Card
<Card className="bg-card border border-border rounded-lg p-6">
```

### Navigation
```tsx
// Sticky Navigation
<nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">

// Navigation Container
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

// Navigation Items
<div className="flex h-16 items-center justify-between">
```

### Form Elements
```tsx
// Input Field
<input className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm">

// Checkbox
<input type="checkbox" className="h-4 w-4 rounded border border-border text-primary focus:ring-2 focus:ring-primary">

// Select
<select className="flex h-10 w-full rounded-md border border-border bg-input px-3 py-2 text-sm">
```

### Badges and Tags
```tsx
// Default Badge
<Badge className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs">

// Status Badges
<Badge className="bg-success/10 text-success px-2 py-1 rounded-full text-xs"> // Success
<Badge className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs"> // Warning
<Badge className="bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs"> // Error
```

### Grid and Layout
```tsx
// 12-Column Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Responsive Container
<div className="container mx-auto px-4 sm:px-6 lg:px-8">

// Flex Layouts
<div className="flex items-center justify-between">
<div className="flex flex-col sm:flex-row gap-4">
```

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| `sm:` | 640px | Small tablets, large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Large screens |
| `2xl:` | 1536px | Extra large screens |

## Animation Classes

### Hover Effects
```tsx
// Tool Card Hover
<div className="transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">

// Button Hover
<button className="transition-colors hover:bg-primary/90">

// Link Hover
<a className="transition-colors hover:text-primary">
```

### Motion Classes (with Motion library)
```tsx
// Slide In
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.2, ease: "easeOut" }}
>

// Scale In
<motion.div
  initial={{ scale: 0.95, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.2 }}
>
```

## Typography Classes

Note: Typography is handled by CSS custom properties in `globals.css`. Do not override these with Tailwind classes unless specifically needed:

```css
/* Don't use these unless overriding defaults */
.text-2xl { /* Conflicts with h1 defaults */ }
.font-bold { /* Conflicts with heading defaults */ }
.leading-none { /* Conflicts with line-height defaults */ }
```

## Utility Classes

### Common Combinations
```tsx
// Loading State
<div className="animate-pulse bg-muted rounded h-4 w-full">

// Skeleton
<div className="animate-pulse space-y-3">
  <div className="h-4 bg-muted rounded w-3/4"></div>
  <div className="h-4 bg-muted rounded w-1/2"></div>
</div>

// Focus Ring
<input className="focus:ring-2 focus:ring-primary focus:border-primary">

// Disabled State
<button className="disabled:opacity-50 disabled:cursor-not-allowed">
```

### State Classes
```tsx
// Selected/Active
<div className="bg-primary/10 border-primary">

// Hover
<div className="hover:bg-muted transition-colors">

// Focus
<div className="focus:outline-none focus:ring-2 focus:ring-primary">

// Disabled
<div className="opacity-50 cursor-not-allowed">
```

This mapping ensures consistent implementation of the design system using Tailwind CSS classes while maintaining the 8-point grid system and cohesive visual hierarchy.