const { string, number, object, array } = require('yup');

const userSchema = object().shape({
  first_name: string()
    .min(3, 'First name must be at least 3 characters.')
    .max(50, 'First name must be at most 50 characters.')
    .required('First name must not be empty.'),
  last_name: string()
    .min(3, 'Last name must be at least 3 characters.')
    .max(50, 'Last name must be at most 50 characters.')
    .required('Last name must not be empty.'),
});


module.exports.userSchema = userSchema;


