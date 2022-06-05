'use strict'
const fs = require('fs');
const router = require('express').Router();

router.get('/summary/list', (req, res, next) => {
  try {
    let plans = fs.readFileSync('./server/data/plans.json');
    res.json(JSON.parse(plans))
  } catch(err) {
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

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
