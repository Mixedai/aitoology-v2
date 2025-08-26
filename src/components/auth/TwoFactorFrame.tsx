import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, Check, Shield, AlertCircle, Clock, Key } from 'lucide-react';

/*
TWO-FACTOR (MFA) FRAME - AI TOOLOGIST DESIGN SYSTEM

A two-factor authentication form with 6-digit code inputs, auto-advance functionality,
error states, and comprehensive Tailwind class mappings for light/dark theme support.

LAYOUT ARCHITECTURE:
- Card container: max-w-md mx-auto (centered, responsive width)
- Code inputs: grid grid-cols-6 gap-2 (6 equal-width inputs)
- Form spacing: space-y-6 (24px vertical rhythm)

THEME SUPPORT:
- Light: bg-card text-card-foreground border-border
- Dark: bg-card text-card-foreground border-border (CSS custom properties)
- Error state: border-destructive bg-destructive/10 text-destructive

AUTO-ADVANCE LOGIC:
- Focus next input on digit entry
- Focus previous input on backspace
- Auto-submit when all 6 digits entered

STATES:
- Default: Empty code inputs ready for entry
- Filling: Auto-advance between inputs as user types
- Error: Invalid/expired code with error styling
- Success: Code verified with confirmation
- Loading: Verification in progress with disabled inputs

TAILWIND CLASSES REFERENCE:
- Code inputs: w-12 h-12 text-center text-lg border-input focus:ring-ring
- Error state: border-destructive bg-destructive/10 text-destructive
- Success: bg-success/10 text-success border-success/20
- Loading: opacity-50 cursor-not-allowed
*/

interface TwoFactorFrameProps {
  onNavigate?: (destination: string) => void;
  showVariants?: boolean;
}

