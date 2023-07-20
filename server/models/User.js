const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  profileImage: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billingInfo: {
    type: Sequelize.JSON,
    allowNull: true
  }
});

module.exports = User;