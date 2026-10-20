import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Heart,
  CheckCircle2,
  Send,
  ShieldCheck,
  Globe,
  Zap,
  Brush,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import {
  INVITATION_TEMPLATES,
  PRICING_PLANS,
  WHATSAPP_NUMBER,
  BRAND_NAME,
} from '../data/weddingData';

export const OrderQuoteSection: React.FC = () => {
  const [coupleNames, setCoupleNames] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(INVITATION_TEMPLATES[0].name);
  const [selectedPlanId, setSelectedPlanId] = useState(PRICING_PLANS[1].id);
  const [extraExpress, setExtraExpress] = useState(false);
  const [extraBilingual, setExtraBilingual] = useState(false);
  const [extraIllustration, setExtraIllustration] = useState(false);
  const [notes, setNotes] = useState('');
  const [submittedOnline, setSubmittedOnline] = useState(false);

  const currentPlan =
    PRICING_PLANS.find((p) => p.id === selectedPlanId) || PRICING_PLANS[1];

  const totalUsd =
    currentPlan.price +
    (extraExpress ? 25 : 0) +
    (extraBilingual ? 30 : 0) +
    (extraIllustration ? 35 : 0);

  const depositUsd = Math.round(totalUsd / 2);

  const buildWhatsAppMessage = () => {
    const extras: string[] = [];
    if (extraExpress) extras.push('Entrega Exprés 24h (+$25 USD)');
    if (extraBilingual) extras.push('Versión Bilingüe Español/Inglés (+$30 USD)');
    if (extraIllustration) extras.push('Ilustración Acuarela del Lugar (+$35 USD)');

    return [
      `¡Hola ${BRAND_NAME}! Queremos reservar nuestra invitación de boda digital:`,
      `• Novios: ${coupleNames || 'Por definir'}`,
      `• Fecha de boda: ${weddingDate || 'Por confirmar'}`,
      `• Diseño elegido: ${selectedTemplate}`,
      `• Plan seleccionado: ${currentPlan.name} ($${currentPlan.price} USD)`,
      extras.length > 0 ? `• Extras: ${extras.join(', ')}` : `• Extras: Ninguno`,
      `• Total estimado: $${totalUsd} USD (Reserva con 50%: $${depositUsd} USD)`,
      notes ? `• Comentarios: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const whatsappOrderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage()
  )}`;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedOnline(true);
  };

  return (
    <div className="bg-ivory-50 border border-gold/40 shadow-editorial-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Configurator Form */}
        <div className="lg:col-span-7 p-6 sm:p-10">
          <div className="mb-7">
            <span className="text-[11px] uppercase tracking-[0.24em] text-gold-dark font-semibold block mb-1">
              Cotizador &amp; Reserva Personalizada
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-charcoal">
              Configura la invitación de vuestros sueños
            </h3>
            <p className="text-sm text-charcoal-muted mt-1">
              Selecciona vuestro diseño favorito, el plan ideal y envíanos tu pedido por WhatsApp o
              solicita contacto directo.
            </p>
          </div>

          {!submittedOnline ? (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1.5">
                    Nombres de los Novios *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      placeholder="Ej. Valentina & Sebastián"
                      className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                    />
                    <Heart className="w-4 h-4 text-gold-dark absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1.5">
                    Fecha estimada de la boda
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={weddingDate}
                      onChange={(e) => setWeddingDate(e.target.value)}
                      className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1.5">
                    Diseño del Catálogo
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                  >
                    {INVITATION_TEMPLATES.map((tpl) => (
                      <option key={tpl.id} value={tpl.name}>
                        {tpl.name} — {tpl.category}
                      </option>
                    ))}
                    <option value="Diseño 100% a Medida">
                      Quiero un diseño 100% a medida
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1.5">
                    Colección / Plan
                  </label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="w-full px-4 py-3 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                  >
                    {PRICING_PLANS.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} (${plan.price} USD)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Bespoke Add-ons */}
              <div>
                <span className="block text-xs uppercase tracking-wider text-charcoal-light mb-2">
                  Complementos Opcionales de Atelier:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setExtraExpress(!extraExpress)}
                    className={`p-3 border text-left transition flex flex-col justify-between ${
                      extraExpress
                        ? 'bg-champagne border-gold text-charcoal'
                        : 'bg-ivory-100 border-ivory-300 text-charcoal-muted hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Zap className="w-4 h-4 text-gold-dark" />
                      <span className="text-xs font-semibold text-charcoal">+$25 USD</span>
                    </div>
                    <span className="text-xs font-medium text-charcoal block">
                      Entrega Exprés 24h
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExtraBilingual(!extraBilingual)}
                    className={`p-3 border text-left transition flex flex-col justify-between ${
                      extraBilingual
                        ? 'bg-champagne border-gold text-charcoal'
                        : 'bg-ivory-100 border-ivory-300 text-charcoal-muted hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Globe className="w-4 h-4 text-gold-dark" />
                      <span className="text-xs font-semibold text-charcoal">+$30 USD</span>
                    </div>
                    <span className="text-xs font-medium text-charcoal block">
                      Versión Bilingüe (ES/EN)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExtraIllustration(!extraIllustration)}
                    className={`p-3 border text-left transition flex flex-col justify-between ${
                      extraIllustration
                        ? 'bg-champagne border-gold text-charcoal'
                        : 'bg-ivory-100 border-ivory-300 text-charcoal-muted hover:border-gold/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Brush className="w-4 h-4 text-gold-dark" />
                      <span className="text-xs font-semibold text-charcoal">+$35 USD</span>
                    </div>
                    <span className="text-xs font-medium text-charcoal block">
                      Acuarela del Lugar
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1.5">
                    WhatsApp o Correo de contacto *
                  </label>
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="Ej. +52 55 1234 5678 o correo@ejemplo.com"
                    className="w-full px-4 py-2.5 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-charcoal-light mb-1.5">
                    Detalles o colores de tu boda
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Boda en jardín, tonos verde salvia y dorado"
                    className="w-full px-4 py-2.5 bg-ivory-100 border border-ivory-300 text-sm text-charcoal focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 bg-charcoal hover:bg-gold-dark text-ivory-50 text-xs uppercase tracking-[0.18em] font-medium transition flex items-center justify-center gap-2 text-center"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
                  <span>Enviar Pedido por WhatsApp</span>
                </a>
                <button
                  type="submit"
                  className="py-3.5 px-6 border border-charcoal/30 hover:border-charcoal bg-ivory-100 text-charcoal text-xs uppercase tracking-[0.18em] font-medium transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Solicitar por Web</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-8 bg-champagne/50 border border-gold/40 text-center space-y-4 my-4">
              <CheckCircle2 className="w-12 h-12 text-sage mx-auto" />
              <h4 className="font-serif text-3xl text-charcoal">
                ¡Solicitud Recibida para {coupleNames || 'Vuestra Boda'}!
              </h4>
              <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                Hemos registrado vuestra configuración con el diseño{' '}
                <strong>{selectedTemplate}</strong> ({currentPlan.name}). Una diseñadora de nuestro
                atelier os contactará a <strong>{emailOrPhone}</strong> en menos de 2 horas.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-charcoal text-ivory-50 text-xs uppercase tracking-widest inline-flex items-center gap-2"
                >
                  <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
                  <span>Adelantar conversación en WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedOnline(false)}
                  className="text-xs underline text-gold-dark uppercase tracking-widest"
                >
                  Modificar cotización
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Order Summary Receipt */}
        <div className="lg:col-span-5 bg-charcoal text-ivory-50 p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between border-b border-ivory-200/15 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-light block">
                  Resumen de Atelier
                </span>
                <h4 className="font-serif text-2xl text-ivory-50 mt-0.5">
                  {coupleNames.trim() || 'Vuestra Invitación Nupcial'}
                </h4>
              </div>
              <Sparkles className="w-5 h-5 text-gold-light" />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-ivory-200/10">
                <span className="text-ivory-200/70">Diseño seleccionado:</span>
                <span className="font-serif text-lg text-gold-light">{selectedTemplate}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-ivory-200/10">
                <span className="text-ivory-200/70">Colección:</span>
                <span className="font-medium text-ivory-50">
                  {currentPlan.name} (${currentPlan.price} USD)
                </span>
              </div>
              {weddingDate && (
                <div className="flex items-center justify-between py-2 border-b border-ivory-200/10">
                  <span className="text-ivory-200/70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-light" />
                    Fecha del enlace:
                  </span>
                  <span className="text-ivory-50">{weddingDate}</span>
                </div>
              )}
              {extraExpress && (
                <div className="flex items-center justify-between text-xs text-ivory-200">
                  <span>+ Entrega Exprés 24 horas</span>
                  <span>$25 USD</span>
                </div>
              )}
              {extraBilingual && (
                <div className="flex items-center justify-between text-xs text-ivory-200">
                  <span>+ Versión Bilingüe Español/Inglés</span>
                  <span>$30 USD</span>
                </div>
              )}
              {extraIllustration && (
                <div className="flex items-center justify-between text-xs text-ivory-200">
                  <span>+ Ilustración Acuarela Personalizada</span>
                  <span>$35 USD</span>
                </div>
              )}
            </div>

            <div className="p-5 bg-ivory-50/5 border border-gold/30 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-widest text-ivory-200/80">
                  Inversión Total (Pago Único)
                </span>
                <span className="font-serif text-4xl font-semibold text-gold-light">
                  ${totalUsd} USD
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-ivory-200/80 pt-2 border-t border-ivory-200/10">
                <span>Aparta hoy con el 50%:</span>
                <strong className="text-ivory-50">${depositUsd} USD</strong>
              </div>
              <div className="flex items-center justify-between text-xs text-ivory-200/80">
                <span>50% restante al aprobar tu diseño:</span>
                <strong className="text-ivory-50">${totalUsd - depositUsd} USD</strong>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-ivory-200/15 space-y-2 text-xs text-ivory-200/75">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-light shrink-0" />
              <span>Garantía de satisfacción: revisiones incluidas hasta que luzca perfecta.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
