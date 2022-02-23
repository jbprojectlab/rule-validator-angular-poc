const router = require('express').Router()
const {Plan} = require('../db/models')

router.get('/', async (req, res, next) => {
  console.log('********** GETTING PLANS ***********')
  try {
    const plans = await Plan.findAll()
    res.json(plans)
  } catch(err) {
    next(err)
  }
})

module.exports = router
