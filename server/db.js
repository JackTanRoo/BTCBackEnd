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
// exports.insertAddress = function(address) {
//   var queryString = "INSERT INTO Addresses(btc_address) VALUES ('" + address + "');";
//   dbConnection.query(queryString, function(err) {
//     if (err) {
//       throw err;
//     } else {
//       console.log("successfully saved: ", url);
//       dbConnection.query("SELECT * FROM Urls;", function(err, rows, fields) {
//         console.log("this is the url inserted after insertion: ", rows);
//       });
//     }
//   });
// };

// exports.findAllMessages = function(cb) { //constraint = "where ...."
//   // constraint = constraint || ";"
//   var queryString = "SELECT * FROM Messages, Users WHERE Messages.user_id=Users.user_id;"
//   dbConnection.query(queryString,
//     function(err, rows, fields) {
//       if (err) {
//         console.log(err, "err");
//         throw err;
//       }
//       console.log("results from Find All Msg: ", rows);
//       // console.log("fields: ", fields);
//       cb(err, rows);
//     });
// };

// exports.findUser = function(username, cb) {
//   console.log("i am in find User: ", username);
//   dbConnection.query("SELECT * FROM Users WHERE name='" + username + "';",
//     function(err, results, fields) {
//       if (err) {
//         console.log(err, "err");
//         throw err;
//       }
//       console.log("findUser results: ", results);
//       console.log("findUser fields: ", fields);
//       if (results.length === 0) {
//         results = undefined;
//       }
//       cb(err, results); //findUser must return id as "results" for callback
//     });
// };

// exports.saveUser = function(username, cb) {
//   // exports.findUser(username, function(rows, cb){
//   //   if(!false){ // condition on rows when no user found
//   console.log("I am in saveUser for: ", username);
//   dbConnection.query("INSERT INTO Users (name) VALUES ('" + username + "');",
//     function(err) {
//       if (err) {
//         throw err;
//       } else {
//         console.log("successfully saved: ", username);

//         dbConnection.query("SELECT LAST_INSERT_ID();", function(id) {
//           console.log("this is the id for: ", username, " ", id);
//           cb(id);
//         });
//       }
//     });
//   //   }
//   // });
// };

// exports.saveMessage = function(message, user_id, roomname, cb) {
//   // find user
//   console.log("I am in saveMessage");
//   // var saveIntoMessages = function(id){
//   console.log("this is the query: ", "INSERT INTO Messages (message, user_id, room) VALUES ('
// " +
// //     message + "
// ', " + user_id + ", '
// " + roomname + "
// ');");

// //   dbConnection.query("INSERT INTO Messages (text, user_id, roomname) VALUES ('
// " +
// //     message + "
// ', " + user_id + ", '
// " + roomname + "
// ');",
// //     function(err) {
// //       if (err) {
// //         throw err;
// //       } else {
// //         console.log("successfully saved,", message, user_id, roomname);
// //         cb();
// //       }
// //     });

// // };
