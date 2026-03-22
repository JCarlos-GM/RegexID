import type { PatternDef } from './types';

// Definicion de los cinco patrones de la practica.
// Fuente de las regex: tabla de expresiones regulares sugeridas (Lenguajes y Automatas I)

export const PATTERNS: PatternDef[] = [
  {
    id: 'nombre',
    name: 'Nombre',
    description: 'Letras iniciales mayusculas, permite espacios y acentos.',
    example: 'Juan Garcia Lopez',
    regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
    parts: [
      { token: '^',                              label: 'Inicio de cadena' },
      { token: '[A-ZÁÉÍÓÚÑ]',                    label: 'Mayuscula inicial (incluye acentos y N con tilde)' },
      { token: '[a-záéíóúñ]+',                   label: 'Una o mas letras minusculas' },
      { token: '(\\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*', label: 'Cero o mas palabras adicionales con mayuscula inicial' },
      { token: '$',                              label: 'Fin de cadena' },
    ],
    decompose: (s) =>
      s.split(' ').map((word, i) => ({ label: `Palabra ${i + 1}`, value: word })),
  },
  {
    id: 'telefono',
    name: 'Telefono',
    description: '10 digitos numericos exactos.',
    example: '5512345678',
    regex: /^\d{10}$/,
    parts: [
      { token: '^',       label: 'Inicio de cadena' },
      { token: '\\d{10}', label: 'Exactamente 10 digitos numericos (0-9)' },
      { token: '$',       label: 'Fin de cadena' },
    ],
    decompose: (s) => [
      { label: 'Clave LADA', value: s.slice(0, 2) },
      { label: 'Numero local', value: s.slice(2, 6) },
      { label: 'Extension', value: s.slice(6, 10) },
    ],
  },
  {
    id: 'correo',
    name: 'Correo',
    description: 'Formato estandar usuario@dominio.ext.',
    example: 'usuario@dominio.com',
    regex: /^[\w-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    parts: [
      { token: '^',              label: 'Inicio de cadena' },
      { token: '[\\w-]+',        label: 'Usuario: letras, numeros, guion o guion bajo' },
      { token: '@',              label: 'Arroba: separador obligatorio' },
      { token: '[a-zA-Z\\d.-]+', label: 'Nombre del dominio' },
      { token: '\\.',            label: 'Punto literal entre dominio y extension' },
      { token: '[a-zA-Z]{2,}',   label: 'Extension: minimo 2 letras (com, mx, org...)' },
      { token: '$',              label: 'Fin de cadena' },
    ],
    decompose: (s) => {
      const [local, rest] = s.split('@');
      const lastDot = rest.lastIndexOf('.');
      return [
        { label: 'Usuario', value: local },
        { label: 'Dominio', value: rest.slice(0, lastDot) },
        { label: 'Extension', value: rest.slice(lastDot + 1) },
      ];
    },
  },
  {
    id: 'rfc',
    name: 'RFC',
    description: '4 letras, 6 numeros y 3 caracteres de homoclave.',
    example: 'GOMA820716KH3',
    regex: /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/,
    parts: [
      { token: '^',            label: 'Inicio de cadena' },
      { token: '[A-ZN&]{3,4}', label: '3 letras (persona moral) o 4 letras (persona fisica): iniciales del nombre' },
      { token: '\\d{6}',       label: '6 digitos: fecha de nacimiento en formato AAMMDD' },
      { token: '[A-Z\\d]{3}',  label: '3 caracteres alfanumericos: homoclave asignada por el SAT' },
      { token: '$',            label: 'Fin de cadena' },
    ],
    decompose: (s) => {
      const letras = s.match(/^[A-ZÑ&]{3,4}/)?.[0] ?? '';
      const fecha = s.slice(letras.length, letras.length + 6);
      const hc = s.slice(letras.length + 6);
      return [
        { label: 'Iniciales', value: letras },
        { label: 'Fecha (AA)', value: fecha.slice(0, 2) },
        { label: 'Fecha (MM)', value: fecha.slice(2, 4) },
        { label: 'Fecha (DD)', value: fecha.slice(4, 6) },
        { label: 'Homoclave', value: hc },
      ];
    },
  },
  {
    id: 'curp',
    name: 'CURP',
    description: 'Formato oficial de 18 caracteres (incluye fecha y entidad).',
    example: 'GOMA820716HDFRRN09',
    regex: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/,
    parts: [
      { token: '^',         label: 'Inicio de cadena' },
      { token: '[A-Z]{4}',  label: '4 letras del nombre: 2 apellido paterno + 1 materno + 1 primer nombre' },
      { token: '\\d{6}',    label: '6 digitos: fecha de nacimiento AAMMDD' },
      { token: '[HM]',      label: 'Sexo registral: H (Hombre) o M (Mujer)' },
      { token: '[A-Z]{5}',  label: '5 letras: 2 entidad federativa + 3 consonantes del nombre' },
      { token: '[A-Z\\d]',  label: '1 caracter diferenciador alfanumerico' },
      { token: '\\d',       label: '1 digito verificador' },
      { token: '$',         label: 'Fin de cadena' },
    ],
    decompose: (s) => [
      { label: 'Iniciales nombre', value: s.slice(0, 4) },
      { label: 'Fecha nacimiento', value: s.slice(4, 10) },
      { label: 'Sexo', value: s.slice(10, 11) },
      { label: 'Entidad + consonantes', value: s.slice(11, 16) },
      { label: 'Diferenciador', value: s.slice(16, 17) },
      { label: 'Verificador', value: s.slice(17, 18) },
    ],
  },
];
