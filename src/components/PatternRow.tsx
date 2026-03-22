import { UserIcon, PhoneIcon, EnvelopeIcon, IdentificationCardIcon, IdentificationBadgeIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import type { PatternDef, MatchResult } from '../core';

interface PatternRowProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
}

function getIcon(id: string) {
  if (id === 'nombre')   return <UserIcon size={14} weight="bold" />;
  if (id === 'telefono') return <PhoneIcon size={14} weight="bold" />;
  if (id === 'correo')   return <EnvelopeIcon size={14} weight="bold" />;
  if (id === 'rfc')      return <IdentificationCardIcon size={14} weight="bold" />;
  if (id === 'curp')     return <IdentificationBadgeIcon size={14} weight="bold" />;
  return null;
}

export default function PatternRow({ pattern, result, onLoadExample }: PatternRowProps) {
  const hayInput = result !== null;
  const coincide = result?.matched ?? false;

  // Barra lateral: gris sin input, verde si coincide, rojo si no
  let barraColor = '#e2e8f0';
  if (hayInput && coincide)  barraColor = '#16a34a';
  if (hayInput && !coincide) barraColor = 'var(--color-accent)';

  // Badge de resultado
  let badgeTexto = '—';
  let badgeClass = 'bg-slate-100 text-slate-400 border border-slate-200';
  let badgeStyle: React.CSSProperties = {};

  if (hayInput && coincide) {
    badgeTexto = 'Válido';
    badgeClass = 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900';
  } else if (hayInput && !coincide) {
    badgeTexto = 'No válido';
    badgeClass = 'bg-red-50 border border-red-100';
    badgeStyle = { color: 'var(--color-accent)' };
  }

  return (
    <div className="flex items-stretch hover:bg-slate-50 transition-colors group">

      {/* Barra de color a la izquierda */}
      <div className="w-1 shrink-0 my-3 ml-3 rounded-full transition-colors duration-300" style={{ backgroundColor: barraColor }} />

      <div className="flex-1 px-5 py-4 min-w-0">

        {/* Fila: icono + nombre | regex | badge | boton ejemplo */}
        <div className="flex items-center gap-3 min-w-0">

          <div className="flex items-center gap-2 w-28 shrink-0 text-slate-400">
            {getIcon(pattern.id)}
            <span className="font-bold text-sm text-slate-800">{pattern.name}</span>
          </div>

          <div className="flex-1 min-w-0 bg-slate-100 rounded-lg px-3 py-1.5 font-mono text-xs text-slate-400 truncate hidden sm:block">
            /{pattern.regex.source}/
          </div>

          <span className={`shrink-0 text-xs font-black px-3 py-1 rounded-full whitespace-nowrap ${badgeClass}`} style={badgeStyle}>
            {badgeTexto}
          </span>

          <button
            onClick={onLoadExample}
            title={`Cargar: ${pattern.example}`}
            className="shrink-0 text-slate-300 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100"
          >
            <ArrowUpRightIcon size={14} />
          </button>
        </div>

        {/* Desglose de segmentos — solo cuando hay coincidencia */}
        {coincide && result && (
          <div className="mt-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
              Desglose de captura
            </p>
            <div className="flex divide-x divide-slate-200">
              {pattern.decompose(result.value).map((seg, i) => (
                <div key={i} className="flex flex-col items-center px-5 py-1 first:pl-0">
                  <span className="font-mono font-black text-lg text-slate-900">{seg.value}</span>
                  <span className="text-xs text-center text-slate-400 mt-0.5">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
