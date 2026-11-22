/**
 * Vaidya Veda - Doctor Admin Portal Engine
 * Dedicated Control Room for Dr. Nageshree
 */

document.addEventListener("DOMContentLoaded", () => {
  initAdminAuth();
  initAdminDashboard();
});

let currentAdminFilter = "all";
let adminCalendarDate = new Date().toISOString().split("T")[0];

// Auth Check & PIN Modal
function initAdminAuth() {
  const pinModal = document.getElementById("adminPinModal");
  const authContainer = document.getElementById("adminMainContent");
  const pinInput = document.getElementById("adminPinInput");
  const pinSubmit = document.getElementById("adminPinSubmit");
  const pinError = document.getElementById("adminPinError");

  const isLoggedIn = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === "true";

  if (isLoggedIn) {
    if (pinModal) pinModal.classList.add("hidden");
    if (authContainer) authContainer.classList.remove("hidden");
    loadAllAdminData();
  } else {
    if (pinModal) pinModal.classList.remove("hidden");
    if (authContainer) authContainer.classList.add("hidden");
  }

  if (pinSubmit) {
    pinSubmit.addEventListener("click", () => {
      const pin = pinInput.value.trim();
      // Default Doctor PIN: 1234
      if (pin === "1234" || pin === "veda2024") {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, "true");
        pinModal.classList.add("hidden");
        authContainer.classList.remove("hidden");
        loadAllAdminData();
      } else {
        pinError.classList.remove("hidden");
      }
    });
  }

  // Quick logout
  const logoutBtn = document.getElementById("adminLogoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
      window.location.reload();
    });
  }
}

function loadAllAdminData() {
  renderAdminStats();
  renderAppointmentsTable();
  initSlotManager();
  initDoctorSettingsForm();

  // Listen to cross-tab updates or user bookings
  window.addEventListener("vaidya:appointmentsUpdated", () => {
    renderAdminStats();
    renderAppointmentsTable();
  });
}

function renderAdminStats() {
  const appointments = AppState.getAppointments();

  const totalBookings = appointments.length;
  const pendingCount = appointments.filter(a => a.status === "Pending").length;
  const confirmedCount = appointments.filter(a => a.status === "Confirmed").length;
  
  // Calculate revenue from verified appointments
  const totalRevenue = appointments
    .filter(a => a.paymentStatus === "Verified")
    .reduce((sum, a) => sum + (Number(a.consultationPrice) || 0), 0);

  // Today's appointments count
  const todayStr = new Date().toISOString().split("T")[0];
  const todayCount = appointments.filter(a => a.date === todayStr && a.status !== "Cancelled").length;

  document.getElementById("statTotalBookings").textContent = totalBookings;
  document.getElementById("statPendingVerification").textContent = pendingCount;
  document.getElementById("statConfirmedAppointments").textContent = confirmedCount;
  document.getElementById("statTotalRevenue").textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
  document.getElementById("statTodayAppointments").textContent = todayCount;
}

