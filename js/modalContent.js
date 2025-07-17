export const modalContent = {
  business: `
    <div class="modal draggable" role="dialog" aria-modal="true">
      <button class="close-btn" data-close>&times;</button>
      <div class="modal-header">SOBRE OPERACIONES EMPRESARIALES</div>
      <div style="display: flex; gap: 2em; align-items: flex-start;">
        <div style="flex: 1;">
          <img src="assets/business-placeholder.jpg" alt="Business Operations" style="width:100%;max-width:220px;border-radius:1.2rem;">
          <div style="margin-top:.8em;">
            Contenido detallado sobre nuestros servicios de Operaciones Empresariales...
          </div>
        </div>
        <div style="flex: 2;">
          <video controls poster="assets/business-poster.jpg" style="width:100%;border-radius:.7rem;">
            <source src="assets/business-video.mp4" type="video/mp4">
          </video>
          <ul>
            <li>Digitalización y automatización del flujo de trabajo</li>
            <li>Estrategias de eficiencia logística e inventario</li>
            <li>Marcos de riesgo y cumplimiento (NIST, ISO, CISA)</li>
            <li>Cuadros de métricas de rendimiento y análisis</li>
            <li>Capacitación remota y operaciones Lean</li>
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-cancel-btn" data-close>Cancel</button>
        <button class="modal-submit-btn" onclick="window.location.href='business-operations.html'">Learn More</button>
        <button class="modal-submit-btn" onclick="window.location.href='chat.html'">Ask Chattia</button>
        <button class="modal-submit-btn" data-modal="modal-contact">Contact Us</button>
      </div>
    </div>
  `,
  // Repeat for contact, it, pro - as per your content block!
};
