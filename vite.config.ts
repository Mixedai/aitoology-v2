
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['babel-plugin-transform-imports', {
            '@radix-ui': {
              transform: '@radix-ui/react-${member}',
              preventFullImport: true
            },
            'lucide-react': {
              transform: 'lucide-react/dist/esm/icons/${member}',
              preventFullImport: true,
              skipDefaultConversion: true
            }
          }]
        ]
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React dependencies
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-vendor';
          }
          // UI components from Radix
          if (id.includes('@radix-ui')) {
            return 'ui-vendor';
          }
          // Supabase SDK
          if (id.includes('@supabase')) {
            return 'supabase';
          }
          // Animation libraries
          if (id.includes('framer-motion') || id.includes('motion')) {
            return 'animation';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform')) {
            return 'forms';
          }
          // Date/calendar libraries
          if (id.includes('react-day-picker') || id.includes('date-fns')) {
            return 'date-utils';
          }
          // Chart libraries
          if (id.includes('recharts')) {
            return 'charts';
          }
          // Component-based chunking for better code splitting
          if (id.includes('components/design-system')) {
            return 'design-system';
          }
          if (id.includes('components/admin')) {
            return 'admin';
          }
          if (id.includes('components/auth')) {
            return 'auth';
          }
          if (id.includes('components/tools')) {
            return 'tools';
          }
          if (id.includes('components/workflows')) {
            return 'workflows';
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `assets/js/${chunkInfo.name}-[hash].js`;
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js',
      'framer-motion',
    ],
    exclude: [
      'lucide-react'
    ],
    esbuildOptions: {
      target: 'es2020',
    }
  },
  server: {
    port: 5173,
    host: true,
    open: true,
  },
});