// Render Appointments Table & Filters
function renderAppointmentsTable() {
  const tableBody = document.getElementById("adminAppointmentsTableBody");
  const searchInput = document.getElementById("adminSearchInput");
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";

  if (!tableBody) return;

  let appointments = AppState.getAppointments();

  // Filter by status
  if (currentAdminFilter !== "all") {
    appointments = appointments.filter(a => a.status.toLowerCase() === currentAdminFilter.toLowerCase());
  }

  // Filter by search
  if (searchTerm) {
    appointments = appointments.filter(a => 
      a.patientName.toLowerCase().includes(searchTerm) ||
      a.id.toLowerCase().includes(searchTerm) ||
      a.phone.includes(searchTerm) ||
      a.utrNumber.toLowerCase().includes(searchTerm)
    );
  }

  if (appointments.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="p-8 text-center text-sm text-[#5C554E]">
          No appointments found matching this criteria.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = appointments.map(a => `
    <tr class="border-b border-[#F0EAE1] hover:bg-[#FAF7F2]/60 transition-colors">
      <td class="py-4 px-4">
        <div class="font-mono text-xs font-bold text-[#B86B43]">${a.id}</div>
        <div class="text-[11px] text-[#5C554E]">${new Date(a.createdAt).toLocaleDateString('en-IN')}</div>
      </td>
      <td class="py-4 px-4">
        <div class="font-bold text-sm text-[#1E1C1A]">${a.patientName}</div>
        <div class="text-xs text-[#5C554E]">${a.phone} • ${a.city} (Age ${a.age || '--'})</div>
      </td>
      <td class="py-4 px-4">
        <div class="text-xs font-medium text-[#1E1C1A]">${a.consultationType}</div>
        <div class="text-[11px] font-semibold text-[#B86B43]">₹${a.consultationPrice}</div>
      </td>
      <td class="py-4 px-4">
        <div class="font-medium text-xs text-[#1E1C1A]">${a.date}</div>
        <div class="text-xs font-bold text-[#B86B43]">${a.timeSlot}</div>
      </td>
      <td class="py-4 px-4">
        <div class="flex items-center gap-1.5">
          <span class="inline-block w-2 h-2 rounded-full ${a.paymentStatus === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}"></span>
          <span class="text-xs font-semibold ${a.paymentStatus === 'Verified' ? 'text-emerald-700' : 'text-amber-700'}">${a.paymentStatus}</span>
        </div>
        <div class="text-[10px] font-mono text-[#5C554E] mt-0.5">UTR: ${a.utrNumber}</div>
      </td>
      <td class="py-4 px-4">
        <span class="px-2.5 py-1 rounded-full text-xs font-bold ${
          a.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
          a.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
          a.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
        }">
          ${a.status}
        </span>
      </td>
      <td class="py-4 px-4 text-right">
        <div class="flex items-center justify-end gap-2">
          <button onclick="openPatientDetailModal('${a.id}')" title="View Patient Details" class="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#1E1C1A] hover:text-white transition-colors text-[#1E1C1A]">
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
          ${a.status === 'Pending' ? `
            <button onclick="quickVerifyAppointment('${a.id}')" title="Verify Payment & Confirm" class="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-colors text-emerald-700">
              <i data-lucide="check" class="w-4 h-4"></i>
            </button>
          ` : ''}
          <a href="https://wa.me/${a.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${a.patientName}, this is Dr. Nageshree from Vaidya Veda regarding your appointment on ${a.date} at ${a.timeSlot}.`)}" target="_blank" title="WhatsApp Patient" class="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-500 hover:text-white transition-colors text-emerald-600">
            <i data-lucide="message-circle" class="w-4 h-4"></i>
          </a>
        </div>
      </td>
    </tr>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function initAdminDashboard() {
  // Tab switcher
  const tabBtns = document.querySelectorAll(".admin-tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => {
        b.classList.remove("border-[#B86B43]", "text-[#1E1C1A]", "font-bold");
        b.classList.add("border-transparent", "text-[#5C554E]");
      });
      btn.classList.add("border-[#B86B43]", "text-[#1E1C1A]", "font-bold");
      btn.classList.remove("border-transparent", "text-[#5C554E]");

      const targetTab = btn.getAttribute("data-tab");
      document.querySelectorAll(".admin-tab-pane").forEach(pane => pane.classList.add("hidden"));
      const targetPane = document.getElementById(targetTab);
      if (targetPane) targetPane.classList.remove("hidden");
    });
  });

  // Table status filter pills
  const statusPills = document.querySelectorAll(".admin-status-pill");
  statusPills.forEach(pill => {
    pill.addEventListener("click", () => {
      statusPills.forEach(p => {
        p.classList.remove("bg-[#1E1C1A]", "text-white");
        p.classList.add("bg-[#FAF7F2]", "text-[#5C554E]");
      });
      pill.classList.add("bg-[#1E1C1A]", "text-white");
      pill.classList.remove("bg-[#FAF7F2]", "text-[#5C554E]");

      currentAdminFilter = pill.getAttribute("data-filter");
      renderAppointmentsTable();
    });
  });

  // Live search
  const searchInput = document.getElementById("adminSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      renderAppointmentsTable();
    });
  }
}

