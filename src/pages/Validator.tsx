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

  const activeLabel = activePattern?.name ?? 'AUTO';

  function handleModeChange(id: string) {
    setMode(id);
    setInput('');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 flex flex-col gap-8">

      {/* Selector de modo */}
      <ModeSelector patterns={PATTERNS} activeId={mode} onChange={handleModeChange} />

      {/* Input */}
      <TestInput
        value={input}
        onChange={setInput}
        matchCount={mode === 'auto' ? matchCount : activeResult?.matched ? 1 : 0}
        total={mode === 'auto' ? PATTERNS.length : 1}
        modeName={activeLabel}
      />

      {/* Modo AUTO — lista en tarjeta blanca */}
      {mode === 'auto' && (
        <div>
          <h2 className="text-base font-bold text-slate-800 mb-3">
            Resultados de validacion
          </h2>
          <div className="bg-white dark:bg-slate-100 border border-slate-200 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
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

      {/* Modo especifico — panel de detalle */}
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
