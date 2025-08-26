import { WireframeBox } from "../WireframeBox";

interface CompareWireframeProps {
  breakpoint: "sm" | "md" | "lg";
}

export function CompareWireframe({ breakpoint }: CompareWireframeProps) {
  if (breakpoint === "sm") {
    return (
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <WireframeBox width={80} height={24}>LOGO</WireframeBox>
          <WireframeBox width={24} height={24}>☰</WireframeBox>
        </div>

        {/* Tool Selection */}
        <div className="space-y-3">
          <WireframeBox height={40}>SELECT TOOL 1</WireframeBox>
          <WireframeBox height={40}>SELECT TOOL 2</WireframeBox>
        </div>

        {/* Comparison Cards */}
        <div className="space-y-6">
          <div className="space-y-3">
            <WireframeBox height={80}>TOOL 1 OVERVIEW</WireframeBox>
            <WireframeBox height={60}>FEATURES</WireframeBox>
            <WireframeBox height={40}>PRICING</WireframeBox>
            <WireframeBox height={40}>RATING</WireframeBox>
          </div>

          <WireframeBox height={2} className="bg-black"></WireframeBox>

          <div className="space-y-3">
            <WireframeBox height={80}>TOOL 2 OVERVIEW</WireframeBox>
            <WireframeBox height={60}>FEATURES</WireframeBox>
            <WireframeBox height={40}>PRICING</WireframeBox>
            <WireframeBox height={40}>RATING</WireframeBox>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <WireframeBox height={40} filled>CHOOSE TOOL 1</WireframeBox>
          <WireframeBox height={40} filled>CHOOSE TOOL 2</WireframeBox>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <WireframeBox width={120} height={32}>AI TOOLOGIST</WireframeBox>
        <WireframeBox width={80} height={32} filled>LOGIN</WireframeBox>
      </div>

      {/* Tool Selection */}
      <div className="flex gap-4 items-center">
        <WireframeBox width={200} height={40}>SELECT TOOL 1</WireframeBox>
        <WireframeBox width={40} height={40}>VS</WireframeBox>
        <WireframeBox width={200} height={40}>SELECT TOOL 2</WireframeBox>
        <WireframeBox width={100} height={40} filled>COMPARE</WireframeBox>
      </div>

      {/* Comparison Table */}
      <div className="grid grid-cols-3 gap-px bg-black">
        {/* Header Row */}
        <WireframeBox height={48} className="border-0">FEATURES</WireframeBox>
        <WireframeBox height={48} className="border-0">TOOL 1</WireframeBox>
        <WireframeBox height={48} className="border-0">TOOL 2</WireframeBox>

        {/* Overview */}
        <WireframeBox height={80} className="border-0">OVERVIEW</WireframeBox>
        <WireframeBox height={80} className="border-0">TOOL 1 DETAILS</WireframeBox>
        <WireframeBox height={80} className="border-0">TOOL 2 DETAILS</WireframeBox>

        {/* Features */}
        <WireframeBox height={60} className="border-0">KEY FEATURES</WireframeBox>
        <WireframeBox height={60} className="border-0">✓ FEATURE A<br/>✓ FEATURE B<br/>✗ FEATURE C</WireframeBox>
        <WireframeBox height={60} className="border-0">✓ FEATURE A<br/>✗ FEATURE B<br/>✓ FEATURE C</WireframeBox>

        {/* Pricing */}
        <WireframeBox height={40} className="border-0">PRICING</WireframeBox>
        <WireframeBox height={40} className="border-0">$19/MONTH</WireframeBox>
        <WireframeBox height={40} className="border-0">$29/MONTH</WireframeBox>

        {/* Free Trial */}
        <WireframeBox height={40} className="border-0">FREE TRIAL</WireframeBox>
        <WireframeBox height={40} className="border-0">14 DAYS</WireframeBox>
        <WireframeBox height={40} className="border-0">7 DAYS</WireframeBox>

        {/* Support */}
        <WireframeBox height={40} className="border-0">SUPPORT</WireframeBox>
        <WireframeBox height={40} className="border-0">EMAIL + CHAT</WireframeBox>
        <WireframeBox height={40} className="border-0">EMAIL ONLY</WireframeBox>

        {/* Rating */}
        <WireframeBox height={40} className="border-0">RATING</WireframeBox>
        <WireframeBox height={40} className="border-0">4.5/5 ⭐</WireframeBox>
        <WireframeBox height={40} className="border-0">4.2/5 ⭐</WireframeBox>

        {/* Actions */}
        <WireframeBox height={48} className="border-0"></WireframeBox>
        <WireframeBox height={48} className="border-0" filled>CHOOSE THIS TOOL</WireframeBox>
        <WireframeBox height={48} className="border-0" filled>CHOOSE THIS TOOL</WireframeBox>
      </div>

      {/* Additional Actions */}
      <div className="flex justify-center gap-4">
        <WireframeBox width={150} height={40}>ADD MORE TOOLS</WireframeBox>
        <WireframeBox width={150} height={40}>SAVE COMPARISON</WireframeBox>
        <WireframeBox width={150} height={40}>SHARE COMPARISON</WireframeBox>
      </div>
    </div>
  );
}