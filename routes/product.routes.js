const express = require('express');
const { getProducts, getProduct, postProduct, putProduct, patchProduct, deleteProduct } = require('../controller/product.controller');
const route = express.Router();

route.get('/', getProducts);
route.get('/:id', getProduct);
route.post('/', postProduct);
route.put('/:id', putProduct);
route.patch('/:id', patchProduct);
route.delete('/:id', deleteProduct);

module.exports = route;