import type { PatternDef } from './types';

// Los cinco patrones de la practica de Lenguajes y Automatas I.
// Cada patron tiene: la regex, su explicacion token a token,
// y una funcion para dividir la cadena valida en segmentos.

export const PATTERNS: PatternDef[] = [

  // ── 1. Nombre completo ──────────────────────────────────────────
  {
    id: 'nombre',
    name: 'Nombre',
    description: 'Letras iniciales mayusculas, permite espacios y acentos.',
    example: 'Juan Garcia Lopez',
    regex: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/,
    parts: [
      { token: '^',                              label: 'Inicio de cadena' },
      { token: '[A-ZÁÉÍÓÚÑ]',                    label: 'Mayuscula inicial (incluye acentos y Ñ)' },
      { token: '[a-záéíóúñ]+',                   label: 'Una o mas letras minusculas' },
      { token: '(\\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*', label: 'Cero o mas palabras adicionales separadas por espacio' },
      { token: '$',                              label: 'Fin de cadena' },
    ],
    decompose: (cadena) => {
      // Separamos el nombre por espacios y etiquetamos cada palabra
      const palabras = cadena.split(' ');
      return palabras.map((palabra, i) => ({
        label: `Palabra ${i + 1}`,
        value: palabra,
      }));
    },
  },

  // ── 2. Telefono ─────────────────────────────────────────────────
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
    decompose: (cadena) => {
      // Un telefono mexicano: 2 digitos de LADA + 4 digitos + 4 digitos
      const lada      = cadena.slice(0, 2);
      const primeros  = cadena.slice(2, 6);
      const segundos  = cadena.slice(6, 10);
      return [
        { label: 'LADA', value: lada },
        { label: 'Primeros 4', value: primeros },
        { label: 'Ultimos 4', value: segundos },
      ];
    },
  },

  // ── 3. Correo electronico ───────────────────────────────────────
  {
    id: 'correo',
    name: 'Correo',
    description: 'Formato estandar usuario@dominio.ext.',
    example: 'usuario@dominio.com',
    regex: /^[\w-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    parts: [
      { token: '^',              label: 'Inicio de cadena' },
      { token: '[\\w-]+',        label: 'Usuario: letras, numeros, guion o guion bajo' },
      { token: '@',              label: 'Arroba separadora obligatoria' },
      { token: '[a-zA-Z\\d.-]+', label: 'Nombre del dominio' },
      { token: '\\.',            label: 'Punto literal' },
      { token: '[a-zA-Z]{2,}',   label: 'Extension: minimo 2 letras (com, mx, org...)' },
      { token: '$',              label: 'Fin de cadena' },
    ],
    decompose: (cadena) => {
      // Dividimos por @ para separar usuario del dominio
      const partes          = cadena.split('@');
      const usuario         = partes[0];
      const dominioCompleto = partes[1];

      // En el dominio buscamos el ultimo punto para separar extension
      const posUltimoPunto = dominioCompleto.lastIndexOf('.');
      const dominio        = dominioCompleto.slice(0, posUltimoPunto);
      const extension      = dominioCompleto.slice(posUltimoPunto + 1);

      return [
        { label: 'Usuario', value: usuario },
        { label: 'Dominio', value: dominio },
        { label: 'Extension', value: extension },
      ];
    },
  },

  // ── 4. RFC ──────────────────────────────────────────────────────
  {
    id: 'rfc',
    name: 'RFC',
    description: '3-4 letras, 6 numeros de fecha y 3 caracteres de homoclave.',
    example: 'GOMA820716KH3',
    regex: /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/,
    parts: [
      { token: '^',             label: 'Inicio de cadena' },
      { token: '[A-ZÑ&]{3,4}', label: '3 letras (persona moral) o 4 letras (persona fisica): iniciales del nombre' },
      { token: '\\d{6}',       label: '6 digitos: fecha de nacimiento en formato AAMMDD' },
      { token: '[A-Z\\d]{3}',  label: '3 caracteres alfanumericos: homoclave asignada por el SAT' },
      { token: '$',            label: 'Fin de cadena' },
    ],
    decompose: (cadena) => {
      // El RFC tiene 12 caracteres (persona moral) o 13 (persona fisica)
      // Los primeros 3 o 4 son letras, luego 6 digitos, luego 3 de homoclave
      const longitudIniciales = cadena.length === 12 ? 3 : 4;
      const iniciales  = cadena.slice(0, longitudIniciales);
      const fecha      = cadena.slice(longitudIniciales, longitudIniciales + 6);
      const homoclave  = cadena.slice(longitudIniciales + 6);

      return [
        { label: 'Iniciales', value: iniciales },
        { label: 'Año',       value: fecha.slice(0, 2) },
        { label: 'Mes',       value: fecha.slice(2, 4) },
        { label: 'Dia',       value: fecha.slice(4, 6) },
        { label: 'Homoclave', value: homoclave },
      ];
    },
  },

  // ── 5. CURP ─────────────────────────────────────────────────────
  {
    id: 'curp',
    name: 'CURP',
    description: 'Formato oficial de 18 caracteres (incluye fecha y entidad).',
    example: 'GOMA820716HDFRRN09',
    regex: /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/,
    parts: [
      { token: '^',        label: 'Inicio de cadena' },
      { token: '[A-Z]{4}', label: '4 letras del nombre: 2 apellido paterno + 1 materno + 1 primer nombre' },
      { token: '\\d{6}',   label: '6 digitos: fecha de nacimiento AAMMDD' },
      { token: '[HM]',     label: 'Sexo registral: H (Hombre) o M (Mujer)' },
      { token: '[A-Z]{5}', label: '5 letras: 2 entidad federativa + 3 consonantes del nombre' },
      { token: '[A-Z\\d]', label: '1 caracter diferenciador alfanumerico' },
      { token: '\\d',      label: '1 digito verificador' },
      { token: '$',        label: 'Fin de cadena' },
    ],
    decompose: (cadena) => {
      // La CURP siempre tiene 18 caracteres con posiciones fijas
      return [
        { label: 'Iniciales nombre',      value: cadena.slice(0, 4)  },
        { label: 'Fecha nacimiento',      value: cadena.slice(4, 10) },
        { label: 'Sexo',                  value: cadena.slice(10, 11) },
        { label: 'Entidad + consonantes', value: cadena.slice(11, 16) },
        { label: 'Diferenciador',         value: cadena.slice(16, 17) },
        { label: 'Verificador',           value: cadena.slice(17, 18) },
      ];
    },
  },

];
