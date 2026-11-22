import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, Shield, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const { doctor, setIsAdminView } = useApp();

  return (
    <footer className="bg-[#1E1C1A] text-[#FAF7F2] pt-16 pb-12 border-t border-[#2C2724]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 flex items-center justify-center shrink-0">
                <img src="/assets/images/vedic-vaidya-logo.jpg" alt="Vedic Vaidya Logo" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white tracking-tight">Vedic Vaidya</span>
                <span className="text-[10px] uppercase tracking-widest text-[#D6855B] block">Classical Fertility Sanctum</span>
              </div>
            </div>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed">
              Led by {doctor.name} (BAMS, ex-Gynoveda Senior Fertility Doctor). Empowering couples with clinically documented natural conceptions across male and female reproductive factors.
            </p>
            <p className="text-xs font-semibold text-[#D6855B]">
              {doctor.sanskritShloka}
            </p>
            <div className="text-xs text-[#D6855B] font-semibold">
              Official UPI: <span className="font-mono text-white">{doctor.upiId}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#aboutSection" className="hover:text-[#D6855B] transition-colors">About {doctor.name}</a></li>
              <li><a href="#expertiseSection" className="hover:text-[#D6855B] transition-colors">Male &amp; Female Fertility</a></li>
              <li><a href="#statsSection" className="hover:text-[#D6855B] transition-colors">200+ Conception Milestones</a></li>
              <li><a href="#instagramSection" className="hover:text-[#D6855B] transition-colors">Instagram Reels ({doctor.instagramHandle})</a></li>
              <li><a href="#mediaSection" className="hover:text-[#D6855B] transition-colors">TV Interviews &amp; Summits</a></li>
              <li><a href="#pricingSection" className="hover:text-[#D6855B] transition-colors">Consultation Packages</a></li>
            </ul>
          </div>

          {/* Clinic & Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider">Sanctum Address &amp; Social</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              {doctor.clinicAddress}
            </p>
            <div className="pt-2 text-xs space-y-1.5">
              <a
                href={doctor.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#D6855B] hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram: {doctor.instagramHandle}
              </a>
              <div className="flex items-center gap-2 text-white/90">
                <Phone className="w-3.5 h-3.5 text-[#D6855B]" /> {doctor.contactPhone}
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Mail className="w-3.5 h-3.5 text-[#D6855B]" /> {doctor.contactEmail}
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => setIsAdminView(true)}
                className="inline-flex items-center gap-2 text-[11px] font-bold text-[#D6855B] hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
              >
                <Shield className="w-3.5 h-3.5" /> Doctor &amp; Admin Access Portal
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>© 2024-2026 Vedic Vaidya. All rights reserved. Dr. Nagasri Tenneti (BAMS).</p>
          <p className="text-right">Ayurvedic guidance is complementary to clinical health records. No synthetic steroids or invasive drugs used.</p>
        </div>
      </div>
    </footer>
  );
};
