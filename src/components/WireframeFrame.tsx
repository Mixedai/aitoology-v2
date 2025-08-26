import { ReactNode } from "react";
import { Badge } from "./ui/badge";

interface WireframeFrameProps {
  title: string;
  breakpoint: "sm" | "md" | "lg";
  width: number;
  height: number;
  children: ReactNode;
  notes?: string[];
}

export function WireframeFrame({ title, breakpoint, width, height, children, notes = [] }: WireframeFrameProps) {
  const breakpointColors = {
    sm: "bg-green-500",
    md: "bg-yellow-500", 
    lg: "bg-blue-500"
  };

  return (
    <div className="relative">
      {/* Frame Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-sm">{title}</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            {width} × {height}
          </Badge>
          <div className={`w-3 h-3 rounded-full ${breakpointColors[breakpoint]}`} />
          <span className="font-mono text-xs text-muted-foreground">{breakpoint.toUpperCase()}</span>
        </div>
      </div>

      {/* Wireframe Container */}
      <div 
        className="bg-white border border-black relative overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {children}
      </div>

      {/* Sticky Notes */}
      {notes.length > 0 && (
        <div className="absolute -right-48 top-0 space-y-2 w-40">
          {notes.map((note, index) => (
            <div key={index} className="bg-yellow-200 border border-yellow-400 p-2 text-xs font-mono transform rotate-2">
              {note}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}