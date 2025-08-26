import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { X, CreditCard, Lock, CheckCircle, Loader2 } from "lucide-react";
import { AIInput } from "../ui-kit/AIInput";
import { motion, AnimatePresence } from "framer-motion";

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  plan?: {
    name: string;
    price: string;
    period: string;
    features: string[];
  };
}

export function StripeCheckoutModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  plan = {
    name: "Professional",
    price: "$29",
    period: "month",
    features: [
      "Unlimited AI tool searches",
      "Advanced comparison features", 
      "API access with higher limits",
      "Priority customer support",
      "Early access to new features"
    ]
  }
}: StripeCheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"payment" | "processing" | "success">("payment");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStep("processing");

    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
      setTimeout(() => {
        onSuccess();
        onClose();
        setStep("payment");
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md mx-4"
        >
          <Card className="p-0 overflow-hidden">
            {step === "payment" && (
              <>
                {/* Header */}
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Complete your purchase</h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Plan Summary */}
                <div className="p-6 bg-muted/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">{plan.name} Plan</h3>
                      <p className="text-sm text-muted-foreground">
                        Billed {plan.period}ly
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {plan.price}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per {plan.period}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <AIInput
                      type="email"
                      placeholder="your@email.com"
                      defaultValue="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Card information
                    </label>
                    <div className="space-y-2">
                      <AIInput
                        placeholder="1234 1234 1234 1234"
                        icon={<CreditCard className="h-4 w-4" />}
                        required
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <AIInput placeholder="MM / YY" required />
                        <AIInput placeholder="CVC" required />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Cardholder name
                    </label>
                    <AIInput
                      placeholder="Full name on card"
                      defaultValue="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Country or region
                    </label>
                    <AIInput
                      placeholder="United States"
                      defaultValue="United States"
                      required
                    />
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total due today</span>
                    <span>{plan.price}</span>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isProcessing}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Subscribe {plan.price}/{plan.period}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Your payment information is secure and encrypted.
                  </p>
                </form>
              </>
            )}

            {step === "processing" && (
              <div className="p-12 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Processing payment...</h3>
                <p className="text-muted-foreground">
                  Please don't close this window while we process your payment.
                </p>
              </div>
            )}

            {step === "success" && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Payment successful!</h3>
                <p className="text-muted-foreground">
                  Welcome to AI Toologist {plan.name}. You'll be redirected to your dashboard shortly.
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}