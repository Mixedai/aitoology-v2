import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { UserFavorite, Collection, Review } from '@/lib/supabaseClient';

// Hook for managing user favorites
export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_favorites')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data || []);
    } catch (err) {
      console.error('Failed to fetch favorites:', err);
      toast.error('Failed to load favorites');
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (toolId: string) => {
    if (!user) {
      toast.error('Please sign in to save favorites');
      return;
    }

    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({ user_id: user.id, tool_id: toolId });

      if (error) throw error;
      
      await fetchFavorites();
      toast.success('Added to favorites');
    } catch (err: any) {
      if (err.code === '23505') {
        toast.info('Already in favorites');
      } else {
        toast.error('Failed to add to favorites');
      }
    }
  };

  const removeFavorite = async (toolId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId);

      if (error) throw error;
      
      await fetchFavorites();
      toast.success('Removed from favorites');
    } catch (err) {
      toast.error('Failed to remove from favorites');
    }
  };

  const isFavorite = (toolId: string) => {
    return favorites.some(fav => fav.tool_id === toolId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    refetch: fetchFavorites
  };
}

// Hook for managing user collections
export function useCollections() {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCollections();
    } else {
      setCollections([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCollections = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (err) {
      console.error('Failed to fetch collections:', err);
      toast.error('Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  const createCollection = async (name: string, description?: string, isPublic: boolean = false) => {
    if (!user) {
      toast.error('Please sign in to create collections');
      return;
    }

    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const { error } = await supabase
        .from('collections')
        .insert({
          user_id: user.id,
          name,
          description,
          is_public: isPublic,
          slug
        });

      if (error) throw error;
      
      await fetchCollections();
      toast.success('Collection created');
    } catch (err) {
      toast.error('Failed to create collection');
    }
  };

  const deleteCollection = async (collectionId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', collectionId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchCollections();
      toast.success('Collection deleted');
    } catch (err) {
      toast.error('Failed to delete collection');
    }
  };

  const addToCollection = async (collectionId: string, toolId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('collection_tools')
        .insert({
          collection_id: collectionId,
          tool_id: toolId
        });

      if (error) throw error;
      toast.success('Added to collection');
    } catch (err: any) {
      if (err.code === '23505') {
        toast.info('Already in collection');
      } else {
        toast.error('Failed to add to collection');
      }
    }
  };

  const removeFromCollection = async (collectionId: string, toolId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('collection_tools')
        .delete()
        .eq('collection_id', collectionId)
        .eq('tool_id', toolId);

      if (error) throw error;
      toast.success('Removed from collection');
    } catch (err) {
      toast.error('Failed to remove from collection');
    }
  };

  return {
    collections,
    loading,
    createCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    refetch: fetchCollections
  };
}

// Hook for managing reviews
export function useReviews(toolId?: string) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (toolId) {
      fetchReviews();
    }
  }, [toolId, user]);

  const fetchReviews = async () => {
    if (!toolId) return;

    try {
      setLoading(true);
      
      // Fetch all reviews for the tool
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .eq('tool_id', toolId)
        .order('helpful_count', { ascending: false });

      if (reviewsError) throw reviewsError;
      setReviews(reviewsData || []);

      // Fetch user's review if logged in
      if (user) {
        const { data: userReviewData, error: userReviewError } = await supabase
          .from('reviews')
          .select('*')
          .eq('tool_id', toolId)
          .eq('user_id', user.id)
          .single();

        if (!userReviewError) {
          setUserReview(userReviewData);
        }
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (
    rating: number,
    content: string,
    title?: string,
    pros?: string[],
    cons?: string[],
    useCase?: string
  ) => {
    if (!user) {
      toast.error('Please sign in to write a review');
      return;
    }

    if (!toolId) {
      toast.error('Tool ID is required');
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          tool_id: toolId,
          user_id: user.id,
          rating,
          content,
          title,
          pros,
          cons,
          use_case: useCase
        });

      if (error) throw error;
      
      await fetchReviews();
      toast.success('Review submitted successfully');
    } catch (err: any) {
      if (err.code === '23505') {
        toast.error('You have already reviewed this tool');
      } else {
        toast.error('Failed to submit review');
      }
    }
  };

  const updateReview = async (
    reviewId: string,
    updates: Partial<Review>
  ) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .update(updates)
        .eq('id', reviewId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchReviews();
      toast.success('Review updated');
    } catch (err) {
      toast.error('Failed to update review');
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', reviewId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchReviews();
      toast.success('Review deleted');
    } catch (err) {
      toast.error('Failed to delete review');
    }
  };

  const voteReview = async (reviewId: string, isHelpful: boolean) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      const { error } = await supabase
        .from('review_votes')
        .upsert({
          review_id: reviewId,
          user_id: user.id,
          is_helpful: isHelpful
        }, {
          onConflict: 'review_id,user_id'
        });

      if (error) throw error;
      
      await fetchReviews();
      toast.success(isHelpful ? 'Marked as helpful' : 'Vote updated');
    } catch (err) {
      toast.error('Failed to submit vote');
    }
  };

  return {
    reviews,
    userReview,
    loading,
    createReview,
    updateReview,
    deleteReview,
    voteReview,
    refetch: fetchReviews
  };
}