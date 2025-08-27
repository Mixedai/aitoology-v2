// Mock AI Tools Data
// This file contains mock data for AI tools used across the application
// 
// DESIGN HANDOFF NOTES:
// - toolsData is the primary dataset for Explore cards and Tool Detail rendering
// - Each tool uses id (slug) as the primary identifier for navigation
// - Reviews array contains user testimonial strings
// - Features array lists key capabilities
// - Pricing uses standard tiers: Free, Freemium, Paid
// - Categories: Chatbot, Design, Productivity, Development, Research, Video, Writing
// - Logo field contains emoji representations
// - Website URLs are production-ready

export interface MockTool {
  toolId: string; // For backward compatibility with existing components
  id: string; // Primary slug identifier (matches toolsData structure)
  name: string;
  category: string;
  description: string;
  logo: string;
  rating: number;
  users?: string; // Optional for backward compatibility
  pricing: string;
  features: string[];
  tags?: string[]; // Optional for backward compatibility
  verified?: boolean; // Optional for backward compatibility
  trending?: boolean; // Optional for backward compatibility
  featured?: boolean; // Optional for backward compatibility
  longDescription?: string; // Optional for backward compatibility
  website: string;
  founded?: string; // Optional for backward compatibility
  headquarters?: string; // Optional for backward compatibility
  reviews: string[]; // Array of review strings (updated structure)
}

// Primary dataset for Explore and Tool Detail pages
export const toolsData = [
  {"id":"chatgpt","name":"ChatGPT","description":"Conversational AI assistant for text and code.","category":"Chatbot","pricing":"Freemium","features":["Long-form answers","Code help","Custom GPTs"],"website":"https://openai.com/chatgpt","logo":"💬","rating":4.7,"reviews":["Great for daily research and drafts."]},
  {"id":"midjourney","name":"MidJourney","description":"AI image generation from text prompts.","category":"Design","pricing":"Paid","features":["Text-to-image","Stylized outputs","Community gallery"],"website":"https://www.midjourney.com","logo":"🎨","rating":4.8,"reviews":["Best-in-class visuals."]},
  {"id":"notion-ai","name":"Notion AI","description":"AI writing and knowledge features inside Notion.","category":"Productivity","pricing":"Freemium","features":["Summarize notes","Rewrite text","Action items"],"website":"https://www.notion.so","logo":"📝","rating":4.6,"reviews":["Perfect for note-heavy teams."]},
  {"id":"github-copilot","name":"GitHub Copilot","description":"AI pair programmer inside your IDE.","category":"Development","pricing":"Paid","features":["Inline suggestions","Refactors","Test stubs"],"website":"https://github.com/features/copilot","logo":"👨‍💻","rating":4.5,"reviews":["Speeds up routine coding."]},
  {"id":"perplexity","name":"Perplexity AI","description":"Answer engine with cited sources.","category":"Research","pricing":"Freemium","features":["Live web answers","Citations","Follow-up chat"],"website":"https://www.perplexity.ai","logo":"🔎","rating":4.4,"reviews":["Great for factual lookups."]},
  {"id":"claude","name":"Claude","description":"Helpful, harmless, honest assistant by Anthropic.","category":"Chatbot","pricing":"Freemium","features":["Long context","Writing help","Tool use"],"website":"https://www.anthropic.com","logo":"🤖","rating":4.6,"reviews":["Excellent with long docs."]},
  {"id":"stable-diffusion","name":"Stable Diffusion","description":"Open model for image generation.","category":"Design","pricing":"Free","features":["Local runs","ControlNet","Extensions"],"website":"https://stability.ai","logo":"🖼️","rating":4.3,"reviews":["Flexible for power users."]},
  {"id":"runway-ml","name":"Runway ML","description":"AI video and motion tools in the browser.","category":"Video","pricing":"Paid","features":["Gen-3 Alpha","Green screen","Motion brush"],"website":"https://runwayml.com","logo":"🎬","rating":4.2,"reviews":["Frictionless video gen."]},
  {"id":"grammarly","name":"Grammarly","description":"Writing assistant for grammar and style.","category":"Writing","pricing":"Freemium","features":["Grammar fix","Tone rewrite","Plagiarism check"],"website":"https://www.grammarly.com","logo":"✍️","rating":4.4,"reviews":["A must-have for writers."]},
  {"id":"figma-ai","name":"Figma AI","description":"AI features for design workflows in Figma.","category":"Design","pricing":"Freemium","features":["Auto layout help","Content fill","Design suggestions"],"website":"https://www.figma.com","logo":"🎛️","rating":4.1,"reviews":["Nice for quick drafts."]},
  {"id":"invalid","name":"Test Invalid Tool","description":"This tool has an invalid ID for QA testing.","category":"Testing","pricing":"Free","features":["QA Testing","404 Handling","Error States"],"website":"https://test.invalid","logo":"❌","rating":1.0,"reviews":["This should trigger 404."]}
];

