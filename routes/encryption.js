// encryption.js
// ========
var fs = require('fs');
var crypto = require('crypto');
var NodeRSA = require('node-rsa');
var path = require("path");
var sign = crypto.createSign('RSA-SHA256');
var verify = crypto.createVerify('RSA-SHA256');
//var key = new NodeRSA({ b: 512 });

var g = 5;
var p = 123;
var a = 6;
var b = 15;
var alpha = 4;
var beta = 32;
//var alpha = 8;
//var beta = 19;

/*
Alice and Bob agree to use a modulus p = 23 and base g = 5 (which is a primitive root modulo 23).

1.Alice chooses a secret integer a = 6, then sends Bob A = ga mod p
A = 56 mod 23 = 8

2.Bob chooses a secret integer b = 15, then sends Alice B = gb mod p
B = 515 mod 23 = 19

3.Alice computes s = Ba mod p
s = 196 mod 23 = 2

4.Bob computes s = Ab mod p
s = 815 mod 23 = 2

Alice and Bob now share a secret (the number 2).
*/

module.exports = {
  handlename: function () {
    // step one 
      alpha = (Math.pow(g, a)) % p;
    return alpha;
  },
  hostgen: function (username) {
    //step two
    if (username == "a") {
      beta = (Math.pow(g, b)) % p;
    }
    return beta;
  },
  aliceLocalCompute: function (beta) {
    //step three
    console.log('-----Alice local App computing begin-----');
    //console.log('alpha : ', alpha);
    //console.log('beta : ', beta);
    var k = (Math.pow(beta, a)) % p;
    //console.log("k : ", k);
    hexString = (k >>> 0).toString(2);
    console.log("hexString : ", hexString);
    var k1 = hexString.substring(0, 3); // Gets the k1 part
    var k2 = hexString.substring(3);  // Gets the k2 part
    console.log('first key : ', k1);
    console.log('second key : ', k2);
    var m = (alpha | beta).toString();
    console.log('msg to encrypt : ', m);
    var cipher = crypto.createCipher('aes-256-ctr', k2)
    var crypted = cipher.update((m | crypto.createHmac('sha1', k1).update(m).digest('hex')).toString(), 'utf8', 'hex')
    crypted += cipher.final('hex');
    m1 = crypted;
    console.log(" please enter encrypted msg m1 '", m1,"' to the website");
    return m1;
  },
  hostCompute: function (alpha) {
    //step four
    console.log('-----Bob Host Server computing begin-----');
    //console.log('alpha : ', alpha);
    //console.log('beta : ', beta);
    var k = (Math.pow(alpha, b)) % p;
    //console.log("k : ", k);
    hexString = (k >>> 0).toString(2);
    console.log("hexString : ", hexString);
    var k1 = hexString.substring(0, 3); // Gets the k1 part
    var k2 = hexString.substring(3);  // Gets the k2 part
    console.log('first key : ', k1);
    console.log('second key : ', k2);
    var m = (alpha | beta).toString();
    console.log('msg to encrypt : ', m);
    var cipher = crypto.createCipher('aes-256-ctr', k2)
    var crypted = cipher.update((m | crypto.createHmac('sha1', k1).update(m).digest('hex')).toString(), 'utf8', 'hex')
    crypted += cipher.final('hex');
    m2 = crypted;
    console.log("encrypted msg m2 :", m2);

    sign.write(m2);
    sign.end();
    var private_key = fs.readFileSync("./privkey.txt", "utf8");
    signature = sign.sign(private_key, 'hex');
    console.log('signature: ', signature);
    return [m2, signature];

  },
  aliceverify: function (m2, signature) {
    verify.write(m2);
    verify.end();
    var public_key = fs.readFileSync("./pubkey.txt", "utf8");
    verification = verify.verify(public_key, signature, 'hex');
    return verification;
  },

  bar: function () {
  }
};