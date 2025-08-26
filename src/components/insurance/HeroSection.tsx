import { Button } from "../ui/button";
import { ArrowRight, Shield, Users, Award } from "lucide-react";

interface HeroSectionProps {
  variant?: "default" | "centered" | "split";
  className?: string;
}

export function HeroSection({ variant = "default", className = "" }: HeroSectionProps) {
  if (variant === "centered") {
    return (
      <section className={`bg-gradient-to-br from-background to-muted py-16 md:py-24 lg:py-32 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Protecting What Matters Most
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive insurance solutions tailored to your needs. Get peace of mind with our trusted coverage options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto px-8 py-3">
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3">
                Learn More
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Trusted Security</h3>
                <p className="text-sm text-muted-foreground">Bank-level encryption</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">2M+ Customers</h3>
                <p className="text-sm text-muted-foreground">Nationwide coverage</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Award Winning</h3>
                <p className="text-sm text-muted-foreground">Industry recognition</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "split") {
    return (
      <section className={`bg-background py-16 md:py-24 lg:py-32 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Insurance Made Simple
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Compare plans, get quotes, and manage your policies all in one place. 
                Our digital-first approach makes insurance accessible and affordable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 py-3">
                  Start Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="ghost" size="lg" className="px-8 py-3">
                  Watch Demo
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-12">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">$2.1B+</div>
                  <p className="text-sm text-muted-foreground">Claims paid</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <p className="text-sm text-muted-foreground">Customer support</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 lg:p-12">
                  <div className="bg-card rounded-xl shadow-xl p-6">
                    <h3 className="font-semibold mb-4">Get Your Quote</h3>
                    <div className="space-y-4">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-sm text-muted-foreground">Coverage Type</div>
                        <div className="font-medium">Auto Insurance</div>
                      </div>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="text-sm text-muted-foreground">Monthly Premium</div>
                        <div className="text-xl font-bold text-primary">$89</div>
                      </div>
                      <Button className="w-full">
                        Get This Quote
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-gradient-to-r from-primary/5 to-secondary/5 py-16 md:py-24 lg:py-32 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            Your Safety, Our Priority
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
            Get comprehensive insurance coverage with personalized quotes in minutes. 
            Protect your family, home, and future with trusted insurance solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-8 py-3">
              Get Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}