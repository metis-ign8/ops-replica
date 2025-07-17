<!-- In modal-service .modal-content (populated dynamically) -->
<div class="service-preview">
  <img src="assets/preview_business.svg" alt="Business Operations" class="service-img">
  <div class="service-info">
    <h3>Business Operations</h3>
    <p>Drive efficiency, compliance, and operational growth with our streamlined business ops.</p>
    <div class="service-cta">
      <button class="learn-more-btn">Learn More</button>
      <button class="contact-btn">Contact Us</button>
      <button class="chat-btn">Ask Chattia</button>
    </div>
  </div>
</div>
// Cancel buttons for forms (join/contact)
document.querySelectorAll('.cancel-btn').forEach(btn => {
  btn.onclick = () => btn.closest('.modal').classList.remove('active');
});

