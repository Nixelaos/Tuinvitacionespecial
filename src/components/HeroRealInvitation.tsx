import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Smartphone, Eye, ExternalLink } from 'lucide-react';

interface InvitationOption {
  id: string;
  label: string;
  slug: string;
  couple: string;
  style: string;
}

const INVITATION_OPTIONS: InvitationOption[] = [
  {
    id: 'marfil-menta',
    label: 'Marfil & Menta',
    slug: 'invitacion-marfil-menta',
    couple: 'Isabella & Tomás',
    style: 'Lluvia de Corazones',
  },
  {
    id: 'papel-artesanal',
    label: 'Papel Artesanal',
    slug: 'invitacion-papel-artesanal',
    couple: 'Lucía & Rodrigo',
    style: 'Bordes Rasgados',
  },
];

export const HeroRealInvitation: React.FC = () => {
  const [selectedInvitation, setSelectedInvitation] = useState<InvitationOption>(
    INVITATION_OPTIONS[0]
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = (inv: InvitationOption) => {
    if (inv.id === selectedInvitation.id) return;
    setIsLoading(true);
    setSelectedInvitation(inv);
  };

  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* Top Selector: Choose which REAL invitation to preview */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-ivory-50/90 backdrop-blur-md border border-gold/30 shadow-sm max-w-full">
        {INVITATION_OPTIONS.map((inv) => {
          const active = selectedInvitation.id === inv.id;
          return (
            <button
              key={inv.id}
              type="button"
              onClick={() => handleSelect(inv)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition ${
                active
                  ? 'bg-charcoal text-ivory-50 shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal hover:bg-champagne/40'
              }`}
            >
              {inv.label}
            </button>
          );
        })}
      </div>

      {/* Floating Live Badge */}
      <div className="hidden sm:flex absolute -left-12 top-20 z-20 bg-ivory-50/95 backdrop-blur-md border border-gold/30 shadow-editorial px-3.5 py-2.5 items-center gap-2.5 animate-float-slow">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <div>
          <span className="text-[9px] uppercase tracking-widest text-gold-dark font-semibold block">
            Invitación Real en Vivo
          </span>
          <p className="font-serif text-sm font-medium text-charcoal">
            {selectedInvitation.couple}
          </p>
        </div>
      </div>

      {/* Realistic Smartphone Mockup Frame */}
      <div className="relative w-full max-w-[340px] sm:max-w-[370px] bg-[#1E2022] rounded-[48px] p-3 shadow-editorial-lg border-4 border-[#3D3F43]">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A2E]" />
        </div>

        {/* Screen Display Container */}
        <div className="relative rounded-[38px] overflow-hidden bg-ivory-100 h-[580px] sm:h-[630px] border border-gold/20 shadow-inner">
          {/* Real Invitation embedded via iframe */}
          <iframe
            key={selectedInvitation.slug}
            src={`/disenos/${selectedInvitation.slug}?hero=true`}
            title={`Invitación Real de ${selectedInvitation.couple}`}
            className={`w-full h-full border-0 transition-opacity duration-300 ${
              isLoading ? 'opacity-40' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            loading="eager"
          />

          {/* Bottom subtle gradient hint */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-charcoal/30 to-transparent" />
        </div>
      </div>

      {/* Full Screen Action Link */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <a
          href={`/disenos/${selectedInvitation.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition shadow-sm"
        >
          <ExternalLink className="w-3.5 h-3.5 text-gold-light" />
          <span>Abrir a Pantalla Completa</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>
    </div>
  );
};
