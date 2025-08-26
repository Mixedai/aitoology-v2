import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface ElevationTokenProps {
  name: string;
  semanticName: string;
  shadowClass: string;
  shadowValue: string;
}

export function ElevationToken({ name, semanticName, shadowClass, shadowValue }: ElevationTokenProps) {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{name}</h4>
        <Badge variant="outline" className="text-xs">{semanticName}</Badge>
      </div>
      
      <div className="flex justify-center py-4">
        <div 
          className={`w-24 h-16 bg-white rounded-lg border ${shadowClass}`}
        />
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tailwind:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded">{shadowClass}</code>
        </div>
        <div className="space-y-1">
          <span className="text-muted-foreground">CSS Value:</span>
          <code className="font-mono text-xs bg-muted px-2 py-1 rounded block break-all">{shadowValue}</code>
        </div>
      </div>
    </Card>
  );
}