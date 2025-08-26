# Data Binding Handoff Notes

## Mock Dataset: toolsData

This document outlines the data binding structure for the AI Toologist application, specifically for the Explore cards and Tool Detail page mock rendering.

### Primary Dataset Location
**File**: `/data/mockTools.ts`  
**Export**: `toolsData` (JS array)  
**Usage**: Primary data source for Explore and Tool Detail pages

### Dataset Structure

Each tool object in `toolsData` contains exactly these fields:

```typescript
interface ToolData {
  id: string;           // Unique slug identifier (e.g., "chatgpt", "midjourney")
  name: string;         // Display name (e.g., "ChatGPT", "MidJourney")
  description: string;  // 1-2 sentence overview
  category: string;     // Category classification
  pricing: string;      // Pricing model: "Free", "Freemium", "Paid"
  features: string[];   // Array of 3-5 key features
  website: string;      // Production-ready URL
  logo: string;         // Emoji representation
  rating: number;       // 1-5 stars (float, e.g., 4.7)
  reviews: string[];    // Array of user testimonial strings
}
```

### Complete Dataset (10 Tools)

```javascript
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
  {"id":"figma-ai","name":"Figma AI","description":"AI features for design workflows in Figma.","category":"Design","pricing":"Freemium","features":["Auto layout help","Content fill","Design suggestions"],"website":"https://www.figma.com","logo":"🎛️","rating":4.1,"reviews":["Nice for quick drafts."]}
];
```

### Data Categories Covered

**7 Categories Total:**
- **Chatbot**: ChatGPT, Claude (2 tools)
- **Design**: MidJourney, Stable Diffusion, Figma AI (3 tools)  
- **Productivity**: Notion AI (1 tool)
- **Development**: GitHub Copilot (1 tool)
- **Research**: Perplexity AI (1 tool)
- **Video**: Runway ML (1 tool)
- **Writing**: Grammarly (1 tool)

### Pricing Distribution

- **Free**: 1 tool (Stable Diffusion)
- **Freemium**: 6 tools (ChatGPT, Notion AI, Perplexity, Claude, Figma AI, Grammarly)
- **Paid**: 3 tools (MidJourney, GitHub Copilot, Runway ML)

### Navigation Binding

**Key Field**: `id` (slug)  
**Usage**: Primary identifier for URL routing and component navigation  
**Example**: 
- Card click → `/tool-detail` with `tool_id: "chatgpt"`
- Analytics tracking → `toolCardClick("chatgpt", "ChatGPT")`

### Backward Compatibility

The system maintains compatibility with existing components through:
1. **MOCK_TOOLS**: Auto-generated from `toolsData` with additional computed fields
2. **Helper functions**: `getToolById()`, `getAllTools()`, `getToolsByCategory()`
3. **Enhanced fields**: Auto-generated `users`, `tags`, `verified`, `trending`, `featured` status

### Component Integration

**Explore Cards**: 
- Use `toolsData` via `MOCK_TOOLS` export
- Display: `name`, `description`, `category`, `rating`, `pricing`, `logo`
- Navigation: `id` field for routing

**Tool Detail Pages**:
- Use `getToolById(id)` to fetch individual tool data
- Display: All fields including `features[]` and `reviews[]`
- Enhanced with computed metadata for full experience

### Development Notes

- **Data Source**: Single source of truth in `/data/mockTools.ts`
- **Type Safety**: Full TypeScript interfaces for both `toolsData` and `MockTool`
- **Extensibility**: Easy to add new tools or modify existing ones
- **Production Ready**: All website URLs are real and functional
- **Analytics Ready**: Each tool has unique `id` for event tracking

This structure ensures consistent data across all AI Toologist components while maintaining flexibility for future enhancements.