import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, Plus } from "lucide-react";
import { StatusTag, CategoryTag } from "../ui-kit/AITag";
import { AIButton } from "../ui-kit/AIButton";
import { motion } from "framer-motion";

interface Tool {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  rating: number;
  pricing: string;
  status: "free" | "paid" | "freemium" | "popular" | "new";
}

interface AnimatedToolCardProps {
  tool: Tool;
  onClick: () => void;
  onCompare: (tool: Tool) => void;
  isComparing?: boolean;
}

export function AnimatedToolCard({ tool, onClick, onCompare, isComparing = false }: AnimatedToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`p-6 cursor-pointer transition-all duration-200 ${
          isHovered 
            ? 'shadow-lg border-border/60' 
            : 'shadow-sm'
        }`}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-xl"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {tool.logo}
            </motion.div>
            <div>
              <h3 className="font-semibold text-lg">{tool.name}</h3>
              <CategoryTag category={tool.category} size="sm" />
            </div>
          </div>
          <StatusTag status={tool.status} size="sm" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
          {tool.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">{tool.rating}</span>
          </div>
          <span className="font-semibold text-primary">{tool.pricing}</span>
        </div>

        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mt-4 pt-4 border-t border-border/50 space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex gap-2">
            <AIButton 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              View Details
            </AIButton>
            <AIButton 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onCompare(tool);
              }}
              disabled={isComparing}
            >
              <Plus className="h-3 w-3" />
            </AIButton>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
}