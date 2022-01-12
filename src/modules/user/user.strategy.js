const passport = require('passport');
const { strategy } = require('passport-jwt');

module.exports = function () {

  function cookieExtractor(req) {
    let token = null;
    if (req && req.signedCookies) token = req.signedCookies['access_token'];
    return token;
  }
};