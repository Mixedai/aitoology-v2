import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface WalletTool {
  id: string;
  tool_id: string;
  subscription_type: 'free' | 'paid' | 'trial';
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  notes: string | null;
  created_at: string;
  tool?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo_url: string | null;
    logo_emoji: string | null;
    category: string;
    pricing: string;
    website_url: string | null;
  };
}

export function useToolWallet() {
  const { user } = useAuth();
  const [walletTools, setWalletTools] = useState<WalletTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchWalletTools();
    } else {
      setWalletTools([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWalletTools = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tool_wallet')
        .select(`
          *,
          tool:tools(
            id,
            name,
            slug,
            description,
            logo_url,
            logo_emoji,
            category,
            pricing,
            website_url
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setWalletTools(data || []);
    } catch (err) {
      console.error('Error fetching wallet tools:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch wallet tools');
    } finally {
      setLoading(false);
    }
  };

  const addToWallet = async (
    toolId: string, 
    subscriptionType: 'free' | 'paid' | 'trial' = 'free',
    notes?: string
  ) => {
    if (!user) {
      toast.error('Please sign in to add tools to your wallet');
      return false;
    }

    try {
      const { error } = await supabase
        .from('tool_wallet')
        .insert({
          user_id: user.id,
          tool_id: toolId,
          subscription_type: subscriptionType,
          subscription_start_date: new Date().toISOString().split('T')[0],
          notes: notes
        });

      if (error) {
        if (error.message.includes('duplicate')) {
          toast.error('Tool already in your wallet');
        } else {
          throw error;
        }
        return false;
      }

      toast.success('Tool added to wallet');
      await fetchWalletTools();
      return true;
    } catch (err) {
      console.error('Error adding to wallet:', err);
      toast.error('Failed to add tool to wallet');
      return false;
    }
  };

  const removeFromWallet = async (walletItemId: string) => {
    if (!user) {
      toast.error('Please sign in to manage your wallet');
      return false;
    }

    try {
      const { error } = await supabase
        .from('tool_wallet')
        .delete()
        .eq('id', walletItemId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Tool removed from wallet');
      await fetchWalletTools();
      return true;
    } catch (err) {
      console.error('Error removing from wallet:', err);
      toast.error('Failed to remove tool from wallet');
      return false;
    }
  };

  const updateWalletItem = async (
    walletItemId: string,
    updates: {
      subscription_type?: 'free' | 'paid' | 'trial';
      subscription_end_date?: string | null;
      notes?: string | null;
    }
  ) => {
    if (!user) {
      toast.error('Please sign in to manage your wallet');
      return false;
    }

    try {
      const { error } = await supabase
        .from('tool_wallet')
        .update(updates)
        .eq('id', walletItemId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Wallet item updated');
      await fetchWalletTools();
      return true;
    } catch (err) {
      console.error('Error updating wallet item:', err);
      toast.error('Failed to update wallet item');
      return false;
    }
  };

  const isInWallet = (toolId: string): boolean => {
    return walletTools.some(item => item.tool_id === toolId);
  };

  return {
    walletTools,
    loading,
    error,
    addToWallet,
    removeFromWallet,
    updateWalletItem,
    isInWallet,
    refetch: fetchWalletTools
  };
}