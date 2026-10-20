import type {
  InvitationTemplate,
  PricingPlan,
  InteractiveFeature,
  ProcessStep,
  Testimonial,
  FaqItem,
} from '../types/wedding';

export const WHATSAPP_NUMBER = '5215512345678'; // Configurable por el estudio
export const BRAND_NAME = "L'Atelier Nupcial";

export const INVITATION_TEMPLATES: InvitationTemplate[] = [
  {
    id: 'invitacion-completa',
    slug: 'invitacion-completa',
    name: 'Sobre Real & Lacre Dorado',
    collection: 'Colección Alta Costura',
    category: 'Editorial Clásico',
    price: 129,
    originalPrice: 169,
    badge: 'Lacre Dorado & Cuerdas',
    isPopular: true,
    shortDescription:
      'Sobre animado con sello de lacre dorado V&S, cuenta regresiva, dress code por estación, confirmación por WhatsApp y agradecimientos.',
    description:
      'Experiencia inmersiva que inicia con la apertura del sobre con sello de lacre en relieve, música clásica de fondo, timer en vivo y mapa interactivo.',
    coupleDemo: {
      bride: 'Valentina',
      groom: 'Sebastián',
      initials: 'V & S',
      date: '2027-04-24T17:00:00',
      displayDate: 'Sábado, 24 de Abril de 2027',
      city: 'San Miguel de Allende, Gto.',
      ceremonyVenue: 'Parroquia de San Miguel Arcángel',
      ceremonyTime: '17:00 hrs',
      receptionVenue: 'Hacienda San José Lavista',
      receptionTime: '19:30 hrs',
      dressCode: 'Riguroso Etiqueta · Damas de Largo',
      quote: '«En medio de todo el ruido del mundo, tu voz siempre fue mi hogar.»',
      songTitle: 'Mia & Sebastian’s Theme (Strings)',
      songArtist: 'Ensamble Clásico de Cuerdas',
    },
    palette: {
      name: 'Marfil & Oro Antiguo',
      bgHex: '#FAF7F2',
      cardHex: '#F3ECE2',
      accentHex: '#B5945B',
      textHex: '#221F1D',
      secondaryHex: '#6E675F',
    },
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
    includedFeatures: [
      'Apertura animada de sobre con lacre dorado',
      'Música de fondo con reproductor flotante',
      'Timer con cuenta regresiva en vivo',
      'Dress Code estacional interactivo',
      'Confirmación directa a WhatsApp con dedicatoria',
    ],
    itinerary: [
      {
        time: '17:00 hrs',
        title: 'Ceremonia Religiosa',
        location: 'Parroquia de San Miguel Arcángel',
        iconType: 'ceremony',
      },
      {
        time: '19:30 hrs',
        title: 'Recepción & Banquete',
        location: 'Hacienda San José Lavista',
        iconType: 'dinner',
      },
    ],
  },
  {
    id: 'invitacion-artistica',
    slug: 'invitacion-artistica',
    name: 'Orangerie Botánica & Luz Estelar',
    collection: 'Colección Botánica de Autor',
    category: 'Botánico & Salvia',
    price: 139,
    originalPrice: 179,
    badge: 'Puertas Translúcidas & Luz de Luna',
    isPopular: true,
    shortDescription:
      'Puertas dobles de papel vegetal translúcido, lluvia de pétalos dorados, interruptor Día/Noche, tocadiscos de vinilo y postal RSVP en vivo.',
    description:
      'Un diseño artístico inspirado en invernaderos botánicos franceses con marco en arco renacentista, bitácora de polaroids y ritual de bengalas virtuales.',
    coupleDemo: {
      bride: 'Camila',
      groom: 'Mateo',
      initials: 'C & M',
      date: '2027-06-12T16:30:00',
      displayDate: 'Sábado, 12 de Junio de 2027',
      city: 'Valle de Guadalupe, B.C.',
      ceremonyVenue: 'Capilla Abierta del Viñedo Bruma',
      ceremonyTime: '16:30 hrs',
      receptionVenue: 'Orangerie de Cristal & Olivos',
      receptionTime: '18:00 hrs',
      dressCode: 'Formal Jardín & Viñedo',
      quote: '«Dos raíces que crecieron juntas para florecer toda la vida.»',
      songTitle: 'Clair de Lune',
      songArtist: 'Claude Debussy',
    },
    palette: {
      name: 'Verde Salvia & Lino',
      bgHex: '#F6F5F0',
      cardHex: '#EDE8DF',
      accentHex: '#6B7B65',
      textHex: '#222620',
      secondaryHex: '#596655',
    },
    coverImage:
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
    includedFeatures: [
      'Puertas dobles de papel vegetal translúcido',
      'Pétalos dorados flotantes y cambio Día/Noche',
      'Tocadiscos de vinilo animado',
      'Postal de confirmación en tiempo real',
      'Ritual de bengala y buenos deseos',
    ],
    itinerary: [
      {
        time: '16:30 hrs',
        title: 'Votos al Atardecer',
        location: 'Capilla Abierta del Viñedo',
        iconType: 'ceremony',
      },
      {
        time: '18:00 hrs',
        title: 'Cena en Invernadero de Cristal',
        location: 'Orangerie',
        iconType: 'dinner',
      },
    ],
  },
  {
    id: 'invitacion-papel-artesanal',
    slug: 'invitacion-papel-artesanal',
    name: 'Papel Algodón Cortado a Mano',
    collection: 'Colección Texturas Artesanales',
    category: 'Hacienda & Romántico',
    price: 135,
    originalPrice: 175,
    badge: 'Bordes Rasgados & Mesa de Regalos',
    isPopular: true,
    shortDescription:
      'Pliego con cinta de seda terracota, límites orgánicos rasgados (no cuadrados), un solo Dress Code y planilla conectada al backend de regalos.',
    description:
      'Límites y tarjetas de papel cortado a mano (Deckle Edge), sin cuenta bancaria, con lista de regalos interactiva administrable por los novios en backend.',
    coupleDemo: {
      bride: 'Lucía',
      groom: 'Rodrigo',
      initials: 'L & R',
      date: '2027-11-06T16:00:00',
      displayDate: 'Sábado, 06 de Noviembre de 2027',
      city: 'Mérida, Yucatán',
      ceremonyVenue: 'Capilla Colonial de la Hacienda',
      ceremonyTime: '16:00 hrs',
      receptionVenue: 'Jardín de los Flamboyanes',
      receptionTime: '17:30 hrs',
      dressCode: 'Formal de Hacienda',
      quote: '«Contigo cada camino se convierte en nuestra mejor historia.»',
      songTitle: 'Bésame Mucho (Guitarra)',
      songArtist: 'Ensamble de Cuerdas',
    },
    palette: {
      name: 'Arena Cálida & Terracota',
      bgHex: '#F4ECE1',
      cardHex: '#FCF9F2',
      accentHex: '#A86448',
      textHex: '#2C221E',
      secondaryHex: '#69564A',
    },
    coverImage:
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    includedFeatures: [
      'Bordes orgánicos de papel cortado a mano (Deckle Edge)',
      'Apertura con cinta de seda terracota',
      '1 solo Dress Code unificado',
      'Planilla de regalos conectada a backend /panel',
      'Sin cuenta bancaria visible',
    ],
    itinerary: [
      {
        time: '16:00 hrs',
        title: 'Ceremonia en Capilla Colonial',
        location: 'Hacienda Temozón',
        iconType: 'ceremony',
      },
      {
        time: '17:30 hrs',
        title: 'Banquete en los Flamboyanes',
        location: 'Terraza Principal',
        iconType: 'dinner',
      },
    ],
  },
  {
    id: 'invitacion-marfil-menta',
    slug: 'invitacion-marfil-menta',
    name: 'Lluvia de Corazones Menta & Marfil',
    collection: 'Colección Sensorial 2027',
    category: 'Minimalista Lujo',
    price: 145,
    originalPrice: 185,
    badge: 'Corazones Etéreos & 5 Paletas',
    isPopular: true,
    shortDescription:
      'Efecto de lluvia de corazones casi transparentes, tonos marfil menta, selector interactivo de 5 paletas de color y simulador celular/tablet.',
    description:
      'Una creación poética y luminosa con sutil lluvia de corazones etéreos, selector en tiempo real de 5 armonías de color y visualizador en marcos de móvil y tablet.',
    coupleDemo: {
      bride: 'Isabella',
      groom: 'Tomás',
      initials: 'I & T',
      date: '2027-09-18T17:00:00',
      displayDate: 'Sábado, 18 de Septiembre de 2027',
      city: 'San Cristóbal / Antigua',
      ceremonyVenue: 'Parroquia Santa María de las Rosas',
      ceremonyTime: '17:00 hrs',
      receptionVenue: 'Jardín de las Hortensias',
      receptionTime: '19:00 hrs',
      dressCode: 'Formal Elegante · Jardín de Gala',
      quote: '«En tus ojos encontré mi lugar favorito en el mundo.»',
      songTitle: 'River Flows In You',
      songArtist: 'Yiruma',
    },
    palette: {
      name: 'Marfil & Menta Pura',
      bgHex: '#F6F8F6',
      cardHex: '#FCFDFB',
      accentHex: '#68947F',
      textHex: '#1E2D25',
      secondaryHex: '#587063',
    },
    coverImage:
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=85',
    secondaryImage:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80',
    includedFeatures: [
      'Lluvia de corazones casi transparentes',
      'Selector interactivo de 5 paletas cromáticas',
      'Modo simulador Celular, Tablet y Pantalla Completa',
      'Dress code elegante unificado',
      'Botón directo a mesa de regalos',
    ],
    itinerary: [
      {
        time: '17:00 hrs',
        title: 'Ceremonia Religiosa',
        location: 'Parroquia Santa María',
        iconType: 'ceremony',
      },
      {
        time: '19:00 hrs',
        title: 'Recepción en las Hortensias',
        location: 'Jardín Principal',
        iconType: 'dinner',
      },
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan-esencial',
    name: 'Colección Esencial',
    tagline: 'Elegancia pura para anunciar vuestro gran día con estilo.',
    price: 89,
    originalPrice: 119,
    currency: 'USD',
    billingNote: 'Pago único · Envíos ilimitados',
    deliveryDays: 'Entrega en 48 horas hábiles',
    description:
      'Ideal para bodas íntimas o civiles que buscan una invitación web impecable con toda la información esencial y confirmación directa.',
    features: [
      { label: 'Elección de cualquier diseño de nuestro catálogo', included: true },
      { label: 'Portada personalizada con nombres, fecha y frase', included: true },
      { label: 'Cuenta regresiva en tiempo real', included: true },
      { label: 'Ubicación de ceremonia y recepción con Google Maps y Waze', included: true },
      { label: 'Itinerario de actividades y código de vestimenta', included: true },
      { label: 'Mesa de regalos y datos bancarios con copiado rápido', included: true },
      { label: 'Confirmación de asistencia (RSVP) directo a WhatsApp', included: true },
      { label: 'Música de fondo y apertura con sobre animado', included: false },
      { label: 'Pases personalizados con nombre de cada invitado', included: false },
      { label: 'Panel de control de invitados en tiempo real (Excel/Web)', included: false },
    ],
    ctaLabel: 'Elegir Plan Esencial',
  },
  {
    id: 'plan-atelier',
    name: 'Colección Atelier',
    tagline: 'La experiencia interactiva completa favorita de nuestras parejas.',
    price: 129,
    originalPrice: 169,
    currency: 'USD',
    billingNote: 'Pago único · Envíos ilimitados',
    badge: 'Más Elegido',
    highlighted: true,
    deliveryDays: 'Entrega en 48 a 72 horas hábiles',
    description:
      'Incluye apertura de sobre con sello de lacre, música romántica, galería fotográfica y gestión inteligente de confirmaciones.',
    features: [
      { label: 'Todo lo incluido en la Colección Esencial', included: true, highlight: true },
      { label: 'Sobre digital interactivo con sello de lacre e iniciales', included: true, highlight: true },
      { label: 'Música de fondo con vuestra canción especial', included: true },
      { label: 'Galería editorial hasta con 12 fotografías de preboda', included: true },
      { label: 'Personalización de paleta de colores y tipografías', included: true },
      { label: 'Formulario RSVP con alergias alimentarias y canción sugerida', included: true },
      { label: 'Panel en vivo de confirmados + recepción por WhatsApp', included: true, highlight: true },
      { label: 'Pases personalizados con nombre de cada invitado y cupos', included: true },
      { label: 'Guía de hoteles recomendados y transporte', included: true },
      { label: 'Dominio propio (.com) y códigos QR de acceso en recepción', included: false },
    ],
    ctaLabel: 'Reservar Colección Atelier',
  },
  {
    id: 'plan-haute-couture',
    name: 'Haute Couture Bespoke',
    tagline: 'Diseño a medida con control de acceso QR y conserjería digital.',
    price: 189,
    originalPrice: 249,
    currency: 'USD',
    billingNote: 'Pago único · Servicio VIP',
    badge: 'Todo Incluido VIP',
    deliveryDays: 'Prioridad VIP · Atención personalizada',
    description:
      'Para bodas destino o de gran formato que requieren pases con código QR para wedding planners, versión bilingüe y ajustes ilimitados.',
    features: [
      { label: 'Todo lo incluido en la Colección Atelier', included: true, highlight: true },
      { label: 'Generador de pases individuales con Código QR para entrada', included: true, highlight: true },
      { label: 'Versión bilingüe opcional (Español + Inglés / Francés)', included: true },
      { label: 'Programa de Wedding Weekend (Preboda, Boda y Tornaboda)', included: true },
      { label: 'Álbum digital QR para que los invitados suban sus fotos', included: true, highlight: true },
      { label: 'Ilustración de venue o monograma exclusivo a medida', included: true },
      { label: 'Cambios de horario o detalles sin costo hasta el día de la boda', included: true },
      { label: 'Vigencia extendida por 12 meses después del evento', included: true },
      { label: 'Soporte prioritario directo con diseñador asignado', included: true },
      { label: 'Dominio personalizado opcional (ej. valentinaysebastian.com)', included: true },
    ],
    ctaLabel: 'Solicitar Haute Couture',
  },
];

export const INTERACTIVE_FEATURES: InteractiveFeature[] = [
  {
    id: 'feat-rsvp',
    title: 'Confirmación RSVP Inteligente',
    subtitle: 'Control total de tu lista de invitados',
    description:
      'Tus invitados confirman asistencia en segundos indicando número de adultos, restricciones alimentarias y un mensaje de cariño. Recibe todo en WhatsApp y en tu tabla organizada.',
    iconName: 'CalendarCheck',
    badge: 'Imprescindible',
  },
  {
    id: 'feat-envelope',
    title: 'Apertura de Sobre & Lacre',
    subtitle: 'Emoción desde el primer segundo',
    description:
      'Al abrir el enlace, tus invitados descubren un sobre de textura artesanal con vuestras iniciales en lacre dorado que, al tocarse, revela la invitación e inicia la música.',
    iconName: 'Sparkles',
    badge: 'Experiencia Sensorial',
  },
  {
    id: 'feat-music',
    title: 'Banda Sonora Personalizada',
    subtitle: 'Vuestra canción en cada pantalla',
    description:
      'Integramos la melodía de vuestro primer baile o pieza instrumental favorita con un reproductor flotante sutil que acompaña la lectura de principio a fin.',
    iconName: 'Music',
  },
  {
    id: 'feat-maps',
    title: 'Ubicaciones GPS a Un Clic',
    subtitle: 'Google Maps & Waze integrados',
    description:
      'Nadie llegará tarde ni se perderá. Botones directos con coordenadas exactas de la ceremonia religiosa, el banquete y los hoteles sugeridos.',
    iconName: 'MapPin',
  },
  {
    id: 'feat-countdown',
    title: 'Cuenta Regresiva & Calendario',
    subtitle: 'Días, horas, minutos y segundos',
    description:
      'Un reloj editorial marca el tiempo restante para el «Sí, acepto» e incluye botón para agendar recordatorio automático en Apple Calendar y Google Calendar.',
    iconName: 'Clock',
  },
  {
    id: 'feat-gifts',
    title: 'Mesa de Regalos & Sobre Digital',
    subtitle: 'Discreto, elegante y práctico',
    description:
      'Vincula tus mesas de regalos (Amazon, Liverpool, El Corte Inglés, Palacio de Hierro) o comparte tu CLABE / IBAN bancario con botón de copiado instantáneo.',
    iconName: 'Gift',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Elige tu Diseño y Colección',
    duration: 'Día 1 · 5 minutos',
    description:
      'Explora nuestro catálogo interactivo, enamórate de una plantilla y selecciona el plan que mejor se adapte a vuestra celebración.',
    iconName: 'Palette',
  },
  {
    number: '02',
    title: 'Comparte vuestros Detalles',
    duration: 'Día 1 · Formulario guiado',
    description:
      'Te enviamos por WhatsApp una guía muy sencilla para que nos compartas nombres, fechas, ubicaciones, horarios, fotos y vuestra canción.',
    iconName: 'FileText',
  },
  {
    number: '03',
    title: 'Diseño Artesanal en el Atelier',
    duration: '24 a 48 horas',
    description:
      'Nuestros diseñadores maquetan tu invitación cuidando cada tipografía, encuadre fotográfico y color. Te enviamos el borrador en vivo para revisión.',
    iconName: 'Sparkles',
  },
  {
    number: '04',
    title: 'Lista para Deslumbrar y Compartir',
    duration: 'Envíos Ilimitados',
    description:
      'Con tu aprobación final, recibes tu enlace oficial con previsualización miniatura lista para enviar a todos tus invitados por WhatsApp.',
    iconName: 'Send',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    couple: 'Mariana & Diego',
    location: 'San Miguel de Allende, México',
    weddingDate: 'Octubre 2026',
    templateName: 'Villa Toscana',
    quote:
      '«Nuestros invitados no paraban de escribirnos para decirnos que era la invitación más hermosa que habían visto. El sobre animado con nuestras iniciales y la música hicieron llorar a nuestras mamás.»',
    guestCount: 240,
    avatarUrl:
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-2',
    couple: 'Carlota & Álvaro',
    location: 'Finca La Concepción, Marbella',
    weddingDate: 'Septiembre 2026',
    templateName: 'Jardín de Salvia',
    quote:
      '«Teníamos invitados viniendo de tres países distintos. La guía de hoteles, los mapas directos y el formulario de alergias alimentarias nos ahorraron semanas enteras de trabajo con la wedding planner.»',
    guestCount: 185,
    avatarUrl:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'test-3',
    couple: 'Regina & Patricio',
    location: 'Valle de Guadalupe, B.C.',
    weddingDate: 'Agosto 2026',
    templateName: 'Palazzo Champagne',
    quote:
      '«Buscábamos algo sumamente sobrio y editorial, lejos de las invitaciones digitales recargadas. El resultado superó todo: parecía una editorial de revista y los pases con nombre por familia fueron un éxito.»',
    guestCount: 310,
    avatarUrl:
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=300&q=80',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Experiencia & Funciones',
    question: '¿Cómo funcionan las invitaciones digitales interactivas?',
    answer:
      'Tus invitados reciben un enlace que abre una experiencia sensorial única: desde un sobre animado con sello de lacre, puertas botánicas o pliegos de seda, hasta su canción favorita sonando de fondo, mapa interactivo con un toque para Google Maps o Waze, e información detallada de la celebración, todo sin necesidad de descargar ninguna aplicación.',
  },
  {
    id: 'faq-2',
    category: 'Confirmación de Asistencia',
    question: '¿Cómo confirman su asistencia nuestros invitados?',
    answer:
      'Es directo y muy sencillo para cualquier persona: tus invitados tocan el botón de confirmación, seleccionan la cantidad de lugares o acompañantes que asistirán y te envían un mensaje personalizado directamente a tu WhatsApp con sus datos y dedicatoria. Sin registros difíciles ni plataformas complejas.',
  },
  {
    id: 'faq-3',
    category: 'Mesa de Regalos',
    question: '¿Cómo funciona la Lista de Regalos y el panel para los novios?',
    answer:
      'Incluye una elegante planilla interactiva donde tus invitados pueden descubrir sus regalos y experiencias soñadas. Los novios disponen de un panel privado para agregar, editar fotos, valores y cantidades de regalos a su gusto, manteniendo todo organizado y a su medida.',
  },
  {
    id: 'faq-4',
    category: 'Compatibilidad & Dispositivos',
    question: '¿Se verá bien en celulares, tablets y computadoras?',
    answer:
      'Totalmente. Cada diseño está optimizado para adaptarse con máxima nitidez y fluidez a cualquier dispositivo (iPhone, Android, iPad y computadoras). Además, modelos como Brisa Marfil & Menta incluyen un simulador en pantalla para visualizar cómo se ve en formato móvil y tablet.',
  },
  {
    id: 'faq-5',
    category: 'Valores & Moneda',
    question: '¿En qué moneda estarán disponibles y cómo es el pago?',
    answer:
      'Nuestras invitaciones estarán disponibles próximamente en Pesos Chilenos (CLP $). El servicio es de pago único, transparente y sin mensualidades ocultas.',
  },
  {
    id: 'faq-6',
    category: 'Envíos & Entrega',
    question: '¿A cuántos invitados puedo enviar la invitación? ¿Hay un límite?',
    answer:
      '¡Los envíos son 100% ilimitados! Una vez lista tu invitación, puedes compartir el enlace cuantas veces quieras por WhatsApp, correo electrónico, Instagram o mensaje directo con todos tus seres queridos sin ningún costo adicional.',
  },
];
