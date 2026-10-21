import React from 'react';
import { Check, Minus, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { PRICING_PLANS, WHATSAPP_NUMBER, BRAND_NAME } from '../data/weddingData';

export const PricingSection: React.FC = () => {
  const formatCLP = (amount: number) => `$${Math.round(amount).toLocaleString('es-CL')} CLP`;

  return (
    <div>
      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const whatsappPlanUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            `¡Hola! Me interesa contratar el plan "${plan.name}" (${formatCLP(
              plan.price
            )}) de ${BRAND_NAME}. ¿Me pueden indicar los pasos para comenzar?`
          )}`;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-7 sm:p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-ivory-50 border-2 border-gold shadow-editorial-lg lg:-translate-y-3'
                  : 'bg-ivory-50/90 border border-ivory-300 shadow-editorial'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-charcoal text-ivory-50 text-[10px] uppercase tracking-[0.22em] font-medium flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-gold-light" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <div className="text-center pb-6 border-b border-ivory-200">
                  <h3 className="font-serif text-3xl text-charcoal font-medium">{plan.name}</h3>
                  <p className="text-xs text-charcoal-muted mt-1.5 min-h-[34px]">{plan.tagline}</p>

                  <div className="mt-5">
                    {plan.originalPrice && (
                      <span className="text-xs text-charcoal-muted line-through block">
                        Antes {formatCLP(plan.originalPrice)}
                      </span>
                    )}
                    <div className="font-serif text-4xl sm:text-5xl font-semibold text-charcoal mt-0.5">
                      {formatCLP(plan.price)}
                    </div>
                    <span className="inline-block mt-2 text-[11px] uppercase tracking-[0.18em] text-gold-dark font-medium">
                      {plan.billingNote}
                    </span>
                  </div>
                </div>

                {/* Delivery time pill */}
                <div className="my-5 py-2 px-3 bg-champagne/55 border border-gold/25 flex items-center justify-center gap-2 text-xs text-charcoal">
                  <Clock className="w-3.5 h-3.5 text-gold-dark shrink-0" />
                  <span>{plan.deliveryDays}</span>
                </div>

                <p className="text-xs text-charcoal-muted leading-relaxed mb-5">
                  {plan.description}
                </p>

                {/* Features Checklist */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li
                      key={feat.label}
                      className={`text-xs flex items-start gap-2.5 ${
                        feat.included ? 'text-charcoal' : 'text-charcoal-muted/45 line-through'
                      }`}
                    >
                      {feat.included ? (
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            feat.highlight ? 'text-gold-dark' : 'text-sage'
                          }`}
                        />
                      ) : (
                        <Minus className="w-4 h-4 shrink-0 mt-0.5 text-charcoal-muted/40" />
                      )}
                      <span className={feat.highlight ? 'font-medium text-charcoal' : ''}>
                        {feat.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan CTA */}
              <div className="pt-4 border-t border-ivory-200 space-y-2.5">
                <a
                  href={whatsappPlanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-charcoal hover:bg-gold-dark text-ivory-50 shadow-sm'
                      : 'bg-champagne hover:bg-charcoal hover:text-ivory-50 text-charcoal'
                  }`}
                >
                  <FaWhatsapp className="w-4 h-4 text-[#A7D7B8]" />
                  <span>{plan.ctaLabel}</span>
                </a>
                <p className="text-[11px] text-center text-charcoal-muted flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                  <span>Pago seguro y garantía de satisfacción</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
