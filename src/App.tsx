import { useState } from 'react';
import { PATTERNS, testPattern } from './core';
import TestInput from './components/TestInput';
import ModeSelector from './components/ModeSelector';
import PatternCard from './components/PatternCard';
import './App.css';

export default function App() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<string>('auto'); // 'auto' | pattern.id

  // Calcula resultados para todos los patrones — el motor corre siempre
  const allResults = input
    ? PATTERNS.map((p) => testPattern(p, input))
    : null;

  const matchCount = allResults ? allResults.filter((r) => r.matched).length : 0;

  // En modo auto se muestran todas las tarjetas; en modo especifico solo una
  const activePattern = PATTERNS.find((p) => p.id === mode) ?? null;
  const activeResult = activePattern && allResults
    ? allResults[PATTERNS.indexOf(activePattern)]
    : null;

  // Al cambiar de modo se carga el ejemplo del patron seleccionado para facilitar la demo
  function handleModeChange(id: string) {
    setMode(id);
    if (id !== 'auto') {
      const pat = PATTERNS.find((p) => p.id === id);
      if (pat) setInput(pat.example);
    }
  }

  return (
    <div className="app-root">
      {/* Cabecera */}
      <header className="app-header">
        <div className="header-left">
          <div className="header-badge" aria-hidden="true">RE</div>
          <div>
            <h1 className="header-title">DeltaCheck</h1>
            <p className="header-subtitle">Validador de cadenas con expresiones regulares</p>
          </div>
        </div>
        <div className="header-engine">
          <span className="engine-label">Motor</span>
          <span className="engine-value">ECMAScript RegExp</span>
        </div>
      </header>

      {/* Selector de modo */}
      <ModeSelector patterns={PATTERNS} activeId={mode} onChange={handleModeChange} />

      {/* Cadena de prueba */}
      <TestInput
        value={input}
        onChange={setInput}
        matchCount={mode === 'auto' ? matchCount : (activeResult?.matched ? 1 : 0)}
        total={mode === 'auto' ? PATTERNS.length : 1}
      />

      {/* Vista AUTO: grid con las 5 tarjetas compactas */}
      {mode === 'auto' && (
        <>
          <div className="section-label">
            <span>Patrones definidos</span>
            <span className="section-count">{PATTERNS.length} expresiones regulares</span>
          </div>
          <main className="patterns-grid">
            {PATTERNS.map((pattern, i) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                result={allResults ? allResults[i] : null}
                onLoadExample={() => setInput(pattern.example)}
              />
            ))}
          </main>
        </>
      )}

      {/* Vista ESPECIFICA: una tarjeta expandida con anatomia y desglose */}
      {mode !== 'auto' && activePattern && (
        <main className="focused-view">
          <PatternCard
            pattern={activePattern}
            result={activeResult}
            onLoadExample={() => setInput(activePattern.example)}
            focused
          />
        </main>
      )}

      <footer className="app-footer">
        <span>Lenguajes y Automatas I</span>
        <span className="footer-sep">/</span>
        <span>Practica: Validador de Datos Personales con Expresiones Regulares</span>
      </footer>
    </div>
  );
}
