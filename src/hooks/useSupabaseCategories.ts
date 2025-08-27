import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  tool_count?: number;
  created_at: string;
}

export function useSupabaseCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      // Fetch categories with tool count
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          tools:tools(count)
        `)
        .order('name');

      if (error) throw error;

      // Map the data to include tool count
      const categoriesWithCount = data?.map(cat => ({
        ...cat,
        tool_count: cat.tools?.[0]?.count || 0
      })) || [];

      setCategories(categoriesWithCount);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    refetch: fetchCategories
  };
}