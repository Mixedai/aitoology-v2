# 🚀 AI Toologist - Dev Mode Handoff

Complete development documentation and asset package for the AI Toologist React + Tailwind implementation.

## 📋 Quick Start

### Required Dependencies
```bash
npm install @headlessui/react react-router-dom recharts motion/react lucide-react
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input badge tabs separator progress table
```

### Key Resources
- **[Component Inspection](./ComponentInspection.tsx)** - Interactive component browser with Tailwind snippets
- **[Tailwind Mapping](./TailwindMapping.md)** - Complete class mapping for spacing, colors, and components  
- **[Asset Export Guide](./AssetExportGuide.md)** - SVG logos, PNG mockups, and implementation code
- **[Dev Notes](./DevModeHandoff.tsx)** - Package requirements and setup instructions

## 🎨 Design System

### Color Tokens
```css
/* Light Mode */
--primary: #FF6B35;        /* Orange - Primary brand */
--secondary: #4A5C7A;      /* Navy Blue - Secondary */
--muted: #E5E1DB;          /* Beige - Subtle backgrounds */
--background: #ffffff;     /* White - Page background */
--foreground: #1A1A1A;     /* Dark - Primary text */

/* Dark Mode */
--background: #0F172A;     /* Slate-900 - Dark background */
--foreground: #F1F5F9;     /* Slate-100 - Light text */
--card: #1E293B;           /* Slate-800 - Card background */
--muted: #334155;          /* Slate-700 - Muted elements */
```

### Spacing System (8-Point Grid)
```css
/* Base unit = 0.25rem (4px) */
p-4   /* 1rem - Standard padding */
p-6   /* 1.5rem - Card content */
p-8   /* 2rem - Page containers */
gap-4 /* 1rem - Grid spacing */
gap-6 /* 1.5rem - Section spacing */
gap-8 /* 2rem - Layout columns */
```

## 🧩 Key Components

### Tool Card
```tsx
<Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
  <div className="flex items-start justify-between mb-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
        🤖
      </div>
      <div>
        <h3 className="font-semibold">ChatGPT</h3>
        <Badge variant="secondary">AI Writing</Badge>
      </div>
    </div>
    <Badge variant="outline">Popular</Badge>
  </div>
  <p className="text-sm text-muted-foreground mb-4">
    Advanced AI language model for content generation.
  </p>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-1">
      <Star className="h-4 w-4 fill-warning text-warning" />
      <span className="text-sm font-medium">4.8</span>
    </div>
    <span className="font-semibold text-primary">$20/month</span>
  </div>
</Card>
```

### Navigation Header
```tsx
<nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <h2 className="text-xl font-bold text-primary">AI Toologist</h2>
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-foreground hover:text-primary transition-colors">
          Discover
        </a>
      </div>
      <Button>Get Started</Button>
    </div>
  </div>
</nav>
```

### Stats Card
```tsx
<Card className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-muted-foreground">API Calls Today</p>
      <p className="text-2xl font-bold">1,247</p>
    </div>
    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
      <BarChart3 className="h-4 w-4 text-primary" />
    </div>
  </div>
  <div className="flex items-center gap-1 mt-4">
    <TrendingUp className="h-3 w-3 text-success" />
    <span className="text-xs text-success font-medium">+12.3%</span>
  </div>
</Card>
```

## 📱 Responsive Design

### Breakpoint System
```css
sm:    /* 640px+ - Small tablets, large phones */
md:    /* 768px+ - Tablets */  
lg:    /* 1024px+ - Small laptops */
xl:    /* 1280px+ - Large screens */
2xl:   /* 1536px+ - Extra large screens */
```

### Grid Layouts
```tsx
// 12-Column Responsive Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Tool Discovery Grid
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

// Dashboard Layout
<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
```

## ⚡ Animations

### Hover Effects (200ms ease-out)
```css
/* Tool Card Hover */
.hover\:scale-\[1\.02\]:hover { transform: scale(1.02); }
.transition-all { transition: all 200ms ease-out; }
.hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }

/* Button Hover */
.hover\:bg-primary\/90:hover { background-color: rgba(255, 107, 53, 0.9); }
```

### Motion Library Animations
```tsx
// Slide-up Tray
<motion.div
  initial={{ y: "100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
>

// Modal Overlay
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 0.8 }}
  className="bg-background/80 backdrop-blur-sm"
>

// Toast Notification
<motion.div
  initial={{ x: "100%", opacity: 0, scale: 0.8 }}
  animate={{ x: 0, opacity: 1, scale: 1 }}
  transition={{ type: "spring", damping: 25, stiffness: 300 }}
>
```

## 📦 Asset Integration

### Logo Usage
```tsx
// Primary Logo
<img src="/assets/logos/ai-toologist-logo.svg" alt="AI Toologist" className="h-8 w-auto" />

// Icon Only
<img src="/assets/logos/ai-toologist-icon.svg" alt="AI Toologist" className="h-8 w-8" />
```

### Tool Icons (replacing emojis)
```tsx
// Replace emoji with SVG
<img src="/assets/tool-icons/chatgpt-icon.svg" alt="ChatGPT" className="w-6 h-6" />
<img src="/assets/tool-icons/midjourney-icon.svg" alt="Midjourney" className="w-6 h-6" />
```

## 🔗 External Links

- **GitHub Repository:** `https://github.com/ai-toologist/web-app`
- **Storybook Documentation:** `https://storybook.ai-toologist.com`
- **API Documentation:** `https://docs.ai-toologist.com`
- **Design System:** `https://design.ai-toologist.com`

## 🎯 Implementation Checklist

### ✅ Core Setup
- [ ] Install required npm packages
- [ ] Set up Tailwind CSS with custom theme
- [ ] Configure shadcn/ui components
- [ ] Import design tokens from globals.css

### ✅ Components
- [ ] Implement base UI components (Button, Card, Input, Badge)
- [ ] Create specialized components (ToolCard, StatCard, Navigation)
- [ ] Add hover effects and transitions
- [ ] Test responsive behavior across breakpoints

### ✅ Layouts
- [ ] Set up 12-column grid system
- [ ] Implement sticky navigation
- [ ] Create responsive containers
- [ ] Test mobile, tablet, and desktop layouts

### ✅ Theming
- [ ] Implement light/dark mode toggle
- [ ] Test color contrast ratios
- [ ] Verify all components adapt to theme changes
- [ ] Add proper focus states for accessibility

### ✅ Assets
- [ ] Replace emoji icons with SVG assets
- [ ] Implement logo variants (full, icon, wordmark)
- [ ] Add favicon and app icons
- [ ] Optimize images for web performance

### ✅ Animations
- [ ] Add hover effects (scale, shadow, color transitions)
- [ ] Implement Motion library animations
- [ ] Create slide-up comparison tray
- [ ] Add toast notification system

### ✅ Performance
- [ ] Bundle size optimization
- [ ] Image compression and lazy loading
- [ ] CSS purging for unused Tailwind classes
- [ ] Component code splitting

## 📞 Support

For implementation questions or design clarifications:
- **Design Team:** design@ai-toologist.com
- **Development:** dev@ai-toologist.com
- **GitHub Issues:** Submit issues for bugs or feature requests

## 📄 License

This design system and documentation is proprietary to AI Toologist. Usage is restricted to authorized development teams.