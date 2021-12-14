const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('initial_test_db', 'root', '', {
  logging: console.log,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
  sync: true
});

const User = sequelize.define('users', {
  username: {
    type: DataTypes.STRING,
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
});

const Product = sequelize.define('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = {
  User,
  Product
}