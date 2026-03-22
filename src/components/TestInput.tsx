interface TestInputProps {
  value: string;
  onChange: (v: string) => void;
  matchCount: number;
  total: number;
}

// Zona central de entrada de cadena — donde el usuario escribe lo que quiere evaluar
export default function TestInput({ value, onChange, matchCount, total }: TestInputProps) {
  const hasInput = value.length > 0;
  const allMatch = hasInput && matchCount === total;

  return (
    <div className={`test-input-wrapper ${allMatch ? 'test-input--all' : hasInput && matchCount > 0 ? 'test-input--partial' : ''}`}>
      <div className="test-input-header">
        <span className="test-input-label">Cadena de prueba</span>
        {hasInput && (
          <span className="test-match-count">
            {matchCount}/{total} patrones coinciden
          </span>
        )}
      </div>

      <div className="test-input-field-row">
        <input
          className="test-input-field"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Escribe la cadena a evaluar..."
          spellCheck={false}
          autoComplete="off"
        />
        {hasInput && (
          <button className="test-clear-btn" onClick={() => onChange('')} title="Limpiar">
            {'\u2715'}
          </button>
        )}
      </div>

      <div className="test-input-meta">
        <span className="test-char-count">{value.length} caracteres</span>
        {!hasInput && (
          <span className="test-hint">
            El motor ejecuta las 5 expresiones regulares sobre tu cadena en tiempo real
          </span>
        )}
      </div>
    </div>
  );
}
