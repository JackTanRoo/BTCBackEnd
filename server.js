var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
var utils = require('./server/utils/utils');
var btcUtils = require('./server/utils/btcUtils');
var db = require('./server/db');
var url = require('url');
var songs = require('./server/songData');
//express server routes
var app = express();

app.set('views', __dirname + '/MyTunes-FinalVersion/2014-07-mytunes/client/');
// app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use('/secret/*', express.static(__dirname + '/static'));
// app.use('/clientScript/*', express.static(__dirname + '/clientScript'));

// app.use(session({
//   secret: 'keyboard cat'
// })); //set up a secret for the session to use.

var pKey;
var keyAddress;
var address;

app.get('/',
  function(req, res) {
    //create the secret url
    var url = 'yoursecret@' + utils.randomUrl(14, utils.characterString) //need to do a check for uniqueness
      //generate the bitcoin address
    keyAddress = btcUtils.pKeyAndAddressGen();
    pKey = keyAddress[0];
    address = keyAddress[1];
    db.insertUrlAddressKey(url, pKey, address);
    var secretUri = '/secret/' + url;
    // save to database
    res.redirect(secretUri);
  }
);

app.get('/secret/*', function(req, res) {
  res.render('index.html')
  var secretUri = req.params[0];
});

app.get('/address', function(req, res) {
  // var parsedUrl = url.parse(request.url, true);
  var refererUrl = req.headers.referer;
  var positionOfSecret = refererUrl.indexOf('/secret/');
  var secretUriIndex = positionOfSecret + 8;
  var secretUri = refererUrl.slice(secretUriIndex);
  db.findAddressFromUrl(secretUri, function(err, results, fields) {
    console.log("this is the results : ", results);
    var btcAddress = results[0].btc_address;
    res.end(JSON.stringify(btcAddress));
  });
});

app.get('/decrementAccount', function(req, res) {
  // var parsedUrl = url.parse(request.url, true);
  res.end("decrementAccount response");
});

app.get('/balance', function(req, res) {
  // var parsedUrl = url.parse(request.url, true);
  var refererUrl = req.headers.referer;
  var positionOfSecret = refererUrl.indexOf('/secret/');
  var secretUriIndex = positionOfSecret + 8;
  var secretUri = refererUrl.slice(secretUriIndex);
  db.findAddressFromUrl(secretUri, function(err, results, fields) {
    var btcAddress = results[0].btc_address;
    // make a get request to HelloBlock to check balance of address
    //'n4dowpdq9TjL2ifoDBabY2nVzKd3WcGKfa' has 150000 satoshis
    btcUtils.checkBalanceOfAddress('n4dowpdq9TjL2ifoDBabY2nVzKd3WcGKfa', function(balance) {
      // btcUtils.checkBalanceOfAddress('n4dowpdq9TjL2ifoDBabY2nVzKd3WcGKfa', function(balance) {
      console.log("this is the balance: ", balance)
      var balanceAndSongs = {
        balance: balance
      };
      // outcome is JSON of [balance, songData];
      if (balance > 0) {
        //if balance is 0, songData is object without URl
        balanceAndSongs.songs = songs.paidSongs;
      } else {
        //if balance is >0, songData is object with URL
        balanceAndSongs.songs = songs.unpaidSongs;
      }
      console.log('this is the balanceAndSongs object: ', balanceAndSongs);
      res.end(JSON.stringify(balanceAndSongs)); //send balance to the client;
    })
    //then res.send, the balance
  });
});

app.get('/MyTunes-FinalVersion/*', function(req, res) {
  // app.get('/clientScript/*', function(req, res) {
  console.log('this is the path: ', req.path);
  // console.log('')
  res.sendFile(__dirname + req.path);
  // res.end("finished sending")
});

app.get('/clientScript/*', function(req, res) {
  console.log('this is the path: ', req.path);
  // console.log('')
  res.sendFile(__dirname + req.path);
  // res.end("finished sending")
});

console.log('App is listening on 3000');
app.listen(3000);
