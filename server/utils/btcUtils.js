var bitcoin = require('bitcoinjs-lib')
var helloblock = require('helloblock-js')({
  network: 'testnet',
  debug: true
});
var http = require('http');

//var generate private key and address
exports.pKeyAndAddressGen = function() {
  var key = bitcoin.ECKey.makeRandom();
  var destPrivateKeyWIF = key.toWIF(bitcoin.networks.testnet) //private key
  var destBTCAddress = key.pub.getAddress(bitcoin.networks.testnet).toString();
  return [destPrivateKeyWIF, destBTCAddress];
};

exports.checkBalanceOfAddress = function(address, callback) {
  var url = 'http://testnet.helloblock.io/v1/addresses/' + address;
  console.log('url to query: ', url);
  var req = http.get(url, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    // Buffer the body entirely for processing as a whole.
    // var bodyChunks = [];
    var data = "";
    res.on('data', function(chunk) {
      // You can process streamed parts here...
      // bodyChunks.push(chunk);
      data += chunk;
    }).on('end', function() {
      // var body = Buffer.concat(bodyChunks);
      // console.log('BODY: ' + data);
      var dataObject = JSON.parse(data);
      var balance = dataObject.data.address.balance;
      var balanceBTC = balance / 100000000; // balance is in satoshis
      callback(balanceBTC);
      // ...and/or process the entire body here.
    })
  });
  req.on('error', function(e) {
    console.log('ERROR: ' + e.message);
  });
}
