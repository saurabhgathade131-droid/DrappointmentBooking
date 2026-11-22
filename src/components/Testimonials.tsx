import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TESTIMONIALS } from '../data/initialData';
import { Star, BadgeCheck, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { openBookingModal } = useApp();
  const [filter, setFilter] = useState<'all' | 'female' | 'male'>('all');

  const filteredTestimonials = filter === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.category === filter || t.category === 'both');

  return (
    <section id="testimonialsSection" className="py-24 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B86B43]">Heartwarming Journeys</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1C1A] mt-2 mb-4">
            Over 200 Couples Conceived Naturally
          </h2>
          <p className="text-sm sm:text-base text-[#5C554E]">
            Real couples who were told to undergo expensive donor cycles or IVF, who regained their dream of parenthood through Dr. Nageshree's Ayurvedic care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-[#1E1C1A] text-white shadow-sm'
                  : 'bg-white text-[#5C554E] border border-[#E8DFD5] hover:border-[#B86B43]'
              }`}
            >
              All Success Stories
            </button>
            <button
              onClick={() => setFilter('female')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filter === 'female'
                  ? 'bg-[#1E1C1A] text-white shadow-sm'
                  : 'bg-white text-[#5C554E] border border-[#E8DFD5] hover:border-[#B86B43]'
              }`}
            >
              PCOS & Low AMH (Female)
            </button>
            <button
              onClick={() => setFilter('male')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                filter === 'male'
                  ? 'bg-[#1E1C1A] text-white shadow-sm'
                  : 'bg-white text-[#5C554E] border border-[#E8DFD5] hover:border-[#B86B43]'
              }`}
            >
              Sperm Count & Motility (Male)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-[#E8DFD5] shadow-soft hover:-translate-y-1 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#B86B43]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8EFE9] text-emerald-800 flex items-center gap-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" /> {t.conceptionTime}
                  </span>
                </div>

                <div className="mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43]">{t.condition}</span>
                </div>

                <p className="text-sm text-[#2C2724] leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
                <div>
                  <h5 className="font-serif font-bold text-base text-[#1E1C1A]">{t.couple}</h5>
                  <span className="text-xs text-[#5C554E]">{t.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-emerald-700 block">{t.babyBorn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#E8DFD5] shadow-soft max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1E1C1A]">Verified Clinical Case Reports</h4>
              <p className="text-xs text-[#5C554E]">Every success story is backed by confirmed beta-hCG blood tests & obstetric sonograms.</p>
            </div>
          </div>
          <button
            onClick={() => openBookingModal()}
            className="shrink-0 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors"
          >
            Start Your Journey
          </button>
        </div>

      </div>
    </section>
  );
};
