const Crypto = require('./models/crypto.js');

document.addEventListener('DOMContentLoaded', () => {

  const crypto = new Crypto;
  crypto.bindEvents();
});
