const { productUploadSchema, productUpdateSchema } = require("../schema/product.schema")

const validateProductUpload = async product => {
  try {
    await productUploadSchema.validate(product);
    return null;
  }
  catch (err) {
    return err.errors[0];
  }
}

const validateProductUpdate = async product => {
  try {
    await productUpdateSchema.validate(product);
    return null;
  }
  catch (err) {
    return err.errors[0];
  }
}

module.exports = {
  validateProductUpdate,
  validateProductUpload
}