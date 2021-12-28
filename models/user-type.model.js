
const { DataTypes } = require('sequelize');
const sequelize = require('./dbmodel');

const UserType = sequelize.define('user_type', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  is_active: {
    type: DataTypes.ENUM,
    values: [0, 1]
  }
});
module.exports = UserType