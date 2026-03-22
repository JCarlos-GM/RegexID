import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

function getInitialTheme(): boolean {
  const saved = localStorage.getItem('regexid-theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function MainLayout() {
  const [dark, setDark] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('regexid-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const navLinks = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/validar', label: 'Validador' },
    { to: '/patrones', label: 'Patrones' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-bold tracking-wide transition-colors duration-150 pb-0.5 ${
      isActive
        ? 'text-slate-900'
        : 'text-slate-400 hover:text-slate-700'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">

        {/* Franja de acento en la parte superior */}
        <div className="h-0.5 w-full" style={{ backgroundColor: 'var(--color-accent)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0 group">
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

          {/* Nav desktop — a la derecha, asimétrica */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navLinks.map(({ to, label, end }) => (
                <NavLink key={to} to={to} end={end} className={linkClass}>
                  {({ isActive }) => (
                    <>
                      {label}
                      {/* Indicador de ruta activa — linea fina bajo el texto */}
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

            {/* Divisor */}
            <div className="w-px h-4 bg-slate-200" />

            {/* Toggle de tema — solo icono, sin caja */}
            <button
              onClick={() => setDark((d) => !d)}
              className="text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Cambiar tema"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setDark((d) => !d)}
              className="text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Cambiar tema"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
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
            <span
              className="font-mono text-xs font-black text-white px-1.5 py-0.5"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
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
