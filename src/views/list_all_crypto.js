const PubSub = require('../helpers/pub_sub.js');

const ListAllCrypto = function(element){
  this.element = element;
};

ListAllCrypto.prototype.bindEvents = function(){
  PubSub.subscribe('crypto:all-info', (evt) => {
    const cryptoInfo = evt.detail;
    this.render(cryptoInfo);
    console.log(cryptoInfo);
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
    const li = document.createElement('li');
    li.textContent = crypto.name;
    li.value = crypto.id;
    this.element.appendChild(li);
  });
};

module.exports = ListAllCrypto;
