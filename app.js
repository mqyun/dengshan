var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var userroute = require('./routes/userRoute');
var adminroute = require('./routes/adminRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: 'secret'
}));
app.use(function(req, res, next) {
  // 用户真实名字
  res.locals.name = req.session.name || '';
  // 用户的id
  res.locals.uid = req.session.uid || '';
  // 用户的类型
  res.locals.usertype = req.session.usertype || '';
  // 管理员权限
  res.locals.quanxian = req.session.quanxian || '';
  // 管理员刚添加产品的id
  res.locals.insertId = req.session.insertId || '';
  next();
});

app.use(function(req, res, next) {
  if (req.session.usertype != 'admin') {
    if (req.url == '/admin' || req.url == '/admin/login') {
      next();
    } else if (req.url.indexOf('/admin') != -1) {
      res.redirect('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

// 用户
app.use('/', userroute);
// 管理员
app.use('/admin', adminroute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
