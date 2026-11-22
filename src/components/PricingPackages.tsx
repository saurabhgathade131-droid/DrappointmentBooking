import React from 'react';
import { useApp } from '../context/AppContext';
import { CONSULTATION_TYPES } from '../data/initialData';
import { Check, ArrowRight } from 'lucide-react';

export const PricingPackages: React.FC = () => {
  const { openBookingModal } = useApp();

  return (
    <section id="pricingSection" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B86B43]">Transparent Consultation Fees</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1C1A] mt-2 mb-4">
            Choose Your Consultation Format
          </h2>
          <p className="text-sm sm:text-base text-[#5C554E]">
            Simple and upfront pricing with no hidden charges. All consultations include complete medical file review and customized herbal regimens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONSULTATION_TYPES.map(pkg => {
            const isPopular = pkg.badge === 'Most Popular';
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-3xl p-8 border ${
                  isPopular
                    ? 'border-[#B86B43] ring-2 ring-[#B86B43]/20 shadow-copper'
                    : 'border-[#E8DFD5] shadow-soft'
                } flex flex-col justify-between hover:-translate-y-2 transition-all duration-300`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-8 bg-[#1E1C1A] text-[#FAF7F2] text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-sm">
                    {pkg.badge}
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B86B43] bg-[#E8EFE9] px-3 py-1 rounded-lg">
                      {pkg.duration}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-[#1E1C1A]">₹{pkg.price}</span>
                      <span className="text-xs text-[#5C554E]">/ session</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#1E1C1A] mb-3">{pkg.name}</h3>
                  <p className="text-sm text-[#5C554E] mb-6 leading-relaxed">{pkg.description}</p>

                  <div className="space-y-3 mb-8 pt-4 border-t border-[#F0EAE1]">
                    {pkg.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-[#2C2724]">
                        <span className="w-5 h-5 rounded-full bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openBookingModal(pkg)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-[#1E1C1A] text-white hover:bg-[#B86B43]'
                      : 'bg-[#FAF7F2] hover:bg-[#1E1C1A] text-[#1E1C1A] hover:text-white border border-[#E8DFD5]'
                  }`}
                >
                  <span>Book {pkg.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
