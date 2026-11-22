import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutDoctor: React.FC = () => {
  const { openBookingModal, doctor } = useApp();

  return (
    <section id="aboutSection" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-[#E8DFD5]">
              <img
                src="https://images.unsplash.com/photo-1594824813583-4a1f59265f49?auto=format&fit=crop&w=1000&q=80"
                alt="Dr. Nagasri Tenneti Ayurvedic Doctor"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D6855B] block mb-1">
                  Founder &amp; Chief Physician • Vedic Vaidya
                </span>
                <h3 className="font-serif text-2xl font-bold">{doctor.name}</h3>
                <p className="text-xs text-white/80 mt-1">BAMS • Reproductive Endocrinologist (Ayurveda) • Ex-Gynoveda</p>
                <p className="text-[11px] text-[#D6855B] font-mono mt-1">{doctor.instagramHandle}</p>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4 bg-[#FAF7F2] border border-[#E8DFD5] p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#B86B43] text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1E1C1A]">Gynoveda Senior Track Record</div>
                <div className="text-[11px] text-[#5C554E]">200+ Natural Pregnancies Led</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE9] text-[#1E1C1A] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#B86B43]" /> Clinical Philosophy &amp; Experience
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1C1A] leading-tight">
              "Fertility is not an allopathic emergency. <br />
              <span className="text-copper-gradient italic font-normal">It is a natural state of cellular harmony."</span>
            </h2>

            <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
              During her tenure leading reproductive health cases at <strong className="text-[#1E1C1A]">Gynoveda</strong>, Dr. Nagasri Tenneti observed how repeatedly couples facing infertility are rushed into invasive hormone shots, IUIs, and costly IVF cycles before addressing fundamental biological imbalances.
            </p>

            <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
              At <strong className="text-[#1E1C1A]">Vedic Vaidya</strong>, she treats fertility as a sacred dual partnership. Healthy conception requires both high-vitality sperm (Shukra Dhatu) and a receptive, nourished uterine soil (Kshetra and Beej).
            </p>

            {/* The 4 Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#B86B43] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h4 className="font-bold text-sm text-[#1E1C1A]">Beej Shuddhi</h4>
                </div>
                <p className="text-xs text-[#5C554E]">Cellular detox to enhance the genetic and mitochondrial vitality of both sperm and ovum.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#B86B43] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h4 className="font-bold text-sm text-[#1E1C1A]">Garbhashaya Shodhana</h4>
                </div>
                <p className="text-xs text-[#5C554E]">Uterine detox to resolve thin endometrium, sluggish blood flow, and pelvic stagnation.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#B86B43] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h4 className="font-bold text-sm text-[#1E1C1A]">Shukra Dhatu Rasayana</h4>
                </div>
                <p className="text-xs text-[#5C554E]">Reversing low sperm count, poor morphology, and sluggish motility with targeted botanicals.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5]">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-6 h-6 rounded-full bg-[#B86B43] text-white text-xs font-bold flex items-center justify-center">4</span>
                  <h4 className="font-bold text-sm text-[#1E1C1A]">Garbh Sanskar Protocol</h4>
                </div>
                <p className="text-xs text-[#5C554E]">Holistic physical and mental alignment preparing parents for conscious, stress-free conception.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors"
              >
                Schedule Your Case Evaluation with Dr. Nagasri Tenneti
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
