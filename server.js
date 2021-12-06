const express = require("express");
const app = express();

const { userSchema } = require("./userSchema")


app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is homepage");
});

const users = [
  { id: 1, first_name: "Farhan", last_name: "Sadek" },
  { id: 2, first_name: "Sabbir", last_name: "Ahmed" },
  { id: 3, first_name: "Rafsan", last_name: "Mahmud" },
];

app.get("/api/users", function (req, res) {
  res.send(users);
});

app.get("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const user = users.find(user => user.id === parseInt(id));
  if (!user) return res.status(404).send("User not found");
  res.send(user);
});

app.post("/api/users", function (req, res) {
  const id = users.length + 1;
  const { first_name, last_name } = req.body;
  users.push({ id, first_name, last_name });
  const user = users.find((user) => user.id == id);
  res.json(user);
});

app.put("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send("User not found");

  user.first_name = first_name;
  user.last_name = last_name;

  res.send(user);
});

app.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send("User not found");

  const index = users.indexOf(user);
  users.splice(index, 1);

  res.json(user);
});

app.patch("/api/users/:id", function (req, res) {
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  const user = users.find((user) => user.id == id);

  if (!user) return res.status(404).send("User not found");

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;

  res.json(user);
});

app.listen(3000, () => {
  console.log('Server Running');
});
