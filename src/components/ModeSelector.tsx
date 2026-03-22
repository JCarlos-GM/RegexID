import type { PatternDef } from '../core';

interface ModeSelectorProps {
  patterns: PatternDef[];
  activeId: string;
  onChange: (id: string) => void;
}

// Tabs horizontales — estilo minimalista con indicador de linea inferior
export default function ModeSelector({ patterns, activeId, onChange }: ModeSelectorProps) {
  const tabs = [{ id: 'auto', label: 'Auto' }, ...patterns.map((p) => ({ id: p.id, label: p.name }))];

  return (
    <div className="flex items-end gap-0 border-b border-slate-200 overflow-x-auto">
      {tabs.map(({ id, label }) => {
        const active = activeId === id;
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`px-5 py-3 text-xs font-black uppercase tracking-widest border-b-2 -mb-px transition-colors duration-150 whitespace-nowrap ${
              active
                ? 'text-slate-900 border-current'
                : 'text-slate-400 border-transparent hover:text-slate-600 hover:border-slate-300'
            }`}
            style={active ? { borderColor: 'var(--color-accent)', color: 'var(--color-accent)' } : {}}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
