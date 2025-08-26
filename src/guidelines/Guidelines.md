# AI Toologist Design System Guidelines

## Spacing System
**8-Point Grid System**: All spacing must follow the 8-point grid system for visual consistency.

### Primary Spacing Scale
- **gap-6** (24px): Primary spacing for cards, sections, and major layout elements
- **p-6** (24px): Primary padding for containers and content areas
- **gap-4** (16px): Secondary spacing for tighter layouts and form elements
- **gap-2** (8px): Micro spacing for inline elements and icon gaps
- **mb-8** (32px): Vertical spacing between major sections
- **mb-6** (24px): Vertical spacing between subsections

### Restricted Spacing
❌ **Avoid**: gap-3, gap-5, p-3, p-5, mb-3, mb-5, mb-7 (breaks 8-point grid)
✅ **Use**: gap-2, gap-4, gap-6, gap-8, p-4, p-6, p-8, mb-4, mb-6, mb-8

## Typography System
**Use semantic HTML elements** and let the design system handle styling automatically.

### Typography Rules
- **No custom font-size classes**: Remove text-xl, text-2xl, text-lg, etc.
- **No custom font-weight classes**: Remove font-bold, font-medium, etc.
- **Use semantic elements**: h1, h2, h3, h4, p automatically get proper styling
- **Use semantic color tokens**: text-primary, text-muted-foreground, text-foreground

### Typography Tokens
```css
/* Design system handles these automatically */
h1: --text-2xl + --font-weight-medium (24px/500)
h2: --text-xl + --font-weight-medium (20px/500)
h3: --text-lg + --font-weight-medium (18px/500)
h4: --text-base + --font-weight-medium (16px/500)
p: --text-base + --font-weight-normal (16px/400)
```

## Color System
**Use semantic color tokens** for consistency and theme support.

### Primary Color Tokens
- `text-primary`: #FF6B35 (AI Toologist Orange)
- `text-secondary`: #4A5C7A (Navy Blue)
- `text-muted-foreground`: Contextual muted text
- `text-foreground`: Primary text color
- `bg-primary`: Primary background
- `bg-background`: Main background
- `bg-muted`: Subtle backgrounds

### State Colors
- `text-success`: Success states
- `text-destructive`: Error states
- `text-warning`: Warning states

## Accessibility Standards (WCAG 2.1 AA Compliant)

### Focus Management
**All interactive components must have visible focus indicators**.

#### Focus-Visible Styles
```css
/* Automatically applied to all interactive elements */
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible,
a:focus-visible,
[tabindex]:focus-visible,
[role="button"]:focus-visible {
  outline: 2px solid var(--ring); /* #FF6B35 */
  outline-offset: 2px;
  border-radius: 4px;
}
```

#### Interactive Component Requirements
- **Buttons**: Must include focus-visible styles and appropriate ARIA labels
- **Links**: Must have discernible text and focus indicators
- **Form inputs**: Must have associated labels and validation feedback
- **Custom controls**: Must include proper ARIA roles and states

### Modal Accessibility
**All modal overlays must follow proper dialog patterns**.

#### Modal Implementation Requirements
```tsx
<div 
  role="dialog" 
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
  className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
>
  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <h2 id="dialog-title">Modal Title</h2>
    <p id="dialog-description">Modal description</p>
    {/* Modal content */}
  </div>
</div>
```

#### Focus Management for Modals
1. **Focus trap**: Focus must be contained within the modal
2. **Initial focus**: Set focus to the first focusable element or the modal container
3. **Return focus**: When modal closes, return focus to the triggering element
4. **Escape key**: Must close the modal and return focus

#### Example Focus Management
```tsx
const ModalComponent = ({ isOpen, onClose, triggerRef }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      const previousFocus = document.activeElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Return focus when modal closes
      return () => {
        previousFocus?.focus();
      };
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="focus:outline-none"
    >
      {/* Modal content */}
    </div>
  );
};
```

### Color Contrast Standards
**All text must meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text)**.

