function validate(schema) {
  return async function (req, res, next) {
    try {
      await schema.validate(req.body);
      next();
    }
    catch (err) {
      return res.status(400).send(err.errors[0]);
    }
  }
}

module.exports = validate;