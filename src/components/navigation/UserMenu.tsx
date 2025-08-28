import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '../ui/dropdown-menu';
import {
  User,
  Settings,
  CreditCard,
  Bookmark,
  BarChart3,
  Heart,
  LogOut,
  Package,
  Shield,
  HelpCircle,
  Sparkles,
  Crown,
  Mail,
  Bell,
  Palette
} from 'lucide-react';
import { motion } from 'framer-motion';

interface UserMenuProps {
  onNavigate?: (from: string, to: string, params?: any) => void;
}

export function UserMenu({ onNavigate }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const [imageError, setImageError] = useState(false);
  
  if (!user) {
    return (
      <>
        <motion.button
          onClick={() => onNavigate?.('home', 'sign-in')}
          className="relative group h-14 px-7 bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 overflow-hidden"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated gradient background on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Icon with animation */}
          <motion.div
            className="relative z-10"
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <User className="w-5 h-5 text-gray-700" />
          </motion.div>
          
          <span className="relative z-10 font-bold text-gray-800 tracking-tight">Sign In</span>
        </motion.button>
        
        <motion.button
          onClick={() => onNavigate?.('home', 'auth')}
          className="relative h-14 px-8 font-bold text-white rounded-2xl overflow-hidden flex items-center shadow-xl hover:shadow-2xl transition-shadow duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Multi-layer animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          />
          
          {/* Glowing effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${30 + i * 20}%`,
                  top: "50%",
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
          
          <span className="relative z-10 flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              ✨
            </motion.span>
            Get Started
            <motion.svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </span>
        </motion.button>
      </>
    );
  }

  // Generate initials from email
  const getInitials = (email: string) => {
    const parts = email.split('@')[0].split('.');
    if (parts.length >= 2) {
      return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  // Generate avatar background based on email
  const getAvatarColor = (email: string) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-purple-600',
      'from-yellow-500 to-orange-600'
    ];
    const index = email.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleSignOut = async () => {
    await signOut();
    onNavigate?.('home', 'modern-home');
  };

  const menuItems = [
    {
      group: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          description: 'Manage your profile',
          onClick: () => onNavigate?.('home', 'profile'),
          badge: null
        },
        {
          icon: Package,
          label: 'Tool Wallet',
          description: 'Your saved AI tools',
          onClick: () => onNavigate?.('home', 'tool-wallet'),
          badge: '12'
        },
        {
          icon: Heart,
          label: 'Favorites',
          description: 'Your favorite tools',
          onClick: () => onNavigate?.('home', 'favorites'),
          badge: '5'
        },
        {
          icon: Bookmark,
          label: 'Collections',
          description: 'Your tool collections',
          onClick: () => onNavigate?.('home', 'collections'),
          badge: null
        }
      ]
    },
    {
      group: 'Activity',
      items: [
        {
          icon: BarChart3,
          label: 'Usage Stats',
          description: 'Track your AI usage',
          onClick: () => onNavigate?.('home', 'stats'),
          badge: null
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Updates and alerts',
          onClick: () => onNavigate?.('home', 'notifications'),
          badge: '3'
        }
      ]
    },
    {
      group: 'Settings',
      items: [
        {
          icon: Settings,
          label: 'Settings',
          description: 'App preferences',
          onClick: () => onNavigate?.('home', 'settings'),
          badge: null
        },
        {
          icon: Palette,
          label: 'Appearance',
          description: 'Theme and display',
          onClick: () => onNavigate?.('home', 'appearance'),
          badge: null
        },
        {
          icon: Shield,
          label: 'Privacy',
          description: 'Privacy settings',
          onClick: () => onNavigate?.('home', 'privacy'),
          badge: null
        }
      ]
    }
  ];

  const isPro = false; // TODO: Get from user subscription

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="relative group flex items-center gap-3 h-14 px-4 rounded-2xl bg-gradient-to-r from-white/40 to-white/30 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          />
          
          {/* Avatar with enhanced styling */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-60"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <Avatar className="relative h-11 w-11 ring-2 ring-white/80 shadow-xl">
              {!imageError && user.user_metadata?.avatar_url ? (
                <AvatarImage 
                  src={user.user_metadata.avatar_url} 
                  alt={user.email || ''}
                  onError={() => setImageError(true)}
                />
              ) : null}
              <AvatarFallback className={`bg-gradient-to-br ${getAvatarColor(user.email || '')} text-white font-bold text-lg shadow-inner`}>
                {getInitials(user.email || '')}
              </AvatarFallback>
            </Avatar>
            
            {/* Online status indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-green-400 rounded-full"
                animate={{
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
          
          {/* User info with enhanced typography */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-bold text-gray-800 tracking-tight">
              {user.email?.split('@')[0]}
            </span>
            <span className="text-xs text-gray-600 font-medium">
              {isPro ? '✨ Pro Member' : 'Free Account'}
            </span>
          </div>
          
          {/* Dropdown indicator */}
          <motion.svg
            className="w-4 h-4 text-gray-600 ml-auto hidden md:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{
              rotate: 0
            }}
            whileHover={{
              rotate: 180
            }}
            transition={{
              duration: 0.3
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
          
          {isPro && (
            <motion.div
              className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center ring-2 ring-white shadow-xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Crown className="w-3.5 h-3.5 text-white" />
            </motion.div>
          )}
        </motion.button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="end" forceMount>
        {/* User Info Header */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
          <Avatar className="h-14 w-14">
            {!imageError && user.user_metadata?.avatar_url ? (
              <AvatarImage 
                src={user.user_metadata.avatar_url} 
                alt={user.email || ''}
              />
            ) : null}
            <AvatarFallback className={`bg-gradient-to-br ${getAvatarColor(user.email || '')} text-white font-semibold text-lg`}>
              {getInitials(user.email || '')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            {isPro ? (
              <Badge className="mt-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                <Crown className="w-3 h-3 mr-1" />
                Pro Member
              </Badge>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="mt-1 h-6 text-xs text-purple-600 hover:text-purple-700 p-0"
                onClick={() => onNavigate?.('home', 'upgrade')}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        {menuItems.map((group, groupIndex) => (
          <React.Fragment key={group.group}>
            {groupIndex > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              {group.group}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {group.items.map((item) => (
                <DropdownMenuItem 
                  key={item.label}
                  onClick={item.onClick}
                  className="cursor-pointer py-2.5"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </React.Fragment>
        ))}

        <DropdownMenuSeparator />

        {/* Help & Sign Out */}
        <DropdownMenuItem 
          onClick={() => onNavigate?.('home', 'help')}
          className="cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}