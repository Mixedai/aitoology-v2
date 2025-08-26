import { motion } from "framer-motion";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface PartnerLogosRowProps {
  variant?: "default" | "minimal" | "animated";
  title?: string;
  className?: string;
}

const partnerLogos = [
  { name: "Liberty Mutual", logo: "LM" },
  { name: "State Farm", logo: "SF" },
  { name: "Progressive", logo: "PR" },
  { name: "Allstate", logo: "AS" },
  { name: "GEICO", logo: "GE" },
  { name: "Nationwide", logo: "NW" },
  { name: "Farmers", logo: "FM" },
  { name: "USAA", logo: "UA" }
];

export function PartnerLogosRow({ 
  variant = "default", 
  title = "Trusted by Leading Insurance Partners",
  className = "" 
}: PartnerLogosRowProps) {
  
  if (variant === "minimal") {
    return (
      <section className={`bg-muted py-8 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {partnerLogos.map((partner, index) => (
              <div
                key={index}
                className="w-16 h-16 bg-background rounded-lg flex items-center justify-center shadow-sm opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="text-xs font-bold text-muted-foreground">
                  {partner.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "animated") {
    return (
      <section className={`bg-background py-12 overflow-hidden ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {title && (
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
              <p className="text-muted-foreground">
                Working with industry leaders to bring you the best coverage
              </p>
            </div>
          )}
          
          <div className="relative">
            <motion.div
              className="flex gap-12 items-center"
              animate={{
                x: [0, -100 * partnerLogos.length]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear"
                }
              }}
            >
              {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-24 h-24 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-sm font-bold text-foreground">
                    {partner.logo}
                  </span>
                </div>
              ))}
            </motion.div>
            
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-muted py-16 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
            <p className="text-muted-foreground">
              Partnering with industry leaders to provide comprehensive coverage options
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {partnerLogos.map((partner, index) => (
            <div
              key={index}
              className="aspect-square bg-background rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                  <span className="text-sm font-bold text-primary">
                    {partner.logo}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Licensed and regulated in all 50 states</span>
          </div>
        </div>
      </div>
    </section>
  );
}