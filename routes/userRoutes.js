const express = require('express');

const router = express.Router();

const { userSchema } = require('../schema/userSchema');

const users = [
  { id: 1, first_name: 'john', last_name: 'wick' },
  { id: 2, first_name: 'jack', last_name: 'Reacher' },
];

const validateUser = async (user) => {
  try {
    await userSchema.validate(user); // validateUser gives me null when there is no error
    return null;
  } catch (error) {
    return error.errors[0];
  }
};

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) return res.status(404).send('User not found');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { first_name, last_name } = req.body;
  try {
    const error = await validateUser({ first_name, last_name });

    if (error) return res.status(400).send(error);

    const user = {
      id: users.length + 1,
      first_name,
      last_name,
    };
    users.push(user);

    res.status(201).send(user);
  } catch (error) {
    // return res.status(404).send(error.errors[0]);
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send('User not found');

  user.first_name = first_name;
  user.last_name = last_name;

  res.send(user);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name } = req.body;

  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send('User not found');

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;

  res.json(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send('User not found');

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.json(user);
});

module.exports = router;
