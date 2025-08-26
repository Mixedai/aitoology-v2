# Asset Export Guide for AI Toologist

## Download Package Contents

### 📦 Complete Asset Bundle (`ai-toologist-assets.zip`)

```
ai-toologist-assets/
├── logos/
│   ├── ai-toologist-logo.svg
│   ├── ai-toologist-icon.svg
│   ├── ai-toologist-wordmark.svg
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       └── apple-touch-icon.png
├── tool-icons/
│   ├── chatgpt-icon.svg
│   ├── midjourney-icon.svg
│   ├── claude-icon.svg
│   ├── github-copilot-icon.svg
│   ├── stable-diffusion-icon.svg
│   └── whisper-icon.svg
├── mockups/
│   ├── desktop/
│   │   ├── 01-landing-lg-light.png
│   │   ├── 01-landing-lg-dark.png
│   │   ├── 02-discover-lg-light.png
│   │   ├── 02-discover-lg-dark.png
│   │   ├── 03-tool-detail-lg-light.png
│   │   ├── 03-tool-detail-lg-dark.png
│   │   ├── 04-compare-lg-light.png
│   │   ├── 04-compare-lg-dark.png
│   │   ├── 05-auth-lg-light.png
│   │   ├── 05-auth-lg-dark.png
│   │   ├── 06-dashboard-lg-light.png
│   │   └── 06-dashboard-lg-dark.png
│   ├── mobile/
│   │   ├── 01-landing-sm-light.png
│   │   ├── 01-landing-sm-dark.png
│   │   ├── 02-discover-sm-light.png
│   │   ├── 02-discover-sm-dark.png
│   │   └── [other mobile screens...]
│   └── tablet/
│       ├── 01-landing-md-light.png
│       ├── 01-landing-md-dark.png
│       └── [other tablet screens...]
├── ui-components/
│   ├── buttons/
│   │   ├── button-primary.svg
│   │   ├── button-secondary.svg
│   │   ├── button-ghost.svg
│   │   └── button-states.svg
│   ├── cards/
│   │   ├── tool-card.svg
│   │   ├── stat-card.svg
│   │   └── comparison-card.svg
│   ├── forms/
│   │   ├── input-field.svg
│   │   ├── checkbox.svg
│   │   ├── radio-button.svg
│   │   └── select-dropdown.svg
│   └── navigation/
│       ├── navbar.svg
│       ├── sidebar.svg
│       └── breadcrumb.svg
├── icons/
│   ├── lucide-exports/
│   │   ├── search.svg
│   │   ├── filter.svg
│   │   ├── star.svg
│   │   ├── heart.svg
│   │   ├── share.svg
│   │   └── [other icons...]
│   └── custom/
│       ├── ai-tool-category.svg
│       ├── comparison-tray.svg
│       └── status-indicators.svg
└── documentation/
    ├── README.md
    ├── color-palette.md
    ├── typography-guide.md
    └── usage-guidelines.md
```

## Asset Specifications

### Logos & Branding

