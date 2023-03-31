var express = require('express');
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
    text: 'Hi there!',
    user: 'Amando',
    added: dateFormat()
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: dateFormat()
  }
];

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
