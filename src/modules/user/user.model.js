const path = require('path');
const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize'));
const { DataTypes } = require('sequelize');
const UserType = require('./user-type.model');
const bcrypt = require('bcryptjs');

const User = sequelize.define('users', {
  first_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('password', bcrypt.hashSync(value, 8));
    }
  },
  user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  is_active: {
    type: DataTypes.ENUM,
    values: [0, 1]
  },
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.belongsTo(UserType, { as: 'user_type', foreignKey: 'user_type_id' });

module.exports = User;