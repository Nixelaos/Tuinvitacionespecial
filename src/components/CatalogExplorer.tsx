import React, { useState } from 'react';
import {
  Eye,
  Sparkles,
  Check,
  X,
  Music,
  MapPin,
  Clock,
  Gift,
  Copy,
  CheckCircle2,
  CalendarHeart,
  Utensils,
  GlassWater,
  PartyPopper,
  Church,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import type { InvitationTemplate, StyleCategory } from '../types/wedding';
import { INVITATION_TEMPLATES, WHATSAPP_NUMBER, BRAND_NAME } from '../data/weddingData';

const CATEGORIES: StyleCategory[] = [
  'Todos',
  'Minimalista Lujo',
  'Hacienda & Romántico',
];

export const CatalogExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<StyleCategory>('Todos');
  const [customBride, setCustomBride] = useState('');
  const [customGroom, setCustomGroom] = useState('');
  const [activeDemo, setActiveDemo] = useState<InvitationTemplate | null>(null);
  const [demoTab, setDemoTab] = useState<'invitacion' | 'itinerario' | 'rsvp'>('invitacion');
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpGuestName, setRsvpGuestName] = useState('');
  const [rsvpPasses, setRsvpPasses] = useState('2');
  const [rsvpAllergies, setRsvpAllergies] = useState('');

  const filteredTemplates =
    selectedCategory === 'Todos'
      ? INVITATION_TEMPLATES
      : INVITATION_TEMPLATES.filter((t) => t.category === selectedCategory);

  const getDisplayCouple = (tpl: InvitationTemplate) => {
    const bride = customBride.trim() || tpl.coupleDemo.bride;
    const groom = customGroom.trim() || tpl.coupleDemo.groom;
    const initials = `${bride.charAt(0).toUpperCase()} & ${groom.charAt(0).toUpperCase()}`;
    return { bride, groom, initials };
  };

  const handleCopyBank = () => {
    setCopiedClabe(true);
    setTimeout(() => setCopiedClabe(false), 2500);
  };

  const openModal = (tpl: InvitationTemplate) => {
    setActiveDemo(tpl);
    setDemoTab('invitacion');
    setRsvpSubmitted(false);
  };

  const getItineraryIcon = (type: 'ceremony' | 'cocktail' | 'dinner' | 'party') => {
    switch (type) {
      case 'ceremony':
        return <Church className="w-4 h-4" />;
      case 'cocktail':
        return <GlassWater className="w-4 h-4" />;
      case 'dinner':
        return <Utensils className="w-4 h-4" />;
      case 'party':
        return <PartyPopper className="w-4 h-4" />;
    }
  };

  return (
    <div>
      {/* Personalizer Bar: Try with your own names */}
      <div className="mb-10 bg-champagne/55 border border-gold/30 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-ivory-50 border border-gold/40 flex items-center justify-center text-gold-dark shrink-0">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-dark font-semibold block">
                Simulador en Tiempo Real
              </span>
              <p className="font-serif text-xl text-charcoal">
                Escribe vuestros nombres y previsualiza todo el catálogo personalizado:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <input
              type="text"
              value={customBride}
              onChange={(e) => setCustomBride(e.target.value)}
              placeholder="Ej. Sofía"
              maxLength={22}
              className="px-4 py-2.5 bg-ivory-50 border border-ivory-300 focus:border-gold focus:outline-none text-sm text-charcoal placeholder:text-charcoal-muted/60 w-full sm:w-40"
              aria-label="Nombre de la novia o pareja 1"
            />
            <span className="font-serif italic text-xl text-gold-dark text-center hidden sm:inline">
              &amp;
            </span>
            <input
              type="text"
              value={customGroom}
              onChange={(e) => setCustomGroom(e.target.value)}
              placeholder="Ej. Mateo"
              maxLength={22}
              className="px-4 py-2.5 bg-ivory-50 border border-ivory-300 focus:border-gold focus:outline-none text-sm text-charcoal placeholder:text-charcoal-muted/60 w-full sm:w-40"
              aria-label="Nombre del novio o pareja 2"
            />
            {(customBride || customGroom) && (
              <button
                type="button"
                onClick={() => {
                  setCustomBride('');
                  setCustomGroom('');
                }}
                className="text-xs uppercase tracking-wider text-charcoal-muted hover:text-charcoal px-2 py-1"
              >
                Restaurar
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
        {CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                active
                  ? 'bg-charcoal text-ivory-50 shadow-sm'
                  : 'bg-ivory-50 text-charcoal-light border border-ivory-300 hover:border-gold/60'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {filteredTemplates.map((tpl) => {
          const couple = getDisplayCouple(tpl);
          const whatsappTemplateUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `¡Hola! Me encantó el diseño "${tpl.name}" (${tpl.collection}) de ${BRAND_NAME}. Quisiera pedirlo para la boda de ${couple.bride} & ${couple.groom}.`
          )}`;

          return (
            <article
              key={tpl.id}
              className="editorial-card flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Preview Header */}
                <div className="relative h-80 overflow-hidden bg-champagne">
                  <img
                    src={tpl.coverImage}
                    alt={`Invitación de boda digital modelo ${tpl.name}`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-ivory-50/95 backdrop-blur-sm text-[10px] uppercase tracking-[0.2em] text-charcoal font-medium">
                      {tpl.category}
                    </span>
                    {tpl.badge && (
                      <span className="px-3 py-1 bg-gold text-ivory-50 text-[10px] uppercase tracking-[0.2em] font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {tpl.badge}
                      </span>
                    )}
                  </div>

                  {/* Simulated Invitation Card Overlay on Image */}
                  <div className="absolute bottom-4 left-4 right-4 text-center p-4 bg-ivory-50/95 backdrop-blur-md border border-gold/30 shadow-editorial">
                    <span className="text-[9px] uppercase tracking-[0.28em] text-gold-dark block">
                      {tpl.coupleDemo.displayDate}
                    </span>
                    <p className="font-serif text-2xl text-charcoal mt-0.5">
                      {couple.bride} <span className="italic text-gold-dark">&amp;</span>{' '}
                      {couple.groom}
                    </p>
                    <p className="text-[11px] text-charcoal-muted truncate mt-0.5">
                      {tpl.coupleDemo.city}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal-muted block">
                        {tpl.collection}
                      </span>
                      <h3 className="font-serif text-2xl text-charcoal font-medium">
                        {tpl.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-champagne/80 border border-gold/40 text-[11px] font-medium text-gold-dark">
                        <Sparkles className="w-3 h-3 text-gold-dark" />
                        <span>Próximamente en CLP ($)</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal-muted leading-relaxed mb-4">
                    {tpl.shortDescription}
                  </p>

                  {/* Palette Swatch */}
                  <div className="flex items-center justify-between py-2.5 px-3 bg-ivory-100 border border-ivory-300 mb-4">
                    <span className="text-[11px] text-charcoal-muted">
                      Paleta: <strong className="text-charcoal font-medium">{tpl.palette.name}</strong>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[
                        tpl.palette.bgHex,
                        tpl.palette.cardHex,
                        tpl.palette.accentHex,
                        tpl.palette.textHex,
                      ].map((hex) => (
                        <span
                          key={hex}
                          className="w-4 h-4 rounded-full border border-charcoal/20"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Key Included Highlights */}
                  <ul className="space-y-1.5 mb-6">
                    {tpl.includedFeatures.slice(0, 3).map((feat) => (
                      <li
                        key={feat}
                        className="text-xs text-charcoal-light flex items-start gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => openModal(tpl)}
                    className="py-2.5 px-3 bg-champagne hover:bg-gold hover:text-ivory-50 text-charcoal text-xs uppercase tracking-[0.14em] font-medium transition flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Demo Rápida</span>
                  </button>
                  <a
                    href={`/disenos/${tpl.slug}`}
                    className="py-2.5 px-3 border border-charcoal/30 hover:border-charcoal bg-ivory-50 text-charcoal text-xs uppercase tracking-[0.14em] font-medium transition flex items-center justify-center gap-1"
                  >
                    <span>Ver Landing</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <a
                  href={`/disenos/${tpl.slug}`}
                  className="w-full py-3 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.16em] font-medium transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-gold-light" />
                  <span>Abrir Invitación Completa</span>
                  <ArrowUpRight className="w-4 h-4 opacity-80" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* LIVE INTERACTIVE DEMO MODAL */}
      {activeDemo && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista previa interactiva de ${activeDemo.name}`}
        >
          <div className="relative w-full max-w-4xl bg-ivory-50 border border-gold/40 shadow-editorial-lg overflow-hidden my-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 bg-charcoal text-ivory-50">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-gold text-ivory-50 text-[10px] uppercase tracking-widest">
                  Simulador Interactivo
                </span>
                <h4 className="font-serif text-xl">
                  Modelo: {activeDemo.name} ({activeDemo.collection})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveDemo(null)}
                className="p-1.5 text-ivory-200 hover:text-white transition"
                aria-label="Cerrar vista previa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Simulated Mobile Invitation Screen */}
              <div
                className="lg:col-span-7 p-5 sm:p-7 max-h-[78vh] overflow-y-auto"
                style={{ backgroundColor: activeDemo.palette.bgHex }}
              >
                {/* Internal Demo Navigation Tabs */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {[
                    { id: 'invitacion', label: '1. Portada y Música' },
                    { id: 'itinerario', label: '2. Itinerario y Regalos' },
                    { id: 'rsvp', label: '3. Confirmar RSVP' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDemoTab(tab.id as 'invitacion' | 'itinerario' | 'rsvp')}
                      className={`px-3.5 py-2 text-[11px] uppercase tracking-wider transition ${
                        demoTab === tab.id
                          ? 'bg-charcoal text-ivory-50 font-medium'
                          : 'bg-ivory-50 text-charcoal border border-ivory-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {demoTab === 'invitacion' && (
                  <div className="space-y-5 text-center">
                    <div className="relative h-64 overflow-hidden border border-gold/30">
                      <img
                        src={activeDemo.coverImage}
                        alt={activeDemo.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
                      <div className="absolute bottom-4 inset-x-4 text-ivory-50">
                        <span className="text-[10px] uppercase tracking-[0.3em] block text-champagne">
                          Nuestra Boda
                        </span>
                        <h3 className="font-serif text-4xl mt-1">
                          {getDisplayCouple(activeDemo).bride}{' '}
                          <span className="italic text-gold-light">&amp;</span>{' '}
                          {getDisplayCouple(activeDemo).groom}
                        </h3>
                        <p className="text-xs tracking-widest uppercase mt-1 text-ivory-200">
                          {activeDemo.coupleDemo.displayDate}
                        </p>
                      </div>
                    </div>

                    {/* Quote & Music Bar */}
                    <div
                      className="p-4 border border-gold/25"
                      style={{ backgroundColor: activeDemo.palette.cardHex }}
                    >
                      <p className="font-serif italic text-lg text-charcoal">
                        {activeDemo.coupleDemo.quote}
                      </p>
                      <div className="mt-3 pt-3 border-t border-charcoal/10 flex items-center justify-center gap-2 text-xs text-charcoal-muted">
                        <Music className="w-3.5 h-3.5 text-gold-dark animate-bounce" />
                        <span>
                          Canción de fondo: <strong>{activeDemo.coupleDemo.songTitle}</strong> —{' '}
                          {activeDemo.coupleDemo.songArtist}
                        </span>
                      </div>
                    </div>

                    {/* Locations Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      <div className="p-4 bg-ivory-50 border border-ivory-300">
                        <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                          Ceremonia · {activeDemo.coupleDemo.ceremonyTime}
                        </span>
                        <p className="font-serif text-lg font-medium text-charcoal mt-0.5">
                          {activeDemo.coupleDemo.ceremonyVenue}
                        </p>
                        <p className="text-xs text-charcoal-muted mt-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sage" />
                          {activeDemo.coupleDemo.city}
                        </p>
                      </div>
                      <div className="p-4 bg-ivory-50 border border-ivory-300">
                        <span className="text-[10px] uppercase tracking-widest text-gold-dark font-semibold">
                          Recepción · {activeDemo.coupleDemo.receptionTime}
                        </span>
                        <p className="font-serif text-lg font-medium text-charcoal mt-0.5">
                          {activeDemo.coupleDemo.receptionVenue}
                        </p>
                        <p className="text-xs text-charcoal-muted mt-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-sage" />
                          Dress Code: {activeDemo.coupleDemo.dressCode.split('·')[0]}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {demoTab === 'itinerario' && (
                  <div className="space-y-5">
                    <div className="text-center">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark">
                        Cronograma del Gran Día
                      </span>
                      <h4 className="font-serif text-2xl text-charcoal mt-1">
                        Itinerario de Celebración
                      </h4>
                    </div>

                    <div className="space-y-3">
                      {activeDemo.itinerary.map((item) => (
                        <div
                          key={item.time}
                          className="flex items-center gap-4 p-3.5 bg-ivory-50 border border-ivory-300"
                        >
                          <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-gold-dark shrink-0">
                            {getItineraryIcon(item.iconType)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-serif text-lg font-medium text-charcoal">
                                {item.title}
                              </p>
                              <span className="text-xs font-medium text-gold-dark">
                                {item.time}
                              </span>
                            </div>
                            <p className="text-xs text-charcoal-muted">{item.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Gift Registry Demo Box */}
                    <div className="p-4 bg-ivory-50 border border-gold/30 text-center space-y-2">
                      <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold-dark">
                        <Gift className="w-4 h-4" />
                        <span>Mesa de Regalos &amp; Lluvia de Sobres</span>
                      </div>
                      <p className="text-xs text-charcoal-muted">
                        Vuestra presencia es nuestro mejor regalo. Si desean tener un detalle con
                        nosotros:
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-1">
                        <code className="px-3 py-1.5 bg-champagne/60 text-xs text-charcoal font-mono">
                          CLABE / IBAN: 0121 8000 4589 1234 56
                        </code>
                        <button
                          type="button"
                          onClick={handleCopyBank}
                          className="px-3 py-1.5 bg-charcoal text-ivory-50 text-xs flex items-center gap-1 hover:bg-gold-dark transition"
                        >
                          {copiedClabe ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#A7D7B8]" />
                              <span>¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {demoTab === 'rsvp' && (
                  <div className="p-5 bg-ivory-50 border border-gold/30 space-y-4">
                    <div className="text-center">
                      <CalendarHeart className="w-7 h-7 text-gold-dark mx-auto mb-1" />
                      <h4 className="font-serif text-2xl text-charcoal">
                        Confirmación de Asistencia
                      </h4>
                      <p className="text-xs text-charcoal-muted">
                        Prueba cómo confirmarán tus invitados en segundos:
                      </p>
                    </div>

                    {!rsvpSubmitted ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setRsvpSubmitted(true);
                        }}
                        className="space-y-3"
                      >
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1">
                            Nombre completo o Familia
                          </label>
                          <input
                            type="text"
                            required
                            value={rsvpGuestName}
                            onChange={(e) => setRsvpGuestName(e.target.value)}
                            placeholder="Ej. Familia Hernández Torres"
                            className="w-full px-3.5 py-2 bg-ivory-100 border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1">
                              Personas confirmadas
                            </label>
                            <select
                              value={rsvpPasses}
                              onChange={(e) => setRsvpPasses(e.target.value)}
                              className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                            >
                              <option value="1">1 Adulto</option>
                              <option value="2">2 Adultos</option>
                              <option value="3">3 Adultos</option>
                              <option value="4">4 Adultos</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1">
                              Restricción alimentaria
                            </label>
                            <input
                              type="text"
                              value={rsvpAllergies}
                              onChange={(e) => setRsvpAllergies(e.target.value)}
                              placeholder="Ej. Menú vegetariano / Ninguna"
                              className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.2em] transition"
                        >
                          Confirmar Asistencia (Simulación)
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-6 space-y-2">
                        <CheckCircle2 className="w-10 h-10 text-sage mx-auto" />
                        <h5 className="font-serif text-2xl text-charcoal">
                          ¡Gracias por confirmar, {rsvpGuestName || 'Familia Invitada'}!
                        </h5>
                        <p className="text-xs text-charcoal-muted max-w-md mx-auto">
                          Se han registrado <strong>{rsvpPasses} pases</strong> para la boda de{' '}
                          {getDisplayCouple(activeDemo).bride} &amp;{' '}
                          {getDisplayCouple(activeDemo).groom}.
                        </p>
                        <button
                          type="button"
                          onClick={() => setRsvpSubmitted(false)}
                          className="text-xs underline text-gold-dark uppercase tracking-widest pt-2"
                        >
                          Realizar otra prueba
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Template Specs & Direct Order */}
              <div className="lg:col-span-5 p-6 sm:p-7 bg-ivory-100 border-t lg:border-t-0 lg:border-l border-ivory-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-semibold">
                      {activeDemo.collection}
                    </span>
                    <h3 className="font-serif text-3xl text-charcoal mt-0.5">
                      Diseño «{activeDemo.name}»
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-champagne border border-gold/40 text-xs font-medium text-gold-dark">
                        <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
                        <span>Próximamente en CLP ($) · Envíos Ilimitados</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-charcoal-muted leading-relaxed">
                    {activeDemo.description}
                  </p>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-charcoal font-semibold mb-2.5">
                      Qué incluye esta plantilla:
                    </p>
                    <ul className="space-y-2">
                      {activeDemo.includedFeatures.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-charcoal-light flex items-start gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-gold-dark shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 space-y-2.5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      `¡Hola! Acabo de probar la demo interactiva del diseño "${activeDemo.name}" y quiero reservarlo para nuestra boda.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition flex items-center justify-center gap-2"
                  >
                    <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
                    <span>Apartar este Diseño por WhatsApp</span>
                  </a>
                  <a
                    href={`/disenos/${activeDemo.slug}`}
                    className="w-full py-2.5 border border-charcoal/25 hover:border-charcoal text-charcoal text-xs uppercase tracking-[0.16em] text-center block transition"
                  >
                    Abrir Página Completa del Diseño
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
