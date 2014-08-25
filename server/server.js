var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var session = require('express-session');
var crypto = require('crypto');
var utils = require('./utils/utils');
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

app.use(express.static(__dirname + '/public'));

// app.use(session({
//   secret: 'keyboard cat'
// })); //set up a secret for the session to use.

app.get('/',
  function(req, res) {
    //create the secret url
    res.end("reached the root")
    var url = utils.randomUrl(25, utils.characterString) //need to do a check for uniqueness

    //generate the bitcoin address

    // save to database

    //redirect to /secret/url
  }
);

app.get('/secret', function(req, res) {
  // res.render('index')
  res.end("reached /secret")
});

console.log('Shortly is listening on 4568');
app.listen(4568);
