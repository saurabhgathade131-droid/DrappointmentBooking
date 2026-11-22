# Vaidya Veda (वैद्य वेद) 🌿
### Aesthetic Ayurvedic Fertility & Conception Platform for Dr. Nageshree (BAMS)

> **"Rooted in Ancient Ayurvedic Reproductive Science, Blossoming in Natural Life."**

Vaidya Veda is a production-grade, highly aesthetic web platform crafted specifically for **Dr. Nageshree**, an esteemed Ayurvedic BAMS physician and former Senior Fertility Consultant at **Gynoveda**. Having successfully guided **over 200 couples to conceive naturally**, this website serves as her digital sanctum for both male and female fertility care, national TV interviews, and appointment bookings.

---

## 🎨 Visual Identity & Design System

- **Monogram Logo (`V • D`)**: Elegantly integrates the letters **V** (Vaidya/Veda) and **D** (Doctor) along with a sacred Ayurvedic botanical sprouting leaf, Seed of Life geometry, and a central conception lotus node.
- **Color Palette**:
  - **Calming Pastel Family**: Almond Linen (`#FAF7F2`), Warm Sand (`#F3ECE4`), Healing Herbal Sage (`#E8EFE9`), and Soft Terracotta Blush (`#F9EFEA`).
  - **Luxury Accents**: Radiant Metallic Copper (`#B86B43`, `#D6855B`), Deep Earth Bronze (`#8E4623`), and Deep Charcoal Black (`#1E1C1A`).
- **Typography**: Cormorant Garamond / Playfair Display for warm classical Ayurvedic heritage paired with Plus Jakarta Sans for clinical legibility.
- **Motion & Micro-Gestures**: Smooth floating animations, glowing counter stats, interactive video modals, dynamic calendar transitions, and a live radar scan on the UPI QR code generator.

---

## 🌟 Key Features

### 1. Patient Experience (`index.html`)
- **Authority Hero Section**: Dr. Nageshree’s BAMS credentials, ex-Gynoveda lead track record, and verified trust badges.
- **Clinical Stats Counter**: Live animated counters showcasing:
  - **200+ Natural Conceptions** (Ultrasound verified)
  - **95% Ovulatory Cycle Regularity**
  - **14,500+ Couples Consulted Globally**
  - **25+ TV & Media Interviews**
- **Dual-Factor Infertility Focus**:
  - **Female Care**: PCOS/PCOD reversal, Low AMH rejuvenation, Endometriosis, and Thin Endometrium.
  - **Male Care**: Oligospermia (Low sperm count), Asthenozoospermia (Motility revival), and Teratozoospermia (Morphology repair).
  - **Garbh Sanskar & Beej Shuddhi**: Pre-conception genomic and metabolic detoxification.
- **TV & Broadcast Showcase**: Interactive video cards highlighting Dr. Nageshree's appearances on national channels (**Zee 24 Taas, Saam TV, ABP Majha, Ayush Summit**).
- **Verified Couple Testimonials**: Filterable success stories (Female, Male, Both) with real timelines and baby announcements.
- **Interactive 3-Step Hassle-Free Appointment Booking**:
  - **Step 1**: Choose Consultation Type (Video ₹799, Couple Deep-Dive ₹1,299, In-Clinic ₹999) + basic patient details.
  - **Step 2**: Live interactive calendar with real-time slot availability from the doctor's schedule.
  - **Step 3 (UPI Gateway)**: Dynamic UPI QR code generator with doctor's VPA (`drnageshree@okaxis`), deep-link pay button for mobile UPI apps, UPI ID copy button, and 12-digit UTR confirmation.
  - **Instant Digital Pass**: Generates a downloadable / WhatsApp-sharable confirmation slip with Google Calendar integration.

### 2. Doctor Admin Portal (`admin.html`)
- **PIN Protected**: Secure doctor login (Default PIN: `1234`).
- **Real-Time Clinical Metrics**: Total bookings, verified revenue (₹), pending checks, and today's schedule at a glance.
- **Appointments CRM**:
  - Filter by status (All, Pending, Confirmed, Completed, Cancelled).
  - Live search by patient name, phone, or UTR number.
  - One-click actions: "Verify UPI & Confirm", "Mark Consult Completed", "Cancel Slot".
  - Full case review modal with doctor's clinical notes editor.
  - One-click WhatsApp message trigger with pre-filled patient appointment details.
  - **Export to CSV** for offline clinical records.
- **Daily Slot & Schedule Manager**:
  - Pick any date on the calendar.
  - Toggle individual hourly slots (09:00 AM through 08:30 PM) on or off.
  - Block entire days for conferences, medical summits, or leave.
  - One-click reset to standard 8 consultation slots.
- **Doctor Profile & UPI Settings**:
  - Live configuration of official UPI ID, clinic phone number, email, and address.

---

## 🚀 Running the React + TypeScript Server Locally

The Vite development server is **already active and running** on your machine:
- **Local URL**: [http://localhost:3000/](http://localhost:3000/)
- **Doctor Admin Portal**: Access directly by clicking the **"Doctor Admin Portal"** link in the top bar / navbar, or click the lock icon 🔒 *(Default PIN: `1234`)*

To manually start or build the application at any time:

```bash
cd /Users/saurabhgathade/.gemini/antigravity/scratch/vaidya-veda

# Start Vite Development Server
npm run dev

# Build for Production
npm run build
```

---

## 📁 Project Architecture

```
vaidya-veda/
├── index.html                 # Customer-facing website with hero, stats, media, booking wizard
├── admin.html                 # Dedicated Doctor Admin Console for Dr. Nageshree
├── server.py                  # Zero-dependency local development server
├── README.md                  # Complete project documentation
└── assets/
    ├── css/
    │   └── styles.css         # Pastel & copper palette, micro-animations, calendar styling
    ├── js/
    │   ├── data.js            # Initial data seed, doctor profile, media, testimonials, state layer
    │   ├── app.js             # Patient website interactivity, calendar slot picker, UPI QR generator
    │   └── admin.js           # Admin portal engine, slot toggles, CRM filters, CSV export
    └── images/
        └── logo.svg           # Custom V&D monogram with sacred Ayurvedic botanical & lotus motif
```

---

## 🌿 Setting Up as Active Workspace

To set this folder as your active workspace in Antigravity or your IDE:
```
/Users/saurabhgathade/.gemini/antigravity/scratch/vaidya-veda
```
