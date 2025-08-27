import { useEffect,useState, } from 'react';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  X, 
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  Save
} from 'lucide-react';

import { toastNotifications } from '../ui/toast-notifications';

/*
SUBMIT TOOL MULTI-STEP WIZARD - AI TOOLOGIST DESIGN SYSTEM

4-step tool submission wizard with comprehensive validation and state management.

Client State Management:
- currentStep: number (1-4) - Current wizard step
- isValid: boolean - Current step validation state
- isSubmitting: boolean - Form submission loading state
- formData: object - Complete form data across all steps
- hasUnsavedChanges: boolean - Track unsaved changes for exit confirmation

Steps:
1. Basic Information (name, description, category, website)
2. Features & Pricing (features, pricing model, plans)
3. Media & Documentation (logo, screenshots, documentation)
4. Review & Submit (preview, terms, final submission)

Navigation Flow:
- Next/Back: Validates current step before proceeding
- Save Draft: Preserves progress without submission
- Finish: Submits tool and shows success screen
- Cancel: Returns to Browse Tools with unsaved changes warning

Success States:
- Draft Saved: Toast notification with "Continue Editing" action
- Tool Submitted: Success screen with "View Tool" and "Submit Another" CTAs
- Redirects: Success screen redirects to Tool Detail after 3 seconds

Keyboard Shortcuts:
- Tab: Navigate between form fields
- ⌘Enter: Submit current step (Next/Finish)
- Esc: Cancel with confirmation if unsaved changes
- Arrow keys: Navigate between steps in review
*/

interface SubmitToolState {
  currentStep: number;
  isValid: boolean;
  isSubmitting: boolean;
  isDraft: boolean;
  hasUnsavedChanges: boolean;
  formData: {
    // Step 1: Basic Information
    name: string;
    description: string;
    category: string;
    website: string;
    shortDescription: string;
    
    // Step 2: Features & Pricing
    features: string[];
    pricingModel: 'free' | 'freemium' | 'paid' | 'enterprise';
    pricingPlans: Array<{
      name: string;
      price: string;
      features: string[];
    }>;
    apiAvailable: boolean;
    
    // Step 3: Media & Documentation
    logo: File | null;
    screenshots: File[];
    videoUrl: string;
    documentationUrl: string;
    
    // Step 4: Review & Submit
    agreedToTerms: boolean;
    submissionNotes: string;
  };
  validationErrors: Record<string, string>;
}

