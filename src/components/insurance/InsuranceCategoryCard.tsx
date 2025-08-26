import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { 
  Car, 
  Home, 
  Heart, 
  Briefcase, 
  Bike,
  Plane,
  Shield,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

interface InsuranceCategoryCardProps {
  type: "auto" | "home" | "life" | "business" | "motorcycle" | "travel";
  variant?: "default" | "compact" | "featured";
  className?: string;
}

const categoryData = {
  auto: {
    icon: Car,
    title: "Auto Insurance",
    description: "Comprehensive coverage for your vehicle with competitive rates and excellent service.",
    features: ["Collision Coverage", "Liability Protection", "Comprehensive Coverage", "Rental Car Coverage"],
    startingPrice: "$89",
    popular: true,
    badge: "Most Popular"
  },
  home: {
    icon: Home,
    title: "Home Insurance",
    description: "Protect your home and belongings with comprehensive homeowner's insurance.",
    features: ["Property Coverage", "Personal Belongings", "Liability Protection", "Additional Living Expenses"],
    startingPrice: "$156",
    popular: false,
    badge: "Best Value"
  },
  life: {
    icon: Heart,
    title: "Life Insurance",
    description: "Secure your family's financial future with flexible life insurance options.",
    features: ["Term Life", "Whole Life", "Universal Life", "Accidental Death"],
    startingPrice: "$45",
    popular: false,
    badge: "Essential"
  },
  business: {
    icon: Briefcase,
    title: "Business Insurance",
    description: "Comprehensive protection for your business operations and assets.",
    features: ["General Liability", "Property Coverage", "Workers' Compensation", "Cyber Insurance"],
    startingPrice: "$299",
    popular: false,
    badge: "Professional"
  },
  motorcycle: {
    icon: Bike,
    title: "Motorcycle Insurance",
    description: "Specialized coverage for motorcycle riders with flexible options.",
    features: ["Collision Coverage", "Comprehensive", "Medical Payments", "Uninsured Motorist"],
    startingPrice: "$67",
    popular: false,
    badge: "Specialized"
  },
  travel: {
    icon: Plane,
    title: "Travel Insurance",
    description: "Protection for your trips with coverage for cancellations and emergencies.",
    features: ["Trip Cancellation", "Medical Coverage", "Baggage Protection", "Emergency Evacuation"],
    startingPrice: "$29",
    popular: false,
    badge: "Flexible"
  }
};

export function InsuranceCategoryCard({ type, variant = "default", className = "" }: InsuranceCategoryCardProps) {
  const data = categoryData[type];
  const IconComponent = data.icon;

  if (variant === "compact") {
    return (
      <Card className={`p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{data.title}</h3>
            <div className="text-sm text-muted-foreground">Starting at <span className="font-semibold text-primary">{data.startingPrice}/month</span></div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {data.description}
        </p>
        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          Get Quote
          <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card className={`p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden ${data.popular ? 'border-primary ring-1 ring-primary' : ''} ${className}`}>
        {data.popular && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
            {data.badge}
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <IconComponent className="h-6 w-6 text-primary" />
          </div>
          {!data.popular && (
            <Badge variant="secondary" className="text-xs">
              {data.badge}
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-2">{data.title}</h3>
        <p className="text-muted-foreground mb-4">{data.description}</p>

        <div className="space-y-2 mb-6">
          {data.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-muted-foreground">Starting at</div>
            <div className="text-2xl font-bold text-primary">{data.startingPrice}<span className="text-sm text-muted-foreground">/month</span></div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="text-sm font-medium">4.8</span>
            <span className="text-sm text-muted-foreground">(2.1k reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="group-hover:border-primary transition-colors">
            Learn More
          </Button>
          <Button className="group-hover:bg-primary/90 transition-colors">
            Get Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <Badge variant="outline" className="text-xs">
          {data.badge}
        </Badge>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">{data.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{data.description}</p>

      <div className="space-y-2 mb-6">
        {data.features.slice(0, 3).map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">{feature}</span>
          </div>
        ))}
        {data.features.length > 3 && (
          <div className="text-sm text-primary">+ {data.features.length - 3} more features</div>
        )}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground">Starting at</div>
          <div className="text-xl font-bold text-primary">{data.startingPrice}<span className="text-sm text-muted-foreground">/month</span></div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="text-sm font-medium">4.8</span>
        </div>
      </div>

      <Button className="w-full group-hover:bg-primary/90 transition-colors">
        Get Free Quote
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
}