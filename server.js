const users = require('./routes/user.routes.js');
const products = require('./routes/product.routes.js');
const express = require('express');
const app = express();

app.use(express.json());

app.use(users);
app.use(products);

app.get('/', (req, res) => {
  res.send('The server is running...');
});

app.listen(5000, () => console.log('Listening on port 5000'));
