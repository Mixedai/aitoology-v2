interface PerformanceMetrics {
  FCP?: number; // First Contentful Paint
  LCP?: number; // Largest Contentful Paint
  FID?: number; // First Input Delay
  CLS?: number; // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
  INP?: number; // Interaction to Next Paint
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private observer: PerformanceObserver | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      this.initializeObserver();
      this.measureTTFB();
    }
  }

  private initializeObserver() {
    try {
      // Observe paint metrics
      this.observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              this.metrics.FCP = Math.round(entry.startTime);
            }
          }
          
          if (entry.entryType === 'largest-contentful-paint') {
            const lcpEntry = entry as any;
            this.metrics.LCP = Math.round(lcpEntry.renderTime || lcpEntry.loadTime);
          }

          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any;
            this.metrics.FID = Math.round(fidEntry.processingStart - fidEntry.startTime);
          }

          if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as any;
            if (!clsEntry.hadRecentInput) {
              this.metrics.CLS = (this.metrics.CLS || 0) + clsEntry.value;
            }
          }
        }
      });

      // Start observing
      this.observer.observe({ 
        entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
    } catch (error) {
      console.error('Failed to initialize performance observer:', error);
    }
  }

  private measureTTFB() {
    if (window.performance && window.performance.timing) {
      const navigationTiming = window.performance.timing;
      this.metrics.TTFB = navigationTiming.responseStart - navigationTiming.requestStart;
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logMetrics() {
    const metrics = this.getMetrics();
    console.group('📊 Performance Metrics');
    console.log('FCP (First Contentful Paint):', metrics.FCP ? `${metrics.FCP}ms` : 'N/A');
    console.log('LCP (Largest Contentful Paint):', metrics.LCP ? `${metrics.LCP}ms` : 'N/A');
    console.log('FID (First Input Delay):', metrics.FID ? `${metrics.FID}ms` : 'N/A');
    console.log('CLS (Cumulative Layout Shift):', metrics.CLS?.toFixed(3) || 'N/A');
    console.log('TTFB (Time to First Byte):', metrics.TTFB ? `${metrics.TTFB}ms` : 'N/A');
    console.groupEnd();
    
    // Send to analytics if available
    this.sendToAnalytics(metrics);
  }

  private sendToAnalytics(metrics: PerformanceMetrics) {
    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const gtag = (window as any).gtag;
      
      Object.entries(metrics).forEach(([metric, value]) => {
        if (value !== undefined) {
          gtag('event', 'web_vitals', {
            name: metric,
            value: Math.round(metric === 'CLS' ? value * 1000 : value),
            metric_value: value,
            metric_delta: value,
          });
        }
      });
    }

    // Custom analytics endpoint (if you have one)
    if (import.meta.env.VITE_ANALYTICS_ENDPOINT) {
      fetch(import.meta.env.VITE_ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      }).catch(console.error);
    }
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Create singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function initializePerformanceMonitoring() {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
    
    // Log metrics after page load
    if (document.readyState === 'complete') {
      setTimeout(() => performanceMonitor?.logMetrics(), 1000);
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => performanceMonitor?.logMetrics(), 1000);
      });
    }

    // Log metrics before page unload
    window.addEventListener('beforeunload', () => {
      performanceMonitor?.logMetrics();
    });
  }
  
  return performanceMonitor;
}

export function getPerformanceMetrics(): PerformanceMetrics {
  return performanceMonitor?.getMetrics() || {};
}

// Component performance tracking
export function measureComponentPerformance(componentName: string) {
  const startTime = performance.now();
  
  return {
    end: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (import.meta.env.DEV) {
        console.log(`⚡ ${componentName} rendered in ${duration.toFixed(2)}ms`);
      }
      
      // Track slow renders
      if (duration > 16) { // More than 1 frame at 60fps
        console.warn(`⚠️ Slow render detected in ${componentName}: ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
  };
}

// React component performance hook
export function usePerformanceTracking(componentName: string) {
  if (import.meta.env.DEV) {
    const measure = measureComponentPerformance(componentName);
    // Call measure.end() in useEffect cleanup or after render
    return measure;
  }
  return { end: () => {} };
}