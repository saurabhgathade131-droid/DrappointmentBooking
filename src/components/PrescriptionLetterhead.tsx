import React from 'react';
import { useApp } from '../context/AppContext';
import { ClinicalPrescription } from '../types';
import { Printer, Download, Share2, X, Phone, Mail, MapPin, Calendar, Clock, AlertCircle, ShieldCheck } from 'lucide-react';

interface PrescriptionLetterheadProps {
  prescription: ClinicalPrescription;
  onClose?: () => void;
}

export const PrescriptionLetterhead: React.FC<PrescriptionLetterheadProps> = ({ prescription, onClose }) => {
  const { doctor, showToast } = useApp();

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Official Ayurvedic Prescription - Vedic Vaidya*\n` +
      `*Doctor:* ${doctor.fullName} (Reg: ${doctor.regNumber})\n` +
      `*Patient:* ${prescription.patientName} (${prescription.age} yrs)\n` +
      `*Prescription Ref:* ${prescription.id}\n` +
      `*Date:* ${prescription.consultationDate}\n` +
      `*Diagnosis:* ${prescription.clinicalDiagnosis}\n\n` +
      `*Prescribed Medicines:*\n` +
      prescription.medicines.map((m, i) => `${i + 1}. *${m.name}* (${m.form}) - ${m.dosage}, ${m.frequency} (${m.timing}) for ${m.durationDays} days`).join('\n') +
      `\n\n*Next Review Date:* ${prescription.nextFollowUpDate}\n` +
      `_Vedic Vaidya - Classical Ayurvedic Fertility Sanctum_`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
    showToast("Prescription details opened in WhatsApp");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Floating Print & Action Bar */}
      <div className="w-full max-w-4xl my-auto animate-scale-up">
        <div className="bg-white rounded-t-3xl p-4 border-b border-[#E8DFD5] flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#E8EFE9] text-emerald-800 font-bold text-xs font-mono">
              {prescription.id}
            </span>
            <span className="text-xs text-[#5C554E] hidden sm:inline">
              Official Medical Letterhead • Dr. Nagasri Tenneti
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors flex items-center gap-1.5 shadow-sm"
              title="Print or Save as PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print PDF</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-colors flex items-center gap-1.5 border border-emerald-200"
              title="Share on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share WhatsApp</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#1E1C1A] hover:bg-gray-200 flex items-center justify-center transition-colors ml-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Printable Formal Medical Letterhead Sheet (A4 Ratio) */}
        <div
          id="printablePrescriptionSheet"
          className="bg-white p-6 sm:p-10 shadow-2xl rounded-b-3xl text-[#1E1C1A] border-x border-b border-[#E8DFD5] max-h-[85vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none print:p-8"
        >
          {/* Top Copper & Sage Accent Ribbon */}
          <div className="h-2 w-full bg-gradient-to-r from-[#B86B43] via-[#D6855B] to-[#758A63] rounded-full mb-6" />

          {/* Letterhead Master Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-[#1E1C1A]/10 gap-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden p-0.5 border-2 border-[#B86B43]/30 bg-[#FAF7F2] shrink-0">
                <img
                  src="/assets/images/vedic-vaidya-logo.jpg"
                  alt="Vedic Vaidya Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-black tracking-tight text-[#1E1C1A] leading-none">
                  VEDIC <span className="text-[#B86B43]">VAIDYA</span>
                </h1>
                <p className="text-[11px] uppercase tracking-widest font-bold text-[#5C554E] mt-1">
                  Classical Ayurvedic Fertility &amp; Reproductive Sanctum
                </p>
                <p className="text-[10px] font-semibold text-[#B86B43] mt-0.5 italic">
                  “आरोग्यं परमं भाग्यं स्वास्थ्यं सर्वार्थसाधनम्”
                </p>
              </div>
            </div>

            {/* Doctor Credentials */}
            <div className="text-center sm:text-right space-y-1 text-xs">
              <h2 className="font-serif text-lg font-bold text-[#1E1C1A] leading-tight">
                {doctor.fullName}
              </h2>
              <p className="text-[#B86B43] font-bold text-[11px]">
                BAMS (Ayurvedacharya) • Reg No: {doctor.regNumber}
              </p>
              <p className="text-[11px] text-[#5C554E]">
                Former Senior Fertility Specialist at <strong>Gynoveda</strong>
              </p>
              <p className="text-[10px] text-[#5C554E]">
                Over 200+ Documented Natural Conceptions
              </p>
              <div className="text-[10px] text-[#5C554E] pt-1">
                <span>{doctor.contactPhone}</span> • <span>{doctor.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Patient Details Banner */}
          <div className="my-5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5C554E] block">Patient / Couple:</span>
              <strong className="text-[#1E1C1A] text-sm font-serif">{prescription.patientName}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5C554E] block">Age &amp; Gender:</span>
              <strong className="text-[#1E1C1A]">{prescription.age} yrs • {prescription.gender}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5C554E] block">Date of Consult:</span>
              <strong className="text-[#1E1C1A]">{prescription.consultationDate}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5C554E] block">Consultation Mode:</span>
              <strong className="text-[#B86B43]">{prescription.consultationMode}</strong>
            </div>
          </div>

          {/* Prakriti, Dosha & Vital Signs */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#E8DFD5]">
              <span className="text-[10px] uppercase font-bold text-[#5C554E] block mb-0.5">Prakriti &amp; Dosha State</span>
              <strong className="text-[#1E1C1A] block">{prescription.prakritiDosha.dominant}</strong>
              <span className="text-[10px] text-[#5C554E]">Agni: {prescription.prakritiDosha.agniState}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E8DFD5]">
              <span className="text-[10px] uppercase font-bold text-[#5C554E] block mb-0.5">Vitals / Nadi Pariksha</span>
              <span className="text-[#1E1C1A] block">{prescription.vitalSigns?.pulseNadi || 'Balanced Rhythm'}</span>
              <span className="text-[10px] text-[#5C554E]">BP: {prescription.vitalSigns?.bp || '120/80'} • Wt: {prescription.vitalSigns?.weight || '--'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E8DFD5]">
              <span className="text-[10px] uppercase font-bold text-[#5C554E] block mb-0.5">Dhatu Evaluation</span>
              <span className="text-[#1E1C1A] block font-medium">{prescription.prakritiDosha.dhatuImbalance}</span>
            </div>
          </div>

          {/* Clinical Diagnosis & Parameters */}
          <div className="mb-6 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-amber-900 uppercase tracking-wide text-[11px]">Clinical Diagnosis:</span>
              <span className="font-bold text-[#1E1C1A] text-sm">{prescription.clinicalDiagnosis}</span>
            </div>
            {prescription.fertilityParametersNote && (
              <p className="text-[#5C554E] text-xs leading-relaxed mt-1">
                <strong>Fertility Baseline &amp; Targets:</strong> {prescription.fertilityParametersNote}
              </p>
            )}
          </div>

          {/* Classical Rx Prescription Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-serif text-3xl font-bold text-[#B86B43]">℞</span>
              <h3 className="font-serif text-base font-bold text-[#1E1C1A] uppercase tracking-wider">
                Prescribed Ayurvedic Rasayanas &amp; Formulations
              </h3>
            </div>

            <div className="overflow-x-auto border border-[#E8DFD5] rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF7F2] border-b border-[#E8DFD5] text-[10px] font-bold uppercase tracking-wider text-[#5C554E]">
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">Medicine &amp; Formulation</th>
                    <th className="py-2.5 px-3">Dosage</th>
                    <th className="py-2.5 px-3">Frequency &amp; Anupana (Timing)</th>
                    <th className="py-2.5 px-3">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.medicines.map((med, index) => (
                    <tr key={med.id || index} className="border-b border-[#F0EAE1] hover:bg-[#FAF7F2]/40">
                      <td className="py-3 px-3 font-bold text-[#B86B43]">{index + 1}</td>
                      <td className="py-3 px-3">
                        <strong className="text-[#1E1C1A] block">{med.name}</strong>
                        <span className="text-[10px] text-[#5C554E]">{med.form}</span>
                        {med.instructions && (
                          <span className="block text-[10px] text-emerald-800 italic mt-0.5">
                            * {med.instructions}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-semibold text-[#1E1C1A]">{med.dosage}</td>
                      <td className="py-3 px-3">
                        <span className="block font-medium text-[#1E1C1A]">{med.frequency}</span>
                        <span className="text-[10px] text-[#5C554E]">{med.timing}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-[#B86B43]">{med.durationDays} Days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Tests */}
          {prescription.recommendedTests && prescription.recommendedTests.length > 0 && (
            <div className="mb-6 p-4 rounded-2xl bg-white border border-[#E8DFD5]">
              <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-[#1E1C1A] mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#B86B43]" />
                Recommended Diagnostic Tests
              </h4>
              <ul className="space-y-1.5 text-xs text-[#2C2724]">
                {prescription.recommendedTests.map((test, i) => (
                  <li key={i} className="flex items-baseline justify-between border-b border-[#F0EAE1] pb-1">
                    <span>
                      <strong>{i + 1}. {test.testName}</strong>
                      {test.purpose && <span className="text-[#5C554E] block text-[11px]">{test.purpose}</span>}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 uppercase">
                      {test.urgency}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Pathya / Apathya (Diet & Lifestyle Plan) */}
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#E8EFE9]/40 border border-[#D5E2D7]">
              <h4 className="font-bold text-[#1E1C1A] uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                Pathya (Foods to Include Daily)
              </h4>
              <ul className="space-y-1 text-[11px] text-[#2C2724]">
                {prescription.dietAndLifestyle.dietToInclude.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-700">✓</span> {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200/60">
              <h4 className="font-bold text-[#1E1C1A] uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                Apathya (Foods to Strictly Avoid)
              </h4>
              <ul className="space-y-1 text-[11px] text-[#2C2724]">
                {prescription.dietAndLifestyle.dietToAvoid.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600">✕</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lifestyle & Garbh Sanskar */}
          <div className="mb-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs">
            <h4 className="font-bold text-[#1E1C1A] uppercase tracking-wider text-[11px] mb-2">
              Dinacharya &amp; Yogic Pranayama Regimen:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#5C554E]">
              {prescription.dietAndLifestyle.lifestyleGuidance.map((item, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[#B86B43]">◆</span> {item}
                </div>
              ))}
            </div>
            {prescription.dietAndLifestyle.garbhSanskarNote && (
              <div className="mt-3 pt-2 border-t border-[#E8DFD5] text-[11px] text-emerald-900 italic font-medium">
                🕊️ <strong>Garbh Sanskar Note:</strong> {prescription.dietAndLifestyle.garbhSanskarNote}
              </div>
            )}
          </div>

          {/* Doctor Advice & Next Review */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DFD5] mb-8 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#B86B43] block">Doctor's Clinical Advice:</span>
              <p className="text-xs text-[#1E1C1A] italic mt-0.5">{prescription.doctorAdvice}</p>
            </div>
            <div className="shrink-0 p-3 bg-[#E8EFE9] rounded-xl text-center border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-900 block">Next Follow-Up Review:</span>
              <strong className="text-sm font-bold text-[#1E1C1A]">{prescription.nextFollowUpDate}</strong>
            </div>
          </div>

          {/* Footer Signature & Clinical Seal */}
          <div className="pt-6 border-t-2 border-[#1E1C1A]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-[#758A63] p-1 flex flex-col items-center justify-center text-center">
                <ShieldCheck className="w-5 h-5 text-[#758A63]" />
                <span className="text-[7px] font-bold uppercase text-[#758A63] mt-0.5 tracking-tight">VERIFIED CLINICAL SEAL</span>
              </div>
              <div className="text-[10px] text-[#5C554E] leading-relaxed">
                <span>Vedic Vaidya Wellness Sanctum, Pune</span><br />
                <span>Digitally Verified Ayurvedic Prescription Record</span>
              </div>
            </div>

            {/* Doctor Signature Block */}
            <div className="text-center sm:text-right">
              {/* Artistic Calligraphic Signature Representation */}
              <div className="font-serif italic text-2xl font-bold text-[#B86B43] tracking-wider mb-1 font-signature select-none">
                Dr. Nagasri Tenneti
              </div>
              <div className="text-xs font-bold text-[#1E1C1A]">{doctor.fullName}</div>
              <div className="text-[10px] text-[#5C554E]">BAMS (Ayurvedacharya) • Reg No: {doctor.regNumber}</div>
              <div className="text-[9px] text-[#5C554E]">Signed on: {prescription.doctorSignature.signedDate}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
