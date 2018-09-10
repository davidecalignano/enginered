
const { isDevelopment } = require('../utils');
const { DATABASE_NAME } = require('./constants');
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isDevelopment ? false : true,
  database: DATABASE_NAME
});

module.exports = pool