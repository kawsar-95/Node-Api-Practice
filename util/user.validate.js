const { registerSchema } = require('../schema/register.schema.js');

const validateUserRegistration = async (user) => {
  try {
    registerSchema.validate(user);
    return null;
  } catch (error) {
    return error.errors[0];
  }
};
module.exports.validateUserRegistration = validateUserRegistration;