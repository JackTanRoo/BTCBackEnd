var btcTxBuild = require('./server/utils/btcTransactionBuilder');
// (sourcePrivateKeyWIF, sourceBTCAddress, destBTCAddress, txFee, txTargetValue) {
// MASTER ACCOUNT:

// ADDRESS:
var sourceBTCAddress = 'mwcjwVrzwJSqo1iuspaCHQEsfDHKBqHx95';
var sourcePrivateKeyWIF = 'cVi2fb5bU6WtXuAxq9CCJF6UKgUeDoc4eeoQA9qDx7Jr5Hm4pA4T';
var txFee = 10000;
var txTargetValue = 90000;
var destBTCAddress = 'mkhcxXVNaww7N6zzBpDKEZ7TwgKhDL7rya';

btcTxBuild.txSender(sourcePrivateKeyWIF, sourceBTCAddress, destBTCAddress, txFee, txTargetValue);
