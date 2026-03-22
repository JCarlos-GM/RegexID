import type { PatternDef, MatchResult } from '../core';
import { ArrowUpRight } from 'lucide-react';

interface PatternRowProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
}

export default function PatternRow({ pattern, result, onLoadExample }: PatternRowProps) {
  const hasInput = result !== null;
  const matched = result?.matched ?? false;
  const state: 'idle' | 'match' | 'nomatch' = !hasInput ? 'idle' : matched ? 'match' : 'nomatch';

  const barColor =
    state === 'match'   ? 'var(--color-match)'   :
    state === 'nomatch' ? 'var(--color-nomatch)'  :
    'var(--color-slate-200)';

  const badgeCls =
    state === 'match'
      ? 'bg-green-50 text-green-600 border border-green-200'
      : state === 'nomatch'
      ? 'bg-red-50 border border-red-200'
      : 'bg-slate-100 text-slate-400 border border-slate-200';

  const badgeLabel =
    state === 'match'   ? '\u2713 MATCH'    :
    state === 'nomatch' ? '\u00D7 NO MATCH' :
    '\u2014';

  return (
    <div className="flex items-stretch group hover:bg-slate-50/70 transition-colors">
      {/* Barra de color izquierda */}
      <div
        className="w-0.5 shrink-0 my-4 ml-4 rounded-full transition-colors duration-300"
        style={{ backgroundColor: barColor }}
      />

      <div className="flex-1 px-5 py-4 min-w-0">
        {/* Fila principal */}
        <div className="flex items-center gap-4">
          {/* Nombre */}
          <span className="font-bold text-slate-800 text-sm w-20 shrink-0">{pattern.name}</span>

          {/* Regex en caja gris */}
          <div className="flex-1 min-w-0 bg-slate-100 rounded-lg px-3 py-2 font-mono text-xs text-slate-500 truncate">
            {pattern.regex.source}
          </div>

          {/* Badge de resultado */}
          <span
            className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${badgeCls}`}
            style={state === 'nomatch' ? { color: 'var(--color-nomatch)' } : {}}
          >
            {badgeLabel}
          </span>

          {/* Boton ejemplo — aparece en hover */}
          <button
            onClick={onLoadExample}
            title={pattern.example}
            className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Desglose — solo cuando hay coincidencia */}
        {state === 'match' && result && (
          <div className="mt-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              Desglose de captura
            </p>
            <div className="flex flex-wrap gap-2">
              {pattern.decompose(result.value).map((seg, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 border border-slate-200 bg-white rounded-xl px-4 py-2.5 min-w-14"
                >
                  <span className="font-mono font-bold text-sm text-slate-800">{seg.value}</span>
                  <span className="text-xs text-slate-400 text-center leading-tight">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
