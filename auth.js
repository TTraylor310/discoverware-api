'use strict';

// JSON Web token — JWT (pronounced JOT)
const jwt = require('jsonwebtoken');
// jwks — JSON web key set
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});


function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// this function will verify who the user on our route is (are the valid?)
function verifyUser (req, errorFirstOrUserCallbackFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction);
  } catch (error) {
    errorFirstOrUserCallbackFunction('Not authorized');
  }
}

module.exports = verifyUser;