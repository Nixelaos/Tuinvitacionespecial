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
  Palette,
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

export interface TornPaperPalette {
  id: string;
  name: string;
  swatchColor: string;
  primaryHex: string;
  primaryDark: string;
  primaryLight: string;
  ribbonGradient: string;
  sealGradient: string;
  bgOuter: string;
  bgMain: string;
  bgHeaderFrom: string;
  bgHeaderTo: string;
  bgCard: string;
  bgCardAlt: string;
  accentDark: string;
  footerBg: string;
  textDark: string;
  textMuted: string;
  borderHex: string;
}

export const TORN_PAPER_PALETTES: TornPaperPalette[] = [
  {
    id: 'terracota',
    name: 'Terracota & Seda Cálida',
    swatchColor: '#A86448',
    primaryHex: '#A86448',
    primaryDark: '#7D3F26',
    primaryLight: '#EED7C5',
    ribbonGradient: 'from-[#9E583D] via-[#B86B4D] to-[#9E583D]',
    sealGradient: 'from-[#C47756] via-[#A85D3E] to-[#7D3F26]',
    bgOuter: '#E8DEC8',
    bgMain: '#F4ECE1',
    bgHeaderFrom: '#EAE0D0',
    bgHeaderTo: '#F4ECE1',
    bgCard: '#FCF9F2',
    bgCardAlt: '#EFE5D8',
    accentDark: '#3A2B22',
    footerBg: '#2C221E',
    textDark: '#2C221E',
    textMuted: '#69564A',
    borderHex: '#D8C7B2',
  },
  {
    id: 'olivo',
    name: 'Verde Olivo & Lino Silvestre',
    swatchColor: '#557252',
    primaryHex: '#557252',
    primaryDark: '#344B32',
    primaryLight: '#D8E5D6',
    ribbonGradient: 'from-[#476044] via-[#5C7D59] to-[#476044]',
    sealGradient: 'from-[#6E926A] via-[#557252] to-[#344B32]',
    bgOuter: '#DFE6DC',
    bgMain: '#EEF2EC',
    bgHeaderFrom: '#E1E9DD',
    bgHeaderTo: '#EEF2EC',
    bgCard: '#FAFBF9',
    bgCardAlt: '#E2EBE0',
    accentDark: '#263625',
    footerBg: '#1B261A',
    textDark: '#1C271B',
    textMuted: '#576755',
    borderHex: '#C4D4C1',
  },
  {
    id: 'rosa',
    name: 'Rosa Palo & Seda Antigua',
    swatchColor: '#B36B78',
    primaryHex: '#B36B78',
    primaryDark: '#7F3A47',
    primaryLight: '#F5DBDF',
    ribbonGradient: 'from-[#A15865] via-[#BF7482] to-[#A15865]',
    sealGradient: 'from-[#CF808E] via-[#B36B78] to-[#7F3A47]',
    bgOuter: '#ECE0E3',
    bgMain: '#F7EFF0',
    bgHeaderFrom: '#F0E2E4',
    bgHeaderTo: '#F7EFF0',
    bgCard: '#FDF9FA',
    bgCardAlt: '#EFE0E3',
    accentDark: '#3B2228',
    footerBg: '#2A181C',
    textDark: '#2C191E',
    textMuted: '#6F4E55',
    borderHex: '#DFC3C8',
  },
  {
    id: 'anil',
    name: 'Azul Añil Rústico & Algodón',
    swatchColor: '#4B6B82',
    primaryHex: '#4B6B82',
    primaryDark: '#284153',
    primaryLight: '#D5E2EC',
    ribbonGradient: 'from-[#3C586D] via-[#52758E] to-[#3C586D]',
    sealGradient: 'from-[#5F839C] via-[#4B6B82] to-[#284153]',
    bgOuter: '#DEE6EC',
    bgMain: '#EEF3F6',
    bgHeaderFrom: '#DFE8EE',
    bgHeaderTo: '#EEF3F6',
    bgCard: '#FAFCFD',
    bgCardAlt: '#DFE8EE',
    accentDark: '#1F303D',
    footerBg: '#15212A',
    textDark: '#16232D',
    textMuted: '#4E6270',
    borderHex: '#BFD0DC',
  },
  {
    id: 'oro',
    name: 'Oro Viejo & Trigo Silvestre',
    swatchColor: '#A58238',
    primaryHex: '#A58238',
    primaryDark: '#73571E',
    primaryLight: '#F3E4C4',
    ribbonGradient: 'from-[#93712B] via-[#B59142] to-[#93712B]',
    sealGradient: 'from-[#C4A050] via-[#A58238] to-[#73571E]',
    bgOuter: '#ECE5D5',
    bgMain: '#F6F3EC',
    bgHeaderFrom: '#ECE6D6',
    bgHeaderTo: '#F6F3EC',
    bgCard: '#FDFBF7',
    bgCardAlt: '#EFE7D6',
    accentDark: '#382D16',
    footerBg: '#261F10',
    textDark: '#27200E',
    textMuted: '#6C5E43',
    borderHex: '#DAD0B7',
  },
];

