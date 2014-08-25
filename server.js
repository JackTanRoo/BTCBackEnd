var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
var utils = require('./server/utils/utils');
var btcUtils = require('./server/utils/btcUtils')
var db = require('./server/db')

//express server routes
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/secret/*', express.static(__dirname + '/public/user'));

// app.use(session({
//   secret: 'keyboard cat'
// })); //set up a secret for the session to use.

app.get('/',
  function(req, res) {
    //create the secret url
    var url = 'yoursecret@' + utils.randomUrl(14, utils.characterString) //need to do a check for uniqueness

    //generate the bitcoin address
    var keyAddress = btcUtils.pKeyAndAddressGen();
    var pKey = keyAddress[0];
    var address = keyAddress[1];

    console.log("this is the url, pkey, address generated: ", url, pKey, address);
    db.insertUrlAddressKey(url, pKey, address);
    var secretUri = '/secret/' + url;
    // save to database
    res.redirect(secretUri);
  }
);

app.get('/secret/*', function(req, res) {
  res.render('index')
  var secretUri = req.params[0];
  console.log("am at secret and this is the secretUri: ", secretUri);
});

console.log('Shortly is listening on 3000');
app.listen(3000);