import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X, Settings, Moon, Sun, Check } from 'lucide-react';

const IDIOMAS = [
  { code: 'es', label: 'Español',   soon: false },
  { code: 'en', label: 'English',   soon: true  },
  { code: 'ar', label: 'العربية',   soon: true  },
];

function getInitialTheme(): boolean {
  const saved = localStorage.getItem('regexid-theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function MainLayout() {
  const [dark, setDark] = useState(getInitialTheme);
  const [idioma, setIdioma] = useState('es');
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRefDesktop = useRef<HTMLDivElement>(null);
  const settingsRefMobile  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('regexid-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Cierra el dropdown si el usuario hace click fuera de ambos contenedores
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const fueraDesktop = !settingsRefDesktop.current?.contains(target);
      const fueraMobile  = !settingsRefMobile.current?.contains(target);
      if (fueraDesktop && fueraMobile) setSettingsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/validar', label: 'Validador' },
    { to: '/patrones', label: 'Patrones' },
    { to: '/acerca', label: 'Acerca de' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-bold tracking-wide transition-colors duration-150 pb-0.5 ${
      isActive ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">

        {/* Franja de acento */}
        <div className="h-0.5 w-full" style={{ backgroundColor: 'var(--color-accent)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <span
              className="font-mono text-xs font-black text-white px-1.5 py-0.5 tracking-widest"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              {'</>'}
            </span>
            <span className="text-base font-black text-slate-900 tracking-tight">
              Regex<span style={{ color: 'var(--color-accent)' }}>ID</span>
            </span>
          </NavLink>

          {/* Nav desktop */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navLinks.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} className={linkClass}>
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <span
                          className="absolute -bottom-px left-0 right-0 h-px"
                          style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="w-px h-4 bg-slate-200" />

            {/* Boton de ajustes con dropdown */}
            <div className="relative" ref={settingsRefDesktop}>
              <button
                onClick={() => setSettingsOpen((o) => !o)}
                className={`text-slate-400 hover:text-slate-700 transition-colors ${settingsOpen ? 'text-slate-700' : ''}`}
                aria-label="Ajustes"
              >
                <Settings size={16} />
              </button>

              {/* Dropdown */}
              {settingsOpen && (
                <div className="absolute right-0 top-8 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">

                  {/* Modo oscuro */}
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Apariencia</p>
                    <button
                      onClick={() => setDark((d) => !d)}
                      className="w-full flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-2.5">
                        {dark ? <Moon size={14} className="text-slate-500" /> : <Sun size={14} className="text-slate-500" />}
                        <span className="text-sm font-semibold text-slate-700">
                          {dark ? 'Modo oscuro' : 'Modo claro'}
                        </span>
                      </div>
                      {/* Toggle pill */}
                      <div
                        className="w-9 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5"
                        style={{ backgroundColor: dark ? 'var(--color-accent)' : '#e2e8f0' }}
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                          style={{ transform: dark ? 'translateX(16px)' : 'translateX(0)' }}
                        />
                      </div>
                    </button>
                  </div>

                  {/* Idioma */}
                  <div className="px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Idioma</p>
                    <div className="flex flex-col gap-1">
                      {IDIOMAS.map(({ code, label, soon }) => (
                        <button
                          key={code}
                          onClick={() => !soon && setIdioma(code)}
                          disabled={soon}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-50 disabled:cursor-default"
                          style={{ color: idioma === code ? 'var(--color-accent)' : '#64748b' }}
                        >
                          {label}
                          {soon
                            ? <span className="text-xs font-bold text-slate-300">Próximamente</span>
                            : idioma === code && <Check size={13} style={{ color: 'var(--color-accent)' }} />
                          }
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>

          {/* Mobile: ajustes + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <div className="relative" ref={settingsRefMobile}>
              <button
                onClick={() => setSettingsOpen((o) => !o)}
                className="text-slate-400 hover:text-slate-700 transition-colors"
                aria-label="Ajustes"
              >
                <Settings size={16} />
              </button>

              {settingsOpen && (
                <div className="absolute right-0 top-8 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Apariencia</p>
                    <button
                      onClick={() => setDark((d) => !d)}
                      className="w-full flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        {dark ? <Moon size={14} className="text-slate-500" /> : <Sun size={14} className="text-slate-500" />}
                        <span className="text-sm font-semibold text-slate-700">
                          {dark ? 'Modo oscuro' : 'Modo claro'}
                        </span>
                      </div>
                      <div
                        className="w-9 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5"
                        style={{ backgroundColor: dark ? 'var(--color-accent)' : '#e2e8f0' }}
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                          style={{ transform: dark ? 'translateX(16px)' : 'translateX(0)' }}
                        />
                      </div>
                    </button>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Idioma</p>
                    <div className="flex flex-col gap-1">
                      {IDIOMAS.map(({ code, label, soon }) => (
                        <button
                          key={code}
                          onClick={() => !soon && setIdioma(code)}
                          disabled={soon}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-slate-50 disabled:cursor-default"
                          style={{ color: idioma === code ? 'var(--color-accent)' : '#64748b' }}
                        >
                          {label}
                          {soon
                            ? <span className="text-xs font-bold text-slate-300">Próximamente</span>
                            : idioma === code && <Check size={13} style={{ color: 'var(--color-accent)' }} />
                          }
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="text-slate-500 hover:text-slate-800 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Nav mobile */}
        {menuOpen && (
          <nav className="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to} to={to} end={end}
                className={({ isActive }) =>
                  `text-sm font-bold tracking-wide ${isActive ? 'text-slate-900' : 'text-slate-400'}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-white px-1.5 py-0.5" style={{ backgroundColor: 'var(--color-accent)' }}>
              {'</>'}
            </span>
            <span className="font-black text-slate-900 text-sm">
              Regex<span style={{ color: 'var(--color-accent)' }}>ID</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Lenguajes y Automatas I &mdash; Validador de Datos Personales con Expresiones Regulares
          </p>
          <p className="text-xs font-mono text-slate-400">ECMAScript RegExp</p>
        </div>
      </footer>

    </div>
  );
}
