export type StyleCategory =
  | 'Todos'
  | 'Editorial Clásico'
  | 'Botánico & Salvia'
  | 'Minimalista Lujo'
  | 'Hacienda & Romántico';

export interface ItineraryEvent {
  time: string;
  title: string;
  location: string;
  iconType: 'ceremony' | 'cocktail' | 'dinner' | 'party';
}

export interface InvitationTemplate {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: Exclude<StyleCategory, 'Todos'>;
  price: number;
  originalPrice?: number;
  badge?: string;
  isPopular?: boolean;
  shortDescription: string;
  description: string;
  coupleDemo: {
    bride: string;
    groom: string;
    initials: string;
    date: string;
    displayDate: string;
    city: string;
    ceremonyVenue: string;
    ceremonyTime: string;
    receptionVenue: string;
    receptionTime: string;
    dressCode: string;
    quote: string;
    songTitle: string;
    songArtist: string;
  };
  palette: {
    name: string;
    bgHex: string;
    cardHex: string;
    accentHex: string;
    textHex: string;
    secondaryHex: string;
  };
  coverImage: string;
  secondaryImage: string;
  includedFeatures: string[];
  itinerary: ItineraryEvent[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  currency: string;
  billingNote: string;
  badge?: string;
  highlighted?: boolean;
  deliveryDays: string;
  description: string;
  features: {
    label: string;
    included: boolean;
    highlight?: boolean;
  }[];
  ctaLabel: string;
}

export interface InteractiveFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName:
    | 'Sparkles'
    | 'CalendarCheck'
    | 'Music'
    | 'MapPin'
    | 'Clock'
    | 'Gift'
    | 'Camera'
    | 'ShieldCheck';
  badge?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  description: string;
  iconName: 'Palette' | 'FileText' | 'Sparkles' | 'Send';
}

export interface Testimonial {
  id: string;
  couple: string;
  location: string;
  weddingDate: string;
  templateName: string;
  quote: string;
  guestCount: number;
  avatarUrl: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  linkText?: string;
  linkHref?: string;
}
