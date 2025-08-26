import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Github, Mail, ArrowRight, Eye, EyeOff } from "lucide-react";
import { AIInput } from "../ui-kit/AIInput";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface AuthMockupProps {
  theme: "light" | "dark";
  variant?: "login" | "register" | "reset";
}

export function AuthMockup({ theme, variant = "login" }: AuthMockupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-6">AI Toologist</h2>
            <h3 className="text-xl font-semibold mb-4">
              Discover the best AI tools for your workflow
            </h3>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Join thousands of professionals who use our platform to find, 
              compare, and integrate the perfect AI tools for their projects.
            </p>
            
            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                "Compare 1000+ AI tools",
                "Get expert recommendations", 
                "Save time on research",
                "Stay updated with latest AI"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  </div>
                  <span className="text-sm opacity-90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full translate-y-24 -translate-x-24" />
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <h2 className="text-2xl font-bold text-primary">AI Toologist</h2>
          </div>

          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">
              {variant === "login" && "Welcome back"}
              {variant === "register" && "Create your account"}
              {variant === "reset" && "Reset your password"}
            </h1>
            <p className="text-muted-foreground">
              {variant === "login" && "Sign in to your account to continue"}
              {variant === "register" && "Get started with AI Toologist today"}
              {variant === "reset" && "Enter your email to reset your password"}
            </p>
          </div>

          <Card className="p-6">
            <div className="space-y-6">
              {/* OAuth Buttons */}
              {variant !== "reset" && (
                <>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full" size="lg">
                      <Github className="h-5 w-5 mr-3" />
                      Continue with GitHub
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="h-5 w-5 mr-3" />
                      Continue with Google
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                {variant === "register" && (
                  <AIInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                )}

                <AIInput
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                />

                {variant !== "reset" && (
                  <div className="relative">
                    <AIInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                )}

                {variant === "register" && (
                  <AIInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    required
                  />
                )}

                {/* Additional Options */}
                {variant === "login" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Forgot password?
                    </Button>
                  </div>
                )}

                {variant === "register" && (
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={setAcceptTerms}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      I agree to the{" "}
                      <Button variant="link" className="p-0 h-auto text-sm">
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button variant="link" className="p-0 h-auto text-sm">
                        Privacy Policy
                      </Button>
                    </label>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button 
                className="w-full" 
                size="lg"
                disabled={variant === "register" && !acceptTerms}
              >
                {variant === "login" && "Sign In"}
                {variant === "register" && "Create Account"}
                {variant === "reset" && "Send Reset Link"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              {/* Footer Links */}
              <div className="text-center text-sm">
                {variant === "login" && (
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Sign up
                    </Button>
                  </p>
                )}
                {variant === "register" && (
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Sign in
                    </Button>
                  </p>
                )}
                {variant === "reset" && (
                  <p className="text-muted-foreground">
                    Remember your password?{" "}
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Back to sign in
                    </Button>
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Security Notice */}
          <p className="text-center text-xs text-muted-foreground">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}