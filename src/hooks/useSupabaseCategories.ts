import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

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
      
      // First fetch all categories
      const { data: categoriesData, error: catError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (catError) throw catError;

      // Then fetch tool counts for each category
      const categoriesWithCount = await Promise.all(
        (categoriesData || []).map(async (cat) => {
          const { count, error: countError } = await supabase
            .from('tools')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', cat.id);
          
          if (countError) {
            console.warn(`Error fetching tool count for category ${cat.name}:`, countError);
          }
          
          return {
            ...cat,
            tool_count: count || 0
          };
        })
      );

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