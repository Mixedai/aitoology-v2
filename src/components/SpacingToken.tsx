import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface SpacingTokenProps {
  name: string;
  semanticName: string;
  size: number;
  tailwindClass: string;
}

export function SpacingToken({ name, semanticName, size, tailwindClass }: SpacingTokenProps) {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{name}</h4>
        <Badge variant="outline" className="text-xs">{semanticName}</Badge>
      </div>
      
      <div className="flex items-center space-x-2">
        <div 
          className="bg-indigo-500 rounded"
          style={{ width: `${size}px`, height: "24px" }}
        />
        <span className="text-sm text-muted-foreground">{size}px</span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Size:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{size}px</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tailwind:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{tailwindClass}</code>
        </div>
      </div>
    </Card>
  );
}