import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { 
  Car, 
  Home, 
  Heart, 
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OfferFormProps {
  className?: string;
}

interface FormData {
  insuranceType: string;
  // Auto insurance details
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  // Home insurance details
  homeValue?: string;
  homeAge?: string;
  homeType?: string;
  // Life insurance details
  coverage?: string;
  beneficiaries?: string;
  // Contact details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  marketingConsent: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

export function OfferForm({ className = "" }: OfferFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    insuranceType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    marketingConsent: false
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { number: 1, title: "Insurance Type", description: "Choose your coverage" },
    { number: 2, title: "Details", description: "Tell us more" },
    { number: 3, title: "Contact", description: "Get your quote" }
  ];

  const insuranceTypes = [
    {
      id: "auto",
      title: "Auto Insurance",
      description: "Protect your vehicle with comprehensive coverage",
      icon: Car,
      popular: true
    },
    {
      id: "home",
      title: "Home Insurance", 
      description: "Safeguard your home and belongings",
      icon: Home,
      popular: false
    },
    {
      id: "life",
      title: "Life Insurance",
      description: "Secure your family's financial future",
      icon: Heart,
      popular: false
    },
    {
      id: "business",
      title: "Business Insurance",
      description: "Comprehensive protection for your business",
      icon: Briefcase,
      popular: false
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      if (!formData.insuranceType) {
        newErrors.insuranceType = "Please select an insurance type";
      }
    }

    if (step === 2) {
      if (formData.insuranceType === "auto") {
        if (!formData.vehicleYear) newErrors.vehicleYear = "Vehicle year is required";
        if (!formData.vehicleMake) newErrors.vehicleMake = "Vehicle make is required";
        if (!formData.vehicleModel) newErrors.vehicleModel = "Vehicle model is required";
      }
      if (formData.insuranceType === "home") {
        if (!formData.homeValue) newErrors.homeValue = "Home value is required";
        if (!formData.homeAge) newErrors.homeAge = "Home age is required";
        if (!formData.homeType) newErrors.homeType = "Home type is required";
      }
      if (formData.insuranceType === "life") {
        if (!formData.coverage) newErrors.coverage = "Coverage amount is required";
        if (!formData.beneficiaries) newErrors.beneficiaries = "Number of beneficiaries is required";
      }
    }

    if (step === 3) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 2000);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const progress = (currentStep / 3) * 100;

  if (isSubmitted) {
    return (
      <section className={`bg-background py-16 md:py-24 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-8 md:p-12 shadow-lg">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-success" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Quote Request Submitted!
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for choosing us. We'll contact you within 24 hours with your personalized quote.
              </p>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Reference Number: <span className="font-mono font-medium">INS-{Date.now().toString().slice(-6)}</span>
                </p>
                <Button onClick={() => window.location.reload()} className="w-full sm:w-auto">
                  Submit Another Quote
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-gradient-to-br from-primary/5 to-secondary/5 py-16 md:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get Your Free Quote
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Answer a few quick questions to receive a personalized insurance quote tailored to your needs.
          </p>
        </div>

        <div className="space-y-8">
          {/* Progress Indicator */}
          <Card className="p-6 shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Step {currentStep} of 3</h3>
                <Badge variant="outline" className="text-xs">
                  {Math.round(progress)}% Complete
                </Badge>
              </div>
              
              <Progress value={progress} className="h-2" />
              
              <div className="grid grid-cols-3 gap-4">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className={`text-center p-3 rounded-lg transition-colors ${
                      step.number === currentStep
                        ? "bg-primary/10 border border-primary/20"
                        : step.number < currentStep
                        ? "bg-success/10 border border-success/20"
                        : "bg-muted/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${
                      step.number === currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.number < currentStep
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step.number < currentStep ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <span className="text-sm font-medium">{step.number}</span>
                      )}
                    </div>
                    <h4 className="font-medium text-sm">{step.title}</h4>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Form Content */}
          <Card className="p-6 md:p-8 shadow-lg">
            <AnimatePresence mode="wait">
              {/* Step 1: Insurance Type */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      What type of insurance are you looking for?
                    </h3>
                    <p className="text-muted-foreground">
                      Select the insurance type that best fits your needs.
                    </p>
                  </div>

                  <RadioGroup
                    value={formData.insuranceType}
                    onValueChange={(value) => updateFormData("insuranceType", value)}
                    className="space-y-4"
                  >
                    {insuranceTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div key={type.id} className="relative">
                          <RadioGroupItem
                            value={type.id}
                            id={type.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={type.id}
                            className={`block p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                              formData.insuranceType === type.id
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                formData.insuranceType === type.id
                                  ? "bg-primary/20"
                                  : "bg-muted"
                              }`}>
                                <IconComponent className={`h-6 w-6 ${
                                  formData.insuranceType === type.id
                                    ? "text-primary"
                                    : "text-muted-foreground"
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold">{type.title}</h4>
                                  {type.popular && (
                                    <Badge className="text-xs">Popular</Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {errors.insuranceType && (
                    <div className="flex items-center gap-2 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.insuranceType}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Tell us more about your {formData.insuranceType} insurance needs
                    </h3>
                    <p className="text-muted-foreground">
                      This information helps us provide you with an accurate quote.
                    </p>
                  </div>

                  {/* Auto Insurance Details */}
                  {formData.insuranceType === "auto" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleYear">Vehicle Year</Label>
                        <Select 
                          value={formData.vehicleYear} 
                          onValueChange={(value) => updateFormData("vehicleYear", value)}
                        >
                          <SelectTrigger className={`bg-white border rounded-md p-4 ${errors.vehicleYear ? 'border-destructive' : 'border-border'}`}>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i).map(year => (
                              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.vehicleYear && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.vehicleYear}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicleMake">Vehicle Make</Label>
                        <Select 
                          value={formData.vehicleMake} 
                          onValueChange={(value) => updateFormData("vehicleMake", value)}
                        >
                          <SelectTrigger className={`bg-white border rounded-md p-4 ${errors.vehicleMake ? 'border-destructive' : 'border-border'}`}>
                            <SelectValue placeholder="Select make" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="toyota">Toyota</SelectItem>
                            <SelectItem value="honda">Honda</SelectItem>
                            <SelectItem value="ford">Ford</SelectItem>
                            <SelectItem value="chevrolet">Chevrolet</SelectItem>
                            <SelectItem value="nissan">Nissan</SelectItem>
                            <SelectItem value="bmw">BMW</SelectItem>
                            <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.vehicleMake && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.vehicleMake}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="vehicleModel">Vehicle Model</Label>
                        <Input
                          id="vehicleModel"
                          placeholder="e.g., Camry, Accord, F-150"
                          value={formData.vehicleModel || ""}
                          onChange={(e) => updateFormData("vehicleModel", e.target.value)}
                          className={`bg-white border rounded-md p-4 ${errors.vehicleModel ? 'border-destructive' : 'border-border'}`}
                        />
                        {errors.vehicleModel && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.vehicleModel}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Info className="h-3 w-3" />
                          This helps us determine the right coverage for your vehicle
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Home Insurance Details */}
                  {formData.insuranceType === "home" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="homeValue">Estimated Home Value</Label>
                        <Select 
                          value={formData.homeValue} 
                          onValueChange={(value) => updateFormData("homeValue", value)}
                        >
                          <SelectTrigger className={`bg-white border rounded-md p-4 ${errors.homeValue ? 'border-destructive' : 'border-border'}`}>
                            <SelectValue placeholder="Select value range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-100k">Under $100,000</SelectItem>
                            <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                            <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                            <SelectItem value="500k-750k">$500,000 - $750,000</SelectItem>
                            <SelectItem value="750k-1m">$750,000 - $1,000,000</SelectItem>
                            <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.homeValue && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.homeValue}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="homeAge">Home Age</Label>
                        <Select 
                          value={formData.homeAge} 
                          onValueChange={(value) => updateFormData("homeAge", value)}
                        >
                          <SelectTrigger className={`bg-white border rounded-md p-4 ${errors.homeAge ? 'border-destructive' : 'border-border'}`}>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New Construction</SelectItem>
                            <SelectItem value="0-10">0-10 years</SelectItem>
                            <SelectItem value="11-25">11-25 years</SelectItem>
                            <SelectItem value="26-50">26-50 years</SelectItem>
                            <SelectItem value="over-50">Over 50 years</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.homeAge && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.homeAge}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="homeType">Home Type</Label>
                        <RadioGroup
                          value={formData.homeType}
                          onValueChange={(value) => updateFormData("homeType", value)}
                          className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                          {["Single Family", "Townhouse", "Condo", "Mobile Home"].map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <RadioGroupItem value={type.toLowerCase().replace(" ", "-")} id={type} />
                              <Label htmlFor={type} className="text-sm cursor-pointer">{type}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                        {errors.homeType && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.homeType}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Life Insurance Details */}
                  {formData.insuranceType === "life" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="coverage">Desired Coverage Amount</Label>
                        <Select 
                          value={formData.coverage} 
                          onValueChange={(value) => updateFormData("coverage", value)}
                        >
                          <SelectTrigger className={`bg-white border rounded-md p-4 ${errors.coverage ? 'border-destructive' : 'border-border'}`}>
                            <SelectValue placeholder="Select coverage amount" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100k">$100,000</SelectItem>
                            <SelectItem value="250k">$250,000</SelectItem>
                            <SelectItem value="500k">$500,000</SelectItem>
                            <SelectItem value="750k">$750,000</SelectItem>
                            <SelectItem value="1m">$1,000,000</SelectItem>
                            <SelectItem value="over-1m">Over $1,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.coverage && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.coverage}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="beneficiaries">Number of Beneficiaries</Label>
                        <Select 
                          value={formData.beneficiaries} 
                          onValueChange={(value) => updateFormData("beneficiaries", value)}
                        >
                          <SelectTrigger className={`bg-white border rounded-md p-4 ${errors.beneficiaries ? 'border-destructive' : 'border-border'}`}>
                            <SelectValue placeholder="Select number" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Beneficiary</SelectItem>
                            <SelectItem value="2">2 Beneficiaries</SelectItem>
                            <SelectItem value="3">3 Beneficiaries</SelectItem>
                            <SelectItem value="4+">4+ Beneficiaries</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.beneficiaries && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.beneficiaries}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Business Insurance Details */}
                  {formData.insuranceType === "business" && (
                    <div className="space-y-6">
                      <div className="bg-muted/50 p-6 rounded-lg border">
                        <h4 className="font-semibold mb-2">Business Insurance Quote</h4>
                        <p className="text-sm text-muted-foreground">
                          Business insurance requires additional consultation. Our specialists will contact you 
                          to discuss your specific business needs and provide a customized quote.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Contact */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Contact Information
                    </h3>
                    <p className="text-muted-foreground">
                      We'll use this information to send you your personalized quote.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={(e) => updateFormData("firstName", e.target.value)}
                        className={`bg-white border rounded-md p-4 ${errors.firstName ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={(e) => updateFormData("lastName", e.target.value)}
                        className={`bg-white border rounded-md p-4 ${errors.lastName ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className={`bg-white border rounded-md p-4 ${errors.email ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.email}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        We'll send your quote to this email address
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        className={`bg-white border rounded-md p-4 ${errors.phone ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="12345"
                        value={formData.zipCode}
                        onChange={(e) => updateFormData("zipCode", e.target.value)}
                        className={`bg-white border rounded-md p-4 max-w-xs ${errors.zipCode ? 'border-destructive' : 'border-border'}`}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.zipCode}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        Helps us provide location-specific rates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketingConsent"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => updateFormData("marketingConsent", checked)}
                    />
                    <Label htmlFor="marketingConsent" className="text-sm cursor-pointer">
                      I agree to receive marketing communications and special offers
                    </Label>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <p className="text-sm text-muted-foreground">
                      By submitting this form, you agree to our{" "}
                      <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
                      <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                      We'll never share your information with third parties.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-4">
                {currentStep < 3 ? (
                  <Button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get My Quote
                        <ChevronRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}