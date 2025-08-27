
import { toast } from 'sonner';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  ExternalLink,
  Download,
  Upload,
  Trash2,
  Save,
  Plus,
  Edit,
  Share2,
  Heart,
  Star
} from 'lucide-react';

/*
TOAST NOTIFICATION SYSTEM - AI TOOLOGIST DESIGN SYSTEM

Comprehensive toast notifications with proper styling and accessibility.

Tailwind Classes:
- Success: bg-green-50 border-green-200 text-green-800
- Error: bg-red-50 border-red-200 text-red-800  
- Warning: bg-amber-50 border-amber-200 text-amber-800
- Info: bg-blue-50 border-blue-200 text-blue-800
- Icon: w-5 h-5 flex-shrink-0
- Action Button: text-sm font-medium hover:underline
- Close Button: w-4 h-4 text-muted-foreground hover:text-foreground
- Spacing: p-4 gap-3 (8-point grid compliance)

Accessibility:
- role="status" for success/info
- role="alert" for errors/warnings
- aria-label for close buttons
- Proper focus management
- Screen reader announcements
*/

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface CustomToastOptions {
  description?: string;
  action?: ToastAction;
  duration?: number;
  id?: string;
}

// Base toast function with custom styling
export function showToast(
  type: ToastType,
  message: string,
  options?: CustomToastOptions
) {
  const { description, action, duration = 5000, id } = options || {};
  
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[type];

  const toastConfig = {
    id,
    duration,
    ...(type === 'error' || type === 'warning' ? { role: 'alert' } : { role: 'status' }),
  };

  if (type === 'success') {
    return toast.success(message, {
      ...toastConfig,
      icon: <Icon className="w-5 h-5 text-green-600" />,
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    });
  }

  if (type === 'error') {
    return toast.error(message, {
      ...toastConfig,
      icon: <Icon className="w-5 h-5 text-red-600" />,
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    });
  }

  if (type === 'warning') {
    return toast.warning || toast(message, {
      ...toastConfig,
      icon: <Icon className="w-5 h-5 text-amber-600" />,
      description,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
    });
  }

  // Info toast
  return toast(message, {
    ...toastConfig,
    icon: <Icon className="w-5 h-5 text-blue-600" />,
    description,
    action: action ? {
      label: action.label,
      onClick: action.onClick,
    } : undefined,
  });
}

