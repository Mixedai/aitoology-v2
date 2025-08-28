import { useEffect,useRef,useState, } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Github, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Loader, 
  Sparkles, 
  Shield, 
  Users,
  Lock,
  User,
  CheckCircle2,
  AlertTriangle,
  Chrome,
  Star,
  TrendingUp,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';

interface SignInFrameProps {
  onNavigate?: (from: string, to: string, params?: any) => void;
  currentScreen?: string;
}

export function SignInFrame({ onNavigate, currentScreen = 'sign-in' }: SignInFrameProps) {
  const { signIn, signInWithGoogle, signInWithGithub, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Refs for accessibility and animations
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef(null);

  // Animation controls
  const containerInView = useInView(containerRef, { once: true });

  // Focus management - auto-focus email field
  useEffect(() => {
    const timer = setTimeout(() => {
      emailRef.current?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Check if user is already authenticated
  useEffect(() => {
    if (user) {
      console.log('🔓 SignInFrame: User already authenticated, navigating to home');
      onNavigate?.(currentScreen, 'modern-home', { 
        authenticated: true
      });
    }
  }, [user, currentScreen, onNavigate]);

  // Form validation with detailed error messages
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      emailRef.current?.focus();
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address (e.g., name@example.com)');
      emailRef.current?.focus();
      return false;
    }
    if (!formData.password) {
      setError('Please enter your password');
      passwordRef.current?.focus();
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      passwordRef.current?.focus();
      return false;
    }
    return true;
  };

  // Enhanced form submission with real Supabase authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setLoadingAction('email');
    
    try {
      console.log('🔐 SignInFrame: Starting sign in');
      
      // Use real Supabase authentication
      await signIn(formData.email, formData.password);
      
      console.log('✅ SignInFrame: Sign in successful');
      
      // Navigate to home after successful login
      onNavigate?.(currentScreen, 'modern-home', { 
        authenticated: true,
        loginMethod: 'email'
      });
    } catch (error: any) {
      console.error('❌ SignInFrame: Sign in error:', error.message);
      setError(error.message || 'Invalid email or password. Please check your credentials and try again.');
      passwordRef.current?.focus();
      passwordRef.current?.select();
    } finally {
      setIsLoading(false);
      setLoadingAction(null);
    }
  };

  // OAuth sign in handlers with real Supabase
  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setError(null);
    setLoadingAction(provider);
    
    try {
      console.log(`🔐 SignInFrame: Starting OAuth sign in with ${provider}`);
      
      // Use real Supabase OAuth
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      
      console.log(`✅ SignInFrame: OAuth ${provider} sign in initiated`);
      
      // OAuth will redirect, no need to manually navigate
    } catch (error: any) {
      console.error(`❌ SignInFrame: OAuth ${provider} error:`, error);
      setError(`Unable to sign in with ${provider === 'github' ? 'GitHub' : 'Google'}. Please try again.`);
      setLoadingAction(null);
    }
  };

  // Navigation handlers
  const handleMagicLink = () => {
    onNavigate?.(currentScreen, 'magic-link');
  };

  const handleForgotPassword = () => {
    onNavigate?.(currentScreen, 'forgot-password');
  };

  const handleSignUp = () => {
    onNavigate?.(currentScreen, 'auth', { flow: 'sign-up' });
  };

  const handleBack = () => {
    onNavigate?.(currentScreen, 'modern-home');
  };

  // Input change handler
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // Focus handlers for enhanced UX
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleBack();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(219, 39, 119, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>
      
      {/* Animated floating elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Large gradient orb */}
        <motion.div
          className="absolute -top-48 -left-48 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 60%)",
            filter: "blur(40px)"
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Pink gradient orb */}
        <motion.div
          className="absolute top-1/3 -right-48 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(219, 39, 119, 0.25) 0%, transparent 60%)",
            filter: "blur(40px)"
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Blue gradient orb */}
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 60%)",
            filter: "blur(40px)"
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Decorative shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full border-4 border-purple-200 rounded-3xl transform rotate-45 opacity-20" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-32 left-20 w-24 h-24"
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full border-4 border-pink-200 rounded-2xl transform rotate-45 opacity-20" />
        </motion.div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div ref={containerRef} className="w-full max-w-lg space-y-8">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={containerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </motion.div>


          {/* Main Card - Following Guidelines.md design system */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={containerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="p-8 pb-6 space-y-6">
                {/* Logo and Brand Section */}
                <div className="text-center space-y-6">
                  {/* Logo */}
                  <div className="relative inline-flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl flex items-center justify-center">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Title and description */}
                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold">
                      <span className="text-gray-800">Welcome to </span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AIToology</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Sign in to access your AI toolkit
                    </p>
                  </div>
                </div>

              </div>

              {/* Content */}
              <div className="p-8 pt-0 space-y-6">
                
                {/* Error Alert */}
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <p className="text-red-800 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* OAuth Buttons */}
                <div className="space-y-3">
                  <button
                    className="w-full py-4 px-6 bg-white border-2 border-gray-200 rounded-2xl font-medium flex items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] transition-all"
                    onClick={() => handleOAuthSignIn('google')}
                    disabled={!!loadingAction}
                  >
                    {loadingAction === 'google' ? (
                      <Loader className="w-5 h-5 animate-spin text-purple-600" />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    <span className="text-gray-700">Continue with Google</span>
                  </button>

                  <button
                    className="w-full py-4 px-6 bg-gray-900 text-white rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-gray-800 hover:scale-[1.02] transition-all"
                    onClick={() => handleOAuthSignIn('github')}
                    disabled={!!loadingAction}
                  >
                    {loadingAction === 'github' ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Github className="w-5 h-5" />
                    )}
                    <span>Continue with GitHub</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with email</span>
                  </div>
                </div>

                {/* Email/Password Form - Following Guidelines.md space-y-6 */}
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  onKeyDown={handleKeyDown}
                  className="space-y-6"
                >
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      disabled={isLoading}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        ref={passwordRef}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        onFocus={() => handleFocus('password')}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                        disabled={isLoading}
                        className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all pr-12"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password Link */}
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isLoading}
                      className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {loadingAction === 'email' ? (
                      <span className="flex items-center justify-center gap-3">
                        <Loader className="w-5 h-5 animate-spin" />
                        Signing you in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>


                {/* Sign Up Link */}
                <div className="text-center pt-6 border-t border-gray-200">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={handleSignUp}
                      disabled={!!loadingAction}
                      className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}