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
    PubSub.publish('crypto:selected-info', cryptoIndex);
  });
};

ListAllCrypto.prototype.render = function(cryptoInfo){
  this.element.innerHTML = '';
  cryptoInfo.forEach( (crypto) => {
    const row = document.createElement('tr');

    const rowRank = document.createElement('td');
    rowRank.textContent = crypto.rank;
    row.appendChild(rowRank);

    const rowName = document.createElement('td');
    rowName.textContent = crypto.name;
    row.appendChild(rowName);

    const rowPrice = document.createElement('td');
    rowPrice.textContent = crypto.price;
    row.appendChild(rowPrice);

    this.element.appendChild(row);
  });
};

module.exports = ListAllCrypto;
