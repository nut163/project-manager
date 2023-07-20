const Sequelize = require('sequelize');
const db = require('../config/database');

const Duty = db.define('duty', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false
  },
  goalId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'goals',
      key: 'id'
    },
    allowNull: false
  }
});

module.exports = Duty;