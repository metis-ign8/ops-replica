// js/main.js
import { showModal, closeModal } from './modal.js';

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
  // =========== GLOBALS ===========
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  let currentLang = 'en';
  let currentTheme = 'light';

  // =========== LANGUAGE TOGGLE ===========
  function updateLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    // All text nodes and buttons
    document.querySelectorAll('[data-en], [data-es]').forEach(el => {
      if (el.hasAttribute('data-' + lang)) {
        el.textContent = el.getAttribute('data-' + lang);
      }
    });
    // All placeholders (inputs/textareas)
    document.querySelectorAll('[data-en-ph], [data-es-ph]').forEach(el => {
      el.placeholder = el.getAttribute(`data-${lang}-ph`) || el.placeholder;
    });
    // Broadcast for connector.js/others
    document.dispatchEvent(new CustomEvent('langChange', { detail: { lang } }));
  }
  langToggle.addEventListener('click', function () {
    updateLang(currentLang === 'en' ? 'es' : 'en');
    langToggle.textContent = currentLang.toUpperCase();
  });

  // =========== THEME TOGGLE ===========
  function updateTheme(theme) {
    currentTheme = theme;
    document.body.classList.toggle('dark', theme === 'dark');
    themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
    // Broadcast for connector.js/others
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
  }
  themeToggle.addEventListener('click', function () {
    updateTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

  // =========== SERVICE CARD PREVIEW MODALS ===========
  // For each card: show preview modal, learn more, drag
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function (e) {
      // Don't trigger modal if user clicks "Learn More"
      if (e.target.classList.contains('learn-btn')) return;

      const service = card.dataset.service;
      const preview = {
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
      const s = preview[service];
      if (!s) return;

      // Show modal using modal.js
      showModal({
        title: s.title[currentLang],
        body: `<p>${s.desc[currentLang]}</p>
               <img src="assets/${service}.jpg" alt="${s.title[currentLang]}" style="width:100%;max-width:350px;border-radius:10px;margin:1rem 0;">
               <video controls style="width:100%;max-width:350px;display:block;">
                 <source src="assets/${service}.mp4" type="video/mp4">
                 Your browser does not support the video tag.
               </video>`,
        footer: `<button class="learn-btn" data-service="${service}" style="margin-right:10px;">${currentLang === 'en' ? "Learn More" : "Aprender Más"}</button>
                 <button class="close-btn" style="background:#bbb;">${currentLang === 'en' ? "Close" : "Cerrar"}</button>`,
        draggable: true,
        width: "420px",
        className: "service-modal"
      });

      // Add button events INSIDE modal
      const modal = document.querySelector('.modal.service-modal');
      modal.querySelector('.learn-btn').onclick = function () {
        const pageMap = {
          business: "services/business.html",
          contactc: "services/contact-center.html",
          itsupport: "services/it-support.html",
          professionals: "services/professionals.html"
        };
        window.location.href = pageMap[service];
      };
      modal.querySelector('.close-btn').onclick = function () {
        closeModal();
      };
    });

    // Card "Learn More" direct nav
    card.querySelector('.learn-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      const service = card.dataset.service;
      const pageMap = {
        business: "services/business.html",
        contactc: "services/contact-center.html",
        itsupport: "services/it-support.html",
        professionals: "services/professionals.html"
      };
      window.location.href = pageMap[service];
    });
  });

  // =========== FAB/Join/Contact/Chatbot Modals (BROADCAST HANDLERS) ===========
  document.addEventListener('openJoin', () => {
    // Example: show join modal (replace with full join form as needed)
    showModal({
      title: currentLang === 'en' ? "Join Us" : "Únete",
      body: `<p>${currentLang === 'en' ? "Join our team via this form!" : "¡Únete a nuestro equipo con este formulario!"}</p>`,
      footer: `<button class="close-btn">${currentLang === 'en' ? "Close" : "Cerrar"}</button>`,
      draggable: true,
      width: "440px",
      className: "join-modal"
    });
    document.querySelector('.modal.join-modal .close-btn').onclick = closeModal;
  });

  document.addEventListener('openContact', () => {
    // Example: show contact modal (replace with full contact form as needed)
    showModal({
      title: currentLang === 'en' ? "Contact Us" : "Contáctenos",
      body: `<p>${currentLang === 'en' ? "Contact us for any inquiry!" : "¡Contáctenos para cualquier consulta!"}</p>`,
      footer: `<button class="close-btn">${currentLang === 'en' ? "Close" : "Cerrar"}</button>`,
      draggable: true,
      width: "440px",
      className: "contact-modal"
    });
    document.querySelector('.modal.contact-modal .close-btn').onclick = closeModal;
  });

  document.addEventListener('openChat', () => {
    // Example: show chatbot modal (replace with actual chat logic as needed)
    showModal({
      title: currentLang === 'en' ? "OPS Chatbot" : "Chatbot OPS",
      body: `<div style="height:340px;display:flex;align-items:center;justify-content:center;color:#888;">
               ${currentLang === 'en' ? "Chatbot UI here" : "Chatbot aquí"}
             </div>`,
      footer: `<button class="close-btn">${currentLang === 'en' ? "Close" : "Cerrar"}</button>`,
      draggable: true,
      width: "420px",
      className: "chatbot-modal"
    });
    document.querySelector('.modal.chatbot-modal .close-btn').onclick = closeModal;
  });

  // =========== INIT DEFAULTS ===========
  updateLang('en');
  updateTheme('light');
});
