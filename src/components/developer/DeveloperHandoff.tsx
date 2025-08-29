import { useEffect,useState, } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { 
  Code, 
  Palette, 
  Layout, 
  Copy, 
  Info,
  Folder,
  Terminal,
  Keyboard,
  Database,
  CheckSquare,
  Shield,
  Key,
  Cloud,
  Server,
  Zap,
  Upload,
  Check,
  CheckCircle,
  Settings,
  Layers,
  Smartphone,
  Monitor,
  FileText
} from 'lucide-react';

const designTokens = {
  colors: {
    primary: '#FF6B35',
    secondary: '#4A5C7A',
    neutralLight: '#E5E1DB',
    dark: '#1A1A1A',
    success: '#10B981',
    warning: '#EAB308',
    destructive: '#EF4444'
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    monoFamily: 'JetBrains Mono, monospace',
    baseFontSize: '14px',
    lineHeight: '1.5'
  },
  spacing: {
    base: '8px',
    scale: '8-point grid system',
    containerPadding: 'p-6 (24px)',
    sectionGap: 'gap-6 (24px)'
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1280px'
  }
};

const supabaseConfig = `// Environment Variables (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

// Supabase Client Setup
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for privileged operations)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)`;

const tailwindMappings = {
  layout: {
    container: 'max-w-7xl mx-auto px-6',
    section: 'mb-8 space-y-6',
    card: 'bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
  },
  spacing: {
    primary: 'gap-6 p-6 space-y-6', // 24px - primary spacing
    secondary: 'gap-4 p-4 space-y-4', // 16px - secondary spacing
    micro: 'gap-2 p-2 space-y-2', // 8px - micro spacing
    section: 'mb-8', // 32px - section breaks
  },
  typography: {
    heading1: 'text-2xl font-medium leading-tight',
    heading2: 'text-xl font-medium leading-tight',  
    heading3: 'text-lg font-medium leading-tight',
    heading4: 'text-base font-medium leading-tight',
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-muted-foreground'
  },
  states: {
    hover: 'hover:bg-accent hover:text-accent-foreground transition-colors',
    focus: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    active: 'active:bg-accent/80',
    disabled: 'disabled:opacity-50 disabled:pointer-events-none'
  }
};

const keyboardShortcuts = [
  { key: 'Cmd/Ctrl + K', action: 'Open global command palette', scope: 'Global' },
  { key: 'Escape', action: 'Close modals and overlays', scope: 'Global' },
  { key: 'Tab / Shift + Tab', action: 'Navigate between focusable elements', scope: 'Global' },
  { key: 'Enter / Space', action: 'Activate buttons and links', scope: 'Interactive' },
  { key: 'Arrow Keys', action: 'Navigate within components (menus, tabs)', scope: 'Components' },
  { key: '/', action: 'Focus search input (when available)', scope: 'Search' },
  { key: 'Cmd/Ctrl + Enter', action: 'Submit forms', scope: 'Forms' },
  { key: 'Alt + Arrow', action: 'Navigate between pages', scope: 'Navigation' }
];

const supabaseIntegration = {
  auth: {
    signIn: 'supabase.auth.signInWithPassword({ email, password })',
    signUp: 'supabase.auth.signUp({ email, password })',
    signOut: 'supabase.auth.signOut()',
    oauth: 'supabase.auth.signInWithOAuth({ provider: "google" })',
    resetPassword: 'supabase.auth.resetPasswordForEmail(email)',
    magicLink: 'supabase.auth.signInWithOtp({ email })'
  },
  database: {
    select: 'supabase.from("tools").select("*").eq("status", "published")',
    insert: 'supabase.from("tools").insert([{ name, description, category }])',
    update: 'supabase.from("tools").update({ status: "approved" }).eq("id", toolId)',
    delete: 'supabase.from("tools").delete().eq("id", toolId)',
    rls: 'CREATE POLICY "Users can only see their own data" ON profiles FOR SELECT USING (auth.uid() = id)'
  },
  realtime: {
    subscribe: 'supabase.channel("public:tools").on("postgres_changes", { event: "*", schema: "public", table: "tools" }, handleChanges).subscribe()',
    broadcast: 'supabase.channel("room1").on("broadcast", { event: "cursor-pos" }, handleCursor).subscribe()'
  },
  storage: {
    upload: 'supabase.storage.from("avatars").upload(`public/${file.name}`, file)',
    download: 'supabase.storage.from("avatars").download("path/to/file.jpg")',
    getPublicUrl: 'supabase.storage.from("avatars").getPublicUrl("path/to/file.jpg")'
  }
};

