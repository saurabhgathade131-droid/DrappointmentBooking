/**
 * Vaidya Veda - Core Application Data & Persistence Layer
 * Dr. Nageshree (BAMS, Ayurvedic Fertility Specialist, Ex-Gynoveda)
 */

const INITIAL_DATA = {
  doctor: {
    name: "Dr. Nageshree",
    title: "BAMS (Ayurvedacharya)",
    role: "Senior Ayurvedic Fertility & Reproductive Health Specialist",
    exAffiliation: "Former Senior Fertility Consultant at Gynoveda",
    experienceYears: 12,
    successCount: 200,
    patientCount: "14,500+",
    satisfactionRate: "98.4%",
    bio: "Dr. Nageshree is an esteemed Ayurvedic physician with over a decade of dedicated clinical practice in reproductive endocrinology and classical Ayurvedic fertility therapies. Having spearheaded holistic fertility protocols at Gynoveda, she has empowered more than 200 couples suffering from chronic male and female factor infertility to conceive naturally without intrusive hormonal interventions.",
    corePhilosophy: "Rooted in classical Caraka Samhita & Sushruta Samhita, her treatment protocols harmonize Beej Shuddhi (gamete purification), Garbhashaya Shodhana (uterine readiness), and Shukra-Artava rejuvenation using pure medicinal botanical extracts and metabolic alignment.",
    upiId: "drnageshree@okaxis",
    contactEmail: "care@vaidyaveda.com",
    contactPhone: "+91 98230 45678",
    clinicAddress: "Vaidya Veda Wellness Sanctum, 402 Lotus Pavilion, Off FC Road, Pune & Online Teleconsultations Worldwide"
  },

  consultationTypes: [
    {
      id: "video-consult",
      name: "Comprehensive Video Consultation",
      duration: "45 mins",
      price: 799,
      badge: "Most Popular",
      description: "1-on-1 private video assessment of medical reports (AMH, semen analysis, pelvic scan), dosha imbalance analysis, and customized 90-day Ayurvedic fertility roadmap.",
      features: ["Full Blood & Semen Report Review", "Personalized Herbal Prescription", "Diet & Dinacharya Regimen", "7 Days Post-Consult WhatsApp Support"]
    },
    {
      id: "couple-dive",
      name: "Couple Pre-Conception Deep Dive",
      duration: "60 mins",
      price: 1299,
      badge: "Highest Conception Rate",
      description: "Joint holistic consultation for both partners addressing both sperm vitality and ovulatory health simultaneously for optimal conception readiness.",
      features: ["Dual Partner Diagnostic Analysis", "Sperm Count & Motility Revival Plan", "PCOS / Endometrium Optimization", "Garbh Sanskar & Beej Shuddhi Guide", "15 Days Direct Support"]
    },
    {
      id: "in-clinic",
      name: "In-Person Clinic Consultation",
      duration: "45 mins",
      price: 999,
      badge: "Physical Examination",
      description: "In-depth pulse diagnosis (Nadi Pariksha), prakriti evaluation, and tailored panchakarma recommendations at our Pune clinic.",
      features: ["Nadi Pariksha (Pulse Diagnosis)", "Prakriti & Agni Assessment", "Prescription & Immediate Herbal Access", "Follow-up schedule included"]
    }
  ],

  mediaInterviews: [
    {
      id: "media-1",
      channel: "Zee 24 Taas Health",
      title: "Ayurvedic Solutions for High AMH & Severe PCOS Infertility",
      thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      duration: "24:15 mins",
      views: "185K views",
      topic: "Female Fertility & Hormonal Balance",
      summary: "Dr. Nageshree explains why synthetic oral contraceptives mask PCOS symptoms and demonstrates how Shodhita Guggulu and Shatavari formulations restore spontaneous ovulation naturally.",
      youtubeEmbedId: "dQw4w9WgXcQ" // safe sample embed / preview player
    },
    {
      id: "media-2",
      channel: "Saam TV Dialogue",
      title: "Male Factor Infertility: Overcoming Low Sperm Count & Motility",
      thumbnail: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      duration: "18:40 mins",
      views: "142K views",
      topic: "Male Fertility & Shukra Dhatu",
      summary: "Comprehensive TV panel discussing modern lifestyle factors, testicular heat, stress, and clinical results of Gokshura & Ashwagandha complexes on sperm morphology.",
      youtubeEmbedId: "dQw4w9WgXcQ"
    },
    {
      id: "media-3",
      channel: "ABP Majha Sanjeevani",
      title: "Garbh Sanskar & Natural Conception After 35",
      thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      duration: "31:05 mins",
      views: "210K views",
      topic: "Advanced Maternal Age & Egg Quality",
      summary: "In-depth discussion on mitochondrial nourishment for oocytes, uterine lining receptivity, and real case studies of couples conceiving past age 36.",
      youtubeEmbedId: "dQw4w9WgXcQ"
    },
    {
      id: "media-4",
      channel: "Ayush Wellness Summit 2024",
      title: "Keynote: Reversing Fallopian Tube Blocks & Unexplained Infertility",
      thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      duration: "28:50 mins",
      views: "95K views",
      topic: "Clinical Research & Case Studies",
      summary: "Clinical presentation of 200+ verified conception ultrasound reports following Uttar Basti and rasayana therapies.",
      youtubeEmbedId: "dQw4w9WgXcQ"
    }
  ],

  testimonials: [
    {
      id: "test-1",
      couple: "Pooja & Rohan Kulkarni",
      location: "Pune, Maharashtra",
      conceptionTime: "Conceived in 4 Months",
      condition: "Severe PCOS + Oligospermia (Low Sperm Count)",
      quote: "After 5 failed IUI cycles, doctors pushed us toward IVF. We consulted Dr. Nageshree when she was at Gynoveda and continued our journey with her. Within 120 days of her customized herbs and dietary shifts, my cycles normalized and Rohan's motility jumped from 18% to 54%. We welcomed our baby boy in August!",
      babyBorn: "Baby Boy Aarav, Born Aug 2024",
      verified: true,
      category: "both"
    },
    {
      id: "test-2",
      couple: "Sunita & Aniket Shinde",
      location: "Mumbai, Maharashtra",
      conceptionTime: "Conceived in 90 Days",
      condition: "Low AMH (0.6 ng/mL) & Thin Endometrium",
      quote: "Every allopathic clinic told me my egg reserve was exhausted and recommended donor eggs. Dr. Nageshree reassured me that quality matters more than quantity. Her Garbhashaya Shodhana regimen nurtured my lining to 9.2mm. We saw our double pink lines naturally without any hormone shots!",
      babyBorn: "Twins Tara & Kabir, Born Oct 2024",
      verified: true,
      category: "female"
    },
    {
      id: "test-3",
      couple: "Meera & Siddharth Deshmukh",
      location: "Bengaluru, Karnataka",
      conceptionTime: "Conceived in 5 Months",
      condition: "Teratozoospermia (Abnormal Sperm Morphology)",
      quote: "Dr. Nageshree is truly a godsend. She treated Siddharth's oxidative stress with precision Ayurvedic rasayanas while regulating my luteal phase. Her warmth and calm confidence gave us hope when we were emotionally exhausted. Today we hold our little miracle in our arms.",
      babyBorn: "Baby Girl Ananya, Born Jan 2025",
      verified: true,
      category: "male"
    },
    {
      id: "test-4",
      couple: "Neha & Vikram Patil",
      location: "Nashik, Maharashtra",
      conceptionTime: "Conceived in 3 Months",
      condition: "Unexplained Infertility for 4 Years",
      quote: "All our standard scans were 'normal' yet we couldn't conceive for four frustrating years. Dr. Nageshree identified subtle Agni and Apana Vata imbalances that allopathy missed. Her Beej Shuddhi therapy did what 4 years of clinical visits couldn't.",
      babyBorn: "Baby Boy Reyansh, Born Feb 2025",
      verified: true,
      category: "female"
    }
  ],

  clinicalStats: [
    { number: "200+", label: "Confirmed Natural Conceptions", desc: "Clinically documented sonogram confirmed pregnancies" },
    { number: "94.8%", label: "Ovulatory Cycle Restoration", desc: "Natural cycle rhythm restored within 90-120 days" },
    { number: "3.2x", label: "Average Sperm Count Revival", desc: "Significant jump in total motile sperm concentration" },
    { number: "14,500+", label: "Couples & Women Consulted", desc: "Across India, UK, USA, UAE & Australia" }
  ],

  defaultAvailableSlots: [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:30 PM",
    "03:30 PM",
    "04:30 PM",
    "05:30 PM",
    "06:30 PM"
  ]
};

