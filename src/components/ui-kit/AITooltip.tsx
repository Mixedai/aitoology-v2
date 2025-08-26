import { ReactNode, useState } from "react";
import { cn } from "../ui/utils";

/**
 * Tooltip Component
 * 
 * A tooltip component that shows additional information on hover.
 * 
 * Props:
 * - content: ReactNode (tooltip content)
 * - side: "top" | "right" | "bottom" | "left"
 * - delayDuration: number (delay in ms)
 * - children: ReactNode (trigger element)
 */

interface AITooltipProps {
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  delayDuration?: number;
  children: ReactNode;
  className?: string;
}

export function AITooltip({ 
  content, 
  side = "top", 
  delayDuration = 700, 
  children, 
  className 
}: AITooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delayDuration);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const sideStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2"
  };

  const arrowStyles = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-popover",
    right: "right-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-popover",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-popover",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-popover"
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            "absolute z-50 px-3 py-1.5 text-sm text-popover-foreground bg-popover border border-border rounded-md shadow-md whitespace-nowrap",
            sideStyles[side],
            className
          )}
        >
          {content}
          <div
            className={cn(
              "absolute w-0 h-0",
              arrowStyles[side]
            )}
          />
        </div>
      )}
    </div>
  );
}