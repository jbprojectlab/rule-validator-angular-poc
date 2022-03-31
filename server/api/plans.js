const router = require('express').Router()
const {Plan} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const plans = await Plan.findAll()
    res.json(plans)
  } catch(err) {
    next(err)
  }
})

module.exports = router


/*

  /plans should always return one filter (most recent paidThroughPeriod is what we've decided for now)
  
    - create query parameter for each filter

  if user attempts to filter WITHOUT a Paid Through Period, input validation will prevent this

  add reset filters feature to main branch

*/
