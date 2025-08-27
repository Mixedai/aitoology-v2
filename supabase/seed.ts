import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { toolsData } from '../src/data/mockTools';

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Create admin client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Categories to seed
const categories = [
  { name: 'Chatbot', slug: 'chatbot', icon: '💬', color: 'purple', description: 'AI conversational assistants' },
  { name: 'Design', slug: 'design', icon: '🎨', color: 'pink', description: 'AI-powered design tools' },
  { name: 'Productivity', slug: 'productivity', icon: '📝', color: 'blue', description: 'AI productivity enhancers' },
  { name: 'Development', slug: 'development', icon: '👨‍💻', color: 'green', description: 'AI coding assistants' },
  { name: 'Research', slug: 'research', icon: '🔎', color: 'yellow', description: 'AI research tools' },
  { name: 'Video', slug: 'video', icon: '🎬', color: 'red', description: 'AI video generation' },
  { name: 'Writing', slug: 'writing', icon: '✍️', color: 'indigo', description: 'AI writing assistants' },
];

// Sample reviews for tools
const sampleReviews = [
  {
    rating: 5,
    title: "Game changer for productivity",
    content: "This tool has completely transformed how I work. The AI features are incredibly intuitive and save me hours every day.",
    pros: ["Intuitive interface", "Fast response times", "Excellent accuracy"],
    cons: ["Can be pricey for individual users"],
    use_case: "Daily content creation and research"
  },
  {
    rating: 4,
    title: "Great tool with room for improvement",
    content: "Overall a solid AI tool that delivers on its promises. The core features work well, though there are occasional glitches.",
    pros: ["Easy to learn", "Good documentation", "Regular updates"],
    cons: ["Occasional bugs", "Limited customization options"],
    use_case: "Team collaboration and project management"
  },
  {
    rating: 5,
    title: "Best in class",
    content: "I've tried multiple alternatives and this is by far the best. The quality of output is consistently high.",
    pros: ["Superior quality", "Wide range of features", "Excellent support"],
    cons: ["Learning curve for advanced features"],
    use_case: "Professional creative work"
  }
];

async function seedCategories() {
  console.log('Seeding categories...');
  
  for (const category of categories) {
    const { error } = await supabase
      .from('categories')
      .upsert(category, { onConflict: 'slug' });
    
    if (error) {
      console.error(`Error inserting category ${category.name}:`, error);
    } else {
      console.log(`✓ Inserted category: ${category.name}`);
    }
  }
}

async function seedTools() {
  console.log('Seeding tools...');
  
  for (const tool of toolsData) {
    // Skip the invalid test tool
    if (tool.id === 'invalid') continue;
    
    // Determine pricing details based on pricing tier
    let monthlyPrice = null;
    let annualPrice = null;
    let hasFreeTier = false;
    
    switch (tool.pricing) {
      case 'Free':
        hasFreeTier = true;
        break;
      case 'Freemium':
        hasFreeTier = true;
        monthlyPrice = Math.floor(Math.random() * 20) + 10; // $10-30/month
        annualPrice = monthlyPrice * 10; // Annual discount
        break;
      case 'Paid':
        monthlyPrice = Math.floor(Math.random() * 50) + 20; // $20-70/month
        annualPrice = monthlyPrice * 10;
        break;
    }
    
    const toolData = {
      name: tool.name,
      slug: tool.id,
      description: tool.description,
      logo_emoji: tool.logo,
      category: tool.category,
      pricing: tool.pricing,
      website_url: tool.website,
      features: tool.features,
      tags: generateTags(tool.category, tool.features),
      rating: tool.rating,
      review_count: 0, // Will be updated when reviews are added
      monthly_price: monthlyPrice,
      annual_price: annualPrice,
      has_free_tier: hasFreeTier,
      api_available: ['github-copilot', 'chatgpt', 'claude', 'stable-diffusion'].includes(tool.id),
      integrations: generateIntegrations(tool.id)
    };
    
    const { data, error } = await supabase
      .from('tools')
      .upsert(toolData, { onConflict: 'slug' })
      .select()
      .single();
    
    if (error) {
      console.error(`Error inserting tool ${tool.name}:`, error);
    } else {
      console.log(`✓ Inserted tool: ${tool.name}`);
      
      // Add some sample reviews for popular tools
      if (tool.rating >= 4.5 && data) {
        await seedReviewsForTool(data.id, tool.name);
      }
    }
  }
}

