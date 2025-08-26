import { WireframeBox } from "../WireframeBox";

interface DiscoverWireframeProps {
  breakpoint: "sm" | "md" | "lg";
}

export function DiscoverWireframe({ breakpoint }: DiscoverWireframeProps) {
  if (breakpoint === "sm") {
    return (
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <WireframeBox width={80} height={24}>LOGO</WireframeBox>
          <WireframeBox width={24} height={24}>☰</WireframeBox>
        </div>

        {/* Search */}
        <WireframeBox height={40}>SEARCH BAR</WireframeBox>

        {/* Filter Toggle */}
        <WireframeBox height={32} filled>FILTERS</WireframeBox>

        {/* Tool Cards */}
        <div className="space-y-4">
          <WireframeBox height={120}>TOOL CARD 1</WireframeBox>
          <WireframeBox height={120}>TOOL CARD 2</WireframeBox>
          <WireframeBox height={120}>TOOL CARD 3</WireframeBox>
          <WireframeBox height={120}>TOOL CARD 4</WireframeBox>
        </div>

        {/* Load More */}
        <WireframeBox height={40}>LOAD MORE</WireframeBox>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <WireframeBox width={120} height={32}>AI TOOLOGIST</WireframeBox>
        <div className="flex gap-4">
          <WireframeBox width={300} height={32}>SEARCH BAR</WireframeBox>
          <WireframeBox width={80} height={32} filled>LOGIN</WireframeBox>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className="w-64 space-y-4">
          <WireframeBox height={32}>FILTERS</WireframeBox>
          
          <div className="space-y-3">
            <WireframeBox height={24}>CATEGORY</WireframeBox>
            <div className="space-y-2 pl-3">
              <WireframeBox height={20}>□ Writing</WireframeBox>
              <WireframeBox height={20}>□ Design</WireframeBox>
              <WireframeBox height={20}>□ Analytics</WireframeBox>
              <WireframeBox height={20}>□ Marketing</WireframeBox>
            </div>
          </div>

          <div className="space-y-3">
            <WireframeBox height={24}>PRICING</WireframeBox>
            <div className="space-y-2 pl-3">
              <WireframeBox height={20}>□ Free</WireframeBox>
              <WireframeBox height={20}>□ Paid</WireframeBox>
              <WireframeBox height={20}>□ Freemium</WireframeBox>
            </div>
          </div>

          <div className="space-y-3">
            <WireframeBox height={24}>RATING</WireframeBox>
            <div className="space-y-2 pl-3">
              <WireframeBox height={20}>☆☆☆☆☆</WireframeBox>
              <WireframeBox height={20}>☆☆☆☆</WireframeBox>
              <WireframeBox height={20}>☆☆☆</WireframeBox>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Sort & View */}
          <div className="flex justify-between items-center">
            <WireframeBox width={120} height={32}>SORT BY</WireframeBox>
            <div className="flex gap-2">
              <WireframeBox width={32} height={32}>⊞</WireframeBox>
              <WireframeBox width={32} height={32}>☰</WireframeBox>
            </div>
          </div>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="space-y-3">
                <WireframeBox height={120}>TOOL IMAGE</WireframeBox>
                <WireframeBox height={24}>TOOL NAME</WireframeBox>
                <WireframeBox height={48}>DESCRIPTION</WireframeBox>
                <div className="flex justify-between">
                  <WireframeBox width={60} height={20}>RATING</WireframeBox>
                  <WireframeBox width={60} height={20}>PRICE</WireframeBox>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2">
            <WireframeBox width={32} height={32}>◀</WireframeBox>
            <WireframeBox width={32} height={32} filled>1</WireframeBox>
            <WireframeBox width={32} height={32}>2</WireframeBox>
            <WireframeBox width={32} height={32}>3</WireframeBox>
            <WireframeBox width={32} height={32}>▶</WireframeBox>
          </div>
        </div>
      </div>
    </div>
  );
}