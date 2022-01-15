require("dotenv").config();
const path = require('path');
const express = require('express');
const cookieParser = require("cookie-parser");
const userRouter = require(path.join(process.cwd(), 'src/modules/user/user.routes'));
const userStrategy = require(path.join(process.cwd(), 'src/modules/user/user.strategy'));
const products = require(path.join(process.cwd(), 'src/modules/product/product.routes'));

module.exports = async () => {
  const app = express();
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use(express.json());

  userRouter(app);
  products(app);
  userStrategy();

  app.get('/', (req, res) => {
    res.send('The server is running...');
  });

  return app;
};
