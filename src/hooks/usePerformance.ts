import { useEffect, useRef } from 'react';
import { measureComponentPerformance } from '../utils/performance';

export function useRenderPerformance(componentName: string) {
  const renderCount = useRef(0);
  const measureRef = useRef<ReturnType<typeof measureComponentPerformance> | null>(null);
  
  // Increment render count immediately
  renderCount.current++;

  useEffect(() => {
    if (import.meta.env.DEV) {
      measureRef.current = measureComponentPerformance(`${componentName} (render #${renderCount.current})`);
      
      return () => {
        measureRef.current?.end();
      };
    }
  });

  return renderCount.current;
}

export function useInteractionTracking(actionName: string) {
  return {
    track: (metadata?: Record<string, any>) => {
      const timestamp = performance.now();
      
      if (import.meta.env.DEV) {
        console.log(`🎯 Interaction: ${actionName}`, {
          timestamp,
          ...metadata
        });
      }

      // Send to analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', actionName, {
          event_category: 'interaction',
          event_label: actionName,
          value: timestamp,
          ...metadata
        });
      }
    }
  };
}