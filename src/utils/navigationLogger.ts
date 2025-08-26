// Navigation logging and error monitoring utility for AI Toologist
// Provides comprehensive logging and debugging capabilities

import type { NavigationError, NavigationLog, ScreenId } from '../types/navigation';

class NavigationLogger {
  private logs: NavigationLog[] = [];
  private maxLogs = 100; // Keep only last 100 navigation events

  // Log successful navigation
  logNavigation(from: string, to: string, params?: any): void {
    const log: NavigationLog = {
      from,
      to,
      params,
      timestamp: new Date().toISOString(),
      hasHandler: true,
      success: true
    };

    this.addLog(log);
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ Navigation: ${from} → ${to}`, {
        params,
        timestamp: log.timestamp
      });
    }
  }

  // Log navigation error
  logError(error: NavigationError): void {
    const log: NavigationLog = {
      from: error.fromScreen,
      to: error.toScreen,
      params: error.params,
      timestamp: error.timestamp,
      hasHandler: false,
      success: false,
      error
    };

    this.addLog(log);

    // Enhanced error logging
    console.error(`❌ Navigation Error: ${error.fromScreen} → ${error.toScreen}`, {
      type: error.type,
      params: error.params,
      originalError: error.originalError,
      timestamp: error.timestamp,
      stack: error.originalError?.stack
    });

    // Track error patterns for debugging
    this.analyzeErrorPatterns(error);
  }

  // Log navigation warning
  logWarning(from: string, to: string, message: string, params?: any): void {
    const log: NavigationLog = {
      from,
      to,
      params,
      timestamp: new Date().toISOString(),
      hasHandler: false,
      success: false
    };

    this.addLog(log);

    console.warn(`⚠️ Navigation Warning: ${from} → ${to}`, {
      message,
      params,
      timestamp: log.timestamp
    });
  }

  // Add log entry and maintain size limit
  private addLog(log: NavigationLog): void {
    this.logs.push(log);
    
    // Maintain log size limit
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  // Analyze error patterns for debugging
  private analyzeErrorPatterns(error: NavigationError): void {
    const recentErrors = this.logs
      .filter(log => !log.success && log.timestamp > new Date(Date.now() - 60000).toISOString())
      .slice(-5);

    if (recentErrors.length >= 3) {
      console.warn('🔄 Multiple navigation errors detected in the last minute:', recentErrors);
    }

    // Check for circular navigation attempts
    const recentNavigations = this.logs.slice(-10);
    const circularPattern = this.detectCircularNavigation(recentNavigations);
    
    if (circularPattern) {
      console.warn('🔄 Potential circular navigation detected:', circularPattern);
    }
  }

  // Detect circular navigation patterns
  private detectCircularNavigation(logs: NavigationLog[]): string[] | null {
    if (logs.length < 4) return null;

    const pattern: string[] = [];
    for (let i = logs.length - 4; i < logs.length; i++) {
      pattern.push(`${logs[i].from}→${logs[i].to}`);
    }

    // Check if pattern repeats
    const uniqueTransitions = new Set(pattern);
    if (uniqueTransitions.size <= 2 && pattern.length >= 4) {
      return pattern;
    }

    return null;
  }

  // Get navigation statistics
  getStats(): {
    totalNavigations: number;
    successfulNavigations: number;
    errorRate: number;
    mostCommonErrors: string[];
    recentNavigations: NavigationLog[];
  } {
    const successful = this.logs.filter(log => log.success).length;
    const total = this.logs.length;
    const errorRate = total > 0 ? ((total - successful) / total * 100) : 0;

    // Get most common error types
    const errorTypes = this.logs
      .filter(log => !log.success && log.error)
      .map(log => log.error!.type);
    
    const errorCounts = errorTypes.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostCommonErrors = Object.entries(errorCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([type]) => type)
      .slice(0, 3);

    return {
      totalNavigations: total,
      successfulNavigations: successful,
      errorRate: Math.round(errorRate * 100) / 100,
      mostCommonErrors,
      recentNavigations: this.logs.slice(-10)
    };
  }

  // Export logs for debugging
  exportLogs(): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      stats: this.getStats(),
      logs: this.logs
    }, null, 2);
  }

  // Clear logs
  clearLogs(): void {
    this.logs = [];
    console.log('📝 Navigation logs cleared');
  }

  // Get logs for specific screen
  getLogsForScreen(screenId: string): NavigationLog[] {
    return this.logs.filter(log => 
      log.from === screenId || log.to === screenId
    );
  }

  // Validate navigation target before attempt
  validateNavigationTarget(target: string, validTargets: string[]): boolean {
    // Enhanced validation for null/undefined
    if (!target || typeof target !== 'string' || target.trim() === '') {
      this.logWarning('unknown', target || 'undefined', `Invalid navigation target type: ${typeof target}. Valid targets: ${validTargets.join(', ')}`);
      return false;
    }
    
    const isValid = validTargets.includes(target);
    
    if (!isValid) {
      this.logWarning('unknown', target, `Invalid navigation target. Valid targets: ${validTargets.join(', ')}`);
    }

    return isValid;
  }

  // Validate navigation parameters
  validateNavigationParams(fromScreen: string, toScreen: string, params?: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Enhanced validation for fromScreen
    if (fromScreen === undefined || fromScreen === null) {
      errors.push(`Invalid fromScreen: ${fromScreen} (${typeof fromScreen}) - must be defined`);
    } else if (typeof fromScreen !== 'string') {
      errors.push(`Invalid fromScreen: ${fromScreen} (${typeof fromScreen}) - must be string`);
    } else if (fromScreen.trim() === '') {
      errors.push(`Invalid fromScreen: empty string after trimming`);
    }
    
    // Enhanced validation for toScreen  
    if (toScreen === undefined || toScreen === null) {
      errors.push(`Invalid toScreen: ${toScreen} (${typeof toScreen}) - must be defined`);
    } else if (typeof toScreen !== 'string') {
      errors.push(`Invalid toScreen: ${toScreen} (${typeof toScreen}) - must be string`);
    } else if (toScreen.trim() === '') {
      errors.push(`Invalid toScreen: empty string after trimming`);
    }
    
    // Validate params if provided
    if (params !== undefined && params !== null && typeof params !== 'object') {
      errors.push(`Invalid params: must be object or undefined, got ${typeof params}`);
    }
    
    // Log errors if any with enhanced context
    if (errors.length > 0) {
      this.logWarning(
        fromScreen || 'unknown', 
        toScreen || 'unknown', 
        `Navigation validation failed: ${errors.join(', ')}`, 
        { 
          params, 
          context: 'parameter_validation',
          fromScreenType: typeof fromScreen,
          toScreenType: typeof toScreen
        }
      );
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Create navigation error object
  createError(
    type: NavigationError['type'],
    fromScreen: string,
    toScreen: string,
    originalError?: Error,
    params?: any
  ): NavigationError {
    return {
      type,
      fromScreen,
      toScreen,
      params,
      originalError,
      timestamp: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const navigationLogger = new NavigationLogger();

// Development helpers
if (process.env.NODE_ENV === 'development') {
  // Expose to window for debugging
  (window as any).navigationLogger = navigationLogger;
  
  // Log initialization
  console.log('🧭 Navigation logger initialized. Access via window.navigationLogger');
}

// Component-level navigation utilities
export const createSafeNavigationHandler = (
  componentName: string,
  currentScreen: string,
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void
) => {
  return (toScreen: string, params?: any) => {
    // Guard against undefined onNavigate callback
    if (!onNavigate || typeof onNavigate !== 'function') {
      console.warn(`🚨 ${componentName}: onNavigate callback is not provided or not a function`);
      return;
    }

    // Validate toScreen parameter
    if (toScreen === undefined || toScreen === null || toScreen === '') {
      console.warn(`🚨 ${componentName}: Attempted navigation with invalid toScreen:`, {
        toScreen,
        toScreenType: typeof toScreen,
        currentScreen,
        params,
        timestamp: new Date().toISOString()
      });
      
      navigationLogger.logWarning(
        currentScreen,
        `${toScreen}`,
        `${componentName} attempted navigation with invalid toScreen: ${toScreen} (${typeof toScreen})`,
        { params, component: componentName }
      );
      return;
    }

    // Validate toScreen is string
    if (typeof toScreen !== 'string') {
      console.warn(`🚨 ${componentName}: toScreen must be string, got ${typeof toScreen}:`, {
        toScreen,
        currentScreen,
        params
      });
      return;
    }

    // Sanitize toScreen
    const sanitizedToScreen = toScreen.trim();
    if (sanitizedToScreen === '') {
      console.warn(`🚨 ${componentName}: toScreen is empty after sanitization`);
      return;
    }

    // Call navigation with validated parameters
    try {
      onNavigate(currentScreen, sanitizedToScreen, params);
    } catch (error) {
      console.error(`❌ ${componentName}: Navigation callback failed:`, error);
      navigationLogger.logError(
        navigationLogger.createError(
          'handler_error',
          currentScreen,
          sanitizedToScreen,
          error instanceof Error ? error : new Error('Navigation callback failed'),
          { params, component: componentName }
        )
      );
    }
  };
};

// Enhanced validation for button/link components
export const validateNavigationProps = (
  componentName: string,
  props: { to?: string; href?: string; onClick?: () => void }
): { isValid: boolean; target?: string; error?: string } => {
  const { to, href, onClick } = props;

  // If onClick is provided without navigation target, it's valid
  if (onClick && !to && !href) {
    return { isValid: true };
  }

  // Check for navigation target
  const target = to || href;
  
  if (!target) {
    return {
      isValid: false,
      error: `${componentName} requires either 'to', 'href', or 'onClick' prop`
    };
  }

  if (typeof target !== 'string') {
    return {
      isValid: false,
      target,
      error: `${componentName} navigation target must be string, got ${typeof target}`
    };
  }

  const sanitizedTarget = target.trim();
  if (sanitizedTarget === '') {
    return {
      isValid: false,
      target,
      error: `${componentName} navigation target cannot be empty`
    };
  }

  return {
    isValid: true,
    target: sanitizedTarget
  };
};

export default navigationLogger;