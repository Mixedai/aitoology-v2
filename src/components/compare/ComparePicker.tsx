import React, { useMemo, useState } from 'react';
import type { ToolLite } from '@/types/compare';

export function ComparePicker({ all, selected, onChange }:{
  all: ToolLite[];
  selected: ToolLite[];
  onChange: (arr: ToolLite[]) => void;
}) {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return all;
    return all.filter(t =>
      t.name.toLowerCase().includes(s) || t.id.toLowerCase().includes(s)
    );
  }, [all, q]);
  const inSel = (t:ToolLite)=> selected.some(x=>x.id===t.id);

  return (
    <div className="mx-auto max-w-6xl px-4 mb-4">
      <div className="flex gap-2 mb-3">
        <input
          value={q}
          onChange={e=>setQ(e.target.value)}
          placeholder="Search tools…"
          className="w-full rounded-xl border border-zinc-300 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/60"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filtered.map(t => (
          <button
            key={t.id}
            onClick={() => {
              if (inSel(t)) onChange(selected.filter(x=>x.id!==t.id));
              else onChange([...selected, t]);
            }}
            className={`rounded-xl px-3 py-1.5 text-sm shadow-sm transition
              ${inSel(t)
                ? 'bg-indigo-600 text-white'
                : 'bg-white/70 text-zinc-800 border border-zinc-300 dark:bg-zinc-900/60 dark:text-zinc-100 dark:border-zinc-700'}`}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}