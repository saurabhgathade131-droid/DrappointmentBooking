import React from 'react';
import { CLINICAL_STATS } from '../data/initialData';

export const StatsSection: React.FC = () => {
  return (
    <section id="statsSection" className="py-16 bg-[#FAF7F2] border-y border-[#E8DFD5]/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {CLINICAL_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-white rounded-3xl border border-[#E8DFD5] shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className="font-serif text-4xl sm:text-5xl font-black text-copper-gradient mb-2">
                {stat.number}
              </div>
              <h4 className="font-bold text-sm text-[#1E1C1A] mb-1">{stat.label}</h4>
              <p className="text-xs text-[#5C554E] leading-relaxed">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