// Storage Keys
const STORAGE_KEYS = {
  APPOINTMENTS: "vaidya_veda_appointments",
  CUSTOM_SLOTS: "vaidya_veda_custom_slots",
  BLOCKED_DATES: "vaidya_veda_blocked_dates",
  DOCTOR_SETTINGS: "vaidya_veda_doctor_settings",
  ADMIN_AUTH: "vaidya_veda_admin_logged_in"
};

// Helper: Seed Initial Sample Bookings if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    const sampleAppointments = [
      {
        id: "VV-2024-8901",
        patientName: "Sneha & Amit Joshi",
        phone: "+91 98221 12345",
        email: "sneha.joshi@gmail.com",
        city: "Pune",
        age: 31,
        concernType: "both",
        concernDetails: "Trying for 2.5 years. Wife has PCOS with 45-day cycles, husband has borderline motility (28%).",
        consultationType: "Couple Pre-Conception Deep Dive",
        consultationPrice: 1299,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        timeSlot: "11:00 AM",
        paymentMode: "UPI",
        utrNumber: "UPI439201948291",
        paymentStatus: "Verified",
        status: "Confirmed",
        doctorNotes: "Review husband's semen report and wife's AMH on Day 2.",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: "VV-2024-8902",
        patientName: "Rajesh Gaikwad",
        phone: "+91 97654 99887",
        email: "rajesh.g@outlook.com",
        city: "Mumbai",
        age: 34,
        concernType: "male",
        concernDetails: "Low sperm count (12 million/ml) and low vitality. Looking for Ayurvedic treatment before planning IVF.",
        consultationType: "Comprehensive Video Consultation",
        consultationPrice: 799,
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: "04:30 PM",
        paymentMode: "UPI",
        utrNumber: "419823019842",
        paymentStatus: "Pending Verification",
        status: "Pending",
        doctorNotes: "Needs Shukra Dhatu rasayanas and lifestyle guidance.",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: "VV-2024-8898",
        patientName: "Dr. Pallavi Salve",
        phone: "+91 99234 55667",
        email: "pallavi.salve@gmail.com",
        city: "Nashik",
        age: 29,
        concernType: "female",
        concernDetails: "Secondary infertility after 1st child. Irregular periods and elevated prolactin.",
        consultationType: "In-Person Clinic Consultation",
        consultationPrice: 999,
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        timeSlot: "02:30 PM",
        paymentMode: "UPI",
        utrNumber: "UPI891029384756",
        paymentStatus: "Verified",
        status: "Confirmed",
        doctorNotes: "Booked for clinic visit. Nadi pariksha to be done.",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(sampleAppointments));
  }

  if (!localStorage.getItem(STORAGE_KEYS.DOCTOR_SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.DOCTOR_SETTINGS, JSON.stringify(INITIAL_DATA.doctor));
  }

  if (!localStorage.getItem(STORAGE_KEYS.CUSTOM_SLOTS)) {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SLOTS, JSON.stringify({}));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BLOCKED_DATES)) {
    localStorage.setItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify([]));
  }
}

