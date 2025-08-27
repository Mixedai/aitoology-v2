import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GitCompare, 
  ArrowLeft, 
  Plus,
  Search,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CompareModal } from './CompareModal';
import { toolsData } from '../../data/mockTools';
import type { ToolLite } from '../../types/compare';

// Simple slugify helper
function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

interface ComparePageProps {
  onNavigate?: (from: string, to: string, params?: any) => void;
}

export default function ComparePage({ onNavigate }: ComparePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const all: ToolLite[] = useMemo(() => toolsData.map(t => ({
    id: t.id, 
    name: t.name, 
    description: t.description,
    rating: t.rating, 
    category: t.category, 
    pricing: t.pricing, 
    features: t.features, 
    logo: t.logo
  })), []);
  
  // Initialize selection from URL params
  const [selectedTools, setSelectedTools] = useState<ToolLite[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const toolsParam = params.get('tools');
    
    if (toolsParam) {
      const ids = toolsParam.split(',');
      const tools: ToolLite[] = [];
      
      for (const id of ids) {
        const tool = all.find(t => t.id === id || slugify(t.name) === id);
        if (tool && !tools.some(t => t.id === tool.id)) {
          tools.push(tool);
        }
      }
      
      // Auto-open modal if tools are pre-selected from URL
      if (tools.length >= 2) {
        setTimeout(() => setIsModalOpen(true), 500);
      }
      
      return tools;
    }
    
    return [];
  });

  // Filter available tools
  const availableTools = useMemo(() => {
    return all.filter(tool => {
      const isSelected = selectedTools.some(t => t.id === tool.id);
      if (isSelected) return false;
      
      if (!searchQuery) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query)
      );
    });
  }, [all, selectedTools, searchQuery]);

  // Update URL when selection changes
  useEffect(() => {
    const ids = selectedTools.map(t => t.id);
    const params = new URLSearchParams(window.location.search);
    
    if (ids.length > 0) {
      params.set('tools', ids.join(','));
    } else {
      params.delete('tools');
    }
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [selectedTools]);

  const handleAddTool = (tool: ToolLite) => {
    if (selectedTools.length < 5) {
      setSelectedTools([...selectedTools, tool]);
    }
  };

  const handleRemoveTool = (toolId: string) => {
    setSelectedTools(selectedTools.filter(t => t.id !== toolId));
    if (selectedTools.length <= 1) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-lg border-b sticky top-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onNavigate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('compare', 'explore-frame', {})}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Button>
              )}
              <div className="flex items-center gap-3">
                <GitCompare className="w-6 h-6 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Compare AI Tools
                </h1>
              </div>
            </div>
            
            {selectedTools.length >= 2 && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare {selectedTools.length} Tools
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selected Tools */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Selected Tools ({selectedTools.length}/5)
            </h2>
            
            {selectedTools.length === 0 ? (
              <Card className="p-12 text-center bg-white/60 backdrop-blur-sm">
                <GitCompare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No tools selected for comparison</p>
                <p className="text-sm text-gray-500">
                  Select at least 2 tools from the right panel to start comparing
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{tool.logo}</span>
                          <div>
                            <h3 className="font-semibold">{tool.name}</h3>
                            <p className="text-sm text-gray-600">{tool.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveTool(tool.id)}
                          className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="outline">{tool.pricing}</Badge>
                        <span className="text-sm text-gray-600">★ {tool.rating}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
                
                {selectedTools.length < 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <Card className="p-4 border-2 border-dashed border-gray-300 bg-gray-50/50 h-full flex items-center justify-center min-h-[140px]">
                      <div className="text-center">
                        <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Add more tools</p>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Available Tools */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Tools</h2>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tools List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {availableTools.map(tool => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  <Card 
                    className="p-3 cursor-pointer hover:shadow-md transition-all bg-white/80 backdrop-blur-sm"
                    onClick={() => handleAddTool(tool)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tool.logo}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{tool.name}</h4>
                        <p className="text-xs text-gray-500">{tool.category}</p>
                      </div>
                      <Plus className="w-4 h-4 text-gray-400" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compare Modal */}
      <CompareModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedTools={selectedTools}
        onRemoveTool={handleRemoveTool}
      />
    </div>
  );
}