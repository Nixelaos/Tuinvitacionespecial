import React from 'react';
import { Palette, FileText, Sparkles, Send } from 'lucide-react';
import { PROCESS_STEPS } from '../data/weddingData';
import type { ProcessStep } from '../types/wedding';

export const ProcessSteps: React.FC = () => {
  const getStepIcon = (iconName: ProcessStep['iconName']) => {
    const props = { className: 'w-5 h-5 text-gold-dark' };
    switch (iconName) {
      case 'Palette':
        return <Palette {...props} />;
      case 'FileText':
        return <FileText {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Send':
        return <Send {...props} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PROCESS_STEPS.map((step) => (
        <div
          key={step.number}
          className="bg-ivory-50 border border-ivory-300 p-7 flex flex-col justify-between relative group hover:border-gold transition-colors duration-300"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-4xl text-gold/70 font-light">
                {step.number}
              </span>
              <div className="w-11 h-11 rounded-full bg-champagne/70 border border-gold/30 flex items-center justify-center">
                {getStepIcon(step.iconName)}
              </div>
            </div>

            <span className="inline-block px-2.5 py-0.5 bg-sage-light text-sage-dark text-[10px] uppercase tracking-[0.18em] font-medium mb-2">
              {step.duration}
            </span>
            <h3 className="font-serif text-2xl text-charcoal font-medium mb-2.5">
              {step.title}
            </h3>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
