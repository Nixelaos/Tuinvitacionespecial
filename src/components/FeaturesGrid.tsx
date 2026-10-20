import React, { useState } from 'react';
import {
  Sparkles,
  CalendarCheck,
  Music,
  MapPin,
  Clock,
  Gift,
  Camera,
  ShieldCheck,
  Users,
  Share2,
  Check,
} from 'lucide-react';
import { INTERACTIVE_FEATURES } from '../data/weddingData';
import type { InteractiveFeature } from '../types/wedding';

export const FeaturesGrid: React.FC = () => {
  const [guestFamilyName, setGuestFamilyName] = useState('Familia Elizondo');
  const [guestPassesCount, setGuestPassesCount] = useState(4);
  const [copiedPass, setCopiedPass] = useState(false);

  const renderIcon = (iconName: InteractiveFeature['iconName']) => {
    const props = { className: 'w-5 h-5 text-gold-dark' };
    switch (iconName) {
      case 'CalendarCheck':
        return <CalendarCheck {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Music':
        return <Music {...props} />;
      case 'MapPin':
        return <MapPin {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'Gift':
        return <Gift {...props} />;
      case 'Camera':
        return <Camera {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
    }
  };

  const handleSimulateCopy = () => {
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2500);
  };

  return (
    <div className="space-y-12">
      {/* 6 Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTERACTIVE_FEATURES.map((feat) => (
          <div
            key={feat.id}
            className="editorial-card p-7 flex flex-col justify-between relative overflow-hidden group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-full bg-champagne/80 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-ivory-50 transition-colors duration-300">
                  {renderIcon(feat.iconName)}
                </div>
                {feat.badge && (
                  <span className="px-3 py-1 bg-sage-light text-sage-dark text-[10px] uppercase tracking-[0.2em] font-medium">
                    {feat.badge}
                  </span>
                )}
              </div>

              <span className="text-[11px] uppercase tracking-[0.18em] text-gold-dark block mb-1">
                {feat.subtitle}
              </span>
              <h3 className="font-serif text-2xl text-charcoal font-medium mb-3">
                {feat.title}
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                {feat.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-ivory-200 flex items-center justify-between text-[11px] uppercase tracking-widest text-charcoal-muted">
              <span>Compatible con iOS y Android</span>
              <span className="text-gold-dark font-medium">Sin instalar Apps</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Guest Pass Showcase Banner */}
      <div className="bg-champagne/60 border border-gold/35 p-6 sm:p-10 shadow-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-ivory-50 border border-gold/30 text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
              <Users className="w-3.5 h-3.5" />
              <span>Exclusivo · Pases Personalizados por Invitado</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal leading-tight">
              Cada familia recibe una invitación con su propio nombre y número de lugares
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Olvídate de confusiones sobre cuántos acompañantes están incluidos. Con nuestro
              generador de pases inteligentes, escribes el nombre del invitado, eliges cuántos
              lugares tiene reservados y compartes su enlace único en un clic.
            </p>

            {/* Mini Interactive Pass Generator Controls */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[10px] uppercase tracking-widest text-charcoal-muted mb-1">
                  Prueba escribir el nombre de un invitado:
                </label>
                <input
                  type="text"
                  value={guestFamilyName}
                  onChange={(e) => setGuestFamilyName(e.target.value)}
                  maxLength={32}
                  className="w-full px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-charcoal-muted mb-1">
                  Pases asignados:
                </label>
                <select
                  value={guestPassesCount}
                  onChange={(e) => setGuestPassesCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-ivory-50 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Pase' : 'Pases'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Live Pass Preview Card */}
          <div className="lg:col-span-6">
            <div className="bg-ivory-50 border border-gold/40 p-6 sm:p-8 text-center relative shadow-editorial">
              <div className="absolute inset-2.5 border border-gold/20 pointer-events-none" />
              <span className="text-[10px] uppercase tracking-[0.28em] text-gold-dark block">
                Pase Personal de Honor
              </span>
              <p className="font-serif italic text-base text-charcoal-muted mt-2">
                Apreciables:
              </p>
              <h4 className="font-serif text-3xl text-charcoal font-medium mt-0.5">
                {guestFamilyName.trim() || 'Familia Invitada'}
              </h4>
              <div className="my-4 inline-block px-5 py-2 bg-champagne/70 border border-gold/30">
                <span className="text-xs uppercase tracking-[0.2em] text-charcoal font-medium">
                  Hemos reservado{' '}
                  <strong className="text-gold-dark font-semibold">{guestPassesCount}</strong>{' '}
                  {guestPassesCount === 1 ? 'lugar' : 'lugares'} en su honor
                </span>
              </div>
              <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                Pase válido exclusivamente para las personas indicadas. Agradecemos confirmar antes
                del 24 de Marzo.
              </p>
              <div className="mt-5 pt-4 border-t border-ivory-200 flex items-center justify-between">
                <span className="text-[11px] font-mono text-charcoal-muted truncate">
                  tuinvitacionespecial.com/boda?inv={encodeURIComponent(guestFamilyName || 'Invitado')}&amp;p={guestPassesCount}
                </span>
                <button
                  type="button"
                  onClick={handleSimulateCopy}
                  className="ml-2 px-3 py-1.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-[10px] uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition"
                >
                  {copiedPass ? (
                    <>
                      <Check className="w-3 h-3 text-[#A7D7B8]" />
                      <span>Enlace Copiado</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3" />
                      <span>Copiar Pase</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
