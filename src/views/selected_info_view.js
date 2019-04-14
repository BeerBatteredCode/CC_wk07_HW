const PubSub = require('../helpers/pub_sub.js');

const SelectedInfoView = function(element){
  this.element = element;
};

SelectedInfoView.prototype.bindEvents = function(){
  PubSub.subscribe('crypto:display-info', (evt) => {
    this.render(evt.detail);
  });
};

SelectedInfoView.prototype.render = function(crypto){
  this.element.innerHTML = '';

  const cryptoContent = document.createElement('div')

  cryptoContent.innerHTML = `
    <ul>
      <li>${crypto.name}</li>
      <li>${crypto.price}</li>
      <li>${crypto.change}</li>
    </ul>
  `;

  this.element.appendChild(cryptoContent);
};

module.exports = SelectedInfoView;
