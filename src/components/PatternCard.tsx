import type { PatternDef, MatchResult } from '../core';

interface PatternCardProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
}

// Tarjeta de detalle para cuando el usuario elige un patron especifico
export default function PatternCard({ pattern, result, onLoadExample }: PatternCardProps) {
  const hayInput = result !== null;
  const coincide = result?.matched ?? false;

  // Color del estado en el header
  let estadoTexto = '◯ IDLE';
  let estadoColor = '#94a3b8';

  if (hayInput && coincide) {
    estadoTexto = '✓ MATCH';
    estadoColor = '#16a34a';
  } else if (hayInput && !coincide) {
    estadoTexto = '✗ NO MATCH';
    estadoColor = '#dc2626';
  }

  return (
    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">

      {/* Encabezado: nombre del patron y estado actual */}
      <div className="flex items-start justify-between gap-4 px-7 py-6 border-b border-slate-100">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{pattern.id}</p>
          <h2 className="text-xl font-black text-slate-900">{pattern.name}</h2>
          <p className="text-sm text-slate-500 mt-1">{pattern.description}</p>
        </div>
        <span className="text-sm font-black uppercase tracking-wider shrink-0 mt-1" style={{ color: estadoColor }}>
          {estadoTexto}
        </span>
      </div>

      {/* La expresion regular del patron */}
      <div className="px-7 py-5 border-b border-slate-100 bg-slate-50">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Expresion regular</p>
        <div className="font-mono text-base overflow-x-auto">
          <span className="text-slate-400">/</span>
          <span className="text-purple-700 font-semibold">{pattern.regex.source}</span>
          <span className="text-slate-400">/</span>
        </div>
      </div>

      {/* Anatomia: que significa cada parte de la regex */}
      <div className="px-7 py-5 border-b border-slate-100">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Anatomia del patron</p>
        <div className="flex flex-col divide-y divide-slate-100">
          {pattern.parts.map((part, i) => (
            <div key={i} className="flex items-baseline gap-5 py-2.5">
              <code className="font-mono text-sm text-purple-700 bg-slate-50 border border-slate-200 px-2 py-0.5 shrink-0 min-w-36">
                {part.token}
              </code>
              <span className="text-sm text-slate-600 leading-snug">{part.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resultado de evaluar la cadena ingresada */}
      <div className="px-7 py-5 border-b border-slate-100">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Resultado</p>

        {/* Sin input todavia */}
        {!hayInput && (
          <p className="text-sm text-slate-400">Escribe una cadena en el campo de arriba para evaluar.</p>
        )}

        {/* Input ingresado pero no coincide */}
        {hayInput && !coincide && (
          <p className="text-sm font-mono text-red-500">La cadena no coincide con el patron.</p>
        )}

        {/* Input ingresado y coincide — muestra el desglose */}
        {hayInput && coincide && result && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              Coincidencia encontrada:{' '}
              <code className="font-mono font-black text-slate-800">&quot;{result.value}&quot;</code>
            </p>

            <div className="flex flex-wrap gap-3">
              {pattern.decompose(result.value).map((seg, i) => (
                <div key={i} className="flex flex-col items-center gap-1 border border-green-200 bg-green-50 px-4 py-2.5 min-w-16 rounded-xl">
                  <span className="font-mono text-lg font-black leading-none text-green-700">{seg.value}</span>
                  <span className="text-xs font-bold text-center leading-tight text-green-600 uppercase tracking-wide">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Boton para cargar un ejemplo valido */}
      <button
        onClick={onLoadExample}
        className="w-full flex items-center justify-between gap-4 px-7 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Ejemplo valido</span>
          <code className="font-mono text-sm text-slate-700">{pattern.example}</code>
        </div>
        <span className="text-slate-300 hover:text-slate-500">↗</span>
      </button>
    </div>
  );
}
