# Compare Feature - Testing Checklist

## Manual Testing Guide

This checklist ensures the Compare feature works correctly across all functionality.

### Prerequisites
- Dev server running (`npm run dev`)
- Navigate to Compare page via App Router or direct URL

### Core Functionality Tests

#### 1. Initial Page Load ✓
- [ ] Compare page loads without errors
- [ ] Header displays "Compare Tools" title
- [ ] 3 default tools are pre-selected (ChatGPT, MidJourney, Notion AI)
- [ ] URL contains `?tools=chatgpt,midjourney,notion-ai` query parameter
- [ ] Table shows all feature rows grouped by category (General, Capabilities)

#### 2. Tool Selection ✓
- [ ] Search bar filters tools when typing
- [ ] Clicking unselected tool adds it to comparison
- [ ] Clicking selected tool removes it from comparison
- [ ] Selected tools show with indigo background
- [ ] Maximum of ~10 tools can be compared (table remains readable)
- [ ] URL updates immediately when selection changes

#### 3. Differences Only Filter ✓
- [ ] Checkbox toggles on/off smoothly
- [ ] When ON: Only rows with different values appear
- [ ] When ON: Rows with values within 0.05 tolerance are hidden (e.g., 4.95 vs 5.0 ratings)
- [ ] When OFF: All feature rows are visible
- [ ] Group headers remain visible even if some groups are empty

#### 4. URL Synchronization ✓
- [ ] Refreshing page maintains selected tools
- [ ] Sharing URL loads same tool selection
- [ ] Invalid tool slugs in URL are ignored gracefully
- [ ] Empty/missing tools parameter defaults to first 3 tools

#### 5. Export Features ✓

##### Copy Link Button
- [ ] Click shows "Link copied to clipboard!" alert
- [ ] Clipboard contains current page URL with tool selection
- [ ] Works in different browsers (Chrome, Firefox, Safari)

##### Export CSV Button
- [ ] Downloads file named "compare.csv"
- [ ] CSV contains header row with tool names
- [ ] CSV respects "Differences only" filter if enabled
- [ ] Values are properly escaped/quoted
- [ ] Boolean values show as "Yes"/"No"
- [ ] Numbers include units where applicable

#### 6. Visual Features ✓
- [ ] Column hover highlights entire column with indigo tint
- [ ] Zebra striping alternates row backgrounds
- [ ] Sticky header remains visible when scrolling
- [ ] Sticky first column (Feature names) when scrolling horizontally
- [ ] Group headers have distinct styling
- [ ] Dark mode works correctly (if implemented)

#### 7. Data Accuracy ✓
- [ ] Feature detection works correctly:
  - API Available: Shows "Yes" for tools with API/SDK in features
  - Writing Support: Shows "Yes" for Grammarly, Notion AI
  - Code Support: Shows "Yes" for GitHub Copilot
  - Video Support: Shows "Yes" for Runway ML
  - Chat Support: Shows "Yes" for ChatGPT, Claude
- [ ] Ratings display with "/5" unit
- [ ] Pricing shows correct tier (Free/Freemium/Paid)
- [ ] Categories match tool data

#### 8. Performance ✓
- [ ] Table renders smoothly with 3-5 tools
- [ ] Virtualization activates for 50+ feature rows
- [ ] No lag when toggling filters
- [ ] Smooth column hover animations
- [ ] Fast tool selection/deselection

#### 9. Edge Cases ✓
- [ ] Single tool selection works
- [enson only - all rows hidden except non-matching
- [ ] 10+ tools - horizontal scroll works
- [ ] Long tool names don't break layout
- [ ] Missing data shows "—" placeholder

### Browser Compatibility
Test in:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS)
- [ ] Mobile responsive (bonus)

### Accessibility (Basic)
- [ ] Keyboard navigation works (Tab through controls)
- [ ] Checkbox can be toggled with Space
- [ ] Buttons can be activated with Enter
- [ ] Focus indicators visible

## Quick Test Script

```bash
# 1. Start dev server
npm run dev

# 2. Open browser to compare page
open http://localhost:3000/

# 3. Navigate to Compare via App Router
# Click "Compare Tools" card

# 4. Test URL patterns
# http://localhost:3000/compare?tools=chatgpt,claude,perplexity
# http://localhost:3000/compare?tools=invalid,chatgpt
# http://localhost:3000/compare

# 5. Console check - should be error-free
# Open DevTools Console (F12)
```

## Automated Test Ideas (Future)

For future implementation with Vitest + Testing Library:

```typescript
// src/components/compare/__tests__/ComparePage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ComparePage from '../ComparePage';

describe('ComparePage', () => {
  it('renders with default tools', () => {
    render(<ComparePage />);
    expect(screen.getByText('Compare Tools')).toBeInTheDocument();
    expect(screen.getByText('ChatGPT')).toBeInTheDocument();
  });

  it('updates URL when tools change', () => {
    // Mock window.history.replaceState
    // Select new tool
    // Assert URL contains new tool slug
  });

  it('filters differences correctly', () => {
    // Toggle differences only
    // Assert row count changes
  });
});
```

## Bug Report Template

If issues found, report with:
1. Steps to reproduce
2. Expected behavior  
3. Actual behavior
4. Browser/OS
5. Console errors (if any)
6. Screenshot (if visual bug)

---

Last tested: [Date]
Tested by: [Name]
Version: [Git commit or version]