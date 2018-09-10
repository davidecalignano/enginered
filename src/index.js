const express = require('express')
const { HOMEPAGE, SERVER_PORT } = require('./constants');

express()
  .use('/api', require('./api'))
  .use('/rss', require('./rss'))
  .use('/', (req, res) =>  res.redirect(HOMEPAGE))
  .listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
