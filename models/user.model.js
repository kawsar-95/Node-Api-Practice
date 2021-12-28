const { DataTypes } = require('sequelize');
const sequelize = require('./dbmodel');
const UserType = require('./user-type.model');


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
    allowNull: false
  },
  user_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  is_active: {
    type: DataTypes.ENUM,
    values: [0, 1]
  }
});


UserType.hasMany(User, { as: 'users', foreignKey: 'user_type_id' });
User.belongsTo(UserType, { as: 'user_type', foreignKey: 'user_type_id' });

module.exports = User