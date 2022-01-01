const users = require('./routes/user.routes');
const products = require('./routes/product.routes');
const express = require('express');
const app = express();

app.use(express.json());

app.use(users);
app.use(products);

app.get('/', (req, res) => {
  res.send('The server is running...');
});

app.listen(5000, () => console.log('Listening on port 5000'));
