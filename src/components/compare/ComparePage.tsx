import React, { useMemo, useState, useEffect } from 'react';
import { CompareTable } from './CompareTable';
import { ComparePicker } from './ComparePicker';
import type { ToolLite, ValueCell } from '@/types/compare';
import { toolsData } from '@/data/mockTools';
import { FEATURE_DICTIONARY, deriveValues } from './featureDictionary';

// Simple slugify helper - converts to lowercase and replaces non-alphanumeric with hyphens
function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function ComparePage() {
  const all: ToolLite[] = useMemo(() => toolsData.map(t => ({
    id: t.id, name: t.name, description: t.description,
    rating: t.rating, category: t.category, pricing: t.pricing, features: t.features, logo: t.logo
  })), []);
  
  // Initialize selection from URL params or default to first 3
  const [sel, setSel] = useState<ToolLite[]>(() => {
    const params = new URLSearchParams(window.location.search);
    const toolsParam = params.get('tools');
    
    if (toolsParam) {
      const slugs = toolsParam.split(',');
      const selectedTools: ToolLite[] = [];
      
      // Map slugs back to tools, maintaining order
      for (const slug of slugs) {
        const tool = all.find(t => 
          slugify(t.name) === slug || t.id === slug
        );
        if (tool && !selectedTools.some(t => t.id === tool.id)) {
          selectedTools.push(tool);
        }
      }
      
      // Return selected tools if any valid, otherwise default
      return selectedTools.length > 0 ? selectedTools : all.slice(0, 3);
    }
    
    return all.slice(0, 3);
  });
  
  const [diffOnly, setDiffOnly] = useState(false);

  // Update URL when selection changes
  useEffect(() => {
    const slugs = sel.map(t => slugify(t.name));
    const params = new URLSearchParams(window.location.search);
    
    if (slugs.length > 0) {
      params.set('tools', slugs.join(','));
    } else {
      params.delete('tools');
    }
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [sel]);

  // Custom onChange handler to maintain order
  const handleSelectionChange = (newSelection: ToolLite[]) => {
    setSel(newSelection);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const defs = [...FEATURE_DICTIONARY].sort((a, b) => a.sort - b.sort);
    const rows: string[][] = [];
    
    // Header row
    rows.push(['Feature', ...sel.map(t => t.name)]);
    
    // Data rows
    defs.forEach(def => {
      const cells = sel.map(t => deriveValues(t)[def.key]);
      
      // Apply diffOnly filter
      if (diffOnly) {
        const normalizeValue = (c: ValueCell) => {
          if (c?.value_bool !== undefined) return c.value_bool ? 'yes' : 'no';
          if (c?.value_number !== undefined) return Math.round(c.value_number * 100) / 100;
          if (c?.value_text !== undefined) return c.value_text.trim().toLowerCase();
          return '—';
        };
        
        const normalized = cells.map(normalizeValue);
        
        // Check for differences with tolerance
        if (def.type === 'number') {
          const nums = normalized.filter(v => typeof v === 'number');
          if (nums.length === normalized.length && nums.length > 0) {
            const min = Math.min(...(nums as number[]));
            const max = Math.max(...(nums as number[]));
            if ((max - min) <= 0.05) return; // Skip if within tolerance
          }
        } else {
          const uniqueValues = new Set(normalized.map(v => String(v)));
          if (uniqueValues.size <= 1) return; // Skip if all same
        }
      }
      
      // Format cell values for CSV
      const rowData = [def.label];
      cells.forEach(c => {
        let value = '';
        if (c?.value_bool !== undefined) {
          value = c.value_bool ? 'Yes' : 'No';
        } else if (c?.value_number !== undefined) {
          value = c.value_number + (def.unit || '');
        } else if (c?.value_text !== undefined) {
          value = c.value_text;
        } else {
          value = '—';
        }
        rowData.push(value);
      });
      rows.push(rowData);
    });
    
    // Convert to CSV format
    const csvContent = rows
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'compare.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link. Please copy manually from the address bar.');
    });
  };

  return (
    <section className="relative min-h-[80svh] py-12">
      <div className="sticky top-0 z-20 border-b bg-white/80 px-4 py-3 backdrop-blur dark:bg-zinc-900/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h2 className="text-lg font-semibold">Compare Tools</h2>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={diffOnly} onChange={e=>setDiffOnly(e.target.checked)} />
              Differences only
            </label>
            <button
              onClick={handleExportCSV}
              className="rounded-lg bg-white/70 px-3 py-1.5 text-sm font-medium text-zinc-700 shadow-sm border border-zinc-300 hover:bg-white/90 dark:bg-zinc-800/70 dark:text-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800/90 transition-colors"
            >
              Export CSV
            </button>
            <button
              onClick={handleCopyLink}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Copy link
            </button>
          </div>
        </div>
      </div>

      <ComparePicker all={all} selected={sel} onChange={handleSelectionChange} />
      <CompareTable tools={sel} diffOnly={diffOnly} />
    </section>
  );
}