// server.js
// load the things we need
var express = require('express');
var app = express();
var request = require('request');

/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});
connection.end();
*/

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('views'));
// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  var drinks = [{
    name: 'Bloody Mary',
    drunkness: 3
  }, {
    name: 'Martini',
    drunkness: 5
  }, {
    name: 'Scotch',
    drunkness: 10
  }];
  var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

  res.render('pages/index', {
    drinks: drinks,
    tagline: tagline
  });
});

// search page
app.get('/search', function(req, res) {
  var drinks = [{
    name: 'lalala',
    drunkness: 3
  }, {
    name: 'Martini',
    drunkness: 5
  }, {
    name: 'Scotch',
    drunkness: 10
  }];
  var tagline = "Niconiconi!";

  var ans = req.query.query;
  if (ans === "NULL") {
    drinks = [];
    ans = "None";
  }
  var error, response, body;
  error, response, body =  request("http://www.baidu.com");
  res.render('pages/search', {
    drinks: drinks,
    tagline: ans
  });
});


// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.get('*', function(req, res) {
  res.render('pages/404');
});





app.listen(8080, function() {
  console.log("Live at Port 8080");
});