const implementationChecklist = [
  {
    category: 'Project Setup',
    items: [
      { id: 'next-app', label: 'Initialize Next.js 14 app with TypeScript', completed: false },
      { id: 'tailwind-setup', label: 'Configure Tailwind CSS v4 with design tokens', completed: false },
      { id: 'supabase-setup', label: 'Setup Supabase project and environment variables', completed: false },
      { id: 'shadcn-install', label: 'Install and configure shadcn/ui components', completed: false },
      { id: 'eslint-prettier', label: 'Setup ESLint and Prettier with TypeScript rules', completed: false }
    ]
  },
  {
    category: 'Supabase Integration',
    items: [
      { id: 'database-schema', label: 'Create database tables and relationships', completed: false },
      { id: 'rls-policies', label: 'Configure Row Level Security policies', completed: false },
      { id: 'auth-setup', label: 'Setup authentication with providers', completed: false },
      { id: 'storage-buckets', label: 'Create and configure storage buckets', completed: false },
      { id: 'api-routes', label: 'Implement API routes and server actions', completed: false }
    ]
  },
  {
    category: 'Core Components',
    items: [
      { id: 'global-nav', label: 'Implement GlobalNavbar with responsive design', completed: false },
      { id: 'command-palette', label: 'Build CommandPalette with keyboard shortcuts', completed: false },
      { id: 'tool-card', label: 'Create ToolCard component with all variants', completed: false },
      { id: 'filter-system', label: 'Implement faceted filter system for tools', completed: false },
      { id: 'comparison-tray', label: 'Build tool comparison functionality', completed: false }
    ]
  },
  {
    category: 'Pages Implementation',
    items: [
      { id: 'home-page', label: 'Build home page with hero and featured sections', completed: false },
      { id: 'browse-page', label: 'Implement browse tools page with filters', completed: false },
      { id: 'tool-detail', label: 'Create tool detail page with tabbed interface', completed: false },
      { id: 'compare-page', label: 'Build compare tools page', completed: false },
      { id: 'tool-wallet', label: 'Implement tool wallet dashboard', completed: false }
    ]
  }
];

