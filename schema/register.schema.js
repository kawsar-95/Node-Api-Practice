const { string, number, object, array, ref } = require('yup');

function isEmailLengthValid(email) {
  if (!email) return false;
  const parts = email.split('@'); // email= 'a@gmail.com' =>['a','gmail','com']
  const local = parts[0];
  return local.length <= 64;
}

const registerSchema = object().shape({
  user_name: string()
    .min(3, 'First name must be at least 3 characters.')
    .max(50, 'First name must be at most 50 characters.')
    .required('First name must not be empty.'),

  email: string()
    .email('This Field should be a valid email Address')
    .max(100, 'First name must be at most 100 characters.')
    .required('First name must not be empty.')
    .test('is-valid-email-length', 'the part before @of the email can be maximum 64 characters',
      email => isEmailLengthValid(email)),  // this is a test for validating email here is a error messag also a callback function test('name','error message',callback_function)

  password: string()
    .min(3, 'First name must be at least 3 characters.')
    .max(50, 'First name must be at most 50 characters.')
    .required('First name must not be empty.'),

  confirm_password: string()
    .required('First name must not be empty.')
    .oneOf([ref, ('newPassword'), null], 'passwords Must match')

})

module.exports = registerSchema;  