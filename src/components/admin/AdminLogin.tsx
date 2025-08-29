import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { toast } from 'sonner';
import { Shield, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { adminAuth } from '@/lib/adminAuth';

interface AdminLoginProps {
  onNavigate?: (screenId: string) => void;
}

export function AdminLogin({ onNavigate }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await adminAuth.signInAdmin(email, password);
      
      if (data.user) {
        toast.success('Admin login successful! Redirecting to dashboard...');
        console.log('🎯 Admin login successful, navigating...');
        console.log('🔄 onNavigate prop:', onNavigate);
        
        // Direct navigation - force it to work
        setTimeout(() => {
          // Clear any existing hash first
          window.location.hash = '';
          
          // Try multiple methods to ensure navigation
          if (onNavigate && typeof onNavigate === 'function') {
            console.log('📍 Using onNavigate to admin-dashboard');
            onNavigate('admin-dashboard');
          }
          
          // Also try direct hash navigation as backup
          setTimeout(() => {
            if (window.location.pathname === '/' && !window.location.hash.includes('admin-dashboard')) {
              console.log('🔄 Forcing navigation to admin-dashboard');
              window.location.hash = 'admin-dashboard';
              // Force a state change
              window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
          }, 100);
        }, 100);
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      setError(error.message || 'Admin authentication failed');
      toast.error('Admin authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <Card className="w-full max-w-md relative z-10 border-purple-500/20 bg-black/40 backdrop-blur-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Restricted access - Administrators only
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20">
                <AlertDescription className="text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@aitoologist.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10 bg-black/20 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-10 pr-10 bg-black/20 border-purple-500/20 text-white placeholder:text-gray-500 focus:border-purple-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                'Access Admin Panel'
              )}
            </Button>

            <div className="pt-4 text-center">
              <p className="text-sm text-gray-400">
                Not an admin?{' '}
                <button
                  type="button"
                  onClick={() => onNavigate?.('auth')}
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Return to user login
                </button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}