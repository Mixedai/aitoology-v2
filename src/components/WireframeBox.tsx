interface WireframeBoxProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  children?: React.ReactNode;
  filled?: boolean;
}

export function WireframeBox({ 
  width = "100%", 
  height = 40, 
  className = "", 
  children, 
  filled = false 
}: WireframeBoxProps) {
  return (
    <div 
      className={`border border-black ${filled ? 'bg-black text-white' : 'bg-white'} flex items-center justify-center font-mono text-xs ${className}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width, 
        height: typeof height === 'number' ? `${height}px` : height 
      }}
    >
      {children}
    </div>
  );
}