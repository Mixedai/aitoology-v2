import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { ArrowLeft, ArrowRight, Bell, Mail, Package, Settings } from 'lucide-react';

/*
ONBOARDING STEP 2: NOTIFICATION PREFERENCES - AI TOOLOGIST DESIGN SYSTEM

Toggle-based notification preference selection following the AI Toologist design system.
Features comprehensive Tailwind class mappings for Switch components and mobile variants.

LAYOUT ARCHITECTURE:
- Card container: max-w-lg mx-auto (centered, responsive width)
- Toggle list: space-y-4 (vertical rhythm for preference items)
- Each item: flex items-start gap-3 (icon, content, toggle alignment)

NOTIFICATION PREFERENCES:
- Email tips: Weekly AI tool recommendations and tips
- Weekly digest: Summary of new tools and updates
- Product updates: Feature announcements and important changes

SWITCH STATES:
- Enabled: bg-primary with white thumb, smooth transition
- Disabled: bg-muted with muted thumb
- Focus: ring-2 ring-ring ring-offset-2
- Mobile: min-h-[44px] touch targets

TAILWIND CLASSES REFERENCE:
- Switch container: inline-flex h-6 w-11 shrink-0 cursor-pointer items-center
- Switch thumb: pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg
- Switch enabled: bg-primary data-[state=checked]:translate-x-5
- Switch disabled: bg-input data-[state=unchecked]:translate-x-0
- Preference item: flex items-start gap-3 p-4 rounded-lg border
*/

interface OnboardingStep2FrameProps {
  onNavigate?: (destination: string, data?: any) => void;
  showVariants?: boolean;
  initialData?: any;
}

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultEnabled: boolean;
}

const notificationPreferences: NotificationPreference[] = [
  {
    id: 'emailTips',
    label: 'Email tips',
    description: 'Get weekly AI tool recommendations and usage tips delivered to your inbox.',
    icon: Mail,
    defaultEnabled: true
  },
  {
    id: 'weeklyDigest',
    label: 'Weekly digest',
    description: 'Receive a summary of new tools, updates, and trending AI solutions.',
    icon: Package,
    defaultEnabled: true
  },
  {
    id: 'productUpdates',
    label: 'Product updates',
    description: 'Stay informed about new features, improvements, and important announcements.',
    icon: Bell,
    defaultEnabled: false
  }
];

export function OnboardingStep2Frame({ 
  onNavigate, 
  showVariants = true, 
  initialData 
}: OnboardingStep2FrameProps) {
  const [preferences, setPreferences] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    notificationPreferences.forEach(pref => {
      initial[pref.id] = pref.defaultEnabled;
    });
    return initial;
  });

  const handlePreferenceToggle = (preferenceId: string) => {
    setPreferences(prev => ({
      ...prev,
      [preferenceId]: !prev[preferenceId]
    }));
  };

  const handleNext = () => {
    if (onNavigate) {
      onNavigate('onboarding-step-3', { 
        ...initialData,
        notificationPreferences: preferences 
      });
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('onboarding-step-2', 'onboarding-step-1');
    }
  };

  const renderPreferenceItem = (preference: NotificationPreference, _variant: string) => {
    const isEnabled = preferences[preference.id];
    const IconComponent = preference.icon;
    
    return (
      <div
        key={preference.id}
        className="flex items-start gap-3 p-4 rounded-lg border border-border hover:border-border/80 transition-colors"
      >
        <div className={`
          p-2 rounded-lg shrink-0 mt-1
          ${isEnabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}
        `}>
          <IconComponent className="w-4 h-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="font-medium">{preference.label}</h4>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {preference.description}
              </p>
            </div>
            
            <Switch
              checked={isEnabled}
              onCheckedChange={() => handlePreferenceToggle(preference.id)}
              className="shrink-0"
              aria-label={`Toggle ${preference.label}`}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderOnboardingCard = (title: string, variant: string) => (
    <Card className="w-full max-w-lg mx-auto">
      {showVariants && (
        <div className="bg-muted/30 p-3 border-b">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {variant}
            </Badge>
            <div className="text-xs text-muted-foreground font-mono">
              Step 2/3 • Toggle Preferences
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Back to interests"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-1">
              Choose how you'd like to stay updated with AI tools and platform updates.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Step 2 of 3</span>
            <span className="text-muted-foreground">
              {Object.values(preferences).filter(Boolean).length} enabled
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '66.66%' }} />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <div className="space-y-3">
            {notificationPreferences.map(preference => 
              renderPreferenceItem(preference, variant)
            )}
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-2">
              <Settings className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">You can change these later</p>
                <p>Update your notification preferences anytime in your account settings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex-1 md:flex-none"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button 
            onClick={handleNext}
            className="flex-1"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {showVariants && (
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Tailwind Classes:</strong></p>
              <p>• Switch base: <code>inline-flex h-6 w-11 shrink-0 cursor-pointer items-center</code></p>
              <p>• Switch thumb: <code>block h-5 w-5 rounded-full bg-background shadow-lg</code></p>
              <p>• Switch enabled: <code>bg-primary data-[state=checked]:translate-x-5</code></p>
              <p>• Switch disabled: <code>bg-input data-[state=unchecked]:translate-x-0</code></p>
              <p>• Preference item: <code>flex items-start gap-3 p-4 rounded-lg border</code></p>
              <p>• Icon container: <code>p-2 rounded-lg shrink-0 bg-primary/10</code></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!showVariants) {
    return renderOnboardingCard("Notification preferences", "Single Frame");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Component Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Onboarding Step 2: Notification Preferences</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Toggle-based preference selection with clear descriptions, visual feedback, and 
            comprehensive Tailwind class mappings for Switch components.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge className="gap-1">
              <Bell className="w-3 h-3" />
              Toggles
            </Badge>
            <Badge variant="outline">Preferences</Badge>
            <Badge variant="outline">Switch Component</Badge>
            <Badge variant="outline">Mobile Optimized</Badge>
          </div>
        </div>
      </div>

      {/* Component Variants */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Desktop Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Desktop Variant</h3>
          {renderOnboardingCard("Notification preferences", "Desktop")}
        </div>

        {/* Mobile Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Mobile Variant</h3>
          <div className="max-w-sm mx-auto">
            {renderOnboardingCard("Notification preferences", "Mobile")}
          </div>
        </div>

        {/* Implementation Notes */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Implementation Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Component Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Toggle switches with smooth animations</li>
                  <li>• Clear descriptions for each preference</li>
                  <li>• Visual feedback with icon state changes</li>
                  <li>• Default recommendations (email tips enabled)</li>
                  <li>• Settings reminder about future changes</li>
                  <li>• Progress tracking showing 66% completion</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Prototype Flow</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Entry: From Onboarding Step 1 with interests data</li>
                  <li>• Interaction: Toggle switches to set preferences</li>
                  <li>• Default state: Email tips and digest enabled</li>
                  <li>• Navigation: "Next" → Onboarding Step 3</li>
                  <li>• Back: "Back" → Onboarding Step 1</li>
                  <li>• Data: Combines with interests for final step</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}