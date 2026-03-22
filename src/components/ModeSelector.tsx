import type { PatternDef } from '../core';

interface ModeSelectorProps {
  patterns: PatternDef[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function ModeSelector({ patterns, activeId, onChange }: ModeSelectorProps) {
  const btnBase =
    'px-3 py-1.5 text-xs font-black uppercase tracking-wider border transition-colors duration-150 cursor-pointer';
  const btnActive =
    'text-white border-transparent';
  const btnIdle =
    'text-slate-500 border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-800';

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-xs font-black uppercase tracking-widest text-slate-600">Modo</span>
      <div className="flex flex-wrap gap-1.5">
        <button
          className={`${btnBase} ${activeId === 'auto' ? btnActive : btnIdle}`}
          style={activeId === 'auto' ? { backgroundColor: 'var(--color-accent)' } : {}}
          onClick={() => onChange('auto')}
        >
          Auto
        </button>
        {patterns.map((p) => (
          <button
            key={p.id}
            className={`${btnBase} ${activeId === p.id ? btnActive : btnIdle}`}
            style={activeId === p.id ? { backgroundColor: 'var(--color-accent)' } : {}}
            onClick={() => onChange(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
