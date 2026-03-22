// Interfaces compartidas entre el motor y los componentes de UI

export interface RegexPart {
  token: string;  // fragmento de la expresion regular
  label: string;  // explicacion en lenguaje natural
}

export interface MatchSegment {
  label: string;  // nombre del segmento (ej: "Homoclave")
  value: string;  // valor extraido de la cadena validada
}

export interface PatternDef {
  id: string;
  name: string;
  description: string;
  example: string;
  regex: RegExp;
  parts: RegexPart[];
  decompose: (matched: string) => MatchSegment[];
}

export interface MatchResult {
  matched: boolean;
  value: string;    // cadena que coincidio con el patron
  groups: string[]; // grupos capturados por parentesis en la regex
  index: number;    // posicion donde inicio la coincidencia
}
