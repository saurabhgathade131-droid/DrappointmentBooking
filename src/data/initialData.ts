import { DoctorProfile, ConsultationType, MediaInterview, Testimonial, ClinicalStat, Appointment, InstagramPost, ClinicalPrescription } from '../types';

export const INITIAL_DOCTOR: DoctorProfile = {
  name: "Dr. Nagasri Tenneti",
  fullName: "Dr. Nagasri Tenneti (BAMS)",
  title: "BAMS (Ayurvedacharya)",
  role: "Ayurvedic Fertility & Reproductive Health Specialist",
  exAffiliation: "Former Senior Fertility Consultant at Gynoveda",
  regNumber: "AYU-MAH-48921/A",
  experienceYears: 12,
  successCount: 200,
  patientCount: "14,500+",
  satisfactionRate: "98.4%",
  sanskritShloka: "आरोग्यं परमं भाग्यं स्वास्थ्यं सर्वार्थसाधनम् ..!!",
  instagramHandle: "@vedic_vd",
  instagramUrl: "https://instagram.com/vedic_vd",
  bio: "Dr. Nagasri Tenneti is an acclaimed Ayurvedic physician with over a decade of dedicated clinical practice in reproductive endocrinology, classical Beej Shuddhi, and natural conception. Having spearheaded holistic fertility protocols at Gynoveda, she has empowered more than 200 couples suffering from chronic male and female factor infertility to conceive naturally without intrusive hormonal interventions.",
  corePhilosophy: "Rooted in classical Caraka & Sushruta Samhita, her treatment protocols harmonize Beej Shuddhi (gamete purification), Garbhashaya Shodhana (uterine readiness), and Shukra-Artava rejuvenation using pure medicinal botanical extracts and metabolic alignment.",
  upiId: "vedicvaidya@okaxis",
  contactEmail: "care@vedicvaidya.com",
  contactPhone: "+91 98230 45678",
  clinicAddress: "Vedic Vaidya Wellness Sanctum, 402 Lotus Pavilion, Off FC Road, Pune & Online Teleconsultations Worldwide"
};

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    title: "Most Fertility Check-Ups Miss 3 Out of 4 Root Causes",
    category: "Clinical Diagnostic Reel",
    tagline: "Why standard scans miss metabolic & gamete vitality",
    views: "24.5K plays",
    summary: "Dr. Nagasri Tenneti breaks down why ultrasound and basic blood tests often overlook cellular oxidative stress, endometrial receptivity, and sperm DNA fragmentation.",
    accentColor: "from-amber-600 to-rose-700"
  },
  {
    id: "ig-2",
    title: "Conference Keynote: Ayurvedic Reproductive Endocrinology",
    category: "Live Summit Talk",
    tagline: "Addressing national fertility summits on stage",
    views: "18.2K plays",
    summary: "Dr. Nagasri presenting clinical pregnancy outcomes following classical Garbhashaya Shodhana and Uttar Basti therapies to health professionals.",
    accentColor: "from-amber-500 to-amber-700"
  },
  {
    id: "ig-3",
    title: "You Have the Right to Know What's Happening in Your Own Body",
    category: "Patient Empowerment",
    tagline: "Demystifying hormones, follicular growth, and cycle rhythm",
    views: "31.0K plays",
    summary: "Empowering women and men with transparent medical education so they can make confident, conscious decisions about their conception journey.",
    accentColor: "from-yellow-500 to-amber-600"
  },
  {
    id: "ig-4",
    title: "The Truth About Commercial 'Detox Teas' vs Classical Beej Shuddhi",
    category: "Myth Buster",
    tagline: "No single cup fixes chronic reproductive roadblocks",
    views: "42.8K plays",
    summary: "Exposing quick-fix marketing gimmicks and detailing how real Ayurvedic cellular detoxification works through customized shodhana and dinacharya.",
    accentColor: "from-rose-700 to-amber-900"
  },
  {
    id: "ig-5",
    title: "Is Infertility Really Only 'HER' Fault? Breaking Male Stigma",
    category: "Male Fertility Advocacy",
    tagline: "Over 45% of conception challenges stem from sperm factors",
    views: "56.4K plays",
    summary: "Dr. Nagasri highlights that conception is an equal partnership, showing how oligospermia, low motility, and morphology can be restored with Shukra Dhatu rasayanas.",
    accentColor: "from-red-800 to-neutral-900"
  },
  {
    id: "ig-6",
    title: "Healing the Body, Welcoming New Life: Metabolic Harmony",
    category: "Conception Milestone",
    tagline: "When we align body, mind & metabolism, magic happens",
    views: "28.9K plays",
    summary: "Reflecting on guiding over 200 couples to natural conception: 'Grateful to play a small role in helping couples extend their families through natural, time-tested wisdom.'",
    accentColor: "from-rose-600 to-pink-800"
  },
  {
    id: "ig-7",
    title: "Ayurvedic 1-Minute Protein Ladoo for Oocyte & Shukra Vitality",
    category: "Fertility Nutrition",
    tagline: "Almonds, cashews, raisins, walnuts, dates, pista & poppy seeds",
    views: "64.1K plays",
    summary: "Quick nutrient-dense pre-conception recipe packed with zinc, selenium, healthy fats, and antioxidants to nourish gamete DNA.",
    accentColor: "from-sky-700 to-indigo-900"
  },
  {
    id: "ig-8",
    title: "This OR That: Clinical Food Swaps for Hormonal Balance",
    category: "Dinacharya Guide",
    tagline: "Smart daily diet choices to pacify Vata and stimulate Agni",
    views: "37.5K plays",
    summary: "Practical everyday food choices that reduce systemic inflammation and support regular luteal phase progesterone production.",
    accentColor: "from-amber-400 to-orange-600"
  }
];

