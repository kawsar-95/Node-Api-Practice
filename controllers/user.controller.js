const { validateUserRegistration } = require('../util/user.validate')
const users = [];

async function registration(req, res) {
  const { username, email, phone, password, confirm_password } = req.body;

  // validation
  try {
    const error = await validateUserRegistration({
      username,
      email,
      phone,
      password,
      confirm_password,
    });
    if (error) return res.status(400).send(error);
    // create user in db
    const user = {
      id: users.length,
      username,
      email,
      phone,
      password,
    };
    users.push(user);
    res.status(201).send(user); // send response
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports.registerUser = registerUser;
