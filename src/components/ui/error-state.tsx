import React from 'react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Wifi, 
  Server,
  ShieldAlert,
  Search,
  Clock,
  XCircle,
  Info
} from 'lucide-react';

/*
ERROR STATE COMPONENTS - AI TOOLOGIST DESIGN SYSTEM

Comprehensive error states with retry functionality and proper accessibility.

Tailwind Classes:
- Container: flex flex-col items-center justify-center py-12 px-6 text-center
- Icon: w-16 h-16 md:w-20 md:h-20 text-destructive mb-6
- Title: text-lg md:text-xl font-medium text-destructive mb-2
- Description: text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed
- Error Card: border-destructive/20 bg-destructive/5
- Retry Button: gap-2 transition-all duration-200 hover:scale-105
- Spacing: space-y-4 gap-6 mb-6 (8-point grid compliance)

Accessibility:
- role="alert" for critical errors
- aria-label for context
- Proper semantic headings
- Clear retry actions
- Focus management for primary actions
*/

interface ErrorStateProps {
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
  error?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  retryLabel?: string;
  homeLabel?: string;
  className?: string;
  severity?: 'error' | 'warning' | 'info';
}

// Generic Error State Component
export function ErrorState({ 
  icon: Icon = AlertTriangle, 
  title, 
  description, 
  error,
  onRetry, 
  onGoHome,
  retryLabel = "Try Again",
  homeLabel = "Go Home",
  className = "",
  severity = 'error'
}: ErrorStateProps) {
  const iconColor = severity === 'error' ? 'text-destructive' 
    : severity === 'warning' ? 'text-amber-500' 
    : 'text-blue-500';
  
  const titleColor = severity === 'error' ? 'text-destructive' 
    : severity === 'warning' ? 'text-amber-700' 
    : 'text-blue-700';

  return (
    <div 
      className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}
      role={severity === 'error' ? "alert" : "status"}
      aria-label={`${title}: ${description}`}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon className={`w-8 h-8 md:w-10 md:h-10 ${iconColor}`} />
      </div>
      <h3 className={`text-lg md:text-xl font-medium mb-2 ${titleColor}`}>{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      
      {error && (
        <Card className="border-destructive/20 bg-destructive/5 mb-6 max-w-md">
          <CardContent className="p-4">
            <details className="text-sm text-left">
              <summary className="cursor-pointer text-destructive font-medium mb-2">
                Technical Details
              </summary>
              <code className="text-xs text-muted-foreground break-all">
                {error}
              </code>
            </details>
          </CardContent>
        </Card>
      )}

      {(onRetry || onGoHome) && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onRetry && (
            <Button 
              onClick={onRetry}
              className="gap-2 transition-all duration-200 hover:scale-105"
              autoFocus
            >
              <RefreshCw className="w-4 h-4" />
              {retryLabel}
            </Button>
          )}
          {onGoHome && (
            <Button 
              variant="outline" 
              onClick={onGoHome}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              {homeLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

// Network Error State
export function NetworkErrorState({ onRetry, onGoHome }: {
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <ErrorState
      icon={Wifi}
      title="Connection Error"
      description="Unable to connect to our servers. Please check your internet connection and try again."
      onRetry={onRetry}
      onGoHome={onGoHome}
      retryLabel="Retry Connection"
    />
  );
}

// Server Error State
export function ServerErrorState({ error, onRetry, onGoHome }: {
  error?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <ErrorState
      icon={Server}
      title="Server Error"
      description="Something went wrong on our end. Our team has been notified and is working on a fix."
      error={error}
      onRetry={onRetry}
      onGoHome={onGoHome}
      retryLabel="Try Again"
    />
  );
}

// Permission Error State
export function PermissionErrorState({ onLogin, onGoHome }: {
  onLogin?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <ErrorState
      icon={ShieldAlert}
      title="Access Denied"
      description="You don't have permission to view this content. Please log in or contact support if you believe this is an error."
      onRetry={onLogin}
      onGoHome={onGoHome}
      retryLabel="Sign In"
      homeLabel="Go Home"
    />
  );
}

// Not Found Error State
export function NotFoundErrorState({ resourceType = "page", onGoHome, onSearch }: {
  resourceType?: string;
  onGoHome?: () => void;
  onSearch?: () => void;
}) {
  return (
    <ErrorState
      icon={Search}
      title={`${resourceType} Not Found`}
      description={`The ${resourceType} you're looking for doesn't exist or may have been moved. Try searching or browse our categories.`}
      onRetry={onSearch}
      onGoHome={onGoHome}
      retryLabel="Search"
      homeLabel="Go Home"
      severity="warning"
    />
  );
}

// Timeout Error State
export function TimeoutErrorState({ onRetry, onGoHome }: {
  onRetry?: () => void;
  onGoHome?: () => void;
}) {
  return (
    <ErrorState
      icon={Clock}
      title="Request Timeout"
      description="The request is taking longer than expected. Please try again or check your connection."
      onRetry={onRetry}
      onGoHome={onGoHome}
      retryLabel="Try Again"
      severity="warning"
    />
  );
}

// Load Error State for Lists
export function ListErrorState({ onRetry, onRefresh }: {
  onRetry?: () => void;
  onRefresh?: () => void;
}) {
  return (
    <ErrorState
      icon={XCircle}
      title="Failed to Load"
      description="We couldn't load the content. This might be a temporary issue with our servers."
      onRetry={onRetry || onRefresh}
      retryLabel="Reload"
    />
  );
}

// API Error State
export function ApiErrorState({ error, onRetry }: {
  error?: string;
  onRetry?: () => void;
}) {
  return (
    <ErrorState
      icon={Server}
      title="API Error"
      description="There was an issue communicating with our services. Please try again in a few moments."
      error={error}
      onRetry={onRetry}
      retryLabel="Retry Request"
    />
  );
}

// Maintenance Mode State
export function MaintenanceErrorState({ estimatedTime }: {
  estimatedTime?: string;
}) {
  return (
    <ErrorState
      icon={Info}
      title="Under Maintenance"
      description={`We're currently performing scheduled maintenance to improve your experience. ${estimatedTime ? `Expected completion: ${estimatedTime}` : 'We\'ll be back shortly.'}`}
      severity="info"
    />
  );
}

// Feature Unavailable State
export function FeatureUnavailableState({ feature, onGoHome }: {
  feature?: string;
  onGoHome?: () => void;
}) {
  return (
    <ErrorState
      icon={Info}
      title="Feature Unavailable"
      description={`${feature || 'This feature'} is temporarily unavailable. We're working to restore it as soon as possible.`}
      onGoHome={onGoHome}
      homeLabel="Go Home"
      severity="info"
    />
  );
}

// Rate Limit Error State
export function RateLimitErrorState({ resetTime, onGoHome }: {
  resetTime?: string;
  onGoHome?: () => void;
}) {
  return (
    <ErrorState
      icon={Clock}
      title="Rate Limit Exceeded"
      description={`You've made too many requests. ${resetTime ? `Try again after ${resetTime}` : 'Please wait a few minutes before trying again.'}`}
      onGoHome={onGoHome}
      homeLabel="Go Home"
      severity="warning"
    />
  );
}

// Empty Search State
export function EmptySearchState({ query, onClear }: {
  query: string;
  onClear?: () => void;
}) {
  return (
    <ErrorState
      icon={Search}
      title="No Results Found"
      description={`No tools found for "${query}". Try different keywords or browse our categories to discover new AI tools.`}
      onRetry={onClear}
      retryLabel="Clear Search"
      severity="info"
    />
  );
}

// Empty Filter State
export function EmptyFilterState({ onClearFilters }: {
  onClearFilters?: () => void;
}) {
  return (
    <ErrorState
      icon={Search}
      title="No Tools Match Your Filters"
      description="Try adjusting your filters or browse all categories to discover more AI tools."
      onRetry={onClearFilters}
      retryLabel="Clear Filters"
      severity="info"
    />
  );
}