import { 
  Bot, 
  Palette, 
  FileText, 
  Zap, 
  Database, 
  MessageCircle, 
  Code, 
  Grid3X3, 
  BarChart3, 
  Target, 
  Layers, 
  Wand2, 
  Users 
} from 'lucide-react';
import type { Tool, WorkflowTemplate, Workflow } from './types';

export const availableTools: Tool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: Bot,
    category: 'AI Assistant',
    description: 'Advanced conversational AI for text generation, analysis, and coding assistance',
    pricing: 'Freemium',
    rating: 4.8,
    capabilities: ['Text Generation', 'Code Generation', 'Analysis', 'Translation', 'Summarization'],
    inputTypes: ['text', 'file', 'image'],
    outputTypes: ['text', 'code', 'markdown'],
    apiIntegration: true,
    realtime: true,
    complexity: 'Intermediate',
    setupTime: '5 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 25,
      apiDocs: true
    },
    integrations: ['Zapier', 'Slack', 'Discord', 'Notion'],
    tags: ['AI', 'Text', 'Coding', 'Analysis'],
    featured: true,
    trending: true
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    icon: Palette,
    category: 'Image Generation',
    description: 'AI-powered image generation from text prompts with artistic styles',
    pricing: 'Paid',
    rating: 4.9,
    capabilities: ['Image Generation', 'Style Transfer', 'Art Creation', 'Concept Art'],
    inputTypes: ['text', 'image'],
    outputTypes: ['image'],
    apiIntegration: false,
    realtime: false,
    complexity: 'Simple',
    setupTime: '2 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 18,
      apiDocs: false
    },
    integrations: ['Discord'],
    tags: ['AI', 'Image', 'Art', 'Design'],
    featured: true,
    trending: true
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    icon: FileText,
    category: 'Writing Assistant',
    description: 'AI writing and knowledge assistant integrated with Notion workspace',
    pricing: 'Freemium',
    rating: 4.6,
    capabilities: ['Writing', 'Summarization', 'Content Planning', 'Knowledge Management'],
    inputTypes: ['text', 'document'],
    outputTypes: ['text', 'document', 'structured-data'],
    apiIntegration: true,
    realtime: true,
    complexity: 'Simple',
    setupTime: '3 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 15,
      apiDocs: true
    },
    integrations: ['Notion', 'Zapier', 'Slack'],
    tags: ['Writing', 'Productivity', 'Knowledge'],
    featured: false,
    trending: false
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: Zap,
    category: 'Automation',
    description: 'Automate workflows between different applications and services',
    pricing: 'Freemium',
    rating: 4.7,
    capabilities: ['Automation', 'Integration', 'Triggers', 'Actions', 'Data Transformation'],
    inputTypes: ['webhook', 'api', 'trigger', 'data'],
    outputTypes: ['action', 'data', 'notification'],
    apiIntegration: true,
    realtime: true,
    complexity: 'Advanced',
    setupTime: '10 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 45,
      apiDocs: true
    },
    integrations: ['5000+ apps'],
    tags: ['Automation', 'Integration', 'Workflow'],
    featured: true,
    trending: false
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    icon: Database,
    category: 'Data Management',
    description: 'Cloud-based spreadsheet for data storage, analysis, and collaboration',
    pricing: 'Free',
    rating: 4.5,
    capabilities: ['Data Storage', 'Calculations', 'Charts', 'Collaboration', 'Automation'],
    inputTypes: ['data', 'csv', 'api', 'form'],
    outputTypes: ['data', 'charts', 'reports', 'csv'],
    apiIntegration: true,
    realtime: true,
    complexity: 'Intermediate',
    setupTime: '5 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 32,
      apiDocs: true
    },
    integrations: ['Google Workspace', 'Zapier', 'APIs'],
    tags: ['Data', 'Spreadsheet', 'Collaboration'],
    featured: false,
    trending: false
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: MessageCircle,
    category: 'Communication',
    description: 'Team communication and collaboration platform with integrations',
    pricing: 'Freemium',
    rating: 4.4,
    capabilities: ['Messaging', 'Notifications', 'File Sharing', 'Video Calls', 'Workflow Integration'],
    inputTypes: ['text', 'file', 'webhook', 'bot-command'],
    outputTypes: ['message', 'notification', 'file', 'data'],
    apiIntegration: true,
    realtime: true,
    complexity: 'Simple',
    setupTime: '5 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 28,
      apiDocs: true
    },
    integrations: ['3000+ apps'],
    tags: ['Communication', 'Team', 'Collaboration'],
    featured: false,
    trending: false
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: Code,
    category: 'Development',
    description: 'Code repository and collaboration platform with CI/CD capabilities',
    pricing: 'Freemium',
    rating: 4.8,
    capabilities: ['Version Control', 'Code Review', 'CI/CD', 'Issue Tracking', 'Documentation'],
    inputTypes: ['code', 'text', 'webhook', 'api'],
    outputTypes: ['code', 'notification', 'report', 'deployment'],
    apiIntegration: true,
    realtime: true,
    complexity: 'Advanced',
    setupTime: '15 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 55,
      apiDocs: true
    },
    integrations: ['VS Code', 'Slack', 'Jira', 'CI/CD tools'],
    tags: ['Development', 'Git', 'Collaboration'],
    featured: true,
    trending: true
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: Grid3X3,
    category: 'Database',
    description: 'Flexible database platform combining spreadsheet and database features',
    pricing: 'Freemium',
    rating: 4.6,
    capabilities: ['Database', 'Forms', 'Views', 'Automation', 'Reporting'],
    inputTypes: ['data', 'form', 'api', 'csv'],
    outputTypes: ['data', 'report', 'notification', 'webhook'],
    apiIntegration: true,
    realtime: true,
    complexity: 'Intermediate',
    setupTime: '10 minutes',
    documentation: {
      hasGuide: true,
      tutorialCount: 22,
      apiDocs: true
    },
    integrations: ['Zapier', 'Slack', 'Google Workspace'],
    tags: ['Database', 'Organization', 'Collaboration'],
    featured: false,
    trending: true
  }
];

