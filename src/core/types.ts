// Tipos compartidos entre el motor y los componentes de UI

// Un fragmento de la expresion regular con su explicacion
export interface RegexPart {
  token: string; // el fragmento de la regex, ej: '\d{6}'
  label: string; // que significa en lenguaje natural
}

// Un segmento del resultado cuando la cadena coincide
export interface MatchSegment {
  label: string; // nombre del segmento, ej: 'Fecha'
  value: string; // valor extraido de la cadena
}

// La definicion completa de un patron de validacion
export interface PatternDef {
  id: string;
  name: string;
  description: string;
  example: string;
  regex: RegExp;
  parts: RegexPart[];
  decompose: (cadenaValida: string) => MatchSegment[];
}

// El resultado de aplicar un patron sobre una cadena
export interface MatchResult {
  matched: boolean; // true si la cadena paso la validacion
  value: string;    // la cadena que coincidio (vacia si no hubo coincidencia)
}
