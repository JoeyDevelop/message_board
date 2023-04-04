const e = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

function fetchFromDatabase() {
  pool.query('SELECT * FROM message DESC', (err, res) => {
    if (err) {
      console.error(err)
    } else {
      console.log('SUCCESS')
    }
  })
}

module.exports = fetchFromDatabase