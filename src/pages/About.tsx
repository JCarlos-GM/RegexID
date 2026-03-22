import { Github, ExternalLink, Code2, GraduationCap, User, Cpu, BookOpen, Layers } from 'lucide-react';

const MODULES = [
  { icon: Cpu,      label: 'Validador',       desc: 'Motor RegExp en tiempo real contra 5 patrones de datos personales' },
  { icon: BookOpen, label: 'Patrones',        desc: 'Anatomia token a token de cada expresion regular de la practica'  },
  { icon: Layers,   label: 'Modo AUTO',       desc: 'Deteccion automatica del tipo de dato ingresado simultaneamente'   },
];

export default function About() {
  const accent = '#dc2626';

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-0">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <div className="relative border border-slate-200 bg-white dark:bg-slate-100 overflow-hidden mb-8">
        {/* Texto decorativo de fondo */}
        <span
          className="absolute right-0 top-0 font-black leading-none select-none pointer-events-none"
          style={{ color: accent, opacity: 0.05, fontSize: 160 }}
        >
          RX
        </span>

        <div className="relative z-10 px-8 py-10 flex flex-col sm:flex-row sm:items-end gap-6">
          {/* Avatar */}
          <img
            src="https://res.cloudinary.com/dam4ihq4l/image/upload/v1763928353/ressly/residents/ohzceqjfblj8mwprvp8j.jpg"
            alt="Juan Carlos Govea Magaña"
            className="w-20 h-20 shrink-0 object-cover border-4"
            style={{ borderColor: accent }}
          />

          <div className="flex-1 min-w-0">
            <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: accent }}>
              Desarrollador
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Juan Carlos Govea Magaña
            </h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Ing. en Sistemas Computacionales · 6° C
            </p>
          </div>

          <a
            href="https://github.com/JCarlos-GM"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-5 py-3 border-2 text-sm font-black uppercase tracking-wider transition-all hover:text-white"
            style={{ borderColor: accent, color: accent }}
            onMouseEnter={(e) => { e.currentTarget.style.background = accent; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = accent; }}
          >
            <Github size={16} />
            GitHub
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* ── Info institucional + Proyecto (2 cols) ───────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-200 mb-px">

        {/* Institución */}
        <div className="bg-white dark:bg-slate-100 px-8 py-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 flex items-center justify-center bg-slate-100 border border-slate-200">
              <GraduationCap size={16} className="text-slate-600" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">Institucion</p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Universidad', value: 'Tecnologico Nacional de Mexico' },
              { label: 'Campus',      value: 'La Piedad, Michoacan'           },
              { label: 'Carrera',     value: 'Ing. en Sistemas Computacionales' },
              { label: 'Semestre',    value: '6° semestre — Grupo C'           },
              { label: 'Materia',     value: 'Lenguajes y Automatas I'         },
            ].map((row) => (
              <div key={row.label} className="flex items-baseline gap-3 border-b border-slate-100 pb-2">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 w-24 shrink-0">{row.label}</span>
                <span className="text-sm font-bold text-slate-800">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* El proyecto */}
        <div className="bg-white dark:bg-slate-100 px-8 py-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 flex items-center justify-center bg-slate-100 border border-slate-200">
              <Code2 size={16} className="text-slate-600" />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">El Proyecto</p>
          </div>

          {/* Logo del proyecto */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-sm font-black text-white px-2 py-0.5" style={{ backgroundColor: accent }}>
              {'</>'}
            </span>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Regex<span style={{ color: accent }}>ID</span>
            </span>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Herramienta web para validar cadenas de texto contra expresiones regulares de datos personales.
            Evalua en tiempo real si una cadena corresponde a un Nombre, Telefono, Correo, RFC o CURP,
            mostrando el desglose de cada segmento reconocido.
          </p>

          <div className="space-y-2">
            {MODULES.map((mod) => (
              <div key={mod.label} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100">
                <mod.icon size={15} className="shrink-0 mt-0.5" style={{ color: accent }} />
                <div>
                  <p className="text-xs font-black text-slate-700 uppercase tracking-wider">{mod.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer strip ──────────────────────────────────────── */}
      <div className="mt-8 border border-slate-200 bg-white dark:bg-slate-100 px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <User size={14} className="text-slate-400" />
          <p className="text-xs text-slate-500">
            Desarrollado por <span className="font-bold text-slate-700">Juan Carlos Govea Magaña</span>
            {' '}· TecNM La Piedad · Lenguajes y Automatas I 2025
          </p>
        </div>
        <a
          href="https://github.com/JCarlos-GM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
        >
          <Github size={14} />
          github.com/JCarlos-GM
        </a>
      </div>

    </div>
  );
}
