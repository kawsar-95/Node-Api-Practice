const express = require('express')
const router = express.Router()

const { userSchema } = require("../model/userSchema.js")

const users = [
  { id: 1, first_name: 'john', last_name: 'wick' },
  { id: 2, first_name: 'jack', last_name: 'Reacher' },
];

const validateUser = async user => {
  try {
    await userSchema.validate(user); // validateUser gives me null when there is no error
    return null;
  }
  catch (err) {
    return err.errors[0];
  }
};

router.get("/", function (req, res) {
  res.send(users);
});

router.get("/:id", function (req, res) {
  const id = req.params.id;
  const user = users.find(user => user.id === parseInt(id));
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

router.post("/", async function (req, res) {
  const { first_name, last_name } = req.body;
  try {
    const err = await validateUser({ first_name, last_name });

    if (err) return res.status(400).send(err);

    const user = {
      id: users.length + 1,
      first_name,
      last_name
    }
    users.push(user);

    res.status(201).send(user);
  }
  catch (err) {
    // return res.status(404).send(err.errors[0]);
    console.log()
  }
});

router.put("/:id", function (req, res) {
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send("User not found");

  user.first_name = first_name;
  user.last_name = last_name;

  res.send(user);
});

router.patch("/:id", function (req, res) {
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send("User not found");

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;

  res.json(user);
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send("User not found");

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.json(user);
});



module.exports = router;