//need to use crypto module to ensure unique random

exports.randomUrl = function(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

exports.characterString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
console.log(exports.randomUrl(25, exports.characterString));
console.log(exports.randomUrl(25, exports.characterString));

// // create  a new hashing url
// var crypto = require('crypto');

// var shasum = crypto.createHash('sha1');

// // console.log(shasum);

// crypto.randomBytes(256, function(ex, buf) {
//   if (ex) throw ex;
//   console.log("type of buf: ", typeof buf)
//   console.log('buf: ', buf);
//   console.log("pack results: ", pack(buf));
// });

// var s = fs.ReadStream(filename);
// // s.on('
// data ', function(d) {
// //   shasum.update(d);
// // });

// // s.on('
// end ', function() {
// //   var d = shasum.digest('
// hex ');
// //   console.log(d + '
// ' + filename);
// // });

// function pack(bytes) {
//   var chars = [];
//   for (var i = 0, n = bytes.length; i < n;) {
//     chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
//   }
//   return String.fromCharCode.apply(null, chars);
// }

// function unpack(str) {
//   var bytes = [];
//   for (var i = 0, n = str.length; i < n; i++) {
//     var char = str.charCodeAt(i);
//     bytes.push(char >>> 8, char & 0xFF);
//   }
//   return bytes;
// }
