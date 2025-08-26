import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Sparkles,
  Bot,
  User,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Loader,
  Zap,
  Brain,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ScrollArea } from '../ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  suggestions?: string[];
}

interface AIChatbotProps {
  className?: string;
}

export function AIChatbot({ className = '' }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant for AI Toologist. I can help you find the perfect AI tools, compare features, or answer any questions you have. How can I assist you today?',
      timestamp: new Date(),
      suggestions: ['Find AI writing tools', 'Compare ChatGPT vs Claude', 'Show me design tools', 'Help with pricing']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [conversationMode, setConversationMode] = useState<'chat' | 'voice'>('chat');

  // Refs for accessibility and functionality
  const chatInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      const timer = setTimeout(() => {
        chatInputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isMinimized) {
          setIsOpen(false);
        } else {
          setIsMinimized(true);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, isMinimized]);

  // Simulate AI response
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const responses = [
      `I understand you're looking for information about "${userMessage}". Based on our AI tool database, I can recommend several options that might be perfect for your needs. Would you like me to show you the top-rated tools in this category?`,
      `Great question about "${userMessage}"! I've analyzed over 500+ AI tools in our database. Let me provide you with personalized recommendations based on your requirements. What's your primary use case?`,
      `Thanks for asking about "${userMessage}". This is a popular topic among our users. I can help you compare different options, show pricing details, or explain key features. What would be most helpful?`,
      `Interesting query about "${userMessage}"! Our platform has comprehensive reviews and comparisons for this. I can guide you through the best options, show user ratings, or help you filter by specific features. How would you like to proceed?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!message.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingMessage]);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      
      // Remove typing indicator and add real response
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          type: 'ai',
          content: aiResponse,
          timestamp: new Date(),
          suggestions: ['Tell me more', 'Show alternatives', 'Compare prices', 'View reviews']
        }];
      });
    } catch (error) {
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== 'typing');
        return [...filtered, {
          id: Date.now().toString(),
          type: 'ai',
          content: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
          timestamp: new Date()
        }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    chatInputRef.current?.focus();
  };

  // Handle voice recording toggle
  const toggleVoiceRecording = () => {
    setIsListening(!isListening);
    // In a real implementation, this would handle speech recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setMessage('This is a demo - voice recognition would be implemented with Web Speech API');
      }, 3000);
    }
  };

  // Copy message to clipboard
  const copyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could show a toast notification here
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  // Handle message feedback
  const handleMessageFeedback = (messageId: string, isPositive: boolean) => {
    // In a real implementation, this would send feedback to the AI service
    console.log(`Feedback for message ${messageId}: ${isPositive ? 'positive' : 'negative'}`);
  };

  const chatbotSize = isMinimized ? 'minimized' : 'expanded';

  return (
    <TooltipProvider>
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Floating Action Button
            <motion.div
              key="fab"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => setIsOpen(true)}
                    size="lg"
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary/95 hover:to-primary/75 shadow-2xl hover:shadow-3xl transition-all duration-500 border-0 group relative overflow-hidden"
                    aria-label="Open AI Assistant"
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Pulsing ring animation */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border border-primary/50 animate-pulse"></div>
                    
                    {/* Icon with animation */}
                    <div className="relative z-10 flex items-center justify-center">
                      <Bot className="w-7 h-7 text-primary-foreground group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                      <Sparkles className="w-4 h-4 text-primary-foreground absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-card border-border backdrop-blur-sm">
                  <p>Ask AI Assistant</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ) : (
            // Chat Interface
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`
                ${isMinimized 
                  ? 'w-80 h-16' 
                  : 'w-96 h-[32rem] md:w-[28rem] md:h-[36rem]'
                } 
                transition-all duration-500 ease-in-out
              `}
            >
              <Card className="w-full h-full shadow-2xl backdrop-blur-2xl bg-card/95 border-white/20 overflow-hidden relative group">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Header */}
                <CardHeader className="p-6 pb-4 border-b border-white/10 relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {/* AI Avatar */}
                      <div className="relative">
                        <Avatar className="w-10 h-10 ring-2 ring-primary/20">
                          <AvatarFallback className="bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-primary-foreground">
                            <Brain className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card flex items-center justify-center">
                          <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-foreground">AI Assistant</h3>
                        <p className="text-muted-foreground text-sm">
                          {isTyping ? 'Typing...' : 'Online • Ready to help'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Voice/Sound controls */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 hover:bg-white/10 transition-colors duration-300 rounded-xl"
                            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                            aria-label={isSoundEnabled ? 'Disable sound' : 'Enable sound'}
                          >
                            {isSoundEnabled ? (
                              <Volume2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                            ) : (
                              <VolumeX className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isSoundEnabled ? 'Disable sound' : 'Enable sound'}</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Minimize/Maximize */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 hover:bg-white/10 transition-colors duration-300 rounded-xl"
                            onClick={() => setIsMinimized(!isMinimized)}
                            aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                          >
                            {isMinimized ? (
                              <Maximize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                            ) : (
                              <Minimize2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isMinimized ? 'Expand chat' : 'Minimize chat'}</p>
                        </TooltipContent>
                      </Tooltip>

                      {/* Close */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0 hover:bg-destructive/20 hover:text-destructive transition-colors duration-300 rounded-xl"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Close chat (Esc)</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </CardHeader>

                {/* Chat Content */}
                {!isMinimized && (
                  <CardContent className="p-0 h-full flex flex-col relative z-10">
                    {/* Messages Area */}
                    <ScrollArea className="flex-1 p-6 pt-4">
                      <div className="space-y-6" ref={chatContainerRef}>
                        {messages.map((msg) => (
                          <div key={msg.id} className="space-y-4">
                            {/* Message */}
                            <div className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                              {msg.type === 'ai' && (
                                <Avatar className="w-8 h-8 ring-1 ring-border flex-shrink-0">
                                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20">
                                    <Bot className="w-4 h-4 text-primary" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className={`max-w-[75%] ${msg.type === 'user' ? 'order-first' : ''}`}>
                                <div className={`
                                  p-4 rounded-2xl backdrop-blur-sm relative group/message
                                  ${msg.type === 'user' 
                                    ? 'bg-primary text-primary-foreground ml-auto' 
                                    : 'bg-muted/80 text-muted-foreground'
                                  }
                                `}>
                                  {msg.isTyping ? (
                                    <div className="flex items-center gap-2">
                                      <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                                      </div>
                                      <span className="text-sm">AI is thinking...</span>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="leading-relaxed">{msg.content}</p>
                                      
                                      {/* Message actions */}
                                      {msg.type === 'ai' && (
                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 opacity-0 group-hover/message:opacity-100 transition-opacity duration-300">
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs hover:bg-white/10"
                                            onClick={() => copyMessage(msg.content)}
                                          >
                                            <Copy className="w-3 h-3 mr-1" />
                                            Copy
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs hover:bg-white/10"
                                            onClick={() => handleMessageFeedback(msg.id, true)}
                                          >
                                            <ThumbsUp className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-xs hover:bg-white/10"
                                            onClick={() => handleMessageFeedback(msg.id, false)}
                                          >
                                            <ThumbsDown className="w-3 h-3" />
                                          </Button>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                                
                                {/* Timestamp */}
                                <p className={`text-xs text-muted-foreground mt-2 ${
                                  msg.type === 'user' ? 'text-right' : 'text-left'
                                }`}>
                                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>

                              {msg.type === 'user' && (
                                <Avatar className="w-8 h-8 ring-1 ring-border flex-shrink-0">
                                  <AvatarFallback className="bg-gradient-to-br from-secondary/20 to-primary/20">
                                    <User className="w-4 h-4 text-secondary" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>

                            {/* Suggestions */}
                            {msg.suggestions && msg.type === 'ai' && !msg.isTyping && (
                              <div className="flex flex-wrap gap-2 pl-12">
                                {msg.suggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 px-3 text-xs bg-background/50 hover:bg-background/80 border-border/50 hover:border-border transition-all duration-300 rounded-full"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                  >
                                    {suggestion}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    <Separator className="bg-border/50" />

                    {/* Input Area */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-end gap-3">
                        <div className="flex-1 space-y-2">
                          <div className="relative">
                            <Input
                              ref={chatInputRef}
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendMessage();
                                }
                              }}
                              placeholder="Ask me about AI tools..."
                              disabled={isTyping}
                              className="pr-12 bg-background/50 border-border/50 focus:bg-background focus:border-border backdrop-blur-sm rounded-2xl resize-none min-h-[2.5rem] py-3"
                              aria-label="Type your message"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                              {isListening && (
                                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Voice Input Button */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`w-10 h-10 p-0 rounded-2xl border-border/50 backdrop-blur-sm transition-all duration-300 ${
                                isListening 
                                  ? 'bg-destructive/20 border-destructive/50 text-destructive' 
                                  : 'bg-background/50 hover:bg-background/80'
                              }`}
                              onClick={toggleVoiceRecording}
                              disabled={isTyping}
                              aria-label={isListening ? 'Stop voice recording' : 'Start voice recording'}
                            >
                              {isListening ? (
                                <MicOff className="w-4 h-4" />
                              ) : (
                                <Mic className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isListening ? 'Stop recording' : 'Voice input'}</p>
                          </TooltipContent>
                        </Tooltip>

                        {/* Send Button */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={handleSendMessage}
                              disabled={!message.trim() || isTyping}
                              size="sm"
                              className="w-10 h-10 p-0 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl"
                              aria-label="Send message"
                            >
                              {isTyping ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send message (Enter)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* Quick actions */}
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Zap className="w-3 h-3 mr-1" />
                          Quick Help
                        </Badge>
                        <div className="flex gap-1">
                          {['Popular tools', 'Compare AI', 'Pricing guide'].map((action, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300"
                              onClick={() => handleSuggestionClick(action)}
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
}