import { WireframeBox } from "../WireframeBox";

interface LandingWireframeProps {
  breakpoint: "sm" | "md" | "lg";
}

export function LandingWireframe({ breakpoint }: LandingWireframeProps) {
  if (breakpoint === "sm") {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <WireframeBox width={80} height={24}>LOGO</WireframeBox>
          <WireframeBox width={24} height={24}>☰</WireframeBox>
        </div>

        {/* Hero */}
        <div className="space-y-4">
          <WireframeBox height={32}>HERO TITLE</WireframeBox>
          <WireframeBox height={48}>DESCRIPTION TEXT AREA</WireframeBox>
          <WireframeBox height={40} filled>CTA BUTTON</WireframeBox>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <WireframeBox height={24}>FEATURES</WireframeBox>
          <div className="space-y-3">
            <WireframeBox height={80}>FEATURE 1</WireframeBox>
            <WireframeBox height={80}>FEATURE 2</WireframeBox>
            <WireframeBox height={80}>FEATURE 3</WireframeBox>
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-3">
          <WireframeBox height={24}>CTA TITLE</WireframeBox>
          <WireframeBox height={40} filled>GET STARTED</WireframeBox>
        </div>

        {/* Footer */}
        <WireframeBox height={120}>FOOTER</WireframeBox>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <WireframeBox width={120} height={32}>AI TOOLOGIST</WireframeBox>
        <div className="flex gap-6">
          <WireframeBox width={80} height={32}>DISCOVER</WireframeBox>
          <WireframeBox width={80} height={32}>COMPARE</WireframeBox>
          <WireframeBox width={80} height={32}>PRICING</WireframeBox>
          <WireframeBox width={80} height={32} filled>LOGIN</WireframeBox>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-6">
        <WireframeBox height={64}>DISCOVER THE BEST AI TOOLS</WireframeBox>
        <WireframeBox height={48}>SUBTITLE AND DESCRIPTION AREA</WireframeBox>
        <div className="flex justify-center gap-4">
          <WireframeBox width={160} height={48} filled>GET STARTED</WireframeBox>
          <WireframeBox width={160} height={48}>LEARN MORE</WireframeBox>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-6">
        <WireframeBox height={32} className="text-center">FEATURES</WireframeBox>
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-3">
            <WireframeBox height={80}>ICON</WireframeBox>
            <WireframeBox height={24}>FEATURE 1</WireframeBox>
            <WireframeBox height={48}>DESCRIPTION</WireframeBox>
          </div>
          <div className="space-y-3">
            <WireframeBox height={80}>ICON</WireframeBox>
            <WireframeBox height={24}>FEATURE 2</WireframeBox>
            <WireframeBox height={48}>DESCRIPTION</WireframeBox>
          </div>
          <div className="space-y-3">
            <WireframeBox height={80}>ICON</WireframeBox>
            <WireframeBox height={24}>FEATURE 3</WireframeBox>
            <WireframeBox height={48}>DESCRIPTION</WireframeBox>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4">
        <WireframeBox height={32}>READY TO GET STARTED?</WireframeBox>
        <WireframeBox width={200} height={48} filled className="mx-auto">START EXPLORING</WireframeBox>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-4 gap-6">
        <WireframeBox height={120}>COMPANY</WireframeBox>
        <WireframeBox height={120}>PRODUCT</WireframeBox>
        <WireframeBox height={120}>RESOURCES</WireframeBox>
        <WireframeBox height={120}>CONTACT</WireframeBox>
      </div>
    </div>
  );
}