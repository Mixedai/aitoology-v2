import { HTMLAttributes, forwardRef } from "react";
import { X } from "lucide-react";
import { cn } from "../ui/utils";

/**
 * Tag Component
 * 
 * Flexible tag component for categorization and labeling.
 * 
 * Props:
 * - variant: "category" | "pricing" | "status"
 * - size: "sm" | "md" | "lg"
 * - removable: boolean
 * - onRemove: () => void
 */

interface AITagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "category" | "pricing" | "status";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
}

const AITag = forwardRef<HTMLSpanElement, AITagProps>(
  ({ 
    className, 
    variant = "category", 
    size = "md", 
    removable = false, 
    onRemove, 
    children, 
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center gap-1 rounded font-medium transition-colors";
    
    const variants = {
      category: "bg-muted text-muted-foreground hover:bg-muted/80",
      pricing: "bg-primary/10 text-primary border border-primary/20",
      status: "bg-success/10 text-success border border-success/20"
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base"
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className="hover:text-foreground transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

AITag.displayName = "AITag";

// Status-specific tags
interface StatusTagProps extends Omit<AITagProps, "variant"> {
  status: "free" | "paid" | "freemium" | "beta" | "new" | "popular";
}

const StatusTag = forwardRef<HTMLSpanElement, StatusTagProps>(
  ({ status, ...props }, ref) => {
    const statusConfig = {
      free: { variant: "category" as const, className: "bg-success/10 text-success border border-success/20" },
      paid: { variant: "pricing" as const, className: "bg-primary/10 text-primary border border-primary/20" },
      freemium: { variant: "category" as const, className: "bg-warning/10 text-warning border border-warning/20" },
      beta: { variant: "category" as const, className: "bg-secondary/10 text-secondary border border-secondary/20" },
      new: { variant: "status" as const, className: "bg-destructive/10 text-destructive border border-destructive/20" },
      popular: { variant: "pricing" as const, className: "bg-primary text-primary-foreground" }
    };

    const config = statusConfig[status];

    return (
      <AITag
        ref={ref}
        variant={config.variant}
        className={config.className}
        {...props}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </AITag>
    );
  }
);

StatusTag.displayName = "StatusTag";

// Category-specific tags
interface CategoryTagProps extends Omit<AITagProps, "variant"> {
  category: string;
}

const CategoryTag = forwardRef<HTMLSpanElement, CategoryTagProps>(
  ({ category, ...props }, ref) => {
    return (
      <AITag
        ref={ref}
        variant="category"
        {...props}
      >
        {category}
      </AITag>
    );
  }
);

CategoryTag.displayName = "CategoryTag";

export { AITag, StatusTag, CategoryTag };