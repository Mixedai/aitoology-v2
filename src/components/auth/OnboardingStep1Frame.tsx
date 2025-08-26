import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, ArrowRight, Brain, Image, Music, Video, Bot, Zap, Search, Check } from 'lucide-react';

/*
ONBOARDING STEP 1: PICK INTERESTS - AI TOOLOGIST DESIGN SYSTEM

Multi-select category selection with chip interface following the AI Toologist 
design system. Features comprehensive Tailwind class mappings and mobile variants.

LAYOUT ARCHITECTURE:
- Card container: max-w-lg mx-auto (centered, responsive width)
- Chip grid: grid grid-cols-2 md:grid-cols-3 gap-3 (responsive columns)
- Chips: badge-style with selectable states and hover effects

CATEGORY CHIPS:
- LLM (Brain icon) - Large Language Models
- Image (Image icon) - AI Image Generation
- Audio (Music icon) - AI Audio Tools  
- Video (Video icon) - Video AI Tools
- Agents (Bot icon) - AI Agents & Assistants
- Automation (Zap icon) - Workflow Automation
- Research (Search icon) - Research & Analysis

CHIP STATES:
- Unselected: border-border bg-background text-foreground hover:bg-accent
- Selected: border-primary bg-primary text-primary-foreground
- Mobile: Larger touch targets with proper spacing

TAILWIND CLASSES REFERENCE:
- Chip base: inline-flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer
- Unselected: border-border bg-background text-foreground hover:bg-accent hover:border-accent-foreground/20
- Selected: border-primary bg-primary text-primary-foreground shadow-sm
- Grid: grid grid-cols-2 md:grid-cols-3 gap-3
- Mobile: min-h-[48px] touch-manipulation
*/

interface OnboardingStep1FrameProps {
  onNavigate?: (destination: string, data?: any) => void;
  showVariants?: boolean;
}

interface Interest {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const interests: Interest[] = [
  {
    id: 'llm',
    label: 'LLM',
    icon: Brain,
    description: 'Large Language Models & Chat AI'
  },
  {
    id: 'image',
    label: 'Image',
    icon: Image,
    description: 'AI Image Generation & Editing'
  },
  {
    id: 'audio',
    label: 'Audio',
    icon: Music,
    description: 'Voice & Music AI Tools'
  },
  {
    id: 'video',
    label: 'Video',
    icon: Video,
    description: 'Video AI & Animation'
  },
  {
    id: 'agents',
    label: 'Agents',
    icon: Bot,
    description: 'AI Agents & Assistants'
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: Zap,
    description: 'Workflow & Task Automation'
  },
  {
    id: 'research',
    label: 'Research',
    icon: Search,
    description: 'Research & Data Analysis'
  }
];

export function OnboardingStep1Frame({ onNavigate, showVariants = true }: OnboardingStep1FrameProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleNext = () => {
    if (onNavigate) {
      onNavigate('onboarding-step-2', { selectedInterests });
    }
  };

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('auth');
    }
  };

  const renderInterestChip = (interest: Interest, variant: string) => {
    const isSelected = selectedInterests.includes(interest.id);
    const IconComponent = interest.icon;
    
    return (
      <div
        key={interest.id}
        onClick={() => handleInterestToggle(interest.id)}
        className={`
          inline-flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer
          transition-all duration-200 min-h-[48px] touch-manipulation
          ${isSelected 
            ? 'border-primary bg-primary text-primary-foreground shadow-sm transform scale-[1.02]' 
            : 'border-border bg-background text-foreground hover:bg-accent hover:border-accent-foreground/20'
          }
        `}
      >
        <IconComponent className="w-4 h-4 flex-shrink-0" />
        <div className="flex-1 text-left">
          <div className="font-medium">{interest.label}</div>
          <div className={`text-xs leading-tight ${
            isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}>
            {interest.description}
          </div>
        </div>
        {isSelected && (
          <Check className="w-4 h-4 flex-shrink-0" />
        )}
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
              Step 1/3 • Chip Selection
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className="p-1 hover:bg-accent rounded-md transition-colors"
            aria-label="Back to sign up"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="mt-1">
              Select the AI tool categories that interest you most. This helps us personalize your experience.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Step 1 of 3</span>
            <span className="text-muted-foreground">{selectedInterests.length} selected</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '33.33%' }} />
          </div>
        </div>

        {/* Interest Selection Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interests.map(interest => renderInterestChip(interest, variant))}
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
            disabled={selectedInterests.length === 0}
            className="flex-1"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {selectedInterests.length === 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Select at least one category to continue
          </p>
        )}

        {showVariants && (
          <div className="pt-4 border-t">
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Tailwind Classes:</strong></p>
              <p>• Chip grid: <code>grid grid-cols-1 md:grid-cols-2 gap-3</code></p>
              <p>• Chip base: <code>inline-flex items-center gap-2 px-4 py-3 rounded-lg border</code></p>
              <p>• Unselected: <code>border-border bg-background hover:bg-accent</code></p>
              <p>• Selected: <code>border-primary bg-primary text-primary-foreground</code></p>
              <p>• Mobile: <code>min-h-[48px] touch-manipulation</code></p>
              <p>• Progress: <code>bg-primary h-2 rounded-full transition-all</code></p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!showVariants) {
    return renderOnboardingCard("Pick your interests", "Single Frame");
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Component Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-medium">Onboarding Step 1: Pick Interests</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Multi-select category chips with visual feedback, mobile optimization, and comprehensive 
            Tailwind class mappings following the AI Toologist design system.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge className="gap-1">
              <Brain className="w-3 h-3" />
              Multi-select
            </Badge>
            <Badge variant="outline">Chip Interface</Badge>
            <Badge variant="outline">Mobile Optimized</Badge>
            <Badge variant="outline">Progress Tracking</Badge>
          </div>
        </div>
      </div>

      {/* Component Variants */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Desktop Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Desktop Variant</h3>
          {renderOnboardingCard("Pick your interests", "Desktop")}
        </div>

        {/* Mobile Variant */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center">Mobile Variant</h3>
          <div className="max-w-sm mx-auto">
            {renderOnboardingCard("Pick your interests", "Mobile")}
          </div>
        </div>

        {/* Implementation Notes */}
        <Card className="max-w-4xl mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Implementation Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Component Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multi-select chips with toggle functionality</li>
                  <li>• Visual feedback for selected/unselected states</li>
                  <li>• Progress indicator showing step completion</li>
                  <li>• Mobile-optimized touch targets (48px min-height)</li>
                  <li>• Descriptive text for each category</li>
                  <li>• Validation requiring at least one selection</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Prototype Flow</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Entry: From successful Sign Up</li>
                  <li>• Interaction: Tap chips to select interests</li>
                  <li>• Validation: Must select at least one category</li>
                  <li>• Navigation: "Next" → Onboarding Step 2</li>
                  <li>• Back: "Back" → Auth/Sign Up screen</li>
                  <li>• Data: Passes selected interests to next step</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}