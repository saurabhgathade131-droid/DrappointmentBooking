import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsSection } from './components/StatsSection';
import { AboutDoctor } from './components/AboutDoctor';
import { FertilityPathways } from './components/FertilityPathways';
import { InstagramReels } from './components/InstagramReels';
import { MediaInterviews } from './components/MediaInterviews';
import { Testimonials } from './components/Testimonials';
import { PricingPackages } from './components/PricingPackages';
import { Footer } from './components/Footer';
import { BookingWizardModal } from './components/BookingWizardModal';
import { AdminPortal } from './components/AdminPortal';
import { PrescriptionLetterhead } from './components/PrescriptionLetterhead';
import { PatientLookupModal } from './components/PatientLookupModal';
import { Toast } from './components/Toast';

export const App: React.FC = () => {
  const { isAdminView, activePrescription, closePrescriptionModal } = useApp();

  if (isAdminView) {
    return (
      <>
        <AdminPortal />
        {activePrescription && (
          <PrescriptionLetterhead
            prescription={activePrescription}
            onClose={closePrescriptionModal}
          />
        )}
        <Toast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1C1A]">
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <AboutDoctor />
        <FertilityPathways />
        <InstagramReels />
        <MediaInterviews />
        <Testimonials />
        <PricingPackages />
      </main>
      <Footer />
      <BookingWizardModal />
      <PatientLookupModal />
      {activePrescription && (
        <PrescriptionLetterhead
          prescription={activePrescription}
          onClose={closePrescriptionModal}
        />
      )}
      <Toast />
    </div>
  );
};
