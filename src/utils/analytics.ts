/**
 * Analytics Tracking Utilities
 * 
 * Simple analytics system for tracking user interactions.
 * Currently console-based for development, can be replaced with
 * real analytics providers (GA4, Mixpanel, Amplitude, etc.).
 */

export interface AnalyticsEvent {
  eventName: string;
  payload: Record<string, any>;
  timestamp: number;
}

/**
 * Track an analytics event
 * 
 * @param eventName - The name of the event to track
 * @param payload - The event data payload
 * 
 * @example
 * trackEvent('tool_card_click', {
 *   toolId: 'chatgpt-4',
 *   toolName: 'ChatGPT',
 *   timestamp: Date.now()
 * });
 */
export function trackEvent(eventName: string, payload: Record<string, any> = {}): void {
  try {
    // Ensure required fields with fallbacks
    const safePayload = {
      ...payload,
      timestamp: payload.timestamp || Date.now(),
      // Add session info if available
      sessionId: getSessionId(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown'
    };

    // Structured console logging for development
    console.log(`[Analytics] ${eventName} ->`, safePayload);

    // Store event for potential batch sending
    storeEventLocally(eventName, safePayload);

    // TODO: Replace with real analytics provider
    // Examples:
    // - Google Analytics: gtag('event', eventName, safePayload)
    // - Mixpanel: mixpanel.track(eventName, safePayload)
    // - Amplitude: amplitude.track(eventName, safePayload)
    // - Custom API: sendToAnalyticsAPI(eventName, safePayload)

  } catch (error) {
    // Fail silently in production to avoid breaking user experience
    console.warn('[Analytics] Failed to track event:', eventName, error);
  }
}

/**
 * Track tool interactions specifically
 */
export const analyticsEvents = {
  /**
   * Track when a user clicks on a tool card
   */
  toolCardClick: (toolId: string, toolName: string, context?: string) => {
    trackEvent('tool_card_click', {
      toolId: toolId || 'unknown',
      toolName: toolName || 'Unknown Tool',
      context: context || 'explore',
      timestamp: Date.now()
    });
  },

  /**
   * Track when a user views a tool detail page
   */
  toolDetailView: (toolId: string, toolName: string, source?: string) => {
    trackEvent('tool_detail_view', {
      toolId: toolId || 'unknown',
      toolName: toolName || 'Unknown Tool',
      source: source || 'direct',
      timestamp: Date.now()
    });
  },

  /**
   * Track when a user adds a tool to their wallet
   */
  toolAddedToWallet: (toolId: string, toolName: string) => {
    trackEvent('tool_added_to_wallet', {
      toolId: toolId || 'unknown',
      toolName: toolName || 'Unknown Tool',
      timestamp: Date.now()
    });
  },

  /**
   * Track when a user compares tools
   */
  toolCompare: (toolIds: string[], toolNames: string[]) => {
    trackEvent('tool_compare', {
      toolIds: toolIds || [],
      toolNames: toolNames || [],
      toolCount: toolIds?.length || 0,
      timestamp: Date.now()
    });
  },

  /**
   * Track search interactions
   */
  searchPerformed: (query: string, category?: string, resultsCount?: number) => {
    trackEvent('search_performed', {
      query: query || '',
      category: category || 'all',
      resultsCount: resultsCount || 0,
      timestamp: Date.now()
    });
  },

  /**
   * Track filter usage
   */
  filterApplied: (filterType: string, filterValue: string) => {
    trackEvent('filter_applied', {
      filterType: filterType || 'unknown',
      filterValue: filterValue || '',
      timestamp: Date.now()
    });
  },

  /**
   * Track tutorial interactions
   */
  tutorialCardClick: (tutorialId: number | string, tutorialTitle: string, context?: string) => {
    trackEvent('tutorial_card_click', {
      tutorialId: tutorialId?.toString() || 'unknown',
      tutorialTitle: tutorialTitle || 'Unknown Tutorial',
      context: context || 'tutorials',
      timestamp: Date.now()
    });
  },

  tutorialStarted: (tutorialId: number | string, tutorialTitle: string) => {
    trackEvent('tutorial_started', {
      tutorialId: tutorialId?.toString() || 'unknown',
      tutorialTitle: tutorialTitle || 'Unknown Tutorial',
      timestamp: Date.now()
    });
  },

  tutorialCompleted: (tutorialId: number | string, tutorialTitle: string, duration?: number) => {
    trackEvent('tutorial_completed', {
      tutorialId: tutorialId?.toString() || 'unknown',
      tutorialTitle: tutorialTitle || 'Unknown Tutorial',
      duration: duration || null,
      timestamp: Date.now()
    });
  },

  tutorialLessonCompleted: (tutorialId: number | string, lessonId: number | string, lessonTitle: string) => {
    trackEvent('tutorial_lesson_completed', {
      tutorialId: tutorialId?.toString() || 'unknown',
      lessonId: lessonId?.toString() || 'unknown',
      lessonTitle: lessonTitle || 'Unknown Lesson',
      timestamp: Date.now()
    });
  },

  /**
   * Track news/content interactions
   */
  newsArticleClick: (articleId: string, articleTitle: string, context?: string) => {
    trackEvent('news_article_click', {
      articleId: articleId || 'unknown',
      articleTitle: articleTitle || 'Unknown Article',
      context: context || 'news',
      timestamp: Date.now()
    });
  },

  /**
   * Track workflow interactions  
   */
  workflowCreated: (workflowId: string, workflowName: string, toolsUsed: string[]) => {
    trackEvent('workflow_created', {
      workflowId: workflowId || 'unknown',
      workflowName: workflowName || 'Unknown Workflow',
      toolsUsed: toolsUsed || [],
      toolCount: toolsUsed?.length || 0,
      timestamp: Date.now()
    });
  },

  workflowExecuted: (workflowId: string, workflowName: string, success: boolean) => {
    trackEvent('workflow_executed', {
      workflowId: workflowId || 'unknown',
      workflowName: workflowName || 'Unknown Workflow',
      success: success,
      timestamp: Date.now()
    });
  }
};

/**
 * Get or create a session ID for tracking user sessions
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server-side';
  
  try {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  } catch {
    return `session_${Date.now()}`;
  }
}

/**
 * Store events locally for potential batch sending
 */
function storeEventLocally(eventName: string, payload: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  
  try {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({ eventName, payload, timestamp: Date.now() });
    
    // Keep only last 100 events to prevent storage bloat
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));
  } catch (error) {
    // Ignore storage errors
    console.warn('[Analytics] Failed to store event locally:', error);
  }
}

/**
 * Get stored events (for debugging or batch sending)
 */
export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  
  try {
    return JSON.parse(localStorage.getItem('analytics_events') || '[]');
  } catch {
    return [];
  }
}

/**
 * Clear stored events
 */
export function clearStoredEvents(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('analytics_events');
  } catch {
    // Ignore storage errors
  }
}

/**
 * Development helper to log all tracked events
 */
export function enableAnalyticsDebug(): void {
  console.log('[Analytics] Debug mode enabled');
  console.log('[Analytics] Stored events:', getStoredEvents());
}

// Export for debugging in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).analytics = {
    trackEvent,
    analyticsEvents,
    getStoredEvents,
    clearStoredEvents,
    enableAnalyticsDebug
  };
}