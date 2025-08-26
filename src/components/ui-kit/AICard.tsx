import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { Star, TrendingUp, Check } from "lucide-react";
import { cn } from "../ui/utils";
import { AIButton } from "./AIButton";

/**
 * Card Component
 * 
 * Flexible card component with multiple variants for different use cases.
 * 
 * Props:
 * - variant: "tool" | "stat" | "pricing"
 * - elevated: boolean (adds shadow)
 * - hoverable: boolean (adds hover effects)
 */

interface AICardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "tool" | "stat" | "pricing";
  elevated?: boolean;
  hoverable?: boolean;
}

const AICard = forwardRef<HTMLDivElement, AICardProps>(
  ({ className, variant = "tool", elevated = true, hoverable = false, children, ...props }, ref) => {
    const baseStyles = "rounded-lg border border-border bg-card text-card-foreground transition-all duration-200";
    const elevatedStyles = elevated ? "shadow-sm" : "";
    const hoverStyles = hoverable ? "hover:shadow-md hover:border-border/60" : "";

    return (
      <div
        ref={ref}
        className={cn(baseStyles, elevatedStyles, hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AICard.displayName = "AICard";

// Tool Card Variant
interface ToolCardProps {
  title: string;
  description: string;
  category: string;
  rating: number;
  pricing: string;
  image?: string;
  className?: string;
}

const ToolCard = forwardRef<HTMLDivElement, ToolCardProps>(
  ({ title, description, category, rating, pricing, image, className }, ref) => {
    return (
      <AICard ref={ref} variant="tool" hoverable className={cn("p-6 space-y-4", className)}>
        {image && (
          <div className="aspect-video rounded-md bg-muted overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground bg-accent px-2 py-1 rounded">
              {category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span className="text-sm text-muted-foreground">{rating}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span className="font-medium text-primary">{pricing}</span>
          <AIButton size="sm">View Details</AIButton>
        </div>
      </AICard>
    );
  }
);

ToolCard.displayName = "ToolCard";

// Stat Card Variant
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
  className?: string;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, change, trend = "neutral", icon, className }, ref) => {
    const trendColors = {
      up: "text-success",
      down: "text-destructive",
      neutral: "text-muted-foreground"
    };

    return (
      <AICard ref={ref} variant="stat" className={cn("p-6", className)}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                {trend === "up" && <TrendingUp className="h-3 w-3" />}
                <span className={cn("text-sm", trendColors[trend])}>
                  {change}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="text-muted-foreground">
              {icon}
            </div>
          )}
        </div>
      </AICard>
    );
  }
);

StatCard.displayName = "StatCard";

// Pricing Card Variant
interface PricingCardProps {
  plan: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  className?: string;
}

const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  ({ plan, price, period, features, popular = false, className }, ref) => {
    return (
      <AICard 
        ref={ref} 
        variant="pricing" 
        className={cn(
          "p-6 space-y-6 relative",
          popular && "border-primary shadow-lg scale-105",
          className
        )}
      >
        {popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{plan}</h3>
          <div className="space-y-1">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-muted-foreground">/{period}</span>
          </div>
        </div>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <AIButton 
          variant={popular ? "primary" : "outline"} 
          className="w-full"
        >
          Get Started
        </AIButton>
      </AICard>
    );
  }
);

PricingCard.displayName = "PricingCard";

export { AICard, ToolCard, StatCard, PricingCard };