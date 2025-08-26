import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { Search, Eye, EyeOff } from "lucide-react";
import { cn } from "../ui/utils";
import { useState } from "react";

/**
 * Input Component
 * 
 * A flexible input component with multiple types and icon support.
 * 
 * Props:
 * - type: "text" | "password" | "search" | "email" | "number"
 * - icon: ReactNode (optional icon to display)
 * - iconPosition: "left" | "right"
 * - error: boolean
 * - label: string (optional)
 */

interface AIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password" | "search" | "email" | "number";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  error?: boolean;
  label?: string;
}

const AIInput = forwardRef<HTMLInputElement, AIInputProps>(
  ({ 
    className, 
    type = "text", 
    icon, 
    iconPosition = "left", 
    error = false, 
    label, 
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
      setInputType(showPassword ? "password" : "text");
    };

    const baseStyles = "flex h-10 w-full rounded border border-border bg-input-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    
    const errorStyles = error ? "border-destructive focus-visible:ring-destructive" : "";
    
    const searchIcon = type === "search" ? <Search className="h-4 w-4 text-muted-foreground" /> : null;
    const passwordIcon = type === "password" ? (
      <button
        type="button"
        onClick={handlePasswordToggle}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    ) : null;

    const displayIcon = icon || searchIcon || passwordIcon;

    if (displayIcon) {
      return (
        <div className="space-y-2">
          {label && (
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {label}
            </label>
          )}
          <div className="relative">
            {iconPosition === "left" && displayIcon !== passwordIcon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {displayIcon}
              </div>
            )}
            <input
              type={type === "password" ? inputType : type}
              className={cn(
                baseStyles,
                iconPosition === "left" && displayIcon !== passwordIcon && "pl-10",
                (iconPosition === "right" || type === "password") && "pr-10",
                errorStyles,
                className
              )}
              ref={ref}
              {...props}
            />
            {(iconPosition === "right" || type === "password") && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {displayIcon}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(baseStyles, errorStyles, className)}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

AIInput.displayName = "AIInput";

export { AIInput };