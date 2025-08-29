import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRenderPerformance, useInteractionTracking } from '../usePerformance';

describe('useRenderPerformance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('tracks render count', () => {
    const { result, rerender } = renderHook(() => 
      useRenderPerformance('TestComponent')
    );
    
    expect(result.current).toBe(1);
    
    rerender();
    expect(result.current).toBe(2);
    
    rerender();
    expect(result.current).toBe(3);
  });

  it('measures performance in development mode', () => {
    vi.stubEnv('DEV', true);
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    renderHook(() => useRenderPerformance('TestComponent'));
    
    // Performance measurement happens in useEffect cleanup
    expect(consoleSpy).not.toHaveBeenCalled();
    
    vi.unstubAllEnvs();
    consoleSpy.mockRestore();
  });
});

describe('useInteractionTracking', () => {
  it('returns track function', () => {
    const { result } = renderHook(() => useInteractionTracking('buttonClick'));
    
    expect(result.current).toHaveProperty('track');
    expect(typeof result.current.track).toBe('function');
  });

  it('logs interaction in development mode', () => {
    vi.stubEnv('DEV', true);
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    const { result } = renderHook(() => useInteractionTracking('buttonClick'));
    
    result.current.track({ buttonId: 'test-button' });
    
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Interaction: buttonClick'),
      expect.objectContaining({
        buttonId: 'test-button',
        timestamp: expect.any(Number),
      })
    );
    
    vi.unstubAllEnvs();
    consoleSpy.mockRestore();
  });

  it('sends to analytics when gtag is available', () => {
    const gtagMock = vi.fn();
    (window as any).gtag = gtagMock;
    
    const { result } = renderHook(() => useInteractionTracking('buttonClick'));
    
    result.current.track({ buttonId: 'test-button' });
    
    expect(gtagMock).toHaveBeenCalledWith(
      'event',
      'buttonClick',
      expect.objectContaining({
        event_category: 'interaction',
        event_label: 'buttonClick',
        buttonId: 'test-button',
      })
    );
    
    delete (window as any).gtag;
  });
});