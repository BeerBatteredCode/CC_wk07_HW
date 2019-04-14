const PubSub = require('../helpers/pub_sub.js');

const ListAllCrypto = function(element){
  this.element = element;
};

ListAllCrypto.prototype.bindEvents = function(){
  PubSub.subscribe('crypto:all-info', (evt) => {
    const cryptoInfo = evt.detail;
    this.render(cryptoInfo);
  });
  this.element.addEventListener('change', (evt) => {
    const cryptoIndex = evt.target.value;
    console.log(evt);
    PubSub.publish('crypto:selected-info', cryptoIndex);
  });
};

ListAllCrypto.prototype.render = function(cryptoInfo){
  this.element.innerHTML = '';
  cryptoInfo.forEach( (crypto) => {
    const list = document.createElement('div');
    // li.textContent = crypto.name;
    list.value = crypto.id;
    this.element.appendChild(list);
  });
};

module.exports = ListAllCrypto;
