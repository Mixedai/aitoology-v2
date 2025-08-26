import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Copy, 
  Check, 
  Search, 
  Filter, 
  Star, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  User,
  Bell,
  Settings,
  Heart,
  Share2,
  MoreVertical,
  Zap,
  Menu,
  X,
  ArrowUpDown,
  Home,
  Grid3x3,
  Bookmark,
  MessageSquare,
  TrendingUp,
  Clock,
  DollarSign,
  Shield,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  Plus,
  Minus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

export function AIToologistComponents() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("atoms");
  const [showMobile, setShowMobile] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [rating, setRating] = useState(4);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Component code templates
  const componentCode = {
    primaryButton: `<Button className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 disabled:opacity-50 px-4 py-2 rounded-lg font-medium transition-all">
  Primary Action
</Button>`,
    searchBar: `<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input 
    placeholder="Search AI tools..." 
    className="pl-10 pr-4 py-2 w-full"
  />
</div>`,
    toolCard: `<Card className="p-4 hover:shadow-lg transition-shadow">
  <div className="flex items-start gap-3">
    <Avatar className="h-12 w-12">
      <AvatarImage src="/tool-logo.png" />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
    <div className="flex-1">
      <h3 className="font-semibold">Tool Name</h3>
      <p className="text-sm text-muted-foreground">Description</p>
      <div className="flex items-center gap-2 mt-2">
        <Badge>Category</Badge>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
      </div>
    </div>
  </div>
</Card>`
  };

  // Atom Components
  const AtomShowcase = () => (
    <div className="space-y-8">
      {/* Buttons */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Buttons</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(componentCode.primaryButton, "buttons")}
          >
            {copiedCode === "buttons" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Primary</h4>
            <div className="space-y-2">
              <Button className="w-full">Default</Button>
              <Button className="w-full hover:bg-primary/90">Hover</Button>
              <Button className="w-full active:bg-primary/80">Active</Button>
              <Button disabled className="w-full">Disabled</Button>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Secondary</h4>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full">Default</Button>
              <Button variant="secondary" className="w-full hover:bg-secondary/90">Hover</Button>
              <Button variant="secondary" className="w-full active:bg-secondary/80">Active</Button>
              <Button variant="secondary" disabled className="w-full">Disabled</Button>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Ghost</h4>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full">Default</Button>
              <Button variant="ghost" className="w-full hover:bg-accent">Hover</Button>
              <Button variant="ghost" className="w-full active:bg-accent/80">Active</Button>
              <Button variant="ghost" disabled className="w-full">Disabled</Button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/20 rounded text-xs">
          <strong>Tailwind Classes:</strong><br />
          Primary: <code>bg-primary text-primary-foreground hover:bg-primary/90</code><br />
          Secondary: <code>bg-secondary text-secondary-foreground hover:bg-secondary/90</code><br />
          Ghost: <code>hover:bg-accent text-accent-foreground</code>
        </div>
      </Card>

      {/* Form Controls */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Form Controls</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Input</label>
              <Input placeholder="Enter text..." className="w-full" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Select</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Textarea</label>
              <Textarea placeholder="Enter description..." rows={3} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox" />
              <label htmlFor="checkbox" className="text-sm font-medium">Checkbox option</label>
            </div>
            
            <RadioGroup defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="r1" />
                <label htmlFor="r1" className="text-sm font-medium">Radio option 1</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="r2" />
                <label htmlFor="r2" className="text-sm font-medium">Radio option 2</label>
              </div>
            </RadioGroup>
            
            <div className="flex items-center space-x-2">
              <Switch id="toggle" />
              <label htmlFor="toggle" className="text-sm font-medium">Toggle switch</label>
            </div>
          </div>
        </div>
      </Card>

      {/* UI Elements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">UI Elements</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Avatar</h4>
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <Avatar className="h-12 w-12">
                  <AvatarFallback>GPT</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Badges</h4>
              <div className="flex gap-2 flex-wrap">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge className="bg-success text-success-foreground">Success</Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Rating Stars</h4>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-yellow-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`h-5 w-5 ${star <= rating ? 'fill-current' : ''}`}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Progress</h4>
              <Progress value={65} className="w-full" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Skeleton</h4>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Tooltip</h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tooltip content here</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  // Molecule Components
  const MoleculeShowcase = () => (
    <div className="space-y-8">
      {/* Search Bar */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Search Bar with Command Palette</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(componentCode.searchBar, "search")}
          >
            {copiedCode === "search" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search AI tools... (⌘K)"
              className="pl-10 pr-4 py-2 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs">
              ⌘K
            </Badge>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <strong>Mobile:</strong> Full width, larger touch targets<br />
            <strong>Desktop:</strong> Fixed width with keyboard shortcut indicator
          </div>
        </div>
      </Card>

      {/* Filter Drawer */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Drawer</h3>
        
        <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter AI Tools</DrawerTitle>
              <DrawerDescription>
                Narrow down your search results
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Pricing</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="free" />
                    <label htmlFor="free" className="text-sm">Free</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="paid" />
                    <label htmlFor="paid" className="text-sm">Paid</label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={() => setFilterOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </DrawerContent>
        </Drawer>
      </Card>

      {/* Tool Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tool Card</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(componentCode.toolCard, "card")}
          >
            {copiedCode === "card" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  <Zap className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">ChatGPT</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  AI-powered writing and conversation assistant
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">Writing</Badge>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">4.8</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="ghost">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary/10 text-secondary">
                  <Grid3x3 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold truncate">Midjourney</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  AI image generation from text descriptions
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="text-xs">Design</Badge>
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                    <Star className="h-3 w-3" />
                  </div>
                  <span className="text-xs text-muted-foreground">4.2</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button size="sm" variant="ghost">
                  <Heart className="h-4 w-4 fill-current text-red-500" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* Navigation Elements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Navigation & Pagination</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sm mb-3">Breadcrumbs</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>Writing</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-3">Pagination</h4>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
          
          <div>
            <h4 className="font-medium text-sm mb-3">Sort Dropdown</h4>
            <Select>
              <SelectTrigger className="w-48">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Empty State */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Empty State</h3>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h4 className="font-semibold mb-2">No tools found</h4>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or browse our categories
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline">Clear Filters</Button>
            <Button>Browse All Tools</Button>
          </div>
        </div>
      </Card>
    </div>
  );

  // Organism Components
  const OrganismShowcase = () => (
    <div className="space-y-8">
      {/* Navbar */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Navigation Bar</h3>
        </div>
        
        <div className="bg-background">
          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">AI Toologist</span>
              </div>
              
              <nav className="flex items-center gap-6">
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Browse</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Compare</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 pr-4 w-64" />
              </div>
              
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
          
          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">AI Toologist</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </Card>

      {/* Faceted Filter Panel */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Faceted Filter Panel</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {['Writing', 'Design', 'Coding', 'Marketing', 'Productivity'].map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={category.toLowerCase()} />
                      <label htmlFor={category.toLowerCase()} className="text-sm">{category}</label>
                    </div>
                    <span className="text-xs text-muted-foreground">12</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-3">Pricing</h4>
              <div className="space-y-2">
                {['Free', 'Freemium', 'Paid'].map((price) => (
                  <div key={price} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={price.toLowerCase()} />
                      <label htmlFor={price.toLowerCase()} className="text-sm">{price}</label>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {price === 'Free' ? '45' : price === 'Freemium' ? '32' : '18'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-3">Platform</h4>
              <div className="space-y-2">
                {['Web', 'Desktop', 'Mobile', 'API'].map((platform) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id={platform.toLowerCase()} />
                      <label htmlFor={platform.toLowerCase()} className="text-sm">{platform}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Results (142 tools)</h4>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by popularity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="recent">Recently Added</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>T{i}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h5 className="font-medium">AI Tool {i}</h5>
                      <p className="text-sm text-muted-foreground">Tool description here</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">Category</Badge>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Compare Table Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Compare Table Section</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Feature</th>
                <th className="text-center p-4 min-w-32">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar>
                      <AvatarFallback>C1</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">ChatGPT</span>
                    <Button size="sm" variant="outline">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </th>
                <th className="text-center p-4 min-w-32">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar>
                      <AvatarFallback>C2</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Claude</span>
                    <Button size="sm" variant="outline">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </th>
                <th className="text-center p-4 min-w-32">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar>
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Gemini</span>
                    <Button size="sm" variant="outline">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4 font-medium">Free Tier</td>
                <td className="p-4 text-center">
                  <Check className="h-4 w-4 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <Check className="h-4 w-4 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <Check className="h-4 w-4 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">API Access</td>
                <td className="p-4 text-center">
                  <Check className="h-4 w-4 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <Check className="h-4 w-4 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <X className="h-4 w-4 text-red-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-4 font-medium">Custom Instructions</td>
                <td className="p-4 text-center">
                  <Check className="h-4 w-4 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <X className="h-4 w-4 text-red-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <X className="h-4 w-4 text-red-500 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 font-medium">Monthly Price</td>
                <td className="p-4 text-center font-medium">$20</td>
                <td className="p-4 text-center font-medium">$18</td>
                <td className="p-4 text-center font-medium">Free</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Another Tool
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Footer</h3>
        </div>
        
        <div className="bg-muted/20 p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">AI Toologist</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Discover and compare the best AI tools for your workflow. 
                Stay updated with the latest in artificial intelligence.
              </p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button>Subscribe</Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Browse Tools</a></li>
                <li><a href="#" className="hover:text-foreground">Categories</a></li>
                <li><a href="#" className="hover:text-foreground">Compare</a></li>
                <li><a href="#" className="hover:text-foreground">Submit Tool</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 AI Toologist. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Support</a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Grid3x3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">AI Toologist</h1>
                  <p className="text-primary font-medium">Component Library</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-3xl">
                Complete UI component system with atoms, molecules, and organisms. 
                Built with auto layout, variant props, and responsive design patterns.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showMobile ? "default" : "outline"}
                size="sm"
                onClick={() => setShowMobile(!showMobile)}
              >
                {showMobile ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
                {showMobile ? "Mobile" : "Desktop"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="atoms">Atoms</TabsTrigger>
            <TabsTrigger value="molecules">Molecules</TabsTrigger>
            <TabsTrigger value="organisms">Organisms</TabsTrigger>
          </TabsList>

          <TabsContent value="atoms" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Atomic Components</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Basic UI building blocks with consistent styling, variant states, and responsive behavior.
                Each component includes hover, active, and disabled states with proper Tailwind mappings.
              </p>
            </div>
            <AtomShowcase />
          </TabsContent>

          <TabsContent value="molecules" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Molecular Components</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Composed components that combine atoms to create functional UI patterns.
                Includes search bars, cards, navigation elements, and interactive controls.
              </p>
            </div>
            <MoleculeShowcase />
          </TabsContent>

          <TabsContent value="organisms" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Organism Components</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Complex, standalone sections that combine molecules and atoms into complete interface areas.
                Fully responsive with mobile and desktop variants.
              </p>
            </div>
            <OrganismShowcase />
          </TabsContent>
        </Tabs>

        {/* Implementation Guide */}
        <Card className="p-8 mt-12 bg-muted/20">
          <h3 className="text-xl font-bold mb-6">Implementation Guidelines</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">A</span>
                </div>
                Atoms
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Single-purpose, reusable components</li>
                <li>• Consistent sizing and spacing (4px, 8px, 12px, 16px)</li>
                <li>• Color variants using CSS custom properties</li>
                <li>• Focus states with ring utilities</li>
                <li>• Disabled states with opacity-50</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary">M</span>
                </div>
                Molecules
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Combine 2-5 atoms for specific functionality</li>
                <li>• Responsive behavior with breakpoint variants</li>
                <li>• Internal state management where needed</li>
                <li>• Consistent spacing using gap utilities</li>
                <li>• Mobile-first responsive design</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-success">O</span>
                </div>
                Organisms
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Complete interface sections</li>
                <li>• Complex responsive layouts</li>
                <li>• Multiple breakpoint variations</li>
                <li>• Accessibility considerations (ARIA labels, focus management)</li>
                <li>• Performance optimized with lazy loading</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Auto Layout System</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Flexbox and Grid for automatic sizing</li>
                <li>• Gap utilities for consistent spacing</li>
                <li>• min-w-0 for text truncation</li>
                <li>• flex-1 for flexible container sizing</li>
                <li>• aspect-ratio utilities for media</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Responsive Strategy</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Mobile-first design (375px base)</li>
                <li>• Tablet breakpoint (768px)</li>
                <li>• Desktop breakpoint (1024px)</li>
                <li>• Container queries for component-level responsiveness</li>
                <li>• Touch-friendly sizing on mobile (44px minimum)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}