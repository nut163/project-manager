const Sequelize = require('sequelize');
const db = require('../config/database');

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  teamMembers: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
});

module.exports = Project;