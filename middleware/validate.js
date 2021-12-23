function validate(schema) {
  return async function (req, res, next) {
    try {
      await schema.validate(req.body);
      next()
    } catch (error) {
      return res.status(400).send(error.errors[0])
    }
  }
}
module.exports = validate