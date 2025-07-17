// connector.js
// Central event bus for toggles, modal, language, theme, chatbot, etc.

export function initToggles() {
  const langToggle = document.getElementById('lang-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const mobileLangToggle = document.getElementById('mobile-lang-toggle');
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  const chatbotLangToggle = document.getElementById('chatbot-lang-toggle');
  const chatbotThemeToggle = document.getElementById('chatbot-theme-toggle');

  // Language switch
  function toggleLang() {
    // update all elements with data-i18n; pseudo-localization
    // You would use a library or JSON in real life; for demo, we just flip EN/ES text.
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const current = el.textContent.trim();
      const en = el.dataset.i18n;
      const es = el.dataset.es || translateToSpanish(en);
      el.textContent = (current === en ? es : en);
    });
    document.querySelectorAll('input,textarea').forEach(input => {
      if(input.dataset.en && input.dataset.es) {
        input.placeholder = input.placeholder === input.dataset.en ? input.dataset.es : input.dataset.en;
      }
    });
    // update toggle text
    [langToggle, mobileLangToggle, chatbotLangToggle].forEach(tog => tog && (tog.textContent = tog.textContent === 'EN' ? 'ES' : 'EN'));
  }
  langToggle && langToggle.addEventListener('click', toggleLang);
  mobileLangToggle && mobileLangToggle.addEventListener('click', toggleLang);
  chatbotLangToggle && chatbotLangToggle.addEventListener('click', toggleLang);

  // Theme switch
  function toggleTheme() {
    document.body.classList.toggle('dark');
    [themeToggle, mobileThemeToggle, chatbotThemeToggle].forEach(tog => tog && (tog.textContent = tog.textContent === 'Dark' ? 'Light' : 'Dark'));
  }
  themeToggle && themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle && mobileThemeToggle.addEventListener('click', toggleTheme);
  chatbotThemeToggle && chatbotThemeToggle.addEventListener('click', toggleTheme);
}

// Minimal pseudo-translation stub for demo
function translateToSpanish(text) {
  const map = {
    "Business Operations":"Operaciones Empresariales",
    "Contact Center":"Centro de Contacto",
    "IT Support":"Soporte IT",
    "Professionals":"Profesionales",
    "Learn More":"Aprende Más",
    "Join Us":"Únete",
    "Contact Us":"Contáctanos",
    "Ask Chattia":"Preguntar AI",
    "I am human":"Soy humano",
    "Cancel":"Cancelar",
    "Submit":"Enviar",
    "Send":"Enviar",
    "OPS • Chattia":"OPS • Chattia"
  };
  return map[text] || text;
}
