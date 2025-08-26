import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "../ui/utils";

/**
 * Toggle Component
 * 
 * A toggle switch component for binary choices.
 * 
 * Props:
 * - size: "sm" | "md" | "lg"
 * - disabled: boolean
 * - checked: boolean
 * - onCheckedChange: (checked: boolean) => void
 */

interface AIToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md" | "lg";
  onCheckedChange?: (checked: boolean) => void;
}

const AIToggle = forwardRef<HTMLInputElement, AIToggleProps>(
  ({ 
    className, 
    size = "md", 
    checked, 
    onCheckedChange, 
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";
    
    const sizes = {
      sm: "h-4 w-7",
      md: "h-5 w-9", 
      lg: "h-6 w-11"
    };

    const thumbSizes = {
      sm: "h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
      md: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      lg: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e);
    };

    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            baseStyles,
            sizes[size],
            checked 
              ? "bg-primary" 
              : "bg-switch-background",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          data-state={checked ? "checked" : "unchecked"}
        >
          <div
            className={cn(
              "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
              thumbSizes[size]
            )}
            data-state={checked ? "checked" : "unchecked"}
          />
        </div>
      </label>
    );
  }
);

AIToggle.displayName = "AIToggle";

export { AIToggle };