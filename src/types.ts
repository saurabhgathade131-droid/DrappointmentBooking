export interface DoctorProfile {
  name: string;
  fullName: string;
  title: string;
  role: string;
  exAffiliation: string;
  regNumber: string;
  experienceYears: number;
  successCount: number;
  patientCount: string;
  satisfactionRate: string;
  bio: string;
  corePhilosophy: string;
  sanskritShloka: string;
  instagramHandle: string;
  instagramUrl: string;
  upiId: string;
  contactEmail: string;
  contactPhone: string;
  clinicAddress: string;
}

export interface ConsultationType {
  id: string;
  name: string;
  duration: string;
  price: number;
  badge?: string;
  description: string;
  features: string[];
}

export interface MediaInterview {
  id: string;
  channel: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  topic: string;
  summary: string;
  youtubeEmbedId: string;
}

export interface InstagramPost {
  id: string;
  title: string;
  category: string;
  tagline: string;
  views: string;
  summary: string;
  image?: string;
  accentColor: string;
}

export interface Testimonial {
  id: string;
  couple: string;
  location: string;
  conceptionTime: string;
  condition: string;
  quote: string;
  babyBorn: string;
  verified: boolean;
  category: 'female' | 'male' | 'both';
}

export interface ClinicalStat {
  number: string;
  label: string;
  desc: string;
}

export interface PrescribedMedicine {
  id: string;
  name: string;
  form: string; // e.g. "Kwath / Decoction", "Vati / Tablet", "Ghrita / Medicated Ghee", "Churna / Powder"
  dosage: string; // e.g. "1 tsp (5ml)", "2 tablets", "1 pouch"
  frequency: string; // e.g. "Twice daily", "Once daily", "Thrice daily"
  timing: string; // e.g. "After meals with warm water", "Before breakfast with warm milk"
  durationDays: number;
  instructions?: string;
}

export interface RecommendedTest {
  id: string;
  testName: string;
  urgency: 'Routine' | 'Before Next Cycle' | 'Immediate';
  purpose?: string;
}

export interface DietAndLifestylePlan {
  dietToInclude: string[];
  dietToAvoid: string[];
  lifestyleGuidance: string[];
  garbhSanskarNote?: string;
}

export interface ClinicalPrescription {
  id: string;
  appointmentId: string;
  patientName: string;
  age: number | string;
  gender: string;
  consultationDate: string;
  consultationMode: string;
  vitalSigns?: {
    bp?: string;
    weight?: string;
    pulseNadi?: string;
  };
  prakritiDosha: {
    dominant: 'Vata-Pitta' | 'Pitta-Kapha' | 'Vata-Kapha' | 'Tridoshic' | 'Pitta' | 'Vata' | 'Kapha';
    agniState: 'Mandagni' | 'Tikshnagni' | 'Vishamagni' | 'Samagni';
    dhatuImbalance: string;
  };
  clinicalDiagnosis: string;
  fertilityParametersNote: string;
  medicines: PrescribedMedicine[];
  recommendedTests: RecommendedTest[];
  dietAndLifestyle: DietAndLifestylePlan;
  doctorAdvice: string;
  nextFollowUpDate: string;
  doctorSignature: {
    doctorName: string;
    qualification: string;
    regNumber: string;
    signedDate: string;
  };
}

export interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  city: string;
  age: number | string;
  concernType: 'female' | 'male' | 'both';
  concernDetails: string;
  consultationType: string;
  consultationPrice: number;
  date: string;
  timeSlot: string;
  paymentMode: 'UPI';
  utrNumber: string;
  paymentStatus: 'Pending Verification' | 'Verified' | 'Failed';
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  doctorNotes?: string;
  prescription?: ClinicalPrescription;
  createdAt: string;
}

export interface SlotAvailability {
  time: string;
  isBooked: boolean;
}
