'use strict'

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const {db} = require('./db')
const app = express()
const PORT = 3000

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../public')))

app.use('/api', require('./api'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(function(req, res, next) {
  res.status(404);
  if(req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }

  if(req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }
  res.type('txt').send('Not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
  .then(() => {
    console.log('db synced')
    app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`))
  })

module.exports = app
