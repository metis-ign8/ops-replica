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
export function showModal(opts) {
  // Remove existing modal
  closeModal();

  const overlay = document.getElementById('modal-overlay');
  overlay.innerHTML = `
    <div class="modal ${opts.className||''}" role="dialog" aria-modal="true" tabindex="0" draggable="${opts.draggable!==false}">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-header">${opts.title||''}</div>
      <div class="modal-content">${opts.body||''}</div>
      ${opts.footer ? `<div class="modal-footer">${opts.footer}</div>` : ''}
    </div>
  `;
  overlay.setAttribute('aria-hidden', 'false');
  overlay.style.display = "flex";

  // Optional size
  const modal = overlay.querySelector('.modal');
  if (opts.width)  modal.style.width  = opts.width;
  if (opts.height) modal.style.height = opts.height;

  // --- Close logic
  function closeAll() {
    overlay.innerHTML = "";
    overlay.style.display = "none";
    overlay.setAttribute('aria-hidden', 'true');
    document.onkeydown = null;
    if (typeof opts.onClose === 'function') opts.onClose();
  }
  overlay.querySelector('.modal-close').onclick = closeAll;
  overlay.onclick = e => { if (e.target === overlay) closeAll(); };
  document.onkeydown = e => { if (e.key === 'Escape') closeAll(); };

  // --- Draggable logic
  if (opts.draggable !== false) {
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
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.innerHTML = "";
  overlay.style.display = "none";
  overlay.setAttribute('aria-hidden', 'true');
  document.onkeydown = null;
}
