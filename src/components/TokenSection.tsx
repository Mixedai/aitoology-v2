import { ReactNode } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Copy, Download } from "lucide-react";

interface TokenSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  onExportCSS?: () => void;
  onExportJSON?: () => void;
}

export function TokenSection({ title, description, children, onExportCSS, onExportJSON }: TokenSectionProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex gap-2">
          {onExportCSS && (
            <Button variant="outline" size="sm" onClick={onExportCSS}>
              <Copy className="w-4 h-4 mr-2" />
              CSS
            </Button>
          )}
          {onExportJSON && (
            <Button variant="outline" size="sm" onClick={onExportJSON}>
              <Download className="w-4 h-4 mr-2" />
              JSON
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {children}
      </div>
    </Card>
  );
}