const screenDocumentation = {
  'home': {
    title: 'Home Page',
    tailwindClasses: {
      hero: 'bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24',
      heroContainer: 'max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
      featuredSection: 'mb-16 space-y-8',
      toolGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      categoryGrid: 'grid grid-cols-2 md:grid-cols-4 gap-6'
    },
    supabaseQueries: {
      featuredTools: 'SELECT * FROM tools WHERE featured = true ORDER BY rating DESC LIMIT 6',
      categories: 'SELECT * FROM categories WHERE active = true ORDER BY tool_count DESC',
      latestNews: 'SELECT * FROM news WHERE published = true ORDER BY published_at DESC LIMIT 3'
    },
    keyboardShortcuts: [
      { key: '⌘K', action: 'Open command palette' },
      { key: '/', action: 'Focus search input' },
      { key: 'Tab', action: 'Navigate between CTAs and featured tools' }
    ],
    interactionStates: ['hover:shadow-lg on tool cards', 'focus-visible:ring-2 on all buttons', 'active:scale-98 on CTAs']
  },
  'explore': {
    title: 'Explore (Supabase)',
    description: 'Complete AI tools discovery interface with advanced filtering, search, and responsive design',
    dataModel: {
      tables: {
        tools: 'id, name, short_desc, pricing, platforms[], categories[], logo_url, rating, created_at',
        categories: 'id, name, slug',
        votes: 'tool_id, user_id, value',
        favorites: 'tool_id, user_id'
      }
    },
    tailwindClasses: {
      searchBar: 'h-12 rounded-xl border bg-card/60 backdrop-blur',
      categoryChips: 'rounded-full px-3 py-1 text-sm data-[active=true]:bg-primary/10',
      toolCards: 'rounded-xl shadow-sm hover:shadow-md transition-shadow',
      container: 'max-w-7xl mx-auto px-6 py-8',
      categoriesGrid: 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6',
      toolsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      filterChips: 'flex gap-2 pb-2 lg:pb-0 overflow-x-auto',
      stickyHeader: 'sticky top-16 z-40 bg-background/95 backdrop-blur border-b',
      mobileFilter: 'lg:hidden fixed bottom-6 right-6 z-50 rounded-full shadow-lg h-14 w-14'
    },
    supabaseQueries: {
      listToolsWithFilters: `// GET /api/tools?search=&category=&pricing=&platform=&model=&sort=
supabase.from('tools')
  .select('*')
  .ilike('name', \`%\${search}%\`)
  .contains('categories', [category_id]) // when category provided
  .eq('pricing', pricing) // optional
  .order('created_at', { ascending: false }) // sort variants: rating DESC, name ASC, etc.
  .range(offset, offset + limit - 1)`,
      listCategories: `// GET /api/categories
supabase.from('categories')
  .select('*')
  .order('name')`,
      toolCount: `// Get total count for pagination
supabase.from('tools')
  .select('*', { count: 'exact', head: true })
  .ilike('name', \`%\${search}%\`)
  // ... apply same filters`,
      userVotes: `// Get user votes/favorites for tools
supabase.from('votes')
  .select('tool_id, value')
  .eq('user_id', userId)
  .in('tool_id', toolIds)`,
      addVote: `// Optimistic UI for votes
supabase.from('votes')
  .upsert({ tool_id: toolId, user_id: userId, value: 1 })`,
      addFavorite: `// Optimistic UI for favorites  
supabase.from('favorites')
  .upsert({ tool_id: toolId, user_id: userId })`
    },
    pagination: {
      implementation: `// Use range() with page size 24
const pageSize = 24;
const offset = (page - 1) * pageSize;

const { data, error, count } = await supabase
  .from('tools')
  .select('*', { count: 'exact' })
  .range(offset, offset + pageSize - 1);

const totalPages = Math.ceil(count / pageSize);`,
      totalCount: 'Include total count for "X results" display and pagination controls'
    },
    sqlIndexes: [
      'CREATE INDEX idx_tools_name_trgm ON tools USING gin (name gin_trgm_ops);',
      'CREATE INDEX idx_tools_categories ON tools USING gin (categories);',
      'CREATE INDEX idx_tools_created_at ON tools (created_at DESC);',
      'CREATE INDEX idx_tools_rating ON tools (rating DESC);',
      'CREATE INDEX idx_tools_pricing ON tools (pricing);'
    ],
    stateManagement: {
      urlSync: `// Reflect filters in URL query params
const [searchParams, setSearchParams] = useSearchParams();

// Update URL when filters change
useEffect(() => {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category !== 'All Categories') params.set('category', category);
  if (pricing !== 'All Pricing') params.set('pricing', pricing);
  setSearchParams(params);
}, [search, category, pricing]);

// Restore state on back/forward
useEffect(() => {
  setSearch(searchParams.get('search') || '');
  setCategory(searchParams.get('category') || 'All Categories');
  setPricing(searchParams.get('pricing') || 'All Pricing');
}, [searchParams]);`,
      optimisticUI: `// Optimistic UI for votes/favorites
const handleVote = async (toolId: string, value: number) => {
  // Update UI immediately
  setTools(prev => prev.map(tool => 
    tool.id === toolId 
      ? { ...tool, user_vote: value, vote_count: tool.vote_count + (value - (tool.user_vote || 0)) }
      : tool
  ));
  
  // Send to database
  const { error } = await supabase.from('votes').upsert({ tool_id: toolId, user_id: userId, value });
  
  // Reconcile on error
  if (error) {
    setTools(prev => prev.map(tool => 
      tool.id === toolId 
        ? { ...tool, user_vote: originalVote, vote_count: originalCount }
        : tool
    ));
  }
};`,
      realtimeChannels: `// Subscribe to realtime updates
useEffect(() => {
  const channel = supabase
    .channel('public:votes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'votes' },
      (payload) => {
        // Update vote counts in real-time
        handleRealtimeVote(payload);
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);`
    },
    keyboardShortcuts: [
      { key: '/', action: 'Focus search input' },
      { key: '⌘K', action: 'Focus search input (alternative)' },
      { key: 'Esc', action: 'Clear all filters' },
      { key: 'Tab', action: 'Navigate between category chips and filters' },
      { key: 'Enter', action: 'Select category chip or apply filter' },
      { key: 'Space', action: 'Toggle category chip selection' }
    ],
    interactionStates: [
      'hover:shadow-md transition-shadow on tool cards',
      'data-[active=true]:bg-primary/10 border-primary/30 on active category chips',
      'focus-visible:ring-2 focus-visible:ring-ring on all interactive elements',
      'animate-pulse on loading skeleton states',
      'bg-destructive text-destructive-foreground on mobile filter count badge'
    ],
    mobileOptimizations: [
      'Sticky bottom filter button with active count badge',
      'Bottom sheet filter panel (Sheet component)',
      'Horizontal scrolling category chips',
      'Responsive grid: cols-2 → md:cols-4 → lg:cols-6 for categories',
      'Responsive grid: cols-1 → md:cols-2 → lg:cols-3 for tools'
    ]
  },
  'browse': {
    title: 'Browse Tools',
    tailwindClasses: {
      container: 'max-w-7xl mx-auto px-6 py-8',
      filterSidebar: 'w-80 shrink-0 space-y-6 border-r pr-8',
      toolsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      searchBar: 'relative mb-6',
      pagination: 'flex items-center justify-center space-x-2 mt-8'
    },
    supabaseQueries: {
      toolsWithFilters: 'SELECT * FROM tools WHERE category = $1 AND pricing_type = $2 ORDER BY rating DESC',
      categoriesWithCounts: 'SELECT c.*, COUNT(t.id) as tool_count FROM categories c LEFT JOIN tools t ON c.id = t.category_id GROUP BY c.id',
      toolSearch: 'SELECT * FROM tools WHERE to_tsvector(name || \' \' || description) @@ plainto_tsquery($1)'
    },
    keyboardShortcuts: [
      { key: '/', action: 'Focus search input' },
      { key: 'Esc', action: 'Clear all filters' },
      { key: 'Space', action: 'Select tool for comparison' },
      { key: 'Tab', action: 'Navigate through filter options' }
    ],
    interactionStates: ['hover:border-primary on tool cards', 'checked:bg-primary on filter checkboxes', 'loading:animate-pulse on tool cards']
  },
  'tool-detail': {
    title: 'Tool Detail',
    tailwindClasses: {
      container: 'max-w-7xl mx-auto px-6 py-8',
      header: 'mb-8 space-y-6',
      tabsContainer: 'border-b mb-8',
      sidebarActions: 'w-80 shrink-0 space-y-6 pl-8 border-l',
      relatedTools: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
    },
    supabaseQueries: {
      toolDetails: 'SELECT *, profiles.name as author_name FROM tools LEFT JOIN profiles ON tools.author_id = profiles.id WHERE tools.id = $1',
      toolReviews: 'SELECT r.*, profiles.name, profiles.avatar_url FROM reviews r JOIN profiles ON r.user_id = profiles.id WHERE r.tool_id = $1 ORDER BY r.created_at DESC',
      relatedTools: 'SELECT * FROM tools WHERE category_id = $1 AND id != $2 ORDER BY rating DESC LIMIT 6',
      userSubscription: 'SELECT * FROM subscriptions WHERE user_id = auth.uid() AND tool_id = $1'
    },
    realtimeChannels: ['public:votes', 'public:favorites', 'public:reviews'],
    keyboardShortcuts: [
      { key: 'Arrow Left/Right', action: 'Navigate between tabs' },
      { key: 'Enter', action: 'Add to wallet/Subscribe' },
      { key: 'C', action: 'Add to comparison' },
      { key: 'F', action: 'Toggle favorite' }
    ],
    interactionStates: ['active:bg-accent on tabs', 'hover:bg-accent/50 on action buttons', 'focus-visible:ring-2 on all interactive elements']
  },
  'tool-wallet': {
    title: 'Tool Wallet Dashboard',
    tailwindClasses: {
      container: 'max-w-7xl mx-auto px-6 py-8',
      dashboardGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8',
      subscriptionsList: 'space-y-4',
      analyticsSection: 'grid grid-cols-1 lg:grid-cols-2 gap-8'
    },
    supabaseQueries: {
      userSubscriptions: 'SELECT s.*, t.name, t.logo_url FROM subscriptions s JOIN tools t ON s.tool_id = t.id WHERE s.user_id = auth.uid() ORDER BY s.created_at DESC',
      spendingAnalytics: 'SELECT DATE_TRUNC(\'month\', created_at) as month, SUM(amount) as total FROM subscriptions WHERE user_id = auth.uid() GROUP BY month ORDER BY month DESC',
      upcomingRenewals: 'SELECT s.*, t.name FROM subscriptions s JOIN tools t ON s.tool_id = t.id WHERE s.user_id = auth.uid() AND s.next_renewal <= (NOW() + INTERVAL \'7 days\') ORDER BY s.next_renewal ASC'
    },
    keyboardShortcuts: [
      { key: 'Tab', action: 'Navigate between subscriptions' },
      { key: 'Enter', action: 'Edit subscription details' },
      { key: 'Space', action: 'Toggle subscription status' },
      { key: 'Delete', action: 'Cancel subscription' }
    ],
    interactionStates: ['hover:shadow-md on subscription cards', 'active:bg-destructive/10 on cancel buttons', 'focus-visible:ring-2 on edit buttons']
  },
  'auth': {
    title: 'Authentication & Onboarding',
    tailwindClasses: {
      container: 'min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/50',
      formContainer: 'w-full max-w-md space-y-6 p-8 bg-card border rounded-lg shadow-lg',
      socialButtons: 'grid grid-cols-2 gap-4',
      onboardingSteps: 'max-w-2xl mx-auto space-y-8'
    },
    supabaseAuth: {
      signIn: 'supabase.auth.signInWithPassword({ email, password })',
      signUp: 'supabase.auth.signUp({ email, password, options: { data: { name } } })',
      oauth: 'supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${origin}/auth/callback` } })',
      magicLink: 'supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${origin}/auth/callback` } })'
    },
    keyboardShortcuts: [
      { key: 'Tab', action: 'Navigate form fields' },
      { key: '⌘Enter', action: 'Submit form' },
      { key: 'Esc', action: 'Close error messages' },
      { key: 'Space', action: 'Toggle password visibility' }
    ],
    interactionStates: ['focus:ring-2 focus:ring-primary on inputs', 'hover:bg-primary/90 on submit buttons', 'disabled:opacity-50 on loading states']
  }
};

