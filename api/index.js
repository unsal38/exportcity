var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
require('dotenv').config()

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const paymentRouter = require('./routes/payment');
const panelRouter = require('./routes/panel');
const registerRouter = require('./routes/register');
const firmaRouter = require('./routes/firma');
const urunlisteRouter = require('./routes/urunliste');
const sayfaBulunamadı = require("./routes/403");
const blog1Router = require("./routes/blog1");
const blog2Router = require("./routes/blog2");
const blog3Router = require("./routes/blog3");
const blog4Router = require("./routes/blog4");
const blog5Router = require("./routes/blog5");
//MİDDİLWARE
const aut_tokencheck = require("./middleware/aut_tokenCheck");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// //
//  ROUTER ----------------------
//
// PERMİSSİON CHECK YAPILAN SAYFALAR --------------------
app.use('/urunliste',aut_tokencheck.aut_tokencheck(), urunlisteRouter);
app.use('/payment',aut_tokencheck.aut_tokencheck(), paymentRouter);
app.use('/panel',aut_tokencheck.aut_tokencheck(), panelRouter);
app.use('/firma',aut_tokencheck.aut_tokencheck(), firmaRouter);
// PERMİSSİON CHECK YAPILAN SAYFALARY --------------------

app.use("/blog1", blog1Router);
app.use("/blog2", blog2Router);
app.use("/blog3", blog3Router);
app.use("/blog4", blog4Router);
app.use("/blog5", blog5Router);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/403', sayfaBulunamadı);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
