/**
 * Vaidya Veda - Frontend Interactive Engine
 * Dr. Nageshree (BAMS, Ayurvedic Fertility Specialist)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize UI components
  initNavigation();
  initStatsCounter();
  initPackages();
  initMediaInterviews();
  initTestimonials();
  initBookingWizard();
  initFAQ();
  initDoctorLiveBanner();
});

// Toast notification helper
function showToast(message, type = "success") {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  const iconEl = document.getElementById("toastIcon");

  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (type === "success") {
    iconEl.className = "w-5 h-5 text-emerald-600";
    toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-emerald-200 shadow-xl show";
  } else if (type === "error") {
    iconEl.className = "w-5 h-5 text-rose-600";
    toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-rose-200 shadow-xl show";
  } else {
    iconEl.className = "w-5 h-5 text-copper-600";
    toast.className = "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white border border-amber-200 shadow-xl show";
  }

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// 1. Navigation handling
function initNavigation() {
  const navbar = document.getElementById("mainNavbar");
  const mobileToggle = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenuDrawer");
  const closeMobileBtn = document.getElementById("closeMobileMenuBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("bg-white/95", "backdrop-blur-md", "shadow-soft", "py-3");
      navbar.classList.remove("py-5", "bg-transparent");
    } else {
      navbar.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-soft", "py-3");
      navbar.classList.add("py-5", "bg-transparent");
    }
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
    });
  }
  if (closeMobileBtn && mobileMenu) {
    closeMobileBtn.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#" && document.querySelector(targetId)) {
        e.preventDefault();
        if (mobileMenu) mobileMenu.classList.add("translate-x-full");
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });
}

// 2. Doctor Live Banner Update
function initDoctorLiveBanner() {
  const doc = AppState.getDoctorSettings();
  const upiDisplay = document.querySelectorAll(".doctor-upi-id");
  upiDisplay.forEach(el => el.textContent = doc.upiId);

  window.addEventListener("vaidya:doctorUpdated", (e) => {
    const updated = e.detail;
    document.querySelectorAll(".doctor-upi-id").forEach(el => el.textContent = updated.upiId);
  });
}

// 3. Stats Counter Animation
function initStatsCounter() {
  const counters = document.querySelectorAll(".counter-stat");
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute("data-target"), 10);
          const suffix = counter.getAttribute("data-suffix") || "";
          let current = 0;
          const increment = Math.ceil(target / 45);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = current + suffix;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById("statsSection");
  if (statsSection) observer.observe(statsSection);
}

// 4. Consultation Packages Render
function initPackages() {
  const container = document.getElementById("packagesContainer");
  if (!container) return;

  container.innerHTML = INITIAL_DATA.consultationTypes.map(pkg => `
    <div class="relative bg-white rounded-3xl p-8 border ${pkg.badge === 'Most Popular' ? 'border-[#B86B43] ring-2 ring-[#B86B43]/20 shadow-copper' : 'border-[#E8DFD5] shadow-soft'} flex flex-col justify-between hover:-translate-y-2 transition-all duration-300">
      ${pkg.badge ? `<div class="absolute -top-3.5 left-8 bg-[#1E1C1A] text-[#FAF7F2] text-xs font-bold tracking-wider uppercase px-4 py-1 rounded-full shadow-sm">${pkg.badge}</div>` : ''}
      
      <div>
        <div class="flex items-center justify-between mb-4 mt-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-[#B86B43] bg-[#E8EFE9] px-3 py-1 rounded-lg">${pkg.duration}</span>
          <div class="flex items-baseline gap-1">
            <span class="text-3xl font-extrabold text-[#1E1C1A]">₹${pkg.price}</span>
            <span class="text-xs text-[#5C554E]">/ session</span>
          </div>
        </div>

        <h3 class="font-serif text-2xl font-bold text-[#1E1C1A] mb-3">${pkg.name}</h3>
        <p class="text-sm text-[#5C554E] mb-6 leading-relaxed">${pkg.description}</p>

        <div class="space-y-3 mb-8 pt-4 border-t border-[#F0EAE1]">
          ${pkg.features.map(f => `
            <div class="flex items-center gap-3 text-sm text-[#2C2724]">
              <span class="w-5 h-5 rounded-full bg-[#E8EFE9] text-[#B86B43] flex items-center justify-center shrink-0">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
              </span>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <button onclick="openBookingModal('${pkg.id}')" class="w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${pkg.badge === 'Most Popular' ? 'bg-[#1E1C1A] text-white hover:bg-[#B86B43]' : 'bg-[#FAF7F2] hover:bg-[#1E1C1A] text-[#1E1C1A] hover:text-white border border-[#E8DFD5]'}">
        <span>Book ${pkg.name.split(' ')[0]}</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 5. TV Interviews and Media Section
function initMediaInterviews() {
  const container = document.getElementById("mediaContainer");
  if (!container) return;

  container.innerHTML = INITIAL_DATA.mediaInterviews.map(media => `
    <div class="group bg-white rounded-3xl overflow-hidden border border-[#E8DFD5] shadow-soft shadow-card-hover flex flex-col justify-between">
      <div class="relative overflow-hidden cursor-pointer" onclick="openVideoModal('${media.id}')">
        <img src="${media.thumbnail}" alt="${media.title}" class="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#1E1C1A]">
          ${media.channel}
        </div>
        <div class="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-md text-xs font-medium">
          ${media.duration}
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-14 h-14 rounded-full bg-[#B86B43] text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <i data-lucide="play" class="w-6 h-6 fill-current ml-0.5"></i>
          </div>
        </div>
      </div>

      <div class="p-6 flex flex-col justify-between flex-grow">
        <div>
          <div class="flex items-center justify-between text-xs text-[#B86B43] font-medium mb-2">
            <span>${media.topic}</span>
            <span class="text-[#5C554E]">${media.views}</span>
          </div>
          <h4 class="font-serif text-lg font-bold text-[#1E1C1A] mb-2 leading-snug group-hover:text-[#B86B43] transition-colors">
            ${media.title}
          </h4>
          <p class="text-xs text-[#5C554E] leading-relaxed line-clamp-2">
            ${media.summary}
          </p>
        </div>

        <button onclick="openVideoModal('${media.id}')" class="mt-4 pt-3 border-t border-[#F0EAE1] flex items-center justify-between text-xs font-bold text-[#1E1C1A] hover:text-[#B86B43] transition-colors">
          <span>Watch Doctor's Explanation</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Video modal
window.openVideoModal = function(mediaId) {
  const media = INITIAL_DATA.mediaInterviews.find(m => m.id === mediaId);
  if (!media) return;

  const modal = document.getElementById("videoModal");
  const modalContent = document.getElementById("videoModalContent");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#B86B43]">${media.channel} • ${media.topic}</span>
          <h3 class="font-serif text-xl font-bold text-[#1E1C1A]">${media.title}</h3>
        </div>
        <button onclick="closeVideoModal()" class="w-9 h-9 rounded-full bg-[#FAF7F2] text-[#1E1C1A] hover:bg-[#1E1C1A] hover:text-white flex items-center justify-center transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>

      <div class="relative w-full rounded-2xl overflow-hidden aspect-video bg-black shadow-inner mb-4">
        <!-- Mock Video Player Interface with Doctor Insights -->
        <div class="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold tracking-wide">
              <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span> TV Broadcast Segment
            </span>
            <span class="text-white text-xs opacity-80">${media.duration}</span>
          </div>

          <div class="text-center my-auto">
            <div class="w-20 h-20 mx-auto rounded-full bg-[#B86B43]/90 text-white flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 transition-transform">
              <i data-lucide="play" class="w-8 h-8 fill-current ml-1"></i>
            </div>
            <p class="text-white text-sm font-medium mt-3">Click to Stream Segment with Dr. Nageshree</p>
          </div>

          <div class="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-white text-xs flex items-center justify-between">
            <span>Key Focus: Natural Ovulation & Semen Quality Protocols</span>
            <span class="text-[#D6855B] font-semibold">Ex-Gynoveda Clinical Archives</span>
          </div>
        </div>
      </div>

      <div class="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E8DFD5] text-xs text-[#5C554E] leading-relaxed">
        <strong class="text-[#1E1C1A] block mb-1">Key Takeaway from Dr. Nageshree:</strong>
        ${media.summary}
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
};

window.closeVideoModal = function() {
  const modal = document.getElementById("videoModal");
  if (modal) modal.classList.add("hidden");
};

// 6. Testimonials Section
let currentTestimonialFilter = "all";

function initTestimonials() {
  renderTestimonialCards();

  const filterBtns = document.querySelectorAll(".test-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-[#1E1C1A]", "text-white");
        b.classList.add("bg-white", "text-[#5C554E]");
      });
      btn.classList.add("bg-[#1E1C1A]", "text-white");
      btn.classList.remove("bg-white", "text-[#5C554E]");

      currentTestimonialFilter = btn.getAttribute("data-filter");
      renderTestimonialCards();
    });
  });
}

function renderTestimonialCards() {
  const container = document.getElementById("testimonialsContainer");
  if (!container) return;

  const filtered = currentTestimonialFilter === "all"
    ? INITIAL_DATA.testimonials
    : INITIAL_DATA.testimonials.filter(t => t.category === currentTestimonialFilter || t.category === "both");

  container.innerHTML = filtered.map(t => `
    <div class="bg-white rounded-3xl p-8 border border-[#E8DFD5] shadow-soft shadow-card-hover flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-1 text-[#B86B43]">
            ${Array(5).fill('<i data-lucide="star" class="w-4 h-4 fill-current"></i>').join('')}
          </div>
          <span class="text-xs font-semibold px-3 py-1 rounded-full bg-[#E8EFE9] text-emerald-800 flex items-center gap-1.5">
            <i data-lucide="badge-check" class="w-3.5 h-3.5 text-emerald-600"></i> ${t.conceptionTime}
          </span>
        </div>

        <div class="mb-3">
          <span class="text-xs font-bold uppercase tracking-wider text-[#B86B43]">${t.condition}</span>
        </div>

        <p class="text-sm text-[#2C2724] leading-relaxed italic mb-6">
          "${t.quote}"
        </p>
      </div>

      <div class="pt-4 border-t border-[#F0EAE1] flex items-center justify-between">
        <div>
          <h5 class="font-serif font-bold text-base text-[#1E1C1A]">${t.couple}</h5>
          <span class="text-xs text-[#5C554E]">${t.location}</span>
        </div>
        <div class="text-right">
          <span class="text-xs font-medium text-emerald-700 block">${t.babyBorn}</span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// 7. Interactive Appointment Booking Wizard
let bookingState = {
  selectedPackage: null,
  patientName: "",
  phone: "",
  email: "",
  city: "",
  age: "",
  concernType: "female",
  concernDetails: "",
  selectedDate: null,
  selectedSlot: null,
  utrNumber: "",
  paymentScreenshotName: "",
  currentStep: 1,
  currentCalendarMonth: new Date().getMonth(),
  currentCalendarYear: new Date().getFullYear()
};

function initBookingWizard() {
  // Set default selected package to first package
  bookingState.selectedPackage = INITIAL_DATA.consultationTypes[0];

  // Set default selected date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  bookingState.selectedDate = tomorrow.toISOString().split("T")[0];

  renderCalendar();
  renderAvailableSlots();
}

window.openBookingModal = function(packageId = null) {
  if (packageId) {
    const pkg = INITIAL_DATA.consultationTypes.find(p => p.id === packageId);
    if (pkg) bookingState.selectedPackage = pkg;
  }
  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    goToBookingStep(1);
  }
};

window.closeBookingModal = function() {
  const modal = document.getElementById("bookingModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
};

window.goToBookingStep = function(step) {
  bookingState.currentStep = step;

  // Update step indicators
  document.querySelectorAll(".step-indicator").forEach((el, idx) => {
    const stepNum = idx + 1;
    const circle = el.querySelector(".step-circle");
    const label = el.querySelector(".step-label");

    if (stepNum === step) {
      circle.className = "step-circle w-8 h-8 rounded-full bg-[#B86B43] text-white flex items-center justify-center font-bold text-xs ring-4 ring-[#B86B43]/20";
      if (label) label.className = "step-label text-xs font-bold text-[#1E1C1A]";
    } else if (stepNum < step) {
      circle.className = "step-circle w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs";
      circle.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i>';
      if (label) label.className = "step-label text-xs font-medium text-[#5C554E]";
    } else {
      circle.className = "step-circle w-8 h-8 rounded-full bg-[#F0E6DE] text-[#5C554E] flex items-center justify-center font-bold text-xs";
      circle.textContent = stepNum;
      if (label) label.className = "step-label text-xs font-medium text-[#5C554E]/60";
    }
  });

  // Toggle step panes
  document.getElementById("stepPane1").classList.toggle("hidden", step !== 1);
  document.getElementById("stepPane2").classList.toggle("hidden", step !== 2);
  document.getElementById("stepPane3").classList.toggle("hidden", step !== 3);
  document.getElementById("stepPane4").classList.toggle("hidden", step !== 4);

  if (step === 1) renderStep1PackageList();
  if (step === 2) {
    renderCalendar();
    renderAvailableSlots();
  }
  if (step === 3) renderPaymentView();

  if (window.lucide) lucide.createIcons();
};

function renderStep1PackageList() {
  const container = document.getElementById("wizardPackageSelector");
  if (!container) return;

  container.innerHTML = INITIAL_DATA.consultationTypes.map(pkg => `
    <div onclick="selectWizardPackage('${pkg.id}')" class="cursor-pointer p-4 rounded-2xl border transition-all ${bookingState.selectedPackage.id === pkg.id ? 'border-[#B86B43] bg-[#E8EFE9]/40 ring-2 ring-[#B86B43]/20' : 'border-[#E8DFD5] bg-white hover:border-[#B86B43]/50'}">
      <div class="flex items-center justify-between">
        <div>
          <span class="font-serif font-bold text-sm text-[#1E1C1A]">${pkg.name}</span>
          <span class="text-xs text-[#5C554E] block">${pkg.duration} • ${pkg.badge}</span>
        </div>
        <span class="font-extrabold text-[#B86B43] text-base">₹${pkg.price}</span>
      </div>
    </div>
  `).join('');
}

window.selectWizardPackage = function(pkgId) {
  const pkg = INITIAL_DATA.consultationTypes.find(p => p.id === pkgId);
  if (pkg) {
    bookingState.selectedPackage = pkg;
    renderStep1PackageList();
  }
};

window.validateStep1AndProceed = function() {
  const name = document.getElementById("inputPatientName").value.trim();
  const phone = document.getElementById("inputPatientPhone").value.trim();
  const email = document.getElementById("inputPatientEmail").value.trim();
  const age = document.getElementById("inputPatientAge").value.trim();
  const city = document.getElementById("inputPatientCity").value.trim();
  const concernType = document.querySelector('input[name="wizardConcernType"]:checked')?.value || "both";
  const concernDetails = document.getElementById("inputPatientConcern").value.trim();

  if (!name) {
    showToast("Please enter patient or couple name", "error");
    return;
  }
  if (!phone || phone.length < 10) {
    showToast("Please enter a valid 10-digit mobile number", "error");
    return;
  }

  bookingState.patientName = name;
  bookingState.phone = phone;
  bookingState.email = email || `${name.toLowerCase().replace(/\s+/g, '')}@patient.in`;
  bookingState.age = age || "30";
  bookingState.city = city || "Pune";
  bookingState.concernType = concernType;
  bookingState.concernDetails = concernDetails || "Fertility consultation regarding natural conception roadmap.";

  goToBookingStep(2);
};

// Calendar Rendering Logic
function renderCalendar() {
  const calGrid = document.getElementById("calendarDaysGrid");
  const monthDisplay = document.getElementById("calendarMonthDisplay");
  if (!calGrid || !monthDisplay) return;

  const year = bookingState.currentCalendarYear;
  const month = bookingState.currentCalendarMonth;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthDisplay.textContent = `${monthNames[month]} ${year}`;

  // First day of month and total days
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const blockedDates = AppState.getBlockedDates();

  let html = "";

  // Leading empty cells
  for (let i = 0; i < firstDayIndex; i++) {
    html += `<div class="p-2 text-center text-transparent"></div>`;
  }

  // Days
  for (let day = 1; day <= totalDays; day++) {
    const currentIterDate = new Date(year, month, day);
    currentIterDate.setHours(0, 0, 0, 0);

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isPast = currentIterDate < today;
    const isBlocked = blockedDates.includes(dateStr);
    const isToday = currentIterDate.getTime() === today.getTime();
    const isSelected = bookingState.selectedDate === dateStr;

    let classes = "calendar-day-cell";
    if (isPast || isBlocked) {
      classes += " disabled";
    } else {
      if (isSelected) classes += " selected";
      if (isToday) classes += " today";
    }

    const clickAttr = (!isPast && !isBlocked) ? `onclick="selectBookingDate('${dateStr}')"` : "";

    html += `
      <div class="${classes}" ${clickAttr}>
        <span>${day}</span>
      </div>
    `;
  }

  calGrid.innerHTML = html;
}

window.prevCalendarMonth = function() {
  bookingState.currentCalendarMonth--;
  if (bookingState.currentCalendarMonth < 0) {
    bookingState.currentCalendarMonth = 11;
    bookingState.currentCalendarYear--;
  }
  renderCalendar();
};

window.nextCalendarMonth = function() {
  bookingState.currentCalendarMonth++;
  if (bookingState.currentCalendarMonth > 11) {
    bookingState.currentCalendarMonth = 0;
    bookingState.currentCalendarYear++;
  }
  renderCalendar();
};

window.selectBookingDate = function(dateStr) {
  bookingState.selectedDate = dateStr;
  bookingState.selectedSlot = null; // reset slot on date change
  renderCalendar();
  renderAvailableSlots();
};

function renderAvailableSlots() {
  const container = document.getElementById("timeSlotsContainer");
  const selectedDateLabel = document.getElementById("selectedDateLabel");
  if (!container) return;

  if (!bookingState.selectedDate) {
    container.innerHTML = `<p class="text-sm text-[#5C554E] col-span-2">Please select a date first.</p>`;
    return;
  }

  const dateObj = new Date(bookingState.selectedDate);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  if (selectedDateLabel) selectedDateLabel.textContent = dateObj.toLocaleDateString('en-IN', options);

  const slots = AppState.getAvailableSlots(bookingState.selectedDate);

  if (slots.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 p-4 rounded-xl bg-amber-50 text-amber-800 text-xs border border-amber-200">
        All slots for this day are fully booked or doctor is on leave. Please select another date.
      </div>
    `;
    return;
  }

  container.innerHTML = slots.map(slot => `
    <button type="button" 
      onclick="selectBookingSlot('${slot.time}')" 
      ${slot.isBooked ? 'disabled' : ''} 
      class="time-slot-btn ${bookingState.selectedSlot === slot.time ? 'active' : ''}">
      ${slot.time}
      ${slot.isBooked ? '<span class="block text-[10px] text-rose-500 font-normal">Booked</span>' : ''}
    </button>
  `).join('');
}

window.selectBookingSlot = function(timeStr) {
  bookingState.selectedSlot = timeStr;
  renderAvailableSlots();
};

window.validateStep2AndProceed = function() {
  if (!bookingState.selectedDate) {
    showToast("Please choose an appointment date", "error");
    return;
  }
  if (!bookingState.selectedSlot) {
    showToast("Please select an available time slot", "error");
    return;
  }
  goToBookingStep(3);
};

// Step 3: Payment & UPI
function renderPaymentView() {
  const doc = AppState.getDoctorSettings();
  const summaryPkgName = document.getElementById("paymentSummaryPkg");
  const summaryPrice = document.getElementById("paymentSummaryPrice");
  const summaryDate = document.getElementById("paymentSummaryDate");
  const upiIdDisplay = document.getElementById("paymentUpiIdText");
  const upiPayLink = document.getElementById("upiIntentPayLink");

  if (summaryPkgName) summaryPkgName.textContent = bookingState.selectedPackage.name;
  if (summaryPrice) summaryPrice.textContent = `₹${bookingState.selectedPackage.price}`;
  if (summaryDate) summaryDate.textContent = `${bookingState.selectedDate} at ${bookingState.selectedSlot}`;
  if (upiIdDisplay) upiIdDisplay.textContent = doc.upiId;

  // Construct standard UPI Pay Intent URI: upi://pay?pa=VPA&pn=NAME&am=AMOUNT&cu=INR&tn=NOTES
  const note = encodeURIComponent(`Consultation-${bookingState.patientName.replace(/\s+/g, '')}`);
  const upiUri = `upi://pay?pa=${encodeURIComponent(doc.upiId)}&pn=${encodeURIComponent(doc.name)}&am=${bookingState.selectedPackage.price}&cu=INR&tn=${note}`;
  
  if (upiPayLink) {
    upiPayLink.href = upiUri;
  }

  // Draw clean dynamic QR on Canvas
  drawUpiQrCode(upiUri);
}

function drawUpiQrCode(qrData) {
  const canvas = document.getElementById("upiQrCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = canvas.width;

  // Generate stylized aesthetic QR simulation using high-contrast geometric matrix
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);

  // Generate deterministic pattern based on hash of string
  ctx.fillStyle = "#1E1C1A";

  // Finder patterns (top-left, top-right, bottom-left)
  function drawFinder(x, y) {
    ctx.fillRect(x, y, 50, 50);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(x + 8, y + 8, 34, 34);
    ctx.fillStyle = "#B86B43";
    ctx.fillRect(x + 16, y + 16, 18, 18);
    ctx.fillStyle = "#1E1C1A";
  }

  drawFinder(15, 15);
  drawFinder(size - 65, 15);
  drawFinder(15, size - 65);

  // Decorative data dots
  let seed = 42;
  for (let i = 0; i < qrData.length; i++) {
    seed = (seed * 31 + qrData.charCodeAt(i)) % 99999;
  }

  const dotSize = 8;
  for (let x = 15; x < size - 15; x += dotSize) {
    for (let y = 15; y < size - 15; y += dotSize) {
      // Skip finder zones
      if ((x < 75 && y < 75) || (x > size - 80 && y < 75) || (x < 75 && y > size - 80)) {
        continue;
      }
      seed = (seed * 9301 + 49297) % 233280;
      if (seed / 233280 > 0.45) {
        ctx.fillStyle = (x > size / 2 && y > size / 2) ? "#B86B43" : "#1E1C1A";
        ctx.fillRect(x, y, dotSize - 1.5, dotSize - 1.5);
      }
    }
  }

  // Center Monogram V&D Badge
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#B86B43";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = "#B86B43";
  ctx.font = "bold 13px 'Playfair Display', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("V • D", size / 2, size / 2);
}

window.copyUpiId = function() {
  const doc = AppState.getDoctorSettings();
  navigator.clipboard.writeText(doc.upiId).then(() => {
    showToast("Doctor's UPI ID copied: " + doc.upiId);
  }).catch(() => {
    showToast("Doctor's UPI ID: " + doc.upiId);
  });
};

window.confirmUpiPaymentAndBook = function() {
  const utr = document.getElementById("inputUtrRef").value.trim();
  if (!utr || utr.length < 6) {
    showToast("Please enter the 12-digit UPI Reference / UTR Number from your payment app", "error");
    return;
  }

  // Create new appointment record
  const appointmentId = "VV-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);

  const newAppointment = {
    id: appointmentId,
    patientName: bookingState.patientName,
    phone: bookingState.phone,
    email: bookingState.email,
    city: bookingState.city,
    age: bookingState.age,
    concernType: bookingState.concernType,
    concernDetails: bookingState.concernDetails,
    consultationType: bookingState.selectedPackage.name,
    consultationPrice: bookingState.selectedPackage.price,
    date: bookingState.selectedDate,
    timeSlot: bookingState.selectedSlot,
    paymentMode: "UPI",
    utrNumber: utr,
    paymentStatus: "Pending Verification",
    status: "Pending",
    doctorNotes: "New booking via website. Awaiting initial record submission.",
    createdAt: new Date().toISOString()
  };

  AppState.saveAppointment(newAppointment);

  // Render Confirmation Pass
  renderConfirmationPass(newAppointment);
  goToBookingStep(4);
  showToast("Appointment successfully submitted! Dr. Nageshree's team will verify your slot.");
};

function renderConfirmationPass(appointment) {
  document.getElementById("passAppointmentId").textContent = appointment.id;
  document.getElementById("passPatientName").textContent = appointment.patientName;
  document.getElementById("passPackageName").textContent = appointment.consultationType;
  document.getElementById("passDateTime").textContent = `${appointment.date} at ${appointment.timeSlot}`;
  document.getElementById("passUtr").textContent = appointment.utrNumber;

  // WhatsApp quick trigger
  const whatsappBtn = document.getElementById("whatsappPassBtn");
  if (whatsappBtn) {
    const text = encodeURIComponent(`Namaste Dr. Nageshree, I have booked a fertility consultation (${appointment.id}) for ${appointment.patientName} on ${appointment.date} at ${appointment.timeSlot}. My UPI UTR is ${appointment.utrNumber}. Looking forward to your guidance.`);
    whatsappBtn.href = `https://wa.me/919823045678?text=${text}`;
  }

  // Google Calendar Add Link
  const gcalBtn = document.getElementById("gcalAddBtn");
  if (gcalBtn) {
    const [year, month, day] = appointment.date.split('-');
    const startTimeStr = `${year}${month}${day}T100000Z`;
    const endTimeStr = `${year}${month}${day}T110000Z`;
    const title = encodeURIComponent(`Fertility Consultation with Dr. Nageshree (${appointment.id})`);
    const details = encodeURIComponent(`Ayurvedic Consultation with Dr. Nageshree (BAMS, ex-Gynoveda). Consultation: ${appointment.consultationType}. Patient: ${appointment.patientName}.`);
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeStr}/${endTimeStr}&details=${details}`;
  }
}

// 8. FAQ Accordion
function initFAQ() {
  const toggles = document.querySelectorAll(".faq-toggle");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector(".faq-icon");
      const isOpen = !content.classList.contains("hidden");

      // Close other FAQs
      document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
      document.querySelectorAll(".faq-icon").forEach(i => i.classList.remove("rotate-180"));

      if (!isOpen) {
        content.classList.remove("hidden");
        icon.classList.add("rotate-180");
      }
    });
  });
}
