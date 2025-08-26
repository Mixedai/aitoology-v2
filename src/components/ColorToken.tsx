import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ColorTokenProps {
  name: string;
  semanticName: string;
  hex: string;
  rgb: string;
  rgba: string;
  tailwindClass: string;
  bgColor: string;
}

export function ColorToken({ name, semanticName, hex, rgb, rgba, tailwindClass, bgColor }: ColorTokenProps) {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{name}</h4>
        <Badge variant="outline" className="text-xs">{semanticName}</Badge>
      </div>
      
      <div 
        className="w-full h-16 rounded-lg border"
        style={{ backgroundColor: bgColor }}
      />
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">HEX:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{hex}</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">RGB:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{rgb}</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">RGBA:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{rgba}</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tailwind:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{tailwindClass}</code>
        </div>
      </div>
    </Card>
  );
}