import { X } from 'lucide-react';

interface TestInputProps {
  value: string;
  onChange: (v: string) => void;
  matchCount: number;
  total: number;
}

export default function TestInput({ value, onChange, matchCount, total }: TestInputProps) {
  const hasInput = value.length > 0;
  const allMatch = hasInput && matchCount === total;
  const someMatch = hasInput && matchCount > 0;

  const accentColor = allMatch ? 'var(--color-match)' : someMatch ? 'var(--color-accent)' : undefined;

  return (
    <div className="relative">
      {/* Barra de estado izquierda */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-colors duration-300"
        style={{ backgroundColor: accentColor ?? 'var(--color-slate-200)' }}
      />

      <div className="pl-5 pr-4 py-5">
        {/* Input principal */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Escribe o pega la cadena a evaluar..."
            spellCheck={false}
            autoComplete="off"
            className="flex-1 font-mono text-2xl font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-300 placeholder:font-normal placeholder:text-xl"
          />
          {hasInput && (
            <button
              onClick={() => onChange('')}
              className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors"
              aria-label="Limpiar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs font-mono text-slate-400">{value.length} caracteres</span>
          {hasInput ? (
            <span className="text-xs font-black font-mono" style={{ color: accentColor }}>
              {matchCount} / {total} patrones coinciden
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              El motor evalua las {total} expresiones en tiempo real
            </span>
          )}
        </div>
      </div>

      {/* Borde inferior */}
      <div
        className="h-px transition-colors duration-300"
        style={{ backgroundColor: accentColor ?? 'var(--color-slate-200)' }}
      />
    </div>
  );
}