/**
 * Reusable SVG Torn Handmade Paper Divider so sections never have straight boxy lines
 */
const TornPaperDivider: React.FC<{
  fill: string;
  flip?: boolean;
  className?: string;
}> = ({ fill, flip = false, className = '' }) => (
  <div
    className={`w-full overflow-hidden leading-none select-none pointer-events-none transition-colors duration-500 ${
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
  // 0. Hero Preview Detection
  const [isHero, setIsHero] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isInsideIframe = window.self !== window.top;
      const hasHeroParam = window.location.search.includes('hero=true');
      if (isInsideIframe || hasHeroParam) {
        setIsHero(true);
      }
    }
  }, []);

  // 1. Color Palettes State (5 Handcrafted Palettes)
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const currentTheme = TORN_PAPER_PALETTES[selectedPaletteIndex];

  // 2. Unfurling Torn-Paper Scroll & Silk Ribbon State
  const [scrollOpened, setScrollOpened] = useState(false);
  const [untyingRibbon, setUntyingRibbon] = useState(false);

  // 3. Audio Ambiance
  const [musicOn, setMusicOn] = useState(false);

  // 4. Live Countdown State (Nov 6, 2027 16:00)
  const [timeLeft, setTimeLeft] = useState({
    days: 381,
    hours: 15,
    minutes: 40,
    seconds: 22,
  });

  // 5. Gifts Preview loaded from Backend / LocalStorage for the Planilla
  const [coupleGifts, setCoupleGifts] = useState<WeddingGiftItem[]>(INITIAL_GIFTS_FALLBACK);

  // 6. WhatsApp RSVP State
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
          // silently fallback to storage or defaults
        }
      }
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setCoupleGifts(JSON.parse(stored));
        }
      } catch {
        // keep fallback
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
      <div
        className="min-h-screen flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none transition-colors duration-500"
        style={{ backgroundColor: currentTheme.bgOuter }}
      >
        {/* Soft Botanical Background Texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 blur-[1px]"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-transparent to-charcoal/40" />

        {/* Top Controls Bar */}
        <div className="relative z-30 max-w-5xl w-full mx-auto pt-2">
          {isHero ? (
            /* HERO PREVIEW TOP BAR: Centered 5-color swatches */
            <div className="flex items-center justify-center gap-1.5">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 deckle-pill shadow-md backdrop-blur-md"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  border: `1.5px solid ${currentTheme.borderHex}`,
                }}
                title="Elige tu color artesanal favorito"
              >
                <Palette className="w-3.5 h-3.5 mr-0.5 opacity-70" style={{ color: currentTheme.primaryHex }} />
                {TORN_PAPER_PALETTES.map((pal, idx) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPaletteIndex(idx)}
                    className={`w-5 h-5 rounded-full transition-all duration-300 ${
                      selectedPaletteIndex === idx
                        ? 'scale-125 ring-2 ring-[#2C221E] shadow-sm'
                        : 'hover:scale-110 opacity-85'
                    }`}
                    style={{ backgroundColor: pal.swatchColor }}
                    title={pal.name}
                    aria-label={pal.name}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* STANDALONE PAGE TOP BAR */
            <div className="flex flex-wrap items-center justify-between gap-2">
              <a
                href="/#catalogo"
                className="px-4 py-2 deckle-pill text-xs uppercase tracking-[0.18em] transition flex items-center gap-1.5 shadow-sm"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  color: currentTheme.textDark,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al Catálogo</span>
              </a>

              {/* 5 Colors Swatches Bar */}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 deckle-pill shadow-sm"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
                title="Elige entre 5 paletas de color en tiempo real"
              >
                <Palette className="w-3.5 h-3.5 mr-0.5 opacity-70" style={{ color: currentTheme.primaryHex }} />
                {TORN_PAPER_PALETTES.map((pal, idx) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPaletteIndex(idx)}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      selectedPaletteIndex === idx
                        ? 'scale-125 ring-2 ring-[#2C221E] shadow-sm'
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: pal.swatchColor }}
                    title={pal.name}
                    aria-label={pal.name}
                  />
                ))}
              </div>

              <span
                className="px-4 py-1.5 deckle-pill text-[10px] uppercase tracking-[0.24em] font-semibold hidden md:inline-block shadow-sm"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  color: currentTheme.primaryHex,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
              >
                Papel Algodón Cortado a Mano · Bordes Rasgados
              </span>
            </div>
          )}
        </div>

        {/* Center Unfurling Torn-Paper Pliego with Silk Ribbon */}
        <div className="relative z-20 my-auto max-w-xl w-full mx-auto py-6">
          <div
            className={`deckle-card p-8 sm:p-12 text-center relative transition-all duration-700 shadow-editorial-lg ${
              untyingRibbon ? 'scale-105 opacity-0 -translate-y-8' : 'scale-100 opacity-100'
            }`}
            style={{
              backgroundColor: currentTheme.bgCard,
              border: `1px solid ${currentTheme.borderHex}`,
            }}
          >
            {/* Upper Paper Layer */}
            <div className="space-y-2 pb-10">
              <Flower2 className="w-6 h-6 mx-auto opacity-85" style={{ color: currentTheme.primaryHex }} />
              <span
                className="text-[10px] uppercase tracking-[0.32em] block font-medium"
                style={{ color: currentTheme.primaryHex }}
              >
                Pliego Nupcial Artesanal · {currentTheme.name}
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#2C221E] font-normal">
                Lucía <span className="italic font-light" style={{ color: currentTheme.primaryHex }}>&amp;</span> Rodrigo
              </h1>
              <p className="text-xs uppercase tracking-[0.24em]" style={{ color: currentTheme.textMuted }}>
                06 de Noviembre de 2027 · Hacienda Temozón
              </p>
            </div>

            {/* Horizontal Silk Ribbon Across the Paper */}
            <div className="relative my-4 flex items-center justify-center">
              {/* Silk Ribbon Strip */}
              <div
                className={`w-full h-9 bg-gradient-to-r ${currentTheme.ribbonGradient} shadow-md rounded-full opacity-95 transition-all duration-500`}
              />

              {/* Pressed Botanical Terracotta Wax Seal */}
              <button
                type="button"
                onClick={handleUntieScroll}
                className={`group absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${currentTheme.sealGradient} text-ivory-50 shadow-editorial-lg border-4 border-white/70 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer`}
                aria-label="Desatar cinta de seda y abrir pliego de invitación"
              >
                <div className="absolute inset-2 rounded-full border border-dashed border-white/45 pointer-events-none" />
                <Flower2 className="w-5 h-5 text-ivory-100 mb-0.5" />
                <span className="font-serif text-3xl sm:text-4xl tracking-widest">L&amp;R</span>
                <span className="text-[9px] uppercase tracking-[0.22em] text-ivory-200 mt-1">
                  Desatar Cinta
                </span>
              </button>
            </div>

            {/* Lower Paper Layer */}
            <div className="pt-12 space-y-2">
              <p className="font-serif italic text-2xl" style={{ color: currentTheme.textDark }}>
                Para: Nuestra Querida Familia y Amigos
              </p>
              <button
                type="button"
                onClick={handleUntieScroll}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold transition pt-2 hover:opacity-80"
                style={{ color: currentTheme.primaryHex }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Toca el sello de lacre para desplegar el papel</span>
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-30 text-center pb-2 text-xs font-serif italic" style={{ color: currentTheme.textMuted }}>
          Papelería Digital en Algodón Artesanal · Tu Invitación Especial
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. OPENED TORN-PAPER ARTISTIC LANDING PAGE
  // ============================================================================
  return (
    <div
      className="min-h-screen relative overflow-x-hidden transition-colors duration-500"
      style={{ backgroundColor: currentTheme.bgMain, color: currentTheme.textDark }}
    >
      {/* FLOATING TOP CONTROLS */}
      <div className="fixed top-4 inset-x-2 sm:inset-x-4 z-50 pointer-events-none">
        {isHero ? (
          /* HERO PREVIEW CONTROLS: Clean, centered palette swatches, reset and music */
          <div className="flex items-center justify-center gap-1.5 max-w-full mx-auto">
            {/* 5 Colors Swatches Bar */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 deckle-pill shadow-md pointer-events-auto backdrop-blur-md"
              style={{
                backgroundColor: currentTheme.bgCard,
                border: `1.5px solid ${currentTheme.borderHex}`,
              }}
              title="Elige tu color preferido en vivo"
            >
              <Palette className="w-3.5 h-3.5 mr-0.5 opacity-70" style={{ color: currentTheme.primaryHex }} />
              {TORN_PAPER_PALETTES.map((pal, idx) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => setSelectedPaletteIndex(idx)}
                  className={`w-5 h-5 rounded-full transition-all duration-300 ${
                    selectedPaletteIndex === idx
                      ? 'scale-125 ring-2 ring-charcoal shadow-sm'
                      : 'hover:scale-110 opacity-85'
                  }`}
                  style={{ backgroundColor: pal.swatchColor }}
                  title={pal.name}
                  aria-label={pal.name}
                />
              ))}
            </div>

            {/* Re-close scroll button */}
            <button
              type="button"
              onClick={() => setScrollOpened(false)}
              className="p-1.5 rounded-full transition shadow-md pointer-events-auto backdrop-blur-md"
              style={{
                backgroundColor: currentTheme.bgCard,
                border: `1.5px solid ${currentTheme.borderHex}`,
                color: currentTheme.primaryHex,
              }}
              title="Cerrar Pliego"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Music Toggle */}
            <button
              type="button"
              onClick={() => setMusicOn(!musicOn)}
              className="p-1.5 rounded-full text-ivory-50 transition shadow-md pointer-events-auto"
              style={{ backgroundColor: currentTheme.accentDark }}
              title={musicOn ? 'Pausar música' : 'Activar música'}
            >
              {musicOn ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        ) : (
          /* STANDALONE PAGE CONTROLS: Return to catalog + Cerrar Pliego + 5 Swatches + Music */
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 pointer-events-auto">
              <a
                href="/#catalogo"
                className="px-4 py-2 deckle-pill shadow-sm text-xs uppercase tracking-[0.16em] transition flex items-center gap-1.5"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  color: currentTheme.textDark,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Catálogo</span>
              </a>

              <button
                type="button"
                onClick={() => setScrollOpened(false)}
                className="px-4 py-2 deckle-pill shadow-sm text-xs uppercase tracking-[0.16em] transition flex items-center gap-1.5"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  color: currentTheme.textDark,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
              >
                <RotateCcw className="w-3.5 h-3.5" style={{ color: currentTheme.primaryHex }} />
                <span>Cerrar Pliego</span>
              </button>
            </div>

            {/* 5 Colors Swatches Bar */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 deckle-pill shadow-sm pointer-events-auto"
              style={{
                backgroundColor: currentTheme.bgCard,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
              title="Elige entre 5 paletas de color en tiempo real"
            >
              <Palette className="w-3.5 h-3.5 ml-1 mr-0.5 opacity-70" style={{ color: currentTheme.primaryHex }} />
              {TORN_PAPER_PALETTES.map((pal, idx) => (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => setSelectedPaletteIndex(idx)}
                  className={`w-6 h-6 rounded-full transition-transform ${
                    selectedPaletteIndex === idx
                      ? 'scale-125 ring-2 ring-charcoal shadow-sm'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: pal.swatchColor }}
                  title={pal.name}
                  aria-label={pal.name}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMusicOn(!musicOn)}
              className="pointer-events-auto px-5 py-2 deckle-pill text-ivory-50 shadow-editorial flex items-center gap-2 text-xs transition"
              style={{ backgroundColor: currentTheme.accentDark }}
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
        )}
      </div>

      {/* ========================================================================
          SECCIÓN 1: NOMBRES DE LOS NOVIOS + FOTOGRAFÍA EN MÁSCARA ORGÁNICA
      ======================================================================== */}
      <section
        className="pt-24 pb-16 px-4 sm:px-8 relative transition-colors duration-500"
        style={{
          background: `linear-gradient(to bottom, ${currentTheme.bgHeaderFrom}, ${currentTheme.bgHeaderTo})`,
        }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 deckle-pill text-xs uppercase tracking-[0.26em] shadow-sm font-semibold"
            style={{
              backgroundColor: currentTheme.bgCard,
              color: currentTheme.primaryHex,
              border: `1px solid ${currentTheme.borderHex}`,
            }}
          >
            <Flower2 className="w-4 h-4" />
            <span>Nuestra Boda · 06 de Noviembre de 2027</span>
          </div>

          <h1 className="font-serif text-6xl sm:text-8xl font-normal tracking-tight leading-none" style={{ color: currentTheme.textDark }}>
            Lucía <span className="italic font-light" style={{ color: currentTheme.primaryHex }}>&amp;</span> Rodrigo
          </h1>

          <p className="text-xs sm:text-sm uppercase tracking-[0.28em]" style={{ color: currentTheme.textMuted }}>
            Hacienda Temozón Sur · Mérida, Yucatán
          </p>

          {/* Organic Pebble / Handmade Paper Framed Couple Portrait */}
          <div className="max-w-2xl mx-auto pt-2">
            <div
              className="deckle-card p-4 sm:p-8 animate-float-gentle shadow-editorial"
              style={{
                backgroundColor: currentTheme.bgCard,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <div className="relative h-[340px] sm:h-[440px] overflow-hidden organic-photo-mask shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85"
                  alt="Lucía y Rodrigo"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/25 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Romantic Quote Placed Elegantly Below the Organic Portrait */}
              <div className="pt-6 pb-2 px-3 sm:px-8 text-center space-y-3">
                <p
                  className="font-serif italic text-xl sm:text-3xl leading-relaxed"
                  style={{ color: currentTheme.textDark }}
                >
                  «Contigo cada camino se convierte en nuestra mejor historia»
                </p>
                <div
                  className="w-12 h-0.5 mx-auto rounded-full opacity-60"
                  style={{ backgroundColor: currentTheme.primaryHex }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO QUOTE SECTION */}
      <TornPaperDivider fill={currentTheme.bgCard} />

      {/* ========================================================================
          SECCIÓN 2: FRASE CARACTERÍSTICA EN PLIEGO DE PAPEL ALGODÓN
      ======================================================================== */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-500"
        style={{ backgroundColor: currentTheme.bgCard }}
      >
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="max-w-3xl mx-auto space-y-5">
            <Feather className="w-7 h-7 mx-auto" style={{ color: currentTheme.primaryHex }} />
            <blockquote
              className="font-serif italic text-3xl sm:text-5xl leading-[1.22]"
              style={{ color: currentTheme.textDark }}
            >
              «Nos amamos no solo por lo que somos, sino por lo que construimos cuando estamos
              juntos. Hoy comienza el capítulo más hermoso de nuestras vidas.»
            </blockquote>
            <p className="text-xs uppercase tracking-[0.28em] font-semibold" style={{ color: currentTheme.primaryHex }}>
              — Con la bendición de Dios y de nuestros padres
            </p>
          </div>

          {/* Parents Cards with Torn Paper Edges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div
              className="deckle-card p-7 space-y-1.5 shadow-sm"
              style={{
                backgroundColor: currentTheme.bgCardAlt,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold block" style={{ color: currentTheme.primaryHex }}>
                Padres de la Novia
              </span>
              <p className="font-serif text-2xl" style={{ color: currentTheme.textDark }}>Sr. Ricardo Valenzuela</p>
              <p className="font-serif text-2xl" style={{ color: currentTheme.textDark }}>Sra. Clara Montes de Valenzuela</p>
            </div>

            <div
              className="deckle-card p-7 space-y-1.5 shadow-sm"
              style={{
                backgroundColor: currentTheme.bgCardAlt,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold block" style={{ color: currentTheme.primaryHex }}>
                Padres del Novio
              </span>
              <p className="font-serif text-2xl" style={{ color: currentTheme.textDark }}>Sr. Gonzalo Peñaloza</p>
              <p className="font-serif text-2xl" style={{ color: currentTheme.textDark }}>
                Sra. Sofía Mendizábal de Peñaloza
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO TIMER SECTION */}
      <TornPaperDivider fill={currentTheme.accentDark} />

      {/* ========================================================================
          SECCIÓN 3: TIMER (CUENTA REGRESIVA) + FECHA + UBICACIONES EN PAPEL CORTADO
      ======================================================================== */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-500"
        style={{ backgroundColor: currentTheme.accentDark, color: '#F9F6F0' }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <span
              className="inline-flex items-center gap-2 px-5 py-1.5 deckle-pill text-xs uppercase tracking-[0.25em]"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: currentTheme.primaryLight,
              }}
            >
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 max-w-3xl mx-auto">
            {[
              { value: timeLeft.days, label: 'Días' },
              { value: String(timeLeft.hours).padStart(2, '0'), label: 'Horas' },
              { value: String(timeLeft.minutes).padStart(2, '0'), label: 'Minutos' },
              { value: String(timeLeft.seconds).padStart(2, '0'), label: 'Segundos' },
            ].map((item) => (
              <div
                key={item.label}
                className="deckle-card py-4 px-2 sm:py-7 sm:px-4 flex flex-col items-center justify-center shadow-md overflow-hidden min-w-0"
                style={{
                  backgroundColor: currentTheme.bgCard,
                  border: `1px solid ${currentTheme.borderHex}`,
                  color: currentTheme.textDark,
                }}
              >
                <span
                  className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-none block max-w-full truncate"
                  style={{ color: currentTheme.primaryHex }}
                >
                  {item.value}
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] mt-2 font-medium" style={{ color: currentTheme.textMuted }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Ceremony & Reception Torn Paper Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 text-left">
            <div
              className="deckle-card p-8 flex flex-col justify-between space-y-5 shadow-editorial"
              style={{
                backgroundColor: currentTheme.bgCard,
                color: currentTheme.textDark,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: currentTheme.primaryHex }}>
                    16:00 Hrs · Ceremonia
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: currentTheme.bgCardAlt,
                      color: currentTheme.primaryHex,
                    }}
                  >
                    <Church className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif text-3xl" style={{ color: currentTheme.textDark }}>
                  Capilla Colonial de la Hacienda
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: currentTheme.textMuted }}>
                  Km 182 Carretera Mérida–Uxmal, Temozón Sur, Yucatán.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Hacienda+Temozon+Sur+Yucatan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 deckle-pill text-ivory-50 text-xs uppercase tracking-[0.18em] text-center transition flex items-center justify-center gap-2 shadow-sm hover:opacity-90"
                style={{ backgroundColor: currentTheme.accentDark }}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Ver Mapa de Ceremonia</span>
                <ExternalLink className="w-3 h-3 opacity-75" />
              </a>
            </div>

            <div
              className="deckle-card p-8 flex flex-col justify-between space-y-5 shadow-editorial"
              style={{
                backgroundColor: currentTheme.bgCard,
                color: currentTheme.textDark,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: currentTheme.primaryHex }}>
                    17:30 Hrs · Recepción &amp; Fiesta
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: currentTheme.bgCardAlt,
                      color: currentTheme.primaryHex,
                    }}
                  >
                    <PartyPopper className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif text-3xl" style={{ color: currentTheme.textDark }}>
                  Jardín de los Flamboyanes
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: currentTheme.textMuted }}>
                  Cóctel de bienvenida en el patio de los naranjos y cena de gala al aire libre.
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=Hacienda+Temozon+Sur+Yucatan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 deckle-pill text-ivory-50 text-xs uppercase tracking-[0.18em] text-center transition flex items-center justify-center gap-2 shadow-sm hover:opacity-90"
                style={{ backgroundColor: currentTheme.accentDark }}
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
      <TornPaperDivider fill={currentTheme.bgMain} />

      {/* ========================================================================
          SECCIÓN 4: CÓDIGO DE VESTIMENTA ÚNICO (SIN SELECTOR DE ESTACIONES)
      ======================================================================== */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-500"
        style={{ backgroundColor: currentTheme.bgMain }}
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="deckle-card p-8 sm:p-12 text-center space-y-8 shadow-editorial"
            style={{
              backgroundColor: currentTheme.bgCard,
              border: `1px solid ${currentTheme.borderHex}`,
            }}
          >
            <div className="space-y-3 max-w-2xl mx-auto">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: currentTheme.bgCardAlt,
                  color: currentTheme.primaryHex,
                }}
              >
                <Shirt className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.28em] font-semibold block" style={{ color: currentTheme.primaryHex }}>
                Protocolo de Vestimenta
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal" style={{ color: currentTheme.textDark }}>
                Código de Vestimenta: Formal de Hacienda
              </h2>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: currentTheme.textMuted }}>
                Les invitamos a vestir con elegancia y frescura para disfrutar cómodamente de los
                jardines y terrazas coloniales de la hacienda:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div
                className="deckle-card p-6 space-y-3"
                style={{
                  backgroundColor: currentTheme.bgCardAlt,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
              >
                <h3
                  className="font-serif text-2xl pb-2 border-b"
                  style={{ color: currentTheme.textDark, borderBottomColor: currentTheme.borderHex }}
                >
                  Damas · Vestido Largo
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm" style={{ color: currentTheme.textMuted }}>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primaryHex }} />
                    <span>
                      Vestido largo fluido en telas vaporosas (seda, gasa, lino fino o crepé).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primaryHex }} />
                    <span>
                      Se sugiere tacón ancho o cuña para caminar con total comodidad en los
                      jardines.
                    </span>
                  </li>
                </ul>
              </div>

              <div
                className="deckle-card p-6 space-y-3"
                style={{
                  backgroundColor: currentTheme.bgCardAlt,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
              >
                <h3
                  className="font-serif text-2xl pb-2 border-b"
                  style={{ color: currentTheme.textDark, borderBottomColor: currentTheme.borderHex }}
                >
                  Caballeros · Traje Formal o Lino
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm" style={{ color: currentTheme.textMuted }}>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primaryHex }} />
                    <span>
                      Traje formal de lino sastre o lana ligera en tonos arena, beige, azul marino
                      o gris.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: currentTheme.primaryHex }} />
                    <span>
                      Guayabera presidencial de lino de manga larga también bienvenida.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reserved Colors Note */}
            <div
              className="p-4 deckle-pill inline-block px-8"
              style={{
                backgroundColor: currentTheme.bgCardAlt,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <p className="text-xs font-medium" style={{ color: currentTheme.textDark }}>
                🤍 <strong>Nota importante:</strong> Los tonos blanco, marfil, hueso y beige muy
                claro están reservados exclusivamente para la novia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO RSVP SECTION */}
      <TornPaperDivider fill={currentTheme.bgCardAlt} />

      {/* ========================================================================
          SECCIÓN 5: CONFIRMACIÓN POR WHATSAPP MÁS UN MENSAJE
      ======================================================================== */}
      <section
        className="py-16 sm:py-24 px-4 sm:px-8 transition-colors duration-500"
        style={{ backgroundColor: currentTheme.bgCardAlt }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="deckle-card p-8 sm:p-12 space-y-6 shadow-editorial"
            style={{
              backgroundColor: currentTheme.bgCard,
              border: `1px solid ${currentTheme.borderHex}`,
            }}
          >
            <div className="text-center space-y-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mx-auto"
                style={{
                  backgroundColor: currentTheme.bgCardAlt,
                  color: currentTheme.primaryHex,
                }}
              >
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-[0.26em] font-semibold block" style={{ color: currentTheme.primaryHex }}>
                Confirmación de Asistencia
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal" style={{ color: currentTheme.textDark }}>
                Confirma por WhatsApp y Déjanos un Mensaje
              </h2>
              <p className="text-sm max-w-lg mx-auto" style={{ color: currentTheme.textMuted }}>
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
                <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: currentTheme.textMuted }}>
                  Nombre completo o Familia *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ej. Familia Villalobos / Andrea y Carlos"
                  className="w-full px-5 py-3 deckle-pill text-sm focus:outline-none"
                  style={{
                    backgroundColor: currentTheme.bgCardAlt,
                    border: `1px solid ${currentTheme.borderHex}`,
                    color: currentTheme.textDark,
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('si')}
                  className="py-3 px-5 deckle-pill text-xs uppercase tracking-wider font-medium transition flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: attending === 'si' ? currentTheme.accentDark : currentTheme.bgCardAlt,
                    color: attending === 'si' ? '#FFF' : currentTheme.textMuted,
                    border: `1px solid ${currentTheme.borderHex}`,
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>¡Sí, los acompañaremos!</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className="py-3 px-5 deckle-pill text-xs uppercase tracking-wider font-medium transition flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: attending === 'no' ? currentTheme.accentDark : currentTheme.bgCardAlt,
                    color: attending === 'no' ? '#FFF' : currentTheme.textMuted,
                    border: `1px solid ${currentTheme.borderHex}`,
                  }}
                >
                  <Heart className="w-4 h-4" />
                  <span>No podremos asistir</span>
                </button>
              </div>

              {attending === 'si' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: currentTheme.textMuted }}>
                      Número de asistentes
                    </label>
                    <select
                      value={passes}
                      onChange={(e) => setPasses(e.target.value)}
                      className="w-full px-5 py-3 deckle-pill text-sm focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgCardAlt,
                        border: `1px solid ${currentTheme.borderHex}`,
                        color: currentTheme.textDark,
                      }}
                    >
                      <option value="1">1 Persona</option>
                      <option value="2">2 Personas</option>
                      <option value="3">3 Personas</option>
                      <option value="4">4 Personas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: currentTheme.textMuted }}>
                      Restricción alimentaria
                    </label>
                    <input
                      type="text"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      placeholder="Ej. Vegetariano / Ninguna"
                      className="w-full px-5 py-3 deckle-pill text-sm focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgCardAlt,
                        border: `1px solid ${currentTheme.borderHex}`,
                        color: currentTheme.textDark,
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider mb-1.5" style={{ color: currentTheme.textMuted }}>
                  Tu mensaje para Lucía &amp; Rodrigo *
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Déjanos aquí tus mejores deseos..."
                  className="w-full px-5 py-3.5 rounded-[24px] text-sm focus:outline-none"
                  style={{
                    backgroundColor: currentTheme.bgCardAlt,
                    border: `1px solid ${currentTheme.borderHex}`,
                    color: currentTheme.textDark,
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 deckle-pill text-ivory-50 text-xs uppercase tracking-[0.2em] font-medium transition flex items-center justify-center gap-2.5 shadow-editorial hover:opacity-90"
                style={{ backgroundColor: currentTheme.accentDark }}
              >
                <FaWhatsapp className="w-5 h-5 text-[#A7D7B8]" />
                <span>Confirmar por WhatsApp con Mensaje</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* TORN PAPER EDGE INTO GRATITUDE SECTION */}
      <TornPaperDivider fill={currentTheme.footerBg} />

      {/* ========================================================================
          SECCIÓN 6: AGRADECIMIENTOS FINALES
      ======================================================================== */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-8 text-center transition-colors duration-500"
        style={{ backgroundColor: currentTheme.footerBg, color: '#F9F6F0' }}
      >
        <div className="max-w-3xl mx-auto space-y-8">
          <div
            className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto font-serif text-2xl shadow-inner"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              color: currentTheme.primaryLight,
            }}
          >
            L&amp;R
          </div>

          <span className="text-xs uppercase tracking-[0.3em] block" style={{ color: currentTheme.primaryLight }}>
            Agradecimientos
          </span>

          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-ivory-50 leading-tight">
            Gracias por escribir este capítulo junto a nosotros
          </h2>

          <p className="text-sm sm:text-base text-ivory-200/80 leading-relaxed max-w-2xl mx-auto font-light">
            A nuestras familias, padrinos y amigos del alma: gracias por cada abrazo, por viajar
            para acompañarnos y por llenar de alegría el inicio de nuestro matrimonio.
          </p>

          <div
            className="max-w-md mx-auto deckle-card p-4 shadow-editorial-lg"
            style={{ backgroundColor: currentTheme.accentDark }}
          >
            <img
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80"
              alt="Lucía y Rodrigo agradecimiento"
              className="w-full h-60 object-cover organic-photo-mask"
              loading="lazy"
            />
          </div>

          <div className="pt-4 space-y-1">
            <p className="font-serif italic text-3xl" style={{ color: currentTheme.primaryLight }}>
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