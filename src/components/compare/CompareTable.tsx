import React, { useMemo, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import type { ToolLite } from '@/types/compare';
import { FEATURE_DICTIONARY, deriveValues } from './featureDictionary';
import { displayBool, displayNumber, equalish } from '@/lib/normalize';

export function CompareTable({ tools, diffOnly=false }:{
  tools: ToolLite[];
  diffOnly?: boolean;
}) {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const { flatRows, rowCount } = useMemo(() => {
    const defs = [...FEATURE_DICTIONARY].sort((a,b)=>a.sort-b.sort);
    const grouped: { group: string; rows: { def: typeof defs[0]; cells: any[] }[] }[] = [];
    
    let currentGroup = '';
    defs.forEach(def => {
      const cells = tools.map(t => deriveValues(t)[def.key]);
      const row = { def, cells };
      
      if (def.group !== currentGroup) {
        currentGroup = def.group;
        grouped.push({ group: currentGroup, rows: [] });
      }
      grouped[grouped.length - 1].rows.push(row);
    });
    
    // Filter for differences with centralized equality logic
    const filteredGroups = grouped.map(g => ({
      ...g,
      rows: g.rows.filter(row => {
        if (!diffOnly) return true;
        
        // Extract primitive values for comparison
        const getPrimitive = (c: any) => {
          if (c?.value_bool !== undefined) return c.value_bool;
          if (c?.value_number !== undefined) return c.value_number;
          if (c?.value_text !== undefined) return c.value_text;
          return null;
        };
        
        const primitives = row.cells.map(getPrimitive);
        
        // Check if all values are considered equal using equalish
        for (let i = 0; i < primitives.length - 1; i++) {
          for (let j = i + 1; j < primitives.length; j++) {
            if (!equalish(primitives[i], primitives[j])) {
              return true; // Found at least one difference
            }
          }
        }
        return false; // All values are equal
      })
    })).filter(g => g.rows.length > 0);

    // Flatten groups into a single array for virtualization
    const flat: any[] = [];
    let rowIndex = 0;
    filteredGroups.forEach((group) => {
      flat.push({ type: 'header', group: group.group });
      group.rows.forEach(row => {
        flat.push({ type: 'row', row, rowIndex: rowIndex++ });
      });
    });

    return { flatRows: flat, rowCount: flat.length };
  }, [tools, diffOnly]);

  // For small datasets, use the regular table
  if (rowCount < 50) {
    let globalRowIndex = 0;
    return (
      <div className="mx-auto max-w-6xl overflow-x-auto px-4">
        <table className="w-full border-separate border-spacing-y-2 text-sm">
          <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur dark:bg-zinc-900/70">
            <tr>
              <th className="w-56 text-left p-3 font-semibold">Feature</th>
              {tools.map((t, idx) => (
                <th 
                  key={t.id} 
                  className={`min-w-48 text-left p-3 transition-all ${
                    hoveredCol === idx ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''
                  }`}
                  onMouseEnter={() => setHoveredCol(idx)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{t.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flatRows.map((item, idx) => {
              if (item.type === 'header') {
                return (
                  <tr key={`header-${idx}`}>
                    <td colSpan={tools.length + 1} className="pt-4 pb-2">
                      <div className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur rounded-lg px-3 py-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                          {item.group}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              }
              
              const { row, rowIndex } = item;
              const isEvenRow = rowIndex % 2 === 0;
              
              return (
                <tr key={row.def.key} className="align-top">
                  <td className={`sticky left-0 z-[1] w-56 rounded-l-xl p-3 font-medium backdrop-blur transition-all ${
                    isEvenRow ? 'bg-white/80 dark:bg-zinc-900/70' : 'bg-white/70 dark:bg-zinc-900/60'
                  }`}>
                    {row.def.label}
                  </td>
                  {row.cells.map((c: any, i: number) => {
                    let display: string;
                    if (c?.value_bool !== undefined) {
                      display = displayBool(c.value_bool);
                    } else if (c?.value_number !== undefined) {
                      display = displayNumber(c.value_number, row.def.unit);
                    } else if (c?.value_text !== undefined) {
                      display = c.value_text;
                    } else {
                      display = '—';
                    }
                    
                    const isHovered = hoveredCol === i;
                    
                    return (
                      <td 
                        key={i} 
                        className={`min-w-48 p-3 backdrop-blur transition-all ${
                          i === row.cells.length - 1 ? 'rounded-r-xl' : ''
                        } ${
                          isEvenRow ? 'bg-white/60 dark:bg-zinc-900/60' : 'bg-white/50 dark:bg-zinc-900/50'
                        } ${
                          isHovered ? 'bg-indigo-50/40 dark:bg-indigo-900/10 ring-1 ring-indigo-300/40 dark:ring-indigo-500/30' : ''
                        }`}
                        onMouseEnter={() => setHoveredCol(i)}
                        onMouseLeave={() => setHoveredCol(null)}
                      >
                        {display}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // For large datasets, use virtualization
  return (
    <div className="mx-auto max-w-6xl px-4">
      <TableVirtuoso
        style={{ height: '600px' }}
        data={flatRows}
        fixedHeaderContent={() => (
          <tr className="bg-white/80 backdrop-blur dark:bg-zinc-900/70">
            <th className="w-56 text-left p-3 font-semibold sticky left-0 z-20 bg-white/80 dark:bg-zinc-900/70">Feature</th>
            {tools.map((t, idx) => (
              <th 
                key={t.id} 
                className={`min-w-48 text-left p-3 transition-all ${
                  hoveredCol === idx ? 'bg-indigo-50/50 dark:bg-indigo-900/20' : ''
                }`}
                onMouseEnter={() => setHoveredCol(idx)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{t.name}</span>
                </div>
              </th>
            ))}
          </tr>
        )}
        itemContent={(index, item) => {
          if (item.type === 'header') {
            return (
              <td colSpan={tools.length + 1} className="pt-4 pb-2">
                <div className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur rounded-lg px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                    {item.group}
                  </span>
                </div>
              </td>
            );
          }
          
          const { row, rowIndex } = item;
          const isEvenRow = rowIndex % 2 === 0;
          
          return (
            <>
              <td className={`w-56 p-3 font-medium backdrop-blur sticky left-0 z-10 ${
                isEvenRow ? 'bg-white/80 dark:bg-zinc-900/70' : 'bg-white/70 dark:bg-zinc-900/60'
              }`}>
                {row.def.label}
              </td>
              {row.cells.map((c: any, i: number) => {
                let display: string;
                if (c?.value_bool !== undefined) {
                  display = displayBool(c.value_bool);
                } else if (c?.value_number !== undefined) {
                  display = displayNumber(c.value_number, row.def.unit);
                } else if (c?.value_text !== undefined) {
                  display = c.value_text;
                } else {
                  display = '—';
                }
                
                const isHovered = hoveredCol === i;
                
                return (
                  <td 
                    key={i} 
                    className={`min-w-48 p-3 backdrop-blur transition-all ${
                      isEvenRow ? 'bg-white/60 dark:bg-zinc-900/60' : 'bg-white/50 dark:bg-zinc-900/50'
                    } ${
                      isHovered ? 'bg-indigo-50/40 dark:bg-indigo-900/10 ring-1 ring-indigo-300/40 dark:ring-indigo-500/30' : ''
                    }`}
                    onMouseEnter={() => setHoveredCol(i)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    {display}
                  </td>
                );
              })}
            </>
          );
        }}
        className="border-separate border-spacing-y-2"
      />
    </div>
  );
}