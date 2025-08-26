import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';
import { toast } from 'sonner@2.0.3';
import { 
  Heart, 
  ThumbsUp, 
  Star, 
  Play, 
  Pause, 
  Copy,
  Check,
  X,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
  Zap,
  Eye,
  Code,
  Timer,
  Settings
} from 'lucide-react';

export default function MicroInteractions() {
  const [isHeartLiked, setIsHeartLiked] = useState(false);
  const [isThumbsUpLiked, setIsThumbsUpLiked] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulate loading progress
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 10;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    validateEmail(value);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const showToast = (type: 'success' | 'error' | 'info' | 'warning') => {
    switch (type) {
      case 'success':
        toast.success('Tool saved successfully!', {
          description: 'You can find it in your Tool Wallet.',
          duration: 3000,
        });
        break;
      case 'error':
        toast.error('Failed to save tool', {
          description: 'Please try again later.',
          duration: 4000,
        });
        break;
      case 'info':
        toast.info('New feature available', {
          description: 'Check out the new comparison tool.',
          duration: 3000,
        });
        break;
      case 'warning':
        toast.warning('Trial ending soon', {
          description: 'Your trial expires in 3 days.',
          duration: 5000,
        });
        break;
    }
  };

  const timingSpecs = {
    fast: { duration: '150ms', usage: 'Button hover, focus states' },
    standard: { duration: '200ms', usage: 'Input validation, form feedback' },
    slow: { duration: '250ms', usage: 'Like/favorite animations, tooltips' },
    page: { duration: '300ms', usage: 'Page transitions, modal open/close' }
  };

  const easingSpecs = {
    'ease-out': { value: 'cubic-bezier(0, 0, 0.2, 1)', usage: 'Entering animations' },
    'ease-in': { value: 'cubic-bezier(0.4, 0, 1, 1)', usage: 'Exiting animations' },
    'ease-in-out': { value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'State changes' },
    'spring': { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', usage: 'Playful interactions' }
  };

  const animationClasses = `
// CSS Animation Classes for Micro-Interactions

/* Button Interactions */
.btn-hover-lift {
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}
.btn-hover-lift:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-press-scale {
  transition: transform 150ms ease-in-out;
}
.btn-press-scale:active {
  transform: scale(0.95);
}

/* Input Validation */
.input-error {
  animation: shake 200ms ease-in-out;
  border-color: rgb(239 68 68);
}
.input-success {
  border-color: rgb(16 185 129);
  transition: border-color 200ms ease-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

/* Heart/Like Animation */
.heart-bounce {
  animation: heartBounce 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes heartBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Star Rating */
.star-fill {
  transition: color 200ms ease-out, transform 150ms ease-out;
}
.star-fill:hover {
  transform: scale(1.1);
}

/* Toast Slide In */
.toast-slide-in {
  animation: slideInRight 300ms ease-out;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Skeleton Pulse */
.skeleton-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

/* Focus Visible */
.focus-ring {
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition: outline-color 150ms ease-out;
}
.focus-ring:focus-visible {
  outline-color: rgb(255 107 53);
}`;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2">Micro-Interactions</h1>
          <p className="text-muted-foreground mb-6">
            Delightful animations and feedback patterns that enhance user experience
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="outline" className="gap-2">
              <Timer className="w-3 h-3" />
              150-250ms Timing
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Zap className="w-3 h-3" />
              Smooth Easing
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Eye className="w-3 h-3" />
              Focus Visible
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="interactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="interactions">Interactive Examples</TabsTrigger>
            <TabsTrigger value="specifications">Timing & Easing</TabsTrigger>
            <TabsTrigger value="patterns">Animation Patterns</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
          </TabsList>

          {/* Interactive Examples */}
          <TabsContent value="interactions">
            <div className="grid gap-6">
              {/* Button Interactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Button Interactions
                  </CardTitle>
                  <CardDescription>
                    Hover, press, and focus states with proper timing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <Label>Hover Lift (150ms)</Label>
                      <Button 
                        className="w-full transition-all duration-150 ease-out hover:translate-y-[-1px] hover:shadow-lg"
                      >
                        Hover Me
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <Label>Press Scale (150ms)</Label>
                      <Button 
                        variant="outline"
                        className="w-full transition-transform duration-150 ease-in-out active:scale-95"
                      >
                        Press Me
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <Label>Focus Ring (150ms)</Label>
                      <Button 
                        variant="secondary"
                        className="w-full transition-all duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Focus Me
                      </Button>
                    </div>
                  </div>
                  
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Button interactions use 150ms duration for immediate feedback. Hover effects include subtle lift and shadow.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Favorite/Like Animations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Like & Favorite Animations
                  </CardTitle>
                  <CardDescription>
                    Engaging animations for user interaction feedback (250ms)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Heart Like */}
                    <div className="text-center space-y-3">
                      <Label>Heart Like</Label>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setIsHeartLiked(!isHeartLiked)}
                        className="p-4"
                      >
                        <Heart 
                          className={`w-8 h-8 transition-all duration-250 ease-out ${
                            isHeartLiked 
                              ? 'text-red-500 fill-red-500 scale-110' 
                              : 'text-muted-foreground hover:text-red-400'
                          } ${isHeartLiked ? 'animate-pulse' : ''}`}
                          style={{
                            animation: isHeartLiked ? 'heartBounce 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55)' : 'none'
                          }}
                        />
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        {isHeartLiked ? 'Liked!' : 'Click to like'}
                      </p>
                    </div>

                    {/* Thumbs Up */}
                    <div className="text-center space-y-3">
                      <Label>Thumbs Up</Label>
                      <Button
                        variant="ghost"
                        size="lg"
                        onClick={() => setIsThumbsUpLiked(!isThumbsUpLiked)}
                        className="p-4"
                      >
                        <ThumbsUp 
                          className={`w-8 h-8 transition-all duration-250 ease-out ${
                            isThumbsUpLiked 
                              ? 'text-blue-500 fill-blue-500 scale-110' 
                              : 'text-muted-foreground hover:text-blue-400'
                          }`}
                        />
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        {isThumbsUpLiked ? 'Upvoted!' : 'Click to upvote'}
                      </p>
                    </div>

                    {/* Star Rating */}
                    <div className="text-center space-y-3">
                      <Label>Star Rating</Label>
                      <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="sm"
                            className="p-1"
                            onClick={() => setStarRating(star)}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                          >
                            <Star 
                              className={`w-6 h-6 transition-all duration-200 ease-out ${
                                star <= (hoveredStar || starRating)
                                  ? 'text-yellow-500 fill-yellow-500 scale-110' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          </Button>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {starRating > 0 ? `${starRating} star${starRating > 1 ? 's' : ''}` : 'Rate this tool'}
                      </p>
                    </div>
                  </div>

                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Like animations use 250ms with spring easing for playful feedback. Stars scale on hover for better interaction.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Input Validation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Input Validation
                  </CardTitle>
                  <CardDescription>
                    Real-time validation feedback with visual cues (200ms)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={emailValue}
                      onChange={handleEmailChange}
                      className={`transition-all duration-200 ease-out ${
                        emailError 
                          ? 'border-destructive focus-visible:ring-destructive' 
                          : emailValue && !emailError 
                            ? 'border-success focus-visible:ring-success' 
                            : ''
                      }`}
                    />
                    {emailError && (
                      <div className="flex items-center gap-2 text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                        <X className="w-4 h-4" />
                        {emailError}
                      </div>
                    )}
                    {emailValue && !emailError && (
                      <div className="flex items-center gap-2 text-sm text-success animate-in slide-in-from-top-1 duration-200">
                        <Check className="w-4 h-4" />
                        Valid email address
                      </div>
                    )}
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Input validation uses 200ms transitions. Error states include border color change and shake animation.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Toast Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Toast Notifications
                  </CardTitle>
                  <CardDescription>
                    System feedback with slide-in animations (300ms)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      onClick={() => showToast('success')}
                      variant="outline"
                      className="gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-success" />
                      Success
                    </Button>
                    <Button
                      onClick={() => showToast('error')}
                      variant="outline"
                      className="gap-2"
                    >
                      <X className="w-4 h-4 text-destructive" />
                      Error
                    </Button>
                    <Button
                      onClick={() => showToast('info')}
                      variant="outline"
                      className="gap-2"
                    >
                      <Info className="w-4 h-4 text-blue-500" />
                      Info
                    </Button>
                    <Button
                      onClick={() => showToast('warning')}
                      variant="outline"
                      className="gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                      Warning
                    </Button>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Toasts slide in from the right with 300ms duration. Auto-dismiss timing varies by importance: info (3s), warning (5s).
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Skeleton Loaders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Skeleton Loaders
                  </CardTitle>
                  <CardDescription>
                    Loading states with pulsing animation (1.5s cycle)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Loading Animation</Label>
                    <Button
                      onClick={() => setIsPlaying(!isPlaying)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Stop' : 'Start'} Demo
                    </Button>
                  </div>

                  {isPlaying ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                      <Skeleton className="h-[200px] w-full rounded-lg" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-[60%]" />
                      </div>
                      <Progress value={loadingProgress} className="w-full" />
                      <p className="text-sm text-muted-foreground text-center">
                        Loading... {loadingProgress}%
                      </p>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                      Click "Start Demo" to see skeleton loading animation
                    </div>
                  )}

                  <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription>
                      Skeleton loaders use a 1.5s pulse cycle with opacity animation. Shapes should match the final content layout.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Copy to Clipboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Copy className="w-5 h-5" />
                    Copy Feedback
                  </CardTitle>
                  <CardDescription>
                    Instant feedback for copy actions (200ms)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>API Key</Label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                          sk-abc123def456...
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy('sk-abc123def456ghi789jkl012', 'api-key')}
                          className="gap-2"
                        >
                          {copiedStates['api-key'] ? (
                            <>
                              <Check className="w-4 h-4 text-success" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Tool URL</Label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 p-2 bg-muted rounded text-sm font-mono">
                          https://ai-toologist.com/tools/chatgpt
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy('https://ai-toologist.com/tools/chatgpt', 'tool-url')}
                          className="gap-2"
                        >
                          {copiedStates['tool-url'] ? (
                            <>
                              <Check className="w-4 h-4 text-success" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Check className="h-4 w-4" />
                    <AlertDescription>
                      Copy feedback uses 200ms icon transition. Success state shows for 2 seconds before reverting.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Timing & Easing Specifications */}
          <TabsContent value="specifications">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Timing Specifications
                  </CardTitle>
                  <CardDescription>
                    Consistent timing across all micro-interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(timingSpecs).map(([name, spec]) => (
                      <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium capitalize">{name}</div>
                          <div className="text-sm text-muted-foreground">{spec.usage}</div>
                        </div>
                        <Badge variant="outline" className="font-mono">{spec.duration}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Easing Functions
                  </CardTitle>
                  <CardDescription>
                    Natural motion curves for different interaction types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(easingSpecs).map(([name, spec]) => (
                      <div key={name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{name}</div>
                          <Badge variant="outline" className="font-mono text-xs">{spec.value}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{spec.usage}</div>
                        <div className="h-12 bg-muted rounded-lg relative overflow-hidden">
                          <div 
                            className="h-full bg-primary/20 rounded-lg transition-all duration-1000"
                            style={{ 
                              width: '100%', 
                              transitionTimingFunction: spec.value.includes('cubic-bezier') ? spec.value : name 
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Focus-Visible Behavior
                  </CardTitle>
                  <CardDescription>
                    Accessible focus indicators for keyboard navigation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Focus Ring Specifications</Label>
                      <div className="mt-2 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Ring Width:</span>
                          <code>2px</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Ring Color:</span>
                          <code>rgb(255 107 53) / --color-ring</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Ring Offset:</span>
                          <code>2px</code>
                        </div>
                        <div className="flex justify-between">
                          <span>Transition:</span>
                          <code>150ms ease-out</code>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Interactive Focus Examples</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                          Button Focus
                        </Button>
                        <Input 
                          placeholder="Input focus"
                          className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        <Button 
                          variant="outline"
                          className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          Outline Focus
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Try tabbing through these elements to see focus indicators
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Animation Patterns */}
          <TabsContent value="patterns">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Animation Design Principles</CardTitle>
                  <CardDescription>
                    Core principles that guide our micro-interaction design
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Purposeful</h4>
                        <p className="text-sm text-muted-foreground">
                          Every animation serves a specific purpose: feedback, guidance, or delight.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Responsive</h4>
                        <p className="text-sm text-muted-foreground">
                          Animations respond immediately to user input with appropriate timing.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Natural</h4>
                        <p className="text-sm text-muted-foreground">
                          Motion follows real-world physics with proper easing and acceleration.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Consistent</h4>
                        <p className="text-sm text-muted-foreground">
                          Similar interactions use consistent timing and easing across the app.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Accessible</h4>
                        <p className="text-sm text-muted-foreground">
                          Respects user preferences for reduced motion and maintains focus visibility.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Performant</h4>
                        <p className="text-sm text-muted-foreground">
                          Uses GPU-accelerated properties and avoids expensive layout changes.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Common Animation Patterns</CardTitle>
                  <CardDescription>
                    Reusable patterns for consistent user experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      {
                        name: 'Hover Lift',
                        description: 'Subtle elevation on hover for clickable elements',
                        properties: 'transform: translateY(-1px), box-shadow',
                        timing: '150ms ease-out'
                      },
                      {
                        name: 'Press Scale',
                        description: 'Scale down on press for tactile feedback',
                        properties: 'transform: scale(0.95)',
                        timing: '150ms ease-in-out'
                      },
                      {
                        name: 'Slide In',
                        description: 'Content entering from edges',
                        properties: 'transform: translateX(), opacity',
                        timing: '300ms ease-out'
                      },
                      {
                        name: 'Fade In/Out',
                        description: 'Smooth opacity transitions',
                        properties: 'opacity',
                        timing: '200ms ease-in-out'
                      },
                      {
                        name: 'Bounce',
                        description: 'Playful scale animation for likes/favorites',
                        properties: 'transform: scale()',
                        timing: '250ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                      }
                    ].map((pattern, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{pattern.name}</h4>
                          <Badge variant="outline" className="font-mono text-xs">{pattern.timing}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
                        <code className="text-xs bg-muted p-1 rounded">{pattern.properties}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Implementation */}
          <TabsContent value="implementation">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        CSS Animation Classes
                      </CardTitle>
                      <CardDescription>
                        Copy-paste CSS classes for micro-interactions
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(animationClasses, 'css-classes')}
                      className="gap-2"
                    >
                      {copiedStates['css-classes'] ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy CSS
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{animationClasses}</code>
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tailwind CSS Classes</CardTitle>
                  <CardDescription>
                    Using Tailwind utilities for micro-interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        interaction: 'Button Hover',
                        classes: 'transition-all duration-150 ease-out hover:translate-y-[-1px] hover:shadow-lg'
                      },
                      {
                        interaction: 'Button Press',
                        classes: 'transition-transform duration-150 ease-in-out active:scale-95'
                      },
                      {
                        interaction: 'Focus Ring',
                        classes: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                      },
                      {
                        interaction: 'Input Error',
                        classes: 'border-destructive focus-visible:ring-destructive transition-colors duration-200'
                      },
                      {
                        interaction: 'Skeleton Pulse',
                        classes: 'animate-pulse bg-muted rounded'
                      },
                      {
                        interaction: 'Slide In',
                        classes: 'animate-in slide-in-from-right duration-300'
                      }
                    ].map((item, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{item.interaction}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(item.classes, `tailwind-${index}`)}
                          >
                            {copiedStates[`tailwind-${index}`] ? (
                              <Check className="w-4 h-4 text-success" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <code className="text-sm bg-muted p-2 rounded block">{item.classes}</code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: 'Performance',
                        items: [
                          'Use transform and opacity for animations',
                          'Avoid animating layout properties (width, height, top, left)',
                          'Use will-change sparingly and remove after animation',
                          'Prefer CSS transitions over JavaScript animations'
                        ]
                      },
                      {
                        title: 'Accessibility',
                        items: [
                          'Respect prefers-reduced-motion media query',
                          'Ensure animations don\'t cause seizures (no rapid flashing)',
                          'Maintain focus visibility during animations',
                          'Provide alternative feedback for motion-sensitive users'
                        ]
                      },
                      {
                        title: 'UX Guidelines',
                        items: [
                          'Keep animations under 300ms for UI feedback',
                          'Use consistent timing across similar interactions',
                          'Provide immediate feedback for user actions',
                          'Make loading states engaging but not distracting'
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index}>
                        <h4 className="font-medium mb-3">{section.title}</h4>
                        <ul className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

