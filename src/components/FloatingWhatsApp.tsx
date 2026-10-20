import React from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { WHATSAPP_NUMBER, BRAND_NAME } from '../data/weddingData';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `¡Hola ${BRAND_NAME}! Estoy viendo su página web y me gustaría cotizar una invitación digital para mi boda.`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 bg-charcoal hover:bg-gold-dark text-ivory-50 pl-4 pr-5 py-3.5 rounded-full shadow-editorial-lg border border-gold/40 transition-all duration-300 hover:scale-105"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#34D399]" />
      </span>
      <FaWhatsapp className="w-5 h-5 text-[#A7D7B8]" />
      <span className="text-xs uppercase tracking-[0.16em] font-medium hidden sm:inline">
        Concierge Nupcial
      </span>
    </a>
  );
};
