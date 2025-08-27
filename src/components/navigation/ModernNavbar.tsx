import { useEffect,useState, } from 'react';

import { 
  Home, 
  Search, 
  BookOpen, 
  Newspaper, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Brain,
  Zap,
  Grid3x3,
  Palette,
  Code2,
  MessageSquare,
  Image,
  Video,
  FileText,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ModernNavbarProps {
  onNavigate: (screenId: string) => void;
  currentScreen?: string;
}

export function ModernNavbar({ onNavigate, currentScreen = 'modern-home' }: ModernNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      screenId: 'modern-home'
    },
    {
      id: 'tools',
      label: 'AI Tools',
      icon: Grid3x3,
      screenId: 'explore-frame',
      hasDropdown: true,
      dropdownItems: [
        { label: 'Chat & Text', icon: MessageSquare, category: 'chatbot', gradient: 'from-teal-400 to-teal-600' },
        { label: 'Image Generation', icon: Image, category: 'design', gradient: 'from-purple-400 to-pink-600' },
        { label: 'Video & Motion', icon: Video, category: 'video', gradient: 'from-red-400 to-red-600' },
        { label: 'Development', icon: Code2, category: 'development', gradient: 'from-gray-600 to-gray-800' },
        { label: 'Writing', icon: FileText, category: 'writing', gradient: 'from-indigo-400 to-indigo-600' },
        { label: 'Trending', icon: TrendingUp, category: 'trending', gradient: 'from-orange-400 to-orange-600' },
      ]
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: BookOpen,
      screenId: 'tutorials-frame'
    },
    {
      id: 'news',
      label: 'News',
      icon: Newspaper,
      screenId: 'news'
    }
  ];

  const isActive = (screenId: string) => currentScreen === screenId;

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
            : 'bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => onNavigate('modern-home')}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Toologist
                </span>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => {
                      if (item.hasDropdown) {
                        setActiveDropdown(activeDropdown === item.id ? null : item.id);
                      } else {
                        onNavigate(item.screenId);
                      }
                    }}
                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                      isActive(item.screenId)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`w-3 h-3 transition-transform ${
                        activeDropdown === item.id ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        onMouseLeave={() => setActiveDropdown(null)}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200/50 overflow-hidden"
                      >
                        <div className="p-2">
                          {item.dropdownItems?.map((subItem, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                onNavigate(item.screenId);
                                setActiveDropdown(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className={`p-2 rounded-lg bg-gradient-to-r ${subItem.gradient} group-hover:scale-110 transition-transform`}>
                                <subItem.icon className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-gray-700 font-medium">{subItem.label}</span>
                              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          ))}
                        </div>
                        <div className="border-t border-gray-100 p-3">
                          <button
                            onClick={() => {
                              onNavigate('explore-frame');
                              setActiveDropdown(null);
                            }}
                            className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View All Tools →
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('explore-frame')}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Search className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Search</span>
                <kbd className="px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">⌘K</kbd>
              </motion.button>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('sign-in')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => onNavigate('auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Get Started
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-600" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.screenId);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.screenId)
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        onNavigate('sign-in');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      onClick={() => {
                        onNavigate('auth');
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-16" />
    </>
  );
}