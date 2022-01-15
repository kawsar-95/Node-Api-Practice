const path = require('path');
const sequelize = require(path.join(process.cwd(), 'src/config/lib/sequelize'));
const { DataTypes } = require('sequelize');

const UserType = sequelize.define('user_types', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  is_active: {
    type: DataTypes.ENUM,
    values: [0, 1]
  },
},
  //For Some Error in the database
  // original: Error: Table 'initial_test_db.user_types' doesn't exist It's Solution
  {
    tableName: "user_type",
  }
);

module.exports = UserType;