const controller = require('../controller/user.controller');
const express = require('express');
const router = express.Router();

router.get('/', controller.getUsers)
router.get('/:id', controller.getUser);
router.post('/', controller.postUser);
router.put('/:id', controller.putUser);
router.patch('/:id', controller.patchUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;