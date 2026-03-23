import type { PatternDef, MatchResult } from './types';

// Aplica la expresion regular del patron sobre la cadena recibida
// y devuelve si hubo coincidencia y cual fue el valor que coincidio
export function testPattern(patron: PatternDef, cadena: string): MatchResult {
  const resultado = patron.regex.exec(cadena);

  if (resultado === null) {
    // La cadena no coincide con el patron
    return { matched: false, value: '' };
  }

  // La cadena coincide — resultado[0] es el texto completo que coincidio
  return { matched: true, value: resultado[0] };
}
