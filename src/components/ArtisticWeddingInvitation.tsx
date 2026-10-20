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
  Sun,
  Moon,
  Shirt,
  Check,
  CheckCircle2,
  Church,
  GlassWater,
  Utensils,
  PartyPopper,
  Camera,
  RotateCcw,
  ArrowLeft,
  ExternalLink,
  Disc3,
  Feather,
  Compass,
  Flame,
  Wine,
} from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { WHATSAPP_NUMBER } from '../data/weddingData';

type SeasonKey = 'verano' | 'primavera' | 'otono' | 'invierno';

interface ArtisticSeasonConfig {
  id: SeasonKey;
  label: string;
  subtitle: string;
  temp: string;
  etiquette: string;
  atmosphere: string;
  womenTips: string[];
  menTips: string[];
  swatches: {
    name: string;
    hex: string;
    stylingTip: string;
  }[];
  reservedNote: string;
}

const ARTISTIC_SEASONS: Record<SeasonKey, ArtisticSeasonConfig> = {
  verano: {
    id: 'verano',
    label: 'Verano en Viñedo',
    subtitle: 'Junio — Agosto · Nuestra Fecha',
    temp: '26°C Atardecer · 18°C Noche',
    etiquette: 'Formal Jardín & Viñedo (Botanical Black Tie Optional)',
    atmosphere:
      'La luz dorada del sol cayendo entre los olivos centenarios y una velada templada bajo guirnaldas de cristal.',
    womenTips: [
      'Vestidos largos vaporosos con movimiento en gasa de seda, crepé satinado o lino fino.',
      'Escotes asimétricos, espaldas drapeadas y estampados botánicos sutiles o tonos lisos luminosos.',
      'Tacón ancho, plataforma elegante o sandalia de bloque ideal para senderos de jardín y piedra.',
    ],
    menTips: [
      'Traje sastre en tonos verde salvia oscuro, arena tostada, azul acero o gris piedra.',
      'Tejidos transpirables como lino italiano, lana tropical o mezcla de seda.',
      'Camisa blanca o celeste muy tenue con mocasines de piel o ante.',
    ],
    swatches: [
      {
        name: 'Salvia Imperial',
        hex: '#6B7B65',
        stylingTip: 'Armoniza de forma sublime con el follaje de olivos y eucalipto del viñedo.',
      },
      {
        name: 'Terracota Suave',
        hex: '#C67D63',
        stylingTip: 'Aporta calidez mediterránea bajo la luz dorada de la hora mágica.',
      },
      {
        name: 'Lavanda Silvestre',
        hex: '#9E95B0',
        stylingTip: 'Un acento romántico y etéreo que destaca en fotografías al atardecer.',
      },
      {
        name: 'Azul Egeo',
        hex: '#4A6B82',
        stylingTip: 'Sobrio y distinguido tanto para trajes de caballero como vestidos de seda.',
      },
      {
        name: 'Oro Miel',
        hex: '#C9A96E',
        stylingTip: 'Luminoso y festivo sin acercarse al marfil nupcial.',
      },
    ],
    reservedNote:
      'El blanco puro, marfil, perla y crema claro están reservados exclusivamente para la novia.',
  },
  primavera: {
    id: 'primavera',
    label: 'Primavera en Orangerie',
    subtitle: 'Marzo — Mayo',
    temp: '23°C Día · 14°C Noche',
    etiquette: 'Etiqueta Romántica de Invernadero',
    atmosphere:
      'Jardines en plena floración con aromas de azahar y jazmín. Brisa suave al anochecer.',
    womenTips: [
      'Vestido largo o midi estructurado en tonos empolvados, verde agua, rosa viejo o malva.',
      'Incluir un chal de seda u organza para la recepción nocturna.',
      'Accesorios florales discretos o joyería en oro antiguo.',
    ],
    menTips: [
      'Traje formal en azul marino clásico, beige sastre o verde bosque.',
      'Corbata de seda tejida y pañuelo de bolsillo con detalle botánico.',
      'Zapato Derby u Oxford en piel marrón o coñac.',
    ],
    swatches: [
      {
        name: 'Rosa Antiguo',
        hex: '#D4A59A',
        stylingTip: 'Romántico y delicado, ideal para tejidos vaporosos como el chiffon.',
      },
      {
        name: 'Verde Agua',
        hex: '#89A89B',
        stylingTip: 'Fresco y luminoso, resalta maravillosamente en jardines botánicos.',
      },
      {
        name: 'Azul Bruma',
        hex: '#7C94A6',
        stylingTip: 'Sereno y atemporal para cualquier corte de vestido o corbata.',
      },
      {
        name: 'Malva Botánico',
        hex: '#A6889A',
        stylingTip: 'Sofisticado y original para destacar con elegancia.',
      },
      {
        name: 'Tabaco Suave',
        hex: '#8C6D53',
        stylingTip: 'Excelente alternativa para trajes sastre de día y tarde.',
      },
    ],
    reservedNote: 'Por favor evitar blanco, hueso y champagne nacarado.',
  },
  otono: {
    id: 'otono',
    label: 'Otoño en la Cava',
    subtitle: 'Septiembre — Noviembre',
    temp: '19°C Día · 11°C Noche',
    etiquette: 'Etiqueta Rigurosa de Cosecha (Autumn Gala)',
    atmosphere:
      'Hojas ocres en los viñedos, barricas de roble iluminadas con cientos de velas y atmósfera íntima.',
    womenTips: [
      'Vestidos de gala en terciopelo ligero, satén pesado o crepé en tonos joya y tierra.',
      'Mangas largas abullonadas, capas sutiles o estolas elegantes.',
      'Maquillaje en tonos cálidos bronce y labiales frutos rojos o terracota.',
    ],
    menTips: [
      'Smoking clásico o traje oscuro en gris marengo, azul medianoche o burdeos profundo.',
      'Chaleco opcional y calzado formal de piel negra o caoba.',
      'Texturas de lana merino fina.',
    ],
    swatches: [
      {
        name: 'Vino Merlot',
        hex: '#632632',
        stylingTip: 'El color emblema de la vendimia; profundo y sumamente fotogénico.',
      },
      {
        name: 'Verde Bosque',
        hex: '#2C4738',
        stylingTip: 'Elegancia absoluta bajo la luz de las velas en la cava.',
      },
      {
        name: 'Cobre Tostado',
        hex: '#A85D42',
        stylingTip: 'Captura la calidez del atardecer otoñal con gran carácter.',
      },
      {
        name: 'Ocre Imperial',
        hex: '#B5893D',
        stylingTip: 'Rico y luminoso, ideal en satén o seda estructurada.',
      },
      {
        name: 'Azul Noche',
        hex: '#213142',
        stylingTip: 'Clásico infalible para una noche de etiqueta rigurosa.',
      },
    ],
    reservedNote: 'Blanco, marfil y dorado claro reservados para la novia.',
  },
  invierno: {
    id: 'invierno',
    label: 'Invierno bajo Cristal',
    subtitle: 'Diciembre — Febrero',
    temp: '15°C Día · 7°C Noche',
    etiquette: 'Black Tie · Gala en Invernadero Climatizado',
    atmosphere:
      'Un invernadero de cristal cálido e iluminado por candelabros mientras afuera brilla el cielo invernal.',
    womenTips: [
      'Vestido largo de etiqueta en terciopelo, brocado, mikado o tafetán.',
      'Abrigo largo de paño o capa para el traslado (contaremos con guardarropa).',
      'Joyería brillante y tonos intensos.',
    ],
    menTips: [
      'Smoking negro o azul medianoche con pajarita de seda.',
      'Abrigo sastre para el exterior de la capilla.',
      'Zapatos Oxford negros de charol o piel lustrada.',
    ],
    swatches: [
      {
        name: 'Esmeralda Real',
        hex: '#1D4235',
        stylingTip: 'Majestuoso en terciopelo o seda pesada bajo candelabros.',
      },
      {
        name: 'Zafiro Oscuro',
        hex: '#1F304D',
        stylingTip: 'Sobriedad nocturna con destellos de alta costura.',
      },
      {
        name: 'Rojo Granate',
        hex: '#6E1D2A',
        stylingTip: 'Romántico e intenso para una velada de invierno.',
      },
      {
        name: 'Bronce Antiguo',
        hex: '#73583A',
        stylingTip: 'Cálido y distinguido frente a los tonos fríos de la estación.',
      },
      {
        name: 'Carbón Estelar',
        hex: '#29292B',
        stylingTip: 'Máxima formalidad para gala nocturna.',
      },
    ],
    reservedNote: 'El blanco nieve, marfil y plata muy claro quedan reservados para la novia.',
  },
};

