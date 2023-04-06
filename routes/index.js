const { fetchFromDatabase, insertIntoDatabase } = require('../backend');

var express = require('express');
var router = express.Router();

function getFormattedDateTime() {
  const date = new Date();
  const timeZone = 'America/New_York'; // replace with user's timezone
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone
  };
  const formattedTime = date.toLocaleString('en-US', options);
  const formattedDate = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const formattedDateTime = `${formattedTime} - ${formattedDate}`;
  return formattedDateTime;
}

// let messages = [
//   {
//     text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elit
//     orci, molestie id erat ut, cursus condimentum sem. Vestibulum feugiat est
//     in ipsum facilisis, at hendrerit lacus cursus. Aenean vel gravida diam, 
//     a laoreet metus. Pellentesque nibh enim, congue id magna a, malesuada ornare 
//     odio. Donec id auctor risus. Phasellus elementum, nulla ac auctor malesuada, 
//     diam tellus mollis mauris, id dapibus mauris leo in lorem. Cras ultricies 
//     ante ut massa auctor viverra. Nunc finibus mauris risus, vitae pulvinar diam 
//     pellentesque quis. Maecenas a quam pharetra, pretium risus nec, efficitur 
//     ipsum. Phasellus quis justo nisl. Morbi non ligula ut tellus suscipit sollicitudin.`,
//     user: 'Amando',
//     added: dateFormat()
//   },
//   {
//     text: 'Hello World!',
//     user: 'Charles',
//     added: dateFormat()
//   }
// ];

// TEST Database connection

router.post('/new', (req, res) => {
  const message = req.body.text;
  const username = req.body.user
  const date = getFormattedDateTime()

  insertIntoDatabase(message, username, date);

  res.redirect('/')
})

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const messages = await fetchFromDatabase();
    res.render('index', { messages });
  } catch (err) {
    console.error(err);
    res.render('error', { message: 'Error fetching messages from database.'})
  }
});

router.get('/new', function(req, res) {
  res.render('new');
}) 

module.exports = router;
