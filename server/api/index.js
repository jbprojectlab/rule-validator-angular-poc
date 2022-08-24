'use strict'
const fs = require('fs');
const router = require('express').Router();

router.get('/summary/list', (req, res, next) => {
  try {
    const paiddate = req.query.paiddate == undefined ? '' : req.query.paiddate;
    const groupId = req.query.submissionGroup == undefined ? '' : req.query.submissionGroup;
    let plans = fs.readFileSync('./server/data/plans.json');
    let newPlans = JSON.parse(plans).filter(function (e) {
      return String(e.submissionGroup).indexOf(groupId || '') > -1 && e.paidThroughPeriod.indexOf(paiddate || '') > -1
    });
    res.json(newPlans)
  } catch (err) {
    next(err)
  }
})
router.get('/summary/filters', (req, res, next) => {
  try {
    let plans = fs.readFileSync('./server/data/filters.json');
    res.json(JSON.parse(plans))
  } catch(err) {
    next(err)
  }
})
router.get('/l2-certification-reports', (req, res, next) => {
  try {
    let reports = fs.readFileSync('./server/data/l2-certification-reports.json');
    res.json(JSON.parse(reports))
  } catch(err) {
    next(err)
  }
})
router.get('/db/report', (req, res, next) => {
  try {
    let reports = fs.readFileSync('./server/data/l2f.json');
    res.json(JSON.parse(reports))
  } catch(err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
