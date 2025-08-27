// Global error handler to suppress third-party errors
export function setupGlobalErrorHandlers() {
  // Suppress specific third-party errors
  const suppressedDomains = [
    'launchdarkly.com',
    'analytics.google.com',
    'googletagmanager.com',
    'facebook.com',
    'doubleclick.net',
    'google-analytics.com',
    'hotjar.com',
    'segment.com',
    'mixpanel.com',
    'amplitude.com',
    'sentry.io',
    'bugsnag.com',
    'rollbar.com',
    'newrelic.com',
    'datadog.com'
  ];

  // Override console.error to filter out third-party errors
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const errorString = args.join(' ');
    
    // Check if error is from a suppressed domain
    const isThirdPartyError = suppressedDomains.some(domain => 
      errorString.includes(domain)
    );
    
    // Check for network errors from third parties
    const isNetworkError = (
      errorString.includes('ERR_NETWORK_CHANGED') ||
      errorString.includes('ERR_INTERNET_DISCONNECTED') ||
      errorString.includes('ERR_CONNECTION_REFUSED') ||
      errorString.includes('ERR_NAME_NOT_RESOLVED')
    ) && suppressedDomains.some(domain => errorString.includes(domain));
    
    // Only log if not a third-party error
    if (!isThirdPartyError && !isNetworkError) {
      originalConsoleError.apply(console, args);
    }
  };

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    const errorString = error?.toString() || '';
    
    // Check if it's a third-party error
    const isThirdPartyError = suppressedDomains.some(domain => 
      errorString.includes(domain) ||
      error?.stack?.includes(domain) ||
      error?.message?.includes(domain)
    );
    
    if (isThirdPartyError) {
      event.preventDefault(); // Prevent the error from being logged
    }
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    const { message, filename } = event;
    
    // Check if error is from a third-party script
    const isThirdPartyError = suppressedDomains.some(domain => 
      (filename && filename.includes(domain)) ||
      (message && message.includes(domain))
    );
    
    if (isThirdPartyError) {
      event.preventDefault(); // Prevent the error from being logged
      return true;
    }
  });

  // Override fetch to handle third-party request failures silently
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const url = args[0]?.toString() || '';
    
    // Check if it's a third-party request
    const isThirdPartyRequest = suppressedDomains.some(domain => 
      url.includes(domain)
    );
    
    if (isThirdPartyRequest) {
      try {
        return await originalFetch(...args);
      } catch (error) {
        // Silently fail for third-party requests
        return new Response(null, { status: 0, statusText: 'Third-party request failed silently' });
      }
    }
    
    return originalFetch(...args);
  };

  // Override XMLHttpRequest for older libraries
  const OriginalXHR = window.XMLHttpRequest;
  window.XMLHttpRequest = function() {
    const xhr = new OriginalXHR();
    const originalOpen = xhr.open;
    
    xhr.open = function(method: string, url: string, ...rest: any[]) {
      // Check if it's a third-party request
      const isThirdPartyRequest = suppressedDomains.some(domain => 
        url.includes(domain)
      );
      
      if (isThirdPartyRequest) {
        // Override error handler for third-party requests
        xhr.addEventListener('error', (event) => {
          event.stopPropagation();
          event.preventDefault();
        });
      }
      
      return originalOpen.call(xhr, method, url, ...rest);
    };
    
    return xhr;
  } as any;
}

// Clean up browser extension injected scripts
export function cleanupBrowserExtensions() {
  // Remove any LaunchDarkly or other tracking scripts injected by extensions
  document.querySelectorAll('script').forEach(script => {
    const src = script.src || '';
    const suppressedDomains = [
      'launchdarkly.com',
      'segment.com',
      'analytics.google.com',
      'googletagmanager.com'
    ];
    
    if (suppressedDomains.some(domain => src.includes(domain))) {
      script.remove();
    }
  });
  
  // Remove any tracking pixels or images
  document.querySelectorAll('img').forEach(img => {
    const src = img.src || '';
    const suppressedDomains = [
      'launchdarkly.com',
      'facebook.com',
      'doubleclick.net'
    ];
    
    if (suppressedDomains.some(domain => src.includes(domain))) {
      img.remove();
    }
  });
}