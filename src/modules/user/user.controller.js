const User = require('./user.model');
const UserType = require('./user-type.model');

const { generateAccessToken } = require("./sevices/user.service")


async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user || !user.password || !user.validPassword(password)) return res.status(404).send("Invalid Email Or Password");

    res.cookie("access_token", generateAccessToken(user), {
      httpOnly: true,
      sameSite: true,
      signed: true
    });

    return res.status(200).send(user);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}


async function getUsers(req, res) {
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

async function getUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id
      },
      include: [{
        model: UserType,
        as: 'user_type'
      }]
    });

    if (!user) return res.status(404).send('User not found!');

    res.status(200).send(user);
  }
  catch (err) {
    console.error(err);
    res.status(500).send('Internal server error!');
  }
}

async function createUser(req, res) {
  try {
    const { username, email, password, user_type_id } = req.body;

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
      user_type_id: user_type_id
    });

    res.status(201).send(user);
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Internal server error!');
  }
}

async function putUser(req, res) {
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

async function patchUser(req, res) {
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

async function deleteUser(req, res) {
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
module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.createUser = createUser;
module.exports.putUser = putUser;
module.exports.patchUser = patchUser;
module.exports.deleteUser = deleteUser;