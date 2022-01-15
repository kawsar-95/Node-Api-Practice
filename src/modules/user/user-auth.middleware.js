const jwt = require('jsonwebtoken');
const passport = require("passport");

const AuthStrategy = (req, res, next) => {
  const auth = passport.authenticate("user-jwt", async function (err, user, info) {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    if (!user) return res.status(401).send("Unauthenticated User");

    req.login(user, { session: false }, function (error) {
      if (error) return next(error);
      next();
    });
  });
  auth(req, res, next);
};
/*
1.Name Of the Strategy
2.Strategy Object 
  a.secret
  b.cookiue Extractor
  c.Callback Function => Either Pass the user.
                          Or Pass Flase

1.Name Of the Strategy
2.Callback Function => Process the Request
3.

*/

module.exports.AuthStrategy = AuthStrategy;

const verifyToken = async (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) return res.status(403).send('Authentication Failed');

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  }
  catch (err) {
    console.log(err);
    return res.status(401).send('Invalid token');
  }
};
module.exports.verifyToken = verifyToken;

