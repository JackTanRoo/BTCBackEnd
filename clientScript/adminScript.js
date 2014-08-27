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
      time = time.toLocaleString();
      $('.latestTx').append('<tr><td>' + "placeholder" + '</td>' + '<td>' + address + '</td>' + '<td>' + amount + '</td>' + '<td>' + time + '</td></tr>')
    };
    var frequencyObj = createHistogram(txArray);
    console.log("I am the histo obj: ", frequencyObj);
    var heightArray = [];
    var sourceAddressArr = Object.keys(frequencyObj);
    for (var i = 0; i < 5; i++) {
      var eachAddress = sourceAddressArr[i];
      heightArray.push(frequencyObj[eachAddress] * 10000);
    };
    console.log("height array: ", heightArray);
    var dataArray = ['data1'].concat(heightArray);

    // for (var i = 0; i < 5; i++) {
    //   var columnName = sourceAddressArr[i];
    //   $('.columnNames').append("<td>" + columnName + "</td>");
    // }
    // var chart = c3.generate({
    //   bindto: '.bestCustomerGraph',
    //   data: {
    //     columns: [
    //       dataArray
    //     ],
    //     types: {
    //       data1: 'bar' // ADD
    //     }
    //   },
    //   axis: {
    //     x: {
    //       label: {
    //         text: 'BTC Addresses',
    //         position: 'outer-middle'
    //       }
    //     }
    //   }
    // });

    // create a d3 histogram;
    d3.select('.bestCustomerGraph')
      .selectAll('div')
      .data(heightArray)
      .enter()
      .append('div')
      .attr('class', 'bar')
      .style("height", function(d) {
        return d + "px";
      });
  });
});
