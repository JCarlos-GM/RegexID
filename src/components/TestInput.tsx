import { X, CheckCircle } from 'lucide-react';

interface TestInputProps {
  value: string;
  onChange: (v: string) => void;
  matchCount: number;
  total: number;
  modeName?: string;
}

export default function TestInput({ value, onChange, matchCount, total, modeName }: TestInputProps) {
  const hayTexto = value.length > 0;
  const hayCoincidencias = hayTexto && matchCount > 0;

  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Cadena a evaluar</p>

      {/* Caja del input */}
      <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Escribe o pega la cadena..."
            spellCheck={false}
            autoComplete="off"
            className="flex-1 min-w-0 font-mono text-xl sm:text-3xl font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-300 placeholder:font-normal"
          />
          {/* Boton para limpiar el input */}
          {hayTexto && (
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

      {/* Estadisticas debajo del input */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs text-slate-400">{value.length} caracteres</span>

        {hayTexto ? (
          <span
            className="text-xs font-semibold flex items-center gap-1.5"
            style={{ color: hayCoincidencias ? '#16a34a' : '#dc2626' }}
          >
            <CheckCircle size={13} />
            {matchCount} coincidencia{matchCount !== 1 ? 's' : ''} en modo {modeName ?? 'AUTO'}
          </span>
        ) : (
          <span className="text-xs text-slate-400">{total} expresiones activas</span>
        )}
      </div>
    </div>
  );
}
