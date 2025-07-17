export function initChatbot() {
  const chatbotModal = document.getElementById('modal-chatbot');
  const form = chatbotModal.querySelector('#chatbot-input-row');
  const input = form.querySelector('#chatbot-input');
  const send = form.querySelector('#chatbot-send');
  const log = chatbotModal.querySelector('#chat-log');
  const guard = chatbotModal.querySelector('#human-check');

  guard.onchange = () => send.disabled = !guard.checked;

  form.onsubmit = async e => {
    e.preventDefault();
    if (!guard.checked) return;
    const msg = input.value.trim();
    if (!msg) return;
    addMsg(msg, 'user');
    input.value = '';
    send.disabled = true;
    addMsg('…', 'bot');
    try {
      // Replace below with your secure cloud endpoint!
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({message: msg})
      });
      const d = await r.json();
      log.lastChild.textContent = d.reply || 'No reply.';
    } catch {
      log.lastChild.textContent = 'Error: Can’t reach AI.';
    }
    send.disabled = false;
  };
  function addMsg(txt, cls) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + cls;
    div.textContent = txt;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }
}
