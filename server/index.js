'use strict'

const express = require('express')
const path = require('path')
const app = express()
const PORT = 7200


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api', require('./api'))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))

module.exports = app
