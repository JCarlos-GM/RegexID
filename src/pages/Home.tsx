import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BookOpen, Layers } from 'lucide-react';
import { PATTERNS } from '../core';

// ── Mini pantallas del validador (se muestran dentro del frame de laptop) ──

const S: React.CSSProperties = { boxSizing: 'border-box' };
const acento = '#dc2626';

// Pantalla 1: modo AUTO — todas las expresiones con resultado
const PantallaAuto = (
  <div style={{ ...S, width: '100%', height: '100%', background: '#f8fafc', padding: 10, overflow: 'hidden', fontFamily: 'sans-serif' }}>
    {/* Input */}
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: '5px 8px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: 6, color: '#94a3b8' }}>⌕</span>
      <span style={{ fontFamily: 'monospace', fontSize: 7, fontWeight: 700, color: '#0f172a' }}>GOMA820716KH3</span>
    </div>

    {/* Selector de modo */}
    <div style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
      {[['AUTO', true], ['Nombre', false], ['RFC', false], ['CURP', false]].map(([label, activo], i) => (
        <div key={i} style={{ fontSize: 5, fontWeight: 900, padding: '2px 6px', borderRadius: 99, background: activo ? acento : '#f1f5f9', color: activo ? 'white' : '#94a3b8' }}>
          {label as string}
        </div>
      ))}
    </div>

    {/* Resultados */}
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
      {[
        { name: 'Nombre',   match: false },
        { name: 'Telefono', match: false },
        { name: 'Correo',   match: false },
        { name: 'RFC',      match: true  },
        { name: 'CURP',     match: false },
      ].map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 7px', borderBottom: i < 4 ? '1px solid #f8fafc' : 'none' }}>
          <div style={{ width: 2, height: 12, borderRadius: 99, background: p.match ? '#16a34a' : '#e2e8f0', flexShrink: 0 }} />
          <span style={{ fontSize: 6, fontWeight: 700, color: '#334155', width: 34 }}>{p.name}</span>
          <div style={{ flex: 1, background: '#f8fafc', borderRadius: 4, height: 8 }} />
          <span style={{ fontSize: 5.5, fontWeight: 900, padding: '1px 4px', borderRadius: 99, background: p.match ? '#f0fdf4' : '#fef2f2', color: p.match ? '#16a34a' : acento }}>
            {p.match ? '✓ MATCH' : '✗ NO'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Pantalla 2: modo RFC — tarjeta de detalle con desglose
const PantallaRFC = (
  <div style={{ ...S, width: '100%', height: '100%', background: '#f8fafc', padding: 10, overflow: 'hidden', fontFamily: 'sans-serif' }}>
    {/* Input con valor */}
    <div style={{ background: 'white', border: `1px solid ${acento}44`, borderRadius: 8, padding: '5px 8px', marginBottom: 8 }}>
      <span style={{ fontFamily: 'monospace', fontSize: 7, fontWeight: 700, color: '#0f172a' }}>GOMA820716KH3</span>
    </div>

    {/* Tarjeta RFC */}
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
      {/* Header rojo */}
      <div style={{ background: '#fef2f2', borderBottom: `2px solid #fecaca`, padding: '5px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ background: `${acento}18`, borderRadius: 4, padding: '2px 3px', color: acento, fontSize: 8 }}>🪪</div>
          <div>
            <div style={{ fontSize: 4, color: `${acento}99`, fontWeight: 900, letterSpacing: 1 }}>RFC</div>
            <div style={{ fontSize: 7, fontWeight: 900, color: '#0f172a' }}>RFC</div>
          </div>
        </div>
        <span style={{ fontSize: 5.5, fontWeight: 900, color: '#16a34a' }}>✓ MATCH</span>
      </div>

      {/* Regex */}
      <div style={{ padding: '4px 8px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 4, color: '#94a3b8', fontWeight: 900, letterSpacing: 1, marginBottom: 2 }}>EXPRESION REGULAR</div>
        <div style={{ fontFamily: 'monospace', fontSize: 5, color: acento, fontWeight: 600 }}>^[A-ZÑ&]&#123;3,4&#125;\d&#123;6&#125;[A-Z\d]&#123;3&#125;$</div>
      </div>

      {/* Desglose de segmentos */}
      <div style={{ padding: '4px 8px' }}>
        <div style={{ fontSize: 4, color: '#94a3b8', fontWeight: 900, letterSpacing: 1, marginBottom: 4 }}>DESGLOSE</div>
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {[
            { val: 'GOMA', label: 'Iniciales' },
            { val: '82',   label: 'Año'       },
            { val: '07',   label: 'Mes'       },
            { val: '16',   label: 'Dia'       },
            { val: 'KH3',  label: 'Homoclave' },
          ].map((seg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, padding: '2px 4px', border: `1px solid #fecaca`, borderRadius: 5, background: '#fef2f2' }}>
              <span style={{ fontFamily: 'monospace', fontSize: 6, fontWeight: 900, color: acento }}>{seg.val}</span>
              <span style={{ fontSize: 4, color: `${acento}99`, fontWeight: 700 }}>{seg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Pantalla 3: modo CURP — anatomia del patron
const PantallaCURP = (
  <div style={{ ...S, width: '100%', height: '100%', background: '#f8fafc', padding: 10, overflow: 'hidden', fontFamily: 'sans-serif' }}>
    <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ background: '#fef2f2', borderBottom: `2px solid #fecaca`, padding: '5px 8px' }}>
        <div style={{ fontSize: 4, color: `${acento}99`, fontWeight: 900, letterSpacing: 1 }}>CURP</div>
        <div style={{ fontSize: 7, fontWeight: 900, color: '#0f172a' }}>CURP</div>
        <div style={{ fontSize: 4.5, color: '#64748b', marginTop: 1 }}>Formato oficial de 18 caracteres</div>
      </div>

      {/* Regex */}
      <div style={{ padding: '4px 8px', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 4.5, color: acento, fontWeight: 600 }}>^[A-Z]&#123;4&#125;\d&#123;6&#125;[HM][A-Z]&#123;5&#125;[A-Z\d]\d$</div>
      </div>

      {/* Tokens de anatomia */}
      <div style={{ padding: '4px 8px' }}>
        <div style={{ fontSize: 4, color: '#94a3b8', fontWeight: 900, letterSpacing: 1, marginBottom: 4 }}>ANATOMIA DEL PATRON</div>
        {[
          { token: '[A-Z]{4}',   label: '4 letras del nombre' },
          { token: '\\d{6}',     label: 'Fecha AAMMDD'       },
          { token: '[HM]',       label: 'Sexo registral'     },
          { token: '[A-Z]{5}',   label: 'Entidad + consonantes' },
          { token: '[A-Z\\d]',   label: 'Diferenciador'      },
          { token: '\\d',        label: 'Verificador'        },
        ].map((part, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 5, padding: '2px 0', borderBottom: '1px solid #f8fafc' }}>
            <code style={{ fontFamily: 'monospace', fontSize: 4.5, color: acento, background: '#fef2f2', border: '1px solid #fecaca', padding: '0 3px', borderRadius: 3, flexShrink: 0, minWidth: 40 }}>
              {part.token}
            </code>
            <span style={{ fontSize: 4.5, color: '#64748b' }}>{part.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MINI_SCREENS = [PantallaAuto, PantallaRFC, PantallaCURP];
const LABELS = ['Modo AUTO', 'Modo RFC', 'Modo CURP'];

// ── Ventana macOS (CSS puro) ───────────────────────────────────
function MacWindow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 520,
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.08)',
      userSelect: 'none',
    }}>
      {/* Barra de titulo */}
      <div style={{
        background: '#1e293b',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        {/* Puntos de control */}
        <div style={{ display: 'flex', gap: 5, marginRight: 4 }}>
          {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
        </div>

        {/* Barra de URL centrada */}
        <div style={{
          flex: 1,
          background: '#334155',
          borderRadius: 6,
          height: 22,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
          paddingInline: 8,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'monospace', letterSpacing: 0.3 }}>
            regexid.vercel.app/validar
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div style={{ background: 'white', aspectRatio: '16/10', overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

// ── Features ──────────────────────────────────────────────────
const features = [
  {
    icon: Zap,
    title: 'Motor en tiempo real',
    desc: 'Cada tecla ejecuta el motor RegExp de JavaScript sobre los 5 patrones de forma simultanea.',
  },
  {
    icon: Layers,
    title: '5 patrones oficiales',
    desc: 'Nombre, Telefono, Correo, RFC y CURP — las expresiones de la practica de la asignatura.',
  },
  {
    icon: BookOpen,
    title: 'Anatomia detallada',
    desc: 'Selecciona un patron especifico para ver cada token explicado y el desglose de la cadena.',
  },
];

// ── Componente principal ───────────────────────────────────────
export default function Home() {
  const [pantallaActiva, setPantallaActiva] = useState(0);

  return (
    <div>
      {/* ---- Hero: split layout ---- */}
      <section className="relative overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Texto izquierdo */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 border border-slate-200 rounded px-3 py-1 mb-6">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">
                  Lenguajes y Automatas I
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-none tracking-tight mb-4">
                El motor de{' '}
                <span style={{ color: 'var(--color-accent)' }}>RegexID</span>
                <span className="block text-slate-400 font-mono text-xl sm:text-2xl mt-3 tracking-wider">
                  /^[patron]+$/
                </span>
              </h1>

              <p className="text-base text-slate-500 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                Pega cualquier cadena y el motor ECMAScript la evalua en tiempo real
                contra los 5 patrones de datos personales de la practica.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/validar"
                  className="flex items-center gap-2 px-6 py-3 font-black text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                >
                  Abrir validador
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/patrones"
                  className="flex items-center gap-2 px-6 py-3 font-black text-sm text-slate-700 border border-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-100"
                >
                  Ver patrones
                </Link>
              </div>
            </div>

            {/* Laptop derecha */}
            <div className="flex-1 w-full flex flex-col items-center gap-4 hidden lg:flex">
              <MacWindow>
                {MINI_SCREENS[pantallaActiva]}
              </MacWindow>

              {/* Selector de pantalla */}
              <div className="flex items-center gap-2">
                {LABELS.map((label, i) => (
                  <button
                    key={i}
                    onClick={() => setPantallaActiva(i)}
                    className="text-xs font-bold px-3 py-1 rounded-full transition-all"
                    style={{
                      backgroundColor: pantallaActiva === i ? 'var(--color-accent)' : '#f1f5f9',
                      color: pantallaActiva === i ? 'white' : '#94a3b8',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---- Funcionalidades ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>
            Funcionalidades
          </p>
          <h2 className="text-3xl font-black text-slate-900">Como funciona el validador</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-8 border border-slate-200 bg-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
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
      <section className="border-t border-slate-200 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>
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
            <Link to="/patrones" className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider transition-colors" style={{ color: 'var(--color-accent)' }}>
              Ver anatomia completa de cada patron
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CTA final ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Prueba el motor ahora</h2>
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
