import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface TypographyTokenProps {
  name: string;
  semanticName: string;
  size: string;
  pxSize: number;
  fontFamily: string;
  sampleText: string;
}

export function TypographyToken({ name, semanticName, size, pxSize, fontFamily, sampleText }: TypographyTokenProps) {
  const fontClass = fontFamily === "JetBrains Mono" ? "font-mono" : "";
  
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{name}</h4>
        <Badge variant="outline" className="text-xs">{semanticName}</Badge>
      </div>
      
      <div 
        className={`${fontClass}`}
        style={{ fontSize: `${pxSize}px`, lineHeight: "1.5" }}
      >
        {sampleText}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Size:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{size}</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Pixels:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{pxSize}px</code>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Font:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{fontFamily}</code>
        </div>
      </div>
    </Card>
  );
}