export const CONSULTATION_TYPES: ConsultationType[] = [
  {
    id: "video-consult",
    name: "Comprehensive Video Consultation",
    duration: "45 mins",
    price: 799,
    badge: "Most Popular",
    description: "1-on-1 private video assessment with Dr. Nagasri Tenneti reviewing medical reports (AMH, semen analysis, pelvic scan), dosha imbalance analysis, and customized 90-day Ayurvedic fertility roadmap.",
    features: [
      "Full Blood & Semen Report Review",
      "Personalized Herbal Prescription & Letterhead",
      "Diet & Dinacharya Regimen PDF",
      "7 Days Post-Consult WhatsApp Support"
    ]
  },
  {
    id: "couple-dive",
    name: "Couple Pre-Conception Deep Dive",
    duration: "60 mins",
    price: 1299,
    badge: "Highest Conception Rate",
    description: "Joint holistic consultation for both partners addressing both sperm vitality and ovulatory health simultaneously for optimal conception readiness.",
    features: [
      "Dual Partner Diagnostic Analysis",
      "Sperm Count & Motility Revival Plan",
      "PCOS / Endometrium Optimization",
      "Official Dual Prescription Letterhead",
      "15 Days Direct WhatsApp Support"
    ]
  },
  {
    id: "in-clinic",
    name: "In-Person Clinic Consultation",
    duration: "45 mins",
    price: 999,
    badge: "Physical Examination",
    description: "In-depth pulse diagnosis (Nadi Pariksha), prakriti evaluation, and tailored panchakarma recommendations at our Pune clinic.",
    features: [
      "Nadi Pariksha (Pulse Diagnosis)",
      "Prakriti & Agni Assessment",
      "Printed Official Clinic Letterhead",
      "Follow-up review schedule included"
    ]
  }
];

export const MEDIA_INTERVIEWS: MediaInterview[] = [
  {
    id: "media-1",
    channel: "Zee 24 Taas Health",
    title: "Ayurvedic Solutions for High AMH & Severe PCOS Infertility",
    thumbnail: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    duration: "24:15 mins",
    views: "185K views",
    topic: "Female Fertility & Hormonal Balance",
    summary: "Dr. Nagasri Tenneti explains why synthetic oral contraceptives mask PCOS symptoms and demonstrates how Shodhita Guggulu and Shatavari formulations restore spontaneous ovulation naturally.",
    youtubeEmbedId: "dQw4w9WgXcQ"
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
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    couple: "Pooja & Rohan Kulkarni",
    location: "Pune, Maharashtra",
    conceptionTime: "Conceived in 4 Months",
    condition: "Severe PCOS + Oligospermia (Low Sperm Count)",
    quote: "After 5 failed IUI cycles, doctors pushed us toward IVF. We consulted Dr. Nagasri Tenneti when she was at Gynoveda and continued our journey with her. Within 120 days of her customized herbs and dietary shifts, my cycles normalized and Rohan's motility jumped from 18% to 54%. We welcomed our baby boy in August!",
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
    quote: "Every allopathic clinic told me my egg reserve was exhausted and recommended donor eggs. Dr. Nagasri reassured me that quality matters more than quantity. Her Garbhashaya Shodhana regimen nurtured my lining to 9.2mm. We saw our double pink lines naturally without any hormone shots!",
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
    quote: "Dr. Nagasri is truly a godsend. She treated Siddharth's oxidative stress with precision Ayurvedic rasayanas while regulating my luteal phase. Her warmth and calm confidence gave us hope when we were emotionally exhausted. Today we hold our little miracle in our arms.",
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
    quote: "All our standard scans were 'normal' yet we couldn't conceive for four frustrating years. Dr. Nagasri identified subtle Agni and Apana Vata imbalances that allopathy missed. Her Beej Shuddhi therapy did what 4 years of clinical visits couldn't.",
    babyBorn: "Baby Boy Reyansh, Born Feb 2025",
    verified: true,
    category: "female"
  }
];

