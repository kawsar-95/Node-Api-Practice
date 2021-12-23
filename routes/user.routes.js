const controller = require('../controller/user.controller');
const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate')
const { validateUserRegistration, validateUserUpdate } = require('../schema/user.schema')

router.get('/api/users', controller.getUsers)
router.get('/api/users/:id', controller.getUser);
router.post('/api/users', validate(validateUserRegistration), controller.createUser);
router.put('/api/users/:id', validate(validateUserUpdate), controller.putUser);
router.patch('/api/users/:id', validate(validateUserUpdate), controller.patchUser);
router.delete('/api/users/:id', controller.deleteUser);

module.exports = router;