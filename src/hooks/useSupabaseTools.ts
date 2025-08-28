import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Tool } from '@/lib/supabaseClient';

export function useSupabaseTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      setTools(data || []);
    } catch (err) {
      console.error('Error fetching tools:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tools');
    } finally {
      setLoading(false);
    }
  };

  const searchTools = async (query: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .order('rating', { ascending: false });

      if (error) throw error;

      setTools(data || []);
    } catch (err) {
      console.error('Error searching tools:', err);
      setError(err instanceof Error ? err.message : 'Failed to search tools');
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = async (category: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('category', category)
        .order('rating', { ascending: false });

      if (error) throw error;

      setTools(data || []);
    } catch (err) {
      console.error('Error filtering tools:', err);
      setError(err instanceof Error ? err.message : 'Failed to filter tools');
    } finally {
      setLoading(false);
    }
  };

  const filterByPricing = async (pricing: string[]) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .in('pricing', pricing)
        .order('rating', { ascending: false });

      if (error) throw error;

      setTools(data || []);
    } catch (err) {
      console.error('Error filtering by pricing:', err);
      setError(err instanceof Error ? err.message : 'Failed to filter tools');
    } finally {
      setLoading(false);
    }
  };

  return {
    tools,
    loading,
    error,
    fetchTools,
    searchTools,
    filterByCategory,
    filterByPricing
  };
}