const engineerChecklist = [
  {
    category: 'Project Setup & Configuration',
    items: [
      { id: 'nextjs-setup', label: 'Initialize Next.js 14 with App Router and TypeScript', completed: false, code: 'npx create-next-app@latest ai-toologist --typescript --tailwind --app' },
      { id: 'supabase-init', label: 'Setup Supabase project and install dependencies', completed: false, code: 'npm install @supabase/supabase-js @supabase/auth-helpers-nextjs' },
      { id: 'env-config', label: 'Configure environment variables (.env.local)', completed: false, code: 'NEXT_PUBLIC_SUPABASE_URL=\nNEXT_PUBLIC_SUPABASE_ANON_KEY=' },
      { id: 'tailwind-v4', label: 'Upgrade to Tailwind CSS v4 with design tokens', completed: false, code: 'npm install tailwindcss@next @tailwindcss/cli@next' },
      { id: 'shadcn-setup', label: 'Install shadcn/ui components', completed: false, code: 'npx shadcn-ui@latest init' }
    ]
  },
  {
    category: 'Database Schema Implementation',
    items: [
      { id: 'auth-tables', label: 'Create auth.users and profiles table', completed: false, code: 'CREATE TABLE profiles (id UUID REFERENCES auth.users(id), name TEXT, avatar_url TEXT, created_at TIMESTAMP DEFAULT NOW())' },
      { id: 'tools-table', label: 'Create tools table with categories relationship', completed: false, code: 'CREATE TABLE tools (id UUID DEFAULT gen_random_uuid(), name TEXT NOT NULL, category_id UUID REFERENCES categories(id))' },
      { id: 'subscriptions-table', label: 'Create subscriptions table for Tool Wallet', completed: false, code: 'CREATE TABLE subscriptions (id UUID DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id), tool_id UUID REFERENCES tools(id))' },
      { id: 'rls-policies', label: 'Implement Row Level Security policies', completed: false, code: 'ALTER TABLE profiles ENABLE ROW LEVEL SECURITY; CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id)' },
      { id: 'storage-buckets', label: 'Create storage buckets (tool-logos, screenshots, news)', completed: false, code: 'INSERT INTO storage.buckets (id, name, public) VALUES (\'tool-logos\', \'tool-logos\', true)' }
    ]
  },
  {
    category: 'Core Components Development',
    items: [
      { id: 'global-nav', label: 'Build responsive GlobalNavbar component', completed: false, code: '<nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">' },
      { id: 'command-palette', label: 'Implement ⌘K Command Palette with search', completed: false, code: 'useEffect(() => { const down = (e) => { if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(true) } } })' },
      { id: 'tool-card', label: 'Create ToolCard component with comparison state', completed: false, code: '<Card className="group hover:shadow-lg transition-shadow cursor-pointer">' },
      { id: 'filter-system', label: 'Build faceted filter system for Browse Tools', completed: false, code: 'const [filters, setFilters] = useState({ category: [], pricing: [], features: [] })' },
      { id: 'auth-forms', label: 'Implement authentication forms with Supabase', completed: false, code: 'const { data, error } = await supabase.auth.signInWithPassword({ email, password })' }
    ]
  },
  {
    category: 'Page Implementation',
    items: [
      { id: 'home-hero', label: 'Build Home page hero section with CTAs', completed: false, code: '<section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16 md:py-24">' },
      { id: 'browse-layout', label: 'Implement Browse Tools with sidebar filters', completed: false, code: '<div className="flex gap-8"><aside className="w-80 shrink-0"><main className="flex-1">' },
      { id: 'tool-detail-tabs', label: 'Create Tool Detail with tabbed interface', completed: false, code: '<Tabs defaultValue="overview" className="w-full"><TabsList><TabsContent>' },
      { id: 'comparison-view', label: 'Build side-by-side comparison view', completed: false, code: '<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">' },
      { id: 'wallet-dashboard', label: 'Implement Tool Wallet dashboard with analytics', completed: false, code: '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">' }
    ]
  },
  {
    category: 'Advanced Features',
    items: [
      { id: 'realtime-setup', label: 'Configure Realtime subscriptions for live updates', completed: false, code: 'supabase.channel("public:tools").on("postgres_changes", { event: "*", schema: "public", table: "tools" }, handleRealtime).subscribe()' },
      { id: 'file-uploads', label: 'Implement file uploads for tool logos/screenshots', completed: false, code: 'const { data, error } = await supabase.storage.from("tool-logos").upload(`${toolId}/logo.png`, file)' },
      { id: 'search-implementation', label: 'Add full-text search with PostgreSQL', completed: false, code: 'SELECT * FROM tools WHERE to_tsvector(name || \' \' || description) @@ plainto_tsquery($1)' },
      { id: 'admin-moderation', label: 'Build admin panel with moderation queue', completed: false, code: 'UPDATE tools SET status = $1, moderated_at = NOW(), moderator_id = auth.uid() WHERE id = $2' },
      { id: 'email-notifications', label: 'Setup email notifications with Supabase Edge Functions', completed: false, code: 'deno deploy --project=ai-toologist-emails functions/send-notification.ts' }
    ]
  },
  {
    category: 'Testing & Deployment',
    items: [
      { id: 'unit-tests', label: 'Write unit tests for components with Jest/React Testing Library', completed: false, code: 'npm install --save-dev @testing-library/react @testing-library/jest-dom jest-environment-jsdom' },
      { id: 'e2e-tests', label: 'Setup E2E tests with Playwright', completed: false, code: 'npm install --save-dev @playwright/test && npx playwright install' },
      { id: 'accessibility-audit', label: 'Run accessibility audit with axe-core', completed: false, code: 'npm install --save-dev @axe-core/react && import { axe, toHaveNoViolations } from "jest-axe"' },
      { id: 'performance-optimization', label: 'Optimize images and implement lazy loading', completed: false, code: 'import Image from "next/image" // Use Next.js Image component for optimization' },
      { id: 'vercel-deployment', label: 'Deploy to Vercel with environment variables', completed: false, code: 'vercel env add NEXT_PUBLIC_SUPABASE_URL && vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY' }
    ]
  }
];