export const CLINICAL_STATS: ClinicalStat[] = [
  { number: "200+", label: "Confirmed Natural Conceptions", desc: "Clinically documented sonogram confirmed pregnancies" },
  { number: "95%", label: "Ovulatory Cycle Restoration", desc: "Natural cycle rhythm restored without synthetic pills" },
  { number: "3.2x", label: "Average Sperm Count Revival", desc: "Significant jump in total motile sperm concentration" },
  { number: "14,500+", label: "Couples & Women Consulted", desc: "Across India, UK, USA, UAE & Australia" }
];

export const DEFAULT_AVAILABLE_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:30 PM",
  "03:30 PM",
  "04:30 PM",
  "05:30 PM",
  "06:30 PM"
];

// Rich Sample Prescription for Sneha & Amit Joshi
const SAMPLE_PRESCRIPTION_1: ClinicalPrescription = {
  id: "RX-VV-2024-8901",
  appointmentId: "VV-2024-8901",
  patientName: "Sneha & Amit Joshi",
  age: 31,
  gender: "Couple (F: 31, M: 33)",
  consultationDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
  consultationMode: "Video Consultation",
  vitalSigns: {
    bp: "118/76 mmHg",
    weight: "58 kg / 72 kg",
    pulseNadi: "Pitta-Vata (Mandagni dominant in female partner)"
  },
  prakritiDosha: {
    dominant: "Vata-Pitta",
    agniState: "Vishamagni",
    dhatuImbalance: "Artava Vaha Srotas Avarodha & Shukra Dhatu Mandata"
  },
  clinicalDiagnosis: "PCOS with Delayed Anovulatory Cycles (45-50 days) & Moderate Oligo-Asthenozoospermia (28% motility)",
  fertilityParametersNote: "Wife: Day 2 AMH is 6.2 ng/mL with multiple peripheral follicles. Husband: Semen count 21 M/ml, Progressive motility 28%. Treatment goal: Stimulate spontaneous ovulation & elevate forward progressive velocity > 45%.",
  medicines: [
    {
      id: "med-1",
      name: "Shatavari Gulam & Phala Ghrita Blend",
      form: "Ghrita / Medicated Ghee",
      dosage: "1 tablespoon (10g)",
      frequency: "Twice daily",
      timing: "Empty stomach in morning & bedtime with warm cow's milk",
      durationDays: 60,
      instructions: "Nourishes the endometrial lining to 9mm+ and strengthens oocyte mitochondrial membrane."
    },
    {
      id: "med-2",
      name: "Kanchnar Guggulu (Shodhita)",
      form: "Vati / Tablets",
      dosage: "2 tablets",
      frequency: "Twice daily",
      timing: "30 mins after lunch & dinner with lukewarm water",
      durationDays: 60,
      instructions: "Dissolves ovarian cystic congestion and balances luteinizing hormone (LH)."
    },
    {
      id: "med-3",
      name: "Ashwagandha & Gokshura Shukra Vardhak Rasayana",
      form: "Churna / Botanical Powder",
      dosage: "1 teaspoon (5g)",
      frequency: "Twice daily",
      timing: "After meals with warm milk & pinch of cardamom",
      durationDays: 90,
      instructions: "Prescribed for husband to lower testicular oxidative stress and accelerate sperm motility."
    },
    {
      id: "med-4",
      name: "Beej Shuddhi Kwath",
      form: "Kwath / Herbal Decoction",
      dosage: "40 ml fresh decoction",
      frequency: "Once daily",
      timing: "Early morning 6:30 AM",
      durationDays: 30,
      instructions: "Deep cellular detox to eliminate Apana Vata stagnation before fertile window."
    }
  ],
  recommendedTests: [
    {
      id: "test-1",
      testName: "Transvaginal Ultrasound (Folliculometry Serial Scan Day 11, 13, 15)",
      urgency: "Before Next Cycle",
      purpose: "Track dominant follicle growth (target 18-22mm) and triple-line endometrial thickness."
    },
    {
      id: "test-2",
      testName: "Repeat Semen Analysis (Strict Kruger Morphology)",
      urgency: "Routine",
      purpose: "Assess motility improvement after 60 days of rasayana protocol."
    },
    {
      id: "test-3",
      testName: "Serum Progesterone (Day 21)",
      urgency: "Before Next Cycle",
      purpose: "Confirm spontaneous corpus luteum rupture and progesterone surge."
    }
  ],
  dietAndLifestyle: {
    dietToInclude: [
      "Soaked almonds (5) & walnuts (2) every morning",
      "Fresh pomegranate and black raisins soaked overnight",
      "Pure A2 Cow Ghee (1 tsp with every meal)",
      "Warm sesame and pumpkin seeds (Seed Cycling Phase 1)"
    ],
    dietToAvoid: [
      "Refined bakery flour (Maida), white sugar & soda",
      "Excess sour, fermented batter (stale idli/dosa) and vinegar",
      "Deep fried snacks and cold refrigerated water",
      "Smoking, alcohol and excessive coffee intake"
    ],
    lifestyleGuidance: [
      "Sleep strictly by 10:30 PM to optimize melatonin & reproductive hormones",
      "Daily 20 mins of Anulom Vilom and Bhramari Pranayama together",
      "Abhyanga: Warm sesame oil lower abdominal self-massage (avoid during menses)",
      "Avoid placing laptops on lap or excessive sauna/hot baths (for husband)"
    ],
    garbhSanskarNote: "Practice 10 mins daily conscious positive visualization for welcoming a healthy, calm baby into your family."
  },
  doctorAdvice: "Patience and consistency are paramount. Cellular gamete spermatogenesis takes 74 days, and follicular recruitment takes 90 days. Follow the medicines without skipping a single day. Stay relaxed.",
  nextFollowUpDate: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
  doctorSignature: {
    doctorName: "Dr. Nagasri Tenneti",
    qualification: "BAMS (Ayurvedacharya)",
    regNumber: "AYU-MAH-48921/A",
    signedDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0]
  }
};

