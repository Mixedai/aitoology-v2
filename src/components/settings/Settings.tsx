import React, { useState, useRef } from 'react';
import { 
  ArrowLeft,
  User,
  Bell,
  Shield,
  Monitor,
  Globe,
  Eye,
  Database,
  Palette,
  Volume2,
  Keyboard,
  ChevronRight,
  Check,
  Moon,
  Sun,
  Smartphone,
  Languages,
  Mail,
  MessageSquare,
  Lock,
  Cookie,
  Download,
  Trash2,
  Save,
  RotateCcw,
  HelpCircle,
  Info,
  Zap,
  Settings as SettingsIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Slider } from '../ui/slider';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface SettingsProps {
  onNavigate?: (from: string, to: string, params?: any) => void;
  currentScreen?: string;
}

interface SettingsState {
  // Theme & Display
  theme: 'light' | 'dark' | 'system';
  displayDensity: 'comfortable' | 'compact' | 'spacious';
  fontSize: number;
  animations: boolean;
  
  // Language & Region
  language: string;
  region: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  
  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
  newToolAlerts: boolean;
  priceAlerts: boolean;
  
  // Privacy & Security
  publicProfile: boolean;
  shareUsageData: boolean;
  cookies: 'all' | 'necessary' | 'none';
  twoFactorAuth: boolean;
  sessionTimeout: number;
  
  // Accessibility
  highContrast: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  
  // Data & Storage
  autoSaveFilters: boolean;
  dataRetention: number;
  exportFormat: 'json' | 'csv' | 'xml';
  
  // Audio
  soundEffects: boolean;
  voiceEnabled: boolean;
  volume: number;
}

