import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../ui/utils";

/**
 * Button Component
 * 
 * A flexible button component with multiple variants and states.
 * 
 * Props:
 * - variant: "primary" | "secondary" | "outline" | "ghost" | "destructive"
 * - size: "sm" | "md" | "lg"
 * - loading: boolean
 * - disabled: boolean
 */

interface AIButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const AIButton = forwardRef<HTMLButtonElement, AIButtonProps>(
  ({ className, variant = "primary", size = "md", loading = false, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80 shadow-sm",
      outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-sm"
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4",
      lg: "h-12 px-6 text-lg"
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

AIButton.displayName = "AIButton";

export { AIButton };