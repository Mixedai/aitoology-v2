import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Check, Mail } from 'lucide-react';

/*
FORGOT PASSWORD FRAME - AI TOOLOGIST DESIGN SYSTEM

A password reset form following the AI Toologist auth card layout with success state
and comprehensive Tailwind class mappings for light/dark theme support.

LAYOUT ARCHITECTURE:
- Card container: max-w-md mx-auto (centered, responsive width)
- Form spacing: space-y-6 (24px vertical rhythm)
- Input groups: space-y-2 (8px label-to-input spacing)

THEME SUPPORT:
- Light: bg-card text-card-foreground border-border
- Dark: bg-card text-card-foreground border-border (CSS custom properties)
- Auto-switching based on system preference or theme toggle

STATES:
- Default: Email input form with CTA
- Success: Confirmation message with return link
- Loading: Button disabled with spinner (future enhancement)
- Error: Form validation feedback (future enhancement)

TAILWIND CLASSES REFERENCE:
- Container: max-w-md mx-auto mt-8 p-6
- Card: bg-card border border-border rounded-lg shadow-sm
- Input: border-input bg-input-background focus:ring-2 focus:ring-ring
- Button: bg-primary text-primary-foreground hover:bg-primary/90
- Success: bg-success/10 text-success border-success/20
*/

interface ForgotPasswordFrameProps {
  onNavigate?: (destination: string) => void;
  showVariants?: boolean;
}

export function ForgotPasswordFrame({ onNavigate, showVariants = true }: ForgotPasswordFrameProps) {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleBackToSignIn = () => {
    if (onNavigate) {
      onNavigate('auth');
    }
  };

  const renderForgotPasswordCard = (title: string, variant: string) => (
    <Card className="w-full max-w-md mx-auto">
      {showVariants && (
        <div className="bg-muted/30 p-3 border-b">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {variant}
            </Badge>
            <div className="text-xs text-muted-foreground font-mono">
              bg-card border border-border
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackToSignIn}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Back to sign in"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-1">
              {isSuccess 
                ? "Check your email for reset instructions"
                : "Enter your email to receive a password reset link"
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Send reset link
                </>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToSignIn}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to sign in
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 text-success">
                <Check className="w-5 h-5" />
                <div>
                  <p className="font-medium">Reset link sent!</p>
                  <p className="text-sm text-success/80 mt-1">
                    Check your email for password reset instructions.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="text-sm text-primary hover:underline"
              >
                Try again
              </button>
            </div>

            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleBackToSignIn}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Button>
          </div>
        )}

        {showVariants && (
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Tailwind Classes:</strong></p>
              <p>• Card: <code>bg-card border border-border rounded-lg</code></p>
              <p>• Input: <code>border-input bg-input-background focus:ring-ring</code></p>
              <p>• Button: <code>bg-primary text-primary-foreground hover:bg-primary/90</code></p>
              <p>• Success: <code>bg-success/10 text-success border-success/20</code></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!showVariants) {
    return renderForgotPasswordCard("Reset password", "Single Frame");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Component Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Forgot Password Frame</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Password reset form with email input, loading states, and success confirmation. 
            Includes comprehensive theme support and Tailwind class mappings.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge className="gap-1">
              <Mail className="w-3 h-3" />
              Email Input
            </Badge>
            <Badge variant="outline">Success State</Badge>
            <Badge variant="outline">Auto Layout</Badge>
            <Badge variant="outline">Theme Support</Badge>
          </div>
        </div>
      </div>

      {/* Component Variants */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Light Theme */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Light Theme</h3>
          {renderForgotPasswordCard("Reset password", "Light Theme")}
        </div>

        {/* Dark Theme */}
        <div className="dark space-y-4">
          <h3 className="text-lg font-medium text-center text-foreground">Dark Theme</h3>
          <div className="bg-background p-6 rounded-lg">
            {renderForgotPasswordCard("Reset password", "Dark Theme")}
          </div>
        </div>

        {/* Implementation Notes */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Implementation Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Component Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Email validation with required field</li>
                  <li>• Loading state with spinner animation</li>
                  <li>• Success state with confirmation message</li>
                  <li>• Back navigation to sign in form</li>
                  <li>• Retry functionality after success</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Prototype Flow</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Entry: From "Sign In" → "Forgot Password" link</li>
                  <li>• Submit: Email → Loading → Success state</li>
                  <li>• Return: "Back to sign in" → Sign In form</li>
                  <li>• Retry: "Try again" → Reset form state</li>
                  <li>• Success toast when returning to sign in</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}