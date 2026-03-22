import type { PatternDef, MatchResult } from './types';

// Ejecuta el motor de expresiones regulares de JavaScript (ECMAScript RegExp)
// sobre la cadena de entrada y retorna el resultado estructurado
export function testPattern(pattern: PatternDef, input: string): MatchResult {
  const exec = pattern.regex.exec(input);
  return {
    matched: exec !== null,
    value: exec ? exec[0] : '',
    groups: exec ? exec.slice(1).filter((g) => g !== undefined) : [],
    index: exec ? exec.index : -1,
  };
}
