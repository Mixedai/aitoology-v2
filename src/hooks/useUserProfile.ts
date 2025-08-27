import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  website: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

interface UserPreferences {
  email_notifications: boolean;
  weekly_digest: boolean;
  product_updates: boolean;
  marketing_emails: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchPreferences();
    } else {
      setProfile(null);
      setPreferences(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (!data) {
        // Create profile if it doesn't exist
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null
          })
          .select()
          .single();

        if (createError) throw createError;
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    }
  };

  const fetchPreferences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!data) {
        // Create preferences if they don't exist
        const { data: newPrefs, error: createError } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id
          })
          .select()
          .single();

        if (createError) throw createError;
        setPreferences(newPrefs);
      } else {
        setPreferences(data);
      }
    } catch (err) {
      console.error('Error fetching preferences:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      toast.error('Please sign in to update your profile');
      return false;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully');
      await fetchProfile();
      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Failed to update profile');
      return false;
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user) {
      toast.error('Please sign in to update preferences');
      return false;
    }

    try {
      const { error } = await supabase
        .from('user_preferences')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Preferences updated successfully');
      await fetchPreferences();
      return true;
    } catch (err) {
      console.error('Error updating preferences:', err);
      toast.error('Failed to update preferences');
      return false;
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user) {
      toast.error('Please sign in to upload avatar');
      return null;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      await updateProfile({ avatar_url: publicUrl });
      
      return publicUrl;
    } catch (err) {
      console.error('Error uploading avatar:', err);
      toast.error('Failed to upload avatar');
      return null;
    }
  };

  return {
    profile,
    preferences,
    loading,
    error,
    updateProfile,
    updatePreferences,
    uploadAvatar,
    refetchProfile: fetchProfile,
    refetchPreferences: fetchPreferences
  };
}