// App State Management Interface
const AppState = {
  getDoctorSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DOCTOR_SETTINGS);
      return data ? JSON.parse(data) : INITIAL_DATA.doctor;
    } catch (e) {
      return INITIAL_DATA.doctor;
    }
  },

  updateDoctorSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.DOCTOR_SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent("vaidya:doctorUpdated", { detail: settings }));
  },

  getAppointments() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveAppointment(appointment) {
    const appointments = this.getAppointments();
    appointments.unshift(appointment);
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
    window.dispatchEvent(new CustomEvent("vaidya:appointmentsUpdated", { detail: appointments }));
    return appointment;
  },

  updateAppointmentStatus(id, newStatus, paymentStatus = null, notes = null) {
    const appointments = this.getAppointments();
    const index = appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      appointments[index].status = newStatus;
      if (paymentStatus) appointments[index].paymentStatus = paymentStatus;
      if (notes !== null) appointments[index].doctorNotes = notes;
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
      window.dispatchEvent(new CustomEvent("vaidya:appointmentsUpdated", { detail: appointments }));
      return appointments[index];
    }
    return null;
  },

  getBlockedDates() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOCKED_DATES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBlockedDate(dateStr) {
    const blocked = this.getBlockedDates();
    const idx = blocked.indexOf(dateStr);
    if (idx > -1) {
      blocked.splice(idx, 1);
    } else {
      blocked.push(dateStr);
    }
    localStorage.setItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify(blocked));
    return blocked.includes(dateStr);
  },

  getCustomSlotsForDate(dateStr) {
    try {
      const map = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_SLOTS) || "{}");
      return map[dateStr] || null;
    } catch (e) {
      return null;
    }
  },

  setCustomSlotsForDate(dateStr, slotsArray) {
    try {
      const map = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_SLOTS) || "{}");
      map[dateStr] = slotsArray;
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SLOTS, JSON.stringify(map));
    } catch (e) {
      console.error(e);
    }
  },

  getAvailableSlots(dateStr) {
    // If date is blocked
    if (this.getBlockedDates().includes(dateStr)) {
      return [];
    }

    // Custom slots if configured by doctor, otherwise default
    const custom = this.getCustomSlotsForDate(dateStr);
    const baseSlots = custom !== null ? custom : [...INITIAL_DATA.defaultAvailableSlots];

    // Filter out already booked slots for this date
    const bookedSlots = this.getAppointments()
      .filter(a => a.date === dateStr && a.status !== "Cancelled")
      .map(a => a.timeSlot);

    return baseSlots.map(slot => ({
      time: slot,
      isBooked: bookedSlots.includes(slot)
    }));
  }
};

// Initialize on script load
initializeStorage();
