// Individual Tool Pages Export
// This file exports all tool-specific pages for navigation

export { ChatGPTPage } from './ChatGPTPage';
export { MidjourneyPage } from './MidjourneyPage';
export { NotionAIPage } from './NotionAIPage';
export { GitHubCopilotPage } from './GitHubCopilotPage';
export { PerplexityPage } from './PerplexityPage';
export { ClaudePage } from './ClaudePage';
export { StableDiffusionPage } from './StableDiffusionPage';
export { RunwayMLPage } from './RunwayMLPage';
export { GrammarlyPage } from './GrammarlyPage';
export { FigmaAIPage } from './FigmaAIPage';

// Tool page mapping for dynamic imports
export const toolPageComponents = {
  'chatgpt': 'ChatGPTPage',
  'midjourney': 'MidjourneyPage', 
  'notion-ai': 'NotionAIPage',
  'github-copilot': 'GitHubCopilotPage',
  'perplexity': 'PerplexityPage',
  'claude': 'ClaudePage',
  'stable-diffusion': 'StableDiffusionPage',
  'runway-ml': 'RunwayMLPage',
  'grammarly': 'GrammarlyPage',
  'figma-ai': 'FigmaAIPage'
};

// Helper function to get component name for a tool
export const getToolPageComponent = (toolId: string): string => {
  return toolPageComponents[toolId as keyof typeof toolPageComponents] || 'ToolDetail';
};