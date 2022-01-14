const path = require('path');
const controller = require('./user.controller');
const validate = require(path.join(process.cwd(), 'src/modules/core/middlewares/validate'));
const { userRegisterSchema, userUpdateSchema } = require('./user.schema');
const { AuthStrategy } = require('./user-auth.middleware');
const { authenticate } = require('passport');

module.exports = app => {
  app.route('/api/users/login')
    .post(controller.login);

  app.route('/api/users')
    .get(AuthStrategy, controller.getUsers)
    .post(validate(userRegisterSchema), controller.createUser);

  app.route('/api/users/:id')
    .get(controller.getUser)
    .put(validate(userUpdateSchema), controller.putUser)
    .patch(validate(userUpdateSchema), controller.patchUser)
    .delete(controller.deleteUser);
};
