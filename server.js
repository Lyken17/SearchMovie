// server.js
// load the things we need
var express = require('express');
var http = require('http');
var app = express();
var request = require('request');
var Promise = require('promise');
var utf8 = require('utf8');

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
  console.log(req.query.query);
  var jsonGet = http.request({
    host: '10.214.0.195',
    port: 20001,
    path: '/?query=' + utf8.encode(req.query.query.split(" ").join("+")),
    JSON: 'true',
    method: 'get'
  }, function(response) {
    var str = '';
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function(chunk) {
      str += chunk;
    });
    //the whole response has been recieved, so we just print it out here
    response.on('end', function() {
      var tmp = JSON.parse(str);
      var title = req.query.query;
      if (title === '') {
        title = "0.0 (真的不查点啥嘛)";
        tmp = [];
      }
      else {
        title = "以下是“" + req.query.query + "”的搜索结果："
      }
      res.render('pages/json', {
        title: title,
        body: tmp
      });
      console.log(tmp);

      console.log('-' + '/?query=' + req.query.query.split(" ").join("+") + '-==》Title:' + title );
    });
  });

  jsonGet.end();

});

/*
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
  error, response, body = request("http://www.baidu.com");
  res.render('pages/search', {
    drinks: drinks,
    tagline: ans
  });
});
*/


// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});


// default page
app.get('*', function(req, res) {
  res.render('pages/404');
});


app.listen(8080, function() {
  console.log("Live at Port 8080");
});
