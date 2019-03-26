var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var authRouter = require('./api/routes/auth');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((req,res,next)=>{
  const error = new Error('Not Found');
  error.status=404;
  next(error);
});

app.use((error,req,res,next) =>{
    res.status(error. status || 500);
    res.json({
      error:{
        message:error.message
      }
    });
});

module.exports = app;
