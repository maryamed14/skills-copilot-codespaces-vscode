// Create web server application to handle comments
//

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var path = require('path');
var request = require('request');

// Set the port
var port = 3000;

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Set the view engine
app.set('view engine', 'ejs');

// Set the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the body parser
app.use(bodyParser.urlencoded({extended: true}));

// Require the models
var Comment = require('./models/comment');

// Routes
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/comments', function(req, res) {
  Comment.find({}, function(err, comments) {
    if(err) {
      console.log(err);
    } else {
      res.render('comments', {comments: comments});
    }
  });
});

app.get('/comments/new', function(req, res) {
  res.render('new');
});

app.post('/comments', function(req, res) {
  var newComment = req.body.comment;
  Comment.create(newComment, function(err, comment) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/comments');
    }
  });
});

// Listen on port
server.listen(port, function() {
  console.log('Server started on port ' + port);
});
