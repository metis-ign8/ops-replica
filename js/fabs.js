export function initFabs() {
  document.querySelectorAll('.fab-btn[data-modal]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal(btn.dataset.modal);
    });
  });
}
export function initAccordion() {
  const fabAccordion = document.getElementById('fab-accordion-toggle');
  const mobileNav = document.getElementById('mobile-accordion-nav');
  fabAccordion && fabAccordion.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileNav.setAttribute('aria-hidden', !mobileNav.classList.contains('active'));
  });
  document.querySelectorAll('.mobile-nav-service').forEach(btn => {
    btn.addEventListener('click', e => {
      openModal(btn.dataset.modal);
      mobileNav.classList.remove('active');
    });
  });
}
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('active');
  modal.focus();
}
