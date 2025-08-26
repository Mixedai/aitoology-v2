import React from 'react';
import { Card, CardContent, CardHeader } from './card';
import { Skeleton } from './skeleton';

/*
LOADING SKELETON COMPONENTS - AI TOOLLOGIST DESIGN SYSTEM

Comprehensive loading states for lists and detail views with proper accessibility.

Tailwind Classes:
- Card Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- List Layout: space-y-6 
- Detail Layout: max-w-4xl mx-auto px-6 py-8
- Animation: animate-pulse bg-muted rounded-md
- Spacing: gap-6 p-6 space-y-4 (8-point grid compliance)
- Responsive: h-48 md:h-56 lg:h-64 for image placeholders

Accessibility:
- aria-label for screen readers
- role="status" for loading indicators
- Proper semantic structure
- Focus management during loading states
*/

// Tool Card Skeleton for Browse Tools
export function ToolCardSkeleton() {
  return (
    <Card className="h-full" role="status" aria-label="Loading tool information">
      <div className="relative w-full h-48 bg-muted animate-pulse rounded-t-lg" />
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-14" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-3 w-3 rounded" />
            <Skeleton className="h-3 w-3 rounded" />
          </div>
        </div>
      </CardContent>
      <span className="sr-only">Loading tool information, please wait</span>
    </Card>
  );
}

// Browse Tools Grid Skeleton
export function BrowseLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <div className="space-y-8" role="status" aria-label="Loading tools">
          {/* Header skeleton */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-5 w-96" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>

          {/* Search bar skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            
            {/* Tabs skeleton */}
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Controls bar skeleton */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>

          {/* Filter chips skeleton */}
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-14" />
            <Skeleton className="h-6 w-18" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <ToolCardSkeleton key={i} />
            ))}
          </div>
          
          <span className="sr-only">Loading tools, please wait</span>
        </div>
      </div>
    </div>
  );
}

// News Article Card Skeleton
export function NewsCardSkeleton() {
  return (
    <Card className="h-full" role="status" aria-label="Loading article">
      <div className="relative w-full h-48 bg-muted animate-pulse rounded-t-lg" />
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>
      <span className="sr-only">Loading article, please wait</span>
    </Card>
  );
}

// News List Skeleton
export function NewsLoadingSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading news articles">
      {/* Hero article skeleton */}
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Skeleton className="h-64 lg:h-80" />
          <div className="p-6 space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-8 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Article grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </div>
      
      <span className="sr-only">Loading news articles, please wait</span>
    </div>
  );
}

// Tutorial Card Skeleton
export function TutorialCardSkeleton() {
  return (
    <Card className="h-full" role="status" aria-label="Loading tutorial">
      <div className="relative w-full h-48 bg-muted animate-pulse rounded-t-lg" />
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-16" />
          </div>
          <Skeleton className="h-6 w-6 rounded" />
        </div>
        <Skeleton className="h-6 w-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
      <span className="sr-only">Loading tutorial, please wait</span>
    </Card>
  );
}

// Tutorial List Skeleton
export function TutorialLoadingSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading tutorials">
      {/* Progress card skeleton */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </Card>

      {/* Filter bar skeleton */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>

      {/* Tutorial grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <TutorialCardSkeleton key={i} />
        ))}
      </div>
      
      <span className="sr-only">Loading tutorials, please wait</span>
    </div>
  );
}

// Workflow Card Skeleton
export function WorkflowCardSkeleton() {
  return (
    <Card className="h-full" role="status" aria-label="Loading workflow">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </CardContent>
      <span className="sr-only">Loading workflow, please wait</span>
    </Card>
  );
}

// Workflow List Skeleton
export function WorkflowLoadingSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading workflows">
      {/* Featured workflow skeleton */}
      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </Card>

      {/* Workflow grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <WorkflowCardSkeleton key={i} />
        ))}
      </div>
      
      <span className="sr-only">Loading workflows, please wait</span>
    </div>
  );
}

// Tool Detail Skeleton
export function ToolDetailSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading tool details">
      {/* Header skeleton */}
      <div className="bg-card border-b p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex items-start gap-4 flex-1">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab content skeleton */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Tab bar skeleton */}
        <div className="flex gap-8 border-b">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-18" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-64 w-full rounded-lg" />
            </Card>
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-28" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-20" />
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <span className="sr-only">Loading tool details, please wait</span>
    </div>
  );
}

// News Detail Skeleton
export function NewsDetailSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading article">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Header skeleton */}
        <div className="space-y-6">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        {/* Featured image skeleton */}
        <Skeleton className="h-64 md:h-96 w-full rounded-lg" />

        {/* Content skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </div>

        {/* Related articles skeleton */}
        <div className="border-t pt-8 space-y-6">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
      
      <span className="sr-only">Loading article content, please wait</span>
    </div>
  );
}

// Tutorial Detail Skeleton
export function TutorialDetailSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading tutorial">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video placeholder skeleton */}
            <div className="aspect-video bg-muted rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
              <Skeleton className="h-16 w-16 rounded" />
            </div>

            {/* Tutorial info skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-18" />
                <Skeleton className="h-4 w-14" />
              </div>
            </div>

            {/* Steps skeleton */}
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-4 p-4 border rounded-lg">
                    <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    <Skeleton className="h-6 w-6 rounded" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              <Skeleton className="h-10 w-full" />
            </Card>

            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3 border rounded-lg p-3">
                    <Skeleton className="h-12 w-16 rounded" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <span className="sr-only">Loading tutorial content, please wait</span>
    </div>
  );
}

// Workflow Detail Skeleton
export function WorkflowDetailSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading workflow">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workflow diagram skeleton */}
            <Card className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-6 w-32" />
                <div className="h-64 bg-muted/30 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                  <div className="flex gap-4">
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <Skeleton className="h-2 w-8 self-center" />
                    <Skeleton className="h-16 w-16 rounded-lg" />
                    <Skeleton className="h-2 w-8 self-center" />
                    <Skeleton className="h-16 w-16 rounded-lg" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Description skeleton */}
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </Card>

            {/* Tools used skeleton */}
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-4 p-4 border rounded-lg">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-8 w-20" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-28" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-18" />
              </div>
              <Skeleton className="h-10 w-full" />
            </Card>

            <Card className="p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <span className="sr-only">Loading workflow details, please wait</span>
    </div>
  );
}