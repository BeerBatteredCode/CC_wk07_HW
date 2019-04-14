const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Crypto = function(){
  this.data = null;
};

Crypto.prototype.bindEvents = function(){

  this.getData();

  PubSub.subscribe('crypto:selected-info', (evt) => {
    // const cryptoIndex = parseInt(evt.detail, 10);
    const crypto = this.data[cryptoIndex];
    PubSub.publish('crypto:display-info', crypto);
  });
};

Crypto.prototype.getData = function(){
  const url = 'https://api.coinranking.com/v1/public/coins';
  const request = new RequestHelper(url);
  request.get()
    .then((crypto) => {
      // console.log(crypto);
      this.data = crypto.data.coins;
      PubSub.publish('crypto:all-info', this.data);
      });
  }


module.exports = Crypto;
