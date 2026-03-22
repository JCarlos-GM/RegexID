import { useState } from 'react';
import { PATTERNS } from '../core';
import { ChevronDown } from 'lucide-react';

// Pagina educativa — muestra la anatomia completa de cada patron
export default function Patterns() {
  const [open, setOpen] = useState<string>(PATTERNS[0].id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="pb-6 border-b border-slate-200 mb-8">
        <p className="text-xs font-black uppercase tracking-widest mb-2"
          style={{ color: 'var(--color-accent)' }}>
          Referencia
        </p>
        <h1 className="text-3xl font-black text-slate-900">Patrones de validacion</h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Cada patron define una expresion regular con su anatomia token a token y un ejemplo de cadena valida.
          Son las expresiones sugeridas en la practica de Lenguajes y Automatas I.
        </p>
      </div>

      {/* Acordeon de patrones */}
      <div className="flex flex-col divide-y divide-slate-200 border border-slate-200">
        {PATTERNS.map((p) => {
          const isOpen = open === p.id;
          return (
            <div key={p.id} className="bg-white dark:bg-slate-100">
              {/* Cabecera del acordeon */}
              <button
                className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpen(isOpen ? '' : p.id)}
              >
                <span className="px-2 py-0.5 text-xs font-black uppercase tracking-wider border border-slate-200 text-slate-400 shrink-0 w-24 text-center">
                  {p.id}
                </span>
                <span className="font-black text-slate-900 text-base flex-1">{p.name}</span>
                <code className="hidden sm:block font-mono text-xs text-slate-400 flex-1 truncate">
                  /{p.regex.source}/
                </code>
                <ChevronDown
                  size={16}
                  className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Contenido expandido */}
              {isOpen && (
                <div className="px-6 pb-7 pt-1 border-t border-slate-100 bg-slate-50">
                  <p className="text-sm text-slate-500 mb-6">{p.description}</p>

                  {/* Regex completa */}
                  <div className="mb-6">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Expresion regular
                    </p>
                    <div className="flex items-center gap-1 font-mono text-sm px-4 py-3 bg-white dark:bg-slate-200 border border-slate-200 overflow-x-auto">
                      <span className="text-slate-400">/</span>
                      <span style={{ color: 'var(--color-accent)' }}>{p.regex.source}</span>
                      <span className="text-slate-400">/</span>
                    </div>
                  </div>

                  {/* Anatomia token a token */}
                  <div className="mb-6">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                      Anatomia del patron
                    </p>
                    <div className="flex flex-col gap-2">
                      {p.parts.map((part, i) => (
                        <div
                          key={i}
                          className="flex items-start sm:items-center gap-3 flex-col sm:flex-row"
                        >
                          <code className="font-mono text-xs px-3 py-1.5 bg-white dark:bg-slate-200 border border-slate-200 shrink-0 min-w-40" style={{ color: 'var(--color-accent)' }}>
                            {part.token}
                          </code>
                          <span className="text-slate-400 shrink-0 hidden sm:block">&rarr;</span>
                          <span className="text-sm text-slate-600">{part.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ejemplo valido */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Ejemplo valido
                    </p>
                    <div className="inline-flex items-center gap-3 px-4 py-2 border bg-white dark:bg-slate-200"
                      style={{ borderColor: 'var(--color-match)' }}>
                      <span className="text-xs font-black"
                        style={{ color: 'var(--color-match)' }}>
                        Válido
                      </span>
                      <code className="font-mono text-sm text-slate-700">{p.example}</code>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
