const { Pool } = require('pg');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : `postgresql://localhost/${process.env.LOCAL_DATABASE_NAME}`,
  ssl: isProduction,
});

module.exports = { pool };