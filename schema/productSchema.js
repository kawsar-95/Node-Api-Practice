const { string, number, object, array } = require('yup');

const productSchema = object().shape({
  title: string()
    .required('Title is not empty')
    .min(3, 'Last name must be at least 3 characters.')
    .max(50, 'Last name must be at most 50 characters.'),
  price: number()
    .required('Price is not empty')
    .min(1, 'Price must be at least 1.')
    .typeError('Price must be a number')
    .integer('Price must be an integer'),
  category: string()
    .required('Category is not empty')
    .min(3, 'Last name must be at least 3 characters.')
    .max(50, 'Last name must be at most 50 characters.'),
});

module.exports = productSchema;



