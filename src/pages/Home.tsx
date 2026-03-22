import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BookOpen, Layers } from 'lucide-react';
import { PATTERNS } from '../core';

const features = [
  {
    icon: Zap,
    title: 'Motor en tiempo real',
    desc: 'Cada tecla que escribes ejecuta el motor RegExp de JavaScript sobre los 5 patrones de forma simultanea.',
  },
  {
    icon: Layers,
    title: '5 patrones oficiales',
    desc: 'Nombre, Telefono, Correo, RFC y CURP — las expresiones regulares definidas en la practica de la asignatura.',
  },
  {
    icon: BookOpen,
    title: 'Anatomia detallada',
    desc: 'Selecciona un patron especifico para ver cada token de la regex explicado y el desglose de la cadena validada.',
  },
];

export default function Home() {
  return (
    <div>
      {/* ---- Hero ---- */}
      <section className="grid-bg relative overflow-hidden">
        {/* Gradiente de fade sobre el patron */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-slate-50 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 text-center">
          {/* Etiqueta de categoria */}
          <div className="inline-flex items-center gap-2 border border-slate-200 rounded px-3 py-1 mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Lenguajes y Automatas I
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-none tracking-tight mb-6">
            Valida cadenas con{' '}
            <span className="block" style={{ color: 'var(--color-accent)' }}>
              Expresiones Regulares
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-500 mb-10 leading-relaxed">
            Escribe cualquier cadena y el motor ECMAScript la evalua en tiempo real
            contra los 5 patrones de datos personales oficiales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/validar"
              className="flex items-center gap-2 px-6 py-3 font-black text-sm text-white rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              Comenzar a validar
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/patrones"
              className="flex items-center gap-2 px-6 py-3 font-black text-sm text-slate-700 dark:text-slate-700 border border-slate-300 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-100"
            >
              Ver patrones
            </Link>
          </div>
        </div>
      </section>

      {/* ---- Funcionalidades ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent)' }}>
            Funcionalidades
          </p>
          <h2 className="text-3xl font-black text-slate-900">Como funciona el validador</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-8 border border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded mb-5">
                <Icon size={18} className="text-slate-700" />
              </div>
              <h3 className="font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- Vista previa de patrones ---- */}
      <section className="border-t border-slate-200 bg-slate-100 dark:bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-accent)' }}>
              Expresiones regulares
            </p>
            <h2 className="text-3xl font-black text-slate-900">Los 5 patrones de la practica</h2>
          </div>

          <div className="flex flex-col divide-y divide-slate-200 border border-slate-200 bg-white">
            {PATTERNS.map((p) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-6 py-5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3 sm:w-32 shrink-0">
                  <span className="px-2 py-0.5 text-xs font-black uppercase tracking-wider border border-slate-200 text-slate-500">
                    {p.id}
                  </span>
                  <span className="font-black text-slate-900 text-sm">{p.name}</span>
                </div>
                <code className="flex-1 font-mono text-xs sm:text-sm px-3 py-1.5 bg-slate-100 rounded overflow-x-auto text-slate-700">
                  /{p.regex.source}/
                </code>
                <p className="text-xs text-slate-400 sm:w-52 shrink-0">{p.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/patrones"
              className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider transition-colors"
              style={{ color: 'var(--color-accent)' }}
            >
              Ver anatomia completa de cada patron
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA final ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">
          Prueba el motor ahora
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Escribe un nombre, un RFC, una CURP o cualquier cadena y observa que patrones coinciden.
        </p>
        <Link
          to="/validar"
          className="inline-flex items-center gap-2 px-8 py-4 font-black text-sm text-white rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          style={{ backgroundColor: 'var(--color-accent)' }}
        >
          Abrir validador
          <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
