import type { PatternDef, MatchResult } from '../core';
import { ArrowUpRight } from 'lucide-react';

interface PatternCardProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
  focused?: boolean;
}

export default function PatternCard({ pattern, result, onLoadExample, focused = false }: PatternCardProps) {
  const hasInput = result !== null;
  const matched = result?.matched ?? false;
  const state: 'idle' | 'match' | 'nomatch' = !hasInput ? 'idle' : matched ? 'match' : 'nomatch';

  const borderColor =
    state === 'match' ? 'var(--color-match)' :
    state === 'nomatch' ? 'var(--color-nomatch)' :
    'var(--color-slate-200)';

  const badgeStyle =
    state === 'match'
      ? { color: 'var(--color-match)', backgroundColor: 'var(--color-match-bg)', borderColor: 'var(--color-match)' }
      : state === 'nomatch'
      ? { color: 'var(--color-nomatch)', backgroundColor: 'var(--color-nomatch-bg)', borderColor: 'var(--color-nomatch)' }
      : { color: 'var(--color-slate-400)', borderColor: 'var(--color-slate-200)' };

  return (
    <div
      className="bg-white border flex flex-col transition-all duration-200"
      style={{ borderColor }}
    >
      {/* Encabezado */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider border border-slate-200 px-1.5 py-0.5 text-slate-400">
            {pattern.id}
          </span>
          <span className="font-black text-slate-900 text-sm">{pattern.name}</span>
        </div>
        <span
          className="text-xs font-black uppercase tracking-wider border px-2 py-0.5"
          style={badgeStyle}
        >
          {state === 'match' ? '\u2713 MATCH' : state === 'nomatch' ? '\u2717 NO MATCH' : 'IDLE'}
        </span>
      </div>

      {/* Descripcion */}
      <p className="text-xs text-slate-400 px-4 py-2">{pattern.description}</p>

      {/* Regex */}
      <div className="flex items-center gap-0.5 font-mono text-xs px-4 py-2 bg-slate-50 border-y border-slate-100 overflow-x-auto">
        <span className="text-slate-300">/</span>
        <span className="text-purple-600 flex-1">{pattern.regex.source}</span>
        <span className="text-slate-300">/</span>
      </div>

      {/* Anatomia (solo modo enfocado) */}
      {focused && (
        <div className="px-4 py-4 border-b border-slate-100">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
            Anatomia del patron
          </p>
          <div className="flex flex-col gap-2">
            {pattern.parts.map((part, i) => (
              <div key={i} className="flex items-start gap-3">
                <code className="font-mono text-xs px-2 py-1 bg-slate-50 border border-slate-200 text-purple-600 shrink-0 min-w-36">
                  {part.token}
                </code>
                <span className="text-xs text-slate-500 leading-5">{part.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resultado match */}
      {state === 'match' && result && (
        <div className="px-4 py-3 border-b border-slate-100">
          <p className="text-xs font-black uppercase tracking-widest mb-1"
            style={{ color: 'var(--color-match)' }}>
            Coincidencia
          </p>
          <code className="font-mono text-sm text-slate-700">&quot;{result.value}&quot;</code>

          {/* Desglose de segmentos (solo modo enfocado) */}
          {focused && (
            <div className="mt-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                Desglose
              </p>
              <div className="flex flex-wrap gap-2">
                {pattern.decompose(result.value).map((seg, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 border px-3 py-2 min-w-14"
                    style={{ borderColor: 'var(--color-match)', backgroundColor: 'var(--color-match-bg)' }}
                  >
                    <span className="font-mono font-black text-base"
                      style={{ color: 'var(--color-match)' }}>
                      {seg.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-center"
                      style={{ color: 'var(--color-match)', opacity: 0.7 }}>
                      {seg.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Boton de ejemplo */}
      <button
        onClick={onLoadExample}
        className="flex items-center justify-between gap-2 px-4 py-3 text-left hover:bg-slate-50 transition-colors mt-auto group"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-300">Ejemplo</span>
          <code className="font-mono text-xs text-slate-500 truncate max-w-40">{pattern.example}</code>
        </div>
        <ArrowUpRight size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0" />
      </button>
    </div>
  );
}
