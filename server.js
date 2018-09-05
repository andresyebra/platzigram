var express = require('express');
var app = express();
var multer  = require('multer');
var ext = require('file-extension');
var port = process.env.PORT || 8080;
var host = process.env.YOUR_HOST || '0.0.0.0';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
});

var upload = multer({ storage: storage }).single('picture');
// var upload = multer({ dest: 'uploads/' });

// Use system templates of pug or jade
app.set('view engine','pug');

// Define that any user can access to this resource
app.use(express.static('public'));

// Respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    // res.send('hello world');
    // Render index.pug page
    res.render('index',  { title: 'Platzigram' });
});

// Render index.pug page when a GET request is made to the signup route
app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup' });
});

// Render index.pug page when a GET request is made to the signin route
app.get('/signin', function (req, res) {
  res.render('index', { title: 'Platzigram - Signin' });
});

app.get('/api/pictures', function (req, res, next) {
  var pictures = [
    {
      user: {
        username: 'Yebra Andres',
        avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'Yebra Andres',
        avatar: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/11031148_10153448564292612_2579019413701631604_n.jpg?oh=d83cdd0687c87c91b247a42375fc5a57&oe=57B12767'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  setTimeout(function () {
    res.send(pictures);
  }, 2000)
});

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.send(500, "Error uploading file");
    }
    res.send('File uploaded');
  })
});

console.log('Platzigram escuchando en el puerto ' + port);
//  Platizgram is running through this port on localhost
app.listen(port, host, function (err) {

    if (err) return console.log('Hubo un error'), process.exit(1);

    console.log('Platzigram escuchando en el puerto ' + port);
});