var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "1",
  database: "BTCTestv2"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

exports.insertUrlAddressKey = function(url, pKey, address) {
  var queryString = "INSERT INTO UrlAddressKey(url_hash, btc_address, pk_hash) VALUES ('" + url + "', '" + address + "', '" +
    pKey + "');";
  console.log("this is the querystring: ", queryString);
  dbConnection.query(queryString, function(err) {
    if (err) {
      throw err;
    } else {
      console.log("successfully saved: ", url, address, pKey);
    }
  });
};

exports.dataBaseQuery = function(queryString, callback) {
  dbConnection.query(queryString, function(err, results, fields) {
    if (err) {
      throw err;
    } else {
      console.log("successfully processed query in dbquery: ", results);
      callback(err, results, fields);
    }
  });
};

exports.findAddressFromUrl = function(url, callback) {
  var queryString = "SELECT * FROM UrlAddressKey WHERE url_hash='" + url + "';";
  console.log("this is the find address query :", queryString);
  exports.dataBaseQuery(queryString, function(err, results, fields) {
    callback(err, results, fields);
  });
};
