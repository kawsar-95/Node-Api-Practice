const express = require('express');
const controller = require('../controller/product.controller');
const router = express.Router();

router.get('/api/products/', controller.getProducts);
router.get('/api/products/:id', controller.getProduct);
router.post('/api/products/', controller.postProduct);
router.put('/api/products/:id', controller.putProduct);
router.patch('/api/products/:id', controller.patchProduct);
router.delete('/api/products/:id', controller.deleteProduct);

module.exports = router;