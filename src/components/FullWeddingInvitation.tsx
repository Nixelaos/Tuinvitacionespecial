import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Clock,
  Calendar,
  MapPin,
  Music,
  Volume2,
  VolumeX,
  Shirt,
  Check,
  CheckCircle2,
  Church,
  GlassWater,
  Utensils,
  PartyPopper,
  Camera,
  MailOpen,
  RotateCcw,
  ArrowLeft,
  ChevronDown,
  ExternalLink,
  Users,
  MessageSquareHeart,
} from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { WHATSAPP_NUMBER } from '../data/weddingData';

type SeasonKey = 'primavera' | 'verano' | 'otono' | 'invierno';

interface SeasonDressCode {
  id: SeasonKey;
  name: string;
  months: string;
  temperature: string;
  etiquetteTitle: string;
  weatherSummary: string;
  ladiesAdvice: string[];
  gentlemenAdvice: string[];
  recommendedFabrics: string;
  colorPalette: { name: string; hex: string }[];
  reservedColorsNote: string;
}

const SEASONAL_DRESS_CODES: Record<SeasonKey, SeasonDressCode> = {
  primavera: {
    id: 'primavera',
    name: 'Primavera en Jardín',
    months: 'Marzo — Mayo',
    temperature: '24°C día · 15°C noche',
    etiquetteTitle: 'Etiqueta Formal de Jardín (Spring Black Tie Optional)',
    weatherSummary:
      'Tarde templada y soleada rodeada de jardines en flor, con brisa fresca al caer la noche bajo las estrellas.',
    ladiesAdvice: [
      'Vestido largo fluido o midi de alta costura en tonos florales, pastel, salvia, lavanda o terracota suave.',
      'Se recomienda tacón ancho (bloque) o cuña elegante para caminar cómodamente sobre el césped durante el cóctel.',
      'Incluir una pashmina ligera o chal de seda para la brisa nocturna.',
    ],
    gentlemenAdvice: [
      'Traje formal completo en tonos azul marino, gris medio, beige tabaco o verde bosque oscuro.',
      'Camisa de vestir blanca impecable con corbata de seda o pajarita.',
      'Calzado formal de piel (Oxford, Derby o Mocasín clásico).',
    ],
    recommendedFabrics: 'Gasa de seda, crepé ligero, organza, lino sastre y lana fría.',
    colorPalette: [
      { name: 'Verde Salvia', hex: '#7A8B73' },
      { name: 'Rosa Empolvado', hex: '#D8B4A6' },
      { name: 'Azul Sereno', hex: '#8FA6B8' },
      { name: 'Lavanda Suave', hex: '#B8AEC8' },
      { name: 'Terracota Cálido', hex: '#C2846B' },
      { name: 'Azul Medianoche', hex: '#233042' },
    ],
    reservedColorsNote:
      'El blanco, marfil, hueso, beige muy claro y dorado champagne están reservados exclusivamente para la novia.',
  },
  verano: {
    id: 'verano',
    name: 'Verano Mediterráneo',
    months: 'Junio — Agosto',
    temperature: '28°C día · 19°C noche',
    etiquetteTitle: 'Etiqueta Formal de Verano (Summer Cocktail & Gala)',
    weatherSummary:
      'Atardecer cálido y luminoso con una velada agradable al aire libre. Priorizamos la elegancia fresca y transpirable.',
    ladiesAdvice: [
      'Vestido largo vaporoso con caída ligera, espaldas descubiertas sutiles o cortes asimétricos.',
      'Colores vibrantes o mediterráneos: bugambilia, verde oliva, azul cobalto, coral o amarillo mantequilla.',
      'Abanico de mano opcional para la ceremonia al atardecer.',
    ],
    gentlemenAdvice: [
      'Traje de lino italiano o lana tropical ultraligera en tonos arena oscura, azul acero o gris perla.',
      'Camisa fresca de algodón egipcio (corbata opcional según protocolo de la recepción).',
      'Mocasines de piel o ante sin calcetín visible o con calcetín de hilo.',
    ],
    recommendedFabrics: 'Seda natural, lino fino, chiffon, satén ligero y algodón pima.',
    colorPalette: [
      { name: 'Verde Olivo', hex: '#637054' },
      { name: 'Azul Mediterráneo', hex: '#3B6990' },
      { name: 'Coral Atardecer', hex: '#D97F6C' },
      { name: 'Amarillo Mantequilla', hex: '#E6CF8B' },
      { name: 'Bugambilia', hex: '#9E4768' },
      { name: 'Arena Tostada', hex: '#B89F82' },
    ],
    reservedColorsNote:
      'Por favor evitar blanco total, marfil, perla y tonos crudos similares al vestido nupcial.',
  },
  otono: {
    id: 'otono',
    name: 'Otoño Editorial',
    months: 'Septiembre — Noviembre',
    temperature: '20°C día · 11°C noche',
    etiquetteTitle: 'Riguroso Etiqueta (Autumn Formal Gala)',
    weatherSummary:
      'Luz dorada de otoño durante la ceremonia y noche fresca ideal para texturas ricas y tonos profundos.',
    ladiesAdvice: [
      'Vestido largo de gala en tonos joya u otoñales: esmeralda, burdeos, cobre, ciruela, bronce o azul petróleo.',
      'Mangas largas elegantes, capas de gasa o estola estructurada para la noche.',
      'Tacón formal cerrado o sandalia de gala con estructura.',
    ],
    gentlemenAdvice: [
      'Smoking clásico (Black Tie) o traje oscuro en azul noche, gris marengo o negro carbón.',
      'Corbata o moño en tonos sobrios y pañuelo de bolsillo.',
      'Zapato formal Oxford negro o marrón chocolate oscuro.',
    ],
    recommendedFabrics: 'Terciopelo ligero, mikado de seda, satén estructurado, crepé grueso y jacquard.',
    colorPalette: [
      { name: 'Verde Esmeralda', hex: '#2E5244' },
      { name: 'Vino Burdeos', hex: '#6B2D38' },
      { name: 'Cobre Antiguo', hex: '#A86448' },
      { name: 'Azul Petróleo', hex: '#274354' },
      { name: 'Mostaza Dorado', hex: '#B89246' },
      { name: 'Ciruela Oscuro', hex: '#4E344B' },
    ],
    reservedColorsNote:
      'El blanco, marfil y champagne quedan reservados exclusivamente para la novia.',
  },
  invierno: {
    id: 'invierno',
    name: 'Invierno de Gala',
    months: 'Diciembre — Febrero',
    temperature: '16°C día · 7°C noche',
    etiquetteTitle: 'Gala de Invierno · Black Tie',
    weatherSummary:
      'Celebración en salón climatizado con jardines iluminados. Recomendamos abrigo elegante para los traslados.',
    ladiesAdvice: [
      'Vestido largo de etiqueta en telas con cuerpo, manga larga o acompañado de abrigo de paño, capa o estola.',
      'Tonos sofisticados de invierno: verde pino, azul medianoche, rojo rubí, plata oscura o negro con acentos joya.',
      'Habrá servicio de guardarropa en la entrada de la recepción para abrigos.',
    ],
    gentlemenAdvice: [
      'Smoking riguroso o traje de tres piezas (con chaleco) en lana merino oscura.',
      'Abrigo largo de corte sastre para el exterior de la iglesia.',
      'Zapatos de charol o piel negra lustrada.',
    ],
    recommendedFabrics: 'Terciopelo, brocado, tafetán, seda pesada, cachemira y lana merino.',
    colorPalette: [
      { name: 'Verde Pino', hex: '#1F3B30' },
      { name: 'Azul Noche', hex: '#1B263B' },
      { name: 'Rojo Rubí', hex: '#7A1F2B' },
      { name: 'Gris Plata', hex: '#7E8791' },
      { name: 'Bronce Oscuro', hex: '#6E5536' },
      { name: 'Negro Gala', hex: '#1E1E1E' },
    ],
    reservedColorsNote:
      'El blanco nieve, marfil, crema y plata nacarado claro están reservados para la novia.',
  },
};

