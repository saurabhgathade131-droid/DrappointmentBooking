import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Appointment, ClinicalPrescription } from '../types';
import { DEFAULT_AVAILABLE_SLOTS } from '../data/initialData';
import { PrescriptionBuilderModal } from './PrescriptionBuilderModal';
import {
  Lock,
  ArrowLeft,
  Users,
  Calendar,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  Download,
  Eye,
  Check,
  MessageCircle,
  X,
  FileText,
  Stethoscope,
  Printer
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    doctor,
    updateDoctor,
    appointments,
    updateAppointmentStatus,
    blockedDates,
    toggleBlockedDate,
    customSlots,
    setCustomSlotsForDate,
    setIsAdminView,
    openPrescriptionModal,
    showToast
  } = useApp();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('vaidya_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'appointments' | 'slots' | 'settings'>('appointments');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected date for slot manager
  const [adminSlotDate, setAdminSlotDate] = useState(new Date().toISOString().split('T')[0]);

  // Selected appointment for detail inspection modal
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Prescription builder modal state
  const [activeConsultationAppointment, setActiveConsultationAppointment] = useState<Appointment | null>(null);

  // Doctor Settings Form State
  const [upiInput, setUpiInput] = useState(doctor.upiId);
  const [phoneInput, setPhoneInput] = useState(doctor.contactPhone);
  const [emailInput, setEmailInput] = useState(doctor.contactEmail);
  const [clinicInput, setClinicInput] = useState(doctor.clinicAddress);
  const [regNumInput, setRegNumInput] = useState(doctor.regNumber);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'veda2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('vaidya_admin_auth', 'true');
      setPinError(false);
      showToast('Welcome Dr. Nagasri Tenneti!');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('vaidya_admin_auth');
    setIsAdminView(false);
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter(a => {
    const matchesStatus = statusFilter === 'all' || a.status.toLowerCase() === statusFilter;
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      a.patientName.toLowerCase().includes(term) ||
      a.id.toLowerCase().includes(term) ||
      a.phone.includes(term) ||
      a.utrNumber.toLowerCase().includes(term);
    return matchesStatus && matchesSearch;
  });

  // Analytics
  const totalBookings = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const totalRevenue = appointments
    .filter(a => a.paymentStatus === 'Verified')
    .reduce((sum, a) => sum + (Number(a.consultationPrice) || 0), 0);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayCount = appointments.filter(a => a.date === todayStr && a.status !== 'Cancelled').length;

  // Slot Manager logic
  const isDateBlocked = blockedDates.includes(adminSlotDate);
  const activeSlots = customSlots[adminSlotDate] || DEFAULT_AVAILABLE_SLOTS;

  const allMasterSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:30 PM', '03:30 PM', '04:30 PM',
    '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM'
  ];

  const handleToggleSlot = (slot: string) => {
    const current = customSlots[adminSlotDate] || [...DEFAULT_AVAILABLE_SLOTS];
    const exists = current.includes(slot);
    const updated = exists ? current.filter(s => s !== slot) : [...current, slot];
    setCustomSlotsForDate(adminSlotDate, updated);
  };

  const handleExportCSV = () => {
    if (appointments.length === 0) {
      showToast('No records to export', 'info');
      return;
    }
    const headers = ['ID', 'Patient Name', 'Phone', 'Email', 'City', 'Age', 'Date', 'Slot', 'Type', 'Price', 'UTR', 'Payment Status', 'Status', 'Has Prescription', 'Doctor Notes'];
    const rows = appointments.map(a => [
      `"${a.id}"`,
      `"${a.patientName}"`,
      `"${a.phone}"`,
      `"${a.email}"`,
      `"${a.city}"`,
      `"${a.age}"`,
      `"${a.date}"`,
      `"${a.timeSlot}"`,
      `"${a.consultationType}"`,
      `"${a.consultationPrice}"`,
      `"${a.utrNumber}"`,
      `"${a.paymentStatus}"`,
      `"${a.status}"`,
      `"${a.prescription ? 'Yes (' + a.prescription.id + ')' : 'No'}"`,
      `"${(a.doctorNotes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VedicVaidya_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Appointments CSV exported!');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctor({
      ...doctor,
      upiId: upiInput.trim(),
      contactPhone: phoneInput.trim(),
      contactEmail: emailInput.trim(),
      clinicAddress: clinicInput.trim(),
      regNumber: regNumInput.trim()
    });
  };

  // PIN gate
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1E1C1A]/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#E8DFD5] shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B86B43]">Doctor Access Only</span>
            <h3 className="font-serif text-2xl font-bold text-[#1E1C1A] mt-1">Dr. Nagasri's Sanctum Desk</h3>
            <p className="text-xs text-[#5C554E] mt-2">
              Please enter your secure 4-digit doctor PIN to manage available slots, verify UPI payments, and review patient intake records.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              placeholder="Enter PIN (Default: 1234)"
              className="w-full text-center text-2xl font-mono tracking-widest py-3 px-4 rounded-xl border-2 border-[#E8DFD5] focus:border-[#B86B43] focus:outline-none"
            />
            {pinError && (
              <p className="text-xs text-rose-600 font-semibold">Incorrect PIN. Try default demo PIN: 1234</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors shadow-lg"
            >
              Unlock Clinical Desk
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => setIsAdminView(false)}
              className="text-xs text-[#5C554E] hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Patient Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E8DFD5] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden p-0.5 bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center">
              <img src="/assets/images/vedic-vaidya-logo.jpg" alt="Vedic Vaidya" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl font-bold text-[#1E1C1A]">Dr. Nagasri Tenneti's Clinical Console</h1>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">Live Admin</span>
              </div>
              <p className="text-[11px] text-[#5C554E]">Vedic Vaidya Fertility Management • Ex-Gynoveda</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAdminView(false)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#5C554E] hover:text-[#B86B43] bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-[#E8DFD5]"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Patient Website
            </button>
            <button
              onClick={handleLogout}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 border-t border-[#F0EAE1] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'appointments'
                ? 'border-[#B86B43] text-[#1E1C1A] font-bold'
                : 'border-transparent text-[#5C554E] hover:text-[#1E1C1A]'
            }`}
          >
            <Users className="w-4 h-4 text-[#B86B43]" /> Appointments CRM &amp; Consultations
          </button>
          <button
            onClick={() => setActiveTab('slots')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'slots'
                ? 'border-[#B86B43] text-[#1E1C1A] font-bold'
                : 'border-transparent text-[#5C554E] hover:text-[#1E1C1A]'
            }`}
          >
            <Calendar className="w-4 h-4" /> Slot &amp; Schedule Manager
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#B86B43] text-[#1E1C1A] font-bold'
                : 'border-transparent text-[#5C554E] hover:text-[#1E1C1A]'
            }`}
          >
            <Settings className="w-4 h-4" /> Profile &amp; Letterhead Settings
          </button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8">
        {/* Top Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C554E] block">Total Bookings</span>
            <div className="font-serif text-2xl font-extrabold text-[#1E1C1A] mt-1">{totalBookings}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">Pending Verification</span>
            <div className="font-serif text-2xl font-extrabold text-amber-900 mt-1">{pendingCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">Confirmed &amp; Active</span>
            <div className="font-serif text-2xl font-extrabold text-emerald-900 mt-1">{confirmedCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-soft">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C554E] block">Today's Consults</span>
            <div className="font-serif text-2xl font-extrabold text-[#B86B43] mt-1">{todayCount}</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-soft col-span-2 md:col-span-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#5C554E] block">Verified Collections</span>
            <div className="font-serif text-2xl font-extrabold text-[#1E1C1A] mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* TAB 1: Appointments CRM */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {(['all', 'pending', 'confirmed', 'completed'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                      statusFilter === f
                        ? 'bg-[#1E1C1A] text-white'
                        : 'bg-[#FAF7F2] text-[#5C554E] border border-[#E8DFD5] hover:border-[#B86B43]'
                    }`}
                  >
                    {f === 'pending' ? 'Pending Check' : f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-grow md:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-[#5C554E]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search patient, phone, UTR..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
                <button
                  onClick={handleExportCSV}
                  className="shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#FAF7F2] text-[#1E1C1A] border border-[#E8DFD5] hover:bg-[#1E1C1A] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Export CSV
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFD5] shadow-soft overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF7F2] border-b border-[#E8DFD5] text-[11px] font-bold uppercase tracking-wider text-[#5C554E]">
                      <th className="py-3.5 px-4">Ref ID / Date</th>
                      <th className="py-3.5 px-4">Patient / Couple</th>
                      <th className="py-3.5 px-4">Consultation</th>
                      <th className="py-3.5 px-4">Slot</th>
                      <th className="py-3.5 px-4">UPI Payment &amp; UTR</th>
                      <th className="py-3.5 px-4">Prescription Letterhead</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-sm text-[#5C554E]">
                          No appointments found matching this criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map(a => (
                        <tr key={a.id} className="border-b border-[#F0EAE1] hover:bg-[#FAF7F2]/60 transition-colors">
                          <td className="py-4 px-4">
                            <div className="font-mono text-xs font-bold text-[#B86B43]">{a.id}</div>
                            <div className="text-[11px] text-[#5C554E]">{new Date(a.createdAt).toLocaleDateString('en-IN')}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-sm text-[#1E1C1A]">{a.patientName}</div>
                            <div className="text-xs text-[#5C554E]">{a.phone} • {a.city} (Age {a.age})</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-xs font-medium text-[#1E1C1A]">{a.consultationType}</div>
                            <div className="text-[11px] font-semibold text-[#B86B43]">₹{a.consultationPrice}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-xs text-[#1E1C1A]">{a.date}</div>
                            <div className="text-xs font-bold text-[#B86B43]">{a.timeSlot}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className={`inline-block w-2 h-2 rounded-full ${
                                a.paymentStatus === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                              }`} />
                              <span className={`text-xs font-semibold ${
                                a.paymentStatus === 'Verified' ? 'text-emerald-700' : 'text-amber-700'
                              }`}>{a.paymentStatus}</span>
                            </div>
                            <div className="text-[10px] font-mono text-[#5C554E] mt-0.5">UTR: {a.utrNumber}</div>
                          </td>
                          <td className="py-4 px-4">
                            {a.prescription ? (
                              <button
                                onClick={() => openPrescriptionModal(a.prescription!)}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
                              >
                                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                                <span>{a.prescription.id}</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => setActiveConsultationAppointment(a)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-semibold hover:bg-amber-100 transition-colors"
                              >
                                <Stethoscope className="w-3 h-3 text-amber-600" />
                                <span>Create Rx</span>
                              </button>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              a.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              a.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                              a.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {a.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Open Consultation Desk & Prescription Builder */}
                              <button
                                onClick={() => setActiveConsultationAppointment(a)}
                                title="Open Consultation Desk & Prescription Builder"
                                className="p-2 rounded-lg bg-[#E8EFE9] hover:bg-[#B86B43] hover:text-white transition-colors text-emerald-900"
                              >
                                <Stethoscope className="w-4 h-4" />
                              </button>

                              {/* View Details */}
                              <button
                                onClick={() => {
                                  setSelectedAppointment(a);
                                  setTempNotes(a.doctorNotes || '');
                                }}
                                title="View Patient Details"
                                className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#1E1C1A] hover:text-white transition-colors text-[#1E1C1A]"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {/* Quick Verify */}
                              {a.status === 'Pending' && (
                                <button
                                  onClick={() => {
                                    updateAppointmentStatus(a.id, 'Confirmed', 'Verified');
                                    showToast('Verified UPI Payment & Confirmed Slot!');
                                  }}
                                  title="Verify Payment & Confirm"
                                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-colors text-emerald-700"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}

                              {/* WhatsApp Direct */}
                              <a
                                href={`https://wa.me/${a.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${a.patientName}, this is Dr. Nagasri Tenneti from Vedic Vaidya regarding your consultation on ${a.date} at ${a.timeSlot}.`)}`}
                                target="_blank"
                                rel="noreferrer"
                                title="WhatsApp Patient"
                                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors text-emerald-600"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Slot & Schedule Manager */}
        {activeTab === 'slots' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD5] shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#F0EAE1] gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43]">Daily Slot Controller</span>
                <h3 className="font-serif text-2xl font-bold text-[#1E1C1A] mt-1">Manage Your Available Consultation Slots</h3>
                <p className="text-xs text-[#5C554E]">
                  Select any date to enable or disable specific slots, or block entire days for conferences or personal leave.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-[#1E1C1A]">Select Date:</label>
                <input
                  type="date"
                  value={adminSlotDate}
                  onChange={e => setAdminSlotDate(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8DFD5] text-xs font-semibold focus:outline-none focus:border-[#B86B43]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] mb-6">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="blockDayCheck"
                  checked={isDateBlocked}
                  onChange={() => toggleBlockedDate(adminSlotDate)}
                  className="w-4 h-4 accent-[#B86B43] rounded"
                />
                <label htmlFor="blockDayCheck" className="text-xs font-bold text-[#1E1C1A] cursor-pointer">
                  Block Entire Day (Mark Leave / Unavailable for Bookings)
                </label>
              </div>

              <button
                onClick={() => {
                  setCustomSlotsForDate(adminSlotDate, [...DEFAULT_AVAILABLE_SLOTS]);
                  showToast('Reset slots to standard consultation schedule');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-[#E8DFD5] hover:bg-gray-50 text-[#5C554E] transition-colors"
              >
                Reset Slots to Standard (8 Slots)
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1C1A] mb-3">
                Hourly Timings for Selected Date ({adminSlotDate})
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {allMasterSlots.map(slot => {
                  const isEnabled = activeSlots.includes(slot);
                  return (
                    <div
                      key={slot}
                      className={`flex items-center justify-between p-3 rounded-xl border ${
                        isEnabled ? 'bg-emerald-50/50 border-emerald-200' : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isEnabled ? 'text-emerald-900' : 'text-gray-500'}`}>
                        {slot}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleToggleSlot(slot)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          isEnabled ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {isEnabled ? 'Active' : 'Disabled'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Doctor Settings & Profile */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD5] shadow-soft max-w-3xl">
            <div className="pb-6 border-b border-[#F0EAE1] mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B86B43]">Letterhead &amp; Clinic Configuration</span>
              <h3 className="font-serif text-2xl font-bold text-[#1E1C1A] mt-1">Doctor Profile &amp; Official Letterhead Settings</h3>
              <p className="text-xs text-[#5C554E]">
                Updates made here automatically appear on your generated Ayurvedic Prescription Letterheads and UPI QR gateway.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">
                    Doctor Registration Number *
                  </label>
                  <input
                    type="text"
                    value={regNumInput}
                    onChange={e => setRegNumInput(e.target.value)}
                    placeholder="e.g. AYU-MAH-48921/A"
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs font-bold focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">
                    Official Doctor UPI ID / VPA *
                  </label>
                  <input
                    type="text"
                    value={upiInput}
                    onChange={e => setUpiInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] font-mono text-xs focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">
                    Contact Mobile / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={e => setPhoneInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">
                    Clinic Email
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#B86B43]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">
                  Clinic Sanctum Address (Printed on Letterhead)
                </label>
                <textarea
                  rows={2}
                  value={clinicInput}
                  onChange={e => setClinicInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E8DFD5] text-xs focus:outline-none focus:border-[#B86B43]"
                />
              </div>

              <div className="pt-4 border-t border-[#F0EAE1]">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors shadow-md"
                >
                  Save &amp; Update Live System
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Patient Detail Inspection & Notes Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden animate-scale-up">
            <div className="p-6">
              <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-4 mb-5">
                <div>
                  <span className="text-xs font-mono font-bold text-[#B86B43]">{selectedAppointment.id}</span>
                  <h3 className="font-serif text-xl font-bold text-[#1E1C1A]">{selectedAppointment.patientName}</h3>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#1E1C1A] hover:bg-[#1E1C1A] hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5 text-xs">
                <div className="p-3 bg-[#FAF7F2] rounded-xl">
                  <span className="text-[#5C554E] block mb-1">Phone Number</span>
                  <strong className="text-[#1E1C1A] text-sm">{selectedAppointment.phone}</strong>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl">
                  <span className="text-[#5C554E] block mb-1">Email</span>
                  <strong className="text-[#1E1C1A] text-sm">{selectedAppointment.email}</strong>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl">
                  <span className="text-[#5C554E] block mb-1">Consultation Date &amp; Slot</span>
                  <strong className="text-[#1E1C1A] text-sm">{selectedAppointment.date} at {selectedAppointment.timeSlot}</strong>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl">
                  <span className="text-[#5C554E] block mb-1">Consultation Type</span>
                  <strong className="text-[#1E1C1A] text-sm">{selectedAppointment.consultationType} (₹{selectedAppointment.consultationPrice})</strong>
                </div>
              </div>

              {/* Prescription Card Banner */}
              <div className="mb-5 p-4 rounded-2xl bg-[#E8EFE9]/50 border border-[#D5E2D7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                    Ayurvedic Prescription &amp; Letterhead
                  </span>
                  <span className="text-xs font-bold text-[#1E1C1A]">
                    {selectedAppointment.prescription ? `Prescription #${selectedAppointment.prescription.id}` : 'No prescription generated yet'}
                  </span>
                </div>
                {selectedAppointment.prescription ? (
                  <button
                    onClick={() => {
                      openPrescriptionModal(selectedAppointment.prescription!);
                      setSelectedAppointment(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View &amp; Print Letterhead</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setActiveConsultationAppointment(selectedAppointment);
                      setSelectedAppointment(null);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1E1C1A] hover:bg-[#B86B43] text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Create Prescription</span>
                  </button>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">Patient Reported Fertility Concern</label>
                <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-[#2C2724] leading-relaxed">
                  <span className="font-semibold text-amber-900 block mb-1">
                    Category: {selectedAppointment.concernType.toUpperCase()} FERTILITY
                  </span>
                  {selectedAppointment.concernDetails}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">UPI Transaction Verification</label>
                <div className="p-3 bg-white border border-[#E8DFD5] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[#5C554E]">UTR Reference: </span>
                    <strong className="font-mono text-sm text-[#1E1C1A]">{selectedAppointment.utrNumber}</strong>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-bold ${
                    selectedAppointment.paymentStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedAppointment.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">Doctor Clinical Notes</label>
                <textarea
                  rows={3}
                  value={tempNotes}
                  onChange={e => setTempNotes(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E8DFD5] bg-white focus:outline-none focus:border-[#B86B43]"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#F0EAE1]">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, selectedAppointment.status, selectedAppointment.paymentStatus, tempNotes);
                      setSelectedAppointment(null);
                      showToast('Saved Doctor Notes');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-[#1E1C1A] text-white hover:bg-[#B86B43] transition-colors"
                  >
                    Save Notes
                  </button>
                  {selectedAppointment.status !== 'Confirmed' ? (
                    <button
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'Confirmed', 'Verified', tempNotes);
                        setSelectedAppointment(null);
                        showToast('Verified UPI & Confirmed Slot');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      Verify &amp; Confirm
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        updateAppointmentStatus(selectedAppointment.id, 'Completed', 'Verified', tempNotes);
                        setSelectedAppointment(null);
                        showToast('Marked Consultation Completed');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    updateAppointmentStatus(selectedAppointment.id, 'Cancelled');
                    setSelectedAppointment(null);
                    showToast('Slot cancelled', 'info');
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  Cancel Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Prescription Builder Modal */}
      {activeConsultationAppointment && (
        <PrescriptionBuilderModal
          appointment={activeConsultationAppointment}
          onClose={() => setActiveConsultationAppointment(null)}
          onSaved={newRx => {
            setActiveConsultationAppointment(null);
            openPrescriptionModal(newRx);
          }}
        />
      )}
    </div>
  );
};
