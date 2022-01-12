const verifyToken = (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) return res.status(403).send('Authentication Failed');

  try {
    const decoded = jwt.verify(token, "iamkawsar");
    req.user = decoded;
    next();
  }
  catch (err) {
    console.log(err);
    return res.status(401).send('Invalid token');
  }
};
module.exports.verifyToken = verifyToken;