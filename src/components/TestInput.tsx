import { X, CheckCircle } from 'lucide-react';

interface TestInputProps {
  value: string;
  onChange: (v: string) => void;
  matchCount: number;
  total: number;
  modeName?: string;
}

export default function TestInput({ value, onChange, matchCount, total, modeName }: TestInputProps) {
  const hasInput = value.length > 0;
  const someMatch = hasInput && matchCount > 0;

  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">
        Cadena a evaluar
      </p>

      {/* Caja del input — blanca, redondeada, elevada */}
      <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Escribe o pega la cadena..."
            spellCheck={false}
            autoComplete="off"
            className="flex-1 font-mono text-3xl font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-300 placeholder:font-normal"
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
      </div>

      {/* Estadisticas bajo el input */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-slate-400">{value.length} caracteres</span>
        {hasInput ? (
          <span
            className="text-xs font-semibold flex items-center gap-1.5"
            style={{ color: someMatch ? 'var(--color-match)' : 'var(--color-nomatch)' }}
          >
            <CheckCircle size={13} />
            {matchCount} coincidencia{matchCount !== 1 ? 's' : ''} en modo {modeName ?? 'AUTO'}
          </span>
        ) : (
          <span className="text-xs text-slate-400">
            {total} expresiones activas
          </span>
        )}
      </div>
    </div>
  );
}
