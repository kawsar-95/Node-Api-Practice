const path = require("path");
const validate = require(path.join(process.cwd(), 'src/modules/core/middlewares/validate'));


const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

const { userRegisterSchema, userUpdateSchema } = require('./user.schema');

router.get('/api/users', controller.getUsers)
router.get('/api/users/:id', controller.getUser);
router.post('/api/users', validate(userRegisterSchema), controller.createUser);
router.put('/api/users/:id', validate(userUpdateSchema), controller.putUser);
router.patch('/api/users/:id', validate(userUpdateSchema), controller.patchUser);
router.delete('/api/users/:id', controller.deleteUser);

module.exports = router;