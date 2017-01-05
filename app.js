var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var massive = require('massive');

var app = express();
// no need 'var app = require('../app');' any more, cause it has defined in 'app.js' already.
var debug = require('debug')('my-application');
//app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
module.exports = app; //You need to comment this line which is default in 'app.js' with Express.js 4.x
var connectionString = 'postgres://pshua075:Pencil420984!@web0.site.uottawa.ca:15432/pshua075';
//var massiveInstance = massive.connectSync({connectionString : connectionString});
var db;
massive.connect({connectionString: connectionString}, function(err, db) {
  console.log(err);
  app.set('db', db);
});
//var db=massive.connectSync({connectionString : connectionString});
//app.set('db', massiveInstance);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var db = app.get('db');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// db.moviedb.users.where("email=$1", ["rogerliuray@gmail.com"], function(err, res){
//   console.log(res[0].password);
// });
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
