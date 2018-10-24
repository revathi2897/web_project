var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var router=express.Router();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var books=[{name:'name1', author:'author1',price:'100',description:'des1' ,available_quantity:'20' },
{name:'name2', author:'author2',price:'250' ,description:'des2' ,available_quantity:'15'},
{name:'name3', author:'author3',price:'150' ,description:'des3' ,available_quantity:'25'},
{name:'name4', author:'author4',price:'50' ,description:'des4' ,available_quantity:'10'}]

router.get('/books', function(req, res, next) {
  res.render('books_view', { count: books.length, books: books});
});
app.use(router);

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

module.exports = app;
