import React, { useState, useEffect } from 'react';
import {
  Heart,
  Sparkles,
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
  RotateCcw,
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Smartphone,
  Tablet,
  Monitor,
  Palette,
  MessageSquareHeart,
  Droplets,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { WHATSAPP_NUMBER } from '../data/weddingData';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface MintPalette {
  id: string;
  name: string;
  swatchColor: string;
  bgHex: string;
  cardHex: string;
  primaryHex: string;
  secondaryHex: string;
  textHex: string;
  mutedHex: string;
  borderHex: string;
  heartColor: string;
  sealGradient: string;
}

export const MINT_PALETTES: MintPalette[] = [
  {
    id: 'menta-marfil',
    name: 'Verde Menta & Marfil',
    swatchColor: '#558A70',
    bgHex: '#F4F7F5',
    cardHex: '#FCFDFB',
    primaryHex: '#4F7C66',
    secondaryHex: '#E3EFE9',
    textHex: '#1A2921',
    mutedHex: '#526D60',
    borderHex: '#BCD1C6',
    heartColor: '#79A891',
    sealGradient: 'from-[#6E9E86] via-[#4F7C66] to-[#365A48]',
  },
  {
    id: 'menta-oro',
    name: 'Oro Champán & Vainilla',
    swatchColor: '#B89758',
    bgHex: '#F9F7F2',
    cardHex: '#FFFDF9',
    primaryHex: '#A38140',
    secondaryHex: '#F5EEDC',
    textHex: '#2C2518',
    mutedHex: '#786749',
    borderHex: '#DCCBA8',
    heartColor: '#C9AA6A',
    sealGradient: 'from-[#CCA963] via-[#A88643] to-[#7A5E28]',
  },
  {
    id: 'menta-rosa',
    name: 'Rosa Cuarzo & Crema',
    swatchColor: '#C27481',
    bgHex: '#FAF5F6',
    cardHex: '#FFFDFC',
    primaryHex: '#B05E6C',
    secondaryHex: '#F7E4E7',
    textHex: '#2F1E22',
    mutedHex: '#7C585F',
    borderHex: '#E5C0C7',
    heartColor: '#D68996',
    sealGradient: 'from-[#D17C8B] via-[#B2606E] to-[#803945]',
  },
  {
    id: 'menta-sereno',
    name: 'Azul Sereno & Perla',
    swatchColor: '#4B7B94',
    bgHex: '#F3F6F8',
    cardHex: '#FBFCFD',
    primaryHex: '#3C6C85',
    secondaryHex: '#DFEAF0',
    textHex: '#18252C',
    mutedHex: '#546A76',
    borderHex: '#B6CBD7',
    heartColor: '#6795AE',
    sealGradient: 'from-[#5A8DA7] via-[#3C6C85] to-[#254A5D]',
  },
  {
    id: 'menta-terracota',
    name: 'Terracota Cálido & Almendra',
    swatchColor: '#B86246',
    bgHex: '#F9F5F3',
    cardHex: '#FFFCFA',
    primaryHex: '#A85236',
    secondaryHex: '#F7E6E0',
    textHex: '#2E1E19',
    mutedHex: '#775246',
    borderHex: '#DFBFB4',
    heartColor: '#CE785D',
    sealGradient: 'from-[#CA6C4F] via-[#A85236] to-[#78331D]',
  },
];

export const MintHeartsWeddingInvitation: React.FC = () => {
  // Hero Preview detection (iframe or query param ?hero=true)
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

  // Opening seal state
  const [opened, setOpened] = useState(false);
  const [openingAnim, setOpeningAnim] = useState(false);

  // Audio state
  const [audioActive, setAudioActive] = useState(false);

  // Rain of Hearts toggle
  const [rainEnabled, setRainEnabled] = useState(true);

  // 5 Color Palettes State
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);

  // Device Viewport Simulation State
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  // Live Countdown (Sept 18, 2027 17:00)
  const [countdown, setCountdown] = useState({
    days: 332,
    hours: 19,
    minutes: 42,
    seconds: 18,
  });

  // RSVP Form State
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'si' | 'no'>('si');
  const [passes, setPasses] = useState('2');
  const [song, setSong] = useState('');
  const [dietary, setDietary] = useState('');
  const [notes, setNotes] = useState('');

  const currentTheme = MINT_PALETTES[selectedPaletteIndex];

  useEffect(() => {
    const target = new Date('2027-09-18T17:00:00').getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleOpenInvitation = () => {
    setOpeningAnim(true);
    setTimeout(() => {
      setOpened(true);
      setOpeningAnim(false);
      setAudioActive(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 750);
  };

  const buildWhatsAppRsvp = () => {
    const status =
      attending === 'si'
        ? `🌿 *SÍ ASISTIREMOS* (${passes} ${Number(passes) === 1 ? 'pase' : 'pases'})`
        : `🤍 *NO PODREMOS ASISTIR*, pero los acompañamos de corazón`;

    const lines = [
      `¡Hola Isabella & Tomás! 💍✨`,
      `Les confirmamos nuestra asistencia a su boda en Jardín de las Hortensias:`,
      ``,
      `• *Invitado / Familia:* ${guestName.trim() || 'Familia Invitada'}`,
      `• *Confirmación:* ${status}`,
      attending === 'si' && dietary.trim() ? `• *Alergias / Menú:* ${dietary.trim()}` : '',
      attending === 'si' && song.trim() ? `• *Canción sugerida:* ${song.trim()}` : '',
      notes.trim()
        ? `\n💌 *Mensaje con cariño:*\n"${notes.trim()}"`
        : `\n💌 *Mensaje:* ¡Que su amor florezca cada día más!`,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // Hearts rain particles (almost transparent SVG hearts floating down)
  const heartRainItems = [
    { left: '4%', delay: '0s', duration: '13s', size: 18, opacity: 0.22 },
    { left: '14%', delay: '4s', duration: '17s', size: 24, opacity: 0.18 },
    { left: '26%', delay: '1s', duration: '15s', size: 16, opacity: 0.26 },
    { left: '38%', delay: '6s', duration: '19s', size: 28, opacity: 0.16 },
    { left: '50%', delay: '2s', duration: '14s', size: 20, opacity: 0.24 },
    { left: '62%', delay: '7s', duration: '18s', size: 26, opacity: 0.19 },
    { left: '74%', delay: '3s', duration: '16s', size: 17, opacity: 0.25 },
    { left: '86%', delay: '5s', duration: '14s', size: 22, opacity: 0.21 },
    { left: '95%', delay: '2.5s', duration: '16s', size: 19, opacity: 0.17 },
  ];

  // Device wrapper classes
  const getContainerWrapper = () => {
    if (isHero) {
      return 'w-full min-h-screen';
    }
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[400px] mx-auto my-8 border-[12px] border-charcoal rounded-[54px] shadow-2xl overflow-hidden relative';
      case 'tablet':
        return 'max-w-[800px] mx-auto my-8 border-[14px] border-charcoal rounded-[40px] shadow-2xl overflow-hidden relative';
      case 'desktop':
      default:
        return 'w-full min-h-screen';
    }
  };

  return (
    <div
      className="min-h-screen relative transition-colors duration-500 overflow-x-hidden"
      style={{ backgroundColor: currentTheme.bgHex, color: currentTheme.textHex }}
    >
      {/* FLOATING RAIN OF ALMOST-TRANSPARENT HEARTS */}
      {rainEnabled && (
        <div
          className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
          aria-hidden="true"
        >
          {heartRainItems.map((item, idx) => (
            <div
              key={idx}
              className="absolute -top-10 animate-heart-rain"
              style={{
                left: item.left,
                animationDelay: item.delay,
                animationDuration: item.duration,
                opacity: item.opacity,
                color: currentTheme.heartColor,
              }}
            >
              <Heart
                style={{ width: `${item.size}px`, height: `${item.size}px` }}
                fill="currentColor"
              />
            </div>
          ))}
        </div>
      )}

      {/* FLOATING TOP TOOLBAR */}
      <div className="fixed top-3 inset-x-2 sm:inset-x-4 z-50 pointer-events-none">
        {isHero ? (
          /* HERO PREVIEW TOOLBAR: Centered palette swatches + action buttons, NO device buttons */
          <div className="flex items-center justify-center gap-1.5 max-w-full mx-auto">
            {/* 5 Colors Swatches Bar */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-md pointer-events-auto backdrop-blur-md"
              style={{
                backgroundColor: currentTheme.cardHex,
                border: `1.5px solid ${currentTheme.borderHex}`,
              }}
              title="Elige tu color preferido en tiempo real"
            >
              <Palette className="w-3.5 h-3.5 mr-0.5 opacity-70" style={{ color: currentTheme.primaryHex }} />
              {MINT_PALETTES.map((pal, idx) => (
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

            {/* If opened: small re-close button */}
            {opened && (
              <button
                type="button"
                onClick={() => setOpened(false)}
                className="p-1.5 rounded-full transition shadow-md pointer-events-auto backdrop-blur-md"
                style={{
                  backgroundColor: currentTheme.cardHex,
                  border: `1.5px solid ${currentTheme.borderHex}`,
                  color: currentTheme.primaryHex,
                }}
                title="Ver Sobre / Reiniciar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Music Toggle */}
            <button
              type="button"
              onClick={() => setAudioActive(!audioActive)}
              className="p-1.5 rounded-full text-ivory-50 transition shadow-md pointer-events-auto"
              style={{ backgroundColor: currentTheme.primaryHex }}
              title={audioActive ? 'Pausar música' : 'Activar música'}
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        ) : (
          /* STANDALONE PAGE TOOLBAR: Full controls with catalog return, device switcher & color picker */
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
            {/* Left Buttons: Return to catalog & Re-close seal */}
            <div className="flex items-center gap-2 pointer-events-auto">
              <a
                href="/#catalogo"
                className="px-3.5 py-2 rounded-full text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm"
                style={{
                  backgroundColor: currentTheme.cardHex,
                  border: `1px solid ${currentTheme.borderHex}`,
                  color: currentTheme.textHex,
                }}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Catálogo</span>
              </a>

              {opened && (
                <button
                  type="button"
                  onClick={() => setOpened(false)}
                  className="px-3.5 py-2 rounded-full text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm"
                  style={{
                    backgroundColor: currentTheme.cardHex,
                    border: `1px solid ${currentTheme.borderHex}`,
                    color: currentTheme.textHex,
                  }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Ver Sobre</span>
                </button>
              )}
            </div>

            {/* Center: Device Viewport Switcher (Móvil, Tablet, Desktop) */}
            <div
              className="flex items-center p-1 rounded-full shadow-sm pointer-events-auto"
              style={{
                backgroundColor: currentTheme.cardHex,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition flex items-center gap-1 ${
                  deviceMode === 'mobile'
                    ? 'bg-charcoal text-ivory-50 font-medium'
                    : 'hover:opacity-80'
                }`}
                title="Ver en vista de Celular (Smartphone)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Móvil</span>
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode('tablet')}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition flex items-center gap-1 ${
                  deviceMode === 'tablet'
                    ? 'bg-charcoal text-ivory-50 font-medium'
                    : 'hover:opacity-80'
                }`}
                title="Ver en vista de Tablet"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Tablet</span>
              </button>

              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider transition flex items-center gap-1 ${
                  deviceMode === 'desktop'
                    ? 'bg-charcoal text-ivory-50 font-medium'
                    : 'hover:opacity-80'
                }`}
                title="Ver en Pantalla Completa"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Completa</span>
              </button>
            </div>

            {/* Right: 5 Color Palettes Selector + Heart Rain Toggle + Music */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* 5 Colors Swatches Bar */}
              <div
                className="flex items-center gap-1.5 p-1.5 rounded-full shadow-sm"
                style={{
                  backgroundColor: currentTheme.cardHex,
                  border: `1px solid ${currentTheme.borderHex}`,
                }}
                title="Elige entre 5 paletas de color en tiempo real"
              >
                <Palette className="w-3.5 h-3.5 ml-1.5 opacity-70" style={{ color: currentTheme.primaryHex }} />
                {MINT_PALETTES.map((pal, idx) => (
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

              {/* Toggle Heart Rain Button */}
              <button
                type="button"
                onClick={() => setRainEnabled(!rainEnabled)}
                className="p-2 rounded-full transition shadow-sm"
                style={{
                  backgroundColor: currentTheme.cardHex,
                  border: `1px solid ${currentTheme.borderHex}`,
                  color: rainEnabled ? currentTheme.primaryHex : currentTheme.mutedHex,
                }}
                title={rainEnabled ? 'Pausar lluvia de corazones' : 'Activar lluvia de corazones'}
              >
                <Droplets className="w-4 h-4" />
              </button>

              {/* Music Toggle */}
              <button
                type="button"
                onClick={() => setAudioActive(!audioActive)}
                className="p-2 rounded-full text-ivory-50 transition shadow-sm"
                style={{ backgroundColor: currentTheme.primaryHex }}
                title={audioActive ? 'Pausar música' : 'Activar música'}
              >
                {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* INNER WRAPPER (RESPONSIVE OR DEVICE MOCKUP FRAME) */}
      <div className={getContainerWrapper()}>
        {/* Device Speaker Notch in Mobile Simulator */}
        {!isHero && deviceMode === 'mobile' && (
          <div className="w-36 h-5 bg-charcoal rounded-b-2xl mx-auto z-40 relative flex items-center justify-center">
            <div className="w-10 h-1 bg-charcoal-light rounded-full" />
          </div>
        )}

        {/* ====================================================================
            1. INITIAL VIEW: MINT & IVORY SEAL BEFORE OPENING
        ==================================================================== */}
        {!opened ? (
          <div
            className="min-h-screen flex flex-col justify-between items-center text-center p-6 sm:p-12 relative select-none"
            style={{ backgroundColor: currentTheme.bgHex }}
          >
            <div className="pt-16 sm:pt-20 space-y-2">
              <span
                className="text-[11px] uppercase tracking-[0.3em] font-semibold"
                style={{ color: currentTheme.primaryHex }}
              >
                {currentTheme.name}
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-wide">
                Isabella <span className="italic font-light">&amp;</span> Tomás
              </h1>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: currentTheme.mutedHex }}>
                18 de Septiembre de 2027 · Jardín de las Hortensias
              </p>
            </div>

            {/* Animated Seal Card */}
            <div
              className={`my-auto p-8 sm:p-14 rounded-[36px] max-w-lg w-full shadow-editorial transition-all duration-700 ${
                openingAnim ? 'scale-105 opacity-0 -translate-y-6' : 'scale-100 opacity-100'
              }`}
              style={{
                backgroundColor: currentTheme.cardHex,
                border: `1px solid ${currentTheme.borderHex}`,
              }}
            >
              <p className="text-xs uppercase tracking-[0.28em] mb-2" style={{ color: currentTheme.mutedHex }}>
                Pase de Honor
              </p>
              <h3 className="font-serif italic text-3xl mb-8">Apreciable Familia &amp; Amigos</h3>

              <div className="relative inline-block">
                <span
                  className="animate-ping absolute inset-0 rounded-full opacity-35"
                  style={{ backgroundColor: currentTheme.primaryHex }}
                />
                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${currentTheme.sealGradient} text-ivory-50 shadow-editorial-lg border-4 border-white/60 flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95`}
                >
                  <Heart className="w-5 h-5 fill-current opacity-85 mb-0.5" />
                  <span className="font-serif text-3xl tracking-widest font-semibold">I&amp;T</span>
                  <span className="text-[9px] uppercase tracking-widest text-ivory-100/90 mt-1">
                    Tocar para Abrir
                  </span>
                </button>
              </div>

              <div className="mt-8 space-y-1">
                <p className="text-xs uppercase tracking-[0.22em] font-semibold" style={{ color: currentTheme.primaryHex }}>
                  Efecto de Lluvia de Corazones Flotantes
                </p>
                <p className="text-[11px] italic" style={{ color: currentTheme.mutedHex }}>
                  Personalizable con 5 paletas de color en tiempo real
                </p>
              </div>
            </div>

            <div className="pb-4 text-xs tracking-widest uppercase opacity-60">
              Colección Marfil Menta · Tu Invitación Especial
            </div>
          </div>
        ) : (
          /* ====================================================================
              2. OPENED EXTENSIVE INVITATION SECTIONS
          ==================================================================== */
          <div className="space-y-16 sm:space-y-24 pb-20">
            {/* HERO SECTION: NAMES & COUPLE PORTRAIT */}
            <section className="pt-24 sm:pt-28 px-6 text-center space-y-8">
              <div className="space-y-3">
                <span
                  className="px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.26em] font-semibold inline-block"
                  style={{ backgroundColor: currentTheme.secondaryHex, color: currentTheme.primaryHex }}
                >
                  ¡Nuestra Boda! · 18 · Septiembre · 2027
                </span>
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-none">
                  Isabella <span className="italic font-light">&amp;</span> Tomás
                </h1>
                <p className="text-xs sm:text-sm uppercase tracking-[0.25em]" style={{ color: currentTheme.mutedHex }}>
                  Jardín de las Hortensias · San Cristóbal
                </p>
              </div>

              {/* Framed Photo with Soft Mint/Ivory Border */}
              <div className="max-w-3xl mx-auto p-4 rounded-[40px] shadow-editorial" style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}>
                <div className="relative h-[420px] sm:h-[500px] rounded-[32px] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85"
                    alt="Isabella y Tomás"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 inset-x-6 text-center text-ivory-50">
                    <p className="font-serif italic text-2xl sm:text-3xl drop-shadow">
                      «En tus ojos encontré mi lugar favorito en el mundo»
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CHARACTERISTIC LOVE QUOTE */}
            <section className="px-6 text-center">
              <div
                className="max-w-3xl mx-auto p-8 sm:p-12 rounded-[36px] shadow-sm space-y-4"
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <Sparkles className="w-6 h-6 mx-auto" style={{ color: currentTheme.primaryHex }} />
                <blockquote className="font-serif italic text-3xl sm:text-4xl leading-relaxed">
                  «El amor verdadero no se trata de no tener diferencias, sino de saber caminar
                  juntos hacia el mismo horizonte. Hoy comenzamos nuestra mayor aventura.»
                </blockquote>
                <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: currentTheme.primaryHex }}>
                  — Isabella &amp; Tomás
                </p>
              </div>
            </section>

            {/* COUNTDOWN TIMER & CEREMONY/RECEPTION LOCATIONS */}
            <section className="px-6">
              <div className="max-w-4xl mx-auto space-y-10 text-center">
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.28em] font-semibold" style={{ color: currentTheme.primaryHex }}>
                    Cuenta Regresiva
                  </span>
                  <h2 className="font-serif text-4xl sm:text-5xl font-normal">
                    Sábado, 18 de Septiembre de 2027
                  </h2>
                </div>

                {/* 4 Countdown Blocks */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-2xl mx-auto">
                  {[
                    { label: 'Días', val: countdown.days },
                    { label: 'Horas', val: String(countdown.hours).padStart(2, '0') },
                    { label: 'Minutos', val: String(countdown.minutes).padStart(2, '0') },
                    { label: 'Segundos', val: String(countdown.seconds).padStart(2, '0') },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="py-4 px-2 sm:py-6 sm:px-4 rounded-2xl sm:rounded-[28px] shadow-sm flex flex-col items-center justify-center text-center overflow-hidden min-w-0"
                      style={{
                        backgroundColor: currentTheme.cardHex,
                        border: `1px solid ${currentTheme.borderHex}`,
                      }}
                    >
                      <span
                        className="font-serif text-2xl sm:text-4xl lg:text-5xl font-semibold leading-none tracking-tight block max-w-full"
                        style={{ color: currentTheme.primaryHex }}
                      >
                        {item.val}
                      </span>
                      <span
                        className="text-[10px] sm:text-xs uppercase tracking-wider block mt-1.5"
                        style={{ color: currentTheme.mutedHex }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ceremony & Reception Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div
                    className="p-7 rounded-[32px] shadow-sm space-y-4"
                    style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                        17:00 Hrs · Ceremonia
                      </span>
                      <Church className="w-5 h-5" style={{ color: currentTheme.primaryHex }} />
                    </div>
                    <h3 className="font-serif text-2xl">Parroquia de Santa María de las Rosas</h3>
                    <p className="text-xs" style={{ color: currentTheme.mutedHex }}>
                      Av. de las Hortensias 450, Centro Histórico.
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold hover:underline pt-2"
                      style={{ color: currentTheme.primaryHex }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Abrir Ubicación GPS</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div
                    className="p-7 rounded-[32px] shadow-sm space-y-4"
                    style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                        19:00 Hrs · Recepción
                      </span>
                      <GlassWater className="w-5 h-5" style={{ color: currentTheme.primaryHex }} />
                    </div>
                    <h3 className="font-serif text-2xl">Jardín de las Hortensias</h3>
                    <p className="text-xs" style={{ color: currentTheme.mutedHex }}>
                      Salón Cristal &amp; Terraza de los Lirios.
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold hover:underline pt-2"
                      style={{ color: currentTheme.primaryHex }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Abrir Ubicación GPS</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* UNIFIED DRESS CODE (WITHOUT SEASON TABS) */}
            <section className="px-6">
              <div
                className="max-w-3xl mx-auto p-8 sm:p-12 rounded-[36px] text-center space-y-6 shadow-sm"
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <Shirt className="w-6 h-6 mx-auto" style={{ color: currentTheme.primaryHex }} />
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                    Protocolo de Vestimenta
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl">Formal Elegante · Jardín de Gala</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl" style={{ backgroundColor: currentTheme.secondaryHex }}>
                    <strong className="block mb-1 font-serif text-lg">Damas</strong>
                    <p style={{ color: currentTheme.textHex }}>
                      Vestido largo o midi en tejidos frescos y elegantes. Tacón ancho o cuña sugerido para jardín.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ backgroundColor: currentTheme.secondaryHex }}>
                    <strong className="block mb-1 font-serif text-lg">Caballeros</strong>
                    <p style={{ color: currentTheme.textHex }}>
                      Traje formal completo en tonos azul marino, gris medio o lino sastre con corbata o pañuelo.
                    </p>
                  </div>
                </div>
                <p className="text-xs italic pt-2" style={{ color: currentTheme.mutedHex }}>
                  * El color blanco, marfil y tonos crudos están reservados con cariño para la novia.
                </p>
              </div>
            </section>

            {/* RSVP SECTION DIRECT TO WHATSAPP */}
            <section className="px-6">
              <div
                className="max-w-3xl mx-auto p-8 sm:p-12 rounded-[36px] shadow-sm space-y-6"
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <div className="text-center space-y-2">
                  <MessageSquareHeart className="w-6 h-6 mx-auto" style={{ color: currentTheme.primaryHex }} />
                  <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                    R.S.V.P.
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl">Confirmación de Asistencia</h3>
                  <p className="text-xs sm:text-sm" style={{ color: currentTheme.mutedHex }}>
                    Agradecemos confirmar antes del 18 de Agosto de 2027.
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
                    <label className="block text-xs uppercase tracking-wider mb-1">
                      Nombre completo o Familia *
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Ej. Familia Santillán"
                      className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgHex,
                        border: `1px solid ${currentTheme.borderHex}`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending('si')}
                      className={`w-full py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 text-center shadow-sm ${
                        attending === 'si'
                          ? 'bg-charcoal text-ivory-50'
                          : 'border'
                      }`}
                      style={{
                        borderColor: attending === 'si' ? 'transparent' : currentTheme.borderHex,
                        backgroundColor: attending === 'si' ? '#2C221E' : currentTheme.bgHex,
                        color: attending === 'si' ? '#FFFFFF' : currentTheme.textHex,
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>¡Sí, Asistiremos!</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`w-full py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider font-semibold transition flex items-center justify-center gap-2 text-center shadow-sm ${
                        attending === 'no'
                          ? 'bg-charcoal text-ivory-50'
                          : 'border'
                      }`}
                      style={{
                        borderColor: attending === 'no' ? 'transparent' : currentTheme.borderHex,
                        backgroundColor: attending === 'no' ? '#2C221E' : currentTheme.bgHex,
                        color: attending === 'no' ? '#FFFFFF' : currentTheme.textHex,
                      }}
                    >
                      <Heart className="w-4 h-4 shrink-0" />
                      <span>No Podremos Asistir</span>
                    </button>
                  </div>

                  {attending === 'si' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-1">
                          Pases a confirmar
                        </label>
                        <select
                          value={passes}
                          onChange={(e) => setPasses(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                          style={{
                            backgroundColor: currentTheme.bgHex,
                            border: `1px solid ${currentTheme.borderHex}`,
                          }}
                        >
                          <option value="1">1 Pase</option>
                          <option value="2">2 Pases</option>
                          <option value="3">3 Pases</option>
                          <option value="4">4 Pases</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider mb-1">
                          Canción para la fiesta
                        </label>
                        <input
                          type="text"
                          value={song}
                          onChange={(e) => setSong(e.target.value)}
                          placeholder="Tu tema favorito..."
                          className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                          style={{
                            backgroundColor: currentTheme.bgHex,
                            border: `1px solid ${currentTheme.borderHex}`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1">
                      Dedicatoria para Isabella &amp; Tomás
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Escribe aquí tus buenos deseos..."
                      className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                      style={{
                        backgroundColor: currentTheme.bgHex,
                        border: `1px solid ${currentTheme.borderHex}`,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl text-ivory-50 text-xs uppercase tracking-[0.2em] font-semibold transition flex items-center justify-center gap-2 shadow-md hover:opacity-95"
                    style={{ backgroundColor: currentTheme.primaryHex }}
                  >
                    <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
                    <span>Confirmar Asistencia por WhatsApp</span>
                  </button>
                </form>
              </div>
            </section>

            {/* GIFT SECTION WITH BUTTON TO GIFT REGISTRY */}
            <section className="px-6 text-center">
              <div
                className="max-w-3xl mx-auto p-8 sm:p-12 rounded-[36px] shadow-sm space-y-5"
                style={{ backgroundColor: currentTheme.cardHex, border: `1px solid ${currentTheme.borderHex}` }}
              >
                <Gift className="w-7 h-7 mx-auto" style={{ color: currentTheme.primaryHex }} />
                <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: currentTheme.primaryHex }}>
                  Mesa de Regalos
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl">Lista de Regalos de los Novios</h3>
                <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: currentTheme.mutedHex }}>
                  El mejor obsequio es contar con su presencia. Si desean tener un detalle para
                  nuestro nuevo hogar o luna de miel, pueden consultar nuestra lista de regalos
                  personalizada:
                </p>

                <div className="pt-3">
                  <a
                    href="/disenos/mesa-de-regalos"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-ivory-50 text-xs uppercase tracking-[0.18em] font-semibold shadow-md transition hover:opacity-95"
                    style={{ backgroundColor: currentTheme.primaryHex }}
                  >
                    <Gift className="w-4 h-4" />
                    <span>Ver Lista de Regalos de los Novios</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* GRATITUDE / CLOSING */}
            <section className="px-6 text-center pt-8 pb-12">
              <div className="max-w-2xl mx-auto space-y-4">
                <Heart className="w-6 h-6 mx-auto fill-current" style={{ color: currentTheme.primaryHex }} />
                <h3 className="font-serif text-4xl sm:text-5xl">¡Gracias por Acompañarnos!</h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: currentTheme.mutedHex }}>
                  A nuestras familias y amigos por llenar de luz este camino. Nos vemos el 18 de
                  Septiembre para celebrar el amor.
                </p>
                <p className="font-serif italic text-2xl pt-2" style={{ color: currentTheme.primaryHex }}>
                  Isabella &amp; Tomás
                </p>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
