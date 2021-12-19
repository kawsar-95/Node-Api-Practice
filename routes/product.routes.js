const express = require('express');
const controller = require('../controller/product.controller');
const router = express.Router();

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);
router.post('/', controller.postProduct);
router.put('/:id', controller.putProduct);
router.patch('/:id', controller.patchProduct);
router.delete('/:id', controller.deleteProduct);

module.exports = router;