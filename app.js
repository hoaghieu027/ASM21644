var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var clientRouter = require('./routes/client');
var loginRouter = require('./routes/login');
var toystoreRouter = require('./routes/toystore');
var gundamRouter = require('./routes/gundam');
var pokemonRouter = require('./routes/pokemon');
var app = express();

// view engine setup
var mongoose = require("mongoose");
var uri = "mongodb+srv://hoanghieu027:12345@hieu.wj8ubgu.mongodb.net/asm2";
mongoose.connect(uri)
.then(() => console.log ("Connect to DB succeed !"))
.catch((err) => console.log (err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/client', clientRouter);
app.use('/login', loginRouter);
app.use('/toystore', toystoreRouter);
app.use('/gundam', gundamRouter);
app.use('/pokemon', pokemonRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(process.env.PORT || 3001);
module.exports = app;