async function seedReviewsForTool(toolId: string, toolName: string) {
  console.log(`  Adding reviews for ${toolName}...`);
  
  // Create some test users first (in production, these would be real users)
  const testUsers = [
    { email: 'john@example.com', name: 'John Developer' },
    { email: 'sarah@example.com', name: 'Sarah Designer' },
    { email: 'mike@example.com', name: 'Mike Manager' }
  ];
  
  for (let i = 0; i < Math.min(3, sampleReviews.length); i++) {
    const review = sampleReviews[i];
    const user = testUsers[i];
    
    // Get or create user (in production, users would already exist)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      email_confirm: true,
      user_metadata: { full_name: user.name }
    });
    
    if (authError && !authError.message.includes('already been registered')) {
      console.error(`Error creating user ${user.email}:`, authError);
      continue;
    }
    
    // Get user ID (either from new creation or existing)
    let userId = authData?.user?.id;
    if (!userId) {
      const { data: users } = await supabase.auth.admin.listUsers();
      const existingUser = users?.users?.find(u => u.email === user.email);
      userId = existingUser?.id;
    }
    
    if (userId) {
      const reviewData = {
        tool_id: toolId,
        user_id: userId,
        ...review,
        verified_purchase: Math.random() > 0.3 // 70% chance of verified purchase
      };
      
      const { error: reviewError } = await supabase
        .from('reviews')
        .upsert(reviewData, { onConflict: 'tool_id,user_id' });
      
      if (reviewError) {
        console.error(`Error inserting review:`, reviewError);
      } else {
        console.log(`    ✓ Added review from ${user.name}`);
      }
    }
  }
}

function generateTags(category: string, features: string[]): string[] {
  const categoryTags: { [key: string]: string[] } = {
    'Chatbot': ['ai-assistant', 'conversational-ai', 'nlp', 'chat'],
    'Design': ['creative-ai', 'image-generation', 'design-tools', 'visual-ai'],
    'Productivity': ['workflow', 'automation', 'efficiency', 'organization'],
    'Development': ['coding', 'programming', 'ide', 'devtools'],
    'Research': ['search', 'analysis', 'data', 'knowledge'],
    'Video': ['video-generation', 'motion', 'animation', 'multimedia'],
    'Writing': ['content-creation', 'grammar', 'copywriting', 'text-generation']
  };
  
  const baseTags = categoryTags[category] || ['ai', 'tool'];
  return baseTags;
}

function generateIntegrations(toolId: string): string[] {
  const integrations: { [key: string]: string[] } = {
    'chatgpt': ['Slack', 'Discord', 'API', 'Zapier', 'Chrome Extension'],
    'github-copilot': ['VS Code', 'Visual Studio', 'Neovim', 'JetBrains IDEs'],
    'notion-ai': ['Slack', 'Google Drive', 'Trello', 'Asana', 'Jira'],
    'grammarly': ['Chrome', 'Word', 'Gmail', 'Google Docs', 'Outlook'],
    'claude': ['API', 'Slack', 'Web App'],
    'figma-ai': ['Slack', 'Jira', 'Notion', 'Adobe Creative Cloud']
  };
  
  return integrations[toolId] || [];
}

async function seedDatabase() {
  try {
    console.log('Starting database seed...\n');
    
    await seedCategories();
    console.log('\n');
    
    await seedTools();
    console.log('\n');
    
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed
seedDatabase();