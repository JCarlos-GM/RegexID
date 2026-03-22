import { XIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';

interface TestInputProps {
  value: string;
  onChange: (v: string) => void;
  modeColor?: string;
}

export default function TestInput({ value, onChange, modeColor }: TestInputProps) {
  const hayTexto = value.length > 0;
  const colorActivo = modeColor ?? '#dc2626';

  return (
    <div className="space-y-3">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 px-1">Cadena a evaluar</p>

      {/* Caja del input */}
      <div className="bg-white dark:bg-slate-100 border border-slate-200 rounded-2xl px-5 py-4 shadow-sm transition-all"
        style={{ borderColor: hayTexto ? `${colorActivo}55` : '' }}
      >
        <div className="flex items-center gap-3">
          <MagnifyingGlassIcon size={20} weight="bold" className="shrink-0 text-slate-300" />

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Escribe o pega la cadena..."
            spellCheck={false}
            autoComplete="off"
            className="flex-1 min-w-0 font-mono text-xl sm:text-2xl font-semibold text-slate-900 bg-transparent outline-none placeholder:text-slate-300 placeholder:font-normal"
          />

          {hayTexto && (
            <button
              onClick={() => onChange('')}
              className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors"
              aria-label="Limpiar"
            >
              <XIcon size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Contador de caracteres */}
      <div className="px-1">
        <span className="text-xs text-slate-400">{value.length} caracteres</span>
      </div>
    </div>
  );
}
