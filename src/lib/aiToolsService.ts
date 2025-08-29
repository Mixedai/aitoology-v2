import { supabase } from './supabaseClient';

export interface AITool {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  category_id: string;
  category?: ToolCategory;
  logo_url: string;
  website_url: string;
  documentation_url?: string;
  api_url?: string;
  pricing_model: 'free' | 'freemium' | 'paid' | 'subscription' | 'usage_based' | 'enterprise';
  starting_price?: number;
  free_tier_available: boolean;
  rating: number;
  total_reviews: number;
  total_users: string;
  is_featured: boolean;
  is_verified: boolean;
  is_trending: boolean;
  is_new: boolean;
  is_popular: boolean;
  is_active: boolean;
  platforms?: string[];
  integrations?: string[];
  languages?: string[];
  ai_model?: string;
  ai_capabilities?: string[];
  company_name?: string;
  company_location?: string;
  founded_year?: number;
  view_count: number;
  click_count: number;
  favorite_count: number;
  bookmark_count: number;
  created_at: string;
  updated_at: string;
  features?: ToolFeature[];
  pricing_plans?: PricingPlan[];
}

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  display_order: number;
  is_active: boolean;
}

export interface ToolFeature {
  id: string;
  tool_id: string;
  feature_name: string;
  feature_description?: string;
  feature_category?: string;
  is_premium: boolean;
  display_order: number;
}

export interface PricingPlan {
  id: string;
  tool_id: string;
  plan_name: string;
  price: number;
  billing_cycle: 'monthly' | 'yearly' | 'one_time' | 'usage_based';
  features?: string[];
  limitations?: Record<string, any>;
  is_popular: boolean;
  display_order: number;
}

