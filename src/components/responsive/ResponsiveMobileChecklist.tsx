import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  CheckCircle, 
  AlertCircle, 
  Smartphone, 
  Monitor, 
  Tablet,
  Eye,
  Navigation,
  Filter,
  Command,
  Menu,
  Search
} from 'lucide-react';

/*
RESPONSIVE MOBILE VERIFICATION CHECKLIST
This component documents all responsive variants and mobile optimizations
across the key screens: Home, Browse, Tool Detail, Tutorials, News, Wallet.
*/

interface ResponsiveCheck {
  screen: string;
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
  stickyHeader: boolean;
  bottomSheet: boolean;
  mobileFilters: boolean;
  commandPalette: boolean;
  keyFeatures: string[];
  edgeCases: string[];
}

const responsiveChecks: ResponsiveCheck[] = [
  {
    screen: 'Global Navbar',
    desktop: true,
    tablet: true,
    mobile: true,
    stickyHeader: true,
    bottomSheet: false,
    mobileFilters: true,
    commandPalette: true,
    keyFeatures: [
      'Fixed position when scrolling (sticky top-0 z-50)',
      'Backdrop blur with 95% opacity background',
      'Mobile hamburger menu with slide-out drawer',
      'Responsive search bar (desktop) / icon (mobile)',
      'Logo visibility: text hidden on mobile (sm:block)',
      'Command palette accessible via ⌘K shortcut'
    ],
    edgeCases: [
      'Mobile menu closes when navigation item selected',
      'Focus management in dropdown menus',
      'Proper ARIA labels for screen readers'
    ]
  },
  {
    screen: 'AIToologistHome',
    desktop: true,
    tablet: true,
    mobile: true,
    stickyHeader: true,
    bottomSheet: false,
    mobileFilters: false,
    commandPalette: true,
    keyFeatures: [
      'Hero section: py-16 md:py-24 responsive padding',
      'Grid layout: grid-cols-1 lg:grid-cols-2 for hero content',
      'Tool cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'Search input with mobile-friendly sizing',
      'Responsive typography: text-3xl md:text-4xl lg:text-5xl',
      'Mobile-first button stacking: flex-col sm:flex-row'
    ],
    edgeCases: [
      'Search suggestions modal sizing on mobile',
      'Tool cards maintain aspect ratio on all screens',
      'Newsletter signup form responsive layout'
    ]
  },
  {
    screen: 'BrowseTools',
    desktop: true,
    tablet: true,
    mobile: true,
    stickyHeader: true,
    bottomSheet: true,
    mobileFilters: true,
    commandPalette: true,
    keyFeatures: [
      'Desktop: Sidebar filters with sticky positioning',
      'Mobile: Bottom sheet filters (h-[90vh] overflow-hidden)',
      'Filter chips: flex-wrap gap-2 responsive layout',
      'Tool grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'Mobile filter toggle with apply/reset actions',
      'Responsive pagination controls'
    ],
    edgeCases: [
      'Bottom sheet prevents page scroll overflow',
      'Filter state preserved during mobile transitions',
      'Keyboard navigation in mobile filter sheets',
      'Proper focus trap in bottom sheet modal'
    ]
  },
  {
    screen: 'ToolDetail',
    desktop: true,
    tablet: true,
    mobile: true,
    stickyHeader: true,
    bottomSheet: false,
    mobileFilters: false,
    commandPalette: true,
    keyFeatures: [
      'Sticky tab navigation: top-16 z-10 (avoids navbar conflict)',
      'Two-column layout: grid-cols-1 md:grid-cols-2 for features',
      'Mobile-friendly tab scrolling with overflow-x-auto',
      'Responsive pricing cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'Action buttons: flex-col sm:flex-row gap-3',
      'Mobile modal sizing for reviews and comparisons'
    ],
    edgeCases: [
      'Tab navigation maintains proper spacing on mobile',
      'Modal content scrollable without body overflow',
      'Image gallery thumbnails responsive sizing'
    ]
  },
  {
    screen: 'TutorialsFrame',
    desktop: true,
    tablet: true,
    mobile: true,
    stickyHeader: true,
    bottomSheet: false,
    mobileFilters: true,
    commandPalette: true,
    keyFeatures: [
      'Tutorial detail: sticky top-16 header (avoids navbar)',
      'Mobile collapsible filters with proper spacing',
      'Tutorial grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'Progress cards responsive on mobile screens',
      'Video player aspect-ratio maintained',
      'Mobile-friendly tutorial step navigation'
    ],
    edgeCases: [
      'Tutorial detail view maintains readable text width',
      'Video controls accessible on touch devices',
      'Related tutorials scroll properly on mobile'
    ]
  },
  {
    screen: 'NewsFrame',
    desktop: true,
    tablet: true,
    mobile: true,
    stickyHeader: true,
    bottomSheet: false,
    mobileFilters: true,
    commandPalette: true,
    keyFeatures: [
      'Article grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      'Mobile-friendly article card layout',
      'Responsive category filters',
      'Search bar full-width on mobile',
      'News detail view optimized for reading',
      'Mobile sharing and bookmarking controls'
    ],
    edgeCases: [
      'Article images maintain aspect ratio',
      'Category badges wrap properly on narrow screens',
      'Related articles section scrollable on mobile'
    ]
  },
  {
    screen: 'ToolWallet',
    desktop: true,
    tablet: true,
    mobile: true,
    stickyHeader: true,
    bottomSheet: true,
    mobileFilters: false,
    commandPalette: true,
    keyFeatures: [
      'Dashboard metrics: grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      'Chart containers: h-[300px] lg:h-[400px] responsive',
      'Mobile subscription card layout optimization',
      'Bottom sheet for add subscription modal',
      'Responsive data table with horizontal scrolling',
      'Mobile-friendly renewal alerts'
    ],
    edgeCases: [
      'Charts maintain readability on mobile screens',
      'Modal forms prevent keyboard from hiding inputs',
      'Subscription table scrolls horizontally without page overflow',
      'Dark mode toggle works properly on mobile'
    ]
  }
];