// Patient detail inspection modal
window.openPatientDetailModal = function(id) {
  const appointment = AppState.getAppointments().find(a => a.id === id);
  if (!appointment) return;

  const modal = document.getElementById("patientDetailModal");
  const modalContent = document.getElementById("patientDetailModalContent");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="p-6">
      <div class="flex items-center justify-between border-b border-[#F0EAE1] pb-4 mb-5">
        <div>
          <span class="text-xs font-mono font-bold text-[#B86B43]">${appointment.id}</span>
          <h3 class="font-serif text-xl font-bold text-[#1E1C1A]">${appointment.patientName}</h3>
        </div>
        <button onclick="closePatientDetailModal()" class="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#1E1C1A] hover:bg-[#1E1C1A] hover:text-white flex items-center justify-center">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4 mb-5 text-xs">
        <div class="p-3 bg-[#FAF7F2] rounded-xl">
          <span class="text-[#5C554E] block mb-1">Phone Number</span>
          <strong class="text-[#1E1C1A] text-sm">${appointment.phone}</strong>
        </div>
        <div class="p-3 bg-[#FAF7F2] rounded-xl">
          <span class="text-[#5C554E] block mb-1">Email</span>
          <strong class="text-[#1E1C1A] text-sm">${appointment.email}</strong>
        </div>
        <div class="p-3 bg-[#FAF7F2] rounded-xl">
          <span class="text-[#5C554E] block mb-1">Consultation Date & Slot</span>
          <strong class="text-[#1E1C1A] text-sm">${appointment.date} at ${appointment.timeSlot}</strong>
        </div>
        <div class="p-3 bg-[#FAF7F2] rounded-xl">
          <span class="text-[#5C554E] block mb-1">Consultation Type</span>
          <strong class="text-[#1E1C1A] text-sm">${appointment.consultationType} (₹${appointment.consultationPrice})</strong>
        </div>
      </div>

      <div class="mb-5">
        <label class="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">Patient Reported Fertility Concern</label>
        <div class="p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl text-xs text-[#2C2724] leading-relaxed">
          <span class="font-semibold text-amber-900 block mb-1">Category: ${appointment.concernType.toUpperCase()} FERTILITY</span>
          ${appointment.concernDetails}
        </div>
      </div>

      <div class="mb-5">
        <label class="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">UPI Transaction Verification</label>
        <div class="p-3 bg-white border border-[#E8DFD5] rounded-xl flex items-center justify-between text-xs">
          <div>
            <span class="text-[#5C554E]">UTR Reference: </span>
            <strong class="font-mono text-sm text-[#1E1C1A]">${appointment.utrNumber}</strong>
          </div>
          <span class="px-2.5 py-1 rounded-full font-bold ${appointment.paymentStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
            ${appointment.paymentStatus}
          </span>
        </div>
      </div>

      <div class="mb-5">
        <label class="block text-xs font-bold text-[#1E1C1A] mb-1 uppercase tracking-wider">Doctor Clinical Notes</label>
        <textarea id="modalDoctorNotes" rows="3" class="w-full text-xs p-3 rounded-xl border border-[#E8DFD5] bg-white focus:outline-none focus:border-[#B86B43]">${appointment.doctorNotes || ''}</textarea>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-[#F0EAE1]">
        <div class="flex gap-2">
          <button onclick="saveDoctorNotes('${appointment.id}')" class="px-4 py-2 rounded-xl text-xs font-bold bg-[#1E1C1A] text-white hover:bg-[#B86B43] transition-colors">
            Save Notes
          </button>
          ${appointment.status !== 'Confirmed' ? `
            <button onclick="updateStatusFromModal('${appointment.id}', 'Confirmed', 'Verified')" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
              Verify & Confirm
            </button>
          ` : `
            <button onclick="updateStatusFromModal('${appointment.id}', 'Completed', 'Verified')" class="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Mark Consult Completed
            </button>
          `}
        </div>
        <button onclick="updateStatusFromModal('${appointment.id}', 'Cancelled')" class="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors">
          Cancel Slot
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
};

window.closePatientDetailModal = function() {
  const modal = document.getElementById("patientDetailModal");
  if (modal) modal.classList.add("hidden");
};

window.quickVerifyAppointment = function(id) {
  AppState.updateAppointmentStatus(id, "Confirmed", "Verified");
  renderAdminStats();
  renderAppointmentsTable();
  alert("Appointment marked as Confirmed and Payment Verified!");
};

window.saveDoctorNotes = function(id) {
  const notes = document.getElementById("modalDoctorNotes").value;
  AppState.updateAppointmentStatus(id, null, null, notes);
  closePatientDetailModal();
  renderAppointmentsTable();
};

window.updateStatusFromModal = function(id, status, paymentStatus = null) {
  AppState.updateAppointmentStatus(id, status, paymentStatus);
  closePatientDetailModal();
  renderAdminStats();
  renderAppointmentsTable();
};

// CSV Export for Doctor Clinic Records
window.exportAppointmentsToCSV = function() {
  const appointments = AppState.getAppointments();
  if (appointments.length === 0) {
    alert("No records to export.");
    return;
  }

  const headers = ["ID", "Patient Name", "Phone", "Email", "City", "Age", "Date", "Slot", "Type", "Price", "UTR", "Payment Status", "Status", "Doctor Notes"];
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
    `"${(a.doctorNotes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `VaidyaVeda_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Doctor Slot & Schedule Management
function initSlotManager() {
  const dateInput = document.getElementById("adminSlotDatePicker");
  if (!dateInput) return;

  // Set default to today or tomorrow
  dateInput.value = adminCalendarDate;

  dateInput.addEventListener("change", (e) => {
    adminCalendarDate = e.target.value;
    renderSlotManagerGrid();
  });

  renderSlotManagerGrid();
}

function renderSlotManagerGrid() {
  const container = document.getElementById("adminSlotsManagerGrid");
  const blockedToggle = document.getElementById("adminBlockDayToggle");
  if (!container) return;

  const isBlocked = AppState.getBlockedDates().includes(adminCalendarDate);
  if (blockedToggle) blockedToggle.checked = isBlocked;

  const customSlots = AppState.getCustomSlotsForDate(adminCalendarDate);
  const activeSlots = customSlots !== null ? customSlots : [...INITIAL_DATA.defaultAvailableSlots];

  // All standard available base slots
  const allMasterSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:30 PM", "03:30 PM", "04:30 PM",
    "05:30 PM", "06:30 PM", "07:30 PM", "08:30 PM"
  ];

  container.innerHTML = allMasterSlots.map(slot => {
    const isEnabled = activeSlots.includes(slot);
    return `
      <div class="flex items-center justify-between p-3 rounded-xl border ${isEnabled ? 'bg-emerald-50/50 border-emerald-200' : 'bg-gray-50 border-gray-200 opacity-60'}">
        <span class="text-xs font-bold ${isEnabled ? 'text-emerald-900' : 'text-gray-500'}">${slot}</span>
        <button type="button" onclick="toggleSlotForDate('${slot}')" class="px-3 py-1 rounded-lg text-xs font-semibold ${isEnabled ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}">
          ${isEnabled ? 'Active' : 'Disabled'}
        </button>
      </div>
    `;
  }).join('');
}

window.toggleSlotForDate = function(slotTime) {
  let customSlots = AppState.getCustomSlotsForDate(adminCalendarDate);
  if (customSlots === null) {
    customSlots = [...INITIAL_DATA.defaultAvailableSlots];
  }

  const idx = customSlots.indexOf(slotTime);
  if (idx > -1) {
    customSlots.splice(idx, 1);
  } else {
    customSlots.push(slotTime);
  }

  AppState.setCustomSlotsForDate(adminCalendarDate, customSlots);
  renderSlotManagerGrid();
};

window.toggleDayBlocked = function() {
  const isNowBlocked = AppState.toggleBlockedDate(adminCalendarDate);
  renderSlotManagerGrid();
  alert(isNowBlocked ? `Date ${adminCalendarDate} blocked for all bookings.` : `Date ${adminCalendarDate} unblocked!`);
};

window.resetSlotsToDefault = function() {
  AppState.setCustomSlotsForDate(adminCalendarDate, [...INITIAL_DATA.defaultAvailableSlots]);
  renderSlotManagerGrid();
  alert("Slots reset to standard consultation timings for this date.");
};

// Doctor Profile & UPI Settings Form
function initDoctorSettingsForm() {
  const doc = AppState.getDoctorSettings();
  const upiInput = document.getElementById("adminDoctorUpiInput");
  const phoneInput = document.getElementById("adminDoctorPhoneInput");
  const emailInput = document.getElementById("adminDoctorEmailInput");
  const clinicInput = document.getElementById("adminDoctorClinicInput");

  if (upiInput) upiInput.value = doc.upiId;
  if (phoneInput) phoneInput.value = doc.contactPhone;
  if (emailInput) emailInput.value = doc.contactEmail;
  if (clinicInput) clinicInput.value = doc.clinicAddress;

  const saveBtn = document.getElementById("saveDoctorSettingsBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const updated = {
        ...doc,
        upiId: upiInput.value.trim(),
        contactPhone: phoneInput.value.trim(),
        contactEmail: emailInput.value.trim(),
        clinicAddress: clinicInput.value.trim()
      };
      AppState.updateDoctorSettings(updated);
      alert("Doctor profile & UPI payment configurations updated successfully!");
    });
  }
}
