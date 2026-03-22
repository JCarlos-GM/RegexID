import type { PatternDef, MatchResult } from '../core';

interface PatternCardProps {
  pattern: PatternDef;
  result: MatchResult | null;
  onLoadExample: () => void;
  focused?: boolean; // modo seleccionado — muestra anatomia y desglose completo
}

export default function PatternCard({ pattern, result, onLoadExample, focused = false }: PatternCardProps) {
  const hasInput = result !== null;
  const matched = result?.matched ?? false;
  const state = !hasInput ? 'idle' : matched ? 'match' : 'nomatch';

  return (
    <div className={`pcard pcard--${state} ${focused ? 'pcard--focused' : ''}`}>
      {/* Encabezado */}
      <div className="pcard-header">
        <div className="pcard-name-group">
          <span className="pcard-tag">{pattern.id.toUpperCase()}</span>
          <span className="pcard-name">{pattern.name}</span>
        </div>
        <span className={`pcard-badge badge--${state}`}>
          {state === 'match'   && '\u2713 MATCH'}
          {state === 'nomatch' && '\u2717 NO MATCH'}
          {state === 'idle'    && '\u25CB IDLE'}
        </span>
      </div>

      {/* Descripcion */}
      <p className="pcard-description">{pattern.description}</p>

      {/* Expresion regular */}
      <div className="pcard-regex-box">
        <span className="pcard-regex-slash">/</span>
        <code className="pcard-regex-source">{pattern.regex.source}</code>
        <span className="pcard-regex-slash">/</span>
        <span className="pcard-regex-flags">{pattern.regex.flags || '\u00A0'}</span>
      </div>

      {/* Anatomia de la regex — solo en modo enfocado */}
      {focused && (
        <div className="pcard-anatomy">
          <div className="pcard-section-title">Anatomia de la expresion</div>
          <div className="anatomy-rows">
            {pattern.parts.map((part, i) => (
              <div className="anatomy-row" key={i}>
                <code className="anatomy-token">{part.token}</code>
                <span className="anatomy-arrow" aria-hidden="true">{'\u2192'}</span>
                <span className="anatomy-label">{part.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resultado del match */}
      {state === 'match' && result && (
        <div className="pcard-match-detail">
          <div className="pcard-section-title">Coincidencia</div>
          <span className="pcard-match-value">&quot;{result.value}&quot;</span>

          {/* Desglose de segmentos — solo en modo enfocado */}
          {focused && (
            <div className="pcard-segments">
              <div className="pcard-section-title" style={{ marginTop: '12px' }}>Desglose</div>
              <div className="segments-grid">
                {pattern.decompose(result.value).map((seg, i) => (
                  <div className="segment-item" key={i}>
                    <span className="segment-value">{seg.value}</span>
                    <span className="segment-label">{seg.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grupos capturados (si los hay) en modo compacto */}
          {!focused && result.groups.length > 0 && (
            <div className="pcard-groups">
              {result.groups.map((g, i) => (
                <span className="pcard-group" key={i}>
                  <span className="group-index">G{i + 1}</span>
                  <span className="group-value">{g}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Boton de ejemplo */}
      <button className="pcard-example" onClick={onLoadExample} title="Cargar ejemplo">
        <span className="pcard-example-label">Ejemplo</span>
        <span className="pcard-example-value">{pattern.example}</span>
        <span className="pcard-example-icon" aria-hidden="true">{'\u2197'}</span>
      </button>
    </div>
  );
}
