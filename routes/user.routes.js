const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');
const validate = require('../middleware/validate');
const { userRegisterSchema, userUpdateSchema } = require('../schema/user.schema');

router.get('/api/users', controller.getUsers)
router.get('/api/users/:id', controller.getUser);
router.post('/api/users', validate(userRegisterSchema), controller.createUser);
router.put('/api/users/:id', validate(userUpdateSchema), controller.putUser);
router.patch('/api/users/:id', validate(userUpdateSchema), controller.patchUser);
router.delete('/api/users/:id', controller.deleteUser);

module.exports = router;