export const FullWeddingInvitation: React.FC = () => {
  // Envelope state: starts closed so the guest experiences opening the wax seal!
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isOpeningAnim, setIsOpeningAnim] = useState(false);

  // Audio ambiance simulation
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Countdown state (Target: April 24, 2027 17:00:00)
  const [timeLeft, setTimeLeft] = useState({
    days: 185,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  // RSVP via WhatsApp state
  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<'si' | 'no'>('si');
  const [guestCount, setGuestCount] = useState('2');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [favoriteSong, setFavoriteSong] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [rsvpPreviewSent, setRsvpPreviewSent] = useState(false);

  // Hashtag copy state
  const [copiedHashtag, setCopiedHashtag] = useState(false);

  // Real-time countdown effect
  useEffect(() => {
    const targetDate = new Date('2027-04-24T17:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpeningAnim(true);
    setTimeout(() => {
      setIsEnvelopeOpen(true);
      setIsOpeningAnim(false);
      setIsMusicPlaying(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 650);
  };

  const handleCopyHashtag = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('#ValentinaYSebastian2027');
    }
    setCopiedHashtag(true);
    setTimeout(() => setCopiedHashtag(false), 2500);
  };

  const buildRsvpWhatsAppUrl = () => {
    const statusText =
      attendance === 'si'
        ? `✅ *SÍ ASISTIREMOS* (${guestCount} ${Number(guestCount) === 1 ? 'persona' : 'personas'})`
        : `🤍 *NO PODREMOS ASISTIR*, pero los acompañamos con todo el corazón`;

    const lines = [
      `¡Hola Valentina & Sebastián! 💍✨`,
      `Les enviamos nuestra confirmación de asistencia a su boda:`,
      ``,
      `• *Invitado / Familia:* ${guestName.trim() || 'Familia Invitada'}`,
      `• *Confirmación:* ${statusText}`,
      attendance === 'si' && dietaryNotes.trim()
        ? `• *Restricción alimentaria:* ${dietaryNotes.trim()}`
        : '',
      attendance === 'si' && favoriteSong.trim()
        ? `• *Canción que no puede faltar:* ${favoriteSong.trim()}`
        : '',
      personalMessage.trim()
        ? `\n💌 *Nuestro mensaje para ustedes:*\n"${personalMessage.trim()}"`
        : `\n💌 *Mensaje:* ¡Les deseamos toda la felicidad del mundo en esta nueva etapa!`,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // ============================================================================
  // 1. INITIAL FULL-SCREEN ENVELOPE VIEW (ANTES DE ABRIR LA INVITACIÓN)
  // ============================================================================
  if (!isEnvelopeOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5EFE6] via-[#FAF7F2] to-[#EFE6D8] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
        {/* Subtle decorative background borders */}
        <div className="fixed inset-4 sm:inset-7 border border-gold/25 pointer-events-none z-10" />
        <div className="fixed inset-6 sm:inset-9 border border-gold/15 pointer-events-none z-10" />

        {/* Top Bar: Return to Catalog Link */}
        <div className="relative z-20 flex items-center justify-between max-w-5xl w-full mx-auto pt-2 px-2">
          <a
            href="/#catalogo"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-charcoal-muted hover:text-charcoal transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold-dark" />
            <span>Volver al Catálogo</span>
          </a>
          <span className="text-[10px] uppercase tracking-[0.28em] text-gold-dark font-medium">
            Invitación Nupcial Interactiva
          </span>
        </div>

        {/* Center Envelope Experience */}
        <div className="relative z-20 my-auto max-w-xl w-full mx-auto text-center space-y-6 py-8">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.35em] text-gold-dark block">
              Con la bendición de nuestras familias
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal tracking-wide">
              Valentina <span className="italic text-gold-dark">&amp;</span> Sebastián
            </h1>
            <p className="text-xs uppercase tracking-[0.25em] text-charcoal-muted">
              24 de Abril de 2027 · San Miguel de Allende
            </p>
          </div>

          {/* Interactive 3D-Styled Luxury Envelope */}
          <div
            className={`relative mx-auto w-full max-w-[460px] bg-[#FDFBF7] border border-gold/40 shadow-editorial-lg p-6 sm:p-10 transition-all duration-700 ${
              isOpeningAnim ? 'scale-105 opacity-0 -translate-y-6' : 'scale-100 opacity-100'
            }`}
          >
            {/* Inner Gold Frame */}
            <div className="absolute inset-3 border border-gold/20 pointer-events-none" />

            {/* Diagonal Envelope Flap Lines */}
            <div
              className="w-full pb-8 pt-4 border-b border-gold/25 relative flex flex-col items-center justify-center"
              style={{
                background:
                  'linear-gradient(180deg, rgba(239,231,218,0.55) 0%, rgba(253,251,247,0.9) 100%)',
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-charcoal-muted mb-1">
                Pase Personal de Honor
              </span>
              <p className="font-serif italic text-2xl sm:text-3xl text-charcoal">
                Apreciable Familia &amp; Amigos
              </p>
              <span className="mt-2 px-4 py-1 bg-champagne/80 border border-gold/30 text-[10px] uppercase tracking-[0.22em] text-gold-dark font-medium">
                Hemos reservado lugares especiales en su honor
              </span>

              {/* WAX SEAL BUTTON */}
              <div className="mt-8 relative">
                <span className="animate-ping absolute inset-0 rounded-full bg-gold/30 duration-1000" />
                <button
                  type="button"
                  onClick={handleOpenEnvelope}
                  className="group relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#CDA863] via-[#A67F3D] to-[#785720] text-ivory-50 shadow-gold border-4 border-[#E6CA94]/70 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Abrir sobre de invitación"
                >
                  <div className="absolute inset-1.5 rounded-full border border-ivory-50/35 pointer-events-none" />
                  <span className="font-serif text-3xl sm:text-4xl tracking-widest font-medium">
                    V&amp;S
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-ivory-100/90 mt-1 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Abrir
                  </span>
                </button>
              </div>
            </div>

            <div className="pt-6 space-y-2">
              <button
                type="button"
                onClick={handleOpenEnvelope}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-gold-dark font-semibold hover:text-charcoal transition"
              >
                <MailOpen className="w-4 h-4" />
                <span>Toca el sello de lacre para abrir la invitación</span>
              </button>
              <p className="text-[11px] text-charcoal-muted font-serif italic">
                Incluye música de fondo · Recomendamos activar el sonido
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footnote */}
        <div className="relative z-20 text-center pb-2 text-[11px] uppercase tracking-[0.25em] text-charcoal-muted">
          Colección Alta Costura · Tu Invitación Especial
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. OPENED EXTENSIVE WEDDING INVITATION LANDING PAGE
  // ============================================================================
  return (
    <div className="min-h-screen bg-ivory text-charcoal relative selection:bg-champagne-dark">
      {/* FLOATING TOP BAR: Re-close envelope, Return to Catalog & Music Toggle */}
      <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 pointer-events-auto">
            <a
              href="/#catalogo"
              className="px-3.5 py-2 bg-ivory-50/90 backdrop-blur-md border border-gold/35 shadow-sm text-[11px] uppercase tracking-[0.16em] text-charcoal hover:bg-charcoal hover:text-ivory-50 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Catálogo</span>
            </a>

            <button
              type="button"
              onClick={() => setIsEnvelopeOpen(false)}
              className="px-3.5 py-2 bg-ivory-50/90 backdrop-blur-md border border-gold/35 shadow-sm text-[11px] uppercase tracking-[0.16em] text-charcoal hover:border-gold transition flex items-center gap-1.5"
              title="Volver a ver la animación del sobre cerrado"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gold-dark" />
              <span>Cerrar Sobre</span>
            </button>
          </div>

          {/* Floating Music Player Control */}
          <button
            type="button"
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            className="pointer-events-auto px-4 py-2 rounded-full bg-charcoal/90 backdrop-blur-md text-ivory-50 border border-gold/40 shadow-editorial flex items-center gap-2.5 text-xs hover:bg-gold-dark transition"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-gold-light animate-pulse" />
                <span className="text-[11px] tracking-wider hidden sm:inline">
                  Cuerdas Clásicas · En reproducción
                </span>
                <span className="text-[11px] tracking-wider sm:hidden">Música ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-ivory-200/70" />
                <span className="text-[11px] tracking-wider">Música en pausa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================
          SECCIÓN 1: PORTADA CON NOMBRES DE LOS NOVIOS + FOTO EDITORIAL
      ======================================================================== */}
      <section className="relative min-h-screen flex flex-col justify-between pt-20 pb-12 px-4 sm:px-8 border-b border-ivory-300 bg-linen-pattern">
        <div className="max-w-5xl mx-auto w-full my-auto">
          {/* Top Monogram & Date Crest */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold/45 bg-champagne/60 font-serif text-xl tracking-widest text-gold-dark">
              V&amp;S
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-dark font-medium">
              ¡Nos Casamos! · 24 · Abril · 2027
            </p>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-charcoal font-normal tracking-wide leading-none">
              Valentina <span className="italic text-gold-dark font-light">&amp;</span> Sebastián
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-charcoal-muted pt-1">
              San Miguel de Allende, Guanajuato
            </p>
          </div>

          {/* Main Framed Couple Photograph */}
          <div className="relative max-w-4xl mx-auto bg-ivory-50 p-3 sm:p-5 border border-gold/40 shadow-editorial-lg">
            <div className="relative h-[420px] sm:h-[540px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85"
                alt="Valentina y Sebastián — Fotografía de los novios"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-charcoal/15" />

              <div className="absolute bottom-6 inset-x-6 text-center text-ivory-50">
                <p className="font-serif italic text-2xl sm:text-3xl text-champagne">
                  «El comienzo de nuestro para siempre»
                </p>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="text-center mt-8">
            <a
              href="#frase-romantica"
              className="inline-flex flex-col items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-charcoal-muted hover:text-gold-dark transition"
            >
              <span>Desliza para descubrir nuestra historia</span>
              <ChevronDown className="w-4 h-4 text-gold-dark animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 2: FRASE CARACTERÍSTICA, BENDICIÓN DE PADRES E HISTORIA
      ======================================================================== */}
      <section
        id="frase-romantica"
        className="py-20 sm:py-28 px-4 sm:px-8 bg-ivory-50 border-b border-ivory-300"
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Characteristic Quote Box */}
          <div className="relative p-8 sm:p-14 bg-champagne/45 border border-gold/35 shadow-editorial">
            <div className="absolute inset-3 border border-gold/20 pointer-events-none" />
            <Sparkles className="w-6 h-6 text-gold-dark mx-auto mb-4" />
            <blockquote className="font-serif italic text-3xl sm:text-4xl lg:text-[42px] text-charcoal leading-[1.25]">
              «En medio de todo el ruido del mundo, tu voz siempre fue mi hogar. No nos encontramos
              por casualidad; nos elegimos para construir una vida llena de luz, complicidad y
              eternidad.»
            </blockquote>
            <p className="mt-5 text-xs uppercase tracking-[0.28em] text-gold-dark font-semibold">
              — Valentina &amp; Sebastián
            </p>
          </div>

          {/* Parents' Blessing */}
          <div className="space-y-8 pt-4">
            <div>
              <span className="text-xs uppercase tracking-[0.28em] text-gold-dark block mb-2">
                Con el amor y la bendición de Dios y de nuestros padres
              </span>
              <p className="text-sm text-charcoal-muted max-w-xl mx-auto">
                Quienes nos enseñaron con su ejemplo el valor de la familia, la entrega y el amor
                incondicional:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="p-6 bg-ivory-100 border border-ivory-300 space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
                  Padres de la Novia
                </span>
                <p className="font-serif text-2xl text-charcoal">Sr. Alejandro Montemayor</p>
                <p className="font-serif text-2xl text-charcoal">
                  Sra. Elena Santibáñez de Montemayor
                </p>
              </div>

              <div className="p-6 bg-ivory-100 border border-ivory-300 space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-semibold">
                  Padres del Novio
                </span>
                <p className="font-serif text-2xl text-charcoal">Sr. Fernando De la Vega</p>
                <p className="font-serif text-2xl text-charcoal">
                  Sra. Beatriz Altamirano de De la Vega
                </p>
              </div>
            </div>

            <p className="font-serif italic text-2xl sm:text-3xl text-charcoal max-w-2xl mx-auto pt-2">
              Tenemos el honor de invitarles a celebrar la unión de nuestras vidas en matrimonio.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 3: TIMER (CUENTA REGRESIVA) CON FECHA, LUGARES E ITINERARIO
      ======================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-charcoal text-ivory-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-4 py-1 bg-ivory-50/10 border border-gold/40 text-[11px] uppercase tracking-[0.26em] text-gold-light">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserva la Fecha · Save The Date</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-ivory-50 font-normal">
              Sábado, 24 de Abril de 2027
            </h2>
            <p className="text-sm text-ivory-200/80 tracking-wide">
              Cada segundo nos acerca más al momento de decir «Sí, acepto»
            </p>
          </div>

          {/* LIVE COUNTDOWN CLOCK */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: 'Días' },
              { value: String(timeLeft.hours).padStart(2, '0'), label: 'Horas' },
              { value: String(timeLeft.minutes).padStart(2, '0'), label: 'Minutos' },
              { value: String(timeLeft.seconds).padStart(2, '0'), label: 'Segundos' },
            ].map((unit) => (
              <div
                key={unit.label}
                className="p-6 sm:p-8 bg-ivory-50/5 border border-gold/35 backdrop-blur-sm flex flex-col items-center justify-center"
              >
                <span className="font-serif text-5xl sm:text-6xl text-gold-light font-normal leading-none">
                  {unit.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.26em] text-ivory-200/75 mt-3">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ceremony & Reception Location Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 text-left">
            {/* Ceremony */}
            <div className="bg-ivory-50 text-charcoal p-7 sm:p-9 border border-gold/40 shadow-editorial flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-semibold">
                    01 · Ceremonia Religiosa
                  </span>
                  <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-gold-dark">
                    <Church className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif text-3xl text-charcoal">
                  Parroquia de San Miguel Arcángel
                </h3>
                <div className="space-y-2 text-sm text-charcoal-muted">
                  <p className="flex items-center gap-2 font-medium text-charcoal">
                    <Clock className="w-4 h-4 text-gold-dark" />
                    <span>17:00 hrs (Se ruega puntualidad, 15 min antes)</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-sage shrink-0 mt-1" />
                    <span>
                      Calle Principal S/N, Zona Centro, 37700 San Miguel de Allende, Gto.
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-ivory-200 flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Parroquia+de+San+Miguel+Arcangel+San+Miguel+de+Allende"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] text-center transition flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>
              </div>
            </div>

            {/* Reception */}
            <div className="bg-ivory-50 text-charcoal p-7 sm:p-9 border border-gold/40 shadow-editorial flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gold-dark font-semibold">
                    02 · Recepción &amp; Banquete
                  </span>
                  <div className="w-10 h-10 rounded-full bg-champagne flex items-center justify-center text-gold-dark">
                    <GlassWater className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif text-3xl text-charcoal">Hacienda San José Lavista</h3>
                <div className="space-y-2 text-sm text-charcoal-muted">
                  <p className="flex items-center gap-2 font-medium text-charcoal">
                    <Clock className="w-4 h-4 text-gold-dark" />
                    <span>19:00 hrs Cóctel de Bienvenida · 20:30 hrs Cena de Gala</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-sage shrink-0 mt-1" />
                    <span>
                      Km 10.4 Carretera San Miguel de Allende a Dolores Hidalgo, Guanajuato.
                    </span>
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-ivory-200 flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Hacienda+San+Jose+Lavista+San+Miguel+de+Allende"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] text-center transition flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Ver Ubicación en Mapa</span>
                  <ExternalLink className="w-3 h-3 opacity-75" />
                </a>
              </div>
            </div>
          </div>

          {/* Step-by-Step Day Timeline */}
          <div className="pt-8">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-light block mb-6">
              Itinerario de Nuestro Gran Día
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {[
                {
                  time: '17:00 hrs',
                  title: 'Ceremonia Religiosa',
                  desc: 'Nuestros votos matrimoniales en la Parroquia.',
                  Icon: Church,
                },
                {
                  time: '19:00 hrs',
                  title: 'Cóctel de Atardecer',
                  desc: 'Mixología de autor y cuerdas en el Jardín de los Olivos.',
                  Icon: GlassWater,
                },
                {
                  time: '20:30 hrs',
                  title: 'Banquete & Brindis',
                  desc: 'Cena de cuatro tiempos y nuestro primer baile.',
                  Icon: Utensils,
                },
                {
                  time: '22:30 hrs',
                  title: 'Fiesta Bajo las Estrellas',
                  desc: 'Música en vivo, DJ y barra nocturna hasta el amanecer.',
                  Icon: PartyPopper,
                },
              ].map((step) => (
                <div
                  key={step.time}
                  className="p-5 bg-ivory-50/5 border border-gold/25 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                        {step.time}
                      </span>
                      <step.Icon className="w-4 h-4 text-gold-light" />
                    </div>
                    <h4 className="font-serif text-2xl text-ivory-50">{step.title}</h4>
                    <p className="text-xs text-ivory-200/75 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 4: CÓDIGO DE VESTIMENTA (DRESS CODE UNIFICADO)
      ======================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-ivory-100 border-b border-ivory-300">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-champagne border border-gold/35 text-[11px] uppercase tracking-[0.24em] text-gold-dark font-medium">
              <Shirt className="w-3.5 h-3.5" />
              <span>Guía de Estilo &amp; Protocolo para Invitados</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
              Código de Vestimenta
            </h2>
            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              Queremos que se sientan cómodos y radiantes durante toda la celebración. A continuación
              compartimos nuestras recomendaciones de etiqueta y armonía de color:
            </p>
          </div>

          {/* Detailed Dress Code Card */}
          <div className="bg-ivory-50 border border-gold/40 p-7 sm:p-10 shadow-editorial space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-ivory-200">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] text-gold-dark font-semibold">
                  Protocolo Oficial · Riguroso Etiqueta
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-charcoal mt-1">
                  Riguroso Etiqueta · Damas de Largo &amp; Caballeros de Traje / Smoking
                </h3>
              </div>
              <div className="px-4 py-2.5 bg-champagne/70 border border-gold/30 text-right shrink-0">
                <span className="text-[10px] uppercase tracking-widest text-charcoal-muted block">
                  Clima Estimado
                </span>
                <span className="font-serif text-xl font-semibold text-charcoal">
                  24°C al atardecer · 16°C noche
                </span>
              </div>
            </div>

            <p className="text-sm text-charcoal-muted italic font-serif text-lg">
              «Una velada mágica al aire libre y en salones de hacienda bajo las estrellas.»
            </p>

            {/* Ladies & Gentlemen Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-ivory-100 border border-ivory-300 space-y-3">
                <h4 className="font-serif text-2xl text-charcoal border-b border-ivory-300 pb-2">
                  Damas · Recomendaciones
                </h4>
                <ul className="space-y-2.5">
                  {[
                    'Vestido largo de noche en telas fluidas (gasa, crepé, seda natural o satén)',
                    'Sugerimos tacón ancho o cuña para caminar cómodamente por las áreas empedradas y jardines',
                    'Accesorios sofisticados y chal o estola ligera para la brisa nocturna',
                  ].map((tip) => (
                    <li key={tip} className="text-xs sm:text-sm text-charcoal-light flex gap-2.5">
                      <Check className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-ivory-100 border border-ivory-300 space-y-3">
                <h4 className="font-serif text-2xl text-charcoal border-b border-ivory-300 pb-2">
                  Caballeros · Recomendaciones
                </h4>
                <ul className="space-y-2.5">
                  {[
                    'Smoking clásico o traje formal en tonos oscuros (azul marino, marengo o negro)',
                    'Camisa blanca de vestir con corbata sobria o pajarita / moño de seda',
                    'Calzado formal de cuero lustrado en color negro',
                  ].map((tip) => (
                    <li key={tip} className="text-xs sm:text-sm text-charcoal-light flex gap-2.5">
                      <Check className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggested Color Palette & Reserved Note */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs uppercase tracking-[0.2em] text-charcoal font-semibold block">
                  Paleta de Colores Sugerida para Invitados:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {[
                    { name: 'Oro Viejo', hex: '#B89758' },
                    { name: 'Champagne', hex: '#E7D7C1' },
                    { name: 'Salvia', hex: '#879782' },
                    { name: 'Azul Noche', hex: '#233247' },
                    { name: 'Terracota', hex: '#A86448' },
                    { name: 'Rosa Empolvado', hex: '#D8B4A6' },
                  ].map((swatch) => (
                    <div key={swatch.name} className="flex flex-col items-center text-center">
                      <div
                        className="w-12 h-12 rounded-full border border-charcoal/20 shadow-sm mb-1.5"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-[11px] text-charcoal-muted leading-tight">
                        {swatch.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 p-5 bg-champagne/60 border border-gold/35 space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-semibold block">
                  Nota Importante de Protocolo
                </span>
                <p className="text-xs text-charcoal leading-relaxed">
                  Rogamos reservar los tonos blanco, marfil puro y crudo exclusivamente para la novia.
                </p>
                <p className="text-[11px] text-charcoal-muted pt-1">
                  <strong>Textiles ideales:</strong> Seda, satén, crepé y lino fino para trajes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 5: CONFIRMACIÓN POR WHATSAPP (RSVP) MÁS UN MENSAJE A LOS NOVIOS
      ======================================================================== */}
      <section
        id="confirmacion-rsvp"
        className="py-20 sm:py-28 px-4 sm:px-8 bg-champagne/45 border-b border-ivory-300"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-ivory-50 border border-gold/45 p-7 sm:p-12 shadow-editorial-lg relative">
            <div className="text-center space-y-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-champagne border border-gold/35 flex items-center justify-center text-gold-dark mx-auto">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.26em] text-gold-dark font-semibold block">
                R.S.V.P. · Confirmación de Asistencia
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-charcoal font-normal">
                ¿Nos acompañas en nuestro gran día?
              </h2>
              <p className="text-sm text-charcoal-muted max-w-xl mx-auto">
                Para nosotros es muy importante contar con tu presencia. Por favor confírmanos tu
                asistencia antes del <strong>24 de Marzo de 2027</strong> y déjanos un mensaje
                especial que guardaremos para siempre.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setRsvpPreviewSent(true);
                window.open(buildRsvpWhatsAppUrl(), '_blank', 'noopener,noreferrer');
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                  Nombre completo o Familia *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ej. Familia De la Mora / Sofía Hernández"
                  className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              {/* Attendance Radio Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance('si')}
                  className={`p-4 border text-left transition flex items-center gap-3 ${
                    attendance === 'si'
                      ? 'bg-charcoal text-ivory-50 border-charcoal'
                      : 'bg-ivory-100 text-charcoal border-ivory-300 hover:border-gold'
                  }`}
                >
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${
                      attendance === 'si' ? 'text-gold-light' : 'text-charcoal-muted'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider block">
                      ¡Sí, ahí estaremos!
                    </span>
                    <span
                      className={`text-[11px] ${
                        attendance === 'si' ? 'text-ivory-200/80' : 'text-charcoal-muted'
                      }`}
                    >
                      Confirmar mi asistencia
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance('no')}
                  className={`p-4 border text-left transition flex items-center gap-3 ${
                    attendance === 'no'
                      ? 'bg-charcoal text-ivory-50 border-charcoal'
                      : 'bg-ivory-100 text-charcoal border-ivory-300 hover:border-gold'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 shrink-0 ${
                      attendance === 'no' ? 'text-gold-light' : 'text-charcoal-muted'
                    }`}
                  />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider block">
                      No podremos asistir
                    </span>
                    <span
                      className={`text-[11px] ${
                        attendance === 'no' ? 'text-ivory-200/80' : 'text-charcoal-muted'
                      }`}
                    >
                      Enviar mensaje de cariño
                    </span>
                  </div>
                </button>
              </div>

              {attendance === 'si' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Número de pases a confirmar
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                    >
                      <option value="1">1 Persona</option>
                      <option value="2">2 Personas</option>
                      <option value="3">3 Personas</option>
                      <option value="4">4 Personas (Familia)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                      Alergias o menú especial
                    </label>
                    <input
                      type="text"
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder="Ej. Vegetariano, sin gluten o ninguna"
                      className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              )}

              {attendance === 'si' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                    ¿Qué canción no puede faltar en la fiesta? 🎶
                  </label>
                  <input
                    type="text"
                    value={favoriteSong}
                    onChange={(e) => setFavoriteSong(e.target.value)}
                    placeholder="Ej. September - Earth, Wind & Fire / Suave - Luis Miguel"
                    className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              )}

              {/* Special Message for the Bride & Groom */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-charcoal font-medium mb-1.5">
                  Dedica un mensaje especial para Valentina &amp; Sebastián *
                </label>
                <textarea
                  rows={3}
                  required
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder="Escribe aquí tus buenos deseos, un recuerdo juntos o unas palabras de cariño para los novios..."
                  className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.2em] font-medium transition flex items-center justify-center gap-2.5 shadow-editorial"
              >
                <FaWhatsapp className="w-5 h-5 text-[#A7D7B8]" />
                <span>Enviar Confirmación y Mensaje por WhatsApp</span>
              </button>

              {rsvpPreviewSent && (
                <div className="p-4 bg-sage-light border border-sage/30 text-center text-xs text-sage-dark flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    ¡Se ha generado tu mensaje para WhatsApp! Gracias por acompañar a Valentina &amp;
                    Sebastián.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE REGALOS ELIMINADA POR SOLICITUD */}

      {/* ========================================================================
          SECCIÓN 7: ÁLBUM COLABORATIVO & HASHTAG DE LA BODA
      ======================================================================== */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-ivory-200/60 border-b border-ivory-300">
        <div className="max-w-4xl mx-auto bg-ivory-50 border border-ivory-300 p-8 sm:p-12 text-center space-y-5 shadow-sm">
          <Camera className="w-7 h-7 text-gold-dark mx-auto" />
          <span className="text-xs uppercase tracking-[0.26em] text-gold-dark font-semibold block">
            Recuerdos Compartidos
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-charcoal">
            Queremos ver la boda a través de tus ojos
          </h3>
          <p className="text-sm text-charcoal-muted max-w-xl mx-auto">
            Comparte todas las fotos y videos que captures durante la ceremonia y la fiesta usando
            nuestro hashtag oficial en Instagram:
          </p>
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-5 py-2.5 bg-champagne border border-gold/35 font-serif text-2xl text-charcoal">
              #ValentinaYSebastian2027
            </span>
            <button
              type="button"
              onClick={handleCopyHashtag}
              className="px-4 py-3 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-widest flex items-center gap-1.5 transition"
            >
              {copiedHashtag ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#A7D7B8]" />
                  <span>Hashtag Copiado</span>
                </>
              ) : (
                <>
                  <FaInstagram className="w-4 h-4" />
                  <span>Copiar Hashtag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 8: AGRADECIMIENTOS FINALES Y CIERRE EMOTIVO
      ======================================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 bg-charcoal text-ivory-50 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="w-16 h-16 rounded-full border border-gold/50 bg-ivory-50/5 flex items-center justify-center mx-auto text-gold-light font-serif text-2xl">
            V&amp;S
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-gold-light block">
            Con Todo Nuestro Corazón · Gracias
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl text-ivory-50 font-normal leading-tight">
            Gracias por ser parte de nuestra historia de amor
          </h2>

          <p className="text-sm sm:text-base text-ivory-200/80 leading-relaxed max-w-2xl mx-auto font-light">
            A nuestros padres, hermanos, padrinos, familiares y amigos que viajan desde cerca y
            desde lejos: gracias por acompañarnos en cada paso del camino, por sus consejos, sus
            risas y su cariño incondicional. Nuestra boda no estaría completa sin ustedes.
          </p>

          {/* Secondary Framed Portrait */}
          <div className="max-w-md mx-auto p-3 bg-ivory-50/5 border border-gold/35">
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80"
              alt="Valentina y Sebastián agradecimiento"
              className="w-full h-64 object-cover"
              loading="lazy"
            />
          </div>

          <div className="pt-4 space-y-2">
            <p className="font-serif italic text-3xl sm:text-4xl text-gold-light">
              ¡Nos vemos el 24 de Abril en San Miguel de Allende!
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-ivory-200/60">
              Con amor, Valentina &amp; Sebastián
            </p>
          </div>

          {/* CTA Banner if visitor wants an invitation like this for their own wedding */}
          <div className="mt-16 pt-10 border-t border-ivory-200/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-left bg-ivory-50/5 p-6 border border-gold/25">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-gold-light block">
                Diseñado por Tu Invitación Especial
              </span>
              <p className="font-serif text-xl text-ivory-50">
                ¿Te gustaría una invitación digital como esta para tu boda?
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/#cotizador"
                className="px-5 py-2.5 bg-gold hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition"
              >
                Cotizar la Mía
              </a>
              <a
                href="/"
                className="px-4 py-2.5 border border-ivory-200/30 hover:border-ivory-50 text-ivory-100 text-xs uppercase tracking-[0.18em] transition"
              >
                Ir a la Tienda
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
