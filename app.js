var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var artesRouter = require('./routes/artesRoutes');
var sessoesRouter = require('./routes/sessoesRoutes');
var utilizadorRouter = require('./routes/userRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);

app.use('/api/artes', artesRouter);
app.use('/api/sessoes', sessoesRouter);
app.use('/api/users', utilizadorRouter);

module.exports = app;
