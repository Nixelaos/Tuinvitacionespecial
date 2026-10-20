import React, { useState, useEffect } from 'react';
import {
  Gift,
  Coffee,
  Wine,
  Bed,
  Utensils,
  Plane,
  Camera,
  Home,
  Tv,
  Palmtree,
  Sparkles,
  Heart,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowLeft,
  Server,
  Image as ImageIcon,
  ShoppingBag,
  SlidersHorizontal,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { WHATSAPP_NUMBER } from '../data/weddingData';

export type GiftIconName =
  | 'Coffee'
  | 'Wine'
  | 'Bed'
  | 'Utensils'
  | 'Plane'
  | 'Camera'
  | 'Home'
  | 'Tv'
  | 'Palmtree'
  | 'Sparkles'
  | 'Heart'
  | 'Gift';

export interface WeddingGiftItem {
  id: string;
  title: string;
  category: string;
  iconName: GiftIconName;
  price: number;
  quantity: number;
  reservedCount: number;
  imageUrl: string;
  description: string;
}

export const formatCLP = (amount: number) =>
  `$${Math.round(amount).toLocaleString('es-CL')}`;

export const INITIAL_GIFTS_FALLBACK: WeddingGiftItem[] = [
  {
    id: 'gift-1',
    title: 'Cafetera Espresso Barista Italiana',
    category: 'Hogar & Cocina',
    iconName: 'Coffee',
    price: 220000,
    quantity: 1,
    reservedCount: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    description:
      'Para comenzar cada mañana juntos con el aroma de nuestro café favorito recién molido.',
  },
  {
    id: 'gift-2',
    title: 'Cena Romántica Frente al Mar en Amalfi',
    category: 'Luna de Miel',
    iconName: 'Wine',
    price: 140000,
    quantity: 3,
    reservedCount: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    description: 'Un brindis al atardecer durante nuestra luna de miel recordando su cariño.',
  },
  {
    id: 'gift-3',
    title: 'Juego de Cama de Lino Orgánico Belga',
    category: 'Dormitorio & Relax',
    iconName: 'Bed',
    price: 180000,
    quantity: 2,
    reservedCount: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    description:
      'Texturas suaves y naturales en tono arena para vestir nuestra habitación principal.',
  },
  {
    id: 'gift-4',
    title: 'Vajilla Artesanal de Cerámica de Autor (12 Pzas)',
    category: 'Hogar & Cocina',
    iconName: 'Utensils',
    price: 150000,
    quantity: 2,
    reservedCount: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    description: 'Hecha a mano en torno, lista para recibir a nuestra familia y amigos en casa.',
  },
  {
    id: 'gift-5',
    title: 'Aporte para Boletos de Avión Luna de Miel',
    category: 'Luna de Miel',
    iconName: 'Plane',
    price: 280000,
    quantity: 4,
    reservedCount: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Ayúdanos a despegar hacia nuestra primera gran aventura como esposos.',
  },
  {
    id: 'gift-6',
    title: 'Cámara Instantánea Vintage para Recuerdos',
    category: 'Experiencias',
    iconName: 'Camera',
    price: 120000,
    quantity: 1,
    reservedCount: 0,
    imageUrl:
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    description: 'Para capturar en papel fotográfico cada viaje y aniversario de nuestra historia.',
  },
];

const ICON_OPTIONS: { name: GiftIconName; label: string }[] = [
  { name: 'Coffee', label: 'Café / Desayuno' },
  { name: 'Utensils', label: 'Cocina / Vajilla' },
  { name: 'Wine', label: 'Brindis / Cena' },
  { name: 'Bed', label: 'Dormitorio' },
  { name: 'Home', label: 'Hogar / Deco' },
  { name: 'Tv', label: 'Tecnología' },
  { name: 'Plane', label: 'Vuelos / Viaje' },
  { name: 'Palmtree', label: 'Playa / Relax' },
  { name: 'Camera', label: 'Fotografía' },
  { name: 'Sparkles', label: 'Experiencia VIP' },
  { name: 'Heart', label: 'Romántico' },
  { name: 'Gift', label: 'Regalo Especial' },
];

const CATEGORIES = [
  'Todos',
  'Hogar & Cocina',
  'Luna de Miel',
  'Dormitorio & Relax',
  'Experiencias',
];

import { BACKEND_URL } from '../config/api';
const STORAGE_KEY = 'atelier_wedding_gifts_v1';

export const renderGiftIcon = (iconName: GiftIconName, className = 'w-5 h-5') => {
  switch (iconName) {
    case 'Coffee':
      return <Coffee className={className} />;
    case 'Wine':
      return <Wine className={className} />;
    case 'Bed':
      return <Bed className={className} />;
    case 'Utensils':
      return <Utensils className={className} />;
    case 'Plane':
      return <Plane className={className} />;
    case 'Camera':
      return <Camera className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Tv':
      return <Tv className={className} />;
    case 'Palmtree':
      return <Palmtree className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    case 'Gift':
    default:
      return <Gift className={className} />;
  }
};

export const WeddingGiftRegistryApp: React.FC = () => {
  const [gifts, setGifts] = useState<WeddingGiftItem[]>(INITIAL_GIFTS_FALLBACK);
  const [backendConnected, setBackendConnected] = useState(false);
  const [viewMode, setViewMode] = useState<'invitados' | 'novios'>('invitados');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Editor Modal / Form State for the Bride & Groom
  const [editingGift, setEditingGift] = useState<WeddingGiftItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Hogar & Cocina');
  const [formIcon, setFormIcon] = useState<GiftIconName>('Gift');
  const [formPrice, setFormPrice] = useState(140000);
  const [formQuantity, setFormQuantity] = useState(1);
  const [formReserved, setFormReserved] = useState(0);
  const [formImage, setFormImage] = useState('');
  const [formDesc, setFormDesc] = useState('');

  // Guest Reservation Modal
  const [selectedGiftForGuest, setSelectedGiftForGuest] = useState<WeddingGiftItem | null>(null);
  const [guestGiverName, setGuestGiverName] = useState('');
  const [guestDedication, setGuestDedication] = useState('');

  // Load gifts from Backend API (or fallback to localStorage)
  useEffect(() => {
    const fetchGifts = async () => {
      if (BACKEND_URL) {
        try {
          const res = await fetch(BACKEND_URL);
          if (res.ok) {
            const data = await res.json();
            setGifts(data);
            setBackendConnected(true);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return;
          }
        } catch {
          // Backend offline or unreachable, fallback to localStorage
        }
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setGifts(JSON.parse(saved));
        } catch {
          setGifts(INITIAL_GIFTS_FALLBACK);
        }
      }
    };

    fetchGifts();
  }, []);

  const syncLocalGifts = (updated: WeddingGiftItem[]) => {
    setGifts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const openCreateForm = () => {
    setIsCreatingNew(true);
    setEditingGift(null);
    setFormTitle('');
    setFormCategory('Hogar & Cocina');
    setFormIcon('Gift');
    setFormPrice(100000);
    setFormQuantity(1);
    setFormReserved(0);
    setFormImage(
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80'
    );
    setFormDesc('');
  };

  const openEditForm = (item: WeddingGiftItem) => {
    setIsCreatingNew(false);
    setEditingGift(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormIcon(item.iconName);
    setFormPrice(item.price);
    setFormQuantity(item.quantity);
    setFormReserved(item.reservedCount);
    setFormImage(item.imageUrl);
    setFormDesc(item.description);
  };

  const handleSaveGift = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formTitle.trim() || 'Regalo de Boda',
      category: formCategory,
      iconName: formIcon,
      price: Number(formPrice) || 100000,
      quantity: Math.max(1, Number(formQuantity) || 1),
      reservedCount: Math.max(0, Number(formReserved) || 0),
      imageUrl:
        formImage.trim() ||
        'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
      description: formDesc.trim(),
    };

    if (isCreatingNew) {
      if (BACKEND_URL) {
        try {
          const res = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const created = await res.json();
            syncLocalGifts([created, ...gifts]);
            setIsCreatingNew(false);
            return;
          }
        } catch {
          // Fallback local save
        }
      }
      const newLocal: WeddingGiftItem = {
        id: `gift-${Date.now()}`,
        ...payload,
      };
      syncLocalGifts([newLocal, ...gifts]);
      setIsCreatingNew(false);
    } else if (editingGift) {
      if (BACKEND_URL) {
        try {
          const res = await fetch(`${BACKEND_URL}/${editingGift.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            const updatedItem = await res.json();
            syncLocalGifts(gifts.map((g) => (g.id === editingGift.id ? updatedItem : g)));
            setEditingGift(null);
            return;
          }
        } catch {
          // Fallback local update
        }
      }
      const updatedLocal: WeddingGiftItem = {
        ...editingGift,
        ...payload,
      };
      syncLocalGifts(gifts.map((g) => (g.id === editingGift.id ? updatedLocal : g)));
      setEditingGift(null);
    }
  };

  const handleDeleteGift = async (id: string) => {
    if (BACKEND_URL) {
      try {
        await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
      } catch {
        // Fallback local delete
      }
    }
    syncLocalGifts(gifts.filter((g) => g.id !== id));
  };

  const handleConfirmGuestGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGiftForGuest) return;

    const targetId = selectedGiftForGuest.id;
    let savedRemotely = false;
    if (BACKEND_URL) {
      try {
        const res = await fetch(`${BACKEND_URL}/${targetId}/reserve`, {
          method: 'POST',
        });
        if (res.ok) {
          const updatedItem = await res.json();
          syncLocalGifts(gifts.map((g) => (g.id === targetId ? updatedItem : g)));
          savedRemotely = true;
        }
      } catch {
        // Fallback local reserve
      }
    }

    if (!savedRemotely) {
      syncLocalGifts(
        gifts.map((g) =>
          g.id === targetId && g.reservedCount < g.quantity
            ? { ...g, reservedCount: g.reservedCount + 1 }
            : g
        )
      );
    }

    const msg = [
      `¡Hola Lucía & Rodrigo! 🎁✨`,
      `Queremos hacerles un regalo de su Lista de Bodas:`,
      ``,
      `• *Regalo elegido:* ${selectedGiftForGuest.title} (${formatCLP(selectedGiftForGuest.price)} CLP)`,
      `• *De parte de:* ${guestGiverName.trim() || 'Familia Invitada'}`,
      guestDedication.trim() ? `• *Dedicatoria:* "${guestDedication.trim()}"` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSelectedGiftForGuest(null);
    setGuestGiverName('');
    setGuestDedication('');
  };

  const filteredGifts =
    selectedCategory === 'Todos'
      ? gifts
      : gifts.filter((g) => g.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#F4ECE1] text-[#2C221E] relative overflow-x-hidden pb-24">
      {/* Top Navigation & Mode Switcher */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#D8C7B2] py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/disenos/invitacion-papel-artesanal"
              className="px-4 py-2 deckle-pill bg-[#EFE5D8] hover:bg-[#3A2B22] hover:text-ivory-50 text-xs uppercase tracking-[0.16em] transition flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Invitación</span>
            </a>

            <span
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest ${
                backendConnected
                  ? 'bg-sage-light text-sage-dark'
                  : 'bg-champagne text-gold-dark'
              }`}
            >
              <Server className="w-3 h-3" />
              <span>
                {backendConnected
                  ? (import.meta.env.DEV ? 'Conectado a Backend Local (:4000)' : 'API Conectada')
                  : 'Modo Interactivo Local'}
              </span>
            </span>
          </div>

          {/* Toggle between Guest View and Bride & Groom Editor Mode */}
          <div className="flex items-center gap-2 bg-[#EFE5D8] p-1.5 deckle-pill">
            <button
              type="button"
              onClick={() => setViewMode('invitados')}
              className={`px-4 py-2 deckle-pill text-xs uppercase tracking-[0.15em] transition flex items-center gap-1.5 ${
                viewMode === 'invitados'
                  ? 'bg-[#3A2B22] text-ivory-50 font-medium shadow-sm'
                  : 'text-[#5C493E] hover:text-[#2C221E]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Vista Invitados</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('novios')}
              className={`px-4 py-2 deckle-pill text-xs uppercase tracking-[0.15em] transition flex items-center gap-1.5 ${
                viewMode === 'novios'
                  ? 'bg-[#A86448] text-ivory-50 font-medium shadow-sm'
                  : 'text-[#5C493E] hover:text-[#2C221E]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Panel de Novios (Editar Regalos)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header with Torn Paper Edge */}
      <section className="pt-14 pb-20 px-4 sm:px-8 text-center relative bg-gradient-to-b from-[#EFE5D8] to-[#F4ECE1]">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#FCF9F2] border border-[#C69C6D]/40 flex items-center justify-center mx-auto text-[#A86448] shadow-sm">
            <Gift className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-[0.28em] text-[#A86448] font-semibold block">
            Mesa de Regalos Personalizada · Lucía &amp; Rodrigo
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#2C221E] font-normal">
            {viewMode === 'invitados'
              ? 'Lista de Regalos Elegidos por los Novios'
              : 'Editor de Regalos de los Novios'}
          </h1>
          <p className="text-sm sm:text-base text-[#69564A] max-w-2xl mx-auto leading-relaxed">
            {viewMode === 'invitados'
              ? 'Cada uno de estos detalles ha sido elegido con mucha ilusión para nuestro nuevo hogar y nuestra luna de miel. Elige el que más te guste para obsequiárnoslo.'
              : 'Agrega nuevos regalos, edita los existentes, elige el ícono representativo, sube la fotografía, ajusta el precio y define la cantidad de unidades.'}
          </p>

          {viewMode === 'novios' && (
            <div className="pt-4">
              <button
                type="button"
                onClick={openCreateForm}
                className="px-7 py-3.5 deckle-pill bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 text-xs uppercase tracking-[0.2em] font-medium transition inline-flex items-center gap-2 shadow-editorial"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar Nuevo Regalo a la Lista</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 deckle-pill text-xs uppercase tracking-[0.16em] transition ${
                selectedCategory === cat
                  ? 'bg-[#3A2B22] text-ivory-50 shadow-sm'
                  : 'bg-[#FCF9F2] text-[#5C493E] hover:bg-[#E8DACA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CREATE / EDIT MODAL FOR BRIDE & GROOM */}
        {(isCreatingNew || editingGift) && (
          <div className="fixed inset-0 z-50 bg-[#2C221E]/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="deckle-card w-full max-w-2xl p-6 sm:p-10 my-auto">
              <div className="flex items-center justify-between border-b border-[#E5D8C6] pb-4 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#A86448] font-semibold block">
                    Panel de Administración de Novios
                  </span>
                  <h3 className="font-serif text-3xl text-[#2C221E]">
                    {isCreatingNew ? 'Crear Nuevo Regalo' : `Editar: ${editingGift?.title}`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreatingNew(false);
                    setEditingGift(null);
                  }}
                  className="p-2 text-[#69564A] hover:text-[#2C221E]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGift} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                      Nombre del Regalo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="Ej. Batidora Artesanal / Noche en Hotel"
                      className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none focus:border-[#A86448]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                      Categoría
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none focus:border-[#A86448]"
                    >
                      {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Visual Icon Picker */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-2">
                    Elige un Ícono para el Regalo:
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {ICON_OPTIONS.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setFormIcon(opt.name)}
                        className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1 text-center transition ${
                          formIcon === opt.name
                            ? 'bg-[#3A2B22] text-ivory-50 border-[#3A2B22]'
                            : 'bg-[#F4ECE1] text-[#5C493E] border-[#D8C7B2] hover:border-[#A86448]'
                        }`}
                      >
                        {renderGiftIcon(opt.name, 'w-4 h-4')}
                        <span className="text-[10px] leading-tight">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price, Quantity & Reserved Count */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                      Precio Estimado (CLP $) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none focus:border-[#A86448]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                      Cantidad Total Pedida *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      required
                      value={formQuantity}
                      onChange={(e) => setFormQuantity(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none focus:border-[#A86448]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                      Unidades Ya Regaladas
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={formQuantity}
                      value={formReserved}
                      onChange={(e) => setFormReserved(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none focus:border-[#A86448]"
                    />
                  </div>
                </div>

                {/* Image URL + Quick Presets */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                    URL de la Fotografía del Regalo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none focus:border-[#A86448]"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#69564A] flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> Fotos rápidas de muestra:
                    </span>
                    {[
                      {
                        label: 'Cocina',
                        url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
                      },
                      {
                        label: 'Viaje / Playa',
                        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
                      },
                      {
                        label: 'Hogar',
                        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
                      },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormImage(preset.url)}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#EFE5D8] hover:bg-[#D8C7B2] text-[#3A2B22]"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                    Descripción / Por qué nos encanta este regalo
                  </label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Escribe una breve nota para los invitados..."
                    className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none focus:border-[#A86448]"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingNew(false);
                      setEditingGift(null);
                    }}
                    className="px-5 py-2.5 deckle-pill border border-[#D8C7B2] text-xs uppercase tracking-wider text-[#5C493E]"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 deckle-pill bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Guardar Regalo</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* GUEST GIFT RESERVATION MODAL */}
        {selectedGiftForGuest && (
          <div className="fixed inset-0 z-50 bg-[#2C221E]/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="deckle-card w-full max-w-lg p-7 sm:p-9 space-y-5">
              <div className="flex items-start justify-between border-b border-[#E5D8C6] pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#A86448] font-semibold block">
                    Obsequiar a los Novios
                  </span>
                  <h3 className="font-serif text-3xl text-[#2C221E]">
                    {selectedGiftForGuest.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#A86448] mt-0.5">
                    Valor estimado: {formatCLP(selectedGiftForGuest.price)} CLP
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGiftForGuest(null)}
                  className="p-1.5 text-[#69564A]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleConfirmGuestGift} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                    Tu Nombre o Familia *
                  </label>
                  <input
                    type="text"
                    required
                    value={guestGiverName}
                    onChange={(e) => setGuestGiverName(e.target.value)}
                    placeholder="Ej. Familia Mendoza / Tíos Carlos y Ana"
                    className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#5C493E] mb-1">
                    Dedicatoria junto a tu regalo
                  </label>
                  <textarea
                    rows={3}
                    value={guestDedication}
                    onChange={(e) => setGuestDedication(e.target.value)}
                    placeholder="¡Con mucho cariño para que lo disfruten en su nueva etapa!"
                    className="w-full px-4 py-2.5 bg-[#F4ECE1] border border-[#D8C7B2] rounded-xl text-sm focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 deckle-pill bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
                  <span>Confirmar Regalo y Avisar a los Novios</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* GIFTS GRID (TORN PAPER DECKLE CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGifts.map((gift) => {
            const available = Math.max(0, gift.quantity - gift.reservedCount);
            const isSoldOut = available === 0;

            return (
              <article
                key={gift.id}
                className="deckle-card p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Organic Rounded Photo with Floating Icon Badge */}
                  <div className="relative h-56 overflow-hidden rounded-[28px_18px_26px_20px] mb-5 bg-[#EFE5D8]">
                    <img
                      src={gift.imageUrl}
                      alt={gift.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E]/60 via-transparent to-transparent" />

                    {/* Top Icon & Category */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="px-3 py-1 deckle-pill bg-[#FCF9F2]/95 text-[10px] uppercase tracking-[0.18em] text-[#3A2B22] font-medium">
                        {gift.category}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#3A2B22] text-[#F4ECE1] flex items-center justify-center shadow-md">
                        {renderGiftIcon(gift.iconName, 'w-4 h-4')}
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-ivory-50">
                      <span className="font-serif text-3xl font-semibold drop-shadow">
                        {formatCLP(gift.price)} <span className="text-xs font-sans font-normal">CLP</span>
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                          isSoldOut
                            ? 'bg-[#6E675F] text-ivory-50'
                            : 'bg-[#FCF9F2]/95 text-[#3A2B22]'
                        }`}
                      >
                        {isSoldOut
                          ? '¡Ya Regalado!'
                          : `Disponibles: ${available} de ${gift.quantity}`}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl text-[#2C221E] font-medium mb-2">
                    {gift.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#69564A] leading-relaxed mb-5">
                    {gift.description}
                  </p>
                </div>

                {/* Footer Actions depending on View Mode */}
                <div className="pt-4 border-t border-[#E5D8C6]">
                  {viewMode === 'invitados' ? (
                    <button
                      type="button"
                      disabled={isSoldOut}
                      onClick={() => setSelectedGiftForGuest(gift)}
                      className={`w-full py-3.5 deckle-pill text-xs uppercase tracking-[0.18em] font-medium transition flex items-center justify-center gap-2 ${
                        isSoldOut
                          ? 'bg-[#E5D8C6] text-[#8C7B6E] cursor-not-allowed'
                          : 'bg-[#3A2B22] hover:bg-[#A86448] text-ivory-50 shadow-sm'
                      }`}
                    >
                      <Gift className="w-4 h-4" />
                      <span>
                        {isSoldOut ? 'Regalo Completado por Invitados' : 'Regalar a los Novios'}
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => openEditForm(gift)}
                        className="flex-1 py-2.5 deckle-pill bg-[#EFE5D8] hover:bg-[#3A2B22] hover:text-ivory-50 text-[#3A2B22] text-xs uppercase tracking-wider font-medium transition flex items-center justify-center gap-1.5"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGift(gift.id)}
                        className="p-2.5 deckle-pill bg-[#F9E5E2] hover:bg-[#B84A39] text-[#B84A39] hover:text-white transition"
                        title="Eliminar regalo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
