import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';

// Mock Supabase
vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ 
        data: { 
          session: {
            user: { id: '123', email: 'test@example.com' },
            access_token: 'token123'
          } 
        }, 
        error: null 
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { 
          subscription: { 
            unsubscribe: vi.fn() 
          } 
        },
      }),
      signInWithPassword: vi.fn().mockResolvedValue({
        data: {
          user: { id: '123', email: 'test@example.com' },
          session: { access_token: 'token123' }
        },
        error: null
      }),
      signUp: vi.fn().mockResolvedValue({
        data: {
          user: { id: '123', email: 'test@example.com' },
          session: { access_token: 'token123' }
        },
        error: null
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      signInWithOAuth: vi.fn().mockResolvedValue({ 
        data: { url: 'https://oauth.provider.com' }, 
        error: null 
      }),
      resetPasswordForEmail: vi.fn().mockResolvedValue({ 
        data: {}, 
        error: null 
      }),
    },
  },
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('provides auth context values', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current).toHaveProperty('user');
    expect(result.current).toHaveProperty('session');
    expect(result.current).toHaveProperty('signIn');
    expect(result.current).toHaveProperty('signUp');
    expect(result.current).toHaveProperty('signOut');
    expect(result.current).toHaveProperty('signInWithGoogle');
    expect(result.current).toHaveProperty('signInWithGithub');
    expect(result.current).toHaveProperty('resetPassword');
  });

  it('initializes with session from Supabase', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.user).toEqual({
      id: '123',
      email: 'test@example.com'
    });
    
    expect(result.current.session).toEqual({
      user: { id: '123', email: 'test@example.com' },
      access_token: 'token123'
    });
  });

  it('handles sign in', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await result.current.signIn('test@example.com', 'password123');
    
    const { supabase } = await import('@/lib/supabaseClient');
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('handles sign up', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await result.current.signUp('new@example.com', 'password123', { name: 'Test User' });
    
    const { supabase } = await import('@/lib/supabaseClient');
    expect(supabase.auth.signUp).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'password123',
      options: {
        data: { name: 'Test User' },
        emailRedirectTo: window.location.origin,
      },
    });
  });

  it('handles sign out', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await result.current.signOut();
    
    const { supabase } = await import('@/lib/supabaseClient');
    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it('handles OAuth sign in', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await result.current.signInWithGoogle();
    
    const { supabase } = await import('@/lib/supabaseClient');
    expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  });

  it('handles password reset', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await result.current.resetPassword('test@example.com');
    
    const { supabase } = await import('@/lib/supabaseClient');
    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith('test@example.com', {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
  });
});