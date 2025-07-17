// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Modal triggers
  const modals = {
    service: document.getElementById('modal-service'),
    join: document.getElementById('modal-join'),
    contact: document.getElementById('modal-contact'),
    chatbot: document.getElementById('modal-chatbot'),
  };

  // FABs and Card actions
  document.getElementById('fab-join').onclick = () => showModal('join');
  document.getElementById('fab-contact').onclick = () => showModal('contact');
  document.getElementById('fab-chat').onclick = () => showModal('chatbot');

  document.querySelectorAll('.card').forEach(card => {
    card.onclick = () => {
      modals.service.querySelector('.modal-header').textContent = card.querySelector('.title').textContent;
      modals.service.querySelector('.modal-content').innerHTML = '<p>Preview info for ' + card.querySelector('.title').textContent + '...</p>';
      showModal('service');
    };
  });

  // Modal close handlers
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.onclick = () => btn.closest('.modal').classList.remove('active');
  });
  // Overlay click + ESC
  document.querySelectorAll('.modal').forEach(modal => {
    modal.onclick = e => { if (e.target === modal) modal.classList.remove('active'); };
  });
  window.addEventListener('keydown', e => {
    if (e.key === "Escape") document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
  });

  // FAB mobile nav
  const fabMenuToggle = document.getElementById('fab-menu-toggle');
  const fabNavExpanded = document.getElementById('fab-nav-expanded');
  fabMenuToggle.onclick = () => {
    fabNavExpanded.style.display = fabNavExpanded.style.display === "flex" ? "none" : "flex";
  };

  // FAB mobile nav buttons
  document.querySelectorAll('.fab-nav-btn').forEach(btn => {
    btn.onclick = () => {
      const nav = btn.getAttribute('data-nav');
      if (modals[nav]) showModal(nav);
      if (nav === 'services') { /* expand service menu */ }
      // Add Home logic as needed
    };
  });

  // Toggles (EN/ES, Dark/Light)
  function toggleLang() {
    // Emit event, update UI, propagate via connector.js
    // TODO: Multi-lang implementation
    alert("Switch language: TODO");
  }
  function toggleTheme() {
    document.body.classList.toggle('dark');
  }
  document.getElementById('lang-toggle').onclick = toggleLang;
  document.getElementById('theme-toggle').onclick = toggleTheme;
  document.getElementById('lang-toggle-mobile').onclick = toggleLang;
  document.getElementById('theme-toggle-mobile').onclick = toggleTheme;
  document.getElementById('chatbot-lang-toggle').onclick = toggleLang;
  document.getElementById('chatbot-theme-toggle').onclick = toggleTheme;

  // Drag logic for .draggable dialogs
  document.querySelectorAll('.draggable').forEach(dialog => {
    let isDragging = false, offsetX = 0, offsetY = 0;
    dialog.addEventListener('mousedown', e => {
      if (e.target.classList.contains('modal-close')) return;
      isDragging = true;
      offsetX = e.clientX - dialog.getBoundingClientRect().left;
      offsetY = e.clientY - dialog.getBoundingClientRect().top;
      dialog.style.transition = "none";
      document.body.style.userSelect = "none";
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      dialog.style.position = 'fixed';
      dialog.style.left = (e.clientX - offsetX) + 'px';
      dialog.style.top = (e.clientY - offsetY) + 'px';
    });
    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        dialog.style.transition = "";
        document.body.style.userSelect = "";
      }
    });
  });

  // Centralized modal show
  function showModal(name) {
    Object.values(modals).forEach(m => m.classList.remove('active'));
    modals[name]?.classList.add('active');
  }

  // Expose showModal for connector.js/others if needed
  window.showModal = showModal;
});
