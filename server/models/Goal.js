const Sequelize = require('sequelize');
const db = require('../config/database');

const Goal = db.define('goal', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  priority: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  projectId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'projects',
      key: 'id'
    }
  }
});

module.exports = Goal;