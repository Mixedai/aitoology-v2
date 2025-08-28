import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Tool } from '@/lib/supabaseClient';
import { toast } from 'sonner';

// Hook to fetch all tools
export function useTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
      const error = err as Error;
      setError(error);
      toast.error('Failed to load tools');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => fetchTools();

  return { tools, loading, error, refetch };
}

// Hook to fetch a single tool by slug
export function useTool(slug: string) {
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (slug) {
      fetchTool();
    }
  }, [slug]);

  const fetchTool = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setTool(data);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to load tool details');
    } finally {
      setLoading(false);
    }
  };

  return { tool, loading, error };
}

// Hook to fetch tools by category
export function useToolsByCategory(category: string) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (category) {
      fetchToolsByCategory();
    }
  }, [category]);

  const fetchToolsByCategory = async () => {
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
      const error = err as Error;
      setError(error);
      toast.error('Failed to load tools');
    } finally {
      setLoading(false);
    }
  };

  return { tools, loading, error };
}

// Hook to search tools
export function useSearchTools(query: string) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (query && query.length > 2) {
      searchTools();
    } else {
      setTools([]);
    }
  }, [query]);

  const searchTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
        .order('rating', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTools(data || []);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return { tools, loading, error };
}

// Hook for featured tools
export function useFeaturedTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchFeaturedTools();
  }, []);

  const fetchFeaturedTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .gte('rating', 4.7)
        .order('rating', { ascending: false })
        .limit(6);

      if (error) throw error;
      setTools(data || []);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to load featured tools');
    } finally {
      setLoading(false);
    }
  };

  return { tools, loading, error };
}

// Hook for trending tools
export function useTrendingTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchTrendingTools();
  }, []);

  const fetchTrendingTools = async () => {
    try {
      setLoading(true);
      // In production, this would use actual view/usage statistics
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .gte('rating', 4.5)
        .order('review_count', { ascending: false })
        .limit(8);

      if (error) throw error;
      setTools(data || []);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to load trending tools');
    } finally {
      setLoading(false);
    }
  };

  return { tools, loading, error };
}

// Hook to compare multiple tools
export function useCompareTools(toolIds: string[]) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (toolIds.length > 0) {
      fetchCompareTools();
    } else {
      setTools([]);
      setLoading(false);
    }
  }, [toolIds.join(',')]);

  const fetchCompareTools = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .in('id', toolIds);

      if (error) throw error;
      setTools(data || []);
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to load tools for comparison');
    } finally {
      setLoading(false);
    }
  };

  return { tools, loading, error };
}