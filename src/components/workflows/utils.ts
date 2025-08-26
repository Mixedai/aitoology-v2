import type { WorkflowNode, WorkflowConnection, Tool } from './types';

// Utility Functions
export const generateNodeId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
export const generateConnectionId = () => `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const validateConnection = (fromNode: WorkflowNode, fromOutput: string, toNode: WorkflowNode, toInput: string): boolean => {
  const output = fromNode.outputs.find(o => o.id === fromOutput);
  const input = toNode.inputs.find(i => i.id === toInput);
  
  if (!output || !input) return false;
  if (input.connected) return false; // Input already connected
  
  // Type compatibility check
  return output.type === input.type || output.type === 'any' || input.type === 'any';
};

export const createNewNode = (tool: Tool, position?: { x: number; y: number }): WorkflowNode => {
  return {
    id: generateNodeId(),
    toolId: tool.id,
    position: position || { 
      x: Math.random() * 400 + 100, 
      y: Math.random() * 300 + 100 
    },
    size: { width: 200, height: 120 },
    config: {},
    inputs: tool.inputTypes.map((type, index) => ({
      id: `input_${index}`,
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      required: index === 0,
      connected: false
    })),
    outputs: tool.outputTypes.map((type, index) => ({
      id: `output_${index}`,
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      connected: false
    })),
    status: 'idle'
  };
};

export const getStepTitle = (step: number) => {
  switch (step) {
    case 1: return 'Choose Starting Point';
    case 2: return 'Build Your Workflow';
    case 3: return 'Configure & Details';
    case 4: return 'Test & Publish';
    default: return 'Create Workflow';
  }
};

export const getStepDescription = (step: number) => {
  switch (step) {
    case 1: return 'Start with a template, generate with AI, or build from scratch';
    case 2: return 'Add tools and connect them to create your automated workflow';
    case 3: return 'Set up details, permissions, and sharing options';
    case 4: return 'Test your workflow and publish to the community';
    default: return '';
  }
};