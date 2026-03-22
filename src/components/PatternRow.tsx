import type { PatternDef, MatchResult } from '../core';
import { ArrowUpRight } from 'lucide-react';

interface PatternRowProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
}

// Fila horizontal para el modo AUTO — compacta pero informativa
export default function PatternRow({ pattern, result, onLoadExample }: PatternRowProps) {
  const hasInput = result !== null;
  const matched = result?.matched ?? false;
  const state: 'idle' | 'match' | 'nomatch' = !hasInput ? 'idle' : matched ? 'match' : 'nomatch';

  const barColor =
    state === 'match'   ? 'var(--color-match)'   :
    state === 'nomatch' ? 'var(--color-nomatch)'  :
    'transparent';

  const statusColor =
    state === 'match'   ? 'var(--color-match)'   :
    state === 'nomatch' ? 'var(--color-nomatch)'  :
    'var(--color-slate-300)';

  const statusLabel =
    state === 'match'   ? '\u2713 match'   :
    state === 'nomatch' ? '\u2717 no match' :
    '\u25CB \u2014';

  return (
    <div className="flex items-stretch group hover:bg-slate-50 transition-colors duration-150">
      {/* Barra de acento izquierda */}
      <div
        className="w-0.5 shrink-0 transition-colors duration-300"
        style={{ backgroundColor: barColor }}
      />

      <div className="flex-1 px-6 py-4 min-w-0">
        {/* Fila principal */}
        <div className="flex items-center gap-4">
          {/* Nombre del patron */}
          <span className="font-black text-slate-900 text-sm w-24 shrink-0">{pattern.name}</span>

          {/* Expresion regular */}
          <code className="font-mono text-sm text-slate-500 flex-1 truncate min-w-0">
            /{pattern.regex.source}/
          </code>

          {/* Estado */}
          <span
            className="text-xs font-black uppercase tracking-wider shrink-0 w-24 text-right"
            style={{ color: statusColor }}
          >
            {statusLabel}
          </span>

          {/* Boton de ejemplo */}
          <button
            onClick={onLoadExample}
            title={`Cargar ejemplo: ${pattern.example}`}
            className="shrink-0 text-slate-300 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Desglose de segmentos — solo cuando hay coincidencia */}
        {state === 'match' && result && (
          <div className="mt-3 flex flex-wrap gap-2">
            {pattern.decompose(result.value).map((seg, i) => (
              <div key={i} className="flex flex-col items-center">
                <span
                  className="font-mono text-sm font-black px-2 py-0.5"
                  style={{ color: 'var(--color-match)', backgroundColor: 'var(--color-match-bg)' }}
                >
                  {seg.value}
                </span>
                <span className="text-xs text-slate-400 mt-0.5 uppercase tracking-wide">
                  {seg.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
