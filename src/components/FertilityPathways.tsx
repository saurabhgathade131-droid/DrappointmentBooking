import React from 'react';
import { useApp } from '../context/AppContext';
import { CONSULTATION_TYPES } from '../data/initialData';
import { Flower2, Shield, ArrowRight } from 'lucide-react';

export const FertilityPathways: React.FC = () => {
  const { openBookingModal } = useApp();

  return (
    <section id="expertiseSection" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B86B43]">Dual-Factor Clinical Excellence</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E1C1A] mt-2 mb-4">
            Complete Fertility Care for Both Partners
          </h2>
          <p className="text-sm sm:text-base text-[#5C554E]">
            Infertility is a couple's journey. Dr. Nageshree provides dedicated diagnostic and treatment protocols tailored for both male and female reproductive wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Female Fertility Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DFD5] shadow-soft hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center mb-6">
                <Flower2 className="w-6 h-6" />
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] mb-3">
                Female Fertility & Ovulation Care
              </h3>
              <p className="text-sm text-[#5C554E] mb-6 leading-relaxed">
                Targeted classical formulations designed to balance estrogen-progesterone rhythms, dissolve cysts, and nourish the endometrial bed for firm implantation.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0EAE1]">
                  <h5 className="font-bold text-sm text-[#1E1C1A] mb-1">PCOS & PCOD Reversal</h5>
                  <p className="text-xs text-[#5C554E]">Restoring natural spontaneous ovulation without birth control pills or Metformin dependence.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0EAE1]">
                  <h5 className="font-bold text-sm text-[#1E1C1A] mb-1">Low AMH & Diminished Egg Reserve</h5>
                  <p className="text-xs text-[#5C554E]">Enhancing mitochondrial ATP and oocyte quality even when AMH levels are under 1.0 ng/mL.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0EAE1]">
                  <h5 className="font-bold text-sm text-[#1E1C1A] mb-1">Thin Endometrium & Tubal Health</h5>
                  <p className="text-xs text-[#5C554E]">Improving uterine lining vascularity to optimal 8-11mm thickness and addressing tubal inflammation.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => openBookingModal(CONSULTATION_TYPES[0])}
              className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-[#1E1C1A] bg-[#FAF7F2] hover:bg-[#1E1C1A] hover:text-white border border-[#E8DFD5] transition-all flex items-center justify-center gap-2"
            >
              <span>Consult for Female Infertility</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Male Fertility Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8DFD5] shadow-soft hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F0E6DE] text-[#B86B43] flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1C1A] mb-3">
                Male Fertility & Shukra Dhatu Revival
              </h3>
              <p className="text-sm text-[#5C554E] mb-6 leading-relaxed">
                Nearly 45% of conception roadblocks stem from male factors. Our Shukra Dhatu therapies rebuild seminal density, forward motility, and DNA integrity.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0EAE1]">
                  <h5 className="font-bold text-sm text-[#1E1C1A] mb-1">Oligospermia (Low Sperm Count)</h5>
                  <p className="text-xs text-[#5C554E]">Significantly increasing total motile count from sub-10M to healthy fertile ranges (&gt;40M).</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0EAE1]">
                  <h5 className="font-bold text-sm text-[#1E1C1A] mb-1">Asthenozoospermia & Teratozoospermia</h5>
                  <p className="text-xs text-[#5C554E]">Reviving rapid progressive motility and repairing abnormal head/tail sperm morphology.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#F0EAE1]">
                  <h5 className="font-bold text-sm text-[#1E1C1A] mb-1">Testicular Heat & Oxidative Stress Detox</h5>
                  <p className="text-xs text-[#5C554E]">Neutralizing reactive oxygen species (ROS) and DNA fragmentation caused by desk lifestyle and stress.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => openBookingModal(CONSULTATION_TYPES[1])}
              className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Consult for Male Factor / Couple Care</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