export function TwoFactorFrame({ onNavigate, showVariants = true }: TwoFactorFrameProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend functionality
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleInputChange = (index: number, value: string) => {
    // Only allow single digits
    if (value.length > 1) return;
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setIsError(false); // Clear error on new input

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits entered
    if (value && index === 5 && newCode.every(digit => digit !== '')) {
      handleSubmit(newCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace - move to previous input if current is empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, 6).split('');
        const newCode = [...code];
        digits.forEach((digit, i) => {
          if (i < 6) newCode[i] = digit;
        });
        setCode(newCode);
        
        // Focus last filled input or submit if complete
        if (digits.length === 6) {
          handleSubmit(newCode);
        } else {
          inputRefs.current[Math.min(digits.length, 5)]?.focus();
        }
      });
    }
  };

  const handleSubmit = async (codeToVerify = code) => {
    if (codeToVerify.some(digit => digit === '')) return;

    setIsLoading(true);
    setIsError(false);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate random success/error for demo
      const isValidCode = codeToVerify.join('') === '123456';
      
      if (isValidCode) {
        setIsSuccess(true);
      } else {
        setIsError(true);
        // Clear code on error
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    }, 1500);
  };

  const handleResendCode = () => {
    setCanResend(false);
    setCountdown(30);
    setIsError(false);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleBackToSignIn = () => {
    if (onNavigate) {
      onNavigate('auth');
    }
  };

  const handleUseBackupCode = () => {
    // In a real app, this would show backup code input
    alert('Backup code feature would be implemented here');
  };

  const renderTwoFactorCard = (title: string, variant: string) => (
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
            <CardTitle className="text-2xl flex items-center gap-2">
              {title}
              <Shield className="w-5 h-5 text-primary" />
            </CardTitle>
            <CardDescription className="mt-1">
              {isSuccess 
                ? "Authentication successful!"
                : "Enter the 6-digit code from your authenticator app"
              }
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!isSuccess ? (
          <div className="space-y-4">
            
            {/* Error Message */}
            {isError && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Invalid code</p>
                    <p className="text-sm text-destructive/80">
                      The code you entered is incorrect or has expired. Please try again.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Code Input Grid */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Verification code</label>
              <div className="grid grid-cols-6 gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleInputChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className={`
                      w-12 h-12 text-center text-lg font-medium
                      border rounded-md
                      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                      transition-colors
                      ${isError 
                        ? 'border-destructive bg-destructive/10 text-destructive' 
                        : 'border-input bg-input-background'
                      }
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={isLoading}
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Tip: You can paste a 6-digit code to fill all fields at once
              </p>
            </div>

            <Button 
              onClick={() => handleSubmit()}
              className="w-full"
              disabled={isLoading || code.some(digit => digit === '')}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Verify
                </>
              )}
            </Button>

            {/* Action Links */}
            <div className="space-y-3 text-center">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleResendCode}
                  disabled={!canResend}
                  className={`text-sm transition-colors ${
                    canResend 
                      ? 'text-primary hover:underline' 
                      : 'text-muted-foreground cursor-not-allowed'
                  }`}
                >
                  {canResend ? (
                    'Resend code'
                  ) : (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Resend code ({countdown}s)
                    </span>
                  )}
                </button>
                
                <span className="text-muted-foreground">•</span>
                
                <button
                  onClick={handleUseBackupCode}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Use backup code
                </button>
              </div>

              <button
                onClick={handleBackToSignIn}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Back to sign in
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2 text-success">
                <Check className="w-5 h-5" />
                <div>
                  <p className="font-medium">Verification successful!</p>
                  <p className="text-sm text-success/80 mt-1">
                    You have been successfully authenticated.
                  </p>
                </div>
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={handleBackToSignIn}
            >
              Continue to dashboard
            </Button>
          </div>
        )}

        {showVariants && (
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Tailwind Classes:</strong></p>
              <p>• Code input: <code>w-12 h-12 border-input focus:ring-ring</code></p>
              <p>• Error state: <code>border-destructive bg-destructive/10</code></p>
              <p>• Grid layout: <code>grid grid-cols-6 gap-2</code></p>
              <p>• Loading: <code>opacity-50 cursor-not-allowed</code></p>
              <p>• Success: <code>bg-success/10 text-success border-success/20</code></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!showVariants) {
    return renderTwoFactorCard("Two-Factor Authentication", "Single Frame");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Component Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Two-Factor (MFA) Frame</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six-digit verification code input with auto-advance, error states, resend functionality,
            and comprehensive accessibility features.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge className="gap-1">
              <Shield className="w-3 h-3" />
              MFA Security
            </Badge>
            <Badge variant="outline">Auto-advance</Badge>
            <Badge variant="outline">Error States</Badge>
            <Badge variant="outline">Accessibility</Badge>
          </div>
        </div>
      </div>

      {/* Demo Note */}
      <div className="max-w-md mx-auto mb-6">
        <div className="p-3 bg-muted/50 border border-border/50 rounded-md">
          <p className="text-sm text-muted-foreground">
            <strong>Demo:</strong> Use code <code className="bg-background px-1 rounded">123456</code> for success, 
            any other code will show error state.
          </p>
        </div>
      </div>

      {/* Component Variants */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Light Theme */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Light Theme</h3>
          {renderTwoFactorCard("Two-Factor Authentication", "Light Theme")}
        </div>

        {/* Dark Theme */}
        <div className="dark space-y-4">
          <h3 className="text-lg font-medium text-center text-foreground">Dark Theme</h3>
          <div className="bg-background p-6 rounded-lg">
            {renderTwoFactorCard("Two-Factor Authentication", "Dark Theme")}
          </div>
        </div>

        {/* Implementation Notes */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Implementation Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Component Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 6-digit code input with auto-advance</li>
                  <li>• Keyboard navigation (arrows, backspace)</li>
                  <li>• Paste support for full codes</li>
                  <li>• Error state with validation feedback</li>
                  <li>• Resend code with countdown timer</li>
                  <li>• Backup code option</li>
                  <li>• Auto-submit on completion</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Prototype Flow</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Entry: From Sign In after password</li>
                  <li>• Input: Type/paste 6-digit code</li>
                  <li>• Auto-submit: On 6th digit entry</li>
                  <li>• Error: Invalid code → Clear & retry</li>
                  <li>• Success: Verified → Continue to app</li>
                  <li>• Backup: Alternative verification method</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}