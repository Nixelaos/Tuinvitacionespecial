import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Clock,
  Calendar,
  MapPin,
  Volume2,
  VolumeX,
  Shirt,
  Gift,
  Check,
  CheckCircle2,
  Church,
  GlassWater,
  Utensils,
  PartyPopper,
  RotateCcw,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Feather,
  Flower2,
  SlidersHorizontal,
  MessageSquareHeart,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { WHATSAPP_NUMBER } from '../data/weddingData';
import {
  INITIAL_GIFTS_FALLBACK,
  renderGiftIcon,
  type WeddingGiftItem,
} from './WeddingGiftRegistryApp';
import { BACKEND_URL } from '../config/api';

const STORAGE_KEY = 'atelier_wedding_gifts_v1';

/**
 * Reusable SVG Torn Handmade Paper Divider so sections never have straight boxy lines
 */
const TornPaperDivider: React.FC<{
  fill: string;
  flip?: boolean;
  className?: string;
}> = ({ fill, flip = false, className = '' }) => (
  <div
    className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
      flip ? 'rotate-180' : ''
    } ${className}`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-10 sm:h-16 preserve-3d"
      preserveAspectRatio="none"
    >
      {/* Subtle shadow layer of torn paperfibers */}
      <path
        d="M0,38 L35,29 L78,44 L125,24 L172,39 L224,18 L275,35 L332,22 L388,41 L442,19 L498,36 L552,25 L612,43 L668,16 L724,38 L782,22 L839,40 L895,19 L954,37 L1012,24 L1068,42 L1125,18 L1184,36 L1242,21 L1298,39 L1355,23 L1405,37 L1440,26 L1440,74 L0,74 Z"
        fill="rgba(58, 43, 34, 0.07)"
      />
      {/* Main handmade paper torn edge */}
      <path
        d="M0,46 L42,35 L89,51 L138,31 L185,46 L239,26 L290,42 L348,29 L404,48 L458,27 L512,43 L569,32 L628,49 L684,24 L739,44 L796,29 L854,47 L910,27 L968,44 L1026,31 L1082,48 L1139,25 L1196,43 L1254,28 L1310,45 L1368,30 L1412,44 L1440,34 L1440,74 L0,74 Z"
        fill={fill}
      />
    </svg>
  </div>
);

export const TornPaperWeddingInvitation: React.FC = () => {
  // 1. Unfurling Torn-Paper Scroll & Silk Ribbon State
  const [scrollOpened, setScrollOpened] = useState(false);
  const [untyingRibbon, setUntyingRibbon] = useState(false);

  // 2. Audio Ambiance
  const [musicOn, setMusicOn] = useState(false);

  // 3. Live Countdown State (Nov 6, 2027 16:00)
  const [timeLeft, setTimeLeft] = useState({
    days: 381,
    hours: 15,
    minutes: 40,
    seconds: 22,
  });

  // 4. Gifts Preview loaded from Backend / LocalStorage for the Planilla
  const [coupleGifts, setCoupleGifts] = useState<WeddingGiftItem[]>(INITIAL_GIFTS_FALLBACK);

  // 5. WhatsApp RSVP State
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'si' | 'no'>('si');
  const [passes, setPasses] = useState('2');
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const target = new Date('2027-11-06T16:00:00').getTime();
    const updateTimer = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    updateTimer();
    const id = setInterval(updateTimer, 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch live gifts from backend (or localStorage) so the planilla always shows the couple's latest gifts
  useEffect(() => {
    const loadGifts = async () => {
      if (BACKEND_URL) {
        try {
          const res = await fetch(BACKEND_URL);
          if (res.ok) {
            const data = await res.json();
            setCoupleGifts(data);
            return;
          }
        } catch {
          // fallback to localStorage
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setCoupleGifts(JSON.parse(saved));
        } catch {
          setCoupleGifts(INITIAL_GIFTS_FALLBACK);
        }
      }
    };
    loadGifts();
  }, []);

  const handleUntieScroll = () => {
    setUntyingRibbon(true);
    setTimeout(() => {
      setScrollOpened(true);
      setUntyingRibbon(false);
      setMusicOn(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const buildWhatsAppRsvp = () => {
    const status =
      attending === 'si'
        ? `✨ *SÍ ASISTIREMOS* (${passes} ${Number(passes) === 1 ? 'persona' : 'personas'})`
        : `🤍 *NO PODREMOS ASISTIR*, pero los abrazamos a la distancia`;

    const lines = [
      `¡Hola Lucía & Rodrigo! 🌾💍`,
      `Queremos confirmar nuestra asistencia a su boda en Hacienda Temozón:`,
      ``,
      `• *Nombre / Familia:* ${guestName.trim() || 'Familia Invitada'}`,
      `• *Respuesta:* ${status}`,
      attending === 'si' && dietary.trim() ? `• *Menú / Alergias:* ${dietary.trim()}` : '',
      message.trim()
        ? `\n💌 *Mensaje para ustedes:*\n"${message.trim()}"`
        : `\n💌 *Mensaje:* ¡Les deseamos toda la dicha en esta nueva etapa!`,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // ============================================================================
  // 1. INITIAL HANDMADE TORN-PAPER SCROLL & SILK RIBBON SEAL (ANTES DE ABRIR)
  // ============================================================================
  if (!scrollOpened) {
    return (
      <div className="min-h-screen bg-[#E8DEC8] flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
        {/* Soft Botanical Background Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 blur-[1px]"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A2B22]/30 via-transparent to-[#3A2B22]/40" />

        {/* Top Bar */}
        <div className="relative z-30 flex items-center justify-between max-w-5xl w-full mx-auto pt-2">
          <a
            href="/#catalogo"
            className="px-4 py-2 deckle-pill bg-[#FCF9F2]/90 text-xs uppercase tracking-[0.18em] text-[#3A2B22] hover:bg-[#3A2B22] hover:text-ivory-50 transition flex items-center gap-1.5 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Catálogo</span>
          </a>
          <span className="px-4 py-1.5 deckle-pill bg-[#FCF9F2]/90 text-[10px] uppercase tracking-[0.24em] text-[#A86448] font-semibold">
            3.ª Invitación · Papel Algodón Cortado a Mano
          </span>
        </div>

        {/* Center Unfurling Torn-Paper Pliego with Silk Ribbon */}
        <div className="relative z-20 my-auto max-w-xl w-full mx-auto py-6">
          <div
            className={`deckle-card p-8 sm:p-12 text-center relative transition-all duration-700 ${
              untyingRibbon ? 'scale-105 opacity-0 -translate-y-8' : 'scale-100 opacity-100'
            }`}
          >
            {/* Upper Paper Layer */}
            <div className="space-y-2 pb-10">
              <Flower2 className="w-6 h-6 text-[#A86448] mx-auto opacity-80" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-[#8C6D53] block">
                Pliego Nupcial Artesanal
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#2C221E] font-normal">
                Lucía <span className="italic text-[#A86448]">&amp;</span> Rodrigo
              </h1>
              <p className="text-xs uppercase tracking-[0.24em] text-[#69564A]">
                06 de Noviembre de 2027 · Hacienda Temozón
              </p>
            </div>

            {/* Horizontal Terracotta Silk Ribbon Across the Paper */}
            <div className="relative my-4 flex items-center justify-center">
              {/* Silk Ribbon Strip */}
              <div className="w-full h-9 bg-gradient-to-r from-[#9E583D] via-[#B86B4D] to-[#9E583D] shadow-md rounded-full opacity-95" />

              {/* Pressed Botanical Terracotta Wax Seal */}
              <button
                type="button"
                onClick={handleUntieScroll}
                className="group absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#C47756] via-[#A85D3E] to-[#7D3F26] text-ivory-50 shadow-editorial-lg border-4 border-[#EED7C5]/80 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Desatar cinta de seda y abrir pliego de invitación"
              >
                <div className="absolute inset-2 rounded-full border border-dashed border-[#EED7C5]/45 pointer-events-none" />
                <Flower2 className="w-5 h-5 text-[#F7E5D8] mb-0.5" />
                <span className="font-serif text-3xl sm:text-4xl tracking-widest">L&amp;R</span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#F7E5D8] mt-1">
                  Desatar Cinta
                </span>
              </button>
            </div>

            {/* Lower Paper Layer */}
            <div className="pt-12 space-y-2">
              <p className="font-serif italic text-2xl text-[#3A2B22]">
                Para: Nuestra Querida Familia y Amigos
              </p>
              <button
                type="button"
                onClick={handleUntieScroll}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#A86448] font-semibold hover:text-[#2C221E] transition pt-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Toca el sello de lacre terracota para desplegar el papel</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-30 text-center pb-2 text-xs font-serif italic text-[#3A2B22]">
          Papelería Digital en Algodón Artesanal · Tu Invitación Especial
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. OPENED TORN-PAPER ARTISTIC LANDING PAGE
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#F4ECE1] text-[#2C221E] relative overflow-x-hidden">
      {/* FLOATING TOP CONTROLS (ORGANIC PILLS) */}
      <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 pointer-events-auto">
            <a
              href="/#catalogo"
              className="px-4 py-2 deckle-pill bg-[#FCF9F2]/95 backdrop-blur-md shadow-sm text-xs uppercase tracking-[0.16em] text-[#2C221E] hover:bg-[#3A2B22] hover:text-ivory-50 transition flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Catálogo</span>
            </a>

            <button
              type="button"
              onClick={() => setScrollOpened(false)}
              className="px-4 py-2 deckle-pill bg-[#FCF9F2]/95 backdrop-blur-md shadow-sm text-xs uppercase tracking-[0.16em] text-[#2C221E] hover:bg-[#EFE5D8] transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#A86448]" />
              <span>Cerrar Pliego</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMusicOn(!musicOn)}
            className="pointer-events-auto px-5 py-2 deckle-pill bg-[#3A2B22] text-ivory-50 shadow-editorial flex items-center gap-2 text-xs hover:bg-[#A86448] transition"
          >
            {musicOn ? (
              <>
                <Volume2 className="w-4 h-4 text-[#EED7C5] animate-pulse" />
                <span className="text-[11px] tracking-wider hidden sm:inline">
                  Guitarra Clásica · Activa
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 opacity-70" />
                <span className="text-[11px] tracking-wider">Música en Pausa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================
          SECCIÓN 1: NOMBRES DE LOS NOVIOS + FOTOGRAFÍA EN MÁSCARA ORGÁNICA
      ======================================================================== */}
      <section className="pt-24 pb-16 px-4 sm:px-8 relative bg-gradient-to-b from-[#EAE0D0] to-[#F4ECE1]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 deckle-pill bg-[#FCF9F2] text-xs uppercase tracking-[0.26em] text-[#A86448] shadow-sm">
            <Flower2 className="w-4 h-4" />
            <span>Nuestra Boda · 06 de Noviembre de 2027</span>
          </div>

          <h1 className="font-serif text-6xl sm:text-8xl text-[#2C221E] font-normal tracking-tight leading-none">
            Lucía <span className="italic text-[#A86448] font-light">&amp;</span> Rodrigo
          </h1>

          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#69564A]">
            Hacienda Temozón Sur · Mérida, Yucatán
          </p>

          {/* Organic Pebble / Handmade Paper Framed Couple Portrait */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="deckle-card p-5 sm:p-8 animate-float-gentle">
              <div className="relative h-[380px] sm:h-[460px] overflow-hidden organic-photo-mask shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85"
                  alt="Lucía y Rodrigo"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 inset-x-6 text-ivory-50">
                  <p className="font-serif italic text-2xl sm:text-3xl">
                    «Contigo cada camino se convierte en nuestra mejor historia»
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO QUOTE SECTION */}
      <TornPaperDivider fill="#FCF9F2" />

      {/* ========================================================================
          SECCIÓN 2: FRASE CARACTERÍSTICA EN PLIEGO DE PAPEL ALGODÓN
      ======================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FCF9F2]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-5">
            <Feather className="w-7 h-7 text-[#A86448] mx-auto" />
            <blockquote className="font-serif italic text-3xl sm:text-5xl text-[#2C221E] leading-[1.22]">
              «Nos amamos no solo por lo que somos, sino por lo que construimos cuando estamos
              juntos. Hoy comienza el capítulo más hermoso de nuestras vidas.»
            </blockquote>
            <p className="text-xs uppercase tracking-[0.28em] text-[#A86448] font-semibold">
              — Con la bendición de Dios y de nuestros padres
            </p>
          </div>

          {/* Parents Cards with Torn Paper Edges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="deckle-card !bg-[#F4ECE1] p-7 space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A86448] font-semibold">
                Padres de la Novia
              </span>
              <p className="font-serif text-2xl text-[#2C221E]">Sr. Ricardo Valenzuela</p>
              <p className="font-serif text-2xl text-[#2C221E]">Sra. Clara Montes de Valenzuela</p>
            </div>

            <div className="deckle-card !bg-[#F4ECE1] p-7 space-y-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A86448] font-semibold">
                Padres del Novio
              </span>
              <p className="font-serif text-2xl text-[#2C221E]">Sr. Gonzalo Peñaloza</p>
              <p className="font-serif text-2xl text-[#2C221E]">
                Sra. Sofía Mendizábal de Peñaloza
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO TIMER SECTION */}
      <TornPaperDivider fill="#3A2B22" />

      {/* ========================================================================
          SECCIÓN 3: TIMER (CUENTA REGRESIVA) + FECHA + UBICACIONES EN PAPEL CORTADO
      ======================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#3A2B22] text-ivory-50">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-5 py-1.5 deckle-pill bg-ivory-50/10 text-xs uppercase tracking-[0.25em] text-[#EED7C5]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Cuenta Regresiva</span>
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-ivory-50">
              Sábado, 06 de Noviembre de 2027
            </h2>
            <p className="text-sm text-ivory-200/80">
              Faltan muy pocos instantes para celebrar juntos bajo los flamboyanes
            </p>
          </div>

          {/* Organic Torn-Paper Medallions for Countdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: 'Días' },
              { value: String(timeLeft.hours).padStart(2, '0'), label: 'Horas' },
              { value: String(timeLeft.minutes).padStart(2, '0'), label: 'Minutos' },
              { value: String(timeLeft.seconds).padStart(2, '0'), label: 'Segundos' },
            ].map((item) => (
              <div
                key={item.label}
                className="deckle-card !bg-[#FCF9F2] text-[#2C221E] py-7 px-4 flex flex-col items-center justify-center"
              >
                <span className="font-serif text-5xl sm:text-6xl text-[#A86448] font-normal leading-none">
                  {item.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#69564A] mt-2 font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ceremony & Reception Torn Paper Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 text-left">
            <div className="deckle-card p-8 text-[#2C221E] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] text-[#A86448] font-semibold">
                    16:00 Hrs · Ceremonia
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#EFE5D8] flex items-center justify-center text-[#A86448]">
                    <Church className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif text-3xl text-[#2C221E]">
                  Capilla Colonial de la Hacienda
                </h3>
                <p className="text-xs sm:text-sm text-[#69564A] leading-relaxed">
                  Km 182 Carretera Mérida–Uxmal, Temozón Sur, Yucatán.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Hacienda+Temozon+Sur+Yucatan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 deckle-pill bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 text-xs uppercase tracking-[0.18em] text-center transition flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Ver Mapa de Ceremonia</span>
                <ExternalLink className="w-3 h-3 opacity-75" />
              </a>
            </div>

            <div className="deckle-card p-8 text-[#2C221E] flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] text-[#A86448] font-semibold">
                    17:30 Hrs · Recepción &amp; Fiesta
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#EFE5D8] flex items-center justify-center text-[#A86448]">
                    <PartyPopper className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif text-3xl text-[#2C221E]">
                  Jardín de los Flamboyanes
                </h3>
                <p className="text-xs sm:text-sm text-[#69564A] leading-relaxed">
                  Cóctel de bienvenida en el patio de los naranjos y cena de gala al aire libre.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Hacienda+Temozon+Sur+Yucatan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 deckle-pill bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 text-xs uppercase tracking-[0.18em] text-center transition flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Ver Mapa de Recepción</span>
                <ExternalLink className="w-3 h-3 opacity-75" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO DRESS CODE SECTION */}
      <TornPaperDivider fill="#F4ECE1" />

      {/* ========================================================================
          SECCIÓN 4: CÓDIGO DE VESTIMENTA ÚNICO (SIN SELECTOR DE ESTACIONES)
      ======================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#F4ECE1]">
        <div className="max-w-4xl mx-auto">
          <div className="deckle-card p-8 sm:p-12 text-center space-y-8">
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#EFE5D8] flex items-center justify-center text-[#A86448] mx-auto">
                <Shirt className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.28em] text-[#A86448] font-semibold block">
                Protocolo de Vestimenta
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#2C221E] font-normal">
                Código de Vestimenta: Formal de Hacienda
              </h2>
              <p className="text-sm sm:text-base text-[#69564A] leading-relaxed">
                Les invitamos a vestir con elegancia y frescura para disfrutar cómodamente de los
                jardines y terrazas coloniales de la hacienda:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="deckle-card !bg-[#F4ECE1] p-6 space-y-3">
                <h3 className="font-serif text-2xl text-[#2C221E] border-b border-[#D8C7B2] pb-2">
                  Damas · Vestido Largo
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5C493E]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#A86448] shrink-0 mt-0.5" />
                    <span>
                      Vestido largo fluido en telas vaporosas (seda, gasa, lino fino o crepé).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#A86448] shrink-0 mt-0.5" />
                    <span>
                      Se sugiere tacón ancho o cuña para caminar con total comodidad en los
                      jardines.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="deckle-card !bg-[#F4ECE1] p-6 space-y-3">
                <h3 className="font-serif text-2xl text-[#2C221E] border-b border-[#D8C7B2] pb-2">
                  Caballeros · Traje Formal o Lino
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-[#5C493E]">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#A86448] shrink-0 mt-0.5" />
                    <span>
                      Traje formal de lino sastre o lana ligera en tonos arena, beige, azul marino
                      o gris.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#A86448] shrink-0 mt-0.5" />
                    <span>
                      Guayabera presidencial de lino de manga larga también bienvenida.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reserved Colors Note */}
            <div className="p-4 deckle-pill bg-[#EFE5D8] inline-block px-8">
              <p className="text-xs text-[#3A2B22] font-medium">
                🤍 <strong>Nota importante:</strong> Los tonos blanco, marfil, hueso y beige muy
                claro están reservados exclusivamente para la novia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO RSVP SECTION */}
      <TornPaperDivider fill="#EAE0D0" />

      {/* ========================================================================
          SECCIÓN 5: CONFIRMACIÓN POR WHATSAPP MÁS UN MENSAJE
      ======================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#EAE0D0]">
        <div className="max-w-3xl mx-auto">
          <div className="deckle-card p-8 sm:p-12 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#EFE5D8] flex items-center justify-center text-[#A86448] mx-auto">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.26em] text-[#A86448] font-semibold block">
                Confirmación de Asistencia
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#2C221E] font-normal">
                Confirma por WhatsApp y Déjanos un Mensaje
              </h2>
              <p className="text-sm text-[#69564A] max-w-lg mx-auto">
                Por favor confírmanos tu asistencia antes del <strong>06 de Octubre</strong> y
                regálanos unas palabras de cariño para este gran paso.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(buildWhatsAppRsvp(), '_blank', 'noopener,noreferrer');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1.5">
                  Nombre completo o Familia *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ej. Familia Villalobos / Andrea y Carlos"
                  className="w-full px-5 py-3 deckle-pill bg-[#F4ECE1] border border-[#D8C7B2] text-sm text-[#2C221E] focus:outline-none focus:border-[#A86448]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('si')}
                  className={`py-3 px-5 deckle-pill text-xs uppercase tracking-wider font-medium transition flex items-center justify-center gap-2 ${
                    attending === 'si'
                      ? 'bg-[#3A2B22] text-ivory-50 shadow-sm'
                      : 'bg-[#F4ECE1] text-[#5C493E] border border-[#D8C7B2]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Sí, los acompañaremos!</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-3 px-5 deckle-pill text-xs uppercase tracking-wider font-medium transition flex items-center justify-center gap-2 ${
                    attending === 'no'
                      ? 'bg-[#3A2B22] text-ivory-50 shadow-sm'
                      : 'bg-[#F4ECE1] text-[#5C493E] border border-[#D8C7B2]'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>No podremos asistir</span>
                </button>
              </div>

              {attending === 'si' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1.5">
                      Número de asistentes
                    </label>
                    <select
                      value={passes}
                      onChange={(e) => setPasses(e.target.value)}
                      className="w-full px-5 py-3 deckle-pill bg-[#F4ECE1] border border-[#D8C7B2] text-sm text-[#2C221E] focus:outline-none"
                    >
                      <option value="1">1 Persona</option>
                      <option value="2">2 Personas</option>
                      <option value="3">3 Personas</option>
                      <option value="4">4 Personas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1.5">
                      Restricción alimentaria
                    </label>
                    <input
                      type="text"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder="Ej. Vegetariano / Ninguna"
                      className="w-full px-5 py-3 deckle-pill bg-[#F4ECE1] border border-[#D8C7B2] text-sm text-[#2C221E] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1.5">
                  Tu mensaje para Lucía &amp; Rodrigo *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Déjanos aquí tus mejores deseos..."
                  className="w-full px-5 py-3.5 rounded-[24px] bg-[#F4ECE1] border border-[#D8C7B2] text-sm text-[#2C221E] focus:outline-none focus:border-[#A86448]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 deckle-pill bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 text-xs uppercase tracking-[0.2em] font-medium transition flex items-center justify-center gap-2.5 shadow-editorial"
              >
                <FaWhatsapp className="w-5 h-5 text-[#A7D7B8]" />
                <span>Confirmar por WhatsApp con Mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO GIFTS PLANILLA SECTION */}
      <TornPaperDivider fill="#FCF9F2" />

      {/* ========================================================================
          SECCIÓN 6: PLANILLA DE REGALOS CON BOTÓN A LA LISTA DE LOS NOVIOS
          (SIN CUENTA DE BANCO)
      ======================================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 bg-[#FCF9F2]">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#EFE5D8] flex items-center justify-center text-[#A86448] mx-auto">
              <Gift className="w-6 h-6" />
            </div>
            <span className="text-xs uppercase tracking-[0.28em] text-[#A86448] font-semibold block">
              Nuestra Mesa de Regalos
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2C221E] font-normal">
              Planilla de Regalos Elegidos por los Novios
            </h2>
            <p className="text-sm sm:text-base text-[#69564A] leading-relaxed">
              Su presencia en nuestra boda es lo más valioso para nosotros. Si desean hacernos un
              obsequio, hemos preparado con mucha ilusión una lista de regalos personalizados para
              nuestro hogar y luna de miel:
            </p>
          </div>

          {/* TORN PAPER PLANILLA PREVIEW OF THE COUPLE'S CHOSEN GIFTS */}
          <div className="deckle-card !bg-[#F4ECE1] p-6 sm:p-10 text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8C7B2] pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#A86448] font-semibold block">
                  Vista Previa de la Planilla
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C221E]">
                  Algunos de los Regalos Seleccionados por Lucía &amp; Rodrigo
                </h3>
              </div>
              <span className="px-4 py-1.5 deckle-pill bg-[#FCF9F2] text-xs text-[#5C493E] font-medium self-start sm:self-center">
                {coupleGifts.length} Regalos en la Lista
              </span>
            </div>

            {/* Planilla Rows / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupleGifts.slice(0, 4).map((item) => {
                const avail = Math.max(0, item.quantity - item.reservedCount);
                return (
                  <div
                    key={item.id}
                    className="deckle-card !bg-[#FCF9F2] p-4 flex items-center gap-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-16 h-16 rounded-2xl object-cover shrink-0"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#A86448] font-semibold">
                        {renderGiftIcon(item.iconName, 'w-3.5 h-3.5')}
                        <span>{item.category}</span>
                      </div>
                      <h4 className="font-serif text-xl text-[#2C221E] truncate">{item.title}</h4>
                      <div className="flex items-center justify-between text-xs text-[#69564A] mt-0.5">
                        <strong className="text-[#3A2B22]">${item.price} USD</strong>
                        <span>Disponibles: {avail}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Button to Open the Full Interactive Gift List + Secondary Link for Couple's Editor */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/disenos/mesa-de-regalos"
                className="w-full sm:w-auto px-8 py-4 deckle-pill bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 text-xs uppercase tracking-[0.2em] font-medium transition flex items-center justify-center gap-2.5 shadow-editorial"
              >
                <Gift className="w-4 h-4 text-[#EED7C5]" />
                <span>Ver Lista Completa de Regalos de los Novios</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="/disenos/mesa-de-regalos"
                className="w-full sm:w-auto px-6 py-4 deckle-pill bg-[#FCF9F2] hover:bg-[#E8DACA] text-[#3A2B22] border border-[#D8C7B2] text-xs uppercase tracking-[0.16em] font-medium transition flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A86448]" />
                <span>Acceso Novios (Editar Regalos)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO GRATITUDE SECTION */}
      <TornPaperDivider fill="#2C221E" />

      {/* ========================================================================
          SECCIÓN 7: AGRADECIMIENTOS FINALES
      ======================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#2C221E] text-ivory-50 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="w-16 h-16 rounded-full bg-[#A86448]/25 border border-[#EED7C5]/40 flex items-center justify-center mx-auto text-[#EED7C5] font-serif text-2xl">
            L&amp;R
          </div>

          <span className="text-xs uppercase tracking-[0.3em] text-[#EED7C5] block">
            Agradecimientos
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-ivory-50 leading-tight">
            Gracias por escribir este capítulo junto a nosotros
          </h2>

          <p className="text-sm sm:text-base text-ivory-200/80 leading-relaxed max-w-2xl mx-auto font-light">
            A nuestras familias, padrinos y amigos del alma: gracias por cada abrazo, por viajar
            para acompañarnos y por llenar de alegría el inicio de nuestro matrimonio.
          </p>

          <div className="max-w-md mx-auto deckle-card !bg-[#3A2B22] p-4">
            <img
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80"
              alt="Lucía y Rodrigo agradecimiento"
              className="w-full h-60 object-cover organic-photo-mask"
              loading="lazy"
            />
          </div>

          <div className="pt-4 space-y-1">
            <p className="font-serif italic text-3xl text-[#EED7C5]">
              Con todo nuestro amor, Lucía &amp; Rodrigo
            </p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-ivory-200/50">
              06 · Noviembre · 2027 · Hacienda Temozón
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
