var express = require('express');
const { fetchFromDatabase } = require('../backend');
var router = express.Router();

const dateFormat = () => {
  const date = new Date()
  
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  const formattedDate = `${hours}:${minutes} - ${month}/${day}/${year}`;
  return formattedDate;
}

let messages = [
  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elit
    orci, molestie id erat ut, cursus condimentum sem. Vestibulum feugiat est
    in ipsum facilisis, at hendrerit lacus cursus. Aenean vel gravida diam, 
    a laoreet metus. Pellentesque nibh enim, congue id magna a, malesuada ornare 
    odio. Donec id auctor risus. Phasellus elementum, nulla ac auctor malesuada, 
    diam tellus mollis mauris, id dapibus mauris leo in lorem. Cras ultricies 
    ante ut massa auctor viverra. Nunc finibus mauris risus, vitae pulvinar diam 
    pellentesque quis. Maecenas a quam pharetra, pretium risus nec, efficitur 
    ipsum. Phasellus quis justo nisl. Morbi non ligula ut tellus suscipit sollicitudin.`,
    user: 'Amando',
    added: dateFormat()
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: dateFormat()
  }
];

// TEST Database connection
fetchFromDatabase();

router.post('/new', (req, res) => {
  const message = req.body.text;
  const user = req.body.user

  messages.push({ text: message, user: user, added: dateFormat()})
  console.log(messages)

  res.redirect('/')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { messages });
});

router.get('/new', function(req, res) {
  res.render('new');
}) 

module.exports = router;
