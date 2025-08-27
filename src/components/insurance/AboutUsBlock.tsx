import { Button } from "../ui/button";
import { CheckCircle, TrendingUp, Users, Award } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface AboutUsBlockProps {
  variant?: "default" | "stats" | "timeline";
  className?: string;
}

export function AboutUsBlock({ variant = "default", className = "" }: AboutUsBlockProps) {
  if (variant === "stats") {
    return (
      <section className={`bg-background py-16 md:py-24 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Millions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              For over 50 years, we've been protecting families and businesses with 
              reliable insurance coverage and exceptional customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2M+</div>
              <h3 className="font-semibold mb-1">Happy Customers</h3>
              <p className="text-sm text-muted-foreground">Nationwide coverage</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">$2.1B</div>
              <h3 className="font-semibold mb-1">Claims Paid</h3>
              <p className="text-sm text-muted-foreground">Last year alone</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <h3 className="font-semibold mb-1">Years Experience</h3>
              <p className="text-sm text-muted-foreground">Industry expertise</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <h3 className="font-semibold mb-1">Customer Rating</h3>
              <p className="text-sm text-muted-foreground">Excellent service</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop"
                  alt="About our company"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fast Claims Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Average claim settlement in 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">24/7 Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Round-the-clock customer assistance
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Competitive Rates</h4>
                    <p className="text-sm text-muted-foreground">
                      Best-in-class pricing with discounts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "timeline") {
    return (
      <section className={`bg-muted py-16 md:py-24 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small family business to a nationwide insurance leader
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 md:-ml-0.5 top-8 bottom-8 w-0.5 bg-border"></div>
              
              <div className="space-y-12">
                <div className="relative flex items-center">
                  <div className="absolute left-2 md:left-1/2 md:-ml-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                    <div className="bg-card p-6 rounded-xl shadow-sm">
                      <div className="text-primary font-bold mb-2">1972</div>
                      <h3 className="font-semibold mb-2">Company Founded</h3>
                      <p className="text-sm text-muted-foreground">
                        Started as a family business serving local community
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center md:justify-end">
                  <div className="absolute left-2 md:left-1/2 md:-ml-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                    <div className="bg-card p-6 rounded-xl shadow-sm">
                      <div className="text-primary font-bold mb-2">1985</div>
                      <h3 className="font-semibold mb-2">Statewide Expansion</h3>
                      <p className="text-sm text-muted-foreground">
                        Expanded coverage across the entire state
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center">
                  <div className="absolute left-2 md:left-1/2 md:-ml-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                    <div className="bg-card p-6 rounded-xl shadow-sm">
                      <div className="text-primary font-bold mb-2">2010</div>
                      <h3 className="font-semibold mb-2">Digital Platform Launch</h3>
                      <p className="text-sm text-muted-foreground">
                        Introduced online quotes and policy management
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center md:justify-end">
                  <div className="absolute left-2 md:left-1/2 md:-ml-2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8">
                    <div className="bg-card p-6 rounded-xl shadow-sm">
                      <div className="text-primary font-bold mb-2">2024</div>
                      <h3 className="font-semibold mb-2">AI-Powered Service</h3>
                      <p className="text-sm text-muted-foreground">
                        Leading innovation with AI-driven claims and support
                      </p>
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
    <section className={`bg-background py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              About Our Company
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              For over five decades, we've been committed to protecting what matters most to our customers. 
              Our comprehensive insurance solutions combine traditional values with modern innovation.
            </p>
            <p className="text-muted-foreground mb-8">
              We believe insurance should be simple, accessible, and tailored to your unique needs. 
              That's why we've invested in cutting-edge technology while maintaining the personal 
              touch that has made us a trusted partner for millions of families.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Growth</div>
                  <div className="text-sm text-muted-foreground">15% YoY</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Customers</div>
                  <div className="text-sm text-muted-foreground">2M+ served</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Awards</div>
                  <div className="text-sm text-muted-foreground">Industry leader</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Claims</div>
                  <div className="text-sm text-muted-foreground">98% satisfaction</div>
                </div>
              </div>
            </div>
            
            <Button>
              Learn More About Us
            </Button>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=500&fit=crop"
                  alt="About our company"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Years of Trust</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}