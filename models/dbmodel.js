const { config } = require('nodemon');
const sequlize = require('sequelize');

const sequlize = new sequlize(config.database, config.user, config.password, {
  logging: console.log,
  dialect: 'mysql',
  define: {
    timeStamp: false
  },
  sync: true
})