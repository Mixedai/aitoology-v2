
import { Card, CardContent } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Sparkles, 
  Wand2, 
  Layers, 
  Upload, 
  CheckCircle, 
  Clock, 
  Users, 
  Star 
} from 'lucide-react';
import type { WizardState } from '../types';
import { enhancedWorkflowTemplates } from '../mockData';

interface WizardStep1Props {
  wizardState: WizardState;
  updateWizardData: (updates: Partial<WizardState['data']>) => void;
  generateWorkflowFromAI: (prompt: string) => Promise<void>;
}

export function WizardStep1({ wizardState, updateWizardData, generateWorkflowFromAI }: WizardStep1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <h3 className="mb-2">How would you like to start?</h3>
        <p className="text-muted-foreground mb-6">
          Choose your preferred method to create your workflow.
        </p>
      </div>

      <Tabs 
        value={wizardState.data.importType} 
        onValueChange={(value: string) => updateWizardData({ importType: value as any })}
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="blank" className="gap-1">
            <Sparkles className="w-3 h-3" />
            <span className="hidden sm:inline">Blank</span>
          </TabsTrigger>
          <TabsTrigger value="ai-generated" className="gap-1">
            <Wand2 className="w-3 h-3" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger value="template" className="gap-1">
            <Layers className="w-3 h-3" />
            <span className="hidden sm:inline">Template</span>
          </TabsTrigger>
          <TabsTrigger value="file" className="gap-1">
            <Upload className="w-3 h-3" />
            <span className="hidden sm:inline">Import</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="blank" className="space-y-4">
          <Card className="p-6 text-center border-dashed">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h4>Start from Scratch</h4>
                <p className="text-sm text-muted-foreground">
                  Build your workflow step by step with complete control over every component.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-generated" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Wand2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4>AI-Powered Generation</h4>
                  <p className="text-sm text-muted-foreground">
                    Describe your workflow in plain English and let AI build it for you.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="ai-prompt">What workflow do you want to create?</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="Example: Create a workflow that takes customer feedback from Slack, analyzes sentiment with AI, and creates summary reports in Google Sheets..."
                  value={wizardState.data.aiPrompt}
                  onChange={(e) => updateWizardData({ aiPrompt: e.target.value })}
                  rows={4}
                  className="resize-none"
                />
                {wizardState.validationErrors.aiPrompt && (
                  <p className="text-sm text-destructive">
                    {wizardState.validationErrors.aiPrompt}
                  </p>
                )}
              </div>
              
              {wizardState.data.aiPrompt.trim() && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t"
                >
                  <Button
                    variant="outline"
                    onClick={() => generateWorkflowFromAI(wizardState.data.aiPrompt)}
                    disabled={wizardState.aiAssistant.analyzing}
                    className="gap-2"
                  >
                    {wizardState.aiAssistant.analyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Preview AI Generation
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="template" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {enhancedWorkflowTemplates.map(template => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    wizardState.data.template?.id === template.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : ''
                  }`}
                  onClick={() => updateWizardData({ template })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <template.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm truncate">{template.name}</h4>
                          {template.isPopular && (
                            <Badge variant="secondary" className="text-xs">
                              Popular
                            </Badge>
                          )}
                          {template.aiSuggested && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <Sparkles className="w-2 h-2" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {template.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {template.estimatedTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {template.uses}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {template.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {wizardState.data.template && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4"
            >
              <Card className="p-4 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm">Template Selected: {wizardState.data.template.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      This template includes {wizardState.data.template.tools.length} pre-configured tools 
                      and is estimated to take {wizardState.data.template.estimatedTime} to set up.
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {wizardState.data.template.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </TabsContent>
        
        <TabsContent value="file" className="space-y-4">
          <Card className="p-6 text-center border-dashed">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4>Import Workflow File</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a JSON workflow file to continue working on an existing workflow.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="gap-2">
                    <Upload className="w-4 h-4" />
                    Choose File
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    Supports: .json, .workflow files (max 10MB)
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}