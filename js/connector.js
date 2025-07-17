// connector.js
// Central event bus for toggles, modal, language, theme, chatbot, etc.

const Connector = {
  listeners: {},
  on(event, cb) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb);
  },
  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data));
  }
};
// Usage: Connector.on('languageChanged', fn); Connector.emit('languageChanged', 'es');

window.Connector = Connector;