| Asset | Format | Dimensions | Usage | Colors |
|-------|--------|------------|-------|---------|
| **Primary Logo** | SVG | Scalable | Main brand identity | Orange (#FF6B35) + Dark (#1A1A1A) |
| **Icon Only** | SVG | 32×32px base | Favicon, app icon | Orange (#FF6B35) |
| **Wordmark** | SVG | Scalable | Text-only applications | Orange (#FF6B35) |
| **Favicon.ico** | ICO | 16×16, 32×32 | Browser tab icon | Orange (#FF6B35) |
| **Apple Touch Icon** | PNG | 180×180px | iOS home screen | Orange (#FF6B35) |

#### SVG Properties
```svg
<!-- Optimized SVG structure -->
<svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .primary { fill: #FF6B35; }
      .dark { fill: #1A1A1A; }
    </style>
  </defs>
  <!-- Logo content -->
</svg>
```

### Tool Icons

| Icon | Format | Size | Description | Replaces |
|------|--------|------|-------------|----------|
| **ChatGPT** | SVG | 24×24px | Stylized robot/chat icon | 🤖 emoji |
| **Midjourney** | SVG | 24×24px | Artistic/palette icon | 🎨 emoji |
| **Claude** | SVG | 24×24px | Brain/neural network icon | 🧠 emoji |
| **GitHub Copilot** | SVG | 24×24px | Code/terminal icon | 💻 emoji |
| **Stable Diffusion** | SVG | 24×24px | Image generation icon | 🖼️ emoji |
| **Whisper** | SVG | 24×24px | Audio/microphone icon | 🎤 emoji |

#### Icon Guidelines
- **Stroke Width:** 2px consistent
- **Corner Radius:** 2px for consistency
- **Color:** Single color, easily themeable
- **Style:** Minimal, outlined style matching Lucide icons

```svg
<!-- Icon template -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Icon path -->
</svg>
```

### Mockup Screenshots

#### Desktop (1280×720px)
- **Format:** PNG, 2x resolution (2560×1440px)
- **Compression:** Optimized for web
- **Naming:** `[screen]-lg-[theme].png`
- **Background:** Actual theme colors (white/slate-900)

#### Mobile (375×812px)
- **Format:** PNG, 2x resolution (750×1624px)
- **Device Frame:** Optional iPhone frame overlay
- **Naming:** `[screen]-sm-[theme].png`
- **Safe Areas:** Proper notch/bottom indicator spacing

#### Tablet (768×1024px)
- **Format:** PNG, 2x resolution (1536×2048px)
- **Orientation:** Portrait optimized
- **Naming:** `[screen]-md-[theme].png`
- **Layout:** Responsive breakpoint accurate

### UI Components

#### Button Components
```svg
<!-- Primary Button -->
<rect width="120" height="40" rx="8" fill="#FF6B35"/>
<text x="60" y="24" text-anchor="middle" fill="white" font-family="Inter" font-weight="500">
  Get Started
</text>

<!-- Secondary Button -->
<rect width="120" height="40" rx="8" fill="none" stroke="#FF6B35" stroke-width="1"/>
<text x="60" y="24" text-anchor="middle" fill="#FF6B35" font-family="Inter" font-weight="500">
  Learn More
</text>
```

#### Card Components
```svg
<!-- Tool Card -->
<rect width="320" height="200" rx="12" fill="white" stroke="rgba(74, 92, 122, 0.2)" stroke-width="1"/>
<!-- Card content structure -->
```

### Icon Set (Lucide-based)

| Category | Icons | Count |
|----------|-------|-------|
| **Navigation** | search, filter, menu, x, arrow-left, arrow-right | 6 |
| **Actions** | plus, minus, edit, delete, share, heart, bookmark | 7 |
| **Status** | star, check, x-circle, alert-circle, info | 5 |
| **Interface** | grid, list, settings, user, bell, moon, sun | 7 |
| **Business** | trending-up, trending-down, bar-chart, pie-chart | 4 |

#### Custom Icon Exports
```svg
<!-- Consistent with Lucide style -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <!-- Custom icon paths -->
</svg>
```

## Implementation Code

### Logo Implementation
```tsx
// React Component
export function AIToologistLogo({ variant = "full", className = "" }: LogoProps) {
  const logos = {
    full: "/assets/logos/ai-toologist-logo.svg",
    icon: "/assets/logos/ai-toologist-icon.svg", 
    wordmark: "/assets/logos/ai-toologist-wordmark.svg"
  };
  
  return (
    <img 
      src={logos[variant]} 
      alt="AI Toologist" 
      className={`h-8 w-auto ${className}`}
    />
  );
}
```

### Icon Usage
```tsx
// Tool Icon Component
export function ToolIcon({ tool, size = 24 }: ToolIconProps) {
  const iconMap = {
    chatgpt: "/assets/tool-icons/chatgpt-icon.svg",
    midjourney: "/assets/tool-icons/midjourney-icon.svg",
    claude: "/assets/tool-icons/claude-icon.svg"
  };
  
  return (
    <img 
      src={iconMap[tool]} 
      alt={tool}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}
```

### Favicon Implementation
```html
<!-- HTML Head -->
<link rel="icon" type="image/x-icon" href="/assets/logos/favicon/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/logos/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/logos/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" href="/assets/logos/favicon/apple-touch-icon.png">
```

## Export Settings

### Figma Export Settings

#### SVG Export
- **Format:** SVG
- **Precision:** 2 decimal places
- **Minify:** Yes
- **Include "id" attribute:** No
- **Outline text:** Yes

#### PNG Export
- **Format:** PNG
- **Scale:** 2x for Retina
- **Background:** Transparent (icons) / Actual (mockups)
- **Compression:** Medium (web optimized)

#### Optimization
```bash
# SVG Optimization (using SVGO)
npx svgo --folder ./assets/logos --recursive --config svgo.config.js

# PNG Optimization (using TinyPNG)
# Automatic compression via TinyPNG API or manual upload
```

## Usage Guidelines

### File Naming Convention
```
[category]-[name]-[variant].[extension]

Examples:
- logo-ai-toologist-full.svg
- icon-chatgpt-outlined.svg  
- mockup-landing-lg-light.png
- button-primary-default.svg
```

### Folder Structure for Development
```
public/
├── assets/
│   ├── logos/
│   ├── icons/
│   ├── tool-icons/
│   └── ui-components/
├── images/
│   └── mockups/
└── favicon/
```

### Import Statements
```tsx
// Static imports
import AIToologistLogo from '/assets/logos/ai-toologist-logo.svg';
import ChatGPTIcon from '/assets/tool-icons/chatgpt-icon.svg';

// Dynamic imports
const iconSrc = `/assets/tool-icons/${toolName}-icon.svg`;
```

## Quality Checklist

### ✅ SVG Assets
- [ ] Optimized file size (<10KB for logos, <5KB for icons)
- [ ] Proper viewBox attributes
- [ ] Consistent stroke width (2px)
- [ ] Clean, semantic markup
- [ ] No embedded fonts or external dependencies

### ✅ PNG Assets  
- [ ] 2x resolution for Retina displays
- [ ] Compressed for web (under 500KB for mockups)
- [ ] Accurate colors matching design tokens
- [ ] Proper transparency for UI components

### ✅ Documentation
- [ ] Clear usage guidelines
- [ ] Implementation code examples
- [ ] File structure documentation
- [ ] Naming convention guide

This asset package provides everything needed for a complete React + Tailwind implementation of the AI Toologist design system.