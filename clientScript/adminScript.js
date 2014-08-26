var getAnalyticsUrl = 'http://localhost:3000/adminAnalytics';
var createHistogram = function(array) {
  var histObj = {};
  array.forEach(function(tx, index, collection) {
    var address = tx.sourceAddress;
    var amount = tx.amountPd / 100000000;
    histObj[address] = histObj[address] + amount || amount;
  })
  return histObj;
}

$(document).ready(function() {
  console.log("docuemnt is ready");
  var masterAddress;
  var masterPrivateKey;
  var totalBalance;

  $.get(getAnalyticsUrl, function(result) {
    result = JSON.parse(result);

    // fill out the master table
    masterAddress = result.masterAddress;
    masterPrivateKey = result.masterPrivateKey;
    totalBalance = result.totalBalance / 100000000;

    $('.masterDetails').append('<td>' + masterAddress + '</td>' + '<td>' + totalBalance + '</td>' + '<td>' + masterPrivateKey + '</td>');

    // fill out the tx feed
    var txArray = result.latestTx;

    //only 10 recent tx
    for (var i = 0; i < 10; i++) {
      var tx = txArray[i]
      var address = tx.sourceAddress;
      var amount = tx.amountPd / 100000000;
      var milliseconds = tx.timeOfPayment;
      // console.log("msec: ", milliseconds);
      var time = new Date(milliseconds);
      $('.latestTx').append('<tr><td>' + "placeholder" + '</td>' + '<td>' + address + '</td>' + '<td>' + amount + '</td>' + '<td>' + time + '</td></tr>')
    };

    //create a d3 histogram;
    console.log(createHistogram(txArray));

  });
});
