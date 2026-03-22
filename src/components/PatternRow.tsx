import type { PatternDef, MatchResult } from '../core';

interface PatternRowProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
}

export default function PatternRow({ pattern, result, onLoadExample }: PatternRowProps) {
  const hayInput = result !== null;
  const coincide = result?.matched ?? false;

  // Texto y color del badge segun el resultado
  let badgeTexto = '—';
  let badgeClase = 'bg-slate-100 text-slate-400 border border-slate-200';

  if (hayInput && coincide) {
    badgeTexto = '✓ MATCH';
    badgeClase = 'bg-green-50 text-green-600 border border-green-200';
  } else if (hayInput && !coincide) {
    badgeTexto = '✗ NO MATCH';
    badgeClase = 'bg-red-50 text-red-500 border border-red-200';
  }

  // Color de la barra lateral izquierda
  let barraColor = '#e2e8f0'; // gris por defecto
  if (hayInput && coincide) barraColor = '#16a34a';
  if (hayInput && !coincide) barraColor = '#dc2626';

  return (
    <div className="flex items-stretch hover:bg-slate-50 transition-colors group">

      {/* Barra de color a la izquierda */}
      <div className="w-0.5 shrink-0 my-4 ml-4 rounded-full" style={{ backgroundColor: barraColor }} />

      <div className="flex-1 px-5 py-4 min-w-0">

        {/* Fila: nombre | regex | badge | boton ejemplo */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <span className="font-bold text-slate-800 text-sm w-16 sm:w-20 shrink-0">{pattern.name}</span>

          <div className="flex-1 min-w-0 bg-slate-100 rounded-lg px-3 py-2 font-mono text-xs text-slate-500 truncate hidden sm:block">
            {pattern.regex.source}
          </div>

          <span className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${badgeClase}`}>
            {badgeTexto}
          </span>

          <button
            onClick={onLoadExample}
            title={`Cargar ejemplo: ${pattern.example}`}
            className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            ↗
          </button>
        </div>

        {/* Desglose de segmentos — solo si hubo coincidencia */}
        {coincide && result && (
          <div className="mt-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              Desglose de captura
            </p>
            <div className="flex flex-wrap gap-2">
              {pattern.decompose(result.value).map((seg, i) => (
                <div key={i} className="flex flex-col items-center gap-1 border border-slate-200 bg-white rounded-xl px-4 py-2.5 min-w-14">
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
