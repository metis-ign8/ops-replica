import { initModals } from './modal.js';
import { initFabs } from './fabs.js';
import { initAccordion } from './fabs.js';
import { initToggles } from './connector.js';
import { initChatbot } from './chatbot.js';

document.addEventListener('DOMContentLoaded', () => {
  // Modals (cards, join, contact, chatbot)
  initModals();

  // FABs, mobile nav, accordion
  initFabs();
  initAccordion();

  // Language and theme toggles
  initToggles();

  // Chatbot
  initChatbot();
});