export const enhancedWorkflowTemplates: WorkflowTemplate[] = [
  {
    id: 'ai-content-pipeline',
    name: 'AI Content Creation Pipeline',
    description: 'Generate, review, optimize and publish content across multiple platforms using AI',
    category: 'Content Creation',
    icon: FileText,
    tools: ['chatgpt', 'notion-ai', 'slack', 'airtable'],
    complexity: 'Intermediate',
    estimatedTime: '2-3 hours setup',
    previewNodes: [],
    previewConnections: [],
    isPopular: true,
    uses: 2847,
    rating: 4.8,
    tags: ['AI', 'Content', 'Marketing', 'Automation'],
    author: 'Sarah Mitchell',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face',
    lastUpdated: '2024-01-15',
    screenshots: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop'
    ],
    useCases: [
      'Blog post creation and publishing',
      'Social media content generation',
      'Email newsletter automation',
      'SEO content optimization'
    ],
    requirements: [
      'ChatGPT API access',
      'Notion workspace',
      'Content publishing platforms',
      'Basic content strategy knowledge'
    ],
    outputs: [
      'Published blog posts',
      'Social media content',
      'Email newsletters',
      'Content performance reports'
    ],
    aiSuggested: true,
    difficulty: 3,
    businessValue: 'Reduces content creation time by 70% while maintaining quality',
    roi: '300% ROI within 3 months',
    timeToValue: '1 week'
  },
  {
    id: 'automated-data-insights',
    name: 'Automated Data Analysis & Reporting',
    description: 'Automatically collect, analyze data and generate insights with AI-powered reporting',
    category: 'Data Analytics',
    icon: BarChart3,
    tools: ['google-sheets', 'chatgpt', 'slack', 'zapier'],
    complexity: 'Advanced',
    estimatedTime: '4-5 hours setup',
    previewNodes: [],
    previewConnections: [],
    isPopular: true,
    uses: 1923,
    rating: 4.7,
    tags: ['Analytics', 'AI', 'Reporting', 'Data'],
    author: 'Dr. Alex Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    lastUpdated: '2024-01-12',
    screenshots: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop'
    ],
    useCases: [
      'Sales performance analysis',
      'Customer behavior insights',
      'Marketing campaign optimization',
      'Operational efficiency tracking'
    ],
    requirements: [
      'Google Sheets access',
      'Data sources (CRM, Analytics, etc.)',
      'ChatGPT API for insights',
      'Basic data analysis knowledge'
    ],
    outputs: [
      'Automated reports',
      'Data visualizations',
      'AI-generated insights',
      'Performance alerts'
    ],
    aiSuggested: false,
    difficulty: 4,
    businessValue: 'Saves 15+ hours weekly on manual reporting',
    roi: '250% ROI within 6 months',
    timeToValue: '2 weeks'
  },
  {
    id: 'ai-customer-support',
    name: 'AI-Powered Customer Support',
    description: 'Automate customer support with AI responses, ticket routing, and escalation',
    category: 'Customer Service',
    icon: MessageCircle,
    tools: ['chatgpt', 'slack', 'airtable', 'zapier'],
    complexity: 'Advanced',
    estimatedTime: '3-4 hours setup',
    previewNodes: [],
    previewConnections: [],
    isPopular: true,
    uses: 1456,
    rating: 4.6,
    tags: ['AI', 'Customer Service', 'Automation', 'Support'],
    author: 'Jennifer Park',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    lastUpdated: '2024-01-10',
    screenshots: [
      'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop'
    ],
    useCases: [
      'Automated ticket responses',
      'Customer inquiry routing',
      'Support quality monitoring',
      'Knowledge base updates'
    ],
    requirements: [
      'Customer support platform',
      'ChatGPT API access',
      'Support team workflows',
      'Customer service knowledge'
    ],
    outputs: [
      'Automated responses',
      'Support tickets',
      'Customer satisfaction scores',
      'Support analytics'
    ],
    aiSuggested: true,
    difficulty: 4,
    businessValue: 'Reduces response time by 80% and increases satisfaction',
    roi: '400% ROI within 4 months',
    timeToValue: '10 days'
  },
  {
    id: 'social-media-automation',
    name: 'AI Social Media Management',
    description: 'Create, schedule, and optimize social media content with AI assistance',
    category: 'Social Media',
    icon: Users,
    tools: ['chatgpt', 'midjourney', 'airtable', 'zapier'],
    complexity: 'Beginner',
    estimatedTime: '1-2 hours setup',
    previewNodes: [],
    previewConnections: [],
    isPopular: true,
    uses: 3421,
    rating: 4.9,
    tags: ['Social Media', 'AI', 'Content', 'Marketing'],
    author: 'Mike Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    lastUpdated: '2024-01-14',
    screenshots: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop'
    ],
    useCases: [
      'Content calendar automation',
      'Social media post generation',
      'Hashtag optimization',
      'Engagement monitoring'
    ],
    requirements: [
      'Social media accounts',
      'Content creation tools access',
      'Basic social media strategy',
      'Brand guidelines'
    ],
    outputs: [
      'Scheduled social posts',
      'Generated content',
      'Engagement reports',
      'Growth analytics'
    ],
    aiSuggested: true,
    difficulty: 2,
    businessValue: 'Increases social engagement by 150% with less effort',
    roi: '200% ROI within 2 months',
    timeToValue: '3 days'
  },
  {
    id: 'code-review-automation',
    name: 'AI Code Review & Quality Assurance',
    description: 'Automate code reviews, testing, and quality checks with AI assistance',
    category: 'Development',
    icon: Code,
    tools: ['github', 'chatgpt', 'slack', 'zapier'],
    complexity: 'Advanced',
    estimatedTime: '5-6 hours setup',
    previewNodes: [],
    previewConnections: [],
    isPopular: false,
    uses: 847,
    rating: 4.5,
    tags: ['Development', 'AI', 'Code Review', 'Quality'],
    author: 'David Kim',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    lastUpdated: '2024-01-08',
    screenshots: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=300&fit=crop'
    ],
    useCases: [
      'Automated code reviews',
      'Bug detection and fixes',
      'Code quality scoring',
      'Documentation generation'
    ],
    requirements: [
      'GitHub repository access',
      'Development team workflows',
      'Code quality standards',
      'CI/CD pipeline knowledge'
    ],
    outputs: [
      'Code review reports',
      'Bug fix suggestions',
      'Quality scores',
      'Team notifications'
    ],
    aiSuggested: false,
    difficulty: 5,
    businessValue: 'Reduces code review time by 60% and improves quality',
    roi: '180% ROI within 8 months',
    timeToValue: '3 weeks'
  },
  {
    id: 'lead-qualification',
    name: 'AI Lead Scoring & Qualification',
    description: 'Automatically score, qualify and route leads using AI analysis',
    category: 'Sales',
    icon: Target,
    tools: ['airtable', 'chatgpt', 'slack', 'zapier'],
    complexity: 'Intermediate',
    estimatedTime: '2-3 hours setup',
    previewNodes: [],
    previewConnections: [],
    isPopular: true,
    uses: 1678,
    rating: 4.7,
    tags: ['Sales', 'AI', 'Lead Generation', 'CRM'],
    author: 'Emma Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face',
    lastUpdated: '2024-01-13',
    screenshots: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=300&fit=crop'
    ],
    useCases: [
      'Lead scoring automation',
      'Sales pipeline management',
      'Lead routing optimization',
      'Conversion tracking'
    ],
    requirements: [
      'CRM or lead database',
      'Lead scoring criteria',
      'Sales team workflows',
      'Contact management system'
    ],
    outputs: [
      'Qualified leads',
      'Lead scores',
      'Sales notifications',
      'Pipeline reports'
    ],
    aiSuggested: true,
    difficulty: 3,
    businessValue: 'Increases qualified leads by 45% and sales efficiency',
    roi: '320% ROI within 4 months',
    timeToValue: '1 week'
  }
];

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Content Creation Pipeline',
    description: 'Complete workflow for generating, editing, and publishing content across multiple platforms with AI assistance and automated distribution.',
    category: 'Content',
    complexity: 'Intermediate',
    tools: ['ChatGPT', 'Grammarly', 'Canva', 'Buffer'],
    nodes: [],
    connections: [],
    steps: 5,
    estimatedTime: '30 mins',
    author: 'Sarah Mitchell',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=40&h=40&fit=crop&crop=face',
    likes: 127,
    uses: 1842,
    views: 5247,
    forks: 23,
    tags: ['Content', 'Writing', 'Design', 'Social Media'],
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop',
    isPublic: true,
    isVerified: true,
    isFeatured: true,
    lastUpdated: '2024-01-15',
    difficulty: 'Medium',
    version: '2.1',
    status: 'Published',
    performance: {
      successRate: 94.5,
      avgExecutionTime: 28,
      lastRun: '2024-01-14T10:30:00Z'
    },
    analytics: {
      totalRuns: 3421,
      successfulRuns: 3234,
      failedRuns: 187,
      avgRating: 4.7
    }
  }
];