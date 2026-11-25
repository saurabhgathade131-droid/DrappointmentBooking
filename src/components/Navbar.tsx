import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, Calendar, Lock, Menu, X, ShieldCheck, Instagram, FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { openBookingModal, setIsAdminView, openPatientLookupModal, doctor } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notice Bar */}
      <div className="bg-[#1E1C1A] text-[#FAF7F2] py-2 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-[#D6855B]">200+ Documented Conceptions:</span>
            <span className="opacity-90">{doctor.name} (BAMS, Ex-Gynoveda) • {doctor.sanskritShloka}</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-xs">
            <button
              onClick={openPatientLookupModal}
              className="flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition-colors bg-white/10 px-2.5 py-0.5 rounded-full"
            >
              <FileText className="w-3 h-3 text-emerald-400" /> Download Prescription
            </button>
            <a
              href={doctor.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-[#D6855B] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-rose-400" /> {doctor.instagramHandle}
            </a>
            <a href={`tel:${doctor.contactPhone}`} className="flex items-center gap-1.5 hover:text-[#D6855B] transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-[#B86B43]" /> {doctor.contactPhone}
            </a>
            <button
              onClick={() => setIsAdminView(true)}
              className="flex items-center gap-1.5 text-xs text-[#D6855B] hover:text-white transition-colors bg-white/10 px-2.5 py-0.5 rounded-full"
            >
              <ShieldCheck className="w-3 h-3" /> Doctor Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b border-[#E8DFD5]/60 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-soft py-3' : 'bg-[#FAF7F2]/90 backdrop-blur-md py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo with Botanical Laurel Wreath & Mortar-Pestle */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-13 h-13 rounded-full overflow-hidden p-0.5 bg-white border border-[#E8DFD5] shadow-sm flex items-center justify-center group-hover:border-[#B86B43] transition-colors shrink-0">
              <img
                src="/assets/images/vedic-vaidya-logo.jpg"
                alt="Vedic Vaidya Logo"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div>
              <span className="font-serif text-2xl font-black tracking-tight text-[#1E1C1A] block leading-none">
                Vedic <span className="text-copper-gradient font-normal">Vaidya</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#5C554E] block mt-1">
                By Dr. Nagasri Tenneti (BAMS)
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#5C554E]">
            <a href="#aboutSection" className="hover:text-[#B86B43] transition-colors">About Dr. Nagasri</a>
            <a href="#expertiseSection" className="hover:text-[#B86B43] transition-colors">Fertility Pathways</a>
            <a href="#statsSection" className="hover:text-[#B86B43] transition-colors">Track Record</a>
            <a href="#instagramSection" className="hover:text-[#B86B43] transition-colors flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5 text-rose-500" /> Instagram Reels
            </a>
            <a href="#mediaSection" className="hover:text-[#B86B43] transition-colors">TV Interviews</a>
            <a href="#testimonialsSection" className="hover:text-[#B86B43] transition-colors">Success Stories</a>
            <a href="#pricingSection" className="hover:text-[#B86B43] transition-colors">Packages</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openPatientLookupModal}
              className="px-4 py-2.5 rounded-xl border border-[#E8DFD5] bg-white text-xs font-bold text-[#1E1C1A] hover:border-[#B86B43] hover:text-[#B86B43] transition-colors flex items-center gap-1.5"
              title="Lookup your prescription or booking"
            >
              <FileText className="w-4 h-4 text-[#B86B43]" />
              <span>Prescription PDF</span>
            </button>
            <button
              onClick={() => setIsAdminView(true)}
              className="p-2.5 rounded-xl border border-[#E8DFD5] bg-white text-[#5C554E] hover:text-[#B86B43] hover:border-[#B86B43] transition-colors"
              title="Doctor Admin Access"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => openBookingModal()}
              className="px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-copper-gradient hover:opacity-95 shadow-copper transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[#1E1C1A] hover:bg-white border border-[#E8DFD5]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-[#F0EAE1]">
              <div className="flex items-center gap-2">
                <img src="/assets/images/vedic-vaidya-logo.jpg" alt="Vedic Vaidya" className="w-9 h-9 rounded-full object-cover" />
                <span className="font-serif font-bold text-lg text-[#1E1C1A]">Vedic Vaidya</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#1E1C1A]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4 py-6 text-sm font-semibold text-[#2C2724]">
              <a href="#aboutSection" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-50">About Dr. Nagasri Tenneti</a>
              <a href="#expertiseSection" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-50">Fertility Pathways</a>
              <a href="#statsSection" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-50">Track Record</a>
              <a href="#instagramSection" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-50 flex items-center gap-1.5 text-rose-600">
                <Instagram className="w-4 h-4" /> Instagram Reels (@vedic_vd)
              </a>
              <a href="#mediaSection" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-50">TV Interviews</a>
              <a href="#testimonialsSection" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-50">Success Stories</a>
              <a href="#pricingSection" onClick={() => setIsMobileMenuOpen(false)} className="py-2 border-b border-gray-50">Packages</a>
              
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openPatientLookupModal();
                }}
                className="py-2 text-emerald-800 font-bold flex items-center gap-2 text-left"
              >
                <FileText className="w-4 h-4 text-emerald-600" /> Download Prescription PDF
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdminView(true);
                }}
                className="py-2 text-[#B86B43] flex items-center gap-2 text-left"
              >
                <ShieldCheck className="w-4 h-4" /> Doctor Admin Portal
              </button>
            </div>
          </div>
          <div className="pt-6 border-t border-[#F0EAE1]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full py-3.5 rounded-xl text-center font-bold text-xs uppercase tracking-wider text-white bg-copper-gradient shadow-copper mb-3"
            >
              Book Appointment
            </button>
            <a href={`tel:${doctor.contactPhone}`} className="flex items-center justify-center gap-2 text-xs font-semibold text-[#5C554E]">
              <PhoneCall className="w-3.5 h-3.5 text-[#B86B43]" /> {doctor.contactPhone}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
