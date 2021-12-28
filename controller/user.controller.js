const User = require('../models/user.model');
const UserType = require('../models/user-type.model');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: UserType,
        as: 'user_type'
      }]
    });

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

const createUser = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    const existUser = await User.findOne({
      where: {
        email
      }
    });

    if (existUser) return res.status(400).send('Already registered with this email address.');

    const user = await User.create({
      username,
      email,
      password,
      user_type_id: userType
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
    const { firstName, lastName, username, email } = req.body;

    const user = await User.update({
      first_name: firstName,
      last_name: lastName,
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
    const { firstName, lastName, username, email } = req.body;

    const user = await User.findOne({
      where: {
        id
      }
    });

    if (!user) return res.status(404).send('User not found!');

    if (firstName) user.update({ first_name: firstName });
    if (lastName) user.update({ first_name: lastName });
    if (username) user.update({ username });
    if (email) user.update({ email });

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

    const user = await User.findOne({
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

module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.putUser = putUser;
module.exports.patchUser = patchUser;
module.exports.deleteUser = deleteUser;