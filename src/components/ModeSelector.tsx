import { Zap } from 'lucide-react';
import type { PatternDef } from '../core';

interface ModeSelectorProps {
  patterns: PatternDef[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function ModeSelector({ patterns, activeId, onChange }: ModeSelectorProps) {
  // Primera opcion siempre es AUTO, luego un tab por cada patron
  const tabs = [
    { id: 'auto', label: 'AUTO' },
    ...patterns.map((p) => ({ id: p.id, label: p.name })),
  ];

  return (
    <div
      className="flex items-center gap-1 bg-white border border-slate-200 rounded-full px-1.5 py-1.5 w-full overflow-x-auto shadow-sm"
      style={{ scrollbarWidth: 'none' }}
    >
      {tabs.map(({ id, label }) => {
        const estaActivo = activeId === id;
        const esAuto = id === 'auto';

        if (estaActivo) {
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white transition-all"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              {esAuto && <Zap size={11} fill="currentColor" />}
              {label}
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors tracking-wide"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
