const { getUsers, getUser, postUser, putUser, patchUser, deleteUser } = require('../controller/user.controller');
const express = require('express');
const route = express.Router();

route.get('/', getUsers)
route.get('/:id', getUser);
route.post('/', postUser);
route.put('/:id', putUser);
route.patch('/:id', patchUser);
route.delete('/:id', deleteUser);

module.exports = route;