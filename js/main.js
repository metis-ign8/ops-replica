// js/main.js

document.addEventListener('DOMContentLoaded', function () {
  // === GLOBALS ===
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  let currentLang = 'en';
  let currentTheme = 'light';

  // --- Language Switch ---
  function updateLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute('data-' + lang);
    });
    document.querySelectorAll('[data-en-ph]').forEach(el => {
      el.placeholder = el.getAttribute('data-' + lang + '-ph');
    });
    document.querySelectorAll('[data-es], [data-en]').forEach(el => {
      // For options/labels/buttons not caught by the main selector
      if (el.hasAttribute('data-' + lang)) {
        el.textContent = el.getAttribute('data-' + lang);
      }
    });
    // Tell other JS modules
    document.dispatchEvent(new CustomEvent('langChange', { detail: { lang } }));
  }
  langToggle.addEventListener('click', function () {
    updateLang(currentLang === 'en' ? 'es' : 'en');
    langToggle.textContent = currentLang.toUpperCase();
  });

  // --- Theme Switch ---
  function updateTheme(theme) {
    currentTheme = theme;
    document.body.classList.toggle('dark', theme === 'dark');
    themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
    // Tell other JS modules
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  }
  themeToggle.addEventListener('click', function () {
    updateTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

  // === SERVICE CARD MODALS ===
  // Card click → modal with content preview, call-to-action
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.classList.contains('learn-btn')) return; // handled below
      showServiceModal(card.dataset.service);
    });
    // Learn More button: go to full service page
    card.querySelector('.learn-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      // Map service to page
      const pageMap = {
        business: "services/business.html",
        contactc: "services/contact-center.html",
        itsupport: "services/it-support.html",
        professionals: "services/professionals.html"
      };
      window.location.href = pageMap[card.dataset.service];
    });
  });

  // === MODALS ===
  const modalOverlay = document.getElementById('modal-overlay');

  function showServiceModal(service) {
    // Remove any existing modal
    closeModal();

    // Dynamic content for each service preview modal
    const serviceContent = {
      business: {
        title: { en: "Business Operations", es: "Gestión" },
        desc: {
          en: "Preview of our Business Operations solutions.",
          es: "Vista previa de nuestras soluciones de Gestión."
        }
      },
      contactc: {
        title: { en: "Contact Center", es: "Centro de Servicios" },
        desc: {
          en: "Preview of our Contact Center offerings.",
          es: "Vista previa de nuestros servicios de Contact Center."
        }
      },
      itsupport: {
        title: { en: "IT Support", es: "Soporte IT" },
        desc: {
          en: "Preview of our IT Support expertise.",
          es: "Vista previa de nuestro soporte IT."
        }
      },
      professionals: {
        title: { en: "Professionals", es: "Profesionales" },
        desc: {
          en: "Preview of our network of professionals.",
          es: "Vista previa de nuestra red de profesionales."
        }
      }
    };

    const s = serviceContent[service];
    if (!s) return;

    // Modal content structure
    const modalHTML = `
      <div class="modal service-modal" role="dialog" aria-modal="true" draggable="true">
        <button class="modal-close" aria-label="Close">&times;</button>
        <div class="modal-header">${s.title[currentLang]}</div>
        <div class="modal-content">${s.desc[currentLang]}</div>
        <div class="modal-footer">
          <button class="modal-learn learn-btn" data-service="${service}">
            ${currentLang === 'en' ? "Learn More" : "Aprender Más"}
          </button>
        </div>
      </div>
    `;
    modalOverlay.innerHTML = modalHTML;
    modalOverlay.setAttribute('aria-hidden', 'false');
    modalOverlay.style.display = "flex";

    // Learn More inside modal
    modalOverlay.querySelector('.modal-learn').onclick = function () {
      const pageMap = {
        business: "services/business.html",
        contactc: "services/contact-center.html",
        itsupport: "services/it-support.html",
        professionals: "services/professionals.html"
      };
      window.location.href = pageMap[service];
    };

    // Close modal handlers
    modalOverlay.querySelector('.modal-close').onclick = closeModal;
    modalOverlay.onclick = function (e) {
      if (e.target === modalOverlay) closeModal();
    };
    document.onkeydown = function (e) {
      if (e.key === 'Escape') closeModal();
    };

    // Draggable modal (simple)
    makeDraggable(modalOverlay.querySelector('.modal'));
  }

  function closeModal() {
    modalOverlay.innerHTML = "";
    modalOverlay.style.display = "none";
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.onkeydown = null;
  }

  // === DRAGGABLE MODALS ===
  function makeDraggable(modal) {
    let isDragging = false, offsetX = 0, offsetY = 0;
    modal.addEventListener('mousedown', function (e) {
      if (e.target.classList.contains('modal-close')) return;
      isDragging = true;
      offsetX = e.clientX - modal.getBoundingClientRect().left;
      offsetY = e.clientY - modal.getBoundingClientRect().top;
      modal.style.transition = 'none';
      modal.style.cursor = 'move';
    });
    document.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      modal.style.position = "fixed";
      modal.style.left = (e.clientX - offsetX) + "px";
      modal.style.top = (e.clientY - offsetY) + "px";
      modal.style.margin = 0;
    });
    document.addEventListener('mouseup', function () {
      isDragging = false;
      modal.style.transition = '';
      modal.style.cursor = '';
    });
  }

  // === FABs, JOIN, CONTACT, CHATBOT modals ===
  // They’re rendered by fabmain.js (mobile/adaptable screens) and listened by connector.js, central.js
  // This file dispatches or listens to those events for global logic

  // Listen to FAB triggers (broadcasted from fabmain.js, e.g. 'openJoin', 'openContact', 'openChat')
  document.addEventListener('openJoin', () => showJoinModal());
  document.addEventListener('openContact', () => showContactModal());
  document.addEventListener('openChat', () => showChatbotModal());

  // Placeholder stubs (your join/contact/chat logic goes here)
  function showJoinModal() {/* ... */}
  function showContactModal() {/* ... */}
  function showChatbotModal() {/* ... */}

  // === INITIALIZE (default EN, light) ===
  updateLang('en');
  updateTheme('light');
});
