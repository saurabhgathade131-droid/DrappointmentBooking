import React, { createContext, useContext, useState, useEffect } from 'react';
import { DoctorProfile, Appointment, SlotAvailability, ConsultationType, MediaInterview } from '../types';
import { INITIAL_DOCTOR, SAMPLE_APPOINTMENTS, DEFAULT_AVAILABLE_SLOTS } from '../data/initialData';

interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  doctor: DoctorProfile;
  updateDoctor: (updated: DoctorProfile) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status'], paymentStatus?: Appointment['paymentStatus'], notes?: string) => void;
  blockedDates: string[];
  toggleBlockedDate: (dateStr: string) => void;
  customSlots: Record<string, string[]>;
  setCustomSlotsForDate: (dateStr: string, slots: string[]) => void;
  getAvailableSlots: (dateStr: string) => SlotAvailability[];
  
  // Modals & Navigation
  isBookingModalOpen: boolean;
  selectedPackageForBooking: ConsultationType | null;
  openBookingModal: (pkg?: ConsultationType) => void;
  closeBookingModal: () => void;
  
  activeVideoModal: MediaInterview | null;
  openVideoModal: (media: MediaInterview) => void;
  closeVideoModal: () => void;
  
  isAdminView: boolean;
  setIsAdminView: (show: boolean) => void;
  
  // Toast
  toast: ToastData | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctor, setDoctor] = useState<DoctorProfile>(() => {
    try {
      const saved = localStorage.getItem('vaidya_doctor');
      return saved ? JSON.parse(saved) : INITIAL_DOCTOR;
    } catch {
      return INITIAL_DOCTOR;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('vaidya_appointments');
      return saved ? JSON.parse(saved) : SAMPLE_APPOINTMENTS;
    } catch {
      return SAMPLE_APPOINTMENTS;
    }
  });

  const [blockedDates, setBlockedDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vaidya_blocked_dates');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customSlots, setCustomSlots] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('vaidya_custom_slots');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<ConsultationType | null>(null);
  const [activeVideoModal, setActiveVideoModal] = useState<MediaInterview | null>(null);
  const [isAdminView, setIsAdminView] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    localStorage.setItem('vaidya_doctor', JSON.stringify(doctor));
  }, [doctor]);

  useEffect(() => {
    localStorage.setItem('vaidya_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('vaidya_blocked_dates', JSON.stringify(blockedDates));
  }, [blockedDates]);

  useEffect(() => {
    localStorage.setItem('vaidya_custom_slots', JSON.stringify(customSlots));
  }, [customSlots]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const updateDoctor = (updated: DoctorProfile) => {
    setDoctor(updated);
    showToast("Doctor profile & UPI configuration updated!");
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
    showToast("Appointment successfully registered! Slot reserved.");
  };

  const updateAppointmentStatus = (
    id: string,
    status: Appointment['status'],
    paymentStatus?: Appointment['paymentStatus'],
    notes?: string
  ) => {
    setAppointments(prev =>
      prev.map(a => {
        if (a.id === id) {
          return {
            ...a,
            status,
            paymentStatus: paymentStatus || a.paymentStatus,
            doctorNotes: notes !== undefined ? notes : a.doctorNotes
          };
        }
        return a;
      })
    );
  };

  const toggleBlockedDate = (dateStr: string) => {
    setBlockedDates(prev => {
      const exists = prev.includes(dateStr);
      if (exists) {
        showToast(`Date ${dateStr} unblocked`);
        return prev.filter(d => d !== dateStr);
      } else {
        showToast(`Date ${dateStr} blocked for appointments`, "info");
        return [...prev, dateStr];
      }
    });
  };

  const setCustomSlotsForDate = (dateStr: string, slots: string[]) => {
    setCustomSlots(prev => ({
      ...prev,
      [dateStr]: slots
    }));
  };

  const getAvailableSlots = (dateStr: string): SlotAvailability[] => {
    if (blockedDates.includes(dateStr)) {
      return [];
    }

    const baseSlots = customSlots[dateStr] || DEFAULT_AVAILABLE_SLOTS;
    const booked = appointments
      .filter(a => a.date === dateStr && a.status !== 'Cancelled')
      .map(a => a.timeSlot);

    return baseSlots.map(time => ({
      time,
      isBooked: booked.includes(time)
    }));
  };

  const openBookingModal = (pkg?: ConsultationType) => {
    if (pkg) setSelectedPackageForBooking(pkg);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openVideoModal = (media: MediaInterview) => {
    setActiveVideoModal(media);
  };

  const closeVideoModal = () => {
    setActiveVideoModal(null);
  };

  return (
    <AppContext.Provider
      value={{
        doctor,
        updateDoctor,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        blockedDates,
        toggleBlockedDate,
        customSlots,
        setCustomSlotsForDate,
        getAvailableSlots,
        isBookingModalOpen,
        selectedPackageForBooking,
        openBookingModal,
        closeBookingModal,
        activeVideoModal,
        openVideoModal,
        closeVideoModal,
        isAdminView,
        setIsAdminView,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