export function Settings({ onNavigate, currentScreen = 'settings' }: SettingsProps) {
  const [settings, setSettings] = useState<SettingsState>({
    // Theme & Display defaults
    theme: 'system',
    displayDensity: 'comfortable',
    fontSize: 16,
    animations: true,
    
    // Language & Region defaults
    language: 'en',
    region: 'US',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    
    // Notifications defaults
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    newToolAlerts: true,
    priceAlerts: false,
    
    // Privacy & Security defaults
    publicProfile: false,
    shareUsageData: true,
    cookies: 'necessary',
    twoFactorAuth: false,
    sessionTimeout: 30,
    
    // Accessibility defaults
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    
    // Data & Storage defaults
    autoSaveFilters: true,
    dataRetention: 365,
    exportFormat: 'json',
    
    // Audio defaults
    soundEffects: true,
    voiceEnabled: false,
    volume: 50
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('display');

  // Form refs for accessibility
  const formRef = useRef<HTMLFormElement>(null);

  // Update settings with change tracking
  const updateSetting = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  // Save settings
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would save to backend/localStorage
      localStorage.setItem('ai-toologist-settings', JSON.stringify(settings));
      
      setHasChanges(false);
      toast.success('Settings saved successfully!', {
        description: 'Your preferences have been updated.',
      });
    } catch (error) {
      toast.error('Failed to save settings', {
        description: 'Please try again or contact support.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    setSettings({
      theme: 'system',
      displayDensity: 'comfortable',
      fontSize: 16,
      animations: true,
      language: 'en',
      region: 'US',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      weeklyDigest: true,
      newToolAlerts: true,
      priceAlerts: false,
      publicProfile: false,
      shareUsageData: true,
      cookies: 'necessary',
      twoFactorAuth: false,
      sessionTimeout: 30,
      highContrast: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicators: true,
      autoSaveFilters: true,
      dataRetention: 365,
      exportFormat: 'json',
      soundEffects: true,
      voiceEnabled: false,
      volume: 50
    });
    setHasChanges(true);
    toast.info('Settings reset to defaults', {
      description: 'Don\'t forget to save your changes.',
    });
  };

  // Export settings
  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'ai-toologist-settings.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Settings exported successfully!', {
      description: 'Downloaded as ai-toologist-settings.json',
    });
  };

  // Navigation handlers
  const handleBack = () => {
    if (hasChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmed) return;
    }
    onNavigate?.(currentScreen, 'home');
  };

  const handleAccountSettings = () => {
    onNavigate?.(currentScreen, 'auth');
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleBack();
    } else if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="min-h-screen bg-background" onKeyDown={handleKeyDown}>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="gap-2"
              aria-label="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10">
                  <SettingsIcon className="w-6 h-6 text-primary" />
                </div>
                <h1>Settings</h1>
              </div>
              <p className="text-muted-foreground">
                Customize your AI Toologist experience
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {hasChanges && (
              <Badge variant="secondary" className="gap-2">
                <Info className="w-3 h-3" />
                Unsaved changes
              </Badge>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Quick Actions Alert */}
        <Alert className="border-primary/20 bg-primary/5">
          <Zap className="w-4 h-4 text-primary" />
          <AlertDescription className="text-foreground">
            <span>Need help? Press </span>
            <kbd className="px-2 py-1 bg-muted rounded text-sm">⌘K</kbd>
            <span> for quick search or </span>
            <kbd className="px-2 py-1 bg-muted rounded text-sm">⌘S</kbd>
            <span> to save changes quickly.</span>
          </AlertDescription>
        </Alert>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 gap-2">
            <TabsTrigger value="display" className="gap-2">
              <Monitor className="w-4 h-4" />
              <span className="hidden sm:inline">Display</span>
            </TabsTrigger>
            <TabsTrigger value="language" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Language</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Accessibility</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="gap-2">
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
          </TabsList>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5 text-primary" />
                  <div>
                    <h3>Appearance</h3>
                    <p className="text-muted-foreground">Customize the look and feel</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Theme Selection */}
                <div className="space-y-4">
                  <Label htmlFor="theme">Theme</Label>
                  <RadioGroup
                    value={settings.theme}
                    onValueChange={(value: 'light' | 'dark' | 'system') => updateSetting('theme', value)}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="light" id="light" />
                      <div className="flex items-center gap-3 flex-1">
                        <Sun className="w-5 h-5 text-warning" />
                        <div>
                          <label htmlFor="light" className="cursor-pointer">Light</label>
                          <p className="text-muted-foreground text-sm">Clean and bright</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="dark" id="dark" />
                      <div className="flex items-center gap-3 flex-1">
                        <Moon className="w-5 h-5 text-primary" />
                        <div>
                          <label htmlFor="dark" className="cursor-pointer">Dark</label>
                          <p className="text-muted-foreground text-sm">Easy on the eyes</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value="system" id="system" />
                      <div className="flex items-center gap-3 flex-1">
                        <Smartphone className="w-5 h-5 text-secondary" />
                        <div>
                          <label htmlFor="system" className="cursor-pointer">System</label>
                          <p className="text-muted-foreground text-sm">Follow device</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Display Density */}
                <div className="space-y-4">
                  <Label htmlFor="density">Display Density</Label>
                  <Select value={settings.displayDensity} onValueChange={(value: 'comfortable' | 'compact' | 'spacious') => updateSetting('displayDensity', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact - More content, less spacing</SelectItem>
                      <SelectItem value="comfortable">Comfortable - Balanced spacing</SelectItem>
                      <SelectItem value="spacious">Spacious - More breathing room</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Font Size */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <span className="text-muted-foreground">{settings.fontSize}px</span>
                  </div>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={([value]) => updateSetting('fontSize', value)}
                    min={12}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-muted-foreground text-sm">Adjust text size for better readability</p>
                </div>

                {/* Animations */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <p className="text-muted-foreground text-sm">Smooth transitions and effects</p>
                  </div>
                  <Switch
                    id="animations"
                    checked={settings.animations}
                    onCheckedChange={(checked) => updateSetting('animations', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language Settings */}
          <TabsContent value="language" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Languages className="w-5 h-5 text-primary" />
                  <div>
                    <h3>Language & Region</h3>
                    <p className="text-muted-foreground">Set your language and regional preferences</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Language */}
                  <div className="space-y-3">
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                        <SelectItem value="pt">Portuguese</SelectItem>
                        <SelectItem value="tr">Turkish</SelectItem>
                        <SelectItem value="ja">Japanese</SelectItem>
                        <SelectItem value="ko">Korean</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Region */}
                  <div className="space-y-3">
                    <Label htmlFor="region">Region</Label>
                    <Select value={settings.region} onValueChange={(value) => updateSetting('region', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="GB">United Kingdom</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                        <SelectItem value="DE">Germany</SelectItem>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="IT">Italy</SelectItem>
                        <SelectItem value="ES">Spain</SelectItem>
                        <SelectItem value="TR">Turkey</SelectItem>
                        <SelectItem value="JP">Japan</SelectItem>
                        <SelectItem value="KR">South Korea</SelectItem>
                        <SelectItem value="CN">China</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Format */}
                  <div className="space-y-3">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={settings.dateFormat} onValueChange={(value) => updateSetting('dateFormat', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (US)</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (International)</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (ISO)</SelectItem>
                        <SelectItem value="DD.MM.YYYY">DD.MM.YYYY (European)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Format */}
                  <div className="space-y-3">
                    <Label htmlFor="timeFormat">Time Format</Label>
                    <Select value={settings.timeFormat} onValueChange={(value: '12h' | '24h') => updateSetting('timeFormat', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary" />
                  <div>
                    <h3>Notification Preferences</h3>
                    <p className="text-muted-foreground">Choose how you want to be notified</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Email Notifications */}
                <div className="space-y-6">
                  <h4>Email Notifications</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="emailNotifications">General Email Notifications</Label>
                        <p className="text-muted-foreground text-sm">Receive important updates via email</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                        <p className="text-muted-foreground text-sm">Summary of new tools and features</p>
                      </div>
                      <Switch
                        id="weeklyDigest"
                        checked={settings.weeklyDigest}
                        onCheckedChange={(checked) => updateSetting('weeklyDigest', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="marketingEmails">Marketing Communications</Label>
                        <p className="text-muted-foreground text-sm">Product announcements and special offers</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => updateSetting('marketingEmails', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Push Notifications */}
                <div className="space-y-6">
                  <h4>Push Notifications</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="pushNotifications">Browser Notifications</Label>
                        <p className="text-muted-foreground text-sm">Real-time notifications in your browser</p>
                      </div>
                      <Switch
                        id="pushNotifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="newToolAlerts">New Tool Alerts</Label>
                        <p className="text-muted-foreground text-sm">Notify when new AI tools are added</p>
                      </div>
                      <Switch
                        id="newToolAlerts"
                        checked={settings.newToolAlerts}
                        onCheckedChange={(checked) => updateSetting('newToolAlerts', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="priceAlerts">Price Change Alerts</Label>
                        <p className="text-muted-foreground text-sm">Notify when tool prices change</p>
                      </div>
                      <Switch
                        id="priceAlerts"
                        checked={settings.priceAlerts}
                        onCheckedChange={(checked) => updateSetting('priceAlerts', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <h3>Privacy & Security</h3>
                    <p className="text-muted-foreground">Control your data and security settings</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Profile Privacy */}
                <div className="space-y-6">
                  <h4>Profile & Data</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="publicProfile">Public Profile</Label>
                        <p className="text-muted-foreground text-sm">Make your profile visible to other users</p>
                      </div>
                      <Switch
                        id="publicProfile"
                        checked={settings.publicProfile}
                        onCheckedChange={(checked) => updateSetting('publicProfile', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="shareUsageData">Share Usage Data</Label>
                        <p className="text-muted-foreground text-sm">Help improve our services with anonymous data</p>
                      </div>
                      <Switch
                        id="shareUsageData"
                        checked={settings.shareUsageData}
                        onCheckedChange={(checked) => updateSetting('shareUsageData', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Cookie Preferences */}
                <div className="space-y-4">
                  <Label htmlFor="cookies">Cookie Preferences</Label>
                  <Select value={settings.cookies} onValueChange={(value: 'all' | 'necessary' | 'none') => updateSetting('cookies', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Accept All Cookies</SelectItem>
                      <SelectItem value="necessary">Necessary Cookies Only</SelectItem>
                      <SelectItem value="none">Block All Cookies</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-muted-foreground text-sm">
                    Manage how we use cookies to enhance your experience
                  </p>
                </div>

                <Separator />

                {/* Security */}
                <div className="space-y-6">
                  <h4>Security</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                        <p className="text-muted-foreground text-sm">Add an extra layer of security to your account</p>
                      </div>
                      <Switch
                        id="twoFactorAuth"
                        checked={settings.twoFactorAuth}
                        onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sessionTimeout">Session Timeout</Label>
                        <span className="text-muted-foreground">{settings.sessionTimeout} days</span>
                      </div>
                      <Slider
                        value={[settings.sessionTimeout]}
                        onValueChange={([value]) => updateSetting('sessionTimeout', value)}
                        min={1}
                        max={90}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-muted-foreground text-sm">
                        Automatically log out after this period of inactivity
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Account Actions */}
                <div className="space-y-4">
                  <h4>Account Management</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={handleAccountSettings}
                      className="gap-2"
                    >
                      <User className="w-4 h-4" />
                      Account Settings
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleExport}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Settings */}
          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <h3>Accessibility</h3>
                    <p className="text-muted-foreground">Make AI Toologist work better for you</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Visual Accessibility */}
                <div className="space-y-6">
                  <h4>Visual Accessibility</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="highContrast">High Contrast Mode</Label>
                        <p className="text-muted-foreground text-sm">Enhanced contrast for better visibility</p>
                      </div>
                      <Switch
                        id="highContrast"
                        checked={settings.highContrast}
                        onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="reducedMotion">Reduced Motion</Label>
                        <p className="text-muted-foreground text-sm">Minimize animations and transitions</p>
                      </div>
                      <Switch
                        id="reducedMotion"
                        checked={settings.reducedMotion}
                        onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="focusIndicators">Enhanced Focus Indicators</Label>
                        <p className="text-muted-foreground text-sm">Stronger visual focus indicators</p>
                      </div>
                      <Switch
                        id="focusIndicators"
                        checked={settings.focusIndicators}
                        onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Navigation Accessibility */}
                <div className="space-y-6">
                  <h4>Navigation</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="keyboardNavigation">Enhanced Keyboard Navigation</Label>
                        <p className="text-muted-foreground text-sm">Improved keyboard support and shortcuts</p>
                      </div>
                      <Switch
                        id="keyboardNavigation"
                        checked={settings.keyboardNavigation}
                        onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="screenReader">Screen Reader Optimizations</Label>
                        <p className="text-muted-foreground text-sm">Enhanced support for screen readers</p>
                      </div>
                      <Switch
                        id="screenReader"
                        checked={settings.screenReader}
                        onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Accessibility Resources */}
                <div className="space-y-4">
                  <h4>Resources</h4>
                  <Alert>
                    <HelpCircle className="w-4 h-4" />
                    <AlertDescription>
                      Need help with accessibility features? Visit our{' '}
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Accessibility Guide
                      </Button>
                      {' '}for detailed instructions and tips.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & Storage Settings */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-primary" />
                  <div>
                    <h3>Data & Storage</h3>
                    <p className="text-muted-foreground">Manage your data and storage preferences</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Data Management */}
                <div className="space-y-6">
                  <h4>Data Management</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="autoSaveFilters">Auto-save Filters</Label>
                        <p className="text-muted-foreground text-sm">Automatically save your search filters</p>
                      </div>
                      <Switch
                        id="autoSaveFilters"
                        checked={settings.autoSaveFilters}
                        onCheckedChange={(checked) => updateSetting('autoSaveFilters', checked)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dataRetention">Data Retention</Label>
                        <span className="text-muted-foreground">{settings.dataRetention} days</span>
                      </div>
                      <Slider
                        value={[settings.dataRetention]}
                        onValueChange={([value]) => updateSetting('dataRetention', value)}
                        min={30}
                        max={365}
                        step={30}
                        className="w-full"
                      />
                      <p className="text-muted-foreground text-sm">
                        How long to keep your activity data
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="exportFormat">Export Format</Label>
                      <Select value={settings.exportFormat} onValueChange={(value: 'json' | 'csv' | 'xml') => updateSetting('exportFormat', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="json">JSON (Recommended)</SelectItem>
                          <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                          <SelectItem value="xml">XML (Structured)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Storage Actions */}
                <div className="space-y-4">
                  <h4>Storage Actions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={handleExport}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export All Data
                    </Button>
                    <Button
                      variant="outline"
                      className="gap-2 text-destructive hover:text-destructive"
                      onClick={() => {
                        const confirmed = window.confirm('Are you sure you want to clear all cached data? This action cannot be undone.');
                        if (confirmed) {
                          toast.success('Cache cleared successfully');
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Cache
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audio Settings */}
          <TabsContent value="audio" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-primary" />
                  <div>
                    <h3>Audio & Voice</h3>
                    <p className="text-muted-foreground">Configure audio feedback and voice features</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Audio Preferences */}
                <div className="space-y-6">
                  <h4>Audio Feedback</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="soundEffects">Sound Effects</Label>
                        <p className="text-muted-foreground text-sm">Button clicks and interaction sounds</p>
                      </div>
                      <Switch
                        id="soundEffects"
                        checked={settings.soundEffects}
                        onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="volume">Volume Level</Label>
                        <span className="text-muted-foreground">{settings.volume}%</span>
                      </div>
                      <Slider
                        value={[settings.volume]}
                        onValueChange={([value]) => updateSetting('volume', value)}
                        min={0}
                        max={100}
                        step={5}
                        className="w-full"
                        disabled={!settings.soundEffects}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Voice Features */}
                <div className="space-y-6">
                  <h4>Voice Features</h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="voiceEnabled">Voice Input</Label>
                        <p className="text-muted-foreground text-sm">Use voice commands for search and navigation</p>
                      </div>
                      <Switch
                        id="voiceEnabled"
                        checked={settings.voiceEnabled}
                        onCheckedChange={(checked) => updateSetting('voiceEnabled', checked)}
                      />
                    </div>
                  </div>

                  {settings.voiceEnabled && (
                    <Alert>
                      <Info className="w-4 h-4" />
                      <AlertDescription>
                        Voice input requires microphone permissions. Make sure to allow access when prompted by your browser.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}