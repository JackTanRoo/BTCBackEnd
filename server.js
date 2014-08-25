var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
var utils = require('./server/utils/utils');
var btcUtils = require('./server/utils/btcUtils');
var db = require('./server/db');
var url = require('url');

//express server routes
var app = express();

app.set('views', __dirname + '/views');
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
  res.render('layout')
  var secretUri = req.params[0];
});

app.get('/address', function(req, res) {
  // var parsedUrl = url.parse(request.url, true);
  console.log("req", req.headers.referer);
  var refererUrl = req.headers.referer;
  var positionOfSecret = refererUrl.indexOf('/secret/');
  var secretUriIndex = positionOfSecret + 8;
  var secretUri = refererUrl.slice(secretUriIndex);
  console.log('secretUri: ', secretUri);
  db.findAddressFromUrl(secretUri, function(err, results, fields) {
    console.log("this is the results : ", results);
    var btcAddress = results[0].btc_address;
    console.log("i am the btcAddress: ", btcAddress)
    res.end(JSON.stringify(btcAddress));
  })
  // var secretUri = req.params[0];
});

console.log('App is listening on 3000');
app.listen(3000);
