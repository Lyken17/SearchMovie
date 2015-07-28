var http = require('http');
var Promise = require('promise');
var ans;
var context;

var jsonGet = http.request({
  host: '10.214.0.195',
  port: 20001,
  path: '/?encodeWords=sadfsdf',
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
    context = tmp;
  });
});

jsonGet.end();
console.log(context);
//console.log(jsonGet.end());
