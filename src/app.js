const Crypto = require('./models/crypto.js');
const ListAllCrypto = require('./views/list_all_crypto.js');
const SelectedInfoView = require('./views/selected_info_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const crypto = new Crypto;
  crypto.bindEvents();

  const listElement = document.querySelector('#list-view');
  const listAllCrypto = new ListAllCrypto(listElement);
  listAllCrypto.bindEvents();

  const selectElement = document.querySelector('#select-view');
  const selectedInfoView = new SelectedInfoView(selectElement);
  selectedInfoView.bindEvents();
});
