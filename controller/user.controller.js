const { User } = require('../models/dbmodel');
const { validateUserRegistration, validateUserUpdate } = require('../validations/user.validate');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).send(users);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal server error!');
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id
      }
    });

    if (!user) return res.status(404).send('User not found!');

    res.status(200).send(user);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal server error!');
  }
}

const postUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    const err = await validateUserRegistration({ username, email, password, confirm_password });

    if (err) return res.status(400).send(err);

    const existingUser = await User.findOne({
      where: {
        email
      }
    }); // Select id,email,username,password from users where email ='nuruddinkawsar1995@gmail.com'

    if (existingUser) return res.status(400).send('Already registered with this email address.');

    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
}

const putUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const err = await validateUserUpdate({ username, email });

    if (err) return res.status(400).send(err);

    const user = await User.update({
      username,
      email
    }, {
      where: {
        id
      }
    });

    if (!user) return res.status(404).send('User not found!');

    res.status(201).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
}

const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;

    const err = await validateUserUpdate({ username, email });

    if (err) return res.status(400).send(err);

    const user = await User.update({
      where: {
        id
      }
    });

    if (!user) return res.status(404).send('User not found!');

    if (username) user.update({ username })
    if (email) user.update({ email })

    res.status(201).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({
      where: {
        id
      }
    });

    if (!user) return res.status(404).send('User not found!');

    await user.destroy();

    res.sendStatus(200).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
}
module.exports = {
  getUser,
  getUsers,
  postUser,
  putUser,
  patchUser,
  deleteUser
}

