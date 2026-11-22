import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CONSULTATION_TYPES } from '../data/initialData';
import { Appointment } from '../types';
import { X, Check, ChevronRight, ChevronLeft, Copy, Smartphone, CheckCircle, MessageCircle, Calendar as CalendarIcon, Info } from 'lucide-react';

export const BookingWizardModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    selectedPackageForBooking,
    doctor,
    getAvailableSlots,
    blockedDates,
    addAppointment,
    showToast
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPackage, setSelectedPackage] = useState(selectedPackageForBooking || CONSULTATION_TYPES[0]);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('31');
  const [city, setCity] = useState('Pune');
  const [concernType, setConcernType] = useState<'female' | 'male' | 'both'>('both');
  const [concernDetails, setConcernDetails] = useState('');

  // Calendar State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(tomorrowStr);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());

  // Payment State
  const [utrNumber, setUtrNumber] = useState('');
  const [confirmedPass, setConfirmedPass] = useState<Appointment | null>(null);

  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (selectedPackageForBooking) {
      setSelectedPackage(selectedPackageForBooking);
    }
  }, [selectedPackageForBooking]);

  // Render QR Code on canvas
  useEffect(() => {
    if (step === 3 && qrCanvasRef.current) {
      drawUpiQrCode(qrCanvasRef.current);
    }
  }, [step, selectedPackage, doctor]);

  if (!isBookingModalOpen) return null;

  const drawUpiQrCode = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = canvas.width;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    const upiUri = `upi://pay?pa=${encodeURIComponent(doctor.upiId)}&pn=${encodeURIComponent(doctor.name)}&am=${selectedPackage.price}&cu=INR&tn=${encodeURIComponent('VaidyaVeda-Consult')}`;

    // Draw finder patterns
    const drawFinder = (x: number, y: number) => {
      ctx.fillStyle = '#1E1C1A';
      ctx.fillRect(x, y, 48, 48);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(x + 8, y + 8, 32, 32);
      ctx.fillStyle = '#B86B43';
      ctx.fillRect(x + 16, y + 16, 16, 16);
    };

    drawFinder(15, 15);
    drawFinder(size - 63, 15);
    drawFinder(15, size - 63);

    // Decorative geometric matrix
    let seed = 42;
    for (let i = 0; i < upiUri.length; i++) {
      seed = (seed * 31 + upiUri.charCodeAt(i)) % 99999;
    }

    const dotSize = 8;
    for (let x = 15; x < size - 15; x += dotSize) {
      for (let y = 15; y < size - 15; y += dotSize) {
        if ((x < 75 && y < 75) || (x > size - 80 && y < 75) || (x < 75 && y > size - 80)) continue;
        seed = (seed * 9301 + 49297) % 233280;
        if (seed / 233280 > 0.45) {
          ctx.fillStyle = x > size / 2 && y > size / 2 ? '#B86B43' : '#1E1C1A';
          ctx.fillRect(x, y, dotSize - 1.5, dotSize - 1.5);
        }
      }
    }

    // Monogram V&D center badge
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#B86B43';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.fillStyle = '#B86B43';
    ctx.font = "bold 13px 'Playfair Display', serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('V • D', size / 2, size / 2);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(doctor.upiId);
    showToast(`Copied UPI ID: ${doctor.upiId}`);
  };

  const validateStep1 = () => {
    if (!patientName.trim()) {
      showToast('Please enter patient or couple name', 'error');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    setStep(2);
  };

  const validateStep2 = () => {
    if (!selectedSlot) {
      showToast('Please select an available consultation slot', 'error');
      return;
    }
    setStep(3);
  };

  const handleConfirmBooking = () => {
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      showToast('Please enter the 12-digit UPI UTR / Reference number from your payment app', 'error');
      return;
    }

    const appointmentId = `VV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: Appointment = {
      id: appointmentId,
      patientName,
      phone,
      email: email || `${patientName.toLowerCase().replace(/\s+/g, '')}@patient.in`,
      city: city || 'Pune',
      age: age || 30,
      concernType,
      concernDetails: concernDetails || 'Fertility consultation regarding natural conception roadmap.',
      consultationType: selectedPackage.name,
      consultationPrice: selectedPackage.price,
      date: selectedDate,
      timeSlot: selectedSlot || '11:00 AM',
      paymentMode: 'UPI',
      utrNumber: utrNumber.trim(),
      paymentStatus: 'Pending Verification',
      status: 'Pending',
      doctorNotes: 'New booking via website. Awaiting initial record submission.',
      createdAt: new Date().toISOString()
    };

    addAppointment(newAppointment);
    setConfirmedPass(newAppointment);
    setStep(4);
  };

  // Calendar calculations
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
  const totalDays = new Date(calYear, calMonth + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const availableSlots = getAvailableSlots(selectedDate);

  const upiIntentUri = `upi://pay?pa=${encodeURIComponent(doctor.upiId)}&pn=${encodeURIComponent(doctor.name)}&am=${selectedPackage.price}&cu=INR&tn=${encodeURIComponent('VaidyaVeda')}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#FAF7F2] p-6 border-b border-[#E8DFD5]">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#E8DFD5] shadow-sm">
                <img src="/assets/images/logo.svg" alt="Vaidya Veda" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1E1C1A]">Book Doctor Consultation</h3>
                <p className="text-xs text-[#5C554E]">Dr. Nageshree (BAMS, Ayurvedic Fertility Specialist)</p>
              </div>
            </div>
            <button
              onClick={closeBookingModal}
              className="w-9 h-9 rounded-full bg-white text-[#5C554E] hover:text-[#1E1C1A] hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 1 ? 'bg-[#B86B43] text-white ring-4 ring-[#B86B43]/20' :
                step > 1 ? 'bg-emerald-600 text-white' : 'bg-[#F0E6DE] text-[#5C554E]'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className={`text-xs ${step === 1 ? 'font-bold text-[#1E1C1A]' : 'text-[#5C554E]'}`}>Details</span>
            </div>

            <div className="flex-grow h-0.5 bg-[#E8DFD5] mx-2" />

            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 2 ? 'bg-[#B86B43] text-white ring-4 ring-[#B86B43]/20' :
                step > 2 ? 'bg-emerald-600 text-white' : 'bg-[#F0E6DE] text-[#5C554E]'
              }`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className={`text-xs ${step === 2 ? 'font-bold text-[#1E1C1A]' : 'text-[#5C554E]'}`}>Date &amp; Slot</span>
            </div>

            <div className="flex-grow h-0.5 bg-[#E8DFD5] mx-2" />

            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === 3 ? 'bg-[#B86B43] text-white ring-4 ring-[#B86B43]/20' :
                step === 4 ? 'bg-emerald-600 text-white' : 'bg-[#F0E6DE] text-[#5C554E]'
              }`}>
                {step === 4 ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <span className={`text-xs ${step === 3 ? 'font-bold text-[#1E1C1A]' : 'text-[#5C554E]'}`}>UPI Payment</span>
            </div>
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1C1A] mb-2">
                1. Select Consultation Format
              </label>
              <div className="space-y-2.5">
                {CONSULTATION_TYPES.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                      selectedPackage.id === pkg.id
                        ? 'border-[#B86B43] bg-[#E8EFE9]/40 ring-2 ring-[#B86B43]/20'
                        : 'border-[#E8DFD5] bg-white hover:border-[#B86B43]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-serif font-bold text-sm text-[#1E1C1A]">{pkg.name}</span>
                        <span className="text-xs text-[#5C554E] block">{pkg.duration} • {pkg.badge}</span>
                      </div>
                      <span className="font-extrabold text-[#B86B43] text-base">₹{pkg.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1C1A] mb-2">
                2. Patient / Couple Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#5C554E] mb-1">Full Name (or Couple Names) *</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    placeholder="e.g. Pooja & Rohan Kulkarni"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs sm:text-sm focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5C554E] mb-1">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98221 12345"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs sm:text-sm focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#5C554E] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs sm:text-sm focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-[#5C554E] mb-1">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={e => setAge(e.target.value)}
                      placeholder="e.g. 31"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs sm:text-sm focus:outline-none focus:border-[#B86B43]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5C554E] mb-1">City / Country</label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Pune"
                      className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs sm:text-sm focus:outline-none focus:border-[#B86B43]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1C1A] mb-2">
                3. Primary Fertility Concern
              </label>
              <div className="grid grid-cols-3 gap-2.5 mb-3 text-xs">
                {(['female', 'male', 'both'] as const).map(type => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                      concernType === type ? 'border-[#B86B43] bg-[#E8EFE9]/30' : 'border-[#E8DFD5] bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="concernType"
                      value={type}
                      checked={concernType === type}
                      onChange={() => setConcernType(type)}
                      className="accent-[#B86B43]"
                    />
                    <span className="font-medium text-[#1E1C1A] capitalize">
                      {type === 'female' ? 'Female (PCOS/AMH)' : type === 'male' ? 'Male (Sperm Factor)' : 'Both / Couple'}
                    </span>
                  </label>
                ))}
              </div>
              <textarea
                rows={2}
                value={concernDetails}
                onChange={e => setConcernDetails(e.target.value)}
                placeholder="Brief note: Years trying to conceive, prior IUI/IVF cycles or current symptoms..."
                className="w-full p-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#B86B43]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end">
              <button
                onClick={validateStep1}
                className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors flex items-center gap-2"
              >
                <span>Proceed to Select Date &amp; Slot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
              
              {/* Calendar */}
              <div className="sm:col-span-7 bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFD5]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-serif font-bold text-base text-[#1E1C1A]">
                    {monthNames[calMonth]} {calYear}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (calMonth === 0) {
                          setCalMonth(11);
                          setCalYear(prev => prev - 1);
                        } else {
                          setCalMonth(prev => prev - 1);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-white border border-[#E8DFD5] hover:bg-[#1E1C1A] hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (calMonth === 11) {
                          setCalMonth(0);
                          setCalYear(prev => prev + 1);
                        } else {
                          setCalMonth(prev => prev + 1);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-white border border-[#E8DFD5] hover:bg-[#1E1C1A] hover:text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#5C554E] mb-2">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-xs">
                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2" />
                  ))}

                  {Array.from({ length: totalDays }).map((_, i) => {
                    const day = i + 1;
                    const dateIter = new Date(calYear, calMonth, day);
                    dateIter.setHours(0, 0, 0, 0);

                    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const isPast = dateIter < today;
                    const isBlocked = blockedDates.includes(dateStr);
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={day}
                        disabled={isPast || isBlocked}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedSlot(null);
                        }}
                        className={`aspect-square flex items-center justify-center rounded-full text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-[#B86B43] text-white font-bold shadow-md'
                            : isPast || isBlocked
                            ? 'opacity-30 cursor-not-allowed line-through'
                            : 'hover:bg-[#E8EFE9] text-[#1E1C1A]'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots */}
              <div className="sm:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#B86B43]">Doctor's Available Timings</span>
                    <h5 className="font-serif font-bold text-sm text-[#1E1C1A]">
                      {new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </h5>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                    {availableSlots.length === 0 ? (
                      <div className="col-span-2 p-4 rounded-xl bg-amber-50 text-amber-800 text-xs border border-amber-200">
                        No slots available on this date. Please pick another date.
                      </div>
                    ) : (
                      availableSlots.map(slot => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={slot.isBooked}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            selectedSlot === slot.time
                              ? 'bg-[#1E1C1A] text-white border-[#1E1C1A]'
                              : slot.isBooked
                              ? 'opacity-30 cursor-not-allowed bg-gray-50 border-dashed'
                              : 'bg-white border-[#E8DFD5] hover:border-[#B86B43] text-[#1E1C1A]'
                          }`}
                        >
                          {slot.time}
                          {slot.isBooked && <span className="block text-[10px] text-rose-500 font-normal">Booked</span>}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-[11px] text-emerald-800 mt-4">
                  <Info className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                  Synchronized with Dr. Nageshree's clinical schedule.
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#5C554E] hover:text-[#1E1C1A]"
              >
                Back to Details
              </button>
              <button
                onClick={validateStep2}
                className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors flex items-center gap-2"
              >
                <span>Proceed to UPI Payment</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Dynamic QR */}
              <div className="sm:col-span-6 text-center">
                <div className="relative inline-block p-4 rounded-3xl bg-white border-2 border-[#E8DFD5] shadow-lg">
                  <div className="scan-line" />
                  <canvas ref={qrCanvasRef} width={220} height={220} className="rounded-xl mx-auto" />
                </div>
                
                <p className="text-[11px] text-[#5C554E] mt-3">
                  Scan with any UPI App: <strong className="text-[#1E1C1A]">GPay, PhonePe, Paytm, BHIM</strong>
                </p>

                <a
                  href={upiIntentUri}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E8EFE9] text-[#1E1C1A] text-xs font-bold hover:bg-[#B86B43] hover:text-white transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Pay via UPI App on Phone</span>
                </a>
              </div>

              {/* Payment Details */}
              <div className="sm:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#5C554E]">Consultation:</span>
                    <strong className="text-[#1E1C1A] text-right">{selectedPackage.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C554E]">Date &amp; Slot:</span>
                    <strong className="text-[#1E1C1A]">{selectedDate} at {selectedSlot}</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#E8DFD5] text-sm">
                    <span className="font-bold text-[#1E1C1A]">Amount to Pay:</span>
                    <strong className="font-serif font-black text-lg text-[#B86B43]">₹{selectedPackage.price}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-[#E8DFD5] bg-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#5C554E] block uppercase font-bold">Doctor's Verified UPI ID</span>
                    <strong className="font-mono text-xs text-[#1E1C1A]">{doctor.upiId}</strong>
                  </div>
                  <button
                    onClick={handleCopyUpi}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FAF7F2] hover:bg-[#1E1C1A] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1C1A] mb-1">
                    Enter 12-Digit UPI Reference / UTR No. *
                  </label>
                  <input
                    type="text"
                    value={utrNumber}
                    onChange={e => setUtrNumber(e.target.value)}
                    placeholder="e.g. 439201948291"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] font-mono text-xs sm:text-sm focus:outline-none focus:border-[#B86B43]"
                  />
                  <span className="text-[10px] text-[#5C554E] mt-1 block">
                    Found in your payment app under 'Transaction Details' or 'UPI Ref No'.
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#5C554E] hover:text-[#1E1C1A]"
              >
                Back to Slots
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-copper-gradient shadow-copper hover:opacity-95 transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm &amp; Submit Appointment</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation Pass */}
        {step === 4 && confirmedPass && (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43]">Appointment Successfully Registered</span>
              <h3 className="font-serif text-2xl font-bold text-[#1E1C1A] mt-1">We Look Forward to Welcoming You</h3>
              <p className="text-xs text-[#5C554E] mt-1 max-w-md mx-auto">
                Your appointment has been registered on Dr. Nageshree's clinical desk. You will receive a verification call or WhatsApp message shortly.
              </p>
            </div>

            <div className="max-w-md mx-auto p-6 rounded-3xl bg-[#FAF7F2] border-2 border-dashed border-[#D1BEB0] text-left space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5C554E]">Booking Reference</span>
                  <div className="font-mono font-bold text-sm text-[#B86B43]">{confirmedPass.id}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                  Pending UPI Check
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[#5C554E] block">Patient / Couple</span>
                  <strong className="text-[#1E1C1A]">{confirmedPass.patientName}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#5C554E] block">Consultation Type</span>
                  <strong className="text-[#1E1C1A]">{confirmedPass.consultationType}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-[#5C554E] block">Reserved Date &amp; Slot</span>
                  <strong className="text-[#1E1C1A] text-sm">{confirmedPass.date} at {confirmedPass.timeSlot}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-[#5C554E] block">Submitted UPI UTR</span>
                  <strong className="font-mono text-xs text-[#5C554E]">{confirmedPass.utrNumber}</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/919823045678?text=${encodeURIComponent(`Namaste Dr. Nageshree, I have booked a consultation (${confirmedPass.id}) for ${confirmedPass.patientName} on ${confirmedPass.date} at ${confirmedPass.timeSlot}. My UPI UTR is ${confirmedPass.utrNumber}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Details on WhatsApp</span>
              </a>
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Fertility Consultation with Dr. Nageshree (${confirmedPass.id})`)}&dates=${confirmedPass.date.replace(/-/g, '')}T100000Z/${confirmedPass.date.replace(/-/g, '')}T110000Z&details=${encodeURIComponent(`Ayurvedic Consultation with Dr. Nageshree. Ref: ${confirmedPass.id}`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-white hover:bg-gray-100 border border-[#E8DFD5] text-[#1E1C1A] text-xs font-semibold flex items-center gap-2"
              >
                <CalendarIcon className="w-4 h-4 text-[#B86B43]" />
                <span>Add to Google Calendar</span>
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={closeBookingModal}
                className="text-xs font-semibold text-[#5C554E] hover:underline"
              >
                Done &amp; Return to Homepage
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
