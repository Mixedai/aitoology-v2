import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { adminAuth } from '@/lib/adminAuth';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      if (user) {
        const adminStatus = await adminAuth.checkAdminStatus(user.id);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      setCheckingAdmin(false);
    }

    if (!loading) {
      checkAdmin();
    }
  }, [user, loading]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/60">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    // Since we're not using React Router, we'll just return null or a redirect component
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900">
        <div className="text-center">
          <p className="text-white mb-4">Admin access required</p>
          <button 
            onClick={() => window.location.href = '/admin/login'}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}