export function SubmitTool({ 
  onNavigate 
}: { 
  onNavigate?: (screen: string, params?: any) => void;
}) {
  // Multi-step wizard state
  const [state, setState] = useState<SubmitToolState>({
    currentStep: 1,
    isValid: false,
    isSubmitting: false,
    isDraft: false,
    hasUnsavedChanges: false,
    formData: {
      name: '',
      description: '',
      category: '',
      website: '',
      shortDescription: '',
      features: [],
      pricingModel: 'freemium',
      pricingPlans: [],
      apiAvailable: false,
      logo: null,
      screenshots: [],
      videoUrl: '',
      documentationUrl: '',
      agreedToTerms: false,
      submissionNotes: ''
    },
    validationErrors: {}
  });

  // Auto-save draft every 30 seconds if changes exist
  useEffect(() => {
    if (!state.hasUnsavedChanges) return;

    const autoSaveInterval = setInterval(() => {
      saveDraft();
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [state.hasUnsavedChanges]);

  // Load saved draft on component mount
  useEffect(() => {
    loadSavedDraft();
  }, []);

  // Validate current step
  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};
    const { formData, currentStep } = state;

    switch (currentStep) {
      case 1:
        if (!formData.name.trim()) errors.name = 'Tool name is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.category) errors.category = 'Category is required';
        if (!formData.website.trim()) errors.website = 'Website URL is required';
        if (formData.website && !isValidUrl(formData.website)) {
          errors.website = 'Please enter a valid URL';
        }
        break;
      
      case 2:
        if (formData.features.length === 0) errors.features = 'At least one feature is required';
        if (!formData.pricingModel) errors.pricingModel = 'Pricing model is required';
        if (formData.pricingModel !== 'free' && formData.pricingPlans.length === 0) {
          errors.pricingPlans = 'At least one pricing plan is required';
        }
        break;
      
      case 3:
        // Media is optional but validate URLs if provided
        if (formData.videoUrl && !isValidUrl(formData.videoUrl)) {
          errors.videoUrl = 'Please enter a valid video URL';
        }
        if (formData.documentationUrl && !isValidUrl(formData.documentationUrl)) {
          errors.documentationUrl = 'Please enter a valid documentation URL';
        }
        break;
      
      case 4:
        if (!formData.agreedToTerms) errors.terms = 'You must agree to the terms and conditions';
        break;
    }

    const isValid = Object.keys(errors).length === 0;
    setState(prev => ({ 
      ...prev, 
      isValid, 
      validationErrors: errors 
    }));
    
    return isValid;
  };

  // Update form data
  const updateFormData = (updates: Partial<SubmitToolState['formData']>) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
      hasUnsavedChanges: true
    }));
  };

  // Navigation functions
  const goToNextStep = () => {
    if (!validateCurrentStep()) return;
    
    if (state.currentStep < 4) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      submitTool();
    }
  };

  const goToPreviousStep = () => {
    if (state.currentStep > 1) {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setState(prev => ({ ...prev, currentStep: step }));
    }
  };

  // Save draft functionality
  const saveDraft = async () => {
    setState(prev => ({ ...prev, isDraft: true }));
    
    try {
      // Simulate saving to localStorage/API
      localStorage.setItem('submitTool_draft', JSON.stringify(state.formData));
      
      setState(prev => ({ ...prev, hasUnsavedChanges: false, isDraft: false }));
      toastNotifications.success('Draft saved', {
        description: 'Your progress has been saved automatically',
        action: {
          label: 'Continue',
          onClick: () => {}
        }
      });
    } catch (error) {
      setState(prev => ({ ...prev, isDraft: false }));
      toastNotifications.error('Failed to save draft');
    }
  };

  // Load saved draft
  const loadSavedDraft = () => {
    try {
      const savedDraft = localStorage.getItem('submitTool_draft');
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        setState(prev => ({ ...prev, formData: draftData }));
        toastNotifications.info('Draft loaded', {
          description: 'Your previous progress has been restored'
        });
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  };

  // Submit tool
  const submitTool = async () => {
    if (!validateCurrentStep()) return;
    
    setState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft
      localStorage.removeItem('submitTool_draft');
      
      // Show success screen
      showSuccessScreen();
    } catch (error) {
      setState(prev => ({ ...prev, isSubmitting: false }));
      toastNotifications.error('Submission failed', {
        description: 'Please try again or save as draft',
        action: {
          label: 'Save Draft',
          onClick: saveDraft
        }
      });
    }
  };

  // Show success screen
  const showSuccessScreen = () => {
    setState(prev => ({ ...prev, isSubmitting: false, hasUnsavedChanges: false }));
    
    toastNotifications.success('Tool submitted successfully!', {
      description: `${state.formData.name} has been submitted for review`,
      action: {
        label: 'View Submission',
        onClick: () => onNavigate?.('browse')
      }
    });

    // Auto-redirect after 3 seconds
    setTimeout(() => {
      onNavigate?.('browse', { 
        submissionSuccess: true, 
        toolName: state.formData.name 
      });
    }, 3000);
  };

  // Cancel with confirmation
  const handleCancel = () => {
    if (state.hasUnsavedChanges) {
      const shouldSave = confirm('You have unsaved changes. Would you like to save a draft before leaving?');
      if (shouldSave) {
        saveDraft();
      }
    }
    onNavigate?.('browse');
  };

  // Utility functions
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        goToNextStep();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.currentStep]);

  // Step progress calculation
  const progress = (state.currentStep / 4) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2">Submit New Tool</h1>
            <p className="text-muted-foreground">
              Step {state.currentStep} of 4: {getStepTitle(state.currentStep)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={saveDraft}
              disabled={!state.hasUnsavedChanges || state.isDraft}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {state.isDraft ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleCancel}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Basic Info</span>
            <span>Features</span>
            <span>Media</span>
            <span>Review</span>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-6">
        {state.currentStep === 1 && (
          <StepBasicInfo
            formData={state.formData}
            errors={state.validationErrors}
            onUpdate={updateFormData}
          />
        )}
        {state.currentStep === 2 && (
          <StepFeaturesPricing
            formData={state.formData}
            errors={state.validationErrors}
            onUpdate={updateFormData}
          />
        )}
        {state.currentStep === 3 && (
          <StepMedia
            formData={state.formData}
            errors={state.validationErrors}
            onUpdate={updateFormData}
          />
        )}
        {state.currentStep === 4 && (
          <StepReview
            formData={state.formData}
            errors={state.validationErrors}
            onUpdate={updateFormData}
            onEditStep={goToStep}
          />
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={state.currentStep === 1}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button 
          onClick={goToNextStep}
          disabled={!state.isValid || state.isSubmitting}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 gap-2"
        >
          {state.isSubmitting ? (
            <>Loading...</>
          ) : state.currentStep === 4 ? (
            <>
              <Check className="w-4 h-4" />
              Submit Tool
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// Helper function to get step titles
const getStepTitle = (step: number) => {
  const titles = {
    1: 'Basic Information',
    2: 'Features & Pricing',
    3: 'Media & Documentation',
    4: 'Review & Submit'
  };
  return titles[step as keyof typeof titles] || '';
};

// Step Components (placeholder implementations)
const StepBasicInfo = ({ formData, errors, onUpdate }: any) => (
  <div className="space-y-6">
    <div>
      <h3 className="mb-4">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Tool Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="Enter tool name"
            className={errors.name ? 'border-destructive' : ''}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website URL *</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => onUpdate({ website: e.target.value })}
            placeholder="https://example.com"
            className={errors.website ? 'border-destructive' : ''}
          />
          {errors.website && (
            <p className="text-sm text-destructive">{errors.website}</p>
          )}
        </div>
      </div>
    </div>
    
    <div className="space-y-2">
      <Label htmlFor="description">Description *</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) => onUpdate({ description: e.target.value })}
        placeholder="Describe what this tool does..."
        rows={4}
        className={errors.description ? 'border-destructive' : ''}
      />
      {errors.description && (
        <p className="text-sm text-destructive">{errors.description}</p>
      )}
    </div>
  </div>
);

const StepFeaturesPricing = ({ formData, errors, onUpdate }: any) => (
  <div className="space-y-6">
    <h3>Features & Pricing</h3>
    <p className="text-muted-foreground">Placeholder for features and pricing configuration</p>
  </div>
);

const StepMedia = ({ formData, errors, onUpdate }: any) => (
  <div className="space-y-6">
    <h3>Media & Documentation</h3>
    <p className="text-muted-foreground">Placeholder for media upload and documentation links</p>
  </div>
);

const StepReview = ({ formData, errors, onUpdate, onEditStep }: any) => (
  <div className="space-y-6">
    <h3>Review & Submit</h3>
    <p className="text-muted-foreground">Review your submission before finalizing</p>
    <div className="flex items-start gap-2">
      <Checkbox
        id="terms"
        checked={formData.agreedToTerms}
        onCheckedChange={(checked) => onUpdate({ agreedToTerms: checked })}
      />
      <Label htmlFor="terms" className="text-sm">
        I agree to the terms and conditions and confirm that all information is accurate
      </Label>
    </div>
    {errors.terms && (
      <p className="text-sm text-destructive">{errors.terms}</p>
    )}
  </div>
);