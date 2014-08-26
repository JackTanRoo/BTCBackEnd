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

var getBalanceAndSongs = function(url, callback) {
  $.ajax({
    type: "GET",
    url: url,
    success: function(data) {
      callback(data);
      getBalanceAndSongs(url, callback);
    },
    dataType: 'JSON'
  });
};

$(document).ready(function() {
  var library = new Songs(songData);
  var app = new AppModel({
    library: library
  });
  var balance;
  var songlibrary;
  // build a view for the top level of the whole app
  var appView = new AppView({
    model: app
  });
  // $('.wholePlayer').empty();
  // put the view onto the screen
  $('.wholePlayer').append(appView.render());

  getAddress(getAddressUrl);
  var gotMoney = false;
  getBalanceAndSongs(getBalanceUrl, function(data) {
    console.log("this is the data received in getBalanceAndSongs: ", data)
    balance = data.balance; //balance is a number
    songlibrary = data.songs;

    if (balance > 0) {
      $('#BTCRunningBalance').text(balance);
    }
    if (balance > 0 && !gotMoney) {
      library = new Songs(songlibrary);
      app = new AppModel({
        library: library
      });
      // build a view for the top level of the whole app
      appView = new AppView({
        model: app
      });
      gotMoney = true;
      $('.wholePlayer').empty();
      $('.wholePlayer').append(appView.render());
    } else if (balance === 0 && gotMoney === true) {
      $('#BTCRunningBalance').text(balance);
      library = new Songs(songlibrary);
      app = new AppModel({
        library: library
      });
      // build a view for the top level of the whole app
      appView = new AppView({
        model: app
      });
      gotMoney = false;
      $('.wholePlayer').empty();
      $('.wholePlayer').append(appView.render());
    };
  });
});
