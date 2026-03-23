# RegexID — Validador de Expresiones Regulares

Herramienta web desarrollada como practica de la materia **Lenguajes y Automatas I** del Tecnologico Nacional de Mexico, campus La Piedad.

Permite ingresar cualquier cadena de texto y validarla en tiempo real contra cinco expresiones regulares de datos personales: Nombre, Telefono, Correo electronico, RFC y CURP.

**Desarrollador:** Juan Carlos Govea Magana
**Carrera:** Ing. en Sistemas Computacionales — 6 C
**Materia:** Lenguajes y Automatas I — TecNM La Piedad, 2025

---

## Como funciona

El usuario escribe una cadena en el campo de texto. Cada vez que escribe un caracter, el motor de validacion ejecuta las expresiones regulares sobre esa cadena usando el metodo `RegExp.exec()` nativo de JavaScript.

El resultado indica si la cadena coincide o no con el patron seleccionado, y en caso de coincidir, divide la cadena en segmentos etiquetados para mostrar que representa cada parte (por ejemplo, en un RFC: iniciales, fecha y homoclave).

Hay dos modos de uso:

- **Modo AUTO** — evalua la cadena contra los cinco patrones al mismo tiempo y muestra una lista con el resultado de cada uno.
- **Modo especifico** — el usuario selecciona un patron (Nombre, Telefono, etc.) y ve el resultado detallado solo para ese tipo, incluyendo la anatomia de la expresion regular y el desglose de la cadena.

---

## Patrones de validacion

| ID       | Nombre    | Expresion regular                                             | Ejemplo valido     |
|----------|-----------|---------------------------------------------------------------|--------------------|
| nombre   | Nombre    | `^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$`    | Juan Garcia Lopez  |
| telefono | Telefono  | `^\d{10}$`                                                    | 5512345678         |
| correo   | Correo    | `^[\w-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$`                       | usuario@dominio.com|
| rfc      | RFC       | `^[A-ZN&]{3,4}\d{6}[A-Z\d]{3}$`                              | GOMA820716KH3      |
| curp     | CURP      | `^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$`                       | GOMA820716HDFRRN09 |

---

## Estructura del proyecto

```
regexid/
├── public/
│   └── icon.png                   Icono de la pestana del navegador
├── src/
│   ├── core/                      Logica de validacion (independiente del UI)
│   │   ├── types.ts               Definicion de tipos e interfaces
│   │   ├── engine.ts              Funcion que aplica la regex sobre la cadena
│   │   ├── patterns.ts            Los cinco patrones con su regex y desglose
│   │   └── index.ts               Re-exporta todo el modulo core
│   ├── components/
│   │   ├── layout/
│   │   │   └── MainLayout.tsx     Barra de navegacion, header y footer
│   │   ├── ModeSelector.tsx       Barra de tabs para elegir el modo
│   │   ├── TestInput.tsx          Campo de texto donde se escribe la cadena
│   │   ├── PatternRow.tsx         Fila de resultado en modo AUTO
│   │   ├── PatternCard.tsx        Panel de detalle en modo especifico
│   │   └── StructureCard.tsx      Tarjeta de estructura visual de un patron
│   ├── pages/
│   │   ├── Home.tsx               Pagina de inicio con presentacion del proyecto
│   │   ├── Validator.tsx          Pagina principal del validador
│   │   ├── Patterns.tsx           Pagina de referencia de todos los patrones
│   │   └── About.tsx              Pagina con informacion del desarrollador
│   ├── index.css                  Estilos globales y variables de color
│   └── main.tsx                   Punto de entrada de la aplicacion
├── index.html
├── vercel.json                    Configuracion de rutas para despliegue en Vercel
├── package.json
└── vite.config.ts
```

---

## Modulo core — la logica de validacion

Todo el codigo de validacion vive en `src/core/` y no depende de ningun componente visual. Esto permite entender y explicar la logica de forma independiente al diseno.

### types.ts

Define las interfaces que se usan en todo el proyecto:

```ts
// El resultado de validar una cadena contra un patron
interface MatchResult {
  matched: boolean; // true si la cadena paso la validacion
  value: string;    // la cadena que coincidio (vacia si no hubo coincidencia)
}

// La definicion completa de un patron
interface PatternDef {
  id: string;
  name: string;
  description: string;
  example: string;
  regex: RegExp;
  parts: RegexPart[];                             // explicacion token a token
  decompose: (cadena: string) => MatchSegment[];  // divide la cadena en partes
}
```

### engine.ts

Contiene una sola funcion: `testPattern`. Recibe un patron y una cadena, ejecuta la expresion regular y devuelve si hubo coincidencia.