export const SAMPLE_APPOINTMENTS: Appointment[] = [
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
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: "11:00 AM",
    paymentMode: "UPI",
    utrNumber: "UPI439201948291",
    paymentStatus: "Verified",
    status: "Confirmed",
    doctorNotes: "Review husband's semen report and wife's AMH on Day 2. Prescribed initial 60-day roadmap.",
    prescription: SAMPLE_PRESCRIPTION_1,
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

// Presets for Doctor Quick-Selection in Admin
export const COMMON_AYURVEDIC_MEDICINES = [
  { name: "Phala Ghrita", form: "Ghrita / Medicated Ghee", dosage: "1 tbsp (10g)", timing: "Empty stomach with warm milk", durationDays: 60 },
  { name: "Shatavari Gulam", form: "Lehyam / Herbal Paste", dosage: "1 tsp (5g)", timing: "Twice daily with warm milk", durationDays: 90 },
  { name: "Kanchnar Guggulu", form: "Vati / Tablets", dosage: "2 tablets", timing: "Post meals with warm water", durationDays: 60 },
  { name: "Pushpadhanwa Ras", form: "Rasushadhi Tablet", dosage: "1 tablet", timing: "Twice daily with honey/milk", durationDays: 45 },
  { name: "Ashwagandharishta", form: "Asava / Arishta", dosage: "20 ml with equal water", timing: "Twice daily after meals", durationDays: 60 },
  { name: "Gokshuradi Guggulu", form: "Vati / Tablets", dosage: "2 tablets", timing: "Twice daily with water", durationDays: 45 },
  { name: "Beej Shuddhi Rasayana", form: "Churna / Powder", dosage: "1 tsp (5g)", timing: "Bedtime with lukewarm water", durationDays: 30 },
  { name: "Chandraprabha Vati", form: "Vati / Tablets", dosage: "2 tablets", timing: "Morning & evening after meals", durationDays: 60 },
  { name: "Kumaryasava", form: "Asava Ferment", dosage: "15 ml with equal water", timing: "After meals twice daily", durationDays: 60 },
  { name: "Sukumar Ghrita", form: "Ghrita / Medicated Ghee", dosage: "1 tbsp", timing: "Morning on empty stomach", durationDays: 45 }
];

export const COMMON_RECOMMENDED_TESTS = [
  "Transvaginal Ultrasound (Folliculometry & Endometrial Thickness)",
  "Serum AMH Level (Anti-Müllerian Hormone)",
  "Semen Analysis (Strict Kruger Morphology & Forward Motility)",
  "Day 2/3 Hormone Panel (FSH, LH, Prolactin, Estradiol)",
  "Complete Thyroid Profile (TSH, Free T3, Free T4, Anti-TPO)",
  "Serum Vitamin D3 & Vitamin B12 Levels",
  "Pelvic Doppler Blood Flow Sonogram",
  "Sperm DNA Fragmentation Index (DFI)"
];
