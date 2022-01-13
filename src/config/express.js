const express = require('express');
const path = require('path');
const users = require(path.join(process.cwd(), 'src/modules/user/user.routes'));
const userStrategy = require(path.join(process.cwd(), 'src/modules/user/user.strategy'));
const products = require(path.join(process.cwd(), 'src/modules/product/product.routes'));

module.exports = async () => {
  const app = express();

  app.use(express.json());
  // app.use(express.urlencoded({ extended: true }));
  users(app);
  products(app);
  userStrategy();

  app.get('/', (req, res) => {
    res.send('The server is running...');
  });

  return app;
};