// Convert toolsData to MockTool format for backward compatibility
export const MOCK_TOOLS: MockTool[] = toolsData.map(tool => ({
  toolId: tool.id, // Use id as toolId for navigation
  id: tool.id,
  name: tool.name,
  category: tool.category,
  description: tool.description,
  logo: tool.logo,
  rating: tool.rating,
  users: generateUserCount(tool.rating), // Generate user count based on rating
  pricing: tool.pricing,
  features: tool.features,
  tags: generateTags(tool.category, tool.features), // Generate tags from category and features
  verified: tool.rating >= 4.5, // High-rated tools are verified
  trending: tool.rating >= 4.6, // Very high-rated tools are trending
  featured: tool.rating >= 4.7, // Top-rated tools are featured
  longDescription: generateLongDescription(tool), // Generate detailed description
  website: tool.website,
  founded: generateFoundedYear(tool.id), // Generate realistic founded year
  headquarters: generateHeadquarters(tool.id), // Generate realistic headquarters
  reviews: tool.reviews // Use the provided reviews array
}));

// Helper functions for generating backward compatibility data
function generateUserCount(rating: number): string {
  if (rating >= 4.7) return `${Math.floor(Math.random() * 50 + 50)}M+`;
  if (rating >= 4.5) return `${Math.floor(Math.random() * 20 + 10)}M+`;
  if (rating >= 4.3) return `${Math.floor(Math.random() * 10 + 2)}M+`;
  return `${Math.floor(Math.random() * 2000 + 500)}K+`;
}

function generateTags(category: string, features: string[]): string[] {
  const categoryTags: { [key: string]: string[] } = {
    'Chatbot': ['AI', 'Chat', 'Assistant', 'Conversational'],
    'Design': ['Design', 'Creative', 'Visual', 'UI/UX'],
    'Productivity': ['Productivity', 'Workflow', 'Organization', 'Efficiency'],
    'Development': ['Code', 'Programming', 'IDE', 'Development'],
    'Research': ['Research', 'Search', 'Analysis', 'Academic'],
    'Video': ['Video', 'Motion', 'Animation', 'Creative'],
    'Writing': ['Writing', 'Content', 'Grammar', 'Communication']
  };
  
  const baseTags = categoryTags[category] || ['AI', 'Tool'];
  const featureTags = features.slice(0, 2).map(f => f.split(' ')[0]); // First word of features
  return [...baseTags, ...featureTags].slice(0, 5);
}

function generateLongDescription(tool: any): string {
  return `${tool.description} This powerful AI tool offers ${tool.features.join(', ').toLowerCase()} to enhance your ${tool.category.toLowerCase()} workflow. With a ${tool.rating} star rating, it's trusted by users worldwide for its reliability and innovative features.`;
}

function generateFoundedYear(id: string): string {
  const years: { [key: string]: string } = {
    'chatgpt': '2022',
    'midjourney': '2021',
    'notion-ai': '2023',
    'github-copilot': '2021',
    'perplexity': '2022',
    'claude': '2023',
    'stable-diffusion': '2022',
    'runway-ml': '2018',
    'grammarly': '2009',
    'figma-ai': '2024'
  };
  return years[id] || '2022';
}

function generateHeadquarters(id: string): string {
  const hqs: { [key: string]: string } = {
    'chatgpt': 'San Francisco, CA',
    'midjourney': 'San Francisco, CA',
    'notion-ai': 'San Francisco, CA',
    'github-copilot': 'San Francisco, CA',
    'perplexity': 'San Francisco, CA',
    'claude': 'San Francisco, CA',
    'stable-diffusion': 'London, UK',
    'runway-ml': 'New York, NY',
    'grammarly': 'San Francisco, CA',
    'figma-ai': 'San Francisco, CA'
  };
  return hqs[id] || 'San Francisco, CA';
}

// Helper functions
export const getToolById = (toolId: string): MockTool | undefined => {
  // QA TEST: Simulate "invalid" tool not found for 404 testing
  if (toolId === 'invalid') {
    return undefined; // Force 404 for testing
  }
  
  return MOCK_TOOLS.find(tool => tool.toolId === toolId || tool.id === toolId);
};

export const getAllTools = (): MockTool[] => {
  return MOCK_TOOLS;
};

export const getToolsByCategory = (category: string): MockTool[] => {
  return MOCK_TOOLS.filter(tool => 
    tool.category.toLowerCase() === category.toLowerCase()
  );
};

export const getFeaturedTools = (): MockTool[] => {
  return MOCK_TOOLS.filter(tool => tool.featured);
};

export const getTrendingTools = (): MockTool[] => {
  return MOCK_TOOLS.filter(tool => tool.trending);
};

export const searchTools = (query: string): MockTool[] => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_TOOLS.filter(tool =>
    tool.name.toLowerCase().includes(lowercaseQuery) ||
    tool.description.toLowerCase().includes(lowercaseQuery) ||
    tool.category.toLowerCase().includes(lowercaseQuery) ||
    (tool.tags ?? []).some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Category list derived from mock data
export const getCategories = (): string[] => {
  const categories = new Set(MOCK_TOOLS.map(tool => tool.category));
  return Array.from(categories).sort();
};