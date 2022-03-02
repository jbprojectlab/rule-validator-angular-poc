const Sequelize = require('sequelize')
const db = require('../database')

const Plan = db.define("plan", {
  submissionGroup: Sequelize.INTEGER,
  planName: Sequelize.STRING,
  paidThroughPeriod: Sequelize.INTEGER,
  controlNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  dateReceived: Sequelize.DATE,
  category: Sequelize.STRING,
  mode: Sequelize.STRING,
  status: Sequelize.STRING,
  currentState: Sequelize.STRING,
  lastUpdated: Sequelize.DATE,
  dueDate: Sequelize.DATE,
  reportScore: Sequelize.INTEGER
});

module.exports = {
	Plan
}
