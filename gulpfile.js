var gulp = require('gulp');
var server = require('./server.js')
gulp.task('default', function() {
  server.start();
});
