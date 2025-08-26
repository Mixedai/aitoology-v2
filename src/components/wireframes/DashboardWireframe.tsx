import { WireframeBox } from "../WireframeBox";

interface DashboardWireframeProps {
  breakpoint: "sm" | "md" | "lg";
}

export function DashboardWireframe({ breakpoint }: DashboardWireframeProps) {
  if (breakpoint === "sm") {
    return (
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <WireframeBox width={80} height={24}>LOGO</WireframeBox>
          <WireframeBox width={32} height={24}>👤</WireframeBox>
        </div>

        {/* User Info */}
        <div className="space-y-2">
          <WireframeBox height={24}>WELCOME BACK, USER</WireframeBox>
          <WireframeBox height={40}>SUBSCRIPTION STATUS</WireframeBox>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <WireframeBox height={60}>TOOLS SAVED</WireframeBox>
          <WireframeBox height={60}>COMPARISONS</WireframeBox>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <WireframeBox height={24}>RECENT ACTIVITY</WireframeBox>
          <WireframeBox height={40}>ACTIVITY 1</WireframeBox>
          <WireframeBox height={40}>ACTIVITY 2</WireframeBox>
          <WireframeBox height={40}>ACTIVITY 3</WireframeBox>
        </div>

        {/* Saved Tools */}
        <div className="space-y-3">
          <WireframeBox height={24}>SAVED TOOLS</WireframeBox>
          <WireframeBox height={80}>TOOL 1</WireframeBox>
          <WireframeBox height={80}>TOOL 2</WireframeBox>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <WireframeBox height={40} filled>DISCOVER TOOLS</WireframeBox>
          <WireframeBox height={40}>UPGRADE PLAN</WireframeBox>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <WireframeBox width={120} height={32}>AI TOOLOGIST</WireframeBox>
        <div className="flex gap-4 items-center">
          <WireframeBox width={100} height={32}>PROFILE</WireframeBox>
          <WireframeBox width={32} height={32}>🔔</WireframeBox>
          <WireframeBox width={32} height={32}>👤</WireframeBox>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <WireframeBox width={300} height={32}>WELCOME BACK, JOHN DOE</WireframeBox>
          <WireframeBox width={200} height={24}>LAST LOGIN: 2 HOURS AGO</WireframeBox>
        </div>
        <WireframeBox width={150} height={40} filled>UPGRADE TO PRO</WireframeBox>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="space-y-2">
          <WireframeBox height={60}>42</WireframeBox>
          <WireframeBox height={24}>TOOLS SAVED</WireframeBox>
        </div>
        <div className="space-y-2">
          <WireframeBox height={60}>18</WireframeBox>
          <WireframeBox height={24}>COMPARISONS</WireframeBox>
        </div>
        <div className="space-y-2">
          <WireframeBox height={60}>156</WireframeBox>
          <WireframeBox height={24}>SEARCHES</WireframeBox>
        </div>
        <div className="space-y-2">
          <WireframeBox height={60}>PRO</WireframeBox>
          <WireframeBox height={24}>SUBSCRIPTION</WireframeBox>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Usage Chart */}
        <div className="space-y-4">
          <WireframeBox height={32}>USAGE ANALYTICS</WireframeBox>
          <WireframeBox height={200}>CHART AREA</WireframeBox>
        </div>

        {/* Subscription Info */}
        <div className="space-y-4">
          <WireframeBox height={32}>SUBSCRIPTION DETAILS</WireframeBox>
          <div className="space-y-3">
            <WireframeBox height={40}>PLAN: PROFESSIONAL</WireframeBox>
            <WireframeBox height={40}>NEXT BILLING: MAR 15</WireframeBox>
            <WireframeBox height={40}>AMOUNT: $29/MONTH</WireframeBox>
            <div className="grid grid-cols-2 gap-3">
              <WireframeBox height={40}>MANAGE</WireframeBox>
              <WireframeBox height={40} filled>UPGRADE</WireframeBox>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Saved Tools */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <WireframeBox height={32}>RECENT ACTIVITY</WireframeBox>
          <div className="space-y-2">
            <WireframeBox height={40}>COMPARED CHATGPT VS CLAUDE</WireframeBox>
            <WireframeBox height={40}>SAVED MIDJOURNEY</WireframeBox>
            <WireframeBox height={40}>SEARCHED "VIDEO EDITING"</WireframeBox>
            <WireframeBox height={40}>UPDATED PROFILE</WireframeBox>
          </div>
        </div>

        <div className="space-y-4">
          <WireframeBox height={32}>SAVED TOOLS (5)</WireframeBox>
          <div className="space-y-2">
            <WireframeBox height={40}>CHATGPT - AI WRITING</WireframeBox>
            <WireframeBox height={40}>FIGMA - DESIGN</WireframeBox>
            <WireframeBox height={40}>NOTION - PRODUCTIVITY</WireframeBox>
            <WireframeBox height={32}>VIEW ALL</WireframeBox>
          </div>
        </div>
      </div>
    </div>
  );
}