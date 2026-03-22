import { LightningIcon, UserIcon, PhoneIcon, EnvelopeIcon, IdentificationCardIcon, IdentificationBadgeIcon } from '@phosphor-icons/react';
import type { PatternDef } from '../core';

interface ModeSelectorProps {
  patterns: PatternDef[];
  activeId: string;
  onChange: (id: string) => void;
}

function getIcon(id: string, size = 14) {
  if (id === 'auto')     return <LightningIcon size={size} weight="fill" />;
  if (id === 'nombre')   return <UserIcon size={size} weight="bold" />;
  if (id === 'telefono') return <PhoneIcon size={size} weight="bold" />;
  if (id === 'correo')   return <EnvelopeIcon size={size} weight="bold" />;
  if (id === 'rfc')      return <IdentificationCardIcon size={size} weight="bold" />;
  if (id === 'curp')     return <IdentificationBadgeIcon size={size} weight="bold" />;
  return null;
}

export default function ModeSelector({ patterns, activeId, onChange }: ModeSelectorProps) {
  const tabs = [
    { id: 'auto', label: 'AUTO' },
    ...patterns.map((p) => ({ id: p.id, label: p.name })),
  ];

  return (
    <div
      className="flex items-center gap-1 bg-white border border-slate-200 rounded-full px-1.5 py-1.5 w-full overflow-x-auto shadow-sm"
      style={{ scrollbarWidth: 'none' }}
    >
      {tabs.map(({ id, label }) => {
        const estaActivo = activeId === id;

        if (estaActivo) {
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white transition-all shrink-0"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              {getIcon(id, 12)}
              {label}
            </button>
          );
        }

        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors tracking-wide shrink-0"
          >
            {getIcon(id, 12)}
            {label}
          </button>
        );
      })}
    </div>
  );
}
