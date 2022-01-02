const express = require('express');
const path = require('path');
const users = require(path.join(process.cwd(), 'src/modules/user/user.routes'));
const products = require(path.join(process.cwd(), 'src/modules/product/product.routes'));

module.exports = async () => {
    const app = express();

    app.use(express.json());

    users(app);
    products(app);

    app.get('/', (req, res) => {
        res.send('The server is running...');
    });

    return app;
}
