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
  let badgeEstilo = { backgroundColor: '#f1f5f9', color: '#94a3b8', border: '1px solid #e2e8f0' };

  if (hayInput && coincide) {
    badgeTexto = '✓ MATCH';
    badgeEstilo = { backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' };
  } else if (hayInput && !coincide) {
    badgeTexto = '✗ NO MATCH';
    badgeEstilo = { backgroundColor: '#fef2f2', color: 'var(--color-accent)', border: '1px solid #fecaca' };
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

          <span className="shrink-0 text-xs font-black px-3 py-1 rounded-full whitespace-nowrap" style={badgeEstilo}>
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
            <div className="flex flex-wrap gap-2">
              {pattern.decompose(result.value).map((seg, i) => (
                <div key={i} className="flex flex-col items-center gap-1 px-4 py-2.5 min-w-14 rounded-xl border border-red-100 bg-red-50">
                  <span className="font-mono font-black text-sm" style={{ color: 'var(--color-accent)' }}>{seg.value}</span>
                  <span className="text-xs text-center leading-tight font-medium text-red-300">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
