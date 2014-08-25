var bitcoin = require('bitcoinjs-lib')
var helloblock = require('helloblock-js')({
  network: 'testnet',
  debug: true
})

//var generate private key and address
exports.pKeyAndAddressGen = function() {
  var key = bitcoin.ECKey.makeRandom();
  var destPrivateKeyWIF = key.toWIF(bitcoin.networks.testnet) //private key
  var destBTCAddress = key.pub.getAddress(bitcoin.networks.testnet).toString();
  return [destPrivateKeyWIF, destBTCAddress];
};
