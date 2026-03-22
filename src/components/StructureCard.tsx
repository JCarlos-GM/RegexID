import type { PatternDef } from '../core';

interface StructureCardProps {
  pattern: PatternDef;
}

// Tarjeta que muestra la estructura del patron con un ejemplo visual segmentado
export default function StructureCard({ pattern }: StructureCardProps) {
  // Descomponemos el ejemplo del patron en segmentos etiquetados
  const segmentos = pattern.decompose(pattern.example);

  return (
    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden">

      {/* Encabezado */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-baseline justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">Estructura</p>
          <h3 className="text-base font-black text-slate-800 mt-0.5">{pattern.name}</h3>
        </div>
        <p className="text-xs text-slate-400 text-right leading-snug max-w-48">{pattern.description}</p>
      </div>

      {/* Ejemplo visual: la cadena partida en segmentos con etiqueta */}
      <div className="px-6 py-6">
        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Ejemplo</p>

        {/* Cadena completa — alternando colores para distinguir segmentos */}
        <div className="font-mono text-2xl font-black tracking-widest mb-6 overflow-x-auto whitespace-nowrap">
          {segmentos.map((seg, i) => (
            <span key={i} style={{ color: i % 2 === 0 ? 'var(--color-accent)' : '#64748b' }}>
              {seg.value}
            </span>
          ))}
        </div>

        {/* Cajas individuales por segmento */}
        <div className="flex flex-wrap gap-2">
          {segmentos.map((seg, i) => {
            const esRojo = i % 2 === 0;
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl min-w-12"
                style={{
                  border: `1.5px solid ${esRojo ? 'var(--color-accent)' : '#cbd5e1'}`,
                  backgroundColor: esRojo ? '#fef2f2' : '#f8fafc',
                }}
              >
                <span className="font-mono font-black text-sm leading-none" style={{ color: esRojo ? 'var(--color-accent)' : '#475569' }}>
                  {seg.value}
                </span>
                <span className="text-xs text-center leading-tight font-semibold" style={{ color: esRojo ? 'var(--color-accent)' : '#94a3b8' }}>
                  {seg.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
