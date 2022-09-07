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
function verifyUser (request, response, next) {
  function valid(error, user) {
    request.user = user;
    next();
  }
  try {
    // console.log(request.headers);
    const token = request.headers.authorization.split(' ')[1]
    // console.log(token);
    jwt.verify(token, getKey, {}, valid);
  } catch (error) {
    console.log('Not authorized: ', error);
  }
}

module.exports = verifyUser;