```ts
function testPattern(patron: PatternDef, cadena: string): MatchResult {
  const resultado = patron.regex.exec(cadena);

  if (resultado === null) {
    return { matched: false, value: '' };
  }

  return { matched: true, value: resultado[0] };
}
```

`RegExp.exec()` devuelve `null` si no hubo coincidencia, o un arreglo donde el primer elemento (`resultado[0]`) es el texto completo que coincidio con la expresion regular.

### patterns.ts

Declara el arreglo `PATTERNS` con los cinco patrones. Cada patron incluye:

- `regex` — la expresion regular compilada.
- `parts` — arreglo que explica cada fragmento de la regex en lenguaje natural.
- `decompose` — funcion que, dada una cadena valida, la divide en segmentos etiquetados usando operaciones basicas de string (`slice`, `split`).

Ejemplo del patron RFC:

```ts
decompose: (cadena) => {
  // El RFC tiene 12 caracteres (persona moral) o 13 (persona fisica)
  // Los primeros 3 o 4 son letras, luego 6 digitos, luego 3 de homoclave
  const longitudIniciales = cadena.length === 12 ? 3 : 4;
  const iniciales = cadena.slice(0, longitudIniciales);
  const fecha     = cadena.slice(longitudIniciales, longitudIniciales + 6);
  const homoclave = cadena.slice(longitudIniciales + 6);

  return [
    { label: 'Iniciales', value: iniciales },
    { label: 'Año',       value: fecha.slice(0, 2) },
    { label: 'Mes',       value: fecha.slice(2, 4) },
    { label: 'Dia',       value: fecha.slice(4, 6) },
    { label: 'Homoclave', value: homoclave },
  ];
}
```

---

## Componentes principales

| Componente       | Descripcion |
|------------------|-------------|
| `TestInput`      | Campo de texto donde el usuario escribe la cadena a evaluar. Muestra un boton para limpiar y el conteo de caracteres. |
| `ModeSelector`   | Fila de botones para cambiar entre modo AUTO y cada patron especifico. |
| `PatternRow`     | Fila dentro de la lista del modo AUTO. Muestra el nombre del patron, la regex, el badge Valido/No valido y el desglose si hay coincidencia. |
| `PatternCard`    | Panel completo del modo especifico. Muestra la regex, la anatomia token a token y el desglose de la cadena. |
| `StructureCard`  | Tarjeta visual que muestra el ejemplo del patron dividido en segmentos con colores alternados. Se usa en la pagina de Patrones. |
| `MainLayout`     | Envuelve todas las paginas. Incluye la barra de navegacion con soporte para modo oscuro. |

---

## Paginas

| Ruta       | Pagina    | Descripcion |
|------------|-----------|-------------|
| `/`        | Home      | Presentacion del proyecto con demo visual y lista de los cinco patrones. |
| `/validar` | Validator | El validador en si. Permite escribir una cadena y ver resultados en modo AUTO o especifico. |
| `/patrones`| Patterns  | Referencia completa de cada patron con su regex y anatomia en formato de acordeon. |
| `/acerca`  | About     | Informacion del desarrollador y del contexto academico del proyecto. |

---

## Dependencias

### Produccion

| Paquete                 | Version | Para que se usa |
|-------------------------|---------|-----------------|
| `react`                 | 19      | Libreria principal de interfaz de usuario |
| `react-dom`             | 19      | Renderizado de React en el navegador |
| `react-router-dom`      | 7       | Navegacion entre paginas sin recargar |
| `tailwindcss`           | 4       | Estilos mediante clases de utilidad |
| `@phosphor-icons/react` | 2       | Iconos del validador y el selector de modos |
| `lucide-react`          | —       | Iconos de navegacion y pagina About |

### Desarrollo

| Paquete        | Para que se usa |
|----------------|-----------------|
| `vite`         | Servidor de desarrollo y empaquetador |
| `typescript`   | Tipado estatico |
| `eslint`       | Revision de calidad del codigo |

---

## Instalacion y uso local

Requiere Node.js instalado.

```bash
# Clonar el repositorio
git clone https://github.com/JCarlos-GM/regexid.git
cd regexid

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicacion queda disponible en `http://localhost:5173`.

Para generar la version de produccion:

```bash
npm run build
```

Los archivos generados quedan en la carpeta `dist/`.

---

## Despliegue

El proyecto esta desplegado en Vercel. El archivo `vercel.json` contiene la configuracion necesaria para que las rutas de React Router funcionen correctamente al recargar la pagina:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Sin esta configuracion, recargar la pagina en una ruta como `/validar` devuelve un error 403, porque Vercel intenta buscar ese archivo fisicamente y no lo encuentra.
