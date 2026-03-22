import { useState } from 'react';
import { PATTERNS, testPattern } from '../core';
import TestInput from '../components/TestInput';
import ModeSelector from '../components/ModeSelector';
import PatternCard from '../components/PatternCard';

export default function Validator() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<string>('auto');

  const allResults = input ? PATTERNS.map((p) => testPattern(p, input)) : null;
  const matchCount = allResults ? allResults.filter((r) => r.matched).length : 0;

  const activePattern = PATTERNS.find((p) => p.id === mode) ?? null;
  const activeResult =
    activePattern && allResults ? allResults[PATTERNS.indexOf(activePattern)] : null;

  function handleModeChange(id: string) {
    setMode(id);
    if (id !== 'auto') {
      const pat = PATTERNS.find((p) => p.id === id);
      if (pat) setInput(pat.example);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-6">
      {/* Titulo de seccion */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-black text-slate-900">Validador</h1>
        <p className="text-sm text-slate-500 mt-1">
          Motor ECMAScript RegExp &mdash; evaluacion en tiempo real
        </p>
      </div>

      {/* Selector de modo */}
      <ModeSelector patterns={PATTERNS} activeId={mode} onChange={handleModeChange} />

      {/* Campo de entrada */}
      <TestInput
        value={input}
        onChange={setInput}
        matchCount={mode === 'auto' ? matchCount : activeResult?.matched ? 1 : 0}
        total={mode === 'auto' ? PATTERNS.length : 1}
      />

      {/* Vista AUTO — grid de 5 tarjetas */}
      {mode === 'auto' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              Patrones activos
            </p>
            <span className="text-xs font-mono text-slate-400">
              {PATTERNS.length} expresiones regulares
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PATTERNS.map((pattern, i) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                result={allResults ? allResults[i] : null}
                onLoadExample={() => setInput(pattern.example)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Vista ESPECIFICA — tarjeta expandida centrada */}
      {mode !== 'auto' && activePattern && (
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <PatternCard
              pattern={activePattern}
              result={activeResult}
              onLoadExample={() => setInput(activePattern.example)}
              focused
            />
          </div>
        </div>
      )}
    </div>
  );
}
