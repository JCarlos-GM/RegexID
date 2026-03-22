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

  return (
    <div
      className="border bg-white p-5 transition-colors duration-200"
      style={{
        borderColor: allMatch
          ? 'var(--color-match)'
          : hasInput && matchCount > 0
          ? 'var(--color-accent)'
          : 'var(--color-slate-200)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">
          Cadena de prueba
        </span>
        {hasInput && (
          <span
            className="text-xs font-black font-mono"
            style={{ color: allMatch ? 'var(--color-match)' : 'var(--color-accent)' }}
          >
            {matchCount}/{total} patrones coinciden
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe la cadena a evaluar..."
          spellCheck={false}
          autoComplete="off"
          className="flex-1 font-mono text-lg text-slate-900 bg-transparent outline-none placeholder:text-slate-300 border-b border-slate-200 pb-1 focus:border-slate-400 transition-colors"
        />
        {hasInput && (
          <button
            onClick={() => onChange('')}
            className="p-1 text-slate-300 hover:text-slate-500 transition-colors"
            aria-label="Limpiar"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between mt-3">
        <span className="text-xs font-mono text-slate-300">{value.length} chars</span>
        {!hasInput && (
          <span className="text-xs text-slate-300">
            El motor evalua las {total} expresiones en tiempo real
          </span>
        )}
      </div>
    </div>
  );
}