const LOVE_STORY_CHAPTERS = [
  {
    number: 'Capítulo I',
    year: 'Octubre 2022',
    title: 'Una Tarde de Lluvia en Madrid',
    quote:
      'Buscando refugio de una tormenta inesperada, coincidimos en la misma librería antigua. Un libro recomendado y dos cafés bastaron para que el tiempo se detuviera.',
    image:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    location: 'Barrio de las Letras, Madrid',
  },
  {
    number: 'Capítulo II',
    year: 'Febrero 2024',
    title: 'Nuestro Primer Viaje al Fin del Mundo',
    quote:
      'Entre glaciares, montañas y rutas infinitas descubrimos que nuestro mejor destino siempre era caminar juntos sin importar el mapa.',
    image:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    location: 'Patagonia & Lagos del Sur',
  },
  {
    number: 'Capítulo III',
    year: 'Septiembre 2025',
    title: 'La Promesa Entre los Viñedos',
    quote:
      'Bajo un olivo centenario al caer el sol, con nuestra canción sonando bajito, Mateo hizo la pregunta que cambió nuestras vidas para siempre.',
    image:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80',
    location: 'Valle de Guadalupe, B.C.',
  },
];

export const ArtisticWeddingInvitation: React.FC = () => {
  // 1. Gatefold Vellum Envelope State
  const [doorsOpened, setDoorsOpened] = useState(false);
  const [doorsAnimating, setDoorsAnimating] = useState(false);

  // 2. Visual Atmosphere Mode (Day Botanical vs Starlit Night) & Audio
  const [nightMode, setNightMode] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // 3. Story Chapter Carousel State
  const [activeChapter, setActiveChapter] = useState(0);

  // 4. Countdown State (June 12, 2027 16:30)
  const [countdown, setCountdown] = useState({
    days: 234,
    hours: 18,
    minutes: 45,
    seconds: 30,
  });

  // 5. Seasonal Dress Code + Selected Swatch Harmony Tester
  const [season, setSeason] = useState<SeasonKey>('verano');
  const [activeSwatchIndex, setActiveSwatchIndex] = useState(0);

  // 6. Postcard RSVP State
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState<'si' | 'no'>('si');
  const [passes, setPasses] = useState('2');
  const [songWish, setSongWish] = useState('');
  const [messageText, setMessageText] = useState('');

  // 7. Final Sparkler / Candle Wish Counter in Gratitude Section
  const [wishesCount, setWishesCount] = useState(148);
  const [hasLitSparkler, setHasLitSparkler] = useState(false);

  useEffect(() => {
    const target = new Date('2027-06-12T16:30:00').getTime();
    const update = () => {
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
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenGatefold = () => {
    setDoorsAnimating(true);
    setTimeout(() => {
      setDoorsOpened(true);
      setDoorsAnimating(false);
      setMusicPlaying(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 850);
  };

  const currentSeasonData = ARTISTIC_SEASONS[season];
  const currentSwatch =
    currentSeasonData.swatches[activeSwatchIndex] || currentSeasonData.swatches[0];

  const buildWhatsAppRsvpUrl = () => {
    const statusLine =
      attending === 'si'
        ? `🌿 *SÍ ASISTIREMOS* (${passes} ${Number(passes) === 1 ? 'lugar' : 'lugares'})`
        : `🤍 *NO PODREMOS ACOMPAÑARLOS*, pero les enviamos todo nuestro amor`;

    const lines = [
      `¡Hola Camila & Mateo! ✨🌿`,
      `Les enviamos nuestra postal de confirmación para su boda en Viñedo Bruma:`,
      ``,
      `• *Invitado / Familia:* ${guestName.trim() || 'Familia Invitada'}`,
      `• *Confirmación:* ${statusLine}`,
      attending === 'si' && songWish.trim() ? `• *Canción sugerida:* ${songWish.trim()}` : '',
      selectedExperience ? `• *Detalle Luna de Miel:* ${selectedExperience}` : '',
      messageText.trim()
        ? `\n💌 *Dedicatoria Postal:*\n"${messageText.trim()}"`
        : `\n💌 *Dedicatoria:* ¡Que su vida juntos esté siempre llena de magia, salud y complicidad!`,
    ].filter(Boolean);

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  // ============================================================================
  // 1. INITIAL VELLUM GATEFOLD DOORS (SOBRE ARTÍSTICO DE PUERTAS TRANSLÚCIDAS)
  // ============================================================================
  if (!doorsOpened) {
    return (
      <div className="min-h-screen bg-[#EDE8DF] flex flex-col justify-between relative overflow-hidden select-none">
        {/* Background glimpsed behind the translucent vellum doors */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105 blur-[2px] opacity-35"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A3328]/50 via-[#F4F1EA]/70 to-[#2A3328]/60" />

        {/* Top Return Link */}
        <div className="relative z-30 flex items-center justify-between max-w-6xl w-full mx-auto pt-5 px-4 sm:px-8">
          <a
            href="/#catalogo"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-ivory-50/90 backdrop-blur-md border border-gold/40 text-[11px] uppercase tracking-[0.2em] text-charcoal hover:bg-charcoal hover:text-ivory-50 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-gold-dark" />
            <span>Volver al Catálogo</span>
          </a>
          <span className="px-3.5 py-1.5 bg-ivory-50/90 backdrop-blur-md border border-gold/40 text-[10px] uppercase tracking-[0.25em] text-sage-dark font-semibold">
            Edición Artística · Orangerie Botánica
          </span>
        </div>

        {/* Center French Vellum Gatefold Doors */}
        <div className="relative z-20 my-auto max-w-2xl w-full mx-auto px-4 py-6">
          <div className="relative min-h-[520px] sm:min-h-[560px] flex overflow-hidden arch-portrait border-2 border-gold/60 shadow-editorial-lg">
            {/* LEFT VELLUM DOOR */}
            <div
              className={`w-1/2 bg-[#FAF8F3]/90 backdrop-blur-md border-r border-gold/40 p-6 sm:p-10 flex flex-col justify-between items-end text-right transition-all duration-1000 ease-in-out ${
                doorsAnimating ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="w-full text-left">
                <Feather className="w-5 h-5 text-sage opacity-70" />
              </div>
              <div className="my-auto pr-4 sm:pr-8 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-sage-dark block">
                  12 · Junio
                </span>
                <p className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">Camila</p>
                <p className="text-[11px] font-serif italic text-charcoal-muted">
                  Viñedo Bruma
                </p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold-dark">
                Pase de Honor
              </div>
            </div>

            {/* RIGHT VELLUM DOOR */}
            <div
              className={`w-1/2 bg-[#FAF8F3]/90 backdrop-blur-md border-l border-gold/40 p-6 sm:p-10 flex flex-col justify-between items-start text-left transition-all duration-1000 ease-in-out ${
                doorsAnimating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
              }`}
            >
              <div className="w-full flex justify-end">
                <Sparkles className="w-5 h-5 text-gold-dark opacity-70" />
              </div>
              <div className="my-auto pl-4 sm:pl-8 space-y-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-sage-dark block">
                  Año 2027
                </span>
                <p className="font-serif text-3xl sm:text-5xl text-charcoal font-normal">Mateo</p>
                <p className="text-[11px] font-serif italic text-charcoal-muted">
                  Valle de Guadalupe
                </p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-gold-dark">
                Invernadero Real
              </div>
            </div>

            {/* CENTER BOTANICAL EMERALD & GOLD WAX SEAL OVERLAY */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none transition-all duration-700 ${
                doorsAnimating ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
              }`}
            >
              {/* Decorative SVG Botanical Wreath Around the Seal */}
              <div className="relative flex items-center justify-center">
                <svg
                  className="w-48 h-48 sm:w-56 sm:h-56 text-gold/60 animate-spin-vinyl"
                  style={{ animationDuration: '28s' }}
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="86"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                  <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="0.75" />
                </svg>

                <button
                  type="button"
                  onClick={handleOpenGatefold}
                  className="pointer-events-auto absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#5B6E56] via-[#43543E] to-[#2B3728] text-ivory-50 shadow-editorial-lg border-4 border-[#D4BC91] flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
                  aria-label="Abrir puertas de papel vegetal de la invitación"
                >
                  <div className="absolute inset-1.5 rounded-full border border-[#D4BC91]/40 pointer-events-none" />
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4BC91]">
                    Orangerie
                  </span>
                  <span className="font-serif text-3xl sm:text-4xl tracking-widest text-ivory-50 my-0.5">
                    C&amp;M
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-ivory-200 flex items-center gap-1 group-hover:text-[#D4BC91]">
                    <Sparkles className="w-2.5 h-2.5" />
                    Abrir Sobre
                  </span>
                </button>
              </div>

              <div className="mt-4 px-5 py-2 bg-charcoal/90 backdrop-blur-md text-ivory-50 rounded-full border border-gold/40 shadow-md pointer-events-auto">
                <button
                  type="button"
                  onClick={handleOpenGatefold}
                  className="text-[11px] uppercase tracking-[0.22em] flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                  <span>Toca el lacre botánico para abrir las puertas</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Caption */}
        <div className="relative z-30 text-center pb-5 text-xs font-serif italic text-ivory-50 drop-shadow">
          «Dos raíces que crecieron juntas para florecer toda la vida»
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. OPENED ARTISTIC LANDING PAGE (WITH DAY/NIGHT ATMOSPHERE & FLOATING PETALS)
  // ============================================================================
  return (
    <div
      className={`min-h-screen transition-colors duration-700 relative overflow-x-hidden ${
        nightMode ? 'bg-[#19201A] text-[#F4F1EA]' : 'bg-[#F6F5F0] text-[#222620]'
      }`}
    >
      {/* FLOATING GOLDEN LIGHT DUST / PETALS OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {[
          { left: '8%', delay: '0s', duration: '14s', size: 'w-2.5 h-2.5' },
          { left: '22%', delay: '3s', duration: '18s', size: 'w-3 h-2' },
          { left: '38%', delay: '1.5s', duration: '16s', size: 'w-2 h-2' },
          { left: '57%', delay: '4s', duration: '15s', size: 'w-3 h-2.5' },
          { left: '74%', delay: '2s', duration: '19s', size: 'w-2.5 h-2.5' },
          { left: '89%', delay: '5s', duration: '13s', size: 'w-2 h-2' },
        ].map((petal, idx) => (
          <div
            key={idx}
            className={`absolute -top-6 rounded-full animate-petal ${petal.size} ${
              nightMode ? 'bg-gold-light/40 shadow-gold' : 'bg-gold/35'
            }`}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
            }}
          />
        ))}
      </div>

      {/* FLOATING TOP BAR: Return, Re-close Gatefold, Day/Night Switcher & Vinyl Audio */}
      <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 pointer-events-auto">
            <a
              href="/#catalogo"
              className="px-3.5 py-2 rounded-full bg-ivory-50/90 backdrop-blur-md border border-gold/40 text-charcoal text-[11px] uppercase tracking-[0.16em] hover:bg-charcoal hover:text-ivory-50 transition flex items-center gap-1.5 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Catálogo</span>
            </a>

            <button
              type="button"
              onClick={() => setDoorsOpened(false)}
              className="px-3.5 py-2 rounded-full bg-ivory-50/90 backdrop-blur-md border border-gold/40 text-charcoal text-[11px] uppercase tracking-[0.16em] hover:border-gold transition flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sage-dark" />
              <span>Ver Sobre</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* Day / Starlit Night Atmosphere Toggle */}
            <button
              type="button"
              onClick={() => setNightMode(!nightMode)}
              className={`px-3.5 py-2 rounded-full border text-[11px] uppercase tracking-[0.16em] transition flex items-center gap-1.5 shadow-sm ${
                nightMode
                  ? 'bg-gold text-charcoal border-gold-light font-semibold'
                  : 'bg-ivory-50/90 text-charcoal border-gold/40 hover:bg-champagne'
              }`}
              title="Cambiar iluminación entre Día en el Jardín y Velada Nocturna"
            >
              {nightMode ? (
                <>
                  <Sun className="w-3.5 h-3.5" />
                  <span>Luz de Día</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sage-dark" />
                  <span>Modo Velada</span>
                </>
              )}
            </button>

            {/* Spinning Vinyl Music Button */}
            <button
              type="button"
              onClick={() => setMusicPlaying(!musicPlaying)}
              className="px-4 py-2 rounded-full bg-[#2B3728] text-ivory-50 border border-gold/50 shadow-editorial flex items-center gap-2 text-xs hover:bg-gold-dark transition"
            >
              <Disc3
                className={`w-4 h-4 text-gold-light ${musicPlaying ? 'animate-spin-vinyl' : ''}`}
              />
              <span className="text-[11px] tracking-wider hidden md:inline">
                {musicPlaying ? 'Clair de Lune (Piano)' : 'Música en Pausa'}
              </span>
              {musicPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-gold-light" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================
          SECCIÓN 1: PORTADA EN ARCO RENACENTISTA CON NOMBRES + FOTO + TOCADISCOS
      ======================================================================== */}
      <section className="relative min-h-screen pt-24 pb-16 px-4 sm:px-8 flex items-center border-b border-gold/25">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Poetic Typography & Couple Names */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-[11px] uppercase tracking-[0.28em] text-gold-dark">
              <Feather className="w-3.5 h-3.5" />
              <span>Celebración en el Invernadero · 12.06.2027</span>
            </div>

            <div className="space-y-2">
              <p className="font-serif italic text-2xl sm:text-3xl text-gold-dark">
                Bajo el cielo de junio, unimos nuestras vidas
              </p>
              <h1 className="font-serif text-6xl sm:text-7xl lg:text-[84px] leading-[0.98] font-normal tracking-tight">
                Camila
                <span className="block font-serif italic text-4xl sm:text-5xl text-gold my-1">
                  &amp;
                </span>
                Mateo
              </h1>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 ${
                nightMode ? 'text-ivory-200/80' : 'text-charcoal-muted'
              }`}
            >
              Con la alegría de nuestras familias, les invitamos a compartir una tarde de vino,
              música de cuerdas y celebración eterna entre los olivos centenarios de{' '}
              <strong>Viñedo Bruma, Valle de Guadalupe</strong>.
            </p>

            {/* Interactive Vinyl Record Mini Widget */}
            <div
              className={`inline-flex items-center gap-4 p-3.5 pr-6 rounded-full border border-gold/35 ${
                nightMode ? 'bg-ivory-50/5' : 'bg-ivory-50 shadow-sm'
              }`}
            >
              <button
                type="button"
                onClick={() => setMusicPlaying(!musicPlaying)}
                className={`w-12 h-12 rounded-full bg-charcoal border-2 border-gold flex items-center justify-center text-gold-light shrink-0 ${
                  musicPlaying ? 'animate-spin-vinyl' : ''
                }`}
                aria-label="Reproducir o pausar vinilo nupcial"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-gold border border-ivory-50" />
              </button>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-[0.22em] text-gold-dark font-semibold block">
                  Banda Sonora de Nuestra Boda
                </span>
                <p className="font-serif text-lg leading-tight">
                  Clair de Lune · Claude Debussy (Acústico)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Double Renaissance Arch Portrait Frame */}
          <div className="lg:col-span-6 relative flex justify-center">
            {/* Decorative Halo Behind Arch */}
            <div className="absolute -inset-4 rounded-full bg-gold/15 blur-2xl animate-shimmer-glow pointer-events-none" />

            <div
              className={`relative w-full max-w-[440px] p-3.5 sm:p-5 arch-portrait border-2 border-gold/55 shadow-editorial-lg ${
                nightMode ? 'bg-[#232D24]' : 'bg-ivory-50'
              }`}
            >
              <div className="relative h-[470px] sm:h-[530px] overflow-hidden arch-portrait border border-gold/30">
                <img
                  src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=85"
                  alt="Camila y Mateo en el jardín botánico"
                  className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />

                {/* Floating Botanical Crest at Bottom of Arch */}
                <div className="absolute bottom-5 inset-x-5 text-center text-ivory-50">
                  <span className="text-[10px] uppercase tracking-[0.32em] text-gold-light block">
                    Sábado 12 de Junio, 2027
                  </span>
                  <p className="font-serif italic text-2xl mt-0.5">
                    Capilla &amp; Orangerie del Viñedo Bruma
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 2: FRASE CARACTERÍSTICA + GALERÍA DE POLAROIDS (NUESTRA HISTORIA)
      ======================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 border-b border-gold/25">
        <div className="max-w-5xl mx-auto space-y-20">
          {/* Characteristic Quote with Botanical SVG Ornament */}
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <svg
              className="w-28 h-8 mx-auto text-gold"
              viewBox="0 0 120 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 16C35 16 45 4 60 4C75 4 85 16 110 16"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <circle cx="60" cy="16" r="4" fill="currentColor" />
              <circle cx="35" cy="16" r="2" fill="currentColor" />
              <circle cx="85" cy="16" r="2" fill="currentColor" />
            </svg>

            <blockquote className="font-serif italic text-3xl sm:text-5xl leading-[1.2]">
              «Dos raíces que crecieron juntas para florecer toda la vida; porque el amor más
              bello no es el que busca la perfección, sino el que encuentra paz en el abrazo del
              otro.»
            </blockquote>

            <p className="text-xs uppercase tracking-[0.3em] text-gold-dark font-semibold">
              — Nuestra Promesa · Camila &amp; Mateo
            </p>
          </div>

          {/* Interactive Polaroid Love Story Chapters */}
          <div
            className={`p-7 sm:p-12 border border-gold/35 shadow-editorial ${
              nightMode ? 'bg-[#212A22]' : 'bg-ivory-50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-gold/20 pb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold-dark font-semibold block">
                  Bitácora Sentimental
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl mt-1">
                  Los Capítulos de Nuestra Historia
                </h2>
              </div>

              {/* Chapter Selector Pills */}
              <div className="flex flex-wrap gap-2">
                {LOVE_STORY_CHAPTERS.map((chap, index) => (
                  <button
                    key={chap.number}
                    type="button"
                    onClick={() => setActiveChapter(index)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.16em] transition ${
                      activeChapter === index
                        ? 'bg-gold text-ivory-50 font-semibold shadow-sm'
                        : 'border border-gold/35 hover:border-gold'
                    }`}
                  >
                    {chap.number}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Artistic Tilted Polaroid Frame */}
              <div className="md:col-span-5 flex justify-center">
                <div className="bg-[#FDFCF9] text-charcoal p-4 pb-6 shadow-editorial-lg border border-ivory-300 -rotate-2 hover:rotate-0 transition-transform duration-500 max-w-xs w-full">
                  <div className="h-64 overflow-hidden mb-4">
                    <img
                      src={LOVE_STORY_CHAPTERS[activeChapter].image}
                      alt={LOVE_STORY_CHAPTERS[activeChapter].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-serif italic text-xl text-center text-charcoal">
                    {LOVE_STORY_CHAPTERS[activeChapter].location}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-center text-gold-dark mt-0.5">
                    {LOVE_STORY_CHAPTERS[activeChapter].year}
                  </p>
                </div>
              </div>

              {/* Chapter Narrative */}
              <div className="md:col-span-7 space-y-4">
                <span className="inline-block px-3 py-1 bg-gold/15 text-gold-dark text-xs uppercase tracking-[0.2em] font-medium">
                  {LOVE_STORY_CHAPTERS[activeChapter].number} ·{' '}
                  {LOVE_STORY_CHAPTERS[activeChapter].year}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl">
                  {LOVE_STORY_CHAPTERS[activeChapter].title}
                </h3>
                <p
                  className={`font-serif italic text-xl sm:text-2xl leading-relaxed ${
                    nightMode ? 'text-ivory-200/85' : 'text-charcoal-light'
                  }`}
                >
                  «{LOVE_STORY_CHAPTERS[activeChapter].quote}»
                </p>
                <div className="pt-3 flex items-center gap-2 text-xs uppercase tracking-widest text-gold-dark">
                  <Compass className="w-4 h-4" />
                  <span>Coordenadas del recuerdo: {LOVE_STORY_CHAPTERS[activeChapter].location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 3: RELOJ ASTRONÓMICO (TIMER CON ANILLOS SVG) + FECHA E ITINERARIO
      ======================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#232D24] text-ivory-50 border-b border-gold/30 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-14 relative z-10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-gold-light block">
              La Cuenta Regresiva ha Comenzado
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-ivory-50">
              Sábado, 12 de Junio de 2027
            </h2>
            <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-ivory-200/75">
              Ceremonia al Atardecer · 16:30 Horas · Valle de Guadalupe
            </p>
          </div>

          {/* Artistic Circular Medallion Countdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { val: countdown.days, label: 'Días', pct: 75 },
              { val: String(countdown.hours).padStart(2, '0'), label: 'Horas', pct: 60 },
              { val: String(countdown.minutes).padStart(2, '0'), label: 'Minutos', pct: 80 },
              { val: String(countdown.seconds).padStart(2, '0'), label: 'Segundos', pct: 90 },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="rgba(212, 188, 145, 0.2)"
                      strokeWidth="2"
                      fill="rgba(250, 247, 242, 0.03)"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      stroke="#D4BC91"
                      strokeWidth="2.5"
                      strokeDasharray="326"
                      strokeDashoffset={326 - (326 * item.pct) / 100}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-4xl sm:text-5xl text-gold-light leading-none">
                      {item.val}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-ivory-200/80 mt-2">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arch Cards for Ceremony & Reception */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 text-center">
            <div className="arch-card bg-ivory-50 text-charcoal p-8 sm:p-10 border-2 border-gold/45 shadow-editorial space-y-4">
              <div className="w-12 h-12 rounded-full bg-sage-light text-sage-dark flex items-center justify-center mx-auto">
                <Church className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-semibold block">
                16:30 Horas · Votos Matrimoniales
              </span>
              <h3 className="font-serif text-3xl text-charcoal">Capilla Abierta del Viñedo</h3>
              <p className="text-xs text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                Un anfiteatro orgánico rodeado de vid y piedra volcánica con vista al valle.
              </p>
              <a
                href="https://maps.google.com/?q=Valle+de+Guadalupe+Vinedo+Bruma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Mapa GPS de Ceremonia</span>
              </a>
            </div>

            <div className="arch-card bg-ivory-50 text-charcoal p-8 sm:p-10 border-2 border-gold/45 shadow-editorial space-y-4">
              <div className="w-12 h-12 rounded-full bg-champagne text-gold-dark flex items-center justify-center mx-auto">
                <GlassWater className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-semibold block">
                18:00 Horas · Cóctel &amp; Banquete
              </span>
              <h3 className="font-serif text-3xl text-charcoal">
                Orangerie de Cristal &amp; Olivos
              </h3>
              <p className="text-xs text-charcoal-muted max-w-xs mx-auto leading-relaxed">
                Brindis con vino de la casa en la cava subterránea seguido de banquete bajo cristal.
              </p>
              <a
                href="https://maps.google.com/?q=Valle+de+Guadalupe+Vinedo+Bruma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Mapa GPS de Recepción</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 4: CÓDIGO DE VESTIMENTA (UNIFICADO) + PROBADOR DE ARMONÍA DE COLOR
      ======================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 border-b border-gold/25">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-[0.28em] text-gold-dark font-semibold block">
              Estilismo &amp; Protocolo · Viñedo &amp; Orangerie
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal">
              Código de Vestimenta
            </h2>
            <p
              className={`text-sm sm:text-base ${
                nightMode ? 'text-ivory-200/80' : 'text-charcoal-muted'
              }`}
            >
              Para que disfruten con plenitud de los viñedos y la cena en el invernadero de cristal,
              les compartimos nuestras recomendaciones de etiqueta y armonía cromática:
            </p>
          </div>

          {/* Interactive Moodboard Card */}
          <div
            className={`p-7 sm:p-11 border border-gold/40 shadow-editorial space-y-8 ${
              nightMode ? 'bg-[#212A22]' : 'bg-ivory-50'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold/20 pb-6">
              <div>
                <span className="text-xs uppercase tracking-[0.22em] text-gold-dark font-semibold">
                  {currentSeasonData.subtitle} · {currentSeasonData.temp}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl mt-1">
                  {currentSeasonData.etiquette}
                </h3>
              </div>
              <span className="px-4 py-1.5 bg-gold/15 border border-gold/35 text-xs uppercase tracking-widest text-gold-dark self-start md:self-center">
                {currentSeasonData.label}
              </span>
            </div>

            <p className="font-serif italic text-xl sm:text-2xl text-gold-dark">
              «{currentSeasonData.atmosphere}»
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className={`p-6 border border-gold/25 space-y-3 ${
                  nightMode ? 'bg-ivory-50/5' : 'bg-ivory-100'
                }`}
              >
                <h4 className="font-serif text-2xl flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>Para Damas</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm opacity-90">
                  {currentSeasonData.womenTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`p-6 border border-gold/25 space-y-3 ${
                  nightMode ? 'bg-ivory-50/5' : 'bg-ivory-100'
                }`}
              >
                <h4 className="font-serif text-2xl flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-gold" />
                  <span>Para Caballeros</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm opacity-90">
                  {currentSeasonData.menTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Color Harmony Tester */}
            <div className="p-6 border border-gold/30 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-[0.2em] font-semibold">
                  Probador Interactivo de Armonía Cromática (Toca un tono):
                </span>
                <span className="text-xs text-gold-dark">{currentSeasonData.reservedNote}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {currentSeasonData.swatches.map((sw, idx) => (
                  <button
                    key={sw.name}
                    type="button"
                    onClick={() => setActiveSwatchIndex(idx)}
                    className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition ${
                      activeSwatchIndex === idx
                        ? 'border-gold bg-charcoal text-ivory-50 scale-105 shadow-sm'
                        : 'border-gold/30 hover:border-gold'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-white/40"
                      style={{ backgroundColor: sw.hex }}
                    />
                    <span className="text-xs">{sw.name}</span>
                  </button>
                ))}
              </div>

              {/* Selected Swatch Live Tip */}
              <div className="flex items-center gap-4 pt-2">
                <div
                  className="w-12 h-12 rounded-full border-2 border-gold shrink-0 shadow-md"
                  style={{ backgroundColor: currentSwatch.hex }}
                />
                <div>
                  <p className="font-serif text-xl font-medium">
                    Tono seleccionado: {currentSwatch.name}
                  </p>
                  <p className="text-xs sm:text-sm opacity-85">{currentSwatch.stylingTip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          SECCIÓN 5: CONFIRMACIÓN POR WHATSAPP CON TARJETA POSTAL EN VIVO
      ======================================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 border-b border-gold/25">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs uppercase tracking-[0.28em] text-gold-dark font-semibold block">
              Postal de Confirmación · R.S.V.P.
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal">
              Confirma tu Asistencia y Escríbenos una Postal
            </h2>
            <p
              className={`text-sm ${
                nightMode ? 'text-ivory-200/80' : 'text-charcoal-muted'
              }`}
            >
              Mientras escribes tus datos y tu mensaje, observa cómo se diseña tu tarjeta postal en
              tiempo real antes de enviarla a nuestro WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(buildWhatsAppRsvpUrl(), '_blank', 'noopener,noreferrer');
              }}
              className={`lg:col-span-6 p-7 sm:p-9 border border-gold/40 shadow-editorial space-y-4 ${
                nightMode ? 'bg-[#212A22]' : 'bg-ivory-50'
              }`}
            >
              <div>
                <label className="block text-xs uppercase tracking-wider mb-1.5">
                  Tu Nombre o Familia *
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ej. Familia Santamaría / Valeria Gómez"
                  className="w-full px-4 py-3 bg-ivory-100 text-charcoal border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('si')}
                  className={`py-3 px-4 border text-xs uppercase tracking-wider font-medium transition ${
                    attending === 'si'
                      ? 'bg-[#2B3728] text-ivory-50 border-gold'
                      : 'bg-ivory-100 text-charcoal border-ivory-300'
                  }`}
                >
                  ✓ Sí Asistiremos
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-3 px-4 border text-xs uppercase tracking-wider font-medium transition ${
                    attending === 'no'
                      ? 'bg-[#2B3728] text-ivory-50 border-gold'
                      : 'bg-ivory-100 text-charcoal border-ivory-300'
                  }`}
                >
                  🤍 No Podremos Ir
                </button>
              </div>

              {attending === 'si' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5">
                      Lugares a confirmar
                    </label>
                    <select
                      value={passes}
                      onChange={(e) => setPasses(e.target.value)}
                      className="w-full px-3.5 py-3 bg-ivory-100 text-charcoal border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                    >
                      <option value="1">1 Lugar</option>
                      <option value="2">2 Lugares</option>
                      <option value="3">3 Lugares</option>
                      <option value="4">4 Lugares</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider mb-1.5">
                      Canción sugerida
                    </label>
                    <input
                      type="text"
                      value={songWish}
                      onChange={(e) => setSongWish(e.target.value)}
                      placeholder="Para bailar en la fiesta..."
                      className="w-full px-3.5 py-3 bg-ivory-100 text-charcoal border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider mb-1.5">
                  Tu Mensaje para Camila &amp; Mateo *
                </label>
                <textarea
                  rows={3}
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Escribe tus mejores deseos para nuestra nueva vida juntos..."
                  className="w-full px-4 py-3 bg-ivory-100 text-charcoal border border-ivory-300 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2B3728] hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.2em] font-medium transition flex items-center justify-center gap-2 shadow-md"
              >
                <FaWhatsapp className="w-5 h-5 text-[#A7D7B8]" />
                <span>Enviar Postal de Confirmación por WhatsApp</span>
              </button>
            </form>

            {/* Right Column: Live Artistic Botanical Postcard Preview */}
            <div className="lg:col-span-6 flex items-center">
              <div className="w-full bg-[#FBF9F4] text-charcoal border-2 border-gold/50 p-6 sm:p-9 shadow-editorial-lg relative overflow-hidden">
                {/* Vintage Postcard Stamp & Postmark */}
                <div className="flex items-start justify-between border-b border-gold/30 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.28em] text-sage-dark font-semibold block">
                      Tarjeta Postal Nupcial
                    </span>
                    <h4 className="font-serif text-2xl text-charcoal">
                      Para: Camila &amp; Mateo
                    </h4>
                    <p className="text-[11px] text-charcoal-muted">
                      Viñedo Bruma · Valle de Guadalupe · 12.06.2027
                    </p>
                  </div>

                  {/* Artistic Postage Stamp */}
                  <div className="w-16 h-20 border-2 border-dashed border-gold/60 bg-champagne/60 p-1.5 flex flex-col items-center justify-between text-center shrink-0">
                    <span className="text-[8px] uppercase tracking-widest text-gold-dark">
                      Correo Real
                    </span>
                    <Feather className="w-5 h-5 text-sage-dark" />
                    <span className="font-serif text-xs font-semibold text-charcoal">2027</span>
                  </div>
                </div>

                {/* Live Handwritten-Style Message Body */}
                <div className="min-h-[150px] flex flex-col justify-between space-y-4">
                  <p className="font-serif italic text-2xl text-charcoal leading-relaxed">
                    «
                    {messageText.trim() ||
                      'Queridos Camila y Mateo: Qué emoción acompañarlos a celebrar su amor entre los viñedos. ¡Les deseamos toda la felicidad del mundo!'}
                    »
                  </p>

                  <div className="pt-4 border-t border-gold/25 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-charcoal-muted block">
                        Remitente:
                      </span>
                      <strong className="font-serif text-xl text-charcoal">
                        {guestName.trim() || 'Familia Invitada'}
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-sage-light text-sage-dark text-[10px] uppercase tracking-widest font-semibold">
                        {attending === 'si'
                          ? `Confirmado · ${passes} ${Number(passes) === 1 ? 'Pase' : 'Pases'}`
                          : 'Acompañando a distancia'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE REGALOS ELIMINADA POR SOLICITUD */}

      {/* ========================================================================
          SECCIÓN 7: AGRADECIMIENTOS Y RITUAL INTERACTIVO DE LUZ (BENGALITA)
      ======================================================================== */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 bg-[#1B221C] text-ivory-50 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-9 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/50 bg-gold/10 text-gold-light font-serif text-2xl">
            C&amp;M
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.32em] text-gold-light block">
              Agradecimientos · Con Amor Eterno
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
              Gracias por iluminar nuestro camino
            </h2>
          </div>

          <p className="text-sm sm:text-base text-ivory-200/80 leading-relaxed font-light max-w-2xl mx-auto">
            A nuestros padres por enseñarnos a amar con libertad; a nuestros hermanos y amigos por
            ser cómplices de cada aventura; y a cada uno de ustedes por viajar para abrazarnos en
            este día tan soñado.
          </p>

          {/* Interactive "Light a Sparkler / Send a Wish of Light" Ritual */}
          <div className="p-8 bg-ivory-50/5 border border-gold/35 max-w-xl mx-auto space-y-5">
            <Flame
              className={`w-8 h-8 mx-auto transition-transform duration-500 ${
                hasLitSparkler ? 'text-gold-light scale-125 animate-bounce' : 'text-gold/70'
              }`}
            />
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50">
              Ritual de Luz para los Novios
            </h3>
            <p className="text-xs text-ivory-200/75">
              Toca el botón para encender una bengala virtual de buenos deseos por el matrimonio de
              Camila &amp; Mateo:
            </p>

            <button
              type="button"
              onClick={() => {
                if (!hasLitSparkler) {
                  setWishesCount((c) => c + 1);
                  setHasLitSparkler(true);
                }
              }}
              className={`px-7 py-3.5 text-xs uppercase tracking-[0.22em] font-medium transition inline-flex items-center gap-2 ${
                hasLitSparkler
                  ? 'bg-gold text-charcoal shadow-gold'
                  : 'bg-ivory-50 text-charcoal hover:bg-gold-light'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {hasLitSparkler
                  ? '¡Has Encendido una Luz por los Novios!'
                  : 'Encender una Luz de Buenos Deseos'}
              </span>
            </button>

            <p className="text-xs uppercase tracking-[0.2em] text-gold-light pt-1">
              ✨ {wishesCount} luces encendidas por familiares y amigos ✨
            </p>
          </div>

          <div className="pt-6 space-y-2">
            <p className="font-serif italic text-3xl text-gold-light">
              Con todo nuestro cariño, Camila &amp; Mateo
            </p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-ivory-200/50">
              12 · Junio · 2027 · Valle de Guadalupe
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
