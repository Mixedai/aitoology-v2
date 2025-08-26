import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { X, ArrowRight, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Tool {
  id: string;
  name: string;
  logo: string;
  category: string;
  rating: number;
  pricing: string;
}

interface ComparisonTrayProps {
  tools: Tool[];
  onRemoveTool: (toolId: string) => void;
  onCompare: () => void;
  onClose: () => void;
}

export function ComparisonTray({ tools, onRemoveTool, onCompare, onClose }: ComparisonTrayProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (tools.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [tools]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-2xl"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Tray Header */}
            <div className="flex items-center gap-3">
              <Scale className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Compare Tools ({tools.length}/3)</h3>
              {tools.length >= 2 && (
                <Badge variant="default" className="animate-pulse">
                  Ready to compare!
                </Badge>
              )}
            </div>

            {/* Close Button */}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tools List */}
          <div className="flex items-center gap-4 mt-4 overflow-x-auto pb-2">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0"
              >
                <Card className="p-3 min-w-[200px] relative group">
                  <button
                    onClick={() => onRemoveTool(tool.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
                      {tool.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{tool.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{tool.category}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">⭐ {tool.rating}</span>
                    <span className="text-sm font-medium text-primary">{tool.pricing}</span>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Add More Placeholder */}
            {tools.length < 3 && (
              <Card className="p-3 min-w-[200px] border-dashed border-2 border-muted-foreground/30">
                <div className="h-20 flex flex-col items-center justify-center text-muted-foreground">
                  <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center mb-2">
                    +
                  </div>
                  <span className="text-xs text-center">Add another tool to compare</span>
                </div>
              </Card>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <Button
              onClick={onCompare}
              disabled={tools.length < 2}
              className="flex-1 sm:flex-none"
            >
              Compare {tools.length} Tools
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            
            <Button variant="outline" onClick={onClose}>
              Clear All
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}