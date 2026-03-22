import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';

function getInitialTheme(): boolean {
  const saved = localStorage.getItem('regexid-theme');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Logo: icono con token regex \w + nombre RegexID
function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2 shrink-0">
      <span
        className="w-8 h-8 flex items-center justify-center font-mono text-xs font-black text-white"
        style={{ backgroundColor: 'var(--color-accent)' }}
      >
        \w
      </span>
      <span className="text-lg font-black text-slate-900 tracking-tight leading-none">
        Regex<span style={{ color: 'var(--color-accent)' }}>ID</span>
      </span>
    </NavLink>
  );
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
    `text-sm font-black uppercase tracking-wider px-3 py-1 border-b-2 transition-colors duration-200 ${
      isActive
        ? 'border-accent text-accent bg-accent-muted'
        : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDark((d) => !d)}
              className="w-9 h-9 flex items-center justify-center border border-slate-200 hover:bg-slate-100 transition-colors"
              aria-label="Cambiar tema"
            >
              {dark
                ? <Sun size={15} className="text-slate-600" />
                : <Moon size={15} className="text-slate-600" />}
            </button>
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center border border-slate-200 hover:bg-slate-100 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to} to={to} end={end}
                className={linkClass}
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

      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 flex items-center justify-center font-mono text-xs font-black text-white"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              \w
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
