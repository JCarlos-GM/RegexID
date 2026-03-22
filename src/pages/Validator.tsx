import { useState } from 'react';
import { PATTERNS, testPattern } from '../core';
import TestInput from '../components/TestInput';
import ModeSelector from '../components/ModeSelector';
import PatternRow from '../components/PatternRow';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-0">

      {/* Titulo */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Validador</h1>
        <p className="text-sm text-slate-500 mt-1">
          Motor ECMAScript RegExp &mdash; evaluacion en tiempo real
        </p>
      </div>

      {/* Tabs de modo */}
      <ModeSelector patterns={PATTERNS} activeId={mode} onChange={handleModeChange} />

      {/* Input prominente */}
      <div className="mt-8 mb-8">
        <TestInput
          value={input}
          onChange={setInput}
          matchCount={mode === 'auto' ? matchCount : activeResult?.matched ? 1 : 0}
          total={mode === 'auto' ? PATTERNS.length : 1}
        />
      </div>

      {/* ── Modo AUTO: lista vertical de patrones ── */}
      {mode === 'auto' && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              Resultados
            </p>
            <p className="text-xs font-mono text-slate-400">5 expresiones</p>
          </div>

          <div className="border border-slate-200 bg-white divide-y divide-slate-100">
            {PATTERNS.map((pattern, i) => (
              <PatternRow
                key={pattern.id}
                pattern={pattern}
                result={allResults ? allResults[i] : null}
                onLoadExample={() => setInput(pattern.example)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Modo ESPECIFICO: panel de detalle centrado ── */}
      {mode !== 'auto' && activePattern && (
        <PatternCard
          pattern={activePattern}
          result={activeResult}
          onLoadExample={() => setInput(activePattern.example)}
        />
      )}
    </div>
  );
}
