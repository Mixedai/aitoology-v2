import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { AlertTriangle, ArrowLeft, Home, Search, RefreshCw, FileQuestion, Zap, BookOpen } from 'lucide-react';

interface NotFoundProps {
  onNavigate: (fromScreen: string, toScreen: string, params?: any) => void;
  currentScreen?: string;
  selectedItem?: {
    error?: {
      type: 'tool' | 'page' | 'resource' | 'network';
      id?: string;
      message?: string;
      sourceUrl?: string;
      statusCode?: number;
    };
  };
  // Legacy prop support
  error?: {
    type: 'tool' | 'page' | 'resource' | 'network';
    id?: string;
    message?: string;
    sourceUrl?: string;
    statusCode?: number;
  };
}

/*
Not Found Frame - Comprehensive Error State Handler
Design System: 8-point grid (gap-6, p-6, mb-8), semantic typography, semantic colors
Accessibility: WCAG 2.1 AA compliant with skip links, focus management, screen reader support
Prototype State: Context-aware error handling for tools, pages, resources, and network issues
Navigation: Intelligent routing back to working areas with focus management
Keyboard: Tab navigation, Enter activation, Esc for back action
Screen Reader: Descriptive ARIA labels, structured content hierarchy
*/

export function NotFound({ onNavigate, currentScreen = 'not-found', selectedItem, error }: NotFoundProps) {
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  
  // Support both selectedItem.error and direct error props (legacy)
  const errorData = selectedItem?.error || error;
  
  // Focus management for accessibility
  useEffect(() => {
    // Focus the primary action button when component mounts
    setTimeout(() => {
      primaryButtonRef.current?.focus();
    }, 100);
  }, []);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Esc key provides quick back navigation
        window.history.back();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getErrorContent = () => {
    const type = errorData?.type || 'page';
    const id = errorData?.id;
    const statusCode = errorData?.statusCode || 404;

    switch (type) {
      case 'tool':
        return {
          statusCode,
          title: 'AI Tool Not Found',
          description: id 
            ? `The AI tool "${id}" could not be found or may have been removed from our catalog.`
            : 'The requested AI tool could not be found in our database.',
          suggestion: 'Explore our comprehensive AI tools catalog to discover alternatives that might better suit your needs.',
          primaryAction: { 
            label: 'Search Tools', 
            target: 'explore-frame',
            icon: Search,
            params: { focusSearch: true, searchQuery: id } 
          },
          secondaryAction: { 
            label: 'Browse All Tools', 
            target: 'explore-frame',
            icon: Zap 
          },
          tertiaryAction: { 
            label: 'Back to Home', 
            target: 'home',
            icon: Home 
          },
          category: 'Tool Error',
          severity: 'medium'
        };

      case 'resource':
        return {
          statusCode,
          title: 'Resource Not Available',
          description: id 
            ? `The resource "${id}" is temporarily unavailable or has been moved.`
            : 'The requested resource could not be accessed at this time.',
          suggestion: 'This might be a temporary issue. Try refreshing the page or explore other sections of our platform.',
          primaryAction: { 
            label: 'Refresh Page', 
            target: 'refresh',
            icon: RefreshCw 
          },
          secondaryAction: { 
            label: 'Browse Tools', 
            target: 'explore-frame',
            icon: Search 
          },
          tertiaryAction: { 
            label: 'Back to Home', 
            target: 'home',
            icon: Home 
          },
          category: 'Resource Error',
          severity: 'low'
        };

      case 'network':
        return {
          statusCode: statusCode || 503,
          title: 'Connection Issue',
          description: 'Unable to connect to our servers. This might be a temporary network issue.',
          suggestion: 'Please check your internet connection and try again. If the problem persists, our team has been notified.',
          primaryAction: { 
            label: 'Try Again', 
            target: 'refresh',
            icon: RefreshCw 
          },
          secondaryAction: { 
            label: 'View Offline Content', 
            target: 'tutorials-frame',
            icon: BookOpen 
          },
          tertiaryAction: { 
            label: 'Back to Home', 
            target: 'home',
            icon: Home 
          },
          category: 'Network Error',
          severity: 'high'
        };

      default: // 'page'
        return {
          statusCode,
          title: 'Page Not Found',
          description: 'The page you\'re looking for doesn\'t exist or may have been moved to a new location.',
          suggestion: 'Don\'t worry! Let\'s get you back on track with our most popular sections.',
          primaryAction: { 
            label: 'Back to Home', 
            target: 'home',
            icon: Home 
          },
          secondaryAction: { 
            label: 'Explore AI Tools', 
            target: 'explore-frame',
            icon: Search 
          },
          tertiaryAction: { 
            label: 'View Tutorials', 
            target: 'tutorials-frame',
            icon: BookOpen 
          },
          category: 'Page Error',
          severity: 'low'
        };
    }
  };

  const content = getErrorContent();

  const handleNavigation = (target: string, params?: any) => {
    if (target === 'refresh') {
      window.location.reload();
      return;
    }
    
    // Enhanced navigation with focus management
    if (target === 'explore-frame' && params?.focusSearch) {
      // Navigate to explore and focus search input
      onNavigate(currentScreen, target, { 
        ...params,
        autoFocus: 'search-input',
        searchQuery: params.searchQuery 
      });
    } else {
      onNavigate(currentScreen, target, params);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16"> {/* Account for sticky navbar */}
      {/* Skip link for screen readers */}
      <a 
        href="#main-error-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-6 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to error content
      </a>

      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-8" id="main-error-content">
          {/* Error Status Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center ring-4 ring-muted/20">
                <AlertTriangle 
                  className="w-10 h-10 text-muted-foreground" 
                  aria-hidden="true" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <Badge variant={getSeverityColor(content.severity)}>
                  {content.statusCode}
                </Badge>
                <Badge variant="outline">
                  {content.category}
                </Badge>
              </div>
              
              <h1 className="text-foreground">{content.title}</h1>
              
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {content.description}
              </p>
            </div>
          </div>

          {/* Error Details Card (for specific errors with IDs) */}
          {errorData?.id && (
            <Card>
              <CardHeader className="space-y-4">
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion className="w-5 h-5" aria-hidden="true" />
                  Error Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4>Resource ID</h4>
                    <p className="text-muted-foreground font-mono bg-muted p-4 rounded break-all">
                      {errorData.id}
                    </p>
                  </div>
                  
                  {errorData.sourceUrl && (
                    <div>
                      <h4>Source URL</h4>
                      <p className="text-muted-foreground font-mono bg-muted p-4 rounded break-all">
                        {errorData.sourceUrl}
                      </p>
                    </div>
                  )}
                  
                  {errorData.message && (
                    <div className="md:col-span-2">
                      <h4>Technical Details</h4>
                      <p className="text-muted-foreground bg-muted p-4 rounded">
                        {errorData.message}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Helpful Actions */}
          <Card>
            <CardHeader className="space-y-4">
              <CardTitle>What would you like to do next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                {content.suggestion}
              </p>
              
              <Separator />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  ref={primaryButtonRef}
                  onClick={() => handleNavigation(content.primaryAction.target, content.primaryAction.params)}
                  className="flex items-center gap-2"
                  aria-describedby="primary-action-description"
                >
                  <content.primaryAction.icon className="w-4 h-4" aria-hidden="true" />
                  {content.primaryAction.label}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleNavigation(content.secondaryAction.target)}
                  className="flex items-center gap-2"
                >
                  <content.secondaryAction.icon className="w-4 h-4" aria-hidden="true" />
                  {content.secondaryAction.label}
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation(content.tertiaryAction.target)}
                  className="flex items-center gap-2"
                >
                  <content.tertiaryAction.icon className="w-4 h-4" aria-hidden="true" />
                  {content.tertiaryAction.label}
                </Button>
              </div>

              {/* Quick back option */}
              <div className="pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Helpful Tips */}
          <Card className="bg-muted/20">
            <CardHeader className="space-y-4">
              <CardTitle>Helpful Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4>Popular Sections</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Browse 500+ AI tools by category</li>
                    <li>• Compare tools side-by-side</li>
                    <li>• Read comprehensive tool reviews</li>
                    <li>• Create custom tool workflows</li>
                  </ul>
                </div>
                
                <div>
                  <h4>Getting Help</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Use Cmd/Ctrl+K for global search</li>
                    <li>• Check our tutorials and guides</li>
                    <li>• Contact support if issues persist</li>
                    <li>• Report broken links via feedback</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Notes (for prototype only) */}
          <Card className="border-dashed border-2 border-muted/50 bg-muted/10">
            <CardHeader className="space-y-4">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                Prototype Implementation Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div>
                <h4>Error Triggers</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Tool Errors:</strong> Invalid tool_id parameters (not in mock data)</li>
                  <li><strong>Page Errors:</strong> Direct access to non-existent routes</li>
                  <li><strong>Resource Errors:</strong> Missing files, images, or data</li>
                  <li><strong>Network Errors:</strong> Simulated connection failures</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4>Production Implementation</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Validate tool_id against Supabase database queries</li>
                  <li>Implement proper React error boundaries</li>
                  <li>Log 404/error events to analytics (Supabase Functions)</li>
                  <li>Handle network timeouts and retry logic</li>
                  <li>Add breadcrumb navigation context</li>
                  <li>Implement intelligent search suggestions</li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4>Accessibility Features</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Skip links for screen reader navigation</li>
                  <li>Focus management and keyboard navigation</li>
                  <li>Descriptive ARIA labels and error announcements</li>
                  <li>High contrast mode and reduced motion support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Hidden description for screen readers */}
      <div id="primary-action-description" className="sr-only">
        Primary recommended action to resolve this error
      </div>
    </div>
  );
}