import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, FileText, Download, X, Calendar, User, Phone, CheckCircle2, AlertCircle } from 'lucide-react';

export const PatientLookupModal: React.FC = () => {
  const { isPatientLookupModalOpen, closePatientLookupModal, appointments, openPrescriptionModal, showToast } = useApp();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);

  if (!isPatientLookupModalOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const matchedAppointments = searched
    ? appointments.filter(a =>
        a.id.toLowerCase().includes(trimmed) ||
        a.phone.replace(/[^0-9]/g, '').includes(trimmed.replace(/[^0-9]/g, '')) ||
        a.patientName.toLowerCase().includes(trimmed)
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      showToast('Please enter your Booking ID or Mobile Number', 'error');
      return;
    }
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E8DFD5] shadow-2xl overflow-hidden my-6 animate-scale-up">
        
        {/* Header */}
        <div className="bg-[#FAF7F2] p-6 border-b border-[#E8DFD5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 border border-[#E8DFD5] flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 text-[#B86B43]" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1E1C1A]">Patient Portal &amp; Prescription Download</h3>
              <p className="text-xs text-[#5C554E]">Retrieve your official clinical letterhead &amp; treatment plan</p>
            </div>
          </div>
          <button
            onClick={closePatientLookupModal}
            className="w-8 h-8 rounded-full bg-white text-[#5C554E] hover:text-[#1E1C1A] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input Box */}
        <div className="p-6">
          <form onSubmit={handleSearch} className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1C1A] mb-2">
              Enter Booking ID or Registered Mobile Number
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#5C554E]" />
                <input
                  type="text"
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                    if (searched) setSearched(false);
                  }}
                  placeholder="e.g. VV-2024-8901 or 9822112345"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DFD5] text-xs sm:text-sm focus:outline-none focus:border-[#B86B43]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#1E1C1A] hover:bg-[#B86B43] transition-colors shrink-0 shadow-md"
              >
                Find Record
              </button>
            </div>
            <p className="text-[11px] text-[#5C554E] mt-2">
              Try demo ID: <code className="font-mono bg-gray-100 px-1 py-0.5 rounded text-[#B86B43]">VV-2024-8901</code> (Sneha &amp; Amit Joshi)
            </p>
          </form>

          {/* Results List */}
          {searched && (
            <div className="space-y-4">
              {matchedAppointments.length === 0 ? (
                <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD5] text-center text-xs text-[#5C554E]">
                  <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p className="font-bold text-[#1E1C1A]">No appointment found matching "{query}"</p>
                  <p className="mt-1">Please verify your booking reference ID or WhatsApp phone number.</p>
                </div>
              ) : (
                matchedAppointments.map(appointment => (
                  <div
                    key={appointment.id}
                    className="p-5 rounded-2xl border border-[#E8DFD5] bg-white shadow-soft space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs font-bold text-[#B86B43]">{appointment.id}</span>
                        <h4 className="font-serif text-lg font-bold text-[#1E1C1A] mt-0.5">{appointment.patientName}</h4>
                        <p className="text-xs text-[#5C554E]">{appointment.consultationType}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        appointment.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        appointment.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-[#F0EAE1]">
                      <div className="flex items-center gap-1.5 text-[#5C554E]">
                        <Calendar className="w-3.5 h-3.5 text-[#B86B43]" />
                        <span>{appointment.date} at {appointment.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#5C554E]">
                        <User className="w-3.5 h-3.5 text-[#B86B43]" />
                        <span>Age: {appointment.age} yrs ({appointment.city})</span>
                      </div>
                    </div>

                    {/* Prescription Available or Pending */}
                    {appointment.prescription ? (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div>
                            <span className="font-bold text-xs text-emerald-900 block">
                              Prescription Issued by Dr. Nagasri Tenneti
                            </span>
                            <span className="text-[10px] text-emerald-700">
                              Ref: {appointment.prescription.id} • {appointment.prescription.medicines.length} Medicines Prescribed
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            closePatientLookupModal();
                            openPrescriptionModal(appointment.prescription!);
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>View &amp; Download PDF</span>
                        </button>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                        <p className="font-semibold">Prescription generation in progress.</p>
                        <p className="text-[11px] text-amber-800 mt-0.5">
                          Dr. Nagasri Tenneti will upload your formal letterhead during or immediately following your scheduled consultation.
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
