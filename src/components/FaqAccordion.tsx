import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/weddingData';

export const FaqAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-ivory-300 border-t border-b border-ivory-300">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-5">
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-start justify-between gap-4 text-left focus:outline-none group"
              aria-expanded={isOpen}
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-dark font-medium block mb-1">
                  {item.category}
                </span>
                <span className="font-serif text-xl sm:text-2xl text-charcoal group-hover:text-gold-dark transition-colors">
                  {item.question}
                </span>
              </div>
              <span className="w-8 h-8 rounded-full border border-ivory-300 bg-ivory-50 flex items-center justify-center text-charcoal shrink-0 mt-1 group-hover:border-gold transition">
                {isOpen ? (
                  <Minus className="w-4 h-4 text-gold-dark" />
                ) : (
                  <Plus className="w-4 h-4 text-charcoal-muted" />
                )}
              </span>
            </button>

            {isOpen && (
              <div className="mt-3 pr-10 text-sm text-charcoal-muted leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
