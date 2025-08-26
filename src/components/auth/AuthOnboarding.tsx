import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Github,
  Sparkles,
  Loader
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthOnboardingProps {
  onNavigate?: (fromScreen: string, toScreen: string, params?: any) => void;
  currentScreen?: string;
}

export function AuthOnboarding({ onNavigate, currentScreen = 'auth' }: AuthOnboardingProps) {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    agreeToTerms: false
  });

  // Reset form when tab changes
  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      agreeToTerms: false
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  }, [activeTab]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingAction('email');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLoadingAction(null);
      if (activeTab === "signin") {
        // Sign in successful - navigate to home
        onNavigate?.('auth', 'modern-home');
      } else {
        // Sign up successful - navigate to home
        onNavigate?.('auth', 'modern-home', { 
          email: formData.email,
          name: formData.name 
        });
      }
    }, 2000);
  };

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    setLoadingAction(provider);
    // Simulate OAuth flow
    setTimeout(() => {
      setLoadingAction(null);
      onNavigate?.('auth', 'modern-home');
    }, 1500);
  };

  const handleBack = () => {
    onNavigate?.(currentScreen, 'modern-home');
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

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
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

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="p-8 pb-0 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold mb-2">
                  <span className="text-gray-800">Welcome to </span>
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AIToology</span>
                </h1>
                <p className="text-gray-600 mb-8">
                  {activeTab === "signin" 
                    ? "Sign in to access your AI toolkit" 
                    : "Join thousands discovering AI tools"
                  }
                </p>

                {/* Tab Switcher */}
                <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
                  <button
                    onClick={() => setActiveTab("signin")}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                      activeTab === "signin"
                        ? "bg-white text-purple-600 shadow-md"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab("signup")}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                      activeTab === "signup"
                        ? "bg-white text-purple-600 shadow-md"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-0">
                <AnimatePresence mode="wait">
                  {activeTab === "signin" ? (
                    <motion.form
                      key="signin"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* OAuth Buttons */}
                      <div className="space-y-3">
                        <button
                          type="button"
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
                          type="button"
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

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          id="signin-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
                        />
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="signin-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all pr-12"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
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
                    </motion.form>
                  ) : (
                    <motion.form
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Name Field */}
                      <div className="space-y-2">
                        <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          id="signup-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your name"
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2">
                        <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          id="signup-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all"
                        />
                      </div>

                      {/* Password Field */}
                      <div className="space-y-2">
                        <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            id="signup-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            placeholder="Create a password"
                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all pr-12"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password Field */}
                      <div className="space-y-2">
                        <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <input
                            id="signup-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all pr-12"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Terms Checkbox */}
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={formData.agreeToTerms}
                          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                          className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          required
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                          I agree to the{' '}
                          <a href="#" className="text-purple-600 hover:text-purple-700">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
                        </label>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        disabled={isLoading || !formData.agreeToTerms}
                      >
                        {loadingAction === 'email' ? (
                          <span className="flex items-center justify-center gap-3">
                            <Loader className="w-5 h-5 animate-spin" />
                            Creating account...
                          </span>
                        ) : (
                          'Create Account'
                        )}
                      </button>

                      {/* Divider */}
                      <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Or sign up with</span>
                        </div>
                      </div>

                      {/* OAuth Buttons */}
                      <div className="space-y-3">
                        <button
                          type="button"
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
                          <span className="text-gray-700">Google</span>
                        </button>

                        <button
                          type="button"
                          className="w-full py-4 px-6 bg-gray-900 text-white rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-gray-800 hover:scale-[1.02] transition-all"
                          onClick={() => handleOAuthSignIn('github')}
                          disabled={!!loadingAction}
                        >
                          {loadingAction === 'github' ? (
                            <Loader className="w-5 h-5 animate-spin" />
                          ) : (
                            <Github className="w-5 h-5" />
                          )}
                          <span>GitHub</span>
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}