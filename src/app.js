const Crypto = require('./models/crypto.js');

document.addEventListener('DOMContentLoaded', () => {

  const crypto = new Crypto;
  crypto.bindEvents();

  const listElement = document.querySelector('#list-view');
  const listAllCrypto = new ListAllCrypto(listElement);
  listAllCrypto.bindEvents();
});
