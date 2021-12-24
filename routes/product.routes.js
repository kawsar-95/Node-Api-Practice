const express = require('express');
const controller = require('../controller/product.controller');
const router = express.Router();
const validate = require('../middleware/validate')
const { productUploadSchema, productUpdateSchema } = require('../schema/product.schema')

router.get('/api/products/', controller.getProducts);
router.get('/api/products/:id', controller.getProduct);
router.post('/api/products/', validate(productUploadSchema), controller.postProduct);
router.put('/api/products/:id', validate(productUpdateSchema), controller.putProduct);
router.patch('/api/products/:id', validate(productUpdateSchema), controller.patchProduct);
router.delete('/api/products/:id', controller.deleteProduct);

module.exports = router;