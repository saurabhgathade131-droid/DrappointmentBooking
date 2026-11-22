import React from 'react';
import { useApp } from '../context/AppContext';
import { CalendarCheck, PlayCircle, Award, Sparkles, Tv, Instagram } from 'lucide-react';

export const Hero: React.FC = () => {
  const { openBookingModal, doctor } = useApp();

  return (
    <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-mandala-pattern">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Sanskrit Motto Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#E8EFE9] border border-[#D5E2D7] shadow-sm text-xs font-bold text-emerald-950">
            <Sparkles className="w-3.5 h-3.5 text-[#B86B43]" />
            <span>{doctor.sanskritShloka}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#E8DFD5] shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B86B43]" />
              <span className="text-xs font-bold text-[#1E1C1A]">BAMS • Former Senior Fertility Specialist at Gynoveda</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E1C1A] tracking-tight leading-[1.12]">
              Nurturing Life. <br />
              <span className="text-copper-gradient italic font-normal">Natural Fertility Wisdom</span> <br />
              With Vedic Vaidya.
            </h1>

            <p className="text-base sm:text-lg text-[#5C554E] max-w-2xl leading-relaxed">
              Led by <strong className="text-[#1E1C1A]">{doctor.name}</strong> (BAMS). Having helped <span className="font-bold text-[#B86B43] underline decoration-[#D6855B]/40 decoration-2">over 200 couples conceive naturally</span>, she integrates classical Beej Shuddhi, Garbhashaya Shodhana, and metabolic hormonal harmony to revive both sperm vitality and ovulatory health without invasive synthetic hormones.
            </p>

            {/* Verified Key Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFD5] shadow-soft">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43] block">Male Fertility</span>
                <span className="text-xs text-[#5C554E] mt-0.5 block">Sperm Count &amp; Motility Revival</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFD5] shadow-soft">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43] block">Female Fertility</span>
                <span className="text-xs text-[#5C554E] mt-0.5 block">PCOS Reversal &amp; Low AMH Care</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFD5] shadow-soft col-span-2 sm:col-span-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43] block">Garbh Sanskar</span>
                <span className="text-xs text-[#5C554E] mt-0.5 block">Pre-Conception Detox &amp; Diet</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openBookingModal()}
                className="px-8 py-4 rounded-2xl font-bold text-sm tracking-wide text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-all shadow-xl flex items-center gap-3"
              >
                <span>Book Doctor Consultation</span>
                <CalendarCheck className="w-4 h-4 text-[#D6855B]" />
              </button>
              <a
                href="#instagramSection"
                className="px-6 py-4 rounded-2xl font-bold text-sm text-[#1E1C1A] bg-white hover:bg-[#FAF7F2] border border-[#E8DFD5] transition-all flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-rose-500" />
                <span>Watch Instagram Reels (@vedic_vd)</span>
              </a>
            </div>

            {/* Quick Proof */}
            <div className="flex items-center gap-4 pt-3 text-xs text-[#5C554E]">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center font-bold text-emerald-800 text-[10px]">PK</div>
                <div className="w-7 h-7 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center font-bold text-amber-800 text-[10px]">SS</div>
                <div className="w-7 h-7 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center font-bold text-rose-800 text-[10px]">MD</div>
              </div>
              <span><strong>200+ Documented Conceptions</strong> • 14,500+ Consultations Worldwide</span>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#B86B43]/20 via-[#E8EFE9]/40 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD5] shadow-2xl">
              <div className="flex items-start justify-between pb-6 border-b border-[#F0EAE1]">
                <div className="flex items-center gap-4">
                  <div className="w-18 h-18 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#E8EFE9] border border-[#E8DFD5] p-1 flex items-center justify-center shadow-inner shrink-0">
                    <img
                      src="/assets/images/vedic-vaidya-logo.jpg"
                      alt="Vedic Vaidya Logo"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1E1C1A]">{doctor.name}</h3>
                    <p className="text-xs font-semibold text-[#B86B43]">BAMS (Ayurvedacharya)</p>
                    <p className="text-[11px] text-[#5C554E]">Ex-Senior Consultant at Gynoveda</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available
                </span>
              </div>

              <div className="py-6 space-y-4 text-xs text-[#5C554E] leading-relaxed">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </span>
                  <p><strong className="text-[#1E1C1A]">12+ Years Clinical Practice:</strong> Dedicated strictly to reproductive endocrinology for both male and female partners.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                  <p><strong className="text-[#1E1C1A]">200+ Confirmed Conceptions:</strong> Clinically documented sonograms of couples overcoming repeated IUI/IVF failures.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center shrink-0">
                    <Tv className="w-3.5 h-3.5" />
                  </span>
                  <p><strong className="text-[#1E1C1A]">TV &amp; Social Speaker:</strong> Featured on Zee 24 Taas, Saam TV, ABP Majha &amp; daily video education on @vedic_vd.</p>
                </div>
              </div>

              <div className="mt-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Latest Verified Milestone</span>
                  <div className="text-xs font-bold text-[#1E1C1A]">Baby Boy Aarav, Born Aug 2024</div>
                  <div className="text-[11px] text-[#5C554E]">Pooja &amp; Rohan (Conceived in 4 Months)</div>
                </div>
                <button
                  onClick={() => openBookingModal()}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors"
                >
                  Book Slot
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
