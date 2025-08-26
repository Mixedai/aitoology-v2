import { ReactNode, HTMLAttributes, forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "../ui/utils";
import { AIButton } from "./AIButton";

/**
 * Modal Component
 * 
 * Flexible modal component with different presentation styles.
 * 
 * Props:
 * - variant: "center" | "slide-over"
 * - open: boolean
 * - onClose: () => void
 * - title: string
 * - description?: string
 * - overlay: boolean
 */

interface AIModalProps {
  variant?: "center" | "slide-over";
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  overlay?: boolean;
  children: ReactNode;
  className?: string;
}

const AIModal = forwardRef<HTMLDivElement, AIModalProps>(
  ({ 
    variant = "center", 
    open, 
    onClose, 
    title, 
    description, 
    overlay = true, 
    children, 
    className 
  }, ref) => {
    if (!open) return null;

    const overlayStyles = overlay 
      ? "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      : "";

    const modalVariants = {
      center: "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg",
      "slide-over": "fixed inset-y-0 right-0 z-50 h-full w-3/4 gap-4 border-l border-border bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
    };

    return (
      <>
        {overlay && (
          <div 
            className={overlayStyles}
            onClick={onClose}
          />
        )}
        <div
          ref={ref}
          className={cn(modalVariants[variant], className)}
          data-state="open"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{title}</h2>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
            <AIButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </AIButton>
          </div>
          
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </>
    );
  }
);

AIModal.displayName = "AIModal";

// Modal Footer component for actions
interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = "ModalFooter";

export { AIModal, ModalFooter };