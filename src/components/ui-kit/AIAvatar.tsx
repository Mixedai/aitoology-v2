import { HTMLAttributes, forwardRef } from "react";
import { User, Bot } from "lucide-react";
import { cn } from "../ui/utils";

/**
 * Avatar Component
 * 
 * Flexible avatar component for user and brand representation.
 * 
 * Props:
 * - variant: "user" | "brand"
 * - size: "sm" | "md" | "lg" | "xl"
 * - src: string (image URL)
 * - alt: string
 * - fallback: string (initials or text)
 */

interface AIAvatarProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "user" | "brand";
  size?: "sm" | "md" | "lg" | "xl";
  src?: string;
  alt?: string;
  fallback?: string;
}

const AIAvatar = forwardRef<HTMLDivElement, AIAvatarProps>(
  ({ 
    className, 
    variant = "user", 
    size = "md", 
    src, 
    alt, 
    fallback, 
    ...props 
  }, ref) => {
    const baseStyles = "relative flex shrink-0 overflow-hidden rounded-full border border-border";
    
    const sizes = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16"
    };

    const variants = {
      user: "bg-muted",
      brand: "bg-primary/10"
    };

    const iconSizes = {
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8"
    };

    const textSizes = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg"
    };

    const renderContent = () => {
      if (src) {
        return (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="aspect-square h-full w-full object-cover"
          />
        );
      }

      if (fallback) {
        return (
          <span className={cn(
            "flex h-full w-full items-center justify-center font-medium text-muted-foreground",
            textSizes[size]
          )}>
            {fallback}
          </span>
        );
      }

      const Icon = variant === "user" ? User : Bot;
      return (
        <Icon className={cn(
          "text-muted-foreground",
          iconSizes[size]
        )} />
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          sizes[size],
          variants[variant],
          "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {renderContent()}
      </div>
    );
  }
);

AIAvatar.displayName = "AIAvatar";

// Avatar Group component for displaying multiple avatars
interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt?: string;
    fallback?: string;
  }>;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ avatars, max = 3, size = "md", className }, ref) => {
    const displayAvatars = avatars.slice(0, max);
    const remainingCount = avatars.length - max;

    return (
      <div ref={ref} className={cn("flex -space-x-2", className)}>
        {displayAvatars.map((avatar, index) => (
          <AIAvatar
            key={index}
            size={size}
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            className="ring-2 ring-background"
          />
        ))}
        {remainingCount > 0 && (
          <AIAvatar
            size={size}
            fallback={`+${remainingCount}`}
            className="ring-2 ring-background"
          />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

export { AIAvatar, AvatarGroup };