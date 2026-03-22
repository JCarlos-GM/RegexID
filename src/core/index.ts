// Punto de entrada del modulo de validacion — re-exporta todo lo necesario
export type { PatternDef, MatchResult, RegexPart, MatchSegment } from './types';
export { PATTERNS } from './patterns';
export { testPattern } from './engine';
