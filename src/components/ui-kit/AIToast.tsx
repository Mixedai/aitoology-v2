import { ReactNode, createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "../ui/utils";

/**
 * Toast Component
 * 
 * A toast notification system with different variants.
 * 
 * Props:
 * - variant: "default" | "success" | "error" | "warning" | "info"
 * - title: string
 * - description?: string
 * - duration: number (auto-dismiss time in ms)
 */

interface Toast {
  id: string;
  variant: "default" | "success" | "error" | "warning" | "info";
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto-dismiss after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const { removeToast } = useToast();

  const variants = {
    default: {
      className: "bg-background border-border text-foreground",
      icon: <Info className="h-4 w-4" />
    },
    success: {
      className: "bg-success/10 border-success/20 text-success-foreground",
      icon: <CheckCircle className="h-4 w-4 text-success" />
    },
    error: {
      className: "bg-destructive/10 border-destructive/20 text-destructive-foreground",
      icon: <AlertCircle className="h-4 w-4 text-destructive" />
    },
    warning: {
      className: "bg-warning/10 border-warning/20 text-warning-foreground",
      icon: <AlertTriangle className="h-4 w-4 text-warning" />
    },
    info: {
      className: "bg-primary/10 border-primary/20 text-primary-foreground",
      icon: <Info className="h-4 w-4 text-primary" />
    }
  };

  const variant = variants[toast.variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg border shadow-lg animate-in slide-in-from-right-full",
        variant.className
      )}
    >
      {variant.icon}
      
      <div className="flex-1 space-y-1">
        <p className="font-medium text-sm">{toast.title}</p>
        {toast.description && (
          <p className="text-sm opacity-80">{toast.description}</p>
        )}
      </div>

      <button
        onClick={() => removeToast(toast.id)}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Helper function to show toasts
export const toast = {
  success: (title: string, description?: string) => {
    // This would be used with the context
    console.log("Success toast:", title, description);
  },
  error: (title: string, description?: string) => {
    console.log("Error toast:", title, description);
  },
  warning: (title: string, description?: string) => {
    console.log("Warning toast:", title, description);
  },
  info: (title: string, description?: string) => {
    console.log("Info toast:", title, description);
  }
};