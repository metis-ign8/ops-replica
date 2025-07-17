// js/modal.js

/**
 * Shows a modal with given options.
 * @param {Object} opts
 *   - title: (string, required) Modal title
 *   - body: (string/HTML, required) Main content (HTML allowed)
 *   - footer: (string/HTML, optional) Footer content (HTML allowed)
 *   - onClose: (function, optional) Callback after closing modal
 *   - width: (string, optional) e.g. "520px" or "40vw"
 *   - height: (string, optional) e.g. "auto" or "60vh"
 *   - draggable: (bool, default true)
 *   - className: (string, optional) Add extra classes for style
 */
import { modalContent } from './modalContent.js'; // { business, contact, it, pro }

export function initModals() {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.dataset.modal;
      openServiceModal(modalId);
    });
  });

  // Service Modals
  document.querySelectorAll('.modal-overlay[data-service]').forEach(modal => {
    modal.addEventListener('mousedown', dragModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal(modal);
    });
    modal.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal(modal);
    });
  });

  // Generic close triggers (X, Cancel)
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(btn.closest('.modal-overlay'));
    });
  });
}

function openServiceModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.innerHTML = modalContent[modal.dataset.service] || '';
  modal.classList.add('active');
  trapFocus(modal);
}

function closeModal(modal) {
  modal.classList.remove('active');
  modal.blur();
}

function dragModal(e) {
  const modal = e.currentTarget.querySelector('.modal');
  if (!modal || !e.target.classList.contains('modal-header')) return;
  let shiftX = e.clientX - modal.getBoundingClientRect().left;
  let shiftY = e.clientY - modal.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    modal.style.left = pageX - shiftX + 'px';
    modal.style.top = pageY - shiftY + 'px';
  }
  function onMouseMove(e) {
    moveAt(e.pageX, e.pageY);
  }
  document.addEventListener('mousemove', onMouseMove);
  document.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    document.onmouseup = null;
  };
}

// Basic a11y focus trap for modals
function trapFocus(modal) {
  const focusableEls = modal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusableEls.length) return;
  const first = focusableEls[0], last = focusableEls[focusableEls.length-1];
  modal.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}