export interface ToolReview {
  id: string;
  tool_id: string;
  user_id: string;
  rating: number;
  title?: string;
  review_text?: string;
  pros?: string[];
  cons?: string[];
  use_case?: string;
  recommended: boolean;
  verified_purchase: boolean;
  helpful_count: number;
  not_helpful_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

class AIToolsService {
  // Fetch all tools with optional filters
  async getTools(filters?: {
    category?: string;
    pricing?: string[];
    search?: string;
    featured?: boolean;
    verified?: boolean;
    trending?: boolean;
    sortBy?: 'rating' | 'name' | 'newest' | 'popular';
    limit?: number;
    offset?: number;
  }) {
    try {
      let query = supabase
        .from('ai_tools')
        .select(`
          *,
          category:tool_categories(*)
        `)
        .eq('is_active', true);

      // Apply filters
      if (filters?.category) {
        const { data: categoryData } = await supabase
          .from('tool_categories')
          .select('id')
          .eq('slug', filters.category)
          .single();
        
        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      if (filters?.featured) {
        query = query.eq('is_featured', true);
      }

      if (filters?.verified) {
        query = query.eq('is_verified', true);
      }

      if (filters?.trending) {
        query = query.eq('is_trending', true);
      }

      if (filters?.pricing && filters.pricing.length > 0) {
        query = query.in('pricing_model', filters.pricing);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`);
      }

      // Apply sorting
      switch (filters?.sortBy) {
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'name':
          query = query.order('name', { ascending: true });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('total_users', { ascending: false });
          break;
        default:
          query = query.order('rating', { ascending: false });
      }

      // Apply pagination
      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
      }

      const { data, error } = await query;

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching tools:', error);
      return { data: null, error };
    }
  }

  // Get single tool by slug or ID
  async getTool(identifier: string) {
    try {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
      
      const query = supabase
        .from('ai_tools')
        .select(`
          *,
          category:tool_categories(*),
          features:tool_features(*),
          pricing_plans:tool_pricing_plans(*)
        `)
        .eq('is_active', true);

      const { data, error } = isUUID
        ? await query.eq('id', identifier).single()
        : await query.eq('slug', identifier).single();

      if (error) throw error;

      // Increment view count
      if (data) {
        await this.incrementViewCount(data.id);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Error fetching tool:', error);
      return { data: null, error };
    }
  }

  // Get categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from('tool_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: null, error };
    }
  }

  // Toggle favorite
  async toggleFavorite(toolId: string, userId: string) {
    try {
      // Check if already favorited
      const { data: existing } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('tool_id', toolId)
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Remove favorite
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('tool_id', toolId)
          .eq('user_id', userId);

        if (error) throw error;
        return { favorited: false, error: null };
      } else {
        // Add favorite
        const { error } = await supabase
          .from('user_favorites')
          .insert({ tool_id: toolId, user_id: userId });

        if (error) throw error;
        return { favorited: true, error: null };
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return { favorited: false, error };
    }
  }

  // Toggle bookmark
  async toggleBookmark(toolId: string, userId: string, notes?: string, tags?: string[]) {
    try {
      // Check if already bookmarked
      const { data: existing } = await supabase
        .from('user_bookmarks')
        .select('id')
        .eq('tool_id', toolId)
        .eq('user_id', userId)
        .single();

      if (existing) {
        // Remove bookmark
        const { error } = await supabase
          .from('user_bookmarks')
          .delete()
          .eq('tool_id', toolId)
          .eq('user_id', userId);

        if (error) throw error;
        return { bookmarked: false, error: null };
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('user_bookmarks')
          .insert({ 
            tool_id: toolId, 
            user_id: userId,
            notes,
            tags
          });

        if (error) throw error;
        return { bookmarked: true, error: null };
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      return { bookmarked: false, error };
    }
  }

  // Get user favorites
  async getUserFavorites(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          tool_id,
          ai_tools(*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return { data: data?.map(f => f.ai_tools), error: null };
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      return { data: null, error };
    }
  }

  // Get user bookmarks
  async getUserBookmarks(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_bookmarks')
        .select(`
          *,
          ai_tools(*)
        `)
        .eq('user_id', userId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching user bookmarks:', error);
      return { data: null, error };
    }
  }

  // Add review
  async addReview(review: Omit<ToolReview, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('tool_reviews')
        .insert(review)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error adding review:', error);
      return { data: null, error };
    }
  }

  // Get reviews for a tool
  async getToolReviews(toolId: string, limit = 10, offset = 0) {
    try {
      const { data, error } = await supabase
        .from('tool_reviews')
        .select(`
          *,
          profiles:user_id(id, username, avatar_url)
        `)
        .eq('tool_id', toolId)
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return { data: null, error };
    }
  }

  // Search tools with full-text search
  async searchTools(query: string, limit = 20) {
    try {
      const { data, error } = await supabase
        .rpc('search_tools', {
          search_query: query,
          result_limit: limit
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error searching tools:', error);
      return { data: null, error };
    }
  }

  // Get trending tools
  async getTrendingTools(limit = 6) {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select(`
          *,
          category:tool_categories(*)
        `)
        .eq('is_active', true)
        .eq('is_trending', true)
        .order('rating', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching trending tools:', error);
      return { data: null, error };
    }
  }

  // Get featured tools
  async getFeaturedTools(limit = 6) {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .select(`
          *,
          category:tool_categories(*)
        `)
        .eq('is_active', true)
        .eq('is_featured', true)
        .order('rating', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching featured tools:', error);
      return { data: null, error };
    }
  }

  // Increment view count
  private async incrementViewCount(toolId: string) {
    try {
      await supabase.rpc('increment_view_count', { tool_id: toolId });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  }

  // Increment click count
  async incrementClickCount(toolId: string) {
    try {
      await supabase.rpc('increment_click_count', { tool_id: toolId });
    } catch (error) {
      console.error('Error incrementing click count:', error);
    }
  }

  // Admin functions

  // Create new tool (admin only)
  async createTool(tool: Omit<AITool, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .insert(tool)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating tool:', error);
      return { data: null, error };
    }
  }

  // Update tool (admin only)
  async updateTool(id: string, updates: Partial<AITool>) {
    try {
      const { data, error } = await supabase
        .from('ai_tools')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error updating tool:', error);
      return { data: null, error };
    }
  }

  // Delete tool (admin only)
  async deleteTool(id: string) {
    try {
      const { error } = await supabase
        .from('ai_tools')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting tool:', error);
      return { success: false, error };
    }
  }

  // Add tool feature (admin only)
  async addToolFeature(feature: Omit<ToolFeature, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('tool_features')
        .insert(feature)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error adding feature:', error);
      return { data: null, error };
    }
  }

  // Add pricing plan (admin only)
  async addPricingPlan(plan: Omit<PricingPlan, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('tool_pricing_plans')
        .insert(plan)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error adding pricing plan:', error);
      return { data: null, error };
    }
  }
}

export const aiToolsService = new AIToolsService();