const jwt = require('jsonwebtoken')
// jwks — JSON web key set
const jwksClient = require('jwks-rsa')

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
})

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    console.log(key)
    var signingKey = key.publicKey || key.rsaPublicKey
    callback(null, signingKey)
  })
}

// this function will verify who the user on our route is (are the valid?)
function verifyUser(req, res, next) {
  function valid(error, user) {
    req.user = user
    next()
  }

  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1]
    console.log(token);
    jwt.verify(token, getKey, {}, valid)
    // jwt.verify(token, process.env.JWT_SECRET, valid)
    // req.user = user
    console.log('check the req', req)

  } catch (error) {
    console.log('Not authorized: ', error)
  }
}

module.exports = verifyUser
