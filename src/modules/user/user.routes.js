const path = require('path');
const controller = require('./user.controller');
const validate = require(path.join(process.cwd(), 'src/modules/core/middlewares/validate'));
const { userRegisterSchema, userUpdateSchema } = require('./user.schema');

module.exports = app => {
    app.route('/api/users')
        .get(controller.getUsers)
        .post(validate(userRegisterSchema), controller.createUser);

    app.route('/api/users/:id')
        .get(controller.getUser)
        .put(validate(userUpdateSchema), controller.putUser)
        .patch(validate(userUpdateSchema), controller.patchUser)
        .delete(controller.deleteUser)
}
