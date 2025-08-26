import { useState } from "react";
import { AIButton } from "./AIButton";
import { AIInput } from "./AIInput";
import { AICard, ToolCard, StatCard, PricingCard } from "./AICard";
import { AIModal, ModalFooter } from "./AIModal";
import { AITag, StatusTag, CategoryTag } from "./AITag";
import { AIAvatar, AvatarGroup } from "./AIAvatar";
import { AIToggle } from "./AIToggle";
import { AITooltip } from "./AITooltip";
import { ToastProvider, useToast } from "./AIToast";
import { Card } from "../ui/card";
import { Search, Settings, Download, Copy } from "lucide-react";

interface ComponentShowcaseProps {
  component: string;
}

export function ComponentShowcase({ component }: ComponentShowcaseProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(false);

  const renderComponent = () => {
    switch (component) {
      case "Button":
        return <ButtonShowcase />;
      case "Input":
        return <InputShowcase />;
      case "Card":
        return <CardShowcase />;
      case "Modal":
        return <ModalShowcase modalOpen={modalOpen} setModalOpen={setModalOpen} />;
      case "Tag":
        return <TagShowcase />;
      case "Avatar":
        return <AvatarShowcase />;
      case "Toggle":
        return <ToggleShowcase toggleChecked={toggleChecked} setToggleChecked={setToggleChecked} />;
      case "Tooltip":
        return <TooltipShowcase />;
      case "Toast":
        return <ToastShowcase />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <ToastProvider>
      <div className="space-y-8">
        {renderComponent()}
      </div>
    </ToastProvider>
  );
}

function ButtonShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <div className="flex flex-wrap gap-4">
          <AIButton variant="primary">Primary</AIButton>
          <AIButton variant="secondary">Secondary</AIButton>
          <AIButton variant="outline">Outline</AIButton>
          <AIButton variant="ghost">Ghost</AIButton>
          <AIButton variant="destructive">Destructive</AIButton>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <AIButton size="sm">Small</AIButton>
          <AIButton size="md">Medium</AIButton>
          <AIButton size="lg">Large</AIButton>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Button States</h3>
        <div className="flex flex-wrap gap-4">
          <AIButton disabled>Disabled</AIButton>
          <AIButton loading>Loading</AIButton>
        </div>
      </div>
    </div>
  );
}

function InputShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Input Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <AIInput placeholder="Text input" label="Text Input" />
          <AIInput type="password" placeholder="Password" label="Password Input" />
          <AIInput type="search" placeholder="Search..." label="Search Input" />
          <AIInput type="email" placeholder="Email" label="Email Input" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Input with Icons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <AIInput 
            placeholder="Search tools..." 
            icon={<Search className="h-4 w-4" />}
            label="With Left Icon"
          />
          <AIInput 
            placeholder="Settings" 
            icon={<Settings className="h-4 w-4" />}
            iconPosition="right"
            label="With Right Icon"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Input States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <AIInput placeholder="Disabled input" disabled label="Disabled" />
          <AIInput placeholder="Error input" error label="Error State" />
        </div>
      </div>
    </div>
  );
}

function CardShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tool Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            title="ChatGPT"
            description="Advanced AI language model for conversational AI and content generation"
            category="AI Writing"
            rating={4.8}
            pricing="$20/month"
          />
          <ToolCard
            title="Midjourney"
            description="AI-powered image generation tool for creating stunning artwork"
            category="AI Art"
            rating={4.7}
            pricing="$30/month"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Stat Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Tools"
            value="1,247"
            change="+12%"
            trend="up"
            icon={<Download className="h-5 w-5" />}
          />
          <StatCard
            title="Active Users"
            value="24,501"
            change="+5%"
            trend="up"
          />
          <StatCard
            title="Comparisons"
            value="892"
            change="-2%"
            trend="down"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Pricing Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            plan="Free"
            price="$0"
            period="month"
            features={["5 tool searches", "Basic comparisons", "Community support"]}
          />
          <PricingCard
            plan="Pro"
            price="$19"
            period="month"
            features={["Unlimited searches", "Advanced comparisons", "Priority support", "API access"]}
            popular
          />
          <PricingCard
            plan="Enterprise"
            price="$99"
            period="month"
            features={["Everything in Pro", "Custom integrations", "Dedicated support", "Analytics dashboard"]}
          />
        </div>
      </div>
    </div>
  );
}

function ModalShowcase({ modalOpen, setModalOpen }: { modalOpen: boolean; setModalOpen: (open: boolean) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Modal Variants</h3>
        <div className="flex gap-4">
          <AIButton onClick={() => setModalOpen(true)}>Open Center Modal</AIButton>
        </div>
      </div>

      <AIModal
        variant="center"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="AI Tool Details"
        description="View detailed information about this AI tool"
      >
        <div className="space-y-4">
          <p>This is a sample modal content. You can put any content here including forms, images, or other components.</p>
          <div className="space-y-2">
            <AIInput placeholder="Tool name" label="Name" />
            <AIInput placeholder="Description" label="Description" />
          </div>
        </div>
        
        <ModalFooter>
          <AIButton variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </AIButton>
          <AIButton onClick={() => setModalOpen(false)}>
            Save Changes
          </AIButton>
        </ModalFooter>
      </AIModal>
    </div>
  );
}

function TagShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tag Variants</h3>
        <div className="flex flex-wrap gap-2">
          <AITag variant="category">Category</AITag>
          <AITag variant="pricing">Pricing</AITag>
          <AITag variant="status">Status</AITag>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Status Tags</h3>
        <div className="flex flex-wrap gap-2">
          <StatusTag status="free" />
          <StatusTag status="paid" />
          <StatusTag status="freemium" />
          <StatusTag status="beta" />
          <StatusTag status="new" />
          <StatusTag status="popular" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Category Tags</h3>
        <div className="flex flex-wrap gap-2">
          <CategoryTag category="AI Writing" />
          <CategoryTag category="Design" />
          <CategoryTag category="Analytics" />
          <CategoryTag category="Marketing" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Removable Tags</h3>
        <div className="flex flex-wrap gap-2">
          <AITag removable onRemove={() => {}}>Removable</AITag>
          <CategoryTag category="Writing" removable onRemove={() => {}} />
        </div>
      </div>
    </div>
  );
}

function AvatarShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Avatar Variants</h3>
        <div className="flex gap-4 items-center">
          <AIAvatar variant="user" />
          <AIAvatar variant="brand" />
          <AIAvatar src="https://github.com/shadcn.png" alt="User" />
          <AIAvatar fallback="JD" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Avatar Sizes</h3>
        <div className="flex gap-4 items-center">
          <AIAvatar size="sm" fallback="S" />
          <AIAvatar size="md" fallback="M" />
          <AIAvatar size="lg" fallback="L" />
          <AIAvatar size="xl" fallback="XL" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Avatar Group</h3>
        <AvatarGroup
          avatars={[
            { fallback: "JD" },
            { fallback: "SK" },
            { fallback: "ML" },
            { fallback: "AB" },
            { fallback: "CD" }
          ]}
          max={3}
        />
      </div>
    </div>
  );
}

function ToggleShowcase({ toggleChecked, setToggleChecked }: { toggleChecked: boolean; setToggleChecked: (checked: boolean) => void }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Toggle Variants</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AIToggle size="sm" />
            <span>Small toggle</span>
          </div>
          <div className="flex items-center gap-3">
            <AIToggle 
              size="md" 
              checked={toggleChecked}
              onCheckedChange={setToggleChecked}
            />
            <span>Medium toggle (controlled)</span>
          </div>
          <div className="flex items-center gap-3">
            <AIToggle size="lg" defaultChecked />
            <span>Large toggle</span>
          </div>
          <div className="flex items-center gap-3">
            <AIToggle disabled />
            <span>Disabled toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function TooltipShowcase() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tooltip Positions</h3>
        <div className="flex gap-8 justify-center">
          <AITooltip content="Top tooltip" side="top">
            <AIButton variant="outline">Top</AIButton>
          </AITooltip>
          <AITooltip content="Right tooltip" side="right">
            <AIButton variant="outline">Right</AIButton>
          </AITooltip>
          <AITooltip content="Bottom tooltip" side="bottom">
            <AIButton variant="outline">Bottom</AIButton>
          </AITooltip>
          <AITooltip content="Left tooltip" side="left">
            <AIButton variant="outline">Left</AIButton>
          </AITooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tooltip with Complex Content</h3>
        <div className="flex justify-center">
          <AITooltip 
            content={
              <div className="space-y-1">
                <p className="font-medium">AI Tool</p>
                <p className="text-xs">Click to view details</p>
              </div>
            }
          >
            <AIButton>Hover for info</AIButton>
          </AITooltip>
        </div>
      </div>
    </div>
  );
}

function ToastShowcase() {
  const { addToast } = useToast();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Toast Variants</h3>
        <div className="flex flex-wrap gap-4">
          <AIButton 
            variant="outline"
            onClick={() => addToast({
              variant: "success",
              title: "Success!",
              description: "Tool has been saved successfully."
            })}
          >
            Success Toast
          </AIButton>
          <AIButton 
            variant="outline"
            onClick={() => addToast({
              variant: "error",
              title: "Error!",
              description: "Failed to save the tool."
            })}
          >
            Error Toast
          </AIButton>
          <AIButton 
            variant="outline"
            onClick={() => addToast({
              variant: "warning",
              title: "Warning!",
              description: "This action cannot be undone."
            })}
          >
            Warning Toast
          </AIButton>
          <AIButton 
            variant="outline"
            onClick={() => addToast({
              variant: "info",
              title: "Info",
              description: "New features are available."
            })}
          >
            Info Toast
          </AIButton>
        </div>
      </div>
    </div>
  );
}