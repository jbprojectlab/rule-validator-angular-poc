const Sequelize = require('sequelize')
const db = require('../database')

const Plan = db.define("plan", {
  submissionGroup: Sequelize.INTEGER,
  planName: Sequelize.STRING,
  paidThroughPeriod: Sequelize.INTEGER,
  submissionControl: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true
  },
  submissionReceivedDate: Sequelize.DATE,
  category: Sequelize.STRING,
  mode: Sequelize.STRING,
  status: Sequelize.STRING,
  submissionCurrentState: Sequelize.STRING,
  lastUpdated: Sequelize.DATE,
  planValidationDue: Sequelize.DATE,
  reportScoreL2: Sequelize.INTEGER
});

module.exports = {
	Plan
}