// Convenience functions for common toast patterns
export const toastNotifications = {
  // Success notifications
  success: (message: string, options?: CustomToastOptions) => 
    showToast('success', message, options),

  toolAdded: (toolName: string) => 
    showToast('success', 'Tool added successfully', {
      description: `${toolName} has been added to your favorites`,
      action: {
        label: 'View Tool',
        onClick: () => console.log('Navigate to tool')
      }
    }),

  subscriptionAdded: (toolName: string) =>
    showToast('success', 'Subscription tracked', {
      description: `${toolName} subscription added to your wallet`,
      action: {
        label: 'View Wallet',
        onClick: () => console.log('Navigate to wallet')
      }
    }),

  profileUpdated: () =>
    showToast('success', 'Profile updated', {
      description: 'Your changes have been saved successfully'
    }),

  workflowCreated: (workflowName: string) =>
    showToast('success', 'Workflow created', {
      description: `${workflowName} is ready to use`,
      action: {
        label: 'Run Workflow',
        onClick: () => console.log('Run workflow')
      }
    }),

  tutorialCompleted: (tutorialName: string) => {
    toast.success('Tutorial completed!', {
      description: `You've successfully completed "${tutorialName}"`,
      action: {
        label: 'View Progress',
        onClick: () => console.log('View progress')
      }
    });
  },

  // Error notifications
  error: (message: string, options?: CustomToastOptions) =>
    showToast('error', message, options),

  loadError: (resource: string = 'content') =>
    showToast('error', `Failed to load ${resource}`, {
      description: 'Please try again or refresh the page',
      action: {
        label: 'Retry',
        onClick: () => window.location.reload()
      }
    }),

  networkError: () =>
    showToast('error', 'Connection error', {
      description: 'Check your internet connection and try again',
      action: {
        label: 'Retry',
        onClick: () => window.location.reload()
      }
    }),

  authError: () =>
    showToast('error', 'Authentication required', {
      description: 'Please sign in to access this feature',
      action: {
        label: 'Sign In',
        onClick: () => console.log('Navigate to auth')
      }
    }),

  permissionError: () =>
    showToast('error', 'Access denied', {
      description: 'You don\'t have permission for this action'
    }),

  // Warning notifications
  warning: (message: string, options?: CustomToastOptions) =>
    showToast('warning', message, options),

  subscriptionExpiring: (toolName: string, daysLeft: number) =>
    showToast('warning', 'Subscription expiring soon', {
      description: `${toolName} expires in ${daysLeft} days`,
      action: {
        label: 'Renew',
        onClick: () => console.log('Navigate to renewal')
      }
    }),

  quotaWarning: (percentage: number) =>
    showToast('warning', 'Usage limit warning', {
      description: `You've used ${percentage}% of your monthly quota`,
      action: {
        label: 'Upgrade',
        onClick: () => console.log('Navigate to billing')
      }
    }),

  unsavedChanges: () =>
    showToast('warning', 'Unsaved changes', {
      description: 'Your changes haven\'t been saved yet',
      action: {
        label: 'Save Now',
        onClick: () => console.log('Save changes')
      }
    }),

  // Info notifications
  info: (message: string, options?: CustomToastOptions) =>
    showToast('info', message, options),

  newFeature: (feature: string) =>
    showToast('info', 'New feature available', {
      description: `Check out ${feature} in your dashboard`,
      action: {
        label: 'Explore',
        onClick: () => console.log('Navigate to feature')
      }
    }),

  maintenance: (duration: string) =>
    showToast('info', 'Scheduled maintenance', {
      description: `Brief downtime expected: ${duration}`,
      duration: 10000
    }),

  betaFeature: () =>
    showToast('info', 'Beta feature', {
      description: 'This feature is in beta. Share your feedback!',
      action: {
        label: 'Feedback',
        onClick: () => console.log('Open feedback form')
      }
    }),

  // Multi-step flow success handlers
  toolSubmitted: (toolName: string) => {
    toast.success('Tool submitted successfully!', {
      description: `${toolName} has been submitted for review and will be published within 24 hours`,
      duration: 5000,
      action: {
        label: 'View Submission',
        onClick: () => {
          // Navigate to submitted tool detail (implementation varies by parent component)
          console.log('Navigate to tool detail for:', toolName);
        }
      }
    });
  },

  workflowCreated: (workflowName: string) => {
    toast.success('Workflow created!', {
      description: `${workflowName} is now available in your workflow library`,
      duration: 4000,
      action: {
        label: 'View Workflow',
        onClick: () => {
          // Navigate to workflow detail (implementation varies by parent component)
          console.log('Navigate to workflow detail for:', workflowName);
        }
      }
    });
  },

  onboardingComplete: (userName?: string) => {
    toast.success(userName ? `Welcome to AI Toologist, ${userName}!` : 'Welcome to AI Toologist!', {
      description: 'Your account is set up and ready to explore AI tools',
      duration: 4000,
      action: {
        label: 'Browse Tools',
        onClick: () => {
          // Navigate to browse tools (implementation varies by parent component)
          console.log('Navigate to browse tools');
        }
      }
    });
  },

  draftSaved: (type: 'tool' | 'workflow', autoSave = false) => {
    const messages = {
      tool: 'Tool draft saved',
      workflow: 'Workflow draft saved'
    };
    
    toast.success(messages[type], {
      description: autoSave ? 'Your progress has been automatically saved' : 'Your progress has been saved',
      duration: autoSave ? 2000 : 3000,
      action: autoSave ? undefined : {
        label: 'Continue Editing',
        onClick: () => {
          console.log('Continue editing draft');
        }
      }
    });
  },

  subscriptionAdded: (toolName: string) => {
    toast.success('Subscription added!', {
      description: `${toolName} has been added to your tool wallet`,
      duration: 3000,
      action: {
        label: 'View Wallet',
        onClick: () => {
          console.log('Navigate to tool wallet');
        }
      }
    });
  },

  toolAddedToComparison: (toolName: string) => {
    toast.success('Tool added to comparison', {
      description: `${toolName} has been added to your comparison list`,
      duration: 2500,
      action: {
        label: 'Compare Now',
        onClick: () => {
          console.log('Navigate to comparison');
        }
      }
    });
  },

  // Validation and form error handlers
  validationError: (message: string) => {
    toast.error('Validation Error', {
      description: message,
      duration: 3000
    });
  },

  stepValidationFailed: (stepName: string, errors: string[]) => {
    toast.error(`${stepName} validation failed`, {
      description: errors.length === 1 ? errors[0] : `${errors.length} fields need attention`,
      duration: 4000
    });
  },

  unsavedChanges: (onSave?: () => void, onDiscard?: () => void) => {
    toast.warning('You have unsaved changes', {
      description: 'Would you like to save your progress before leaving?',
      duration: 6000,
      action: onSave ? {
        label: 'Save Draft',
        onClick: onSave
      } : undefined,
      cancel: onDiscard ? {
        label: 'Discard',
        onClick: onDiscard
      } : undefined
    });
  }
};

// Bulk operations toasts
export const bulkToasts = {
  deleteMultiple: (count: number, type: string) =>
    showToast('success', `${count} ${type}s deleted`, {
      description: 'Items have been moved to trash',
      action: {
        label: 'Undo',
        onClick: () => console.log('Undo delete')
      }
    }),

  exportComplete: (count: number, format: string) =>
    showToast('success', 'Export complete', {
      description: `${count} items exported as ${format}`,
      action: {
        label: 'Download',
        onClick: () => console.log('Download file')
      }
    }),

  importProgress: (processed: number, total: number) =>
    showToast('info', 'Import in progress', {
      description: `${processed}/${total} items processed`,
      duration: 3000
    }),

  syncComplete: () =>
    showToast('success', 'Sync complete', {
      description: 'All your data is up to date'
    }),
};

// Promise-based toasts for async operations
export const promiseToasts = {
  loading: function<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  apiCall: function<T>(
    promise: Promise<T>,
    operation: string
  ) {
    return toast.promise(promise, {
      loading: `${operation}...`,
      success: `${operation} successful`,
      error: `${operation} failed`,
    });
  },
};

// Utility function to dismiss all toasts
export function dismissAllToasts() {
  toast.dismiss();
}

// Utility function to dismiss specific toast
export function dismissToast(id: string) {
  toast.dismiss(id);
}