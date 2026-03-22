import { UserIcon, PhoneIcon, EnvelopeIcon, IdentificationCardIcon, IdentificationBadgeIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import type { PatternDef, MatchResult } from '../core';

interface PatternCardProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
}

function getIcon(id: string, size = 22) {
  if (id === 'nombre')   return <UserIcon size={size} weight="duotone" />;
  if (id === 'telefono') return <PhoneIcon size={size} weight="duotone" />;
  if (id === 'correo')   return <EnvelopeIcon size={size} weight="duotone" />;
  if (id === 'rfc')      return <IdentificationCardIcon size={size} weight="duotone" />;
  if (id === 'curp')     return <IdentificationBadgeIcon size={size} weight="duotone" />;
  return null;
}

export default function PatternCard({ pattern, result, onLoadExample }: PatternCardProps) {
  const hayInput = result !== null;
  const coincide = result?.matched ?? false;

  return (
    <div className="bg-white dark:bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

      {/* Encabezado */}
      <div className="px-7 py-6 flex items-start justify-between gap-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-start gap-4">
          {/* Icono del patron */}
          <div className="rounded-2xl p-3 shrink-0 bg-white dark:bg-slate-200 border border-slate-200" style={{ color: 'var(--color-accent)' }}>
            {getIcon(pattern.id)}
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest mb-0.5 text-slate-400">{pattern.id}</p>
            <h2 className="text-xl font-black text-slate-900">{pattern.name}</h2>
            <p className="text-sm text-slate-500 mt-1">{pattern.description}</p>
          </div>
        </div>

        {/* Badge de estado */}
        <div className="shrink-0 mt-1">
          {hayInput && (
            <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
              coincide
                ? 'bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-900'
                : 'bg-slate-100 border border-slate-200'
            }`} style={!coincide ? { color: 'var(--color-accent)' } : undefined}>
              {coincide ? 'Válido' : 'No válido'}
            </span>
          )}
        </div>
      </div>

      {/* Expresion regular */}
      <div className="px-7 py-5 border-b border-slate-100 bg-slate-50">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Expresion regular</p>
        <div className="font-mono text-sm overflow-x-auto whitespace-nowrap">
          <span className="text-slate-400">/</span>
          <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{pattern.regex.source}</span>
          <span className="text-slate-400">/</span>
        </div>
      </div>

      {/* Anatomia: que significa cada token */}
      <div className="px-7 py-5 border-b border-slate-100">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Anatomia del patron</p>
        <div className="flex flex-col divide-y divide-slate-100">
          {pattern.parts.map((part, i) => (
            <div key={i} className="flex items-baseline gap-5 py-2.5">
              <code className="font-mono text-xs px-2 py-0.5 shrink-0 min-w-36 rounded bg-slate-100 border border-slate-200" style={{ color: 'var(--color-accent)' }}>
                {part.token}
              </code>
              <span className="text-sm text-slate-500 leading-snug">{part.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resultado de evaluar la cadena */}
      <div className="px-7 py-5 border-b border-slate-100">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Resultado</p>

        {!hayInput && (
          <p className="text-sm text-slate-400">Escribe una cadena arriba para evaluar.</p>
        )}

        {hayInput && !coincide && (
          <p className="text-sm font-mono" style={{ color: 'var(--color-accent)' }}>La cadena no coincide con el patron.</p>
        )}

        {hayInput && coincide && result && (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              Coincidencia:{' '}
              <code className="font-mono font-black text-slate-800">&quot;{result.value}&quot;</code>
            </p>
            <div className="flex divide-x divide-slate-200">
              {pattern.decompose(result.value).map((seg, i) => (
                <div key={i} className="flex flex-col items-center px-5 py-1 first:pl-0">
                  <span className="font-mono text-2xl font-black text-slate-900">{seg.value}</span>
                  <span className="text-xs text-center text-slate-400 uppercase tracking-wide mt-1">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: boton de ejemplo */}
      <button
        onClick={onLoadExample}
        className="w-full flex items-center justify-between gap-4 px-7 py-4 text-left hover:bg-slate-50 transition-colors group"
      >
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Ejemplo valido</span>
          <code className="font-mono text-sm text-slate-700">{pattern.example}</code>
        </div>
        <ArrowUpRightIcon size={14} className="text-slate-300 group-hover:text-slate-600 shrink-0 transition-colors" />
      </button>
    </div>
  );
}
