var bitcoin = require('bitcoinjs-lib')
var helloblock = require('helloblock-js')({
  network: 'testnet',
  debug: true
})

var sourcePrivateKeyWIF = 'cVi2fb5bU6WtXuAxq9CCJF6UKgUeDoc4eeoQA9qDx7Jr5Hm4pA4T';
var sourceBTCAddress = 'mwcjwVrzwJSqo1iuspaCHQEsfDHKBqHx95';
var destBTCAddress = 'moXHcgW7PGxPmmWEK3EoYg1be7nYoAUEUY';

var txFee = 10000
var txTargetValue = 90000

exports.txSender = function(sourcePrivateKeyWIF, sourceBTCAddress, destBTCAddress, txFee, txTargetValue) {
  //source btc account testnet
  // var sourcePrivateKeyWIF = '91fKWDmVZz7y7SyM5fLUBTuK2eUSYd7wxkwujQ7YLbNxNQU4LiW'; //balance 0.036 BTC
  var sourceECKey = new bitcoin.ECKey.fromWIF(sourcePrivateKeyWIF);
  // var sourceBTCAddress = 'migNkRq9gLmdPhgFfBBUiWaZf17uFE87yq';
  console.log("source EC key: ", sourceECKey);

  // @SIDA, I think to be missing a ecKey - > what is this key? what is it used for?

  //destination private keys and address
  // var key = bitcoin.ECKey.makeRandom();
  // var destPrivateKeyWIF = key.toWIF(bitcoin.networks.testnet) //private key
  // var destBTCAddress = key.pub.getAddress(bitcoin.networks.testnet).toString();
  // var destBTCAddress = 'n4dowpdq9TjL2ifoDBabY2nVzKd3WcGKfa'; //first destination

  // 100,000,000 satoshi = 1 btc

  // console.log('dest private key: ', destPrivateKeyWIF);
  console.log('dest addres: ', destBTCAddress);

  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  //all satoshis

  helloblock.addresses.getUnspents(sourceBTCAddress, {
    value: txTargetValue + txFee
  }, function(err, res, unspents) {
    if (err) throw new Error(err)

    var tx = new bitcoin.Transaction()

    var totalUnspentsValue = 0
    unspents.forEach(function(unspent) {
      tx.addInput(unspent.txHash, unspent.index)
      totalUnspentsValue += unspent.value
    })

    tx.addOutput(destBTCAddress, txTargetValue)

    var txChangeValue = totalUnspentsValue - txTargetValue - txFee
    tx.addOutput(sourceBTCAddress, txChangeValue)

    tx.ins.forEach(function(input, index) {
      tx.sign(index, sourceECKey) //WHAT IS THE ECKEY? how do i get it?
    })

    var rawTxHex = tx.toHex() //changed from tx.serializeHex()

    helloblock.transactions.propagate(rawTxHex, function(err, res, tx) {
      if (err) throw new Error(err)

      console.log('SUCCESS: https://test.helloblock.io/transactions/' + tx.txHash)
    })
  })
};
