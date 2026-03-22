import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

// Lee el tema guardado en localStorage o usa la preferencia del sistema
function getInitialTheme(): boolean {
  const saved = localStorage.getItem('deltacheck-theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function MainLayout() {
  const [dark, setDark] = useState(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('deltacheck-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const navLinks = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/validar', label: 'Validador' },
    { to: '/patrones', label: 'Patrones' },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-black uppercase tracking-wider px-3 py-1 border-b-2 transition-colors duration-200 ${
      isActive
        ? 'border-accent text-accent bg-accent-muted'
        : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-900'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-100/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-0 shrink-0">
            <span className="text-lg font-black text-slate-900 dark:text-slate-900 tracking-tight">
              Delta
            </span>
            <span className="text-lg font-black px-1 text-white rounded"
              style={{ backgroundColor: 'var(--color-accent)' }}>
              Check
            </span>
          </NavLink>

          {/* Nav desktop — centrado */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Controles */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDark((d) => !d)}
              className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-100 transition-colors"
              aria-label="Cambiar tema"
            >
              {dark ? <Sun size={16} className="text-slate-700" /> : <Moon size={16} className="text-slate-600" />}
            </button>
            {/* Hamburger mobile */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Nav mobile */}
        {menuOpen && (
          <nav className="md:hidden border-t border-slate-200 bg-white dark:bg-slate-100 px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      {/* Contenido de la pagina */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/60 dark:bg-slate-100/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <span className="font-black text-slate-900 dark:text-slate-900">Delta</span>
            <span className="font-black px-1 text-white rounded text-sm"
              style={{ backgroundColor: 'var(--color-accent)' }}>Check</span>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Lenguajes y Automatas I &mdash; Validador de Datos Personales con Expresiones Regulares
          </p>
          <p className="text-xs text-slate-400">Motor: ECMAScript RegExp</p>
        </div>
      </footer>
    </div>
  );
}
