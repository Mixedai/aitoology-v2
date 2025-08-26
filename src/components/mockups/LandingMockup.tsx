import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, ArrowRight, Zap, Shield, BarChart3, Users, Play } from "lucide-react";
import { AIAvatar } from "../ui-kit/AIAvatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LandingMockupProps {
  theme: "light" | "dark";
}

export function LandingMockup({ theme }: LandingMockupProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6" variant="secondary">
              New: AI Tool Comparison Engine
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Find the perfect{" "}
              <span className="text-primary">AI tool</span>{" "}
              in 10 seconds
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover, compare, and choose from thousands of AI tools. 
              Save time and make informed decisions with our comprehensive database.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                Start Exploring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwb2ZmaWNlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NTI4MjU5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="AI Tools Dashboard"
                className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to choose the right AI tool
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to discover, compare, and integrate AI tools into your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Lightning Fast Search</h3>
              <p className="text-muted-foreground leading-relaxed">
                Find exactly what you need with our intelligent search engine. 
                Filter by category, pricing, features, and more.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Detailed Comparisons</h3>
              <p className="text-muted-foreground leading-relaxed">
                Compare tools side-by-side with detailed feature breakdowns, 
                pricing analysis, and user reviews.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Trusted Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                Make informed decisions with verified reviews from real users 
                and expert analysis of each tool.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo Bar */}
          <div className="text-center mb-16">
            <p className="text-muted-foreground mb-8">Trusted by teams at</p>
            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="font-semibold">Google</span>
              </div>
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="font-semibold">Microsoft</span>
              </div>
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="font-semibold">Slack</span>
              </div>
              <div className="h-8 w-24 bg-muted rounded flex items-center justify-center">
                <span className="font-semibold">Notion</span>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "AI Toologist saved us weeks of research. We found the perfect tool for our workflow in minutes."
              </p>
              <div className="flex items-center">
                <AIAvatar fallback="SK" className="mr-3" />
                <div>
                  <p className="font-semibold">Sarah Kim</p>
                  <p className="text-sm text-muted-foreground">Product Manager, Startup Inc</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "The comparison feature is incredible. We can see exactly what we're getting before we commit."
              </p>
              <div className="flex items-center">
                <AIAvatar fallback="MJ" className="mr-3" />
                <div>
                  <p className="font-semibold">Michael Johnson</p>
                  <p className="text-sm text-muted-foreground">CTO, TechCorp</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Finally, a platform that understands what developers need from AI tools. Highly recommended!"
              </p>
              <div className="flex items-center">
                <AIAvatar fallback="AL" className="mr-3" />
                <div>
                  <p className="font-semibold">Alex Liu</p>
                  <p className="text-sm text-muted-foreground">Lead Developer, InnovateLab</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to find your perfect AI tool?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who use AI Toologist to make smarter tool choices.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Start Exploring Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}