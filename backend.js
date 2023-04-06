// const e = require('express')
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

function fetchFromDatabase () {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM messages ORDER BY id ASC', (err, res) => {
      if (err) {
        reject(err)
      } else {
        const messages = res.rows
        resolve(messages)
      }
    })
  })
}

function insertIntoDatabase (message, username, date) {
  pool.query(`INSERT INTO messages (message, username, date) VALUES ('${message}', '${username}', '${date}')`, (err, res) => {
    if (err) {
      console.error(err)
    } else {
      console.log('SUCCESS')
    }
  })
};

module.exports = { fetchFromDatabase, insertIntoDatabase }
