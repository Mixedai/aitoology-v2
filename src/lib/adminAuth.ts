import { supabase } from './supabaseClient';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  created_at: string;
}

export const adminAuth = {
  async checkAdminStatus(userId: string): Promise<boolean> {
    try {
      console.log('🔍 Checking admin status for user:', userId);
      
      // Don't use .single() - it causes 500 error when no rows found
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', userId);

      console.log('📊 Admin query result:', { data, error });

      if (error) {
        console.error('❌ Admin check error:', error);
        // Try simple query without filter
        const { data: allAdmins } = await supabase
          .from('admin_users')
          .select('*');
        
        if (allAdmins) {
          const found = allAdmins.find((a: any) => a.user_id === userId);
          console.log('🔄 Alternative check found:', found);
          return !!found;
        }
        return false;
      }

      // Check if data is an array with at least one item
      const isAdmin = data && data.length > 0;
      console.log('👮 Is admin?', isAdmin);
      
      return isAdmin;
    } catch (error) {
      console.error('❌ Admin status check exception:', error);
      return false;
    }
  },

  async getAdminProfile(userId: string): Promise<AdminUser | null> {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Admin profile fetch error:', error);
        return null;
      }

      // Return first item if array
      return data && data.length > 0 ? data[0] : null;
    } catch (error) {
      console.error('Admin profile fetch failed:', error);
      return null;
    }
  },

  async signInAdmin(email: string, password: string) {
    try {
      console.log('🔐 Admin sign in attempt for:', email);
      
      // First, try normal sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('🔑 Sign in response:', { data, error });

      if (error) {
        console.error('❌ Sign in error:', error.message);
        throw error;
      }

      if (data.user) {
        console.log('✅ User authenticated:', data.user.id);
        console.log('🔍 Checking admin status...');
        
        const isAdmin = await this.checkAdminStatus(data.user.id);
        console.log('👮 Admin status:', isAdmin);
        
        if (!isAdmin) {
          console.warn('⚠️ User is not an admin, signing out...');
          await supabase.auth.signOut();
          throw new Error('Unauthorized: Admin access only. Please ensure user is in admin_users table.');
        }
        
        console.log('🎉 Admin login successful!');
        return data;
      }

      throw new Error('Sign in failed - no user data returned');
    } catch (error: any) {
      console.error('❌ Admin sign in error:', error.message || error);
      throw error;
    }
  },
};