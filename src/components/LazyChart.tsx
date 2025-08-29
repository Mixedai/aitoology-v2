import { lazy, Suspense } from 'react';
import type { ComponentType } from 'react';

// Chart Loading Skeleton
export const ChartSkeleton = () => (
  <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-gray-400">
      <svg className="w-12 h-12 animate-spin" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p className="mt-2 text-sm">Loading chart...</p>
    </div>
  </div>
);

// Lazy load Recharts components
export const LazyLineChart = lazy(() => 
  import('recharts').then(module => ({ default: module.LineChart as ComponentType<any> }))
);

export const LazyBarChart = lazy(() => 
  import('recharts').then(module => ({ default: module.BarChart as ComponentType<any> }))
);

export const LazyAreaChart = lazy(() => 
  import('recharts').then(module => ({ default: module.AreaChart as ComponentType<any> }))
);

export const LazyPieChart = lazy(() => 
  import('recharts').then(module => ({ default: module.PieChart as ComponentType<any> }))
);

export const LazyRadarChart = lazy(() => 
  import('recharts').then(module => ({ default: module.RadarChart as ComponentType<any> }))
);

export const LazyRadialBarChart = lazy(() => 
  import('recharts').then(module => ({ default: module.RadialBarChart as ComponentType<any> }))
);

// Export other Recharts components as lazy
export const LazyCartesianGrid = lazy(() => 
  import('recharts').then(module => ({ default: module.CartesianGrid as ComponentType<any> }))
);

export const LazyXAxis = lazy(() => 
  import('recharts').then(module => ({ default: module.XAxis as ComponentType<any> }))
);

export const LazyYAxis = lazy(() => 
  import('recharts').then(module => ({ default: module.YAxis as ComponentType<any> }))
);

export const LazyTooltip = lazy(() => 
  import('recharts').then(module => ({ default: module.Tooltip as ComponentType<any> }))
);

export const LazyLegend = lazy(() => 
  import('recharts').then(module => ({ default: module.Legend as ComponentType<any> }))
);

export const LazyResponsiveContainer = lazy(() => 
  import('recharts').then(module => ({ default: module.ResponsiveContainer as ComponentType<any> }))
);

export const LazyLine = lazy(() => 
  import('recharts').then(module => ({ default: module.Line as ComponentType<any> }))
);

export const LazyBar = lazy(() => 
  import('recharts').then(module => ({ default: module.Bar as ComponentType<any> }))
);

export const LazyArea = lazy(() => 
  import('recharts').then(module => ({ default: module.Area as ComponentType<any> }))
);

export const LazyPie = lazy(() => 
  import('recharts').then(module => ({ default: module.Pie as ComponentType<any> }))
);

export const LazyCell = lazy(() => 
  import('recharts').then(module => ({ default: module.Cell as ComponentType<any> }))
);

// Chart wrapper component
export const LazyChart = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<ChartSkeleton />}>
    {children}
  </Suspense>
);

export default LazyChart;