import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Smartphone, ExternalLink, Check } from 'lucide-react';
import { INVITATION_TEMPLATES } from '../data/weddingData';
import type { InvitationTemplate } from '../types/wedding';
import { ParchmentLogo } from './ParchmentLogo';

export const HeroRealInvitation: React.FC = () => {
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selected_wedding_hero_template');
      if (saved && INVITATION_TEMPLATES.some((t) => t.slug === saved)) {
        return saved;
      }
    }
    return INVITATION_TEMPLATES[0].slug;
  });

  const [isLoading, setIsLoading] = useState(false);

  const selectedTemplate: InvitationTemplate =
    INVITATION_TEMPLATES.find((t) => t.slug === selectedSlug) || INVITATION_TEMPLATES[0];

  useEffect(() => {
    const handleTemplateSelected = (e: Event) => {
      const customEvent = e as CustomEvent<{ slug: string }>;
      if (customEvent.detail?.slug) {
        const found = INVITATION_TEMPLATES.find((t) => t.slug === customEvent.detail.slug);
        if (found) {
          setIsLoading(true);
          setSelectedSlug(found.slug);
          if (typeof window !== 'undefined') {
            localStorage.setItem('selected_wedding_hero_template', found.slug);
          }
        }
      }
    };

    window.addEventListener('select-hero-template', handleTemplateSelected);
    return () => {
      window.removeEventListener('select-hero-template', handleTemplateSelected);
    };
  }, []);

  const handleSelect = (tpl: InvitationTemplate) => {
    if (tpl.slug === selectedSlug) return;
    setIsLoading(true);
    setSelectedSlug(tpl.slug);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selected_wedding_hero_template', tpl.slug);
      window.dispatchEvent(
        new CustomEvent('hero-template-changed', { detail: { slug: tpl.slug } })
      );
    }
  };

  return (
    <div className="relative mx-auto flex flex-col items-center">
      {/* Top Selector: Choose which template from catalog to preview in Hero */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5 p-1 bg-ivory-50/90 backdrop-blur-md border border-gold/30 shadow-sm max-w-full">
        {INVITATION_TEMPLATES.map((tpl) => {
          const active = selectedTemplate.slug === tpl.slug;
          return (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleSelect(tpl)}
              className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium transition flex items-center gap-1.5 ${
                active
                  ? 'bg-charcoal text-ivory-50 shadow-sm'
                  : 'text-charcoal-muted hover:text-charcoal hover:bg-champagne/40'
              }`}
            >
              {active && <Check className="w-3 h-3 text-gold-light" />}
              <span>{tpl.coupleDemo.bride} &amp; {tpl.coupleDemo.groom}</span>
            </button>
          );
        })}
      </div>

      {/* Realistic Smartphone Mockup Frame (Default 400 x 824 proportion) */}
      <div className="relative w-full max-w-[420px] bg-[#1E2022] rounded-[52px] p-2.5 sm:p-3 shadow-editorial-lg border-4 border-[#3D3F43]">
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center pointer-events-none">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] mr-3" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A2E]" />
        </div>

        {/* Screen Display Container (400 x 824) */}
        <div className="relative rounded-[40px] overflow-hidden bg-ivory-100 w-full max-w-[400px] h-[680px] sm:h-[824px] border border-gold/20 shadow-inner">
          <iframe
            key={selectedTemplate.slug}
            src={`/disenos/${selectedTemplate.slug}?hero=true`}
            title={`Invitación Real de ${selectedTemplate.coupleDemo.bride} & ${selectedTemplate.coupleDemo.groom}`}
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

      {/* Action Links Below Smartphone */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`/disenos/${selectedTemplate.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition shadow-sm group"
        >
          <ParchmentLogo className="w-4 h-4 text-gold-light group-hover:scale-110 transition-transform" />
          <span>Abrir a Pantalla Completa</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>
    </div>
  );
};
