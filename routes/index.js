const { fetchFromDatabase, insertIntoDatabase } = require('../backend')

const express = require('express')
const router = express.Router()

// FUNCTION TO GET EST DATE AND TIME
function getFormattedDateTime () {
  const date = new Date()
  const timeZone = 'America/New_York' // EST TIME ZONE
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone
  }
  const formattedTime = date.toLocaleString('en-US', options)
  const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })
  const formattedDateTime = `${formattedTime} - ${formattedDate}`
  return formattedDateTime
}

// HANDLE FORM SUBMIT
router.post('/new', (req, res) => {
  const message = req.body.text
  const username = req.body.user
  const date = getFormattedDateTime()

  insertIntoDatabase(message, username, date)

  res.redirect('/')
})

// GET HOME PAGE
router.get('/', async function (req, res, next) {
  try {
    const messages = await fetchFromDatabase()
    res.render('index', { messages })
  } catch (err) {
    console.error(err)
    res.render('error', { message: 'Error fetching messages from database.' })
  }
})

// GET NEW PAGE
router.get('/new', function (req, res) {
  res.render('new')
})

module.exports = router