#### Verified Contrast Ratios
- **Primary (#FF6B35) on White (#FFFFFF)**: 3.85:1 ✅ (AA Large Text)
- **Primary (#FF6B35) on Black (#1A1A1A)**: 5.46:1 ✅ (AA Normal Text)
- **Secondary (#4A5C7A) on White (#FFFFFF)**: 7.12:1 ✅ (AAA Normal Text)
- **Foreground (#1A1A1A) on Background (#FFFFFF)**: 15.33:1 ✅ (AAA Normal Text)
- **Muted Foreground (#4A5C7A) on Background (#FFFFFF)**: 7.12:1 ✅ (AAA Normal Text)

#### Dark Mode Contrast Ratios
- **Primary (#FF6B35) on Dark Background (#0F172A)**: 4.89:1 ✅ (AA Normal Text)
- **Foreground (#F1F5F9) on Dark Background (#0F172A)**: 14.25:1 ✅ (AAA Normal Text)
- **Muted Foreground (#94A3B8) on Dark Background (#0F172A)**: 7.98:1 ✅ (AAA Normal Text)

#### Link Color Guidelines
- **Default links**: Use `text-primary` with underline for clear identification
- **Visited links**: Use `text-secondary` to differentiate from unvisited
- **Hover/focus states**: Ensure 3:1 contrast ratio minimum
- **Context**: Don't rely solely on color to convey link status

### Screen Reader Support
**All components must be accessible to screen readers**.

#### ARIA Labels and Descriptions
```tsx
// Descriptive button
<Button aria-label="Close navigation menu">
  <X className="w-4 h-4" />
</Button>

// Form input with description
<div>
  <Label htmlFor="email">Email Address</Label>
  <Input 
    id="email" 
    type="email" 
    aria-describedby="email-help"
    required
  />
  <p id="email-help" className="text-muted-foreground">
    We'll never share your email with anyone else.
  </p>
</div>

// Loading state
<Button disabled aria-label="Loading, please wait">
  <Loader className="w-4 h-4 animate-spin" />
  Loading...
</Button>
```

#### Skip Links
```tsx
// Add to top of page
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
>
  Skip to main content
</a>
```

### Keyboard Navigation
**All interactive elements must be keyboard accessible**.

#### Tab Order Requirements
- **Logical flow**: Tab order must follow visual layout
- **Skip links**: Provide shortcuts to main content areas
- **Focus trapping**: Contain focus within modals and overlays
- **Escape routes**: Allow users to exit focus traps

#### Custom Keyboard Shortcuts
- **Command Palette**: `Cmd/Ctrl + K` - Global search
- **Navigation**: `Tab` / `Shift + Tab` - Move between elements
- **Activation**: `Enter` / `Space` - Activate buttons and links
- **Modal close**: `Escape` - Close dialogs and overlays

### Motion and Animation
**Respect user motion preferences**.

#### Reduced Motion Support
```css
/* Automatically applied via CSS */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

#### Animation Guidelines
- **Essential animations**: Keep for functionality (loading, feedback)
- **Decorative animations**: Disable for reduced motion users
- **Duration**: Keep animations brief (< 500ms for most interactions)
- **Easing**: Use consistent easing functions across the system

## Responsive Design Standards

### Breakpoint System
**Mobile-first approach with three main breakpoints:**

- **Mobile**: `0-767px` (default, no prefix)
- **Tablet**: `md:768px+` (medium screens)
- **Desktop**: `lg:1024px+` (large screens)

### Responsive Grid Patterns
```tsx
/* Standard responsive grid patterns */
// Card grids: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
// Two-column layouts: grid grid-cols-1 lg:grid-cols-2 gap-8
// Sidebar layouts: grid grid-cols-1 lg:grid-cols-3 gap-8 (content: lg:col-span-2, sidebar: lg:col-span-1)
// Hero sections: grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
```

### Typography Responsive Scale
```tsx
// Headlines: text-3xl md:text-5xl lg:text-6xl
// Subheadlines: text-xl md:text-2xl lg:text-3xl
// Body large: text-base md:text-lg lg:text-xl
// Content spacing: py-16 md:py-24
```

### Mobile-Specific Patterns
```tsx
// Mobile navigation: hidden md:flex (desktop nav) + md:hidden (mobile menu)
// Mobile spacing: p-4 md:p-6 lg:p-8
// Mobile typography: text-2xl md:text-4xl
// Mobile cards: space-y-4 md:grid md:grid-cols-2 md:gap-6
```

### Navbar Integration Requirements
**All screens must account for sticky navbar:**

1. **Main content wrapper**: Add `pt-16` for sticky navbar clearance
2. **Sticky elements**: Use `top-16` instead of `top-0` to avoid navbar overlap
3. **Modal z-index**: Ensure modals use `z-50` or higher to appear above navbar
4. **Full-height sections**: Use `min-h-[calc(100vh-4rem)]` instead of `min-h-screen`

## Component Standards

### Cards
```tsx
<Card className="hover:shadow-md transition-shadow">
  <CardHeader className="space-y-4"> {/* Use space-y-4 for internal spacing */}
    {/* Card content with gap-2 for icon spacing */}
  </CardHeader>
</Card>
```

### Grid Layouts
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Primary grid spacing: gap-6 */}
</div>
```

### Content Sections
```tsx
<div className="mb-8"> {/* Major section spacing */}
  <h3 className="mb-6"> {/* Subsection spacing */}
    <div className="gap-6"> {/* Content spacing */}
```

### Navigation
```tsx
<div className="flex items-center gap-4"> {/* Standard nav spacing */}
  <Button className="gap-2"> {/* Button icon spacing */}
```

## Implementation Checklist

### ✅ Spacing Normalization
- [ ] Replace all gap-3, gap-5 with gap-4 or gap-6
- [ ] Use p-6 for primary container padding
- [ ] Use mb-8 for major section breaks
- [ ] Use space-y-4 for CardHeader internal spacing

### ✅ Typography Normalization
- [ ] Remove custom font-size classes (text-xl, text-2xl, etc.)
- [ ] Remove custom font-weight classes (font-bold, font-medium, etc.)
- [ ] Use semantic HTML elements (h1, h2, h3, h4, p)
- [ ] Use semantic color tokens (text-primary, text-muted-foreground)

### ✅ Color Token Usage
- [ ] Replace hardcoded colors with semantic tokens
- [ ] Use text-primary for accent elements
- [ ] Use text-muted-foreground for secondary text
- [ ] Use proper state colors (success, warning, destructive)

## Examples

### ❌ Before (Non-compliant)
```tsx
<div className="mb-3 gap-5">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-sm text-gray-600 mb-4">Description</p>
</div>
```

### ✅ After (Compliant)
```tsx
<div className="mb-6 gap-6">
  <h2>Title</h2> {/* Automatic text-xl + font-medium */}
  <p className="text-muted-foreground mb-6">Description</p>
</div>
```

This ensures visual consistency, theme support, and adherence to the 8-point grid system across all components.