var getAddressUrl = 'http://localhost:3000/address';
var getBalanceUrl = 'http://localhost:3000/balance';

var appendDepositAddress = function(address) {
  $('.depositAddress').text("").text(address);
}

var getAddress = function(url) {
  console.log("invoked getAddress");
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      appendDepositAddress(data);
    },
    dataType: 'JSON'
  });
}

var getBalance = function(url, callback) {
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      // console.log("this is data received: ", data);
      data = JSON.parse(data);
      callback(data);
      // getBalance(url, callback);
    },
    dataType: 'JSON'
  });
};

$(document).ready(function() {
  getAddress(getAddressUrl);
  getBalance(getBalanceUrl, function(data) {
    console.log("this is the data: ", data);
    if (data > 0) {
      $('.BTCBalance').val(data);
      $('#BTCRunningBalance').text("").text(data);
    }
  });
});
