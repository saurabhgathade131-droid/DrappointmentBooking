import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Appointment, ClinicalPrescription, PrescribedMedicine, RecommendedTest } from '../types';
import { COMMON_AYURVEDIC_MEDICINES, COMMON_RECOMMENDED_TESTS } from '../data/initialData';
import { X, Plus, Trash2, CheckCircle, Sparkles, FileText } from 'lucide-react';

interface PrescriptionBuilderModalProps {
  appointment: Appointment;
  onClose: () => void;
  onSaved: (prescription: ClinicalPrescription) => void;
}

export const PrescriptionBuilderModal: React.FC<PrescriptionBuilderModalProps> = ({
  appointment,
  onClose,
  onSaved
}) => {
  const { doctor, savePrescription, showToast } = useApp();

  const existing = appointment.prescription;

  // Form State
  const [diagnosis, setDiagnosis] = useState(existing?.clinicalDiagnosis || appointment.concernDetails || 'Female & Male Factor Fertility Assessment');
  const [fertilityNotes, setFertilityNotes] = useState(existing?.fertilityParametersNote || 'Baseline AMH & Semen Analysis assessment completed.');
  const [dominantDosha, setDominantDosha] = useState<ClinicalPrescription['prakritiDosha']['dominant']>(
    existing?.prakritiDosha.dominant || 'Vata-Pitta'
  );
  const [agniState, setAgniState] = useState<ClinicalPrescription['prakritiDosha']['agniState']>(
    existing?.prakritiDosha.agniState || 'Vishamagni'
  );
  const [dhatuImbalance, setDhatuImbalance] = useState(
    existing?.prakritiDosha.dhatuImbalance || 'Artava Vaha Srotas Avarodha & Shukra Dhatu Mandata'
  );
  const [bp, setBp] = useState(existing?.vitalSigns?.bp || '120/80');
  const [pulseNadi, setPulseNadi] = useState(existing?.vitalSigns?.pulseNadi || 'Pitta-Vata Nadi');

  // Medicines
  const [medicines, setMedicines] = useState<PrescribedMedicine[]>(
    existing?.medicines || [
      {
        id: 'med-1',
        name: 'Phala Ghrita',
        form: 'Ghrita / Medicated Ghee',
        dosage: '1 tablespoon (10g)',
        frequency: 'Twice daily',
        timing: 'Empty stomach morning & bedtime with warm cow milk',
        durationDays: 60,
        instructions: 'Nourishes uterine endometrium and oocyte quality'
      },
      {
        id: 'med-2',
        name: 'Shatavari Gulam',
        form: 'Lehyam / Herbal Paste',
        dosage: '1 teaspoon (5g)',
        frequency: 'Twice daily',
        timing: '30 mins after meals with warm water',
        durationDays: 60,
        instructions: 'Restores natural ovulatory rhythm'
      }
    ]
  );

  // Tests
  const [recommendedTests, setRecommendedTests] = useState<RecommendedTest[]>(
    existing?.recommendedTests || [
      {
        id: 't-1',
        testName: 'Transvaginal Ultrasound (Folliculometry Day 12-14)',
        urgency: 'Before Next Cycle',
        purpose: 'Evaluate follicular maturation and endometrial lining'
      }
    ]
  );

  // Diet & Lifestyle
  const [dietIncludeText, setDietIncludeText] = useState(
    existing?.dietAndLifestyle.dietToInclude.join('\n') ||
    'Soaked almonds (5) & walnuts (2) daily\nFresh pomegranate and figs\nPure A2 Cow Ghee (1 tsp with meals)\nWarm milk with pinch of turmeric & saffron at night'
  );

  const [dietAvoidText, setDietAvoidText] = useState(
    existing?.dietAndLifestyle.dietToAvoid.join('\n') ||
    'Refined white sugar and maida bakery goods\nDeep fried snacks and packaged foods\nExcess sour, stale or fermented items\nExcess tea and carbonated drinks'
  );

  const [lifestyleText, setLifestyleText] = useState(
    existing?.dietAndLifestyle.lifestyleGuidance.join('\n') ||
    'Sleep by 10:30 PM strictly to optimize melatonin and hormones\nDaily 20 mins Anulom Vilom and Bhramari Pranayama\nLower abdominal warm sesame oil Abhyanga massage twice weekly'
  );

  const [doctorAdvice, setDoctorAdvice] = useState(
    existing?.doctorAdvice ||
    'Follow medicines regularly without skipping. Avoid chronic stress. Natural gamete revitalization cycle requires 60 to 90 continuous days.'
  );

  const nextMonthStr = new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0];
  const [nextFollowUpDate, setNextFollowUpDate] = useState(existing?.nextFollowUpDate || nextMonthStr);

  // Add Medicine Item
  const handleAddMedicine = (preset?: typeof COMMON_AYURVEDIC_MEDICINES[0]) => {
    const newMed: PrescribedMedicine = {
      id: `med-${Date.now()}-${Math.floor(Math.random() * 100)}`,
      name: preset?.name || 'Custom Formulation',
      form: preset?.form || 'Vati / Tablets',
      dosage: preset?.dosage || '1 tablet',
      frequency: 'Twice daily',
      timing: preset?.timing || 'After meals with warm water',
      durationDays: preset?.durationDays || 60,
      instructions: ''
    };
    setMedicines([...medicines, newMed]);
  };

  const handleRemoveMedicine = (id: string) => {
    setMedicines(medicines.filter(m => m.id !== id));
  };

  const handleUpdateMedicine = (id: string, field: keyof PrescribedMedicine, value: any) => {
    setMedicines(medicines.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  // Add Test Item
  const handleAddTest = (testName = 'Serum AMH Level') => {
    const newTest: RecommendedTest = {
      id: `test-${Date.now()}`,
      testName,
      urgency: 'Routine',
      purpose: 'Clinical diagnostic baseline'
    };
    setRecommendedTests([...recommendedTests, newTest]);
  };

  const handleRemoveTest = (id: string) => {
    setRecommendedTests(recommendedTests.filter(t => t.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (medicines.length === 0) {
      showToast('Please add at least one prescribed medicine', 'error');
      return;
    }

    const prescriptionId = existing?.id || `RX-VV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPrescription: ClinicalPrescription = {
      id: prescriptionId,
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      age: appointment.age,
      gender: appointment.concernType === 'both' ? 'Couple' : appointment.concernType === 'female' ? 'Female' : 'Male',
      consultationDate: new Date().toISOString().split('T')[0],
      consultationMode: appointment.consultationType.includes('Video') ? 'Video Consultation' : 'In-Clinic Personal Consultation',
      vitalSigns: {
        bp,
        pulseNadi
      },
      prakritiDosha: {
        dominant: dominantDosha,
        agniState,
        dhatuImbalance
      },
      clinicalDiagnosis: diagnosis,
      fertilityParametersNote: fertilityNotes,
      medicines,
      recommendedTests,
      dietAndLifestyle: {
        dietToInclude: dietIncludeText.split('\n').filter(s => s.trim().length > 0),
        dietToAvoid: dietAvoidText.split('\n').filter(s => s.trim().length > 0),
        lifestyleGuidance: lifestyleText.split('\n').filter(s => s.trim().length > 0),
        garbhSanskarNote: 'Conscious positive visualization and peaceful environment for pre-conception readiness.'
      },
      doctorAdvice,
      nextFollowUpDate,
      doctorSignature: {
        doctorName: doctor.name,
        qualification: doctor.title,
        regNumber: doctor.regNumber,
        signedDate: new Date().toISOString().split('T')[0]
      }
    };

    savePrescription(appointment.id, newPrescription);
    onSaved(newPrescription);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden my-6 animate-scale-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#FAF7F2] p-5 border-b border-[#E8DFD5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#E8DFD5] flex items-center justify-center">
              <img src="/assets/images/vedic-vaidya-logo.jpg" alt="Vedic Vaidya" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1E1C1A]">
                Ayurvedic Consultation Desk &amp; Prescription Builder
              </h3>
              <p className="text-xs text-[#5C554E]">
                Patient: <strong className="text-[#1E1C1A]">{appointment.patientName}</strong> ({appointment.id})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-[#1E1C1A]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 text-xs flex-grow">
          
          {/* Patient Baseline & Clinical Diagnosis */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#B86B43] flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> 1. Clinical Diagnosis &amp; Fertility Baseline
            </h4>

            <div>
              <label className="block text-[11px] font-bold text-[#1E1C1A] mb-1">
                Primary Clinical Diagnosis *
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
                placeholder="e.g. PCOS with Anovulatory Cycles & Low Progressive Sperm Motility"
                className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-white focus:outline-none focus:border-[#B86B43]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1E1C1A] mb-1">
                Fertility Baseline &amp; Follicular / Semen Notes
              </label>
              <textarea
                rows={2}
                value={fertilityNotes}
                onChange={e => setFertilityNotes(e.target.value)}
                placeholder="e.g. Endometrial thickness 6.2mm, AMH 5.8 ng/mL, Sperm count 18 M/ml..."
                className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-white focus:outline-none focus:border-[#B86B43]"
              />
            </div>

            {/* Dosha & Prakriti */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-[#5C554E] mb-1">Dominant Dosha</label>
                <select
                  value={dominantDosha}
                  onChange={e => setDominantDosha(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-[#E8DFD5] bg-white"
                >
                  <option value="Vata-Pitta">Vata-Pitta</option>
                  <option value="Pitta-Kapha">Pitta-Kapha</option>
                  <option value="Vata-Kapha">Vata-Kapha</option>
                  <option value="Tridoshic">Tridoshic</option>
                  <option value="Vata">Vata</option>
                  <option value="Pitta">Pitta</option>
                  <option value="Kapha">Kapha</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#5C554E] mb-1">Agni State</label>
                <select
                  value={agniState}
                  onChange={e => setAgniState(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-[#E8DFD5] bg-white"
                >
                  <option value="Vishamagni">Vishamagni (Irregular)</option>
                  <option value="Mandagni">Mandagni (Sluggish)</option>
                  <option value="Tikshnagni">Tikshnagni (Hyper-metabolic)</option>
                  <option value="Samagni">Samagni (Balanced)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#5C554E] mb-1">Nadi / Pulse Rhythm</label>
                <input
                  type="text"
                  value={pulseNadi}
                  onChange={e => setPulseNadi(e.target.value)}
                  placeholder="e.g. Pitta-Vata Nadi"
                  className="w-full p-2 rounded-xl border border-[#E8DFD5] bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#5C554E] mb-1">Dhatu Imbalance</label>
                <input
                  type="text"
                  value={dhatuImbalance}
                  onChange={e => setDhatuImbalance(e.target.value)}
                  placeholder="e.g. Shukra / Artava Dushti"
                  className="w-full p-2 rounded-xl border border-[#E8DFD5] bg-white"
                />
              </div>
            </div>
          </div>

          {/* Prescribed Ayurvedic Medicines */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8DFD5] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#B86B43] flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold">℞</span> 2. Prescribed Ayurvedic Formulations &amp; Medicines
              </h4>
              <button
                type="button"
                onClick={() => handleAddMedicine()}
                className="px-3 py-1.5 rounded-xl bg-[#1E1C1A] text-white text-[11px] font-bold hover:bg-[#B86B43] transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> Add Medicine
              </button>
            </div>

            {/* Quick-Add Pill Presets */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
              <span className="text-[#5C554E] font-bold">Quick Presets:</span>
              {COMMON_AYURVEDIC_MEDICINES.slice(0, 6).map(preset => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleAddMedicine(preset)}
                  className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E8DFD5] hover:border-[#B86B43] text-[#1E1C1A] font-semibold"
                >
                  + {preset.name}
                </button>
              ))}
            </div>

            {/* Medicines List */}
            <div className="space-y-3">
              {medicines.map((med, index) => (
                <div key={med.id} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#B86B43]">#{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(med.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <div>
                      <label className="block text-[10px] text-[#5C554E] mb-0.5">Medicine Name</label>
                      <input
                        type="text"
                        value={med.name}
                        onChange={e => handleUpdateMedicine(med.id, 'name', e.target.value)}
                        className="w-full p-2 rounded-lg border border-[#E8DFD5] bg-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#5C554E] mb-0.5">Formulation</label>
                      <input
                        type="text"
                        value={med.form}
                        onChange={e => handleUpdateMedicine(med.id, 'form', e.target.value)}
                        placeholder="e.g. Ghrita, Vati, Kwath"
                        className="w-full p-2 rounded-lg border border-[#E8DFD5] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#5C554E] mb-0.5">Dosage</label>
                      <input
                        type="text"
                        value={med.dosage}
                        onChange={e => handleUpdateMedicine(med.id, 'dosage', e.target.value)}
                        placeholder="e.g. 1 tbsp, 2 tablets"
                        className="w-full p-2 rounded-lg border border-[#E8DFD5] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#5C554E] mb-0.5">Duration (Days)</label>
                      <input
                        type="number"
                        value={med.durationDays}
                        onChange={e => handleUpdateMedicine(med.id, 'durationDays', Number(e.target.value))}
                        className="w-full p-2 rounded-lg border border-[#E8DFD5] bg-white font-bold text-[#B86B43]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-[#5C554E] mb-0.5">Timing &amp; Anupana (Carrier)</label>
                      <input
                        type="text"
                        value={med.timing}
                        onChange={e => handleUpdateMedicine(med.id, 'timing', e.target.value)}
                        placeholder="e.g. Empty stomach with warm milk"
                        className="w-full p-2 rounded-lg border border-[#E8DFD5] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#5C554E] mb-0.5">Special Clinical Instructions</label>
                      <input
                        type="text"
                        value={med.instructions || ''}
                        onChange={e => handleUpdateMedicine(med.id, 'instructions', e.target.value)}
                        placeholder="e.g. Uterine lining nourishment"
                        className="w-full p-2 rounded-lg border border-[#E8DFD5] bg-white text-emerald-800"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Tests */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#1E1C1A]">
                3. Recommended Diagnostic Laboratory Tests
              </h4>
              <button
                type="button"
                onClick={() => handleAddTest()}
                className="px-3 py-1 rounded-xl bg-white border border-[#E8DFD5] hover:border-[#B86B43] text-[11px] font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Test
              </button>
            </div>

            <div className="flex flex-wrap gap-1 text-[10px]">
              {COMMON_RECOMMENDED_TESTS.slice(0, 4).map(test => (
                <button
                  key={test}
                  type="button"
                  onClick={() => handleAddTest(test)}
                  className="px-2 py-0.5 rounded-md bg-white border border-[#E8DFD5] hover:border-[#B86B43]"
                >
                  + {test.split('(')[0]}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {recommendedTests.map((t, idx) => (
                <div key={t.id} className="flex items-center gap-2 p-2 rounded-xl bg-white border border-[#E8DFD5]">
                  <input
                    type="text"
                    value={t.testName}
                    onChange={e => {
                      const updated = [...recommendedTests];
                      updated[idx].testName = e.target.value;
                      setRecommendedTests(updated);
                    }}
                    className="flex-grow p-1.5 rounded-lg border border-transparent hover:border-[#E8DFD5] font-semibold"
                  />
                  <select
                    value={t.urgency}
                    onChange={e => {
                      const updated = [...recommendedTests];
                      updated[idx].urgency = e.target.value as any;
                      setRecommendedTests(updated);
                    }}
                    className="p-1.5 rounded-lg border border-[#E8DFD5] text-[10px]"
                  >
                    <option value="Routine">Routine</option>
                    <option value="Before Next Cycle">Before Next Cycle</option>
                    <option value="Immediate">Immediate</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveTest(t.id)}
                    className="text-rose-500 hover:text-rose-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pathya & Apathya (Diet & Lifestyle) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <label className="block font-bold text-[#1E1C1A] text-[11px] mb-1">
                Pathya (Foods to Include Daily - 1 per line)
              </label>
              <textarea
                rows={4}
                value={dietIncludeText}
                onChange={e => setDietIncludeText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-emerald-200 bg-white"
              />
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
              <label className="block font-bold text-[#1E1C1A] text-[11px] mb-1">
                Apathya (Foods to Strictly Avoid - 1 per line)
              </label>
              <textarea
                rows={4}
                value={dietAvoidText}
                onChange={e => setDietAvoidText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-rose-200 bg-white"
              />
            </div>
          </div>

          {/* Lifestyle & Next Review */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1E1C1A] text-[11px] mb-1">
                Lifestyle &amp; Pranayama Regimen (1 per line)
              </label>
              <textarea
                rows={3}
                value={lifestyleText}
                onChange={e => setLifestyleText(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-white"
              />
            </div>
            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#1E1C1A] text-[11px] mb-1">
                  Doctor's Clinical Closing Advice
                </label>
                <textarea
                  rows={2}
                  value={doctorAdvice}
                  onChange={e => setDoctorAdvice(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-white"
                />
              </div>
              <div>
                <label className="block font-bold text-[#1E1C1A] text-[11px] mb-1">
                  Next Follow-Up Review Date *
                </label>
                <input
                  type="date"
                  value={nextFollowUpDate}
                  onChange={e => setNextFollowUpDate(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#E8DFD5] bg-white font-bold"
                  required
                />
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#5C554E] hover:text-[#1E1C1A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-copper-gradient shadow-copper hover:opacity-95 transition-all flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Save &amp; Generate Official Prescription Letterhead</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