export function DeveloperHandoff() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState('');
  const [checklistItems, setChecklistItems] = useState(implementationChecklist);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(label);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const toggleChecklistItem = (categoryIndex: number, itemIndex: number) => {
    setChecklistItems(prev => {
      const newItems = [...prev];
      newItems[categoryIndex].items[itemIndex].completed = !newItems[categoryIndex].items[itemIndex].completed;
      return newItems;
    });
  };

  const getCompletionStats = () => {
    const totalItems = checklistItems.reduce((sum, category) => sum + category.items.length, 0);
    const completedItems = checklistItems.reduce((sum, category) => 
      sum + category.items.filter(item => item.completed).length, 0
    );
    return { total: totalItems, completed: completedItems, percentage: Math.round((completedItems / totalItems) * 100) };
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1>Developer Handoff</h1>
          <p className="text-muted-foreground mb-6">
            Complete implementation guide with Supabase backend integration, design tokens, components, and development guidelines
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-xl font-medium text-primary">16</div>
              <div className="text-xs text-muted-foreground">Application Screens</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-medium text-primary">50+</div>
              <div className="text-xs text-muted-foreground">UI Components</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-medium text-primary">8</div>
              <div className="text-xs text-muted-foreground">Database Tables</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-medium text-primary">100%</div>
              <div className="text-xs text-muted-foreground">Production Ready</div>
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <TabsTrigger value="overview" className="gap-2">
              <Info className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="supabase" className="gap-2">
              <Database className="w-4 h-4" />
              Supabase
            </TabsTrigger>
            <TabsTrigger value="design" className="gap-2">
              <Palette className="w-4 h-4" />
              Design
            </TabsTrigger>
            <TabsTrigger value="components" className="gap-2">
              <Layers className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="implementation" className="gap-2">
              <Code className="w-4 h-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="checklist" className="gap-2">
              <CheckSquare className="w-4 h-4" />
              Checklist
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      AI Toologist is a comprehensive SaaS application for discovering, comparing, and managing AI tools with a complete design system built on React, TypeScript, and Tailwind CSS.
                    </p>
                    
                    <div className="space-y-2">
                      <h4>Key Features</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• AI tool directory with advanced filtering</li>
                        <li>• Subscription tracking and analytics</li>
                        <li>• Admin panel with moderation workflow</li>
                        <li>• Real-time updates and notifications</li>
                        <li>• Full authentication and user management</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4>Technical Stack</h4>
                      <ul className="text-muted-foreground space-y-1">
                        <li>• Next.js 14 with App Router</li>
                        <li>• TypeScript for type safety</li>
                        <li>• Tailwind CSS v4 with design tokens</li>
                        <li>• Supabase for backend services</li>
                        <li>• shadcn/ui component library</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Folder className="w-5 h-5" />
                    Application Screens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h5 className="mb-1">Core Pages</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Home Page</li>
                        <li>• Browse Tools</li>
                        <li>• Tool Detail</li>
                        <li>• Compare Tools</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="mb-1">User Features</h5>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Authentication</li>
                        <li>• Tool Wallet</li>
                        <li>• Submit Tool</li>
                        <li>• User Profile</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Supabase Tab */}
          <TabsContent value="supabase" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="w-5 h-5" />
                  Supabase Setup & Environment
                </CardTitle>
                <CardDescription>
                  Required environment variables and client configuration for Supabase integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Info className="w-4 h-4" />
                  <AlertDescription>
                    Use @supabase/supabase-js with Next.js App Router. Server actions handle privileged operations.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-muted rounded-lg p-4 overflow-x-auto">
                  <pre>
                    <code>{supabaseConfig}</code>
                  </pre>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(supabaseConfig, 'supabase-config')}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copiedCode === 'supabase-config' ? 'Copied!' : 'Copy Configuration'}
                </Button>
              </CardContent>
            </Card>

            {/* Database Schema Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Database Schema Overview
                </CardTitle>
                <CardDescription>
                  Complete database schema with tables, relationships, and enums
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2">Core Tables</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• profiles (user data)</li>
                      <li>• tools (AI tools directory)</li>
                      <li>• categories (tool categories)</li>
                      <li>• subscriptions (user subscriptions)</li>
                      <li>• news (articles and updates)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2">Storage Buckets</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• tool-logos (public read)</li>
                      <li>• screenshots (public read)</li>
                      <li>• news (public read)</li>
                      <li>• user-avatars (public read)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Brand Colors
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(designTokens.colors).map(([name, value]) => (
                    <div key={name} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg border"
                          style={{ backgroundColor: value }}
                        />
                        <div>
                          <p className="capitalize">{name.replace(/([A-Z])/g, ' $1')}</p>
                          <p className="text-muted-foreground font-mono">{value}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(value, `color-${name}`)}
                      >
                        {copiedCode === `color-${name}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Typography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-muted-foreground mb-1">Font Family</p>
                      <p>{designTokens.typography.fontFamily}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Monospace</p>
                      <p className="font-mono">{designTokens.typography.monoFamily}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <p>Body text example</p>
                    <p className="text-muted-foreground">Caption text</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Spacing System */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  8-Point Grid System
                </CardTitle>
                <CardDescription>
                  Consistent spacing using 8px base unit for layouts and components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 6, 8, 12, 16].map((multiplier) => (
                    <div key={multiplier} className="text-center">
                      <div
                        className="bg-primary rounded mx-auto mb-2"
                        style={{ width: `${multiplier * 8}px`, height: '32px' }}
                      />
                      <p className="font-medium">{multiplier * 8}px</p>
                      <p className="text-muted-foreground">space-{multiplier}</p>
                    </div>
                  ))}
                </div>
                
                <Alert>
                  <Info className="w-4 h-4" />
                  <AlertDescription>
                    Use Tailwind spacing classes: p-2, m-4, gap-6, etc. Each unit equals 4px, so gap-6 = 24px.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Component Library Overview
                </CardTitle>
                <CardDescription>
                  Complete component documentation with variants, sizes, and states
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">UI Primitives</h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Button (6 variants, 4 sizes)</li>
                      <li>• Input (validation states)</li>
                      <li>• Card (header, content, footer)</li>
                      <li>• Badge (4 variants)</li>
                      <li>• Dialog & Sheet components</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3">Complex Components</h4>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Global Navigation (responsive)</li>
                      <li>• Command Palette (⌘K)</li>
                      <li>• Tool Cards (comparison ready)</li>
                      <li>• Filter System (faceted)</li>
                      <li>• Data Tables (sortable)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation" className="space-y-6">
            {/* Screen-Specific Documentation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Screen-Specific Implementation Guide
                </CardTitle>
                <CardDescription>
                  Detailed Tailwind classes, Supabase queries, and keyboard shortcuts for each screen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="home" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
                    <TabsTrigger value="home">Home</TabsTrigger>
                    <TabsTrigger value="explore">Explore</TabsTrigger>
                    <TabsTrigger value="browse">Browse</TabsTrigger>
                    <TabsTrigger value="tool-detail">Tool Detail</TabsTrigger>
                    <TabsTrigger value="tool-wallet">Wallet</TabsTrigger>
                    <TabsTrigger value="auth">Auth</TabsTrigger>
                  </TabsList>

                  {Object.entries(screenDocumentation).map(([screenId, screen]) => (
                    <TabsContent key={screenId} value={screenId} className="space-y-6">
                      {/* Enhanced Explore Tab with detailed implementation */}
                      {screenId === 'explore' && (
                        <>
                          {/* Data Model Overview */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Database className="w-5 h-5" />
                                Data Model & Schema
                              </CardTitle>
                              <CardDescription>
                                Database tables and relationships for the Explore tools functionality
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(screen.dataModel.tables).map(([table, schema]) => (
                                  <div key={table} className="p-3 bg-muted rounded-lg">
                                    <h4 className="mb-2">{table}</h4>
                                    <code className="text-muted-foreground">{schema}</code>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>

                          {/* SQL Indexes */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Server className="w-5 h-5" />
                                Performance Indexes
                              </CardTitle>
                              <CardDescription>
                                Required database indexes for optimal query performance
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {screen.sqlIndexes.map((index, i) => (
                                <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                                  <code>{index}</code>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(index, `index-${i}`)}
                                  >
                                    {copiedCode === `index-${i}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                  </Button>
                                </div>
                              ))}
                            </CardContent>
                          </Card>

                          {/* Pagination Implementation */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Layers className="w-5 h-5" />
                                Pagination & State Management
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <h4 className="mb-2">Pagination Implementation</h4>
                                <div className="bg-muted p-4 rounded-lg">
                                  <pre>
                                    <code>{screen.pagination.implementation}</code>
                                  </pre>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(screen.pagination.implementation, 'pagination')}
                                  className="mt-2"
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  {copiedCode === 'pagination' ? 'Copied!' : 'Copy Pagination Code'}
                                </Button>
                              </div>

                              <Separator />

                              <div>
                                <h4 className="mb-2">URL State Synchronization</h4>
                                <div className="bg-muted p-4 rounded-lg">
                                  <pre>
                                    <code>{screen.stateManagement.urlSync}</code>
                                  </pre>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(screen.stateManagement.urlSync, 'url-sync')}
                                  className="mt-2"
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  {copiedCode === 'url-sync' ? 'Copied!' : 'Copy URL Sync Code'}
                                </Button>
                              </div>

                              <Separator />

                              <div>
                                <h4 className="mb-2">Optimistic UI & Realtime</h4>
                                <div className="space-y-3">
                                  <div>
                                    <p className="mb-2">Optimistic Updates</p>
                                    <div className="bg-muted p-4 rounded-lg">
                                      <pre>
                                        <code>{screen.stateManagement.optimisticUI}</code>
                                      </pre>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="mb-2">Realtime Channels</p>
                                    <div className="bg-muted p-4 rounded-lg">
                                      <pre>
                                        <code>{screen.stateManagement.realtimeChannels}</code>
                                      </pre>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* Mobile Optimizations */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2">
                                <Smartphone className="w-5 h-5" />
                                Mobile Optimizations
                              </CardTitle>
                              <CardDescription>
                                Mobile-specific features and responsive design patterns
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              {screen.mobileOptimizations.map((optimization, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-success" />
                                  <span>{optimization}</span>
                                </div>
                              ))}
                            </CardContent>
                          </Card>
                        </>
                      )}
                      
                      {/* Standard content for other screens */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tailwind Classes */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Key Tailwind Classes</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {Object.entries(screen.tailwindClasses).map(([element, className]) => (
                              <div key={element} className="flex items-center justify-between p-2 bg-muted rounded">
                                <span>{element}:</span>
                                <code className="text-muted-foreground">{className}</code>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        {/* Supabase Queries */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Supabase Data Binding</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {screen.supabaseQueries && Object.entries(screen.supabaseQueries).map(([operation, query]) => (
                              <div key={operation} className="space-y-2">
                                <p>{operation}:</p>
                                <code className="block bg-muted p-2 rounded">{query}</code>
                              </div>
                            ))}
                            {screen.supabaseAuth && Object.entries(screen.supabaseAuth).map(([method, code]) => (
                              <div key={method} className="space-y-2">
                                <p>{method}:</p>
                                <code className="block bg-muted p-2 rounded">{code}</code>
                              </div>
                            ))}
                            {screen.realtimeChannels && (
                              <div className="space-y-2">
                                <p>Realtime Channels:</p>
                                <div className="flex flex-wrap gap-2">
                                  {screen.realtimeChannels.map((channel) => (
                                    <Badge key={channel} variant="outline">{channel}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>

                      {/* Keyboard Shortcuts & Interaction States */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Keyboard Shortcuts</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {screen.keyboardShortcuts.map((shortcut, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <Badge variant="outline" className="font-mono">{shortcut.key}</Badge>
                                <span className="text-muted-foreground">{shortcut.action}</span>
                              </div>
                            ))}
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Interaction States</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            {screen.interactionStates.map((state, index) => (
                              <div key={index} className="bg-muted p-2 rounded">
                                <code>{state}</code>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Tailwind Class Mappings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Tailwind Class Mappings
                </CardTitle>
                <CardDescription>
                  Standard class combinations following the 8-point grid and design system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(tailwindMappings).map(([category, classes]) => (
                  <div key={category}>
                    <h4 className="mb-3 capitalize">{category}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(classes).map(([name, className]) => (
                        <div key={name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <p>{name}</p>
                            <code className="text-muted-foreground">{className}</code>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(className, `tailwind-${category}-${name}`)}
                          >
                            {copiedCode === `tailwind-${category}-${name}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Keyboard Shortcuts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5" />
                  Keyboard Shortcuts & Accessibility
                </CardTitle>
                <CardDescription>
                  Complete keyboard navigation and accessibility implementation guide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <Shield className="w-4 h-4" />
                    <AlertDescription>
                      All interactive elements must be keyboard accessible with focus-visible indicators and ARIA labels.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {keyboardShortcuts.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono">
                            {shortcut.key}
                          </Badge>
                          <span>{shortcut.action}</span>
                        </div>
                        <Badge variant="secondary">
                          {shortcut.scope}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supabase Integration Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Supabase Integration Patterns
                </CardTitle>
                <CardDescription>
                  Code examples for authentication, database operations, and real-time features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(supabaseIntegration).map(([category, methods]) => (
                  <div key={category}>
                    <h4 className="mb-3 capitalize flex items-center gap-2">
                      {category === 'auth' && <Key className="w-4 h-4" />}
                      {category === 'database' && <Server className="w-4 h-4" />}
                      {category === 'realtime' && <Zap className="w-4 h-4" />}
                      {category === 'storage' && <Upload className="w-4 h-4" />}
                      {category}
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(methods).map(([method, code]) => (
                        <div key={method} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span>{method}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(code, `supabase-${category}-${method}`)}
                            >
                              {copiedCode === `supabase-${category}-${method}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                          <code className="text-muted-foreground">{code}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Development Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Development Guidelines
                </CardTitle>
                <CardDescription>
                  Best practices and setup requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-2">Development Setup</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Next.js 14 with TypeScript</li>
                      <li>• Tailwind CSS v4 with design tokens</li>
                      <li>• shadcn/ui component library</li>
                      <li>• Supabase for backend services</li>
                      <li>• ESLint + Prettier configuration</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2">Best Practices</h4>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Use semantic HTML elements</li>
                      <li>• Implement proper ARIA labels</li>
                      <li>• Ensure keyboard navigation</li>
                      <li>• Test responsive breakpoints</li>
                      <li>• Follow 8-point grid system</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Checklist Tab */}
          <TabsContent value="checklist" className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Implementation Progress
                </CardTitle>
                <CardDescription>
                  Track your progress through the complete AI Toologist implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${getCompletionStats().percentage}%` }}
                    />
                  </div>
                  <span>
                    {getCompletionStats().completed}/{getCompletionStats().total} Complete ({getCompletionStats().percentage}%)
                  </span>
                </div>
                
                {/* Copy-Paste Checklist */}
                <Alert className="mb-6">
                  <Terminal className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Copy-Paste Ready Checklist:</strong> Use this formatted checklist in your project management tool or share with your development team.
                  </AlertDescription>
                </Alert>
                
                <div className="bg-muted p-4 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4>Engineer Checklist (Copy-Paste Ready)</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const checklistText = engineerChecklist.map(category => 
                          `## ${category.category}\n` + 
                          category.items.map(item => `- [ ] ${item.label}`).join('\n')
                        ).join('\n\n');
                        copyToClipboard(checklistText, 'full-checklist');
                      }}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedCode === 'full-checklist' ? 'Copied!' : 'Copy All'}
                    </Button>
                  </div>
                  <pre className="overflow-x-auto">
{engineerChecklist.map(category => 
`## ${category.category}
${category.items.map(item => `- [ ] ${item.label}`).join('\n')}`
).join('\n\n')}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Checklist */}
            <div className="space-y-6">
              {engineerChecklist.map((category, categoryIndex) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {categoryIndex === 0 && <Settings className="w-5 h-5" />}
                      {categoryIndex === 1 && <Database className="w-5 h-5" />}
                      {categoryIndex === 2 && <Layers className="w-5 h-5" />}
                      {categoryIndex === 3 && <Monitor className="w-5 h-5" />}
                      {categoryIndex === 4 && <Zap className="w-5 h-5" />}
                      {categoryIndex === 5 && <Upload className="w-5 h-5" />}
                      {category.category}
                      <Badge variant="outline" className="ml-auto">
                        {category.items.filter(item => item.completed).length}/{category.items.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={item.id} className="space-y-2">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={item.id}
                            checked={item.completed}
                            onCheckedChange={() => toggleChecklistItem(categoryIndex, itemIndex)}
                            className="mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <label
                              htmlFor={item.id}
                              className={`cursor-pointer block ${
                                item.completed ? 'line-through text-muted-foreground' : ''
                              }`}
                            >
                              {item.label}
                            </label>
                            {item.code && (
                              <div className="mt-2 bg-muted rounded p-2">
                                <code>{item.code}</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-2 h-6 px-2"
                                  onClick={() => copyToClipboard(item.code, `code-${item.id}`)}
                                >
                                  {copiedCode === `code-${item.id}` ? 
                                    <Check className="w-3 h-3" /> : 
                                    <Copy className="w-3 h-3" />
                                  }
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Quick Reference Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Quick Reference - Essential Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="mb-2">Development Setup</h4>
                    <div className="space-y-2">
                      <code className="block bg-muted p-2 rounded">npm install</code>
                      <code className="block bg-muted p-2 rounded">npm run dev</code>
                      <code className="block bg-muted p-2 rounded">npx supabase start</code>
                      <code className="block bg-muted p-2 rounded">npx shadcn-ui@latest add button</code>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-2">Testing & Deployment</h4>
                    <div className="space-y-2">
                      <code className="block bg-muted p-2 rounded">npm test</code>
                      <code className="block bg-muted p-2 rounded">npm run build</code>
                      <code className="block bg-muted p-2 rounded">npx playwright test</code>
                      <code className="block bg-muted p-2 rounded">vercel deploy</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}