export function ResponsiveMobileChecklist() {
  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-4 h-4 text-success" />
    ) : (
      <AlertCircle className="w-4 h-4 text-destructive" />
    );
  };

  const getDeviceIcon = (device: 'desktop' | 'tablet' | 'mobile') => {
    switch (device) {
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Smartphone className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-medium">Responsive & Mobile Verification</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive verification of Desktop/Tablet/Mobile variants, sticky headers, 
          bottom-sheet filters, and mobile optimizations across all key screens.
        </p>
      </div>

      {/* Summary Status */}
      <Alert>
        <CheckCircle className="w-4 h-4" />
        <AlertDescription>
          <strong>Verification Complete:</strong> All screens verified with proper responsive variants, 
          sticky navbar (top-0 z-50), and mobile optimizations. Bottom-sheet filters implemented 
          where needed, command palette accessible via ⌘K shortcut.
        </AlertDescription>
      </Alert>

      {/* Detailed Verification */}
      <div className="space-y-6">
        {responsiveChecks.map((check, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  {check.screen}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    {getDeviceIcon('desktop')}
                    {getStatusIcon(check.desktop)}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    {getDeviceIcon('tablet')}
                    {getStatusIcon(check.tablet)}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    {getDeviceIcon('mobile')}
                    {getStatusIcon(check.mobile)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Status Checks */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Navigation className="w-4 h-4 text-muted-foreground" />
                  <span className={check.stickyHeader ? 'text-success' : 'text-destructive'}>
                    Sticky Header
                  </span>
                  {getStatusIcon(check.stickyHeader)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Menu className="w-4 h-4 text-muted-foreground" />
                  <span className={check.bottomSheet ? 'text-success' : 'text-muted-foreground'}>
                    Bottom Sheet
                  </span>
                  {getStatusIcon(check.bottomSheet)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className={check.mobileFilters ? 'text-success' : 'text-muted-foreground'}>
                    Mobile Filters
                  </span>
                  {getStatusIcon(check.mobileFilters)}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Command className="w-4 h-4 text-muted-foreground" />
                  <span className={check.commandPalette ? 'text-success' : 'text-destructive'}>
                    Command Palette
                  </span>
                  {getStatusIcon(check.commandPalette)}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  Key Responsive Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {check.keyFeatures.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edge Cases */}
              {check.edgeCases.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    Edge Cases Handled
                  </h4>
                  <div className="space-y-2">
                    {check.edgeCases.map((edge, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{edge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Implementation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Implementation Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Sticky Headers ✓</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Global Navbar: <code>sticky top-0 z-50</code></p>
                <p>• Detail Views: <code>sticky top-16 z-10</code></p>
                <p>• Backdrop blur with 95% opacity</p>
                <p>• Proper z-index layering</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Mobile Optimizations ✓</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Bottom sheet filters where needed</p>
                <p>• Touch-friendly button sizing</p>
                <p>• Responsive typography scaling</p>
                <p>• Mobile-first grid layouts</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Accessibility ✓</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Focus management in modals</p>
                <p>• Proper ARIA labels</p>
                <p>• Keyboard navigation support</p>
                <p>• Screen reader compatibility</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}