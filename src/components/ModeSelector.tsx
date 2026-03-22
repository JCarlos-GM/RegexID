import type { PatternDef } from '../core';

interface ModeSelectorProps {
  patterns: PatternDef[];
  activeId: string; // 'auto' | pattern.id
  onChange: (id: string) => void;
}

// Selector de modo: AUTO evalua todas las regex, los demas enfocan un patron especifico
export default function ModeSelector({ patterns, activeId, onChange }: ModeSelectorProps) {
  return (
    <div className="mode-selector">
      <div className="mode-label">Modo</div>
      <div className="mode-options">
        <button
          className={`mode-btn ${activeId === 'auto' ? 'mode-btn--active' : ''}`}
          onClick={() => onChange('auto')}
        >
          <span className="mode-btn-icon" aria-hidden="true">{'\u25C6'}</span>
          AUTO
        </button>
        {patterns.map((p) => (
          <button
            key={p.id}
            className={`mode-btn ${activeId === p.id ? 'mode-btn--active' : ''}`}
            onClick={() => onChange